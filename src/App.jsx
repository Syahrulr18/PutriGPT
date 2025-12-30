import 'katex/dist/katex.min.css';
import './index.css';
import { Header, UploadSection, SolutionSection, Footer } from './components';
import { useMathSolver } from './hooks/useMathSolver';

function App() {
  const {
    image,
    imagePreview,
    textInput,
    setTextInput,
    answerMode,
    setAnswerMode,
    solution,
    loading,
    error,
    handleImageUpload,
    handleCameraCapture,
    clearImage,
    solveMath,
  } = useMathSolver();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <UploadSection
            imagePreview={imagePreview}
            loading={loading}
            error={error}
            onImageUpload={handleImageUpload}
            onCameraCapture={handleCameraCapture}
            onClearImage={clearImage}
            onSolve={solveMath}
            hasImage={!!image}
            textInput={textInput}
            setTextInput={setTextInput}
            answerMode={answerMode}
            setAnswerMode={setAnswerMode}
          />

          <SolutionSection 
            loading={loading} 
            solution={solution} 
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
