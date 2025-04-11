export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { size, resolution, elements, mediaType, quality, detectMethod } = req.body;

  const mmToDots = (mm) => Math.round(mm * (resolution / 25.4));
  const widthDots = mmToDots(size.width_mm);
  const heightDots = mmToDots(size.height_mm);

  let esc = "^XA\n";
  esc += `^S(CLR,P,${resolution}\n`;
  esc += `^S(CLS,P,${widthDots}\n`;
  esc += `^S(CLS,L,${heightDots}\n`;

  // Media instellingen
  esc += `^S(CLM,T,${mediaType || "M1"}\n`; // M1 = Matte, M0 = Gloss
  esc += `^S(CPC,Q,${quality || "D"}\n`;    // D = Draft, N = Normal, H = High
  esc += `^S(CLM,F,${detectMethod || "DL"}\n`; // DL = Die-cut Label, BM = Black Mark, CN = Continuous

  for (const el of elements) {
    if (el.type === "text") {
      esc += `^FO${el.x},${el.y}\n`;
      esc += `^A${el.font || "0"}N,${el.size.height},${el.size.width}\n`;
      esc += `^FD ${el.text} ^FS\n`;
    }

    if (el.type === "shape" && el.shape === "circle") {
      esc += `^F(C${el.color.replace(/[^\d,]/g, '')},N,0,0,0,0,N)\n`;
      esc += `^FO${el.x},${el.y}\n`;
      esc += `^GB${el.diameter},${el.diameter},${el.diameter}^FS\n`;
    }
  }

  esc += "^XZ";
  res.setHeader("Content-Type", "text/plain");
  res.send(esc);
}