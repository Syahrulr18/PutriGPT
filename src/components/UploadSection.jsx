import { useState, useRef } from 'react';
import { Upload, ImageIcon, Trash2, Sparkles, Loader2, AlertCircle, Lightbulb, Camera } from 'lucide-react';
import CameraModal from './CameraModal';

function UploadSection({ 
  imagePreview, 
  loading, 
  error, 
  onImageUpload, 
  onClearImage, 
  onSolve,
  hasImage,
  onCameraCapture
}) {
  const fileInputRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const mockEvent = { target: { files: [file] } };
      await onImageUpload(mockEvent);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCameraCapture = (file, preview) => {
    onCameraCapture(file, preview);
    setIsCameraOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-blue-100 shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-500" />
          Upload Soal Matematika
        </h2>

        {/* Input Method Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl transition-all text-gray-700"
          >
            <Upload className="w-5 h-5 text-blue-500" />
            Upload File
          </button>
          <button
            onClick={() => setIsCameraOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl transition-all text-gray-700"
          >
            <Camera className="w-5 h-5 text-blue-500" />
            Buka Kamera
          </button>
        </div>

        {/* Preview / Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => !imagePreview && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            imagePreview
              ? 'border-blue-500 bg-blue-50 cursor-default'
              : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer'
          }`}
        >
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview soal"
                className="max-h-64 mx-auto rounded-lg shadow-md"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearImage();
                }}
                className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Drag & drop gambar di sini
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  atau klik tombol di atas
                </p>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </div>

        {/* Solve Button */}
        <button
          onClick={onSolve}
          disabled={!hasImage || loading}
          className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
            !hasImage || loading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Sedang Menganalisis...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              Selesaikan Soal
            </>
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" /> Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Pastikan gambar soal jelas dan tidak blur</li>
          <li>• Foto dalam pencahayaan yang cukup</li>
          <li>• Satu gambar untuk satu soal lebih baik</li>
          <li>• Gunakan kamera belakang HP untuk hasil terbaik</li>
        </ul>
      </div>

      {/* Camera Modal */}
      <CameraModal 
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}

export default UploadSection;
