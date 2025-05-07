<<<<<<< HEAD

"use client";

import { useState, useEffect } from 'react';
import type { FullPlantAnalysisResponse } from '@/types/plant-analysis';
=======
// src/app/page.tsx
"use client";

import { useState } from 'react'
// Update the import to use the new interface
import type { FullAnalysisResult } from '@/services/plant-analyzer'; // <--- MODIFIED
import { analyzePlantImage } from '@/services/plant-analyzer'; // Import the actual function
>>>>>>> adaa9ccdbdb093a3ae094540c57b095260d314f7
import { ImageUpload } from '@/components/image-upload';
import { AnalysisResult as AnalysisResultComponent } from '@/components/analysis-result'; // Renamed to avoid conflict
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Leaf } from 'lucide-react';

export default function Home() {
<<<<<<< HEAD
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [uploadedImagePreviewUrl, setUploadedImagePreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<FullPlantAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setUploadedImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    setAnalysisResult(null); // Clear previous results
    setError(null); // Clear previous errors
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'API returned an error' }));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }

      const result: FullPlantAnalysisResponse = await response.json();
      setAnalysisResult(result);
    } catch (err: any) {
      console.error("Analysis failed:", err);
      setError(err.message || "An unknown error occurred during analysis.");
      setAnalysisResult(null); // Ensure no stale results are shown on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUploadedImageFile(null);
    setUploadedImagePreviewUrl(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background to-secondary/20">
      <div className="flex flex-col items-center space-y-8 w-full max-w-2xl">
        <div className="text-center space-y-2">
           <Leaf className="h-12 w-12 mx-auto text-primary" />
           <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Tomato Vision</h1>
           <p className="text-md text-muted-foreground">
            Upload a photo of your plant to check its health.
           </p>
        </div>
=======
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    // Update the state to hold the full analysis result
    const [analysisApiResponse, setAnalysisApiResponse] = useState<FullAnalysisResult | null>(null); // <--- MODIFIED
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = async (file: File) => {
        setUploadedImage(file);
        setAnalysisApiResponse(null); // <--- MODIFIED: Clear previous full results
        setError(null);
        setIsLoading(true);

        try {
            // Use the actual service function
            const result: FullAnalysisResult = await analyzePlantImage(file); // <--- MODIFIED
            setAnalysisApiResponse(result); // <--- MODIFIED: Store the full result
        } catch (err: any) {
            console.error("Analysis failed:", err);
            setError(err.message || "An unknown error occurred during analysis.");
            setAnalysisApiResponse(null); // <--- MODIFIED
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setUploadedImage(null);
        setAnalysisApiResponse(null); // <--- MODIFIED
        setError(null);
        setIsLoading(false);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background to-secondary/20">
            <div className="flex flex-col items-center space-y-8 w-full max-w-2xl">
                <div className="text-center space-y-2">
                    <Leaf className="h-12 w-12 mx-auto text-green-600" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Plant Vision</h1>
                    <p className="text-md text-muted-foreground">
                        Upload a photo of your plant to check its health.
                    </p>
                </div>
>>>>>>> adaa9ccdbdb093a3ae094540c57b095260d314f7

                {/* Logic for showing ImageUpload component */}
                {!analysisApiResponse && !isLoading && !error && ( // <--- MODIFIED
                    <ImageUpload
                        onImageUpload={handleImageUpload}
                        isProcessing={isLoading}
                        className="animate-fade-in"
                    />
                )}

<<<<<<< HEAD
        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4 p-10 h-60 min-h-[300px]">
            <LoadingSpinner size={48} />
            <p className="text-muted-foreground animate-pulse">Analyzing your plant...</p>
          </div>
        )}
=======
                {isLoading && (
                    <div className="flex flex-col items-center justify-center space-y-4 p-10 h-60">
                        <LoadingSpinner size={48} />
                        <p className="text-muted-foreground animate-pulse">Analyzing your plant...</p>
                    </div>
                )}
>>>>>>> adaa9ccdbdb093a3ae094540c57b095260d314f7

                {error && !isLoading && (
                    <Alert variant="destructive" className="w-full max-w-md animate-fade-in">
                        <AlertTitle>Analysis Failed</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                        <Button variant="outline" size="sm" onClick={handleReset} className="mt-4">
                            Try Again
                        </Button>
                    </Alert>
                )}

<<<<<<< HEAD
        {analysisResult && !isLoading && !error && uploadedImagePreviewUrl && (
          <div className="flex flex-col items-center space-y-4 w-full">
            <AnalysisResult
              analysisResult={analysisResult}
              imageUrl={uploadedImagePreviewUrl}
            />
             <Button onClick={handleReset} variant="outline" className="mt-4">
                Analyze Another Plant
             </Button>
          </div>
        )}
      </div>
        <footer className="mt-12 text-center text-xs text-muted-foreground">
             Powered by CityGreens
        </footer>
    </main>
  );
=======
                {/* Pass the correct part of the data to AnalysisResultComponent */}
                {analysisApiResponse && !isLoading && !error && ( // <--- MODIFIED
                    <div className="flex flex-col items-center space-y-4 w-full">
                        {/* Pass the nested plant_analysis object and other relevant fields */}
                        <AnalysisResultComponent
                            result={analysisApiResponse.plant_analysis} // <--- MODIFIED: Pass the nested part
                            confidenceScore={analysisApiResponse.confidence_score} // <--- NEW PROP
                            // You can also pass processing_time_ms, image_width, image_height if needed by the component
                        />
                        <Button onClick={handleReset} variant="outline" className="mt-4">
                            Analyze Another Plant
                        </Button>
                    </div>
                )}
            </div>
            <footer className="mt-12 text-center text-xs text-muted-foreground">
                Powered by CityGreens
            </footer>
        </main>
    );
>>>>>>> adaa9ccdbdb093a3ae094540c57b095260d314f7
}
