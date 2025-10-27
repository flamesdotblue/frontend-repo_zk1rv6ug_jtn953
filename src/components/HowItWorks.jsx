import { Image as ImageIcon, Shirt, Settings, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Upload your photo",
    description: "Choose a clear full-body photo with good lighting.",
    Icon: ImageIcon,
  },
  {
    title: "Add clothing image",
    description: "Use a product image. Transparent PNG works best.",
    Icon: Shirt,
  },
  {
    title: "Adjust fit",
    description: "Move, scale and rotate until it feels right.",
    Icon: Settings,
  },
  {
    title: "Generate preview",
    description: "Create and save your try-on result instantly.",
    Icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-md px-6 pb-14">
      <h3 className="mb-4 text-center text-lg font-semibold text-gray-900">How it works</h3>
      <ol className="grid gap-3">
        {steps.map(({ title, description, Icon }, idx) => (
          <li key={idx} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-100">
              <Icon className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{idx + 1}. {title}</div>
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
