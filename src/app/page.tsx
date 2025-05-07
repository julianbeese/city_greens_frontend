// src/app/page.tsx
"use client";

import { useState } from 'react'
// Update the import to use the new interface
import type { FullAnalysisResult } from '@/services/plant-analyzer'; // <--- MODIFIED
import { analyzePlantImage } from '@/services/plant-analyzer'; // Import the actual function
import { ImageUpload } from '@/components/image-upload';
import { AnalysisResult as AnalysisResultComponent } from '@/components/analysis-result'; // Renamed to avoid conflict
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Leaf } from 'lucide-react';

export default function Home() {
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

                {/* Logic for showing ImageUpload component */}
                {!analysisApiResponse && !isLoading && !error && ( // <--- MODIFIED
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
}
