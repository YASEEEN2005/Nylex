"use client";

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  Sparkles,
  Check,
  X,
  RotateCcw,
  Sun,
  Moon,
  Grid,
  Crop,
  Sliders,
  AlertCircle,
  Eye,
  RefreshCw,
} from "lucide-react";

/**
 * LogoStudioModal
 * Interactive Image Upload, Background Removal & Dual-Theme Preview Studio
 */
export default function LogoStudioModal({
  isOpen,
  onClose,
  onUploadSuccess,
  initialImageUrl = "",
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [previewBg, setPreviewBg] = useState("white"); // 'white' | 'dark' | 'checker'
  const [tolerance, setTolerance] = useState(25); // 5 to 70
  const [feather, setFeather] = useState(15); // edge feathering
  const [bgSampleColor, setBgSampleColor] = useState({ r: 255, g: 255, b: 255 });
  const [isProcessed, setIsProcessed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const canvasRef = useRef(null);
  const originalCanvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Reset state when opened or closed
  useEffect(() => {
    if (isOpen) {
      setErrorMsg("");
      setIsProcessed(false);
      if (initialImageUrl) {
        loadImageFromUrl(initialImageUrl);
      }
    } else {
      setSelectedFile(null);
      setOriginalImage(null);
      setImageLoaded(false);
      setIsProcessed(false);
    }
  }, [isOpen, initialImageUrl]);

  const loadImageFromUrl = (url) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setOriginalImage(img);
      setImageLoaded(true);
      setTimeout(() => initCanvas(img), 50);
    };
    img.onerror = () => {
      setErrorMsg("Failed to load initial image for editing.");
    };
    img.src = url;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg("");

    // Validate type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Please upload a valid image file (PNG, JPG, WebP, or SVG).");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 5MB limit. Please upload a smaller logo.");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        setImageLoaded(true);
        setTimeout(() => initCanvas(img), 50);
      };
      img.src = event.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const initCanvas = (img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    // Constrain max canvas size for smooth performance while maintaining high resolution
    const maxDim = 800;
    let w = img.naturalWidth || img.width;
    let h = img.naturalHeight || img.height;

    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = Math.round((h * maxDim) / w);
        w = maxDim;
      } else {
        w = Math.round((w * maxDim) / h);
        h = maxDim;
      }
    }

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    // Also store copy in original canvas
    if (originalCanvasRef.current) {
      const origCanvas = originalCanvasRef.current;
      origCanvas.width = w;
      origCanvas.height = h;
      const origCtx = origCanvas.getContext("2d", { willReadFrequently: true });
      origCtx.drawImage(img, 0, 0, w, h);
    }

    // Auto sample background color from the 4 corners
    try {
      const p1 = ctx.getImageData(0, 0, 1, 1).data;
      const p2 = ctx.getImageData(w - 1, 0, 1, 1).data;
      const p3 = ctx.getImageData(0, h - 1, 1, 1).data;
      const p4 = ctx.getImageData(w - 1, h - 1, 1, 1).data;

      const avgR = Math.round((p1[0] + p2[0] + p3[0] + p4[0]) / 4);
      const avgG = Math.round((p1[1] + p2[1] + p3[1] + p4[1]) / 4);
      const avgB = Math.round((p1[2] + p2[2] + p3[2] + p4[2]) / 4);

      setBgSampleColor({ r: avgR, g: avgG, b: avgB });
    } catch {
      setBgSampleColor({ r: 255, g: 255, b: 255 });
    }

    setIsProcessed(false);
  };

  // Click on canvas to sample color to remove
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const ctx = originalCanvasRef.current?.getContext("2d") || canvas.getContext("2d");
    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      setBgSampleColor({ r: pixel[0], g: pixel[1], b: pixel[2] });
      // If already processed, re-run with newly clicked color
      if (isProcessed) {
        applyBackgroundRemoval({ r: pixel[0], g: pixel[1], b: pixel[2] }, tolerance, feather);
      }
    } catch (err) {
      console.warn("Could not sample pixel color:", err);
    }
  };

  // Intelligent Background Removal algorithm with genuine alpha channel transparency & anti-aliasing
  const applyBackgroundRemoval = (
    targetColor = bgSampleColor,
    tolVal = tolerance,
    featherVal = feather
  ) => {
    const canvas = canvasRef.current;
    const origCanvas = originalCanvasRef.current;
    if (!canvas || !origCanvas) return;

    setProcessing(true);

    setTimeout(() => {
      try {
        const w = origCanvas.width;
        const h = origCanvas.height;

        const origCtx = origCanvas.getContext("2d", { willReadFrequently: true });
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        const imgData = origCtx.getImageData(0, 0, w, h);
        const data = imgData.data;

        const maxDist = 441.67; // sqrt(255^2 + 255^2 + 255^2)
        const threshold = (tolVal / 100) * maxDist;
        const featherDist = (featherVal / 100) * maxDist;

        const { r: tbR, g: tbG, b: tbB } = targetColor;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a === 0) continue; // Already transparent

          // Euclidean color distance in RGB space
          const dist = Math.sqrt(
            (r - tbR) ** 2 +
            (g - tbG) ** 2 +
            (b - tbB) ** 2
          );

          if (dist <= threshold) {
            // Full background removal
            data[i + 3] = 0;
          } else if (dist < threshold + featherDist && featherDist > 0) {
            // Smooth anti-aliased edge blend
            const factor = (dist - threshold) / featherDist;
            data[i + 3] = Math.round(a * factor);
          }
        }

        ctx.clearRect(0, 0, w, h);
        ctx.putImageData(imgData, 0, 0);
        setIsProcessed(true);
      } catch (err) {
        setErrorMsg("Background removal encountered an error. You can still use the original image.");
      } finally {
        setProcessing(false);
      }
    }, 20);
  };

  // Reset to original image
  const handleResetToOriginal = () => {
    const canvas = canvasRef.current;
    const origCanvas = originalCanvasRef.current;
    if (!canvas || !origCanvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(origCanvas, 0, 0);
    setIsProcessed(false);
  };

  // Crop / Trim empty transparent margins around the logo
  const handleTrimPadding = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let minX = w, minY = h, maxX = 0, maxY = 0;
    let found = false;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const alpha = data[(y * w + x) * 4 + 3];
        if (alpha > 10) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!found) return;

    // Add safe 12px padding
    const pad = 12;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(w, maxX + pad);
    maxY = Math.min(h, maxY + pad);

    const cropW = maxX - minX;
    const cropH = maxY - minY;

    if (cropW <= 0 || cropH <= 0) return;

    const croppedData = ctx.getImageData(minX, minY, cropW, cropH);

    canvas.width = cropW;
    canvas.height = cropH;
    ctx.putImageData(croppedData, 0, 0);
  };

  // Convert canvas to Blob and upload to Cloudinary
  const handleApproveAndUpload = async (useOriginal = false) => {
    setUploading(true);
    setErrorMsg("");

    try {
      let uploadPayload;

      if (useOriginal && selectedFile) {
        uploadPayload = selectedFile;
      } else {
        const canvas = canvasRef.current;
        if (!canvas) {
          throw new Error("No processed canvas found.");
        }

        // Convert canvas to real PNG blob with alpha channel
        const blob = await new Promise((resolve, reject) => {
          canvas.toBlob((b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to export image canvas."));
          }, "image/png");
        });

        uploadPayload = blob;
      }

      const formData = new FormData();
      formData.append("file", uploadPayload, "client-logo.png");
      formData.append("folder", "nylex/client-logos");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onUploadSuccess(data.url, data.public_id);
        onClose();
      } else {
        throw new Error(data.error || "Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg(err.message || "Failed to upload logo to Cloudinary.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white border border-neutral-200/90 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f0f9ff] text-[#00507D] text-[10px] font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              <span>LOGO STUDIO & TRANSPARENCY</span>
            </div>
            <h2 className="font-manrope text-lg sm:text-xl font-bold text-neutral-950">
              Client Logo Image Processor
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Hidden reference canvas */}
          <canvas ref={originalCanvasRef} className="hidden" />

          {!imageLoaded ? (
            /* File Dropzone */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-neutral-200 hover:border-[#00507D] rounded-3xl p-10 sm:p-14 text-center cursor-pointer transition-all bg-neutral-50/60 hover:bg-[#f0f9ff]/30 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-neutral-200/80 mx-auto flex items-center justify-center text-[#00507D] group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="font-manrope font-bold text-neutral-900 mt-4 text-base">
                Click to Select Client Logo
              </h3>
              <p className="font-inter text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Supports PNG, JPG, WebP, or SVG (Up to 5MB). Transparent logos are supported.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Canvas Preview with Dual Theme Toggles */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-700 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#00507D]" />
                    Interactive Preview {isProcessed && <span className="text-emerald-600 font-bold">(Transparent)</span>}
                  </span>

                  {/* Dual Theme Preview Switcher */}
                  <div className="flex items-center p-0.5 bg-neutral-100 rounded-xl text-[11px] font-semibold border border-neutral-200/60">
                    <button
                      type="button"
                      onClick={() => setPreviewBg("white")}
                      title="Preview on Website White Background"
                      className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${previewBg === "white"
                          ? "bg-white text-neutral-900 shadow-2xs font-bold"
                          : "text-neutral-500 hover:text-neutral-800"
                        }`}
                    >
                      <Sun className="w-3 h-3 text-amber-500" />
                      <span>Light</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewBg("dark")}
                      title="Preview on Dark Theme"
                      className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${previewBg === "dark"
                          ? "bg-neutral-900 text-white shadow-2xs font-bold"
                          : "text-neutral-500 hover:text-neutral-800"
                        }`}
                    >
                      <Moon className="w-3 h-3 text-cyan-400" />
                      <span>Dark</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewBg("checker")}
                      title="Preview on Transparency Checkerboard"
                      className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${previewBg === "checker"
                          ? "bg-white text-neutral-900 shadow-2xs font-bold"
                          : "text-neutral-500 hover:text-neutral-800"
                        }`}
                    >
                      <Grid className="w-3 h-3 text-neutral-500" />
                      <span>Grid</span>
                    </button>
                  </div>
                </div>

                {/* Canvas Container */}
                <div
                  className={`relative rounded-2xl border border-neutral-200/80 min-h-[260px] flex items-center justify-center p-6 overflow-hidden transition-colors ${previewBg === "white"
                      ? "bg-white"
                      : previewBg === "dark"
                        ? "bg-[#090d16]"
                        : "bg-[linear-gradient(45deg,#f0f0f0_25%,transparent_25%),linear-gradient(-45deg,#f0f0f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f0f0f0_75%),linear-gradient(-45deg,transparent_75%,#f0f0f0_75%)] [background-size:16px_16px] [background-position:0_0,0_8px,8px_-8px,-8px_0px]"
                    }`}
                >
                  <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    title="Click any background pixel to sample its color for removal"
                    className="max-h-60 w-auto max-w-full object-contain cursor-crosshair drop-shadow-xs"
                  />
                  {processing && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs flex flex-col items-center justify-center text-xs font-semibold text-[#00507D] gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Extracting Foreground & Transparency...</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                  <span>💡 Tip: Click anywhere on the background above to sample that color.</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#00507D] font-semibold hover:underline cursor-pointer"
                  >
                    Change File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Right: Controls & Actions */}
              <div className="lg:col-span-5 space-y-4">
                {/* Background Removal Panel */}
                <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-manrope text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#00507D]" />
                      Background Transparency
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
                      <span>Target:</span>
                      <span
                        className="w-4 h-4 rounded-md border border-neutral-300 shadow-2xs inline-block"
                        style={{
                          backgroundColor: `rgb(${bgSampleColor.r},${bgSampleColor.g},${bgSampleColor.b})`,
                        }}
                        title={`Color: RGB(${bgSampleColor.r}, ${bgSampleColor.g}, ${bgSampleColor.b})`}
                      />
                    </div>
                  </div>

                  {/* Tolerance Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600">
                      <span>Color Tolerance:</span>
                      <span className="font-bold text-[#00507D]">{tolerance}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="75"
                      value={tolerance}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setTolerance(val);
                        if (isProcessed) applyBackgroundRemoval(bgSampleColor, val, feather);
                      }}
                      className="w-full accent-[#00507D] cursor-pointer"
                    />
                  </div>

                  {/* Edge Softness / Feather Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600">
                      <span>Edge Feathering:</span>
                      <span className="font-bold text-[#00507D]">{feather}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={feather}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFeather(val);
                        if (isProcessed) applyBackgroundRemoval(bgSampleColor, tolerance, val);
                      }}
                      className="w-full accent-[#00507D] cursor-pointer"
                    />
                  </div>

                  {/* Action Buttons for Background */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => applyBackgroundRemoval(bgSampleColor, tolerance, feather)}
                      disabled={processing}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#00507D] hover:bg-[#003d5f] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isProcessed ? "Re-apply Filter" : "Remove Background"}</span>
                    </button>
                    {isProcessed && (
                      <button
                        type="button"
                        onClick={handleResetToOriginal}
                        title="Revert to original image"
                        className="p-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Trim Padding Button */}
                <button
                  type="button"
                  onClick={handleTrimPadding}
                  className="w-full py-2 px-3 rounded-xl border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Crop className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Trim Empty Margins / Center Logo</span>
                </button>

                {/* Information Callout */}
                <div className="p-3 rounded-2xl bg-neutral-50 text-[11px] font-inter text-neutral-500 leading-relaxed border border-neutral-200/60">
                  <span className="font-semibold text-neutral-800 block mb-0.5">Dual-Mode Upload:</span>
                  You can upload with background removal or click <b>"Upload Original"</b> if your logo is already transparent.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-50/50">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {imageLoaded && (
            <div className="w-full sm:w-auto flex items-center gap-2.5">
              {/* Upload Original option */}
              <button
                type="button"
                disabled={uploading}
                onClick={() => handleApproveAndUpload(true)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full border border-neutral-300 hover:bg-white text-neutral-700 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                Upload Original As-Is
              </button>

              {/* Upload Approved Result */}
              <button
                type="button"
                disabled={uploading}
                onClick={() => handleApproveAndUpload(false)}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-[#00507D] hover:bg-[#003d5f] text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading to Cloudinary...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{isProcessed ? "Approve Transparent Logo" : "Approve & Upload"}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

