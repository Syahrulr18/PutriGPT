import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, X, RotateCcw, Check } from 'lucide-react';

function CameraModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' for front, 'environment' for back
  const [error, setError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const startCamera = useCallback(async (mode = facingMode) => {
    try {
      setError('');
      // Stop existing stream if any
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsInitialized(true);
    } catch (err) {
      console.error('Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setError('Akses kamera ditolak. Izinkan akses kamera di pengaturan browser.');
      } else if (err.name === 'NotFoundError') {
        setError('Kamera tidak ditemukan di perangkat ini.');
      } else {
        setError('Gagal mengakses kamera: ' + err.message);
      }
    }
  }, [stream, facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  // Start camera when modal opens
  useEffect(() => {
    if (isOpen && !isInitialized && !capturedImage) {
      startCamera();
    }
    
    // Cleanup when modal closes
    if (!isOpen) {
      stopCamera();
      setCapturedImage(null);
      setIsInitialized(false);
      setError('');
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setIsInitialized(false);
    onClose();
  };

  // Switch between front and back camera
  const switchCamera = async () => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
    stopCamera();
    setIsInitialized(false);
    setTimeout(() => startCamera(newMode), 100);
  };

  // Capture photo from video stream
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
    setIsInitialized(false);
    setTimeout(() => startCamera(), 100);
  };

  // Confirm and use captured photo
  const confirmPhoto = () => {
    if (capturedImage) {
      // Convert data URL to File object
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          onCapture(file, capturedImage);
          handleClose();
        });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-500" />
            Ambil Foto Soal
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Camera View */}
        <div className="relative aspect-[4/3] bg-gray-900">
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center text-center p-4">
              <div className="text-white">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-red-300">{error}</p>
                <button
                  onClick={() => {
                    setIsInitialized(false);
                    startCamera();
                  }}
                  className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          ) : capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain"
            />
          )}

          {/* Hidden canvas for capturing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-50 flex items-center justify-center gap-4">
          {!capturedImage ? (
            <>
              {/* Switch Camera Button */}
              <button
                onClick={switchCamera}
                className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                title="Ganti Kamera"
              >
                <RotateCcw className="w-6 h-6 text-gray-700" />
              </button>

              {/* Capture Button */}
              <button
                onClick={capturePhoto}
                disabled={!stream}
                className={`p-6 rounded-full transition-all ${
                  stream
                    ? 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Camera className="w-8 h-8 text-white" />
              </button>

              {/* Placeholder for balance */}
              <div className="w-12 h-12" />
            </>
          ) : (
            <>
              {/* Retake Button */}
              <button
                onClick={retakePhoto}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Ulangi
              </button>

              {/* Confirm Button */}
              <button
                onClick={confirmPhoto}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors shadow-lg shadow-blue-500/30"
              >
                <Check className="w-5 h-5" />
                Gunakan Foto
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CameraModal;
