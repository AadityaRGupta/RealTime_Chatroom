require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const openai = require('openai');

openai.apiKey = process.env.OPENAI_API_KEY;

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('🟢 A user connected');

  socket.on('chat message', async (msg) => {
    io.emit('chat message', { sender: 'User', message: msg });

    if (msg.toLowerCase().includes('@bot')) {
      const reply = await getBotResponse(msg);
      io.emit('chat message', { sender: 'AIroom Bot 🤖', message: reply });
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});

async function getBotResponse(userInput) {
  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant in a chatroom.' },
        { role: 'user', content: userInput }
      ]
    });
    return chat.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching from OpenAI:', error.message);
    return 'Oops! I had trouble thinking just now. Try again!';
  }
}

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
