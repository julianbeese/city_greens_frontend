"use client";

import { useState } from 'react';
import type { PlantAnalysis } from '@/services/plant-analyzer';
import { ImageUpload } from '@/components/image-upload';
import { AnalysisResult } from '@/components/analysis-result';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Leaf } from 'lucide-react'; // Use Leaf for the main icon

// Mock function to simulate API call
async function mockAnalyzePlantImage(image: File): Promise<PlantAnalysis> {
  console.log('Analyzing image:', image.name);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate potential errors
  // if (Math.random() < 0.2) { // 20% chance of error
  //   throw new Error("Failed to analyze image. Please try again.");
  // }

  // Simulate different results
  const randomStatus = Math.random() > 0.4 ? 'healthy' : 'unhealthy';
  let randomDetails = 'No significant issues detected. Keep up the good work!';
  if (randomStatus === 'unhealthy') {
     const issues = [
        'Yellowing leaves detected, possible nutrient deficiency (Nitrogen). Consider fertilizing.',
        'Signs of pest damage (aphids) on lower leaves. Apply insecticidal soap.',
        'Dark spots on leaves, potential early blight. Remove affected leaves and ensure good air circulation.',
        'Wilting observed, check soil moisture levels. May need watering.',
     ];
     randomDetails = issues[Math.floor(Math.random() * issues.length)];
  }


  return {
    status: randomStatus,
    details: randomDetails,
  };
}

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PlantAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setUploadedImage(file);
    setAnalysisResult(null); // Clear previous results
    setError(null); // Clear previous errors
    setIsLoading(true);

    try {
      // TODO: Replace mockAnalyzePlantImage with actual API call
      // const result = await analyzePlantImage(file); // Use the actual service function when ready
      const result = await mockAnalyzePlantImage(file); // Use mock for now
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
    setUploadedImage(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
     // Manually trigger removal in ImageUpload if necessary (depends on ImageUpload implementation)
     // This might involve adding a reset function prop to ImageUpload
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background to-secondary/20">
      <div className="flex flex-col items-center space-y-8 w-full max-w-2xl">
        <div className="text-center space-y-2">
           <Leaf className="h-12 w-12 mx-auto text-green-600" />
           <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Tomato Vision</h1>
           <p className="text-md text-muted-foreground">
            Upload a photo of your tomato plant to check its health.
           </p>
        </div>

        {!analysisResult && !isLoading && !error && (
           <ImageUpload
            onImageUpload={handleImageUpload}
            isProcessing={isLoading}
            className="animate-fade-in"
           />
         )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4 p-10 h-60">
            <LoadingSpinner size={48} />
            <p className="text-muted-foreground animate-pulse">Analyzing your plant...</p>
          </div>
        )}

        {error && !isLoading && (
          <Alert variant="destructive" className="w-full max-w-md animate-fade-in">
             <AlertTitle>Analysis Failed</AlertTitle>
             <AlertDescription>{error}</AlertDescription>
              <Button variant="outline" size="sm" onClick={handleReset} className="mt-4">
                Try Again
              </Button>
          </Alert>
        )}

        {analysisResult && !isLoading && !error && (
          <div className="flex flex-col items-center space-y-4 w-full">
            <AnalysisResult result={analysisResult} />
             <Button onClick={handleReset} variant="outline" className="mt-4">
                Analyze Another Plant
             </Button>
          </div>
        )}
      </div>
        <footer className="mt-12 text-center text-xs text-muted-foreground">
             Powered by Sustainable Vertical Farming Tech
        </footer>
    </main>
  );
}
