"use client";

import { useState } from "react";
import { splitScriptForVeo } from "@/lib/splitScript";
import { BRAND_PRESETS } from "@/lib/brandPresets";
import { MOODS, Mood } from "@/lib/moods";


export default function ScriptSplitter() {
  const [script, setScript] = useState("");
  const [speed, setSpeed] = useState(2.25);
  const [mode, setMode] = useState<"normal" | "nano">("normal");
  const [scenes, setScenes] = useState<any[]>([]);
  const [veoJSON, setVeoJSON] = useState("");
  const [brandKey, setBrandKey] = useState("oladprints");

  const [brandName, setBrandName] = useState("");
  const [environment, setEnvironment] = useState("");
  const [mood, setMood] = useState<Mood>("professional");

  function handleSplit() {
    const result = splitScriptForVeo(
    script,
    {
      brandName,
      environment,
      mood,
    },
    { mode, wordsPerSecond: speed }
  );

    setScenes(result);

    const veo = result.map((s) => ({
      scene: s.scene,
      duration: mode === "nano" ? "ultra-short" : "0-8s",
      dialogue: s.visualPrompt,
      style:
        mode === "nano"
          ? "ultra-short cinematic prompt"
          : "cinematic, realistic, commercial",
    }));

    setVeoJSON(JSON.stringify(veo, null, 2));

    const veoExport = result.map((s) => ({
    scene: s.scene,
    duration: mode === "nano" ? "ultra-short" : "0-8s",
    dialogue: s.dialogue,
    visual_prompt: s.visualPrompt,
    }));

    setVeoJSON(JSON.stringify(veoExport, null, 2));
    
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
          onChange={(e) => setMode(e.target.value as "normal" | "nano")}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="normal">8s Veo Mode</option>
          <option value="nano">Nano Prompt Mode</option>
        </select>

        <select title="brand select"
            value={brandKey}
            onChange={(e) => setBrandKey(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
            >
            {Object.entries(BRAND_PRESETS).map(([key, brand]) => (
                <option key={key} value={key}>
                {brand.name}
                </option>
            ))}
        </select>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Type Brand name"
            className="border rounded px-3 py-2 text-sm"
          />

          <input
            type="text"
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            placeholder="Env. (e.g. modern print shop in Lagos)"
            className="border rounded px-3 py-2 text-sm"
          />

          <select title="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value as Mood)}
            className="border rounded px-3 py-2 text-sm"
          >
            {MOODS.map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </div>


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
                className={`p-4 border rounded-lg ${
                    scene.awkward ? "bg-yellow-50 border-yellow-400" : "bg-gray-50"
                }`}
                >
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-blue-600">
                    Scene {scene.scene}
                    </h4>

                    <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                        scene.wordCount > 20
                        ? "bg-red-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                    >
                    {scene.wordCount} words
                    </span>
                </div>

                <p className="text-sm mt-2">
                    <strong>Dialogue:</strong> {scene.dialogue}
                </p>

                <p className="text-xs mt-2 text-gray-600 whitespace-pre-line">
                    <strong>Visual Prompt:</strong>
                    {"\n"}{scene.visualPrompt}
                </p>

                {scene.awkward && (
                    <p className="mt-2 text-xs text-yellow-700 font-medium">
                    ⚠️ Awkward cut detected — scene may feel too short.
                    </p>
                )}
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
