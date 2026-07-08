"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import {
  personalInfo,
  skills,
  projects,
  experience,
  education,
  certifications,
  skillLevels,
} from "@/lib/data";

interface Message {
  role: "user" | "bot";
  text: string;
  sources?: string[];
}

interface KnowledgeChunk {
  content: string;
  category: string;
  keywords: string[];
  source: string;
}

const knowledgeBase: KnowledgeChunk[] = [
  {
    content: `Rohit Kumar is an AI and Full Stack Developer based in Noida, India. He has hands-on experience building 3 production-deployed applications using Python, LangChain, RAG architectures, and the MERN stack. He's skilled in integrating LLMs (OpenAI, Gemini) into web applications, implementing vector-based semantic search, and developing end-to-end solutions.`,
    category: "about",
    keywords: ["who", "about", "rohit", "introduce", "background", "summary", "tell me about"],
    source: "Personal Info",
  },
  {
    content: `Rohit's key AI/ML skills include: LangChain (88% proficiency), RAG architectures, LLMs, Embeddings, Prompt Engineering, OpenAI API, Gemini API, and Vosk Speech-to-Text. He has deep experience with vector databases (Pinecone, Chroma) for semantic search and has built applications using Hugging Face models.`,
    category: "ai",
    keywords: ["ai", "ml", "langchain", "rag", "llm", "openai", "gemini", "machine learning", "deep learning", "nlp", " embeddings", "vector"],
    source: "Skills - AI/ML",
  },
  {
    content: `Rohit's frontend skills include: React.js (85%), Next.js (80%), Tailwind CSS, HTML5, CSS3, and TypeScript (75%). He builds responsive, modern web interfaces with smooth animations using Framer Motion.`,
    category: "frontend",
    keywords: ["frontend", "react", "nextjs", "next.js", "tailwind", "css", "html", "typescript", "ui", "ux", "interface"],
    source: "Skills - Frontend",
  },
  {
    content: `Rohit's backend skills include: Node.js (82%), Express.js, FastAPI, REST APIs, MongoDB (80%), MySQL, and SQL (70%). He designs RESTful APIs, database schemas, and handles authentication and deployment.`,
    category: "backend",
    keywords: ["backend", "node", "express", "fastapi", "api", "database", "mongodb", "mysql", "sql", "server"],
    source: "Skills - Backend",
  },
  {
    content: `Rohit's tools and technologies: Git, GitHub, Streamlit, Vercel, Railway, VS Code, Postman. He's proficient with deployment pipelines and CI/CD workflows.`,
    category: "tools",
    keywords: ["tools", "git", "github", "streamlit", "vercel", "railway", "deploy", "ci/cd", "devops"],
    source: "Skills - Tools",
  },
  {
    content: `Re-Con is an AI-Powered E-Commerce Platform built with React.js, Node.js, Express.js, MongoDB, Cheerio, and Vosk STT. It enables price comparison across 5+ online retailers, helping users save 15-20% per purchase. Features include automated web scraping, voice search with 85%+ accuracy, and 10+ API endpoints. Deployed on Vercel and Railway.`,
    category: "projects",
    keywords: ["re-con", "recon", "ecommerce", "e-commerce", "price comparison", "scrapping", "scraping", "voice search"],
    source: "Projects - Re-Con",
  },
  {
    content: `DocMind is an AI Document Question Answering System built with Python, LangChain, Vector DB, Hugging Face, and Streamlit. It's a RAG application that processes PDF documents and answers queries with context-grounded responses, reducing hallucination by 40%. Features include recursive text chunking, semantic search across 200+ vector embeddings, and multi-turn conversation. Deployed on Streamlit Cloud.`,
    category: "projects",
    keywords: ["docmind", "document", "pdf", "qa", "question answering", "rag", "hallucination"],
    source: "Projects - DocMind",
  },
  {
    content: `CityMind is an Intelligence City Assistant built with Python, LangChain, Mistral AI, Tavily API, OpenWeatherMap API, and Streamlit. It's an autonomous AI agent that dynamically selects and executes external functions based on user intent. Features include Human-in-the-Loop middleware, multi-turn conversations, and real-time API data retrieval.`,
    category: "projects",
    keywords: ["citymind", "city", "assistant", "agent", "autonomous", "weather", "mistral"],
    source: "Projects - CityMind",
  },
  {
    content: `Rohit worked as a Freelance Shopify Developer (Jun 2026). He architected a custom Shopify application for dynamic ZIP code-based product pricing, connecting a Node.js backend to the Shopify storefront via the Admin REST API. The project was deployed within a 2.5-hour turnaround using LLM-assisted rapid prototyping and ngrok tunneling.`,
    category: "experience",
    keywords: ["experience", "work", "job", "shopify", "freelance", "contract", "employment"],
    source: "Experience",
  },
  {
    content: `Rohit is pursuing a B.Tech in Computer Science and Engineering from KCC Institute of Technology and Management, Noida (Sep 2022 - May 2026) with a CGPA of 7.9/10.0. Relevant coursework includes: Data Structures and Algorithms, Database Management Systems, Machine Learning, Artificial Intelligence, Web Technologies, Operating Systems, and Computer Networks.`,
    category: "education",
    keywords: ["education", "college", "university", "degree", "btech", "b.tech", "cgpa", "coursework", "study", "academic"],
    source: "Education",
  },
  {
    content: `Rohit's certifications: Google AI Essentials (Coursera, 2025), Deep Learning Specialization: LangChain for LLM Application Development (DeepLearning.AI, 2025), and HackerRank Python Basic Certified (50+ problems solved).`,
    category: "certifications",
    keywords: ["certification", "certificate", "course", "google", "coursera", "hackerrank", "deeplearning"],
    source: "Certifications",
  },
  {
    content: `You can contact Rohit via email at rohitk22910@gmail.com, phone at +91-9123773081, or connect on LinkedIn at linkedin.com/in/rohit-kumar-323397245 and GitHub at github.com/Skullcandyyy. He's located in Noida, Uttar Pradesh, India.`,
    category: "contact",
    keywords: ["contact", "email", "phone", "linkedin", "github", "reach", "connect", "location", "address"],
    source: "Contact",
  },
  {
    content: `Rohit is actively seeking SDE and AI Engineering internships and full-time roles. He's available for opportunities and can be reached at rohitk22910@gmail.com.`,
    category: "hiring",
    keywords: ["hire", "hiring", "internship", "job", "opportunity", "available", "work", "recruit", "employment", "resume"],
    source: "Hiring",
  },
  {
    content: `Rohit's core proficiency levels: Python (90%), LangChain (88%), React.js (85%), RAG/Vector DB (85%), Node.js (82%), Next.js (80%), MongoDB (80%), TypeScript (75%), SQL (70%).`,
    category: "skills",
    keywords: ["proficiency", "level", "percentage", "how good", "skill level", "rating"],
    source: "Skill Levels",
  },
  {
    content: `Rohit has contributed to open source, including documentation and bug fixes for langchain-ai/langchain on GitHub. He added documentation for tool-calling patterns and fixed a bug in the agent executor.`,
    category: "opensource",
    keywords: ["open source", "opensource", "contribution", "github", "langchain", "community"],
    source: "Contributions",
  },
];

function cosineSimilarity(a: string, b: string): number {
  const wordsA = a.toLowerCase().split(/\s+/);
  const wordsB = b.toLowerCase().split(/\s+/);
  const allWords = new Set([...wordsA, ...wordsB]);
  const vecA = Array.from(allWords).map((w) => wordsA.filter((x) => x === w).length);
  const vecB = Array.from(allWords).map((w) => wordsB.filter((x) => x === w).length);
  const dot = vecA.reduce((sum, v, i) => sum + v * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(vecB.reduce((sum, v) => sum + v * v, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}

function retrieveRelevantChunks(query: string, topK = 3): KnowledgeChunk[] {
  const scored = knowledgeBase.map((chunk) => {
    const keywordScore = chunk.keywords.filter((k) =>
      query.toLowerCase().includes(k)
    ).length;
    const semanticScore = cosineSimilarity(query, chunk.content);
    const combinedScore = keywordScore * 0.6 + semanticScore * 0.4;
    return { chunk, score: combinedScore };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored
    .filter((s) => s.score > 0.05)
    .slice(0, topK)
    .map((s) => s.chunk);
}

function generateResponse(query: string): { text: string; sources: string[] } {
  const chunks = retrieveRelevantChunks(query);
  if (chunks.length === 0) {
    return {
      text: `I don't have specific information about "${query}". Try asking about Rohit's skills, projects, experience, education, or how to contact him.`,
      sources: [],
    };
  }
  const responseText = chunks.map((c) => c.content).join("\n\n");
  const sources = [...new Set(chunks.map((c) => c.source))];
  return { text: responseText, sources };
}

const suggestedQuestions = [
  "What are Rohit's AI/ML skills?",
  "Tell me about DocMind",
  "What's his experience?",
  "How can I contact him?",
  "What certifications does he have?",
  "Is he available for hire?",
];

export default function ChatResume() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm an AI assistant powered by RAG. Ask me anything about Rohit's skills, projects, experience, or background. I'll search through my knowledge base to find the most relevant information.",
      sources: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const typeMessage = useCallback(
    (fullText: string, sources: string[]) => {
      setIsTyping(true);
      let current = "";
      const chars = fullText.split("");
      let i = 0;

      const typeChar = () => {
        if (i < chars.length) {
          current += chars[i];
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "bot",
              text: current,
              sources,
            };
            return updated;
          });
          i++;
          setTimeout(typeChar, 8 + Math.random() * 12);
        } else {
          setIsTyping(false);
        }
      };
      typeChar();
    },
    []
  );

  const handleSend = useCallback(
    (query?: string) => {
      const userMsg = (query || input).trim();
      if (!userMsg || loading || isTyping) return;

      setInput("");
      setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
      setLoading(true);

      setTimeout(() => {
        const { text, sources } = generateResponse(userMsg);
        setMessages((prev) => [...prev, { role: "bot", text: "", sources }]);
        setLoading(false);
        typeMessage(text, sources);
      }, 400 + Math.random() * 400);
    },
    [input, loading, isTyping, typeMessage]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader title="AI Assistant" subtitle="RAG-powered chatbot — ask me anything" />

          <div className="code-block overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-muted font-mono ml-2">ai-assistant</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-muted font-mono">RAG Active</span>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-[400px] overflow-y-auto flex flex-col gap-3">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white"
                          : "bg-black/5 dark:bg-white/5 text-foreground border border-black/6 dark:border-white/6"
                      }`}
                    >
                      {msg.role === "bot" && (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                          </div>
                          <span className="text-[10px] text-muted font-mono">RAG Response</span>
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-black/6 dark:border-white/6">
                          <div className="flex flex-wrap gap-1">
                            {msg.sources.map((s) => (
                              <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && !isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-muted text-xs"
                >
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="font-mono">Searching knowledge base...</span>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggested questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[11px] px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-muted border border-black/6 dark:border-white/6 hover:border-primary/30 hover:text-primary transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-black/6 dark:border-white/6">
              <span className="text-primary font-mono text-xs">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, experience..."
                disabled={loading || isTyping}
                className="flex-1 bg-transparent text-sm text-foreground placeholder-muted focus:outline-none disabled:opacity-50 font-mono"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading || isTyping}
                className="dev-btn dev-btn-primary !py-1.5 !px-3 !text-xs disabled:opacity-30"
              >
                Send
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
