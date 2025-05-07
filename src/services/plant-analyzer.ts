// src/services/plant-analyzer.ts

/**
 * Represents the core plant analysis details.
 */
export interface PlantAnalysisDetails { // Renamed from PlantAnalysis for clarity
    status: 'healthy' | 'unhealthy' | string;
    details: string;
    recommendations?: string;
}

/**
 * Represents the full analysis result from the API, including metadata.
 */
export interface FullAnalysisResult { // New interface for the full response
    plant_analysis: PlantAnalysisDetails;
    confidence_score: number;
    processing_time_ms: number;
    image_width: number;
    image_height: number;
}

/**
 * Asynchronously analyzes a tomato plant image and returns the analysis results.
 *
 * @param image The image file of the tomato plant.
 * @returns A promise that resolves to a FullAnalysisResult object.
 * @throws Throws an error if the API call fails or returns an error status.
 */
export async function analyzePlantImage(image: File): Promise<FullAnalysisResult> { // Update return type
    const formData = new FormData();
    // The backend API expects the file to be named 'file' based on the test and route definition.
    formData.append('file', image); // Ensure the key is 'file'

    // IMPORTANT: Replace with your actual backend API URL
    // Make sure this points to where your FastAPI app is running,
    // e.g., http://localhost:8000/api/analyze if running locally.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/analyze';
    // It's good practice to use an environment variable for the API URL.

    try {
        // This is the actual fetch call to your backend
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
            // Add any necessary headers if your API requires them (e.g., for auth)
            // headers: {
            //   'Authorization': `Bearer YOUR_API_TOKEN`,
            // },
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { detail: `API request failed with status ${response.status}` };
            }
            // FastAPI often returns errors in a 'detail' field.
            throw new Error(errorData.detail || `API request failed with status ${response.status}`);
        }

        const data: FullAnalysisResult = await response.json(); // Expect the full structure
        return data;

    } catch (error: any) {
        console.error('Error analyzing plant image:', error);
        // Provide a more user-friendly error message or let the component handle it
        throw new Error(error.message || 'Failed to connect to the analysis service. Please try again.');
    }
}
