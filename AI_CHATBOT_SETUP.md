# Claude Expert Chatbot - AI Setup Guide

## 🤖 AI Model Integration

The Claude Expert Chatbot now supports real AI responses using **HuggingFace's free AI models** for lifestyle, romance, and psychology advice. No API keys or local installation required!

## 🔧 Setup Instructions

### 🔑 HuggingFace API Key Setup (Recommended)
For the best AI experience, add your HuggingFace API key:

1. **Get HuggingFace API Key**:
   - Visit [HuggingFace Settings](https://huggingface.co/settings/tokens)
   - Create a new token with "Read" permissions
   - Copy the API key

2. **Configure Environment Variables**:
   Create a `.env.local` file in your project root and add:
   ```bash
   # HuggingFace API Configuration
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

3. **Restart Development Server**:
   ```bash
   npm run dev
   ```

### ✅ Fallback Mode (No API Key Required)
If you don't have a HuggingFace API key, the chatbot will automatically use intelligent fallback responses:
- ❌ No API keys needed
- ❌ No local installation  
- ❌ No registration
- ✅ Works out of the box with pre-written responses!

### 🚀 Ready to Use
Simply start the development server:
```bash
npm run dev
```

The AI chatbot will automatically use HuggingFace's free models!

## 🎯 Features

### AI-Powered Responses
- **Real AI Model**: Uses HuggingFace's DialoGPT model for intelligent responses (with API key)
- **Fallback System**: Intelligent pre-written responses when API key is not available
- **Topic-Specific**: Different AI personalities for each conversation topic
- **Fallback System**: Graceful fallback to pre-written responses if API fails

### Conversation Topics
- **💕 Romance & Relationships**: AI provides relationship advice and dating tips
- **🌟 Lifestyle & Wellness**: AI helps with personal growth and healthy habits
- **🧠 Psychology & Mind**: AI offers mental health support and emotional guidance
- **💼 Career & Success**: AI provides professional development advice
- **👥 Social & Communication**: AI helps with social skills and interactions
- **💬 General Chat**: AI engages in casual, supportive conversations

### AI Personalities
Each topic has a specialized AI personality:
- **Romance**: Warm, empathetic, relationship-focused
- **Lifestyle**: Practical, encouraging, wellness-oriented
- **Psychology**: Compassionate, supportive, mental health-aware
- **Career**: Professional, goal-oriented, success-focused
- **Social**: Friendly, communication-focused, relationship-building
- **General**: Wise, supportive, all-around helpful

## 🔒 Privacy & Security

- All conversations are processed securely through HuggingFace's API
- No conversation data is stored permanently
- API keys are kept secure in environment variables
- Fallback responses ensure the chatbot always works

## 💡 Usage Tips

1. **Be Specific**: The more specific your questions, the better the AI responses
2. **Switch Topics**: Use the topic selector to get specialized advice
3. **Ask Follow-ups**: The AI can handle multi-turn conversations
4. **Share Context**: Provide background information for better advice

## 🚀 Advanced Configuration

### Custom AI Models
You can modify the API route (`src/app/api/chat/route.ts`) to use different HuggingFace models:
- `microsoft/DialoGPT-large`: Current model for conversational AI
- `facebook/blenderbot-400M-distill`: Alternative conversational model
- `microsoft/DialoGPT-medium`: Lighter version for faster responses

### Response Customization
Modify the system prompts in the API route to change AI personalities:
- Adjust tone and style
- Add specific expertise areas
- Customize response length and format

## 🆘 Troubleshooting

### API Key Issues
- Ensure your HuggingFace API key is valid and has "Read" permissions
- Check that the key is properly set in `.env.local`
- Restart the development server after adding the key

### API Issues
- HuggingFace API may have rate limits
- The chatbot will automatically fall back to pre-written responses if the API fails
- Check the browser console for error messages
- Verify your internet connection

### Rate Limits
- HuggingFace free tier has usage limits
- If you hit limits, the chatbot falls back to pre-written responses
- No cost management needed - completely free!

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your HuggingFace API key configuration
3. Test with the fallback responses first
4. Check HuggingFace service status
5. Verify your internet connection

The chatbot is designed to work seamlessly with or without the AI integration!
