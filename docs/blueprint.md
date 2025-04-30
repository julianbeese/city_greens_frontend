# **App Name**: Tomato Vision

## Core Features:

- Image Upload & Loading: Allow users to upload tomato plant images via drag-and-drop or a button. Display a loading indicator during processing.
- Analysis Result Display: Display the analysis results (healthy, potential issues, etc.) clearly with text and icons.
- API Integration: Send uploaded images to the backend API (https://your-backend-api.com/analyze) and handle responses, including error messages.

## Style Guidelines:

- Primary color: White (#FFFFFF) for a clean and modern look.
- Secondary color: Light green (#C8E6C9) to evoke sustainability and farming.
- Accent: Tomato Red (#FF6347) for calls to action and important information.
- Clear and readable sans-serif font for optimal viewing on all devices.
- Use simple, line-based icons to represent plant health status (e.g., leaf, water drop, sun).
- Clean and responsive layout optimized for both desktop and mobile devices.
- Subtle fade-in animations for results and loading indicators.

## Original User Request:
We are developing a web application for a startup focused on sustainable vertical farming within shipping containers. The app enables users to monitor the health of tomato plants by uploading images, which are analyzed via an API call to a backend service. The frontend should display the analysis results (e.g., whether the tomato plant is healthy, potential issues, etc.) in a user-friendly interface. The goal is to create an energy-efficient and sustainable farming solution, with this MVP focusing on image-based plant health analysis.

Frontend MVP Requirements:

    User Interface:
        Create a clean, modern, and responsive web interface optimized for desktop and mobile.
        Include a homepage with a brief introduction to the app (e.g., "Upload a tomato plant image to check its health").
        Provide an image upload section with a button or drag-and-drop area for users to upload a tomato plant photo (accept common image formats like JPG, PNG).
        Display a loading indicator while the image is being processed.
        Show a results page or section with the analysis output (e.g., "Healthy", "Potential nutrient deficiency", or "Signs of disease") in a clear, visually appealing format (e.g., text, icons, or charts).
    Functionality:
        Enable users to upload an image of a tomato plant via the frontend.
        Send the uploaded image to a backend API (placeholder endpoint: https://your-backend-api.com/analyze) using a POST request. The API will return a JSON response with the analysis (e.g., { "status": "healthy", "details": "No issues detected" }).
        Handle API responses and display the results on the frontend. Include error handling for cases like invalid images or API failures (e.g., show a user-friendly error message).
        Allow users to upload another image after viewing results.
    Firebase Integration:
        Use Firebase Hosting to deploy the web app.
        Leverage Firebase Storage to temporarily store uploaded images before sending them to the backend API.
        Implement Firebase Authentication (optional) for basic user login (email/password or Google sign-in) to track user uploads, but keep it simple for the MVP.
        Use Firebase Cloud Functions (if needed) to handle API calls securely or preprocess images before sending to the backend.
    Design Preferences:
        Use a clean, green-themed design to reflect sustainability and farming (e.g., green and white color palette).
        Ensure the UI is intuitive for non-technical users, such as farmers or hobbyists.
        Include subtle animations (e.g., fade-in for results) to enhance user experience without overwhelming the interface.
    Technical Details:
        Build the frontend using a modern framework like React or Vue.js (Firebase Studio can choose based on compatibility).
        Ensure the app is lightweight and fast, considering users may access it in rural areas with limited internet.
        Mock the backend API response for development purposes (e.g., assume the API returns { "status": "healthy", "details": "No issues detected" } or { "status": "unhealthy", "details": "Yellowing leaves detected, possible nutrient deficiency" }).
        Provide clear documentation for integrating the actual backend API later.
    Deliverables:
        A fully functional Frontend MVP deployed on Firebase Hosting.
        Source code in a GitHub repository with clear setup instructions.
        Basic documentation on how to connect the frontend to the backend API.
        A simple demo flow: upload image → process via API → display results.

Additional Notes:

    Prioritize simplicity and usability for the MVP. Advanced features like historical upload tracking or detailed analytics can be added later.
    Ensure the app is accessible (e.g., alt text for images, keyboard navigation).
    If Firebase Studio supports AI-driven UI generation, leverage it to create a farmer-friendly interface with minimal manual configuration.

Example User Flow:

    User lands on the homepage and sees an "Upload Tomato Plant Image" button.
    User uploads an image (e.g., a JPG of a tomato plant).
    App shows a loading spinner while the image is sent to Firebase Storage and then to the backend API.
    Results appear (e.g., "Your plant is healthy!" or "Warning: Possible pest damage detected").
    User can click "Upload Another Image" to repeat the process.; Please use Next.JS for the application
  