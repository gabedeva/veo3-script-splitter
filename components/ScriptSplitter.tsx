"use client";

import { useState } from "react";
import { splitScriptForVeo, SplitMode } from "@/lib/splitScript";

export default function ScriptSplitter() {
  const [script, setScript] = useState("");
  const [speed, setSpeed] = useState(2.25);
  const [mode, setMode] = useState<SplitMode>("normal");
  const [scenes, setScenes] = useState<any[]>([]);
  const [veoJSON, setVeoJSON] = useState("");

  function handleSplit() {
    const result = splitScriptForVeo(script, {
      wordsPerSecond: speed,
      mode,
    });

    setScenes(result);

    const veo = result.map((s) => ({
      scene: s.scene,
      duration: mode === "nano" ? "ultra-short" : "0-8s",
      dialogue: s.text,
      style:
        mode === "nano"
          ? "ultra-short cinematic prompt"
          : "cinematic, realistic, commercial",
    }));

    setVeoJSON(JSON.stringify(veo, null, 2));
  }

  function copyJSON() {
    navigator.clipboard.writeText(veoJSON);
    alert("Veo JSON copied");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <textarea
        className="w-full h-40 p-4 border rounded-lg text-sm text-gray-500"
        placeholder="Paste your script here..."
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />

      <div className="flex flex-wrap items-center gap-4 text-gray-500">
        <label className="text-sm">
          Words/sec:
          <input
            type="number"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="ml-2 w-20 border rounded px-2 py-1"
            disabled={mode === "nano"}
          />
        </label>

        <select title="select"
          value={mode}
          onChange={(e) => setMode(e.target.value as SplitMode)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="normal">8s Veo Mode</option>
          <option value="nano">Nano Prompt Mode</option>
        </select>

        <button
          onClick={handleSplit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Generate
        </button>
      </div>

      {/* Scene Output */}
      <div className="space-y-4">
        {scenes.map((scene) => (
          <div
            key={scene.scene}
            className="p-4 border rounded-lg bg-gray-50"
          >
            <h4 className="font-semibold text-blue-600">
              Scene {scene.scene} — {scene.duration}
            </h4>
            <p className="text-sm mt-2 text-gray-500">{scene.text}</p>
          </div>
        ))}
      </div>

      {/* Veo JSON Export */}
      {veoJSON && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-blue-900">Veo 3 JSON Export</h3>
            <button
              onClick={copyJSON}
              className="text-sm px-3 py-1 bg-green-600 text-white rounded"
            >
              Copy JSON
            </button>
          </div>
          <pre className="bg-black text-green-400 p-4 rounded text-xs overflow-auto max-h-64">
            {veoJSON}
          </pre>
        </div>
      )}
    </div>
  );
}
