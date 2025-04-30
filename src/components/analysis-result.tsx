import type { PlantAnalysis } from '@/services/plant-analyzer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Leaf, Droplet, Sun, Info, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface AnalysisResultProps {
  result: PlantAnalysis;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  const isHealthy = result.status === 'healthy';

  const statusIcon = isHealthy ? (
    <CheckCircle className="h-6 w-6 text-green-600" />
  ) : (
    <AlertCircle className="h-6 w-6 text-destructive" />
  );

  // Determine appropriate icon based on details (diagnosis)
  let detailIcon = <Info className="h-5 w-5 text-muted-foreground mt-1" />; // Default info icon
  const detailsLower = result.details.toLowerCase();
  if (detailsLower.includes('nutrient')) {
    detailIcon = <Droplet className="h-5 w-5 text-blue-500 mt-1" />;
  } else if (detailsLower.includes('light') || detailsLower.includes('sun')) {
     detailIcon = <Sun className="h-5 w-5 text-yellow-500 mt-1" />;
  } else if (detailsLower.includes('disease') || detailsLower.includes('pest') || detailsLower.includes('blight') || detailsLower.includes('aphids')) {
     // Bug/Pest/Disease Icon
     detailIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c-2.4 0-4.6.9-6.3 2.4"/><path d="M18 22h-1.4c-1 0-1.8-.8-1.8-1.8v-.5c0-1-.8-1.8-1.8-1.8h-1.4c-1 0-1.8-.8-1.8-1.8v-.5c0-1-.8-1.8-1.8-1.8H6.1c-1 0-1.8-.8-1.8-1.8v-2.7c0-1 .8-1.8 1.8-1.8H7c1 0 1.8-.8 1.8-1.8v-1c0-1 .8-1.8 1.8-1.8h2.4c1 0 1.8-.8 1.8-1.8V5.9c0-1 .8-1.8 1.8-1.8h1.4c1 0 1.8.8 1.8 1.8V6c0 1 .8 1.8 1.8 1.8h1c1 0 1.8.8 1.8 1.8v2.7c0 1-.8 1.8-1.8 1.8h-.4c-1 0-1.8.8-1.8 1.8v1c0 1-.8 1.8-1.8 1.8z"/></svg>;
  } else if (detailsLower.includes('water') || detailsLower.includes('wilt')) {
     detailIcon = <Leaf className="h-5 w-5 text-cyan-600 mt-1" />; // Wilt/Water icon (using Leaf for now)
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
            Status: {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
          </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Diagnosis Section */}
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md border border-muted">
             <div className="flex-shrink-0">{detailIcon}</div>
             <div>
                <p className="text-sm font-medium text-foreground mb-1">Diagnosis</p>
                <p className="text-sm text-foreground/90">{result.details}</p>
             </div>
          </div>

          {/* Recommendations Section (Conditional) */}
          {!isHealthy && result.recommendations && (
            <>
              <Separator />
              <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-md border border-accent">
                <div className="flex-shrink-0">
                    <Lightbulb className="h-5 w-5 text-accent-foreground mt-1" />
                </div>
                <div>
                    <p className="text-sm font-medium text-accent-foreground mb-1">Recommendations</p>
                    <p className="text-sm text-accent-foreground/90">{result.recommendations}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
