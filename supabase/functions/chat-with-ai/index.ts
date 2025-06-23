
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
    const { message, palmAnalysis, userProfile, chatHistory } = await req.json();

    // Build context from palm analysis
    const palmContext = palmAnalysis ? `
Palm Reading Analysis:
- Life Path Score: ${palmAnalysis.lifePath?.score}/100 - ${palmAnalysis.lifePath?.description}
- Career Score: ${palmAnalysis.career?.score}/100 - ${palmAnalysis.career?.description}  
- Relationships Score: ${palmAnalysis.relationships?.score}/100 - ${palmAnalysis.relationships?.description}
- Health Score: ${palmAnalysis.health?.score}/100 - ${palmAnalysis.health?.description}
- Spiritual Score: ${palmAnalysis.spiritual?.score}/100 - ${palmAnalysis.spiritual?.description}
` : '';

    const userContext = userProfile ? `
User Profile:
- Date of Birth: ${userProfile.dateOfBirth || 'Not provided'}
- Hand Preference: ${userProfile.handPreference}
- Gender: ${userProfile.gender}
` : '';

    // Build conversation history
    const conversationHistory = chatHistory?.slice(-10).map((msg: any) => ({
      role: msg.message_type === 'user' ? 'user' : 'assistant',
      content: msg.content
    })) || [];

    const systemPrompt = `You are a wise and intuitive palm reading guide with deep knowledge of palmistry, spirituality, and life guidance. You provide personalized insights based on the user's palm analysis and profile.

${palmContext}
${userContext}

Guidelines:
- Be warm, empathetic, and encouraging
- Reference specific details from their palm reading when relevant
- Provide practical advice along with spiritual insights
- Keep responses concise but meaningful (2-3 paragraphs max)
- Be specific about timing when discussing future events
- Connect their palm reading to their current question
- Use a mystical but grounded tone`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate response');
    }

    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
