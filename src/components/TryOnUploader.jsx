import { useMemo, useRef, useState, useEffect } from "react";
import { Upload, Image as ImageIcon, Shirt, Download } from "lucide-react";

function useImage(src) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (!src) return setImg(null);
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => setImg(image);
    image.src = src;
  }, [src]);
  return img;
}

export default function TryOnUploader() {
  const [bodySrc, setBodySrc] = useState("");
  const [clothSrc, setClothSrc] = useState("");
  const [resultSrc, setResultSrc] = useState("");

  const bodyImg = useImage(bodySrc);
  const clothImg = useImage(clothSrc);

  const [controls, setControls] = useState({
    scale: 100,
    rotate: 0,
    offsetX: 0,
    offsetY: 0,
    opacity: 100,
  });

  const canvasRef = useRef(null);

  const canCompose = useMemo(() => !!(bodyImg && clothImg), [bodyImg, clothImg]);

  const onSelectFile = (e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setter(String(ev.target?.result || ""));
    reader.readAsDataURL(file);
  };

  const compose = () => {
    if (!canCompose || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Fit canvas to body image
    const w = Math.min(900, bodyImg.width); // limit size to keep memory small
    const scaleToFit = w / bodyImg.width;
    const h = Math.round(bodyImg.height * scaleToFit);
    canvas.width = w;
    canvas.height = h;

    // Draw body
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(bodyImg, 0, 0, w, h);

    // Draw clothing with transforms
    const clothBaseW = clothImg.width * scaleToFit;
    const clothBaseH = clothImg.height * scaleToFit;

    const scale = controls.scale / 100;
    const drawW = clothBaseW * scale;
    const drawH = clothBaseH * scale;

    const centerX = w / 2 + controls.offsetX;
    const centerY = h / 2 + controls.offsetY;

    ctx.save();
    ctx.globalAlpha = controls.opacity / 100;
    ctx.translate(centerX, centerY);
    ctx.rotate((controls.rotate * Math.PI) / 180);
    ctx.drawImage(clothImg, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    const dataUrl = canvas.toDataURL("image/png");
    setResultSrc(dataUrl);
  };

  useEffect(() => {
    // Auto preview on control changes if both images exist
    if (canCompose) compose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canCompose, controls.scale, controls.rotate, controls.offsetX, controls.offsetY, controls.opacity, bodyImg, clothImg]);

  const reset = () => {
    setBodySrc("");
    setClothSrc("");
    setResultSrc("");
    setControls({ scale: 100, rotate: 0, offsetX: 0, offsetY: 0, opacity: 100 });
    if (canvasRef.current) {
      const c = canvasRef.current;
      c.width = 0;
      c.height = 0;
    }
  };

  return (
    <section className="mx-auto max-w-md px-6 pb-12">
      <div className="rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur">
        <h2 className="mb-2 text-center text-xl font-semibold text-gray-900">Try it now</h2>
        <p className="mb-4 text-center text-sm text-gray-600">Upload your full-body photo and a clothing image. Adjust and preview instantly.</p>

        <div className="grid grid-cols-1 gap-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
              <ImageIcon className="h-5 w-5 text-gray-700" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Your full-body photo</div>
              <div className="text-xs text-gray-500">JPG or PNG</div>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onSelectFile(e, setBodySrc)} />
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
              <Shirt className="h-5 w-5 text-gray-700" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Clothing image</div>
              <div className="text-xs text-gray-500">Transparent PNG recommended</div>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onSelectFile(e, setClothSrc)} />
          </label>
        </div>

        {(bodySrc || clothSrc) && (
          <div className="mt-4 grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-lg border">
                {bodySrc ? (
                  <img src={bodySrc} alt="Body preview" className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 items-center justify-center text-xs text-gray-500">Body preview</div>
                )}
              </div>
              <div className="overflow-hidden rounded-lg border">
                {clothSrc ? (
                  <img src={clothSrc} alt="Cloth preview" className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 items-center justify-center text-xs text-gray-500">Clothing preview</div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-3">
              <div className="mb-2 text-sm font-medium text-gray-900">Adjust fit</div>
              <div className="space-y-3">
                <Slider label="Scale" value={controls.scale} min={20} max={300} onChange={(v) => setControls((c) => ({ ...c, scale: v }))} />
                <Slider label="Rotate" value={controls.rotate} min={-180} max={180} onChange={(v) => setControls((c) => ({ ...c, rotate: v }))} />
                <Slider label="Offset X" value={controls.offsetX} min={-200} max={200} onChange={(v) => setControls((c) => ({ ...c, offsetX: v }))} />
                <Slider label="Offset Y" value={controls.offsetY} min={-200} max={200} onChange={(v) => setControls((c) => ({ ...c, offsetY: v }))} />
                <Slider label="Opacity" value={controls.opacity} min={10} max={100} onChange={(v) => setControls((c) => ({ ...c, opacity: v }))} />
              </div>
            </div>

            <div className="grid gap-3">
              <div className="overflow-hidden rounded-xl border bg-gray-50">
                <div className="flex items-center justify-between px-3 pt-2">
                  <div className="text-sm font-medium text-gray-900">Result preview</div>
                  <button onClick={compose} className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-black">
                    <Upload className="h-4 w-4" /> Generate
                  </button>
                </div>
                <div className="p-3">
                  <canvas ref={canvasRef} className="mx-auto h-auto w-full max-w-full rounded-lg bg-white shadow-sm" />
                </div>
              </div>

              {resultSrc && (
                <a
                  href={resultSrc}
                  download="tryon-result.png"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-fuchsia-600 px-4 py-2 text-white shadow hover:bg-fuchsia-700"
                >
                  <Download className="h-5 w-5" /> Download result
                </a>
              )}

              {(bodySrc || clothSrc || resultSrc) && (
                <button onClick={reset} className="text-sm text-gray-600 underline">Start over</button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, onChange }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-fuchsia-600"
      />
    </div>
  );
}
