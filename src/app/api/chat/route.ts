import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse request body with error handling
    let requestData;
    try {
      requestData = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const { message, topic } = requestData;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Create a system prompt based on the topic
    const systemPrompts = {
      romance: `You are Sakura Nakamura, a warm and empathetic AI Research Scientist specializing in romance and relationships. You provide thoughtful, supportive advice about love, dating, relationships, and emotional connections. Be understanding, non-judgmental, and offer practical wisdom while maintaining a caring tone. Keep responses conversational and helpful, around 2-3 sentences.`,
      lifestyle: `You are Sakura Nakamura, a knowledgeable AI Research Scientist focused on lifestyle and wellness. You help with personal growth, healthy habits, work-life balance, and overall well-being. Provide practical, actionable advice while being encouraging and supportive. Keep responses conversational and helpful, around 2-3 sentences.`,
      psychology: `You are Sakura Nakamura, a compassionate AI Research Scientist with expertise in psychology and mental health. You offer gentle guidance on emotions, thoughts, behaviors, and mental wellness. Be empathetic, supportive, and provide helpful insights while encouraging professional help when needed. Keep responses conversational and helpful, around 2-3 sentences.`,
      career: `You are Sakura Nakamura, a professional AI Research Scientist specializing in career development and success. You provide guidance on professional growth, goal-setting, workplace challenges, and career advancement. Be encouraging, practical, and offer actionable advice. Keep responses conversational and helpful, around 2-3 sentences.`,
      social: `You are Sakura Nakamura, a friendly AI Research Scientist who helps with social skills and communication. You provide advice on building relationships, improving social interactions, and developing better communication skills. Be supportive, understanding, and offer practical tips. Keep responses conversational and helpful, around 2-3 sentences.`,
      general: `You are Sakura Nakamura, a warm and wise AI Research Scientist who provides thoughtful advice on various life topics. You're here to listen, understand, and offer helpful guidance with empathy and care. Be supportive, non-judgmental, and provide practical wisdom. Keep responses conversational and helpful, around 2-3 sentences.`
    };

    const systemPrompt = systemPrompts[topic as keyof typeof systemPrompts] || systemPrompts.general;

    // For now, we'll use a fallback response system since we don't have OpenAI API key
    // In production, you would replace this with actual OpenAI API call
    const fallbackResponses = {
      romance: [
        "Love is a beautiful journey that requires patience and understanding. What specific aspect of romance would you like to explore?",
        "Relationships are built on trust, communication, and mutual respect. Tell me about your current situation.",
        "Dating can be challenging, but remember that the right person will appreciate you for who you are. What's on your mind?",
        "Romantic connections often start with genuine friendship. How are you feeling about your love life lately?",
        "Every relationship teaches us something valuable. What would you like to discuss about romance?"
      ],
      lifestyle: [
        "A balanced lifestyle is key to happiness and fulfillment. What area of your life would you like to improve?",
        "Small daily habits can create significant positive changes. What lifestyle changes are you considering?",
        "Wellness encompasses physical, mental, and emotional health. How are you taking care of yourself?",
        "Life is about finding what brings you joy and purpose. What makes you feel most alive?",
        "Personal growth is a continuous journey. What would you like to work on in your life?"
      ],
      psychology: [
        "Understanding our emotions and thoughts is the first step toward mental wellness. How are you feeling today?",
        "Our minds are incredibly powerful tools. What psychological aspect would you like to explore?",
        "Mental health is just as important as physical health. What's on your mind lately?",
        "Emotions are valid and temporary. What emotional challenge are you facing?",
        "Self-awareness is the foundation of personal growth. What would you like to understand better about yourself?"
      ],
      career: [
        "Career success comes from passion, persistence, and continuous learning. What are your professional goals?",
        "Every career path has its challenges and rewards. What aspect of your work life concerns you?",
        "Professional growth requires stepping out of your comfort zone. What opportunities are you considering?",
        "Work-life balance is crucial for long-term success. How are you managing your career and personal life?",
        "Success is defined differently by everyone. What does career success mean to you?"
      ],
      social: [
        "Social connections are essential for our well-being. How are your relationships with others?",
        "Communication is an art that can be learned and improved. What social situation challenges you?",
        "Building meaningful relationships takes time and effort. What would you like to improve in your social life?",
        "Social anxiety is common and manageable. What social situations make you feel uncomfortable?",
        "Friendship and community provide support and joy. How are you nurturing your social connections?"
      ],
      general: [
        "I'm here to listen and help with whatever's on your mind. What would you like to talk about?",
        "Sometimes it helps to share our thoughts with someone who understands. What's bothering you today?",
        "Life can be complex, but talking through our concerns often brings clarity. What's on your mind?",
        "I'm Claude, your AI companion for thoughtful conversations. How can I assist you today?",
        "Every conversation is an opportunity for growth and understanding. What would you like to explore?"
      ]
    };

    const responses = fallbackResponses[topic as keyof typeof fallbackResponses] || fallbackResponses.general;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Try to use HuggingFace free AI model
    if (process.env.HUGGINGFACE_API_KEY) {
      try {
        const huggingfaceResponse = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: `${systemPrompt}\n\nUser: ${message}\n\nSakura:`,
          parameters: {
            max_length: 150,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false,
            pad_token_id: 0
          }
        }),
      });

      if (huggingfaceResponse.ok) {
        let hfData;
        try {
          hfData = await huggingfaceResponse.json();
        } catch (jsonError) {
          console.error('HuggingFace JSON parse error:', jsonError);
          // Fall through to fallback response
        }
        
        if (hfData) {
          let aiResponse = randomResponse;
          
          if (Array.isArray(hfData) && hfData.length > 0) {
            aiResponse = hfData[0].generated_text || randomResponse;
          }
          
          return NextResponse.json({ 
            response: aiResponse,
            topic: topic,
            source: 'huggingface'
          });
        }
        } else {
          console.error('HuggingFace API response not ok:', huggingfaceResponse.status);
        }
      } catch (error) {
        console.error('HuggingFace API error:', error);
        // Fall through to fallback response
      }
    } else {
      console.log('HuggingFace API key not found, using fallback responses');
    }

    // Fallback to local responses
    return NextResponse.json({ 
      response: randomResponse,
      topic: topic,
      source: 'fallback'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' }, 
      { status: 500 }
    );
  }
}
