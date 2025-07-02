'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EmotionFilter from './EmotionFilter';

type Emotion = 'conflict' | 'intimacy' | 'humor' | 'apology' | 'neutral';

type ChatEntry = {
  Datetime: string;
  Sender: string;
  Message: string;
  Emotion: Emotion;
};

const colorMap: Record<Emotion, string> = {
  conflict: 'bg-red-500',
  intimacy: 'bg-pink-500',
  humor: 'bg-yellow-400',
  apology: 'bg-blue-500',
  neutral: 'bg-gray-300',
};

const Timeline: React.FC = () => {
  const [chatData, setChatData] = useState<ChatEntry[]>([]);
  const [activeEmotions, setActiveEmotions] = useState<Emotion[]>([
    'conflict',
    'intimacy',
    'humor',
    'apology',
    'neutral',
  ]);

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

  const handleToggleEmotion = (emotion: Emotion) => {
    setActiveEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🧠 Relationship Timeline</h2>
      <EmotionFilter activeEmotions={activeEmotions} onToggle={handleToggleEmotion} />
      <div className="space-y-3">
        {chatData
          .filter((entry) => activeEmotions.includes(entry.Emotion))
          .map((entry, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded shadow text-white ${colorMap[entry.Emotion]}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.005 }}
            >
              <div className="text-sm opacity-80">
                {new Date(entry.Datetime).toLocaleString()}
              </div>
              <div className="font-semibold">{entry.Sender}</div>
              <div className="text-sm mt-1">{entry.Message}</div>
              <div className="text-xs mt-2 italic">Emotion: {entry.Emotion}</div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Timeline;
