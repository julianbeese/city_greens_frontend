"use client";

import { useState, useCallback, useRef } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image'; // Import next/image

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isProcessing: boolean;
  className?: string;
}

export function ImageUpload({ onImageUpload, isProcessing, className }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file); // Immediately call onImageUpload
    } else {
      // Handle invalid file type (optional: show toast)
      console.error("Invalid file type. Please upload JPG or PNG.");
      handleRemoveImage(); // Clear state if invalid
    }
  };

  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

   const handleRemoveImage = () => {
    setPreviewUrl(null);
    setUploadedFile(null);
    if (inputRef.current) {
      inputRef.current.value = ''; // Reset file input
    }
    // Optionally call a prop function if parent needs notification
    // e.g., onImageRemove?.();
   };

  return (
    <Card className={cn("w-full max-w-lg transition-colors", dragActive ? "border-primary" : "", className)}>
      <CardContent className="p-6">
        <form
          id="form-file-upload"
          className="relative flex flex-col items-center justify-center space-y-4"
          onDragEnter={handleDrag}
        >
          <Input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            disabled={isProcessing || !!previewUrl} // Disable when processing or image exists
          />

          {previewUrl ? (
             <div className="relative group w-full h-64 rounded-md overflow-hidden">
              <Image
                src={previewUrl}
<<<<<<< HEAD
                alt="Uploaded plant" // Updated alt text
=======
                alt="Uploaded plant"
>>>>>>> adaa9ccdbdb093a3ae094540c57b095260d314f7
                layout="fill" // Use fill layout
                objectFit="cover" // Cover the area
                className="transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                 {!isProcessing && (
                   <Button
                     type="button"
                     variant="destructive"
                     size="icon"
                     onClick={handleRemoveImage}
                     className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     aria-label="Remove image"
                   >
                     <X className="h-5 w-5" />
                   </Button>
                 )}
              </div>
            </div>
          ) : (
            <label
              htmlFor="input-file-upload"
              className={cn(
                "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-colors",
                dragActive ? "border-primary bg-primary/10" : "border-border"
              )}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG or JPG images</p>
              </div>
            </label>
           )}

          {!previewUrl && ( // Only show upload button if no preview
             <Button
               type="button"
               onClick={onButtonClick}
               disabled={isProcessing}
               className="w-full sm:w-auto"
             >
               <UploadCloud className="mr-2 h-4 w-4" /> Choose Image
             </Button>
           )}

          {dragActive && (
            <div
              className="absolute inset-0 w-full h-full rounded-lg"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
          )}
        </form>
      </CardContent>
    </Card>
  );
}
