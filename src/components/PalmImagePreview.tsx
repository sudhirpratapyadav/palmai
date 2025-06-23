
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PalmImagePreviewProps {
  preview: string;
  onClear: () => void;
}

const PalmImagePreview: React.FC<PalmImagePreviewProps> = ({ preview, onClear }) => (
  <div className="relative">
    <img
      src={preview}
      alt="Palm preview"
      className="w-full h-64 object-cover rounded-lg"
    />
    <Button
      variant="destructive"
      size="sm"
      onClick={onClear}
      className="absolute top-2 right-2"
    >
      <X className="w-4 h-4" />
    </Button>
  </div>
);

export default PalmImagePreview;
