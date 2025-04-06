import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data.data[0].url;

    // TODO: Upload to IPFS/Arweave
    // For now, we'll return the OpenAI URL directly
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({ message: 'Error generating image' });
  }
} 