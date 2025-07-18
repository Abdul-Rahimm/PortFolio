# YouTube API Setup Instructions

To fetch real YouTube videos from your channel, you need to set up the YouTube Data API v3.

## Steps:

1. **Get a YouTube API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the YouTube Data API v3
   - Create credentials (API Key)
   - Copy the API key

2. **Find Your Channel ID:**
   - Go to your YouTube Studio
   - Click on "Settings" → "Channel" → "Advanced settings"
   - Copy your Channel ID
   
   OR
   
   - The system will automatically try to find your channel using the handle "@AbdulRaheemCodes"

3. **Configure Environment Variables:**
   - Open `.env.local` in your project root
   - Replace the placeholders:
   ```
   YOUTUBE_API_KEY=your_actual_api_key_here
   YOUTUBE_CHANNEL_ID=your_actual_channel_id_here
   ```

4. **Test the Integration:**
   - Restart your development server
   - Visit the videos page to see if videos are loaded
   - Check the homepage for YouTube videos

## Important Notes:

- The YouTube Data API has quota limits (10,000 units per day by default)
- Each video fetch uses approximately 105 quota units
- The system fetches the latest 5 videos from your channel
- Videos are fetched fresh each time (no caching for real-time updates)

## Troubleshooting:

- If videos don't load, check the browser console for error messages
- Verify your API key has the YouTube Data API v3 enabled
- Make sure your channel is public and has uploaded videos
- Check if you've exceeded your API quota limits

## Security:

- Never commit your `.env.local` file to git
- The API key is only used server-side for security
- Consider implementing caching for production to reduce API calls
