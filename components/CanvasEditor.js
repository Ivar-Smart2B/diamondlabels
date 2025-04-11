import { Stage, Layer, Rect, Text, Circle } from "react-konva";
import { useState } from "react";

export default function CanvasEditor() {
  const [elements, setElements] = useState([
    { id: 1, type: "text", x: 100, y: 50, text: "Smart2B zegt hoi", fontSize: 24 },
    { id: 2, type: "circle", x: 300, y: 200, radius: 50, fill: "red" },
  ]);

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div style={{ position: "absolute", top: 10, left: 20, zIndex: 10 }}>
        <img src="/logo.png" height="40" alt="Diamondlabels" />
      </div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {elements.map((el) =>
            el.type === "text" ? (
              <Text key={el.id} x={el.x} y={el.y} text={el.text} fontSize={el.fontSize} />
            ) : el.type === "circle" ? (
              <Circle key={el.id} x={el.x} y={el.y} radius={el.radius} fill={el.fill} />
            ) : null
          )}
        </Layer>
      </Stage>
    </div>
  );
}