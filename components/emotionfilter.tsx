'use client';

import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

type Emotion = 'conflict' | 'intimacy' | 'humor' | 'apology' | 'neutral';

type ChatEntry = {
  Datetime: string;
  Sender: string;
  Message: string;
  Emotion: Emotion;
};

const emotionColors: Record<Emotion, string> = {
  conflict: '#ef4444',
  intimacy: '#ec4899',
  humor: '#facc15',
  apology: '#3b82f6',
  neutral: '#9ca3af',
};

const EmotionChart: React.FC = () => {
  const [chatData, setChatData] = useState<ChatEntry[]>([]);

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

  const emotionCounts: Record<Emotion, number> = {
    conflict: 0,
    intimacy: 0,
    humor: 0,
    apology: 0,
    neutral: 0,
  };

  chatData.forEach((entry) => {
    if (emotionCounts[entry.Emotion] !== undefined) {
      emotionCounts[entry.Emotion]++;
    }
  });

  const labels = Object.keys(emotionCounts) as Emotion[];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Emotion Frequency',
        data: labels.map((emotion) => emotionCounts[emotion]),
        backgroundColor: labels.map((emotion) => emotionColors[emotion]),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Bar Chart</h3>
        <Bar data={chartData} />
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Pie Chart</h3>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default EmotionChart;
