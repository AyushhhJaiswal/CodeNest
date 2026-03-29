import NavigationHeader from "@/components/NavigationHeader";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LoginButton from "@/components/LoginButton";
import { Code2, Play, Sparkles, Terminal } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] selection:bg-blue-500/20 selection:text-blue-200">
      <PageTransition>
        <NavigationHeader />

        <main className="relative pt-32 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-20" />
                <h1 className="relative text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-8">
                  Write. Share. <br />
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                    Execute.
                  </span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
                The ultimate interactive code editor in the browser. Supports multiple languages, rich themes, and lightning-fast execution.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/editor"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-blue-500/25 group"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Start Coding For Free
                </Link>

                <SignedOut>
                  <LoginButton />
                </SignedOut>
              </div>
            </div>

            {/* Showcase / Feature snippet */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-10" />
              <div className="relative bg-[#12121a]/90 backdrop-blur-xl rounded-3xl p-6 ring-1 ring-white/10 overflow-hidden shadow-2xl">
                {/* Editor mockup header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex gap-4 text-sm font-medium text-gray-400">
                    <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-blue-400" /> Syntax Highlighting</span>
                    <span className="hidden sm:flex items-center gap-2"><Terminal className="w-4 h-4 text-purple-400" /> Live Execution</span>
                  </div>
                </div>

                {/* Editor mockup body */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#0a0a0f] rounded-xl p-4 font-mono text-sm text-gray-300">
                    <div className="flex gap-4">
                      <span className="text-gray-600 select-none">1</span>
                      <span><span className="text-blue-400">function</span> <span className="text-yellow-300">greetWorld</span>() {'{'}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-gray-600 select-none">2</span>
                      <span className="pl-4"><span className="text-blue-400">const</span> <span className="text-green-300">message</span> = <span className="text-orange-300">"Welcome to CodeNest"</span>;</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-gray-600 select-none">3</span>
                      <span className="pl-4">console.<span className="text-yellow-300">log</span>(message);</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-gray-600 select-none">4</span>
                      <span>{'}'}</span>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <span className="text-gray-600 select-none">5</span>
                      <span><span className="text-yellow-300">greetWorld</span>();</span>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0f] rounded-xl p-4 font-mono text-sm">
                    <div className="text-gray-500 mb-2">// Output Terminal</div>
                    <div className="text-green-400">{'>'} Welcome to CodeNest</div>
                    <div className="text-gray-500 mt-2">✨ Execution completed in 12ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle background decoration */}
          <div className="fixed top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="fixed top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        </main>
      </PageTransition>
    </div>
  );
}
