# RealTime_Chatroom
A real-time chat app with an integrated AI bot powered by OpenAI GPT. Users can join rooms, message live, and trigger intelligent responses from @bot. Uses WebSockets (Socket.io) and Express.js backend.

## Features
- Join a chatroom in real-time via Socket.io
- Send and receive messages instantly
- Mention `@bot` to trigger a GPT-based response
- Log chat history per session
- Scalable chat engine using WebSockets

## Tech Stack
- Backend: Node.js, Express.js, Socket.io
- Frontend: HTML/CSS, Vanilla JS
- AI Integration: OpenAI GPT-3.5 API

## Environment Setup
Create a `.env` file:
```
OPENAI_API_KEY=your_openai_api_key_here
```
