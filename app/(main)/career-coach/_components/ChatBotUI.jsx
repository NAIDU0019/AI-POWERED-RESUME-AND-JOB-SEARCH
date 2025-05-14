'use client';

import { useState } from 'react';

export default function ChatBotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return; // Don't send empty messages

    setLoading(true);

    const response = await fetch('/api/career-chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    // Clean up AI response to avoid unnecessary symbols like stars or emojis
    const cleanResponse = data.reply.replace(/[\*\u{1F600}-\u{1F64F}]/gu, '');

    setMessages([
      ...messages,
      { user: input },
      { ai: cleanResponse },
    ]);
    setInput('');
    setLoading(false);
  };

  const rainbowColors = [
    '#FF0000', // Red
    '#FF7F10', // Orange
    '#FFFF00', // Yellow
    '#008000', // Green
    '#0100FF', // Blue
    '#4B0082', // Indigo
    '#EE82EE', // Violet
  ];

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <div className="space-y-4 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`p-2 max-w-xs rounded-lg ${msg.user ? 'text-white' : 'text-black'} animate-gradient-bg`}
              style={{
                background: `linear-gradient(45deg, ${rainbowColors[index % rainbowColors.length]}, ${rainbowColors[(index + 1) % rainbowColors.length]})`,
                backgroundSize: '400% 400%',
                color: msg.user ? '#FFFFFF' : '#000000',
              }}
            >
              <strong>{msg.user ? 'You' : 'AI'}:</strong> {msg.user || msg.ai}
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a career question..."
          className="flex-1 p-2 border rounded-lg"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>

      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-bg {
          animation: gradientAnimation 4s ease infinite;
        }
      `}</style>
    </div>
  );
}
