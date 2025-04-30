import type { PlantAnalysis } from '@/services/plant-analyzer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Leaf, Droplet, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  // Determine appropriate icon based on details (simplified example)
  let detailIcon = <Leaf className="h-5 w-5 text-muted-foreground" />;
  if (result.details.toLowerCase().includes('nutrient')) {
    detailIcon = <Droplet className="h-5 w-5 text-blue-500" />;
  } else if (result.details.toLowerCase().includes('light') || result.details.toLowerCase().includes('sun')) {
     detailIcon = <Sun className="h-5 w-5 text-yellow-500" />;
  } else if (result.details.toLowerCase().includes('disease') || result.details.toLowerCase().includes('pest')) {
     detailIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c-2.4 0-4.6.9-6.3 2.4"/><path d="M18 22h-1.4c-1 0-1.8-.8-1.8-1.8v-.5c0-1-.8-1.8-1.8-1.8h-1.4c-1 0-1.8-.8-1.8-1.8v-.5c0-1-.8-1.8-1.8-1.8H6.1c-1 0-1.8-.8-1.8-1.8v-2.7c0-1 .8-1.8 1.8-1.8H7c1 0 1.8-.8 1.8-1.8v-1c0-1 .8-1.8 1.8-1.8h2.4c1 0 1.8-.8 1.8-1.8V5.9c0-1 .8-1.8 1.8-1.8h1.4c1 0 1.8.8 1.8 1.8V6c0 1 .8 1.8 1.8 1.8h1c1 0 1.8.8 1.8 1.8v2.7c0 1-.8 1.8-1.8 1.8h-.4c-1 0-1.8.8-1.8 1.8v1c0 1-.8 1.8-1.8 1.8z"/></svg>; // Bug/Pest Icon
  }


  return (
    <Card className="w-full max-w-md animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          {statusIcon}
          <span>Plant Health Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p
            className={cn(
              'text-lg font-semibold',
              isHealthy ? 'text-green-700' : 'text-destructive'
            )}
          >
            Status: {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
          </p>
          <div className="flex items-start gap-2">
             {detailIcon}
             <p className="text-sm text-foreground">{result.details}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
