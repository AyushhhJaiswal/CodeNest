"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Terminal,
  X,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

type Message = {
  role: "user" | "gemini";
  text: string;
};

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");

  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const hasContent = error || output;
  const contextText = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const callGemini = async (text: string): Promise<string> => {
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const prompt = `
You are a helpful coding assistant. Always respond based on the code or error provided below, unless the user clearly refers to a different context. 

Answer **concisely** (4–6 lines max), use **markdown formatting**, and explain with bullet points or numbered steps if needed. Avoid unnecessary fluff.

If user asks for more detailed answers or explanation give answers upto 10 lines max

--- Code or Output ---
${text}
`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await res.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from DoubtGPT."
    );
  };

  const handleAskDoubtGPT = async () => {
    if (!hasContent) return;

    setIsChatOpen(true);
    setGeminiLoading(true);

    const userMsg = {
      role: "user" as const,
      text: "Can you explain this clearly in 4–6 lines?",
    };

    try {
      const geminiReply = await callGemini(contextText);
      const botMsg = { role: "gemini" as const, text: geminiReply };
      setMessages([userMsg, botMsg]);
    } catch {
      setMessages([
        userMsg,
        { role: "gemini", text: "Something went wrong. Try again later." },
      ]);
    } finally {
      setGeminiLoading(false);
    }
  };

  const handleUserQuestion = async () => {
    if (!userInput.trim()) return;

    const userMsg = { role: "user" as const, text: userInput };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setGeminiLoading(true);

    const fullPrompt = `
--- Code or Output ---
${contextText}

--- User Question ---
${userInput}

Instructions:
- Only refer to the code/output above unless user specifies otherwise.
- Answer in 4–6 lines max.
- Format clearly with bullet points or steps.
`;

    try {
      const geminiReply = await callGemini(fullPrompt);
      const botMsg = { role: "gemini" as const, text: geminiReply };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "gemini", text: "Something went wrong. Try again later." },
      ]);
    } finally {
      setGeminiLoading(false);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#1e1e2e] rounded-md flex items-center justify-center ring-1 ring-gray-700">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-semibold text-gray-300">Output</span>
        </div>

        {hasContent && (
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-md bg-[#1e1e2e] text-gray-300 hover:bg-[#2e2e40] text-sm"
            >
              {isCopied ? "Copied!" : <Copy className="w-4 h-4" />}
            </motion.button>
            <motion.button
              onClick={handleAskDoubtGPT}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-[#0f0f1f]/50 backdrop-blur border border-purple-500 text-purple-100 shadow-[0_0_20px_#a855f7aa] transition-all duration-300 hover:shadow-[0_0_30px_#a855f7dd] flex items-center gap-2"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-fuchsia-700/10 to-indigo-800/20 opacity-50 group-hover:opacity-80 blur-sm" />
              <span className="absolute left-[-50%] top-0 w-[200%] h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20 rotate-12 translate-x-0 group-hover:translate-x-full transition-transform duration-[1800ms] ease-in-out" />
              <Sparkles className="relative z-10 w-5 h-5 animate-pulse-slow text-purple-300 drop-shadow" />
              <span className="relative z-10 text-sm font-semibold tracking-wide drop-shadow">
                Ask DoubtGPT
              </span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Output Section */}
      <div className="relative bg-[#1e1e2e] rounded-xl p-4 h-[600px] overflow-y-auto font-mono text-sm">
        {isRunning ? (
          <RunningCodeSkeleton />
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3 text-red-400"
          >
            <AlertTriangle className="w-5 h-5 mt-1" />
            <div>
              <div className="font-bold mb-1">Execution Error</div>
              <pre className="whitespace-pre-wrap text-red-300">{error}</pre>
            </div>
          </motion.div>
        ) : output ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Execution Successful</span>
            </div>
            <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <Clock className="w-10 h-10 mb-3" />
            <p className="text-center text-sm">
              Run your code to see the output here.
            </p>
          </div>
        )}

        {/* DoubtGPT Chat */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 border border-[#313244] bg-[#11111b] rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-bold text-purple-300">💬 DoubtGPT</h2>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="group relative p-1 rounded-full hover:bg-red-500/10 transition duration-200"
                  aria-label="Close DoubtGPT"
                >
                  <X className="w-4 h-4 text-red-400 group-hover:scale-110 group-hover:text-red-600 transition-transform duration-200" />
                  <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                    Close chat
                  </span>
                </button>
              </div>

              <div
                ref={chatBoxRef}
                className="flex flex-col space-y-3 max-h-[250px] overflow-y-auto pr-1"
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`rounded-lg px-4 py-3 text-sm shadow-md max-w-[90%] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-900/40 text-blue-100 self-end"
                        : "bg-zinc-900 text-gray-100 self-start"
                    }`}
                  >
                    <span className="block text-xs mb-2 text-gray-400">
                      {msg.role === "user" ? "You" : "DoubtGPT"}
                    </span>
                    <div className="prose prose-invert prose-sm max-w-none leading-relaxed space-y-2">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          p: ({ children }) => (
                            <p className="text-gray-300">{children}</p>
                          ),
                          strong: ({ children }) => (
                            <strong className="text-white">{children}</strong>
                          ),
                          code: ({ children }) => (
                            <code className="bg-[#1e1e2e] text-pink-400 px-1 py-0.5 rounded">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-[#1e1e2e] p-3 rounded-md text-sm overflow-x-auto">
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
                {geminiLoading && (
                  <div className="text-gray-400 text-sm animate-pulse">
                    DoubtGPT is typing…
                  </div>
                )}
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUserQuestion()}
                  placeholder="Ask a follow-up..."
                  className="flex-1 px-3 py-2 rounded-md bg-[#1a1a26] text-white text-sm border border-[#313244] placeholder:text-gray-500"
                />
                <button
                  onClick={handleUserQuestion}
                  disabled={geminiLoading}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white text-sm font-medium transition disabled:opacity-50"
                >
                  {geminiLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default OutputPanel;
