# OpenKey Setup Instructions

## Environment Variables

Create a `.env.local` file in the `openkey-web` directory with the following content:

```bash
# OpenAI API Configuration
# 
# Required for GPT-4 powered natural language parsing in /api/parse
# Get your API key from: https://platform.openai.com/api-keys
#
# The app will fall back to a basic parser if this key is not set,
# but GPT-4 extraction provides much better understanding of:
# - Natural language budget mentions ("2.5M", "under 3 million AED")
# - Fuzzy location inference ("near beach" → JBR/Marina, "downtown" → Downtown Dubai)
# - Implicit amenity needs ("family friendly" → kids_area + school_nearby + park_nearby)
# - Timeline parsing ("early 2027", "Q2 2026", "soon")
# - Investment intent detection (ROI, rental yield mentions)
#
# Model used: gpt-4o-mini (fast, cost-effective, good for structured extraction)
#
OPENAI_API_KEY=your_openai_api_key_here
```

## Getting Started

1. Copy the environment variables above into `.env.local`
2. Get your OpenAI API key from https://platform.openai.com/api-keys
3. Replace `your_openai_api_key_here` with your actual API key
4. Run `npm run dev` to start the development server

## Without OpenAI API Key

The app will still work without an OpenAI API key, but will use a basic fallback parser that returns neutral search results. For the best experience, we recommend setting up the OpenAI API key.


