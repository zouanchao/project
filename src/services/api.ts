import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  baseURL: import.meta.env.VITE_DEEPSEEK_BASE_URL,
  dangerouslyAllowBrowser: true // Enable browser usage
});

export const chatService = {
  async sendMessage(message: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_DEEPSEEK_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI research assistant. Help users write better research papers by providing detailed outlines and suggestions.'
            },
            { role: 'user', content: message }
          ],
          stream: true,
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Response body is not readable');

      return {
        [Symbol.asyncIterator]: async function* () {
          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') break;
                try {
                  const parsed = JSON.parse(data);
                  yield parsed;
                } catch (e) {
                  console.error('Failed to parse SSE data:', e);
                }
              }
            }
          }
        }
      };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};