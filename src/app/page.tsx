import Timeline from '@/components/Timeline';
import EmotionChart from '@/components/EmotionChart';
import InsightsPanel from '@/components/InsightsPanel';
import WordSearch from '@/components/WordSearch';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Intro Header */}
        <section className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">💌 Relationship Timeline</h1>
          <p className="text-gray-600 text-lg">
            Explore your emotional journey through a visual chat timeline, trends, search, and AI insights.
          </p>
        </section>

        {/* Timeline Viewer */}
        <section>
          <Timeline />
        </section>

        {/* Emotional Trends Dashboard */}
        <section>
          <h2 className="text-2xl font-bold mb-4">📊 Emotional Trends</h2>
          <EmotionChart />
        </section>

        {/* Insights Panel */}
        <section>
          <InsightsPanel />
        </section>

        {/* Word Search Feature */}
        <section>
          <WordSearch />
        </section>
        
      </div>
    </main>
