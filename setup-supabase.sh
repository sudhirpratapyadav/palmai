#!/bin/bash

# Setup script for new Supabase project
echo "🚀 Setting up Supabase project: ujcihodzxydtrpiwycgs"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "📦 Installing Supabase CLI..."
    npm install -g supabase
fi

# Login to Supabase (will open browser)
echo "🔐 Logging into Supabase..."
supabase login

# Link to the new project
echo "🔗 Linking to project..."
supabase link --project-ref ujcihodzxydtrpiwycgs

# Apply database migrations
echo "📊 Applying database migrations..."
supabase db push

# Deploy Edge Functions
echo "⚡ Deploying Edge Functions..."
supabase functions deploy generate-palm-reading
supabase functions deploy chat-with-ai

# Set up secrets (you'll need to provide your OpenAI API key)
echo "🔑 Setting up secrets..."
echo "Please enter your OpenAI API key:"
read -s OPENAI_KEY
supabase secrets set OPENAI_API_KEY=$OPENAI_KEY

echo "✅ Supabase setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/ujcihodzxydtrpiwycgs"
echo "2. Enable Authentication providers in Auth → Settings"
echo "3. Verify Storage bucket 'palm-images' was created"
echo "4. Test your app!"
