import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the Gemini 2.5 Flash Image model (nano banana)
export const imageModel = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash-image" 
});

// Helper function to convert File to base64
export async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return base64;
}

// Helper function to create image part for Gemini
export function createImagePart(base64Data: string, mimeType: string) {
  return {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };
}

// Main function to generate hairstyle
export async function generateHairstyle(
  faceImage: File,
  hairstyleImage: File
) {
  try {
    // Convert images to base64
    const faceBase64 = await fileToBase64(faceImage);
    const hairstyleBase64 = await fileToBase64(hairstyleImage);

    // Create image parts
    const facePart = createImagePart(faceBase64, faceImage.type);
    const hairstylePart = createImagePart(hairstyleBase64, hairstyleImage.type);

    // Create prompt for hairstyle transfer
    const prompt = `Remove the hair of the first person and completely replace it with the hair of the second person. Leave the face as is`;

    // Generate content with both images and prompt
    const response = await imageModel.generateContent([
      prompt,
      facePart,
      hairstylePart,
    ]);

    return response;
  } catch (error) {
    console.error("Error generating hairstyle:", error);
    throw new Error(`Failed to generate hairstyle: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Function to extract image from Gemini response
export function extractImageFromResponse(response: any): Buffer | null {
  try {
    console.log('=== EXTRACTING IMAGE DEBUG ===');
    console.log('Full response structure:', JSON.stringify(response, null, 2));
    console.log('Response type:', typeof response);
    console.log('Has candidates:', !!response.candidates);
    console.log('Candidates length:', response.candidates?.length);
    console.log('Has response.response.candidates:', !!response.response?.candidates);
    console.log('Response.response.candidates length:', response.response?.candidates?.length);
    
    if (response.candidates?.length > 0) {
      console.log('First candidate from response.candidates:', JSON.stringify(response.candidates[0], null, 2));
    }
    
    if (response.response?.candidates?.length > 0) {
      console.log('First candidate from response.response.candidates:', JSON.stringify(response.response.candidates[0], null, 2));
    }

    // Check both response.response.candidates and response.candidates
    const candidates = response.response?.candidates || response.candidates || [];
    console.log('Using candidates from:', response.response?.candidates ? 'response.response.candidates' : 'response.candidates');
    
    for (const candidate of candidates) {
      console.log('Processing candidate:', !!candidate);
      console.log('Has content:', !!candidate.content);
      console.log('Has parts:', !!candidate.content?.parts);
      console.log('Parts length:', candidate.content?.parts?.length);
      
      for (const part of candidate.content?.parts || []) {
        console.log('Processing part:', JSON.stringify(part, null, 2));
        console.log('Has inlineData:', !!part.inlineData);
        console.log('Has data:', !!part.inlineData?.data);
        
        if (part.inlineData?.data) {
          console.log('Found image data, length:', part.inlineData.data.length);
          console.log('MIME type:', part.inlineData.mimeType);
          const buffer = Buffer.from(part.inlineData.data, 'base64');
          console.log('Created buffer, size:', buffer.length, 'bytes');
          return buffer;
        }
      }
    }
    
    console.log('No image data found in response');
    return null;
  } catch (error) {
    console.error("Error extracting image from response:", error);
    return null;
  }
}