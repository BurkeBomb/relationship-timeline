'use client';

import React, { useState, useEffect } from 'react';

type Emotion = 'conflict' | 'intimacy' | 'humor' | 'apology' | 'neutral';

type ChatEntry = {
  Datetime: string;
  Sender: string;
  Message: string;
  Emotion: Emotion;
};

const InsightsPanel: React.FC = () => {
  const [chatData, setChatData] = useState<ChatEntry[]>([]);
  const [open, setOpen] = useState(true);

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

  const totalMessages = chatData.length;
  const emotionCount = chatData.reduce(
    (acc, cur) => {
      acc[cur.Emotion] = (acc[cur.Emotion] || 0) + 1;
      return acc;
    },
    {} as Record<Emotion, number>
  );

  const insightLines = [
    emotionCount.conflict > 50
      ? '⚠️ High conflict detected. Consider reflecting on communication triggers.'
      : null,
    emotionCount.intimacy > 40
      ? '❤️ Strong intimacy present. Relationship shows deep bonding.'
      : null,
    emotionCount.apology > 20
      ? '🔁 Frequent apologies. Could signal cycles of tension and reconciliation.'
      : null,
    emotionCount.humor > 30
      ? '😂 Laughter and playfulness are frequent. Good emotional lightness.'
      : null,
  ].filter(Boolean);

  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
      <button
        className="mb-4 text-blue-600 underline text-sm"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Hide Insights Panel' : 'Show Insights Panel'}
      </button>

      {open && (
        <>
          <h3 className="text-2xl font-semibold mb-4">🔍 Insights Panel</h3>
          <p className="text-gray-700 mb-2">
            Based on <strong>{totalMessages}</strong> messages analyzed:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {insightLines.length > 0 ? (
              insightLines.map((line, i) => <li key={i}>{line}</li>)
            ) : (
              <li>No strong emotional patterns detected.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default InsightsPanel;
