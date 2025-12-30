import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Sparkles, ImageIcon } from 'lucide-react';

function SolutionSection({ loading, solution }) {
  // Preprocess LaTeX to ensure consistent rendering
  const preprocessLaTeX = (content) => {
    if (!content) return '';
    return content
      // Replace \[ ... \] with $$ ... $$
      .replace(/\\\[([\s\S]*?)\\\]/g, '$$$1$$')
      // Replace \( ... \) with $ ... $
      .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$')
      // Ensure align environments are wrapped in $$ if not already
      .replace(/(\\begin\{align\*?\}[\s\S]*?\\end\{align\*?\})/g, (match) => {
        if (match.trim().startsWith('$$') || match.trim().startsWith('\\[')) return match;
        return `$$${match}$$`;
      });
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-lg p-6 min-h-[500px]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-blue-500" />
        Disini Jawabannya Bos
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-80 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="text-gray-600">PutriGPT sedang menganalisis soal...</p>
          <p className="text-sm text-gray-400">Proses ini membutuhkan beberapa detik</p>
        </div>
      ) : solution ? (
        <div className="prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              p: ({ node, ...props }) => (
                <p className="text-gray-700 leading-relaxed mb-4" {...props} />
              ),
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold text-gray-800 mt-6 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-bold text-gray-800 mt-5 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-700" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="text-blue-600 font-semibold" {...props} />
              ),
              code: ({ node, inline, ...props }) => (
                inline ? (
                  <code className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-sm font-mono" {...props} />
                ) : (
                  <code className="block bg-gray-100 p-4 rounded-lg overflow-x-auto text-gray-800 text-sm font-mono" {...props} />
                )
              ),
            }}
          >
            {preprocessLaTeX(solution)}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-80 text-center space-y-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-blue-300" />
          </div>
          <div>
            <p className="text-gray-500 font-medium">Sabar nah</p>
            <p className="text-sm text-gray-400 mt-1">
              Upload gambar soal matematika dan klik "Selesaikan Soal"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SolutionSection;
