'use client';

import React, { useEffect, useState } from 'react';

type Emotion = 'conflict' | 'intimacy' | 'humor' | 'apology' | 'neutral';

type ChatEntry = {
  Datetime: string;
  Sender: string;
  Message: string;
  Emotion: Emotion;
};

const WordSearch: React.FC = () => {
  const [chatData, setChatData] = useState<ChatEntry[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ChatEntry[]>([]);

  useEffect(() => {
    fetch('/structured_chat_data.csv')
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv.split('\n').slice(1).filter(Boolean);
        const parsed = rows.map((row) => {
          const [Datetime, Sender, Message, Emotion] = row.split(',');
          return {
            Datetime,
            Sender,
            Message,
            Emotion: (Emotion?.trim() || 'neutral') as Emotion,
          };
        });
        setChatData(parsed);
      });
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    if (!q) {
      setResults([]);
    } else {
      setResults(
        chatData.filter(
          (entry) =>
            entry.Message.toLowerCase().includes(q) ||
            entry.Sender.toLowerCase().includes(q)
        )
      );
    }
  }, [query, chatData]);

  return (
    <div className="bg-white p-6 mt-10 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">🔎 Word Search</h2>
      <input
        type="text"
        placeholder="Search for any word or phrase..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-400"
      />
      {query && (
        <div>
          <p className="mb-2 text-sm text-gray-500">
            {results.length} match{results.length !== 1 && 'es'} found
          </p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {results.map((entry, i) => (
              <div key={i} className="p-3 border border-gray-200 rounded">
                <div className="text-xs text-gray-500">
                  {new Date(entry.Datetime).toLocaleString()} • {entry.Sender}
                </div>
                <div className="text-sm mt-1">{entry.Message}</div>
                <div className="text-xs mt-1 italic text-gray-400">Emotion: {entry.Emotion}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordSearch;
