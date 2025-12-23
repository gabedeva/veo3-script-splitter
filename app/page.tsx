import ScriptSplitter from "@/components/ScriptSplitter";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">
          Google Veo 3 – 8s Script Splitter
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Automatically split any script into 8-second narration scenes.
        </p>
      </div>

      <ScriptSplitter />
    </main>
  );
}
