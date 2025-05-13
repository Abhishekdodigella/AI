import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useStore } from '../store/useStore';

const ChatWidget: React.FC = () => {
  const { isChatOpen, setIsChatOpen, messages, addMessage, currentUser } = useStore();
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    addMessage({
      id: Date.now().toString(),
      ticketId: 'chat',
      userId: currentUser?.id || 'guest',
      content: newMessage,
      type: 'user',
      createdAt: new Date().toISOString(),
    });

    setNewMessage('');
  };

  if (!isChatOpen) {
    return (
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl">
      <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
        <h3 className="font-medium">Live Chat Support</h3>
        <button
          onClick={() => setIsChatOpen(false)}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="h-96 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;