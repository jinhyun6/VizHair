import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateHairstyle, extractImageFromResponse } from '@/lib/gemini';
import { deductCredit, hasCredits } from '@/lib/credits';

// Create Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify the user token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const faceImage = formData.get('faceImage') as File;
    const hairstyleImage = formData.get('hairstyleImage') as File;

    // Validate required fields
    if (!faceImage || !hairstyleImage) {
      return NextResponse.json(
        { error: 'Both faceImage and hairstyleImage are required' },
        { status: 400 }
      );
    }

    // Validate file types
    if (!faceImage.type.startsWith('image/') || !hairstyleImage.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Both files must be images' },
        { status: 400 }
      );
    }

    // Validate file sizes (max 10MB each)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (faceImage.size > maxSize || hairstyleImage.size > maxSize) {
      return NextResponse.json(
        { error: 'Image files must be smaller than 10MB' },
        { status: 400 }
      );
    }

    // Check if user has credits
    const userHasCredits = await hasCredits(user.id);
    if (!userHasCredits) {
      return NextResponse.json(
        { error: 'Insufficient credits. Please purchase more credits to generate hairstyles.' },
        { status: 402 } // Payment Required
      );
    }

    // Use one credit before starting generation
    const creditResult = await deductCredit(user.id);
    if (!creditResult.success) {
      return NextResponse.json(
        { error: creditResult.message || 'Failed to use credit' },
        { status: 402 }
      );
    }

    console.log('Starting hairstyle generation for user:', user.id);
    console.log('Face image:', faceImage.name, faceImage.size, 'bytes');
    console.log('Hairstyle image:', hairstyleImage.name, hairstyleImage.size, 'bytes');

    // Generate hairstyle using Gemini API
    const geminiResponse = await generateHairstyle(faceImage, hairstyleImage);
    console.log('Gemini response:', JSON.stringify(geminiResponse, null, 2));

    // Extract image from response
    console.log('=== BUFFER EXTRACTION DEBUG ===');
    const generatedImageBuffer = extractImageFromResponse(geminiResponse);
    console.log('Generated buffer exists:', !!generatedImageBuffer);
    console.log('Buffer size:', generatedImageBuffer?.length, 'bytes');
    
    if (!generatedImageBuffer) {
      console.log('ERROR: No buffer returned from extractImageFromResponse');
      return NextResponse.json(
        { error: 'Failed to generate image. Please try again.' },
        { status: 500 }
      );
    }

    // Convert buffer to base64 for direct client download
    const base64Image = generatedImageBuffer.toString('base64');
    
    // Log success
    console.log('Hairstyle generation completed for user:', user.id);
    console.log('Generated image size:', generatedImageBuffer.length, 'bytes');

    return NextResponse.json({
      success: true,
      imageData: base64Image,
      mimeType: 'image/png',
      message: 'Hairstyle generated successfully!',
    });

  } catch (error) {
    console.error('Generate hairstyle API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}