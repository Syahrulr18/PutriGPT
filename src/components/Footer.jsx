import { Cat } from 'lucide-react';

function Footer() {
  return (
    <footer className="mt-12 pb-6 text-center">
      <div className="flex items-center justify-center gap-2">
        <Cat className="w-5 h-5 text-blue-500" />
        <p className="text-sm text-gray-500 font-medium">
          PutriJago
        </p>
        <Cat className="w-5 h-5 text-blue-500" />
      </div>
    </footer>
  );
}

export default Footer;
