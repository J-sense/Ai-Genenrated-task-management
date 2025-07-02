// components/HeroBanner.tsx
import { Sparkles, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left content */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Smarter Task Management <br />
              <span className="inline-flex items-center bg-white/20 px-4 py-1 rounded-full text-blue-100">
                Powered by AI <Sparkles className="w-5 h-5 ml-2" />
              </span>
            </h1>

            <p className="text-lg text-blue-100 max-w-lg">
              Organize your work, automate your workflow, and get intelligent
              suggestions to boost your productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Get Started
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                How it works
              </Button>
            </div>
          </div>

          {/* Right illustration */}
          <div className="md:w-1/2 relative">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">
                    Plan project roadmap
                  </span>
                </div>

                {/* AI suggestion example */}
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 text-teal-300 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-semibold">
                      AI SUGGESTED SUBTASKS
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
                      Define project milestones
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
                      Create timeline
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
                      Identify key stakeholders
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
                      Set success metrics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
