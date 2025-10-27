import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/70 py-8">
      <div className="mx-auto max-w-md px-6 text-center text-sm text-gray-600">
        <div className="mb-2 inline-flex items-center gap-1 text-gray-700">
          <Heart className="h-4 w-4 text-rose-500" />
          <span>Virtual Try-On demo</span>
        </div>
        <p>For best results, use well-lit photos and clothing images with transparent backgrounds.</p>
      </div>
    </footer>
  );
}
