import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  prompt: string;
  style: 'professional' | 'casual' | 'creative' | 'academic';
  length: 'short' | 'medium' | 'long';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style, length } = await req.json() as RequestBody;

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create system message based on style and length
    const lengthTokens = {
      short: 100,
      medium: 250,
      long: 500,
    };

    const stylePrompts = {
      professional: 'Write in a clear, formal, and business-appropriate tone.',
      casual: 'Write in a friendly, conversational, and relaxed tone.',
      creative: 'Write in an imaginative, expressive, and engaging tone.',
      academic: 'Write in a scholarly, analytical, and research-oriented tone.',
    };

    // Generate text using the built-in AI features
    const response = await supabaseClient.functions.invoke('ai-text', {
      body: {
        messages: [
          {
            role: 'system',
            content: `You are an AI writing assistant. ${stylePrompts[style]} Limit the response to approximately ${lengthTokens[length]} tokens.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
    });

    return new Response(
      JSON.stringify({ text: response.data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});