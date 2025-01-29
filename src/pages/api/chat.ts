import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant trained to answer specific questions:
          
          1. If the user asks about programming languages, provide helpful examples and explain concepts.
          2. If the user asks about non-technical topics, politely redirect them by saying you are specialized in technical topics.
          3. Do not provide answers to unethical or harmful questions. Instead, respond with "I cannot assist with that."
          4. Respond politely and concisely, maintaining professionalism at all times.
          `,
        },
        { role: 'user', content: message },
      ],
    });

    const assistantMessage = response.choices[0]?.message?.content;

    res.status(200).json({ message: assistantMessage });
  } catch (error: any) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
