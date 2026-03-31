
import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cheater, setCheater] = useState(null);
  const [cheaterImage, setCheaterImage] = useState(null);
  const [cheaterList, setCheaterList] = useState([]);

  let prevPositions = {};

  // 🎥 Start Camera
  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  // 📦 Load Models
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  };

  // 🚀 Detection
  const detectFaces = async () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) return;

    const detections = await faceapi.detectAllFaces(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((det, index) => {
      const { x, y, width, height } = det.box;

      let studentId = `Student ${index + 1}`;

      // Green box
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = "blue";
      ctx.fillText(studentId, x, y - 5);

      if (prevPositions[index]) {
        let dx = Math.abs(x - prevPositions[index].x);
        let dy = Math.abs(y - prevPositions[index].y);

        // 🔥 Movement detect
        if (dx > 10 || dy > 10) {

          ctx.strokeStyle = "red";
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, width, height);

          ctx.fillStyle = "red";
          ctx.fillText("CHEATING!", x, y + height + 20);

          setCheater(studentId);

          // Capture image
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = width;
          tempCanvas.height = height;

          const tempCtx = tempCanvas.getContext("2d");

          tempCtx.drawImage(
            videoRef.current,
            x, y, width, height,
            0, 0, width, height
          );

          const img = tempCanvas.toDataURL();

          setCheaterImage(img);

          // Save once
          setCheaterList(prev => {
            if (prev.length === 0 || prev[prev.length - 1] !== img) {
              return [...prev, img];
            }
            return prev;
          });
        }
      }

      prevPositions[index] = { x, y };
    });
  };

  // Init
  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      detectFaces();
    }, 300);

    return () => clearInterval(interval);
  });

  return (
    <div style={{ fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>🎥 Smart Cheating Detection System</h2>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>

        {/* 🎥 Camera LEFT */}
        <div style={{ position: "relative", marginLeft: "20px" }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            width="600"
            height="450"
            style={{ position: "absolute", zIndex: 1, borderRadius: "10px" }}
          />
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", zIndex: 2 }}
          />
        </div>

        {/* 📊 Panel RIGHT */}
        <div style={{
          width: "260px",
          marginRight: "20px",
          background: "#f5f5f5",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)"
        }}>
          <h3>Status</h3>

          <p style={{ color: "red", fontWeight: "bold" }}>
            {cheater ? `⚠️ ${cheater} is Cheating` : "No Cheating"}
          </p>

          {cheaterImage && (
            <>
              <h4>👤 Current</h4>
              <img src={cheaterImage} width="200" style={{ borderRadius: "8px" }} />
            </>
          )}

          <h4>📸 History</h4>
          <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
            {cheaterList.map((img, i) => (
              <img key={i} src={img} width="80" style={{ margin: "5px", borderRadius: "5px" }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;