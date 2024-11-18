import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);
  app.use(express.static('public'));
  app.use(express.json());

  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      
      const response = await axios({
        method: 'post',
        url: `${process.env.DEEPSEEK_API_URI}/chat/completions`,
        data: {
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: message }],
          stream: true,
          temperature: 0.7,
          max_tokens: 2000
        },
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        responseType: 'stream'
      });

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      response.data.on('data', chunk => {
        const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            res.write(line + '\n\n');
          }
        }
      });

      response.data.on('end', () => {
        res.end();
      });

      response.data.on('error', error => {
        console.error('Stream error:', error);
        res.end();
      });

    } catch (error) {
      console.error('Chat API Error:', error.response?.data || error.message);
      res.status(500).json({ 
        error: 'Failed to process chat request',
        details: error.response?.data || error.message 
      });
    }
  });

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    try {
      let template = await vite.transformIndexHtml(url, `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>SciHelp - AI Research Assistant</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main.tsx"></script>
          </body>
        </html>
      `);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
}

createServer();