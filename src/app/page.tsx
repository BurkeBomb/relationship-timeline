'use client';

import { useEffect, useState } from 'react';
import { getMessages, ChatMessage } from '@/lib/getMessages';
import { filterMessages } from '@/lib/filterMessages';

const emotionColor: { [key: string]: string } = {
  Support: 'text-green-600',
  Conflict: 'text-red-600',
  Intimacy: 'text-pink-600',
  Neutral: 'text-gray-600',
  Insight: 'text-yellow-500',
};

export default function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [filtered, setFiltered] = useState<ChatMessage[]>([]);
  const [search, setSearch] = useState('');

  // Debug: make sure env variable works
  console.log('API key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

  useEffect(() => {
    async function loadMessages() {
      const data = await getMessages();
      setMessages(data);
      setFiltered(data);
    }

    loadMessages();
  }, []);

  const handleSearch = (query: string) => {
    setSearch(query);
    const results = filterMessages(messages, { keyword: query });
    setFiltered(results);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto space-y-10">
        <header>
          <h1 className="text-4xl font-bold text-indigo-700">Relationship Timeline</h1>
          <p className="text-gray-600 mt-2">Explore your journey. Understand your love story.</p>
        </header>

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search chat history..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Timeline */}
        <section className="bg-white shadow-md rounded p-5">
          <h2 className="text-2xl font-semibold mb-4">Interactive Timeline</h2>
          {filtered.length === 0 ? (
            <p className="text-gray-500">No messages found.</p>
          ) : (
            <ul className="space-y-4">
              {filtered.map((msg) => (
                <li key={msg.id} className="border-b pb-3">
                  <div className="text-sm text-gray-500 mb-1">
                    {new Date(msg.timestamp).toLocaleString()} · {msg.sender}
                  </div>
                  <div className="text-lg">{msg.message}</div>
                  <div className={`text-sm ${emotionColor[msg.emotion] || 'text-gray-400'}`}>
                    Emotion: {msg.emotion}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Emotional Chart Placeholder */}
        <section className="bg-white shadow-md rounded p-5">
          <h2 className="text-2xl font-semibold mb-4">Emotional Trends</h2>
          <p className="text-gray-500">Chart.js visualization placeholder.</p>
        </section>

        {/* Insight Placeholder */}
        <section className="bg-white shadow-md rounded p-5">
          <h2 className="text-2xl font-semibold mb-4">AI Insights</h2>
          <p className="text-gray-500">Insights loaded yet.</p>
        </section>
      </div>
    </main>
  );
}
