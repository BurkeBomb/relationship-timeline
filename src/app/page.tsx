'use client';

import Timeline from '@/components/Timeline';
import InsightPanel from '@/components/InsightPanel';
import SearchBar from '@/components/SearchBar';
import EmotionChart from '@/components/EmotionChart';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 drop-shadow-md">
            Relationship Timeline
          </h1>
          <p className="mt-2 text-lg text-gray-600 italic">
            Explore your journey. Understand your love story.
          </p>
        </header>

        {/* Word Search */}
        <section className="bg-white shadow rounded-lg p-4">
          <SearchBar />
        </section>

        {/* Interactive Timeline */}
        <section className="bg-white shadow rounded-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Timeline</h2>
          <Timeline />
        </section>

        {/* Emotion Analytics */}
        <section className="bg-white shadow rounded-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Emotional Trends</h2>
          <EmotionChart />
        </section>

        {/* AI Insight Panel */}
        <section className="bg-white shadow rounded-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI Insights</h2>
          <InsightPanel />
        </section>
      </div>
    </main>
  );
}
