import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatbot = {
  async getResponse(message: string, context?: string) {
    try {
      const systemPrompt = `
        You are a helpful assistant for Cryptic Mobile Detailing, a premium mobile car detailing service.
        
        Services:
        - Premium Detail Package ($75): Complete exterior/interior detailing
        - Ultimate Protection Package ($150): Premium detailing + ceramic coating (Coming Soon)
        - Commercial Fleet Service ($250): Professional fleet detailing (Coming Soon) 
        - Luxury Concierge Service ($350): White-glove luxury service (Coming Soon)
        - Monthly Membership ($99.99/month): Unlimited monthly detailing
        
        Contact: ${process.env.OWNER_PHONE} | ${process.env.OWNER_EMAIL}
        
        You can help customers:
        1. Answer questions about services
        2. Assist with booking (collect: name, email, phone, service, date/time)
        3. Explain membership benefits
        
        Be professional, friendly, and focus on the quality and convenience of mobile detailing.
        If asked to book, guide them through the process step by step.
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'I apologize, but I\'m having trouble responding right now. Please contact us directly at ' + process.env.OWNER_PHONE;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'I apologize, but I\'m having trouble responding right now. Please contact us directly at ' + process.env.OWNER_PHONE;
    }
  }
};