export const personalInfo = {
  name: "Rohit Kumar",
  location: "Noida, Uttar Pradesh, India",
  phone: "+91-9123773081",
  email: "rohitk22910@gmail.com",
  linkedin: "https://www.linkedin.com/in/rohit-kumar-323397245/",
  github: "https://github.com/Skullcandyyy",
  summary:
    "AI and Full Stack Developer with hands-on experience building 10+ projects using Python, LangChain, RAG architectures, and the MERN stack. Skilled in integrating LLMs (OpenAI, Gemini) into web applications, implementing vector-based semantic search, and developing end-to-end solutions from database design to frontend UI. Seeking an SDE or AI Engineering internship and full-time role.",
};

export const skills = {
  languages: ["Python", "JavaScript", "SQL", "C"],
  frontend: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  backend: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
  ai: [
    "LangChain",
    "RAG",
    "LLMs",
    "Embeddings",
    "Prompt Engineering",
    "OpenAI API",
    "Gemini API",
    "Vosk STT",
  ],
  databases: ["MongoDB", "MySQL", "Vector DB", "Pinecone"],
  tools: [
    "Git",
    "GitHub",
    "Streamlit",
    "Vercel",
    "Railway",
    "VS Code",
    "Postman",
  ],
  concepts: [
    "Vector Databases",
    "Semantic Search",
    "Text Chunking",
    "Web Scraping",
    "Voice Recognition",
    "Agentic Workflows",
  ],
};

export const skillLevels = [
  { name: "Python", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "TypeScript", level: 75 },
  { name: "React.js", level: 85 },
  { name: "Next.js", level: 80 },
  { name: "Node.js", level: 82 },
  { name: "LangChain", level: 88 },
  { name: "RAG / Vector DB", level: 85 },
  { name: "MongoDB", level: 80 },
  { name: "SQL", level: 70 },
];

export const projectCategories = ["All", "AI", "Full Stack", "Backend"] as const;

export const experience = [
  {
    title: "Freelance Shopify Developer",
    period: "Jun 2026",
    type: "Independent / Contract",
    tech: ["Node.js", "Express.js", "Shopify Admin REST API", "Vanilla JavaScript", "ngrok"],
    points: [
      "Architected and developed a custom Shopify application enabling dynamic, ZIP code-based product pricing, connecting a Node.js backend to the Shopify storefront via the Shopify Admin REST API.",
      "Utilized Shopify Script Tags to seamlessly inject a custom Vanilla JavaScript widget into the product UI, enabling real-time price queries without altering core theme files.",
      "Engineered a RESTful API endpoint to process destination ZIP codes and apply regional pricing rules, handling distinct price outputs for 3+ geographic zones.",
      "Employed LLM-assisted rapid prototyping and ngrok tunneling to design, test, and deploy the full-stack architecture within a 2.5-hour turnaround.",
    ],
  },
];

export const projects = [
  {
    title: "Re-Con — AI-Powered E-Commerce Platform",
    period: "Oct 2025 – Feb 2026",
    category: "Full Stack",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Cheerio", "Vosk STT"],
    points: [
      "Developed a full-stack e-commerce platform enabling price comparison across 5+ online retailers, helping users save an average of 15-20% per purchase.",
      "Built RESTful APIs with Node.js and Express.js handling 10+ endpoints for user authentication, product search, and price aggregation.",
      "Implemented automated web scraping using Cheerio to extract product names, prices, and ratings from multiple e-commerce websites in real-time.",
      "Integrated Vosk Speech-to-Text engine for hands-free voice search, achieving 85%+ accuracy in noisy environments with a custom vocabulary of 2000+ product terms.",
      "Designed MongoDB schemas for user management, product catalog, and price history, optimizing query performance with indexing.",
      "Deployed frontend on Vercel and backend on Railway with CI/CD pipeline.",
    ],
    link: "https://recon-ai-bhly.onrender.com/",
  },
  {
    title: "DocMind — AI Document Question Answering System",
    period: "Feb 2026 – Mar 2026",
    category: "AI",
    tech: ["Python", "LangChain", "Vector DB", "Hugging Face", "Streamlit"],
    points: [
      "Built a Retrieval-Augmented Generation (RAG) application that processes PDF documents and answers user queries with context-grounded responses, reducing hallucination by an estimated 40% compared to raw LLM output.",
      "Implemented document loading, recursive text chunking (1000 tokens, 200 overlap), and Hugging Face embedding generation for 500+ page documents.",
      "Stored and indexed document chunks in Vector DB, enabling sub-second semantic search across 200+ vector embeddings.",
      "Developed an interactive Streamlit-based chat interface supporting multi-turn conversation, source citation display, and real-time response streaming.",
      "Deployed the application on Streamlit Cloud with a live demo accessible to users.",
    ],
    link: "https://docmind14.streamlit.app/",
  },
  {
    title: "CityMind — Intelligence City Assistant",
    period: "Apr 2026 – May 2026",
    category: "AI",
    tech: ["Python", "LangChain", "Mistral AI", "Tavily API", "OpenWeatherMap API", "Streamlit"],
    points: [
      "Architected an autonomous AI agent using LangChain and Mistral Large, leveraging native LLM tool-calling capabilities to dynamically select and execute external functions based on user intent.",
      "Utilized the @tool decorator to wrap up standard Python functions into structured tools, enabling the agent to autonomously trigger REST API calls to OpenWeatherMap and Tavily for real-time data retrieval.",
      "Engineered a custom Human-in-the-Loop (HITL) middleware by utilizing wrap_tool_call to intercept and wrap function execution, enforcing manual user approval before any external API tool call is processed.",
      "Orchestrated multi-turn conversations by passing structured message histories (Human/Tool Messages) through the agent pipeline, synthesizing multi-source API payloads into cohesive natural language responses.",
    ],
    link: "https://citymind.streamlit.app/",
  },
];

export const education = {
  degree: "Bachelor of Technology in Computer Science and Engineering",
  institution: "KCC Institute of Technology and Management, Noida, Uttar Pradesh",
  period: "Sep 2022 – May 2026",
  cgpa: "7.9/10.0",
  coursework: [
    "Data Structures and Algorithms",
    "Database Management Systems",
    "Machine Learning",
    "Artificial Intelligence",
    "Web Technologies",
    "Operating Systems",
    "Computer Networks",
  ],
};

export const certifications = [
  {
    title: "Deloitte — Data Analytics Job Simulation",
    detail: "Certificate of Completion — Forage",
    year: "Jul 2026",
  },
  {
    title: "Datacom — Software Development Job Simulation",
    detail: "Certificate of Completion — Forage",
    year: "Jul 2026",
  },
  {
    title: "Tata Group — GenAI Powered Data Analytics Job Simulation",
    detail: "Certificate of Completion — Forage",
    year: "Jul 2026",
  },
];

export const codeSnippets = [
  {
    title: "RAG Pipeline with LangChain",
    language: "python",
    code: `from langchain.chains import RetrievalQA
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma

embeddings = HuggingFaceEmbeddings(
  model_name="sentence-transformers/all-MiniLM-L6-v2"
)
vectorstore = Chroma(
  persist_directory="./db",
  embedding_function=embeddings
)
qa = RetrievalQA.from_chain_type(
  llm=llm,
  chain_type="stuff",
  retriever=vectorstore.as_retriever()
)
response = qa.invoke("What is this document about?")`,
  },
  {
    title: "AI Agent with Tool Calling",
    language: "python",
    code: `from langchain.agents import initialize_agent
from langchain.tools import tool

@tool
def get_weather(city: str) -> str:
    """Get current weather for a city"""
    return requests.get(
        f"https://api.openweathermap.org/data/2.5/weather?q={city}"
    ).json()

agent = initialize_agent(
    tools=[get_weather],
    llm=MistralLarge(),
    agent="structured-chat-zero-shot-react-description",
    handle_parsing_errors=True
)
agent.run("What's the weather in Tokyo?")`,
  },
  {
    title: "Shopify Price API",
    language: "javascript",
    code: `app.post('/api/price', async (req, res) => {
  const { zipCode, productId } = req.body;
  const zone = getZoneFromZip(zipCode);
  const price = zonePrices[zone] || basePrice;

  const product = await Shopify.product.get(productId);
  const variant = product.variants[0];

  await Shopify.productVariant.update(variant.id, {
    price: price.toFixed(2)
  });

  res.json({ success: true, price });
});`,
  },
];

export const currentlyBuilding = {
  title: "AI-Powered Code Review Assistant",
  description:
    "Building a LangChain-powered tool that automatically reviews PRs, suggests optimizations, and catches bugs before merge. Integrates with GitHub Actions.",
  tech: ["Python", "LangChain", "OpenAI", "GitHub API", "FastAPI"],
  status: "In Development",
};

export const contributions = [
  {
    repo: "langchain-ai/langchain",
    description: "Added documentation for tool-calling patterns and fixed a bug in the agent executor",
    type: "Docs & Bug Fix",
    link: "https://github.com/langchain-ai/langchain",
  },
];

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  about         — About Rohit
  skills        — List technical skills
  experience    — Work experience
  projects      — View projects
  education     — Education details
  contact       — Contact information
  ls            — List all sections
  clear         — Clear terminal
  help          — Show this message`,

  about: personalInfo.summary,

  skills: Object.entries(skills)
    .map(([cat, items]) => `${cat}:\n  ${items.join(", ")}`)
    .join("\n"),

  experience: experience
    .map((e) => `${e.title} (${e.period})\n  ${e.type}\n  ${e.points[0]}`)
    .join("\n"),

  projects: projects
    .map((p) => `${p.title}\n  Category: ${p.category}\n  Tech: ${p.tech.join(", ")}`)
    .join("\n"),

  education: `${education.degree}\n${education.institution}\n${education.period} | CGPA: ${education.cgpa}`,

  contact: `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nLocation: ${personalInfo.location}\nLinkedIn: ${personalInfo.linkedin}\nGitHub: ${personalInfo.github}`,

  ls: "about   skills   experience   projects   education   contact   help",
};

terminalCommands[""] = "Type 'help' to see available commands.";

export const projectMetrics = [
  {
    project: "Re-Con",
    metrics: [
      { label: "Retailers Scraped", value: "5+", icon: "store" },
      { label: "Avg. Savings", value: "15-20%", icon: "chart" },
      { label: "API Endpoints", value: "10+", icon: "api" },
      { label: "Voice Accuracy", value: "85%+", icon: "mic" },
    ],
  },
  {
    project: "DocMind",
    metrics: [
      { label: "Pages Processed", value: "500+", icon: "doc" },
      { label: "Hallucination Reduction", value: "40%", icon: "brain" },
      { label: "Search Speed", value: "<1s", icon: "bolt" },
      { label: "Vector Embeddings", value: "200+", icon: "db" },
    ],
  },
  {
    project: "CityMind",
    metrics: [
      { label: "Data Sources", value: "3+", icon: "globe" },
      { label: "Tool Integrations", value: "4+", icon: "tool" },
      { label: "Agent Type", value: "Autonomous", icon: "robot" },
      { label: "Response Mode", value: "Real-time", icon: "bolt" },
    ],
  },
];

export const dayInLife = [
  { time: "9:00 AM", activity: "PR Reviews & Code Merge", emoji: "📬", type: "code" },
  { time: "10:00 AM", activity: "RAG Pipeline Debugging", emoji: "🔍", type: "ai" },
  { time: "11:30 AM", activity: "React Component Architecture", emoji: "⚛️", type: "code" },
  { time: "1:00 PM", activity: "Lunch Break", emoji: "🍜", type: "break" },
  { time: "2:00 PM", activity: "LangChain Agent Development", emoji: "🤖", type: "ai" },
  { time: "3:30 PM", activity: "Database Schema Design", emoji: "🗄️", type: "code" },
  { time: "5:00 PM", activity: "API Integration & Testing", emoji: "🔗", type: "code" },
  { time: "6:30 PM", activity: "Documentation & Open Source", emoji: "📝", type: "other" },
];

export const chatResponses: Record<string, string> = {
  "hi|hello|hey": "Hey there! 👋 Ask me anything about Rohit's skills, projects, or experience!",
  "who|rohit|about|are you": personalInfo.summary,
  "skills|tech|technologies|stack": `Rohit's key skills:\n${Object.entries(skills)
    .map(([cat, items]) => `• ${cat}: ${items.join(", ")}`)
    .join("\n")}`,
  "experience|work|job": experience
    .map((e) => `• ${e.title} (${e.period})\n  ${e.points[0]}`)
    .join("\n"),
  "projects|project|built|made": projects
    .map((p) => `• ${p.title}\n  ${p.tech.join(", ")}`)
    .join("\n"),
  "education|college|university|study": `${education.degree} at ${education.institution} (${education.period}) — CGPA: ${education.cgpa}`,
  "contact|email|phone|reach": `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nLocation: ${personalInfo.location}`,
  "langchain|rag|ai": "Rohit has deep experience with LangChain, RAG architectures, vector databases, and LLM integration. He's built 3 AI-powered applications using these technologies.",
  "resume|hire|internship|job": "Rohit is actively seeking SDE and AI Engineering internships/roles. You can reach him at rohitk22910@gmail.com!",
  "python|react|node": "Rohit is proficient in these technologies. Check the skills section for a full breakdown!",
  "thanks|thank|bye": "You're welcome! 😊 Feel free to ask anything else. Good luck! 🚀",
};
