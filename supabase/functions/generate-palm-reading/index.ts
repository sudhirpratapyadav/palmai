
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userProfile, palmImageBase64 } = await req.json();

    console.log('Starting palm reading generation for user profile:', userProfile);

    const prompt = `You are an expert palmist with decades of experience in reading palms. First, carefully examine this image to determine if it shows a clear, readable palm.

CRITICAL FIRST STEP - IMAGE VALIDATION:
1. Check if this is actually a palm image (shows the inside of a hand)
2. Verify the image quality is sufficient for palmistry analysis
3. Ensure the palm lines are clearly visible
4. Confirm the lighting allows for proper analysis

IF THE IMAGE IS NOT SUITABLE (blurry, not a palm, poor lighting, unclear lines), respond with ONLY this JSON:
{
  "error": "The palm image is not clear or it's not a palm image. Please upload a clear photo of your palm with good lighting showing the palm lines clearly."
}

IF THE IMAGE IS SUITABLE, proceed with detailed analysis:

User Profile:
- Date of Birth: ${userProfile.dateOfBirth || 'Not provided'}
- Hand Preference: ${userProfile.handPreference}
- Gender: ${userProfile.gender}

DETAILED PALMISTRY ANALYSIS INSTRUCTIONS:
1. Examine the ACTUAL palm image with extreme care and detail
2. Identify and analyze each major palm line based on what you REALLY see
3. Observe the exact characteristics: depth, length, curvature, breaks, chains, islands
4. Note the palm mounts, hand shape, finger proportions, and skin texture
5. Base your analysis ENTIRELY on the visible features in this specific palm

PALM LINE ANALYSIS (Based on what you actually observe):
- Heart Line: Document its exact starting point, curve pattern, depth, length, any visible breaks, chains, or unusual markings
- Head Line: Note where it begins, its direction (straight/curved), depth, length, any islands, breaks, or distinctive features
- Life Line: Observe its curve around the thumb mount, strength, any breaks, chains, or special markings
- Fate Line: If present, describe its starting point, direction, strength, continuity, and any interruptions
- Other Lines: Marriage lines, travel lines, money lines, or other distinctive features you can clearly see

PHYSICAL PALM OBSERVATIONS:
- Hand shape classification (square, rectangular, spatulate, pointed, mixed)
- Mount development (Venus, Jupiter, Saturn, Apollo, Mercury, Mars, Moon)
- Finger length ratios and flexibility
- Skin texture, color, and overall palm health
- Any distinctive markings, stars, crosses, triangles, or islands

Based on these REAL observations from the actual palm image, provide detailed scores and insights:

RETURN ONLY VALID JSON with this exact structure (no markdown, no code blocks):
{
  "lifePath": {
    "score": number (0-100 based on actual life line strength, clarity, and mount development),
    "description": "string (specific analysis based on what you observe in this palm's life line and overall vitality indicators)",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  },
  "career": {
    "score": number (0-100 based on head line characteristics, fate line presence, and relevant mounts),
    "description": "string (specific career potential based on actual head line direction, fate line strength, and mount development you observe)", 
    "keywords": ["keyword1", "keyword2", "keyword3"]
  },
  "relationships": {
    "score": number (0-100 based on heart line characteristics and Venus mount development),
    "description": "string (relationship insights based on actual heart line curve, depth, and Venus mount you see)",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  },
  "health": {
    "score": number (0-100 based on life line vitality and overall palm health indicators),
    "description": "string (health insights based on life line strength, skin texture, and overall palm vitality you observe)",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  },
  "spiritual": {
    "score": number (0-100 based on intuition lines, mount development, and spiritual indicators),
    "description": "string (spiritual insights based on actual mount development and intuitive lines you can see)",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  },
  "palmLines": {
    "heartLine": {
      "description": "EXTREMELY DETAILED description of the ACTUAL heart line you observe: exact starting point (under which finger), its curve pattern (high/low arch), depth and clarity, length (where it ends), any visible breaks, chains, islands, or forks. Mention specific characteristics that make this heart line unique in this palm.",
      "characteristics": ["Specific observation 1 from this heart line", "Specific observation 2", "Specific observation 3"]
    },
    "headLine": {
      "description": "EXTREMELY DETAILED description of the ACTUAL head line: exact starting point (connected to life line or separate), direction and angle, straightness or curve, depth and clarity, length, any islands, breaks, or distinctive markings. Note how it relates to other lines in this specific palm.",
      "characteristics": ["Specific head line feature 1", "Specific head line feature 2", "Specific head line feature 3"]
    },
    "lifeLine": {
      "description": "EXTREMELY DETAILED description of the ACTUAL life line: its exact curve around the thumb mount, depth and strength, any visible breaks or chains, how close it comes to the thumb, its overall vitality appearance, any distinctive markings or characteristics unique to this palm.",
      "characteristics": ["Specific life line observation 1", "Specific life line observation 2", "Specific life line observation 3"]
    },
    "fateLine": {
      "description": "DETAILED description of the fate line if clearly visible: exact starting point (wrist, life line, or elsewhere), direction toward which mount, strength and continuity, any breaks or deviations, overall clarity. If not clearly visible, state that explicitly.",
      "characteristics": ["Actual fate line observation 1", "Actual fate line observation 2", "Actual fate line observation 3"]
    },
    "additionalFeatures": {
      "description": "DETAILED description of other significant features you can clearly observe: marriage lines (number and depth), travel lines, money lines, unusual markings (stars, triangles, crosses), mount development (which mounts are prominent), finger characteristics, skin texture, or any other notable palmistry elements visible in this specific palm.",
      "characteristics": ["Notable feature 1 you actually see", "Notable feature 2 you actually see", "Notable feature 3 you actually see"]
    }
  }
}

CRITICAL: Your analysis must be based entirely on what you can ACTUALLY observe in this palm image. Do not use generic descriptions. Make it specific and authentic to this person's unique palm characteristics.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: palmImageBase64,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      if (response.status === 429) {
        throw new Error('API quota exceeded. Please check your OpenAI billing and usage limits.');
      } else if (response.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
      } else {
        throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI API');
    }

    let content = data.choices[0].message.content;
    console.log('Raw OpenAI response:', content);
    
    // Clean up the response - remove markdown code blocks if present
    content = content.replace(/```json\s*\n?/g, '').replace(/```\s*$/g, '').trim();
    
    try {
      const analysisData = JSON.parse(content);
      
      // Check if the response contains an error (invalid image)
      if (analysisData.error) {
        console.log('Invalid palm image detected:', analysisData.error);
        return new Response(JSON.stringify({ 
          error: analysisData.error 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      console.log('Analysis data parsed successfully');
      return new Response(JSON.stringify({ analysisData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      console.error('Parse error:', parseError);
      throw new Error('Invalid response format from AI - could not parse analysis data');
    }

  } catch (error) {
    console.error('Error in generate-palm-reading function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check the function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
