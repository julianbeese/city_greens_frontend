
"use client";

import type { FullPlantAnalysisResponse, Abnormality } from '@/types/plant-analysis';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Leaf, Droplet, Sun, Info, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface AnalysisResultProps {
  analysisResult: FullPlantAnalysisResponse;
  imageUrl: string;
}

export function AnalysisResult({ analysisResult, imageUrl }: AnalysisResultProps) {
  const { plant_analysis, image_width, image_height } = analysisResult;
  const isHealthy = plant_analysis.status === 'healthy';

  const imageRef = useRef<HTMLImageElement>(null);
  const [displayedImageDimensions, setDisplayedImageDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const calculateDimensions = () => {
      if (imageRef.current) {
        setDisplayedImageDimensions({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight,
        });
      }
    };

    if (imageRef.current?.complete) {
        calculateDimensions();
    } else if (imageRef.current) {
        imageRef.current.onload = calculateDimensions;
    }
    
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [imageUrl]);


  const statusIcon = isHealthy ? (
    <CheckCircle className="h-6 w-6 text-green-600" />
  ) : (
    <AlertCircle className="h-6 w-6 text-destructive" />
  );

  const detailsLower = plant_analysis.details.toLowerCase();
  let detailIcon = <Info className="h-5 w-5 text-muted-foreground mt-1" />;
  if (detailsLower.includes('nutrient')) {
    detailIcon = <Droplet className="h-5 w-5 text-blue-500 mt-1" />;
  } else if (detailsLower.includes('light') || detailsLower.includes('sun')) {
     detailIcon = <Sun className="h-5 w-5 text-yellow-500 mt-1" />;
  } else if (detailsLower.includes('disease') || detailsLower.includes('pest') || detailsLower.includes('blight') || detailsLower.includes('aphids') || detailsLower.includes('spot')) {
     detailIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c-2.4 0-4.6.9-6.3 2.4"/><path d="M18 22h-1.4c-1 0-1.8-.8-1.8-1.8v-.5c0-1-.8-1.8-1.8-1.8h-1.4c-1 0-1.8-.8-1.8-1.8v-.5c0-1-.8-1.8-1.8-1.8H6.1c-1 0-1.8-.8-1.8-1.8v-2.7c0-1 .8-1.8 1.8-1.8H7c1 0 1.8-.8 1.8-1.8v-1c0-1 .8-1.8 1.8-1.8h2.4c1 0 1.8-.8 1.8-1.8V5.9c0-1 .8-1.8 1.8-1.8h1.4c1 0 1.8.8 1.8 1.8V6c0 1 .8 1.8 1.8 1.8h1c1 0 1.8.8 1.8 1.8v2.7c0 1-.8 1.8-1.8 1.8h-.4c-1 0-1.8.8-1.8 1.8v1c0 1-.8 1.8-1.8 1.8z"/></svg>;
  } else if (detailsLower.includes('water') || detailsLower.includes('wilt')) {
     detailIcon = <Leaf className="h-5 w-5 text-cyan-600 mt-1" />;
  }

  return (
    <Card className="w-full max-w-md animate-fade-in shadow-lg border rounded-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          {statusIcon}
          <span>Plant Health Analysis</span>
        </CardTitle>
         <CardDescription
            className={cn(
              'text-lg font-semibold pt-1',
              isHealthy ? 'text-green-700' : 'text-destructive'
            )}
          >
            Status: {plant_analysis.status.charAt(0).toUpperCase() + plant_analysis.status.slice(1)}
          </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {imageUrl && (
          <div className="relative w-full aspect-[4/3] bg-muted/30 rounded-md overflow-hidden border border-muted" data-ai-hint="plant analysis">
            <Image
              ref={imageRef}
              src={imageUrl}
              alt="Analyzed plant"
              layout="fill"
              objectFit="contain" // Use contain to see the whole image and scale boxes correctly
              priority
              onLoad={() => { // Ensure dimensions are captured after image loads
                  if (imageRef.current) {
                      setDisplayedImageDimensions({
                          width: imageRef.current.offsetWidth,
                          height: imageRef.current.offsetHeight,
                      });
                  }
              }}
            />
            {displayedImageDimensions && image_width > 0 && image_height > 0 && plant_analysis.abnormalities?.map((ab: Abnormality, index: number) => {
              const displayWidth = displayedImageDimensions.width;
              const displayHeight = displayedImageDimensions.height;
              
              // Calculate scale factor based on 'contain' objectFit
              // This requires knowing how 'contain' scales the image within the container
              // For 'contain', the image is scaled to fit while maintaining aspect ratio.
              // The limiting dimension (width or height) determines the scale.
              const imageAspectRatio = image_width / image_height;
              const containerAspectRatio = displayWidth / displayHeight;

              let scaledImageWidth, scaledImageHeight, offsetX = 0, offsetY = 0;

              if (imageAspectRatio > containerAspectRatio) {
                // Image is wider than container, so width is the limiting dimension
                scaledImageWidth = displayWidth;
                scaledImageHeight = displayWidth / imageAspectRatio;
                offsetY = (displayHeight - scaledImageHeight) / 2;
              } else {
                // Image is taller than container, so height is the limiting dimension
                scaledImageHeight = displayHeight;
                scaledImageWidth = displayHeight * imageAspectRatio;
                offsetX = (displayWidth - scaledImageWidth) / 2;
              }
              
              const scaleX = scaledImageWidth / image_width;
              const scaleY = scaledImageHeight / image_height;

              const boxStyle: React.CSSProperties = {
                position: 'absolute',
                left: `${offsetX + ab.coordinates.x * scaleX}px`,
                top: `${offsetY + ab.coordinates.y * scaleY}px`,
                width: `${ab.coordinates.width * scaleX}px`,
                height: `${ab.coordinates.height * scaleY}px`,
                border: `2px solid hsl(var(--destructive))`,
                boxShadow: '0 0 5px hsl(var(--destructive)/0.7)',
              };
              const labelStyle: React.CSSProperties = {
                position: 'absolute',
                left: `${offsetX + ab.coordinates.x * scaleX}px`,
                top: `${offsetY + ab.coordinates.y * scaleY - 18}px`, // Position label above the box
                backgroundColor: 'hsl(var(--destructive))',
                color: 'hsl(var(--destructive-foreground))',
                padding: '1px 3px',
                fontSize: '0.7rem',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
              };

              return (
                <div key={index}>
                  <div style={boxStyle} title={`${ab.type}: ${ab.description}`} />
                  <div style={labelStyle}>{ab.type}</div>
                </div>
              );
            })}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md border border-muted">
             <div className="flex-shrink-0">{detailIcon}</div>
             <div>
                <p className="text-sm font-medium text-foreground mb-1">Diagnosis</p>
                <p className="text-sm text-foreground/90">{plant_analysis.details}</p>
             </div>
          </div>

          {!isHealthy && plant_analysis.recommendations && (
            <>
              <Separator />
              <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-md border border-accent">
                <div className="flex-shrink-0">
                    <Lightbulb className="h-5 w-5 text-accent-foreground mt-1" />
                </div>
                <div>
                    <p className="text-sm font-medium text-accent-foreground mb-1">Recommendations</p>
                    <p className="text-sm text-accent-foreground/90">{plant_analysis.recommendations}</p>
                </div>
              </div>
            </>
          )}
           <Separator />
           <div className="text-xs text-muted-foreground space-y-1">
            <p>Overall Confidence: {(analysisResult.confidence_score * 100).toFixed(1)}%</p>
            <p>Processing Time: {analysisResult.processing_time_ms}ms</p>
            {plant_analysis.abnormalities && plant_analysis.abnormalities.length > 0 && (
                 <p>Detected Abnormalities: {plant_analysis.abnormalities.length}</p>
            )}
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
