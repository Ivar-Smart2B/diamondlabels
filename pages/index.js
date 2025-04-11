import { useState } from "react";

export default function Home() {
  const [jsonInput, setJsonInput] = useState(`{
  "size": { "width_mm": 102, "height_mm": 76 },
  "resolution": 300,
  "mediaType": "M1",
  "quality": "D",
  "detectMethod": "DL",
  "elements": [
    {
      "type": "text",
      "x": 100,
      "y": 100,
      "font": "0",
      "size": { "height": 100, "width": 100 },
      "text": "Smart2B zegt hoi"
    },
    {
      "type": "shape",
      "shape": "circle",
      "x": 600,
      "y": 400,
      "diameter": 100,
      "color": "rgba(255,0,0,255)"
    }
  ]
}`);
  const [result, setResult] = useState("");

  const renderLabel = async () => {
    const res = await fetch("/api/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonInput
    });
    const text = await res.text();
    setResult(text);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>ESC/Label Generator</h1>
      <textarea
        rows={20}
        cols={80}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={renderLabel}>Render</button>
      <h2>ESC/Label Output</h2>
      <textarea rows={20} cols={80} value={result} readOnly />
    </main>
  );
}