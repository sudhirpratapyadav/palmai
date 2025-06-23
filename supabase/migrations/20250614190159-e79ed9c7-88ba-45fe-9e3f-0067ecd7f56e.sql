
-- Create storage bucket for palm images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('palm-images', 'palm-images', true);

-- Create policy to allow authenticated users to upload their own images
CREATE POLICY "Allow authenticated users to upload palm images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'palm-images' 
  AND auth.role() = 'authenticated'
);

-- Create policy to allow users to view palm images
CREATE POLICY "Allow users to view palm images" ON storage.objects
FOR SELECT USING (bucket_id = 'palm-images');

-- Create policy to allow users to update their own images
CREATE POLICY "Allow users to update their own palm images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'palm-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create policy to allow users to delete their own images
CREATE POLICY "Allow users to delete their own palm images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'palm-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
