import { Cat } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white border-b border-blue-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
            <Cat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Sini Ku Kerjakanko</h1>
            <p className="text-sm text-blue-500">Powered by S</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
