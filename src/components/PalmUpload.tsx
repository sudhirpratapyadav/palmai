import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import PalmImagePreview from "./PalmImagePreview";
import { useCompressedImage } from "@/hooks/useCompressedImage";

interface PalmUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const PalmUpload: React.FC<PalmUploadProps> = ({ onImageUpload }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { compressImage, compressing } = useCompressedImage(800);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }
    setUploading(true);
    try {
      // Compress/rescale image and show as preview
      const compressedBase64 = await compressImage(file);
      setPreview(compressedBase64);

      // Upload original file to Supabase Storage (for records only)
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('palm-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      onImageUpload(compressedBase64);

      toast({
        title: "Image uploaded successfully!",
        description: "Your palm image is ready for analysis.",
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Upload Your Palm Image
        </h2>
        <p className="text-purple-200">
          Take a clear photo of your palm for the most accurate reading
        </p>
      </div>
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-center">
            Choose Your Palm Photo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {preview ? (
            <PalmImagePreview preview={preview} onClear={clearImage} />
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-purple-400/50 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
            >
              <Camera className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <p className="text-purple-200 mb-2">
                Click to upload your palm image
              </p>
              <p className="text-purple-300 text-sm">
                JPG, PNG up to 5MB
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || compressing}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading || compressing ? 'Uploading...' : 'Choose File'}
            </Button>
            {preview && (
              <Button
                onClick={clearImage}
                variant="outline"
                className="border-purple-400/30 text-purple-200 hover:bg-purple-400/10"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Image
              </Button>
            )}
          </div>
          <div className="bg-purple-900/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Tips for best results:</h3>
            <ul className="text-purple-200 text-sm space-y-1">
              <li>• Use good lighting</li>
              <li>• Keep your hand flat and steady</li>
              <li>• Include your entire palm in the frame</li>
              <li>• Avoid shadows on your palm</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PalmUpload;
