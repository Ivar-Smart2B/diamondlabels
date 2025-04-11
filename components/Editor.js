import React, { useState } from "react";
import { Stage, Layer, Text, Rect, Circle, Image } from "react-konva";
import useImage from "use-image";

function DraggableImage({ src, x, y }) {
  const [image] = useImage(src);
  return <Image image={image} x={x} y={y} draggable />;
}

export default function Editor() {
  const [elements, setElements] = useState([
    { id: 1, type: "text", text: "Smart2B zegt hoi", x: 100, y: 50, fontSize: 24 },
    { id: 2, type: "circle", x: 300, y: 200, radius: 40, fill: "red" }
  ]);
  const [mode, setMode] = useState("light");

  return (
    <div style={{ display: "flex", height: "100vh", background: mode === "dark" ? "#222" : "#fff" }}>
      <div style={{ width: 250, padding: 10, background: "#f1f1f1" }}>
        <h2>Elementen</h2>
        <button onClick={() => {
          const id = Date.now();
          setElements([...elements, { id, type: "text", text: "Nieuwe tekst", x: 50, y: 50, fontSize: 20 }]);
        }}>➕ Tekst</button>
        <br /><br />
        <button onClick={() => {
          const id = Date.now();
          setElements([...elements, { id, type: "circle", x: 100, y: 100, radius: 30, fill: "blue" }]);
        }}>⭕ Cirkel</button>
        <br /><br />
        <button onClick={() => {
          const id = Date.now();
          setElements([...elements, { id, type: "image", x: 150, y: 150, src: "/logo.png" }]);
        }}>🖼️ Afbeelding</button>
        <br /><br />
        <button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
          🌗 Thema: {mode === "light" ? "Licht" : "Donker"}
        </button>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Stage width={window.innerWidth - 250} height={window.innerHeight}>
          <Layer>
            {elements.map(el => {
              if (el.type === "text") {
                return <Text key={el.id} text={el.text} x={el.x} y={el.y} fontSize={el.fontSize} draggable />;
              }
              if (el.type === "circle") {
                return <Circle key={el.id} x={el.x} y={el.y} radius={el.radius} fill={el.fill} draggable />;
              }
              if (el.type === "image") {
                return <DraggableImage key={el.id} src={el.src} x={el.x} y={el.y} />;
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}