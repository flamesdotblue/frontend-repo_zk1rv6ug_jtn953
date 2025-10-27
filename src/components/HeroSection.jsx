import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="mx-auto max-w-xl px-6 pt-10 pb-6 text-center sm:pt-14">
        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-fuchsia-600">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-medium">AI Virtual Try-On</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Try outfits on your photo in seconds
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
          Upload a full-body photo and the clothing image you want to try. Adjust the fit and generate a realistic preview — all right in your browser.
        </p>
      </div>
    </section>
  );
}
