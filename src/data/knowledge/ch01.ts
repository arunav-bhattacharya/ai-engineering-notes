import type { Card } from "../../components/Flashcards";
import type { Question } from "../../components/Quiz";
import type { Assignment } from "../../components/Assignments.astro";

export const flashcards: Card[] = [
  {
    front: "What is a language model, in one sentence?",
    back: "A model that encodes statistical information about language — given some context, it predicts how likely each token is to come next (or to fill a blank).",
  },
  {
    front: "What is a token, and why do models use tokens instead of words or characters?",
    back: "The basic text unit a model works with — a character, word, or word-piece. Tokens keep the vocabulary small, carry more meaning than single characters, and let the model handle unseen words by breaking them into known pieces.",
  },
  {
    front: "Autoregressive vs. masked language models — what's the difference?",
    back: "Autoregressive models predict the NEXT token using only preceding context (great for generation, e.g. GPT). Masked models fill in blanks using context from BOTH sides (great for understanding tasks, e.g. BERT).",
  },
  {
    front: "What is self-supervision, and why did it unlock LLMs?",
    back: "Training where labels are inferred from the input itself — every sentence supplies its own next-token labels. It removed the data-labeling bottleneck, so models could scale on virtually unlimited internet text.",
  },
  {
    front: "How does self-supervised learning differ from unsupervised learning?",
    back: "Self-supervised learning still uses labels, but infers them from the input data itself. Unsupervised learning uses no labels at all.",
  },
  {
    front: "What makes a model a 'foundation' model rather than just an LLM?",
    back: "It can be built upon: trained at scale to be general-purpose, often multimodal (text + images + more), and adaptable to many downstream tasks rather than built for one.",
  },
  {
    front: "Name the three most common techniques for adapting a foundation model to your task.",
    back: "Prompt engineering (instructions + examples), retrieval-augmented generation (supplementing prompts with external data), and finetuning (further training the model on your data).",
  },
  {
    front: "Which three factors created the boom in AI engineering as a discipline?",
    back: "1) General-purpose model capabilities enabling new applications, 2) a sharp rise in AI investment, and 3) a low barrier to entry — models available via API, no infrastructure needed.",
  },
  {
    front: "What does 'AI is complementary vs. critical' mean when planning a product?",
    back: "If the app still works without AI (Gmail without Smart Compose), AI is complementary and mistakes are tolerable. If the app can't exist without it (Face ID), AI is critical and must be far more reliable.",
  },
  {
    front: "What are the three classic competitive moats for an AI product?",
    back: "Technology, data, and distribution. With everyone using similar foundation models, distribution favors incumbents — so a startup's likeliest moat is proprietary usage data gathered by getting to market early.",
  },
  {
    front: "What is the 'last mile challenge' of AI products?",
    back: "A demo that reaches ~80% quality comes fast, but closing the gap to production quality takes far longer — e.g. LinkedIn needed 1 month to hit 80% and 4 more months to pass 95%.",
  },
  {
    front: "Name the three layers of the AI engineering stack.",
    back: "Application development (prompts, evaluation, interfaces), model development (training, dataset engineering, inference optimization), and infrastructure (serving, compute/data management, monitoring).",
  },
  {
    front: "What are the three big shifts from ML engineering to AI engineering?",
    back: "1) You adapt existing models instead of training your own, 2) models are bigger — so inference optimization and GPU skills matter more, 3) outputs are open-ended — so evaluation becomes much harder and more central.",
  },
  {
    front: "Pre-training vs. finetuning vs. post-training — untangle the three.",
    back: "Pre-training: training from scratch (random weights) — often ~98% of total compute. Finetuning: continuing to train an existing model. Post-training: same idea as finetuning, but usually said of model developers polishing a model (e.g. instruction-following) before release.",
  },
  {
    front: "Why is evaluation harder for foundation models than for traditional ML?",
    back: "Outputs are open-ended — there's no exhaustive ground truth for 'all good chatbot replies'. Results also swing with the adaptation technique used (prompting alone moved Gemini Ultra's MMLU score from 83.7% to 90.04%).",
  },
  {
    front: "How does the AI engineering workflow invert the traditional ML workflow?",
    back: "Traditional ML: data → model → product. AI engineering: product first (built on an existing model), then invest in data and model improvements only once the product shows promise.",
  },
];

export const quiz: Question[] = [
  {
    q: "Why were language models the family that scaled into the 'ChatGPT moment', rather than, say, fraud-detection models?",
    options: [
      "Language models can be trained by self-supervision, so training data is nearly unlimited",
      "Language models have inherently more parameters than other model types",
      "Text data is easier to store than tabular data",
      "Transformers only work on text",
    ],
    answer: 0,
    explanation:
      "Self-supervision is the key: every text sequence labels itself (each next token is a training target), so language models could train on internet-scale data without paying for labels — and scale unlocked the new capabilities.",
  },
  {
    q: "Roughly how do tokens relate to words for a model like GPT-4?",
    options: [
      "1 token ≈ 1 word, always",
      "An average token is about ¾ of a word, so 100 tokens ≈ 75 words",
      "A token is always a single character",
      "Tokens are whole sentences",
    ],
    answer: 1,
    explanation:
      "Tokens are word-pieces: 'can't' becomes two tokens, 'cooking' could be 'cook' + 'ing'. For GPT-4 an average token is ~¾ the length of a word — hence the rule of thumb that 100 tokens ≈ 75 words.",
  },
  {
    q: "You need a model for sentiment classification where surrounding context on both sides matters. Which model type is the more natural fit?",
    options: [
      "An autoregressive model, because it generates fluent text",
      "A masked language model, because it uses context from both directions",
      "A diffusion model",
      "Either — they are interchangeable for all tasks",
    ],
    answer: 1,
    explanation:
      "Masked LMs (like BERT) read context on both sides of a position, which suits understanding and classification tasks. Autoregressive models dominate generation — that doesn't make them ideal for everything.",
  },
  {
    q: "CLIP was trained on 400 million (image, text) pairs that naturally co-occurred on the internet. What broader lesson does CLIP illustrate?",
    options: [
      "Image models must be trained with manual labels",
      "The 'data labels itself' trick extends beyond text, letting multimodal models scale cheaply too",
      "Embedding models generate open-ended outputs",
      "Multimodal models require 400× more compute than text models",
    ],
    answer: 1,
    explanation:
      "CLIP's natural-language supervision avoided manual labeling by harvesting co-occurring pairs — the same bottleneck-removal that scaled LLMs, applied across modalities. (Note: CLIP is an embedding model, not a generative one.)",
  },
  {
    q: "A startup builds a PDF-Q&A product as a thin layer over a frontier model's API. Which planning risk does this raise most directly?",
    options: [
      "The product may be subsumed when the underlying model gains that capability natively",
      "PDF parsing is impossible for foundation models",
      "APIs cannot scale to production traffic",
      "Latency will always be too high for users",
    ],
    answer: 0,
    explanation:
      "Thin layers over someone else's model are vulnerable: if the base model learns to do your feature natively, your application can become obsolete overnight. Defensibility needs data, distribution, or a deliberate niche (e.g. self-hosted open models).",
  },
  {
    q: "Face ID vs. Gmail's Smart Compose — what planning distinction do these two illustrate?",
    options: [
      "Reactive vs. proactive features",
      "Critical vs. complementary AI — and thus how reliable the AI must be",
      "Dynamic vs. static features",
      "Open-ended vs. close-ended outputs",
    ],
    answer: 1,
    explanation:
      "Face ID can't work without its AI (critical), so its accuracy bar is very high. Gmail works fine without Smart Compose (complementary), so occasional bad suggestions are acceptable. Criticality sets the reliability bar.",
  },
  {
    q: "Why do PROACTIVE AI features (like traffic alerts) typically need a higher quality bar than reactive ones?",
    options: [
      "They must respond faster than reactive features",
      "Users didn't ask for them, so low-quality interruptions feel intrusive",
      "They can't be precomputed",
      "They require larger models",
    ],
    answer: 1,
    explanation:
      "Nobody requested a proactive suggestion — if it's wrong or irrelevant it reads as noise. The upside: since they're shown opportunistically, they can be precomputed, so latency matters less.",
  },
  {
    q: "In Microsoft's Crawl-Walk-Run framing for AI automation, what changes at each stage?",
    options: [
      "Model size grows from small to large",
      "The degree of human involvement decreases as trust in the AI grows",
      "Latency targets get stricter",
      "The number of models in production increases",
    ],
    answer: 1,
    explanation:
      "Crawl: humans must be in the loop. Walk: AI interacts directly with internal employees. Run: AI may interact directly with external users. Automation expands as measured quality earns trust.",
  },
  {
    q: "Which part of the AI stack changed the LEAST with the arrival of foundation models?",
    options: [
      "Application development",
      "Model development",
      "Infrastructure",
      "Evaluation",
    ],
    answer: 2,
    explanation:
      "GitHub repo analysis in the book shows applications and app-dev tooling exploded after ChatGPT, while infrastructure grew modestly — serving, resource management, and monitoring needs stayed largely the same.",
  },
  {
    q: "Gemini's launch claimed it beat GPT-4 on MMLU — using CoT@32 prompting (32 examples) vs GPT-4's 5-shot. What's the takeaway for evaluation?",
    options: [
      "Gemini is unambiguously better than GPT-4",
      "MMLU is a useless benchmark",
      "Benchmark numbers are only comparable when the adaptation/prompting technique is held constant",
      "More examples in a prompt always improve performance",
    ],
    answer: 2,
    explanation:
      "With 5-shot prompting for both, GPT-4 scored higher; with CoT@32, Gemini did. Neither number is a lie — they're just not comparable. Always check the prompting setup behind a benchmark claim.",
  },
];

export const assignments: Assignment[] = [
  {
    title: "Map a real product onto the AI engineering stack",
    difficulty: "Starter",
    time: "~45 min",
    brief:
      "Pick an AI product you use (e.g. GitHub Copilot, Notion AI, a customer-support bot) and reverse-engineer how it's probably built.",
    steps: [
      "Identify what the product does and which parts require a foundation model.",
      "For each of the three stack layers — application development, model development, infrastructure — write down what this product likely needs (prompts? RAG? finetuned model? caching? monitoring?).",
      "Classify its AI: critical or complementary? Reactive or proactive? Dynamic or static?",
      "Decide: if the underlying frontier model improved 10×, would this product become stronger or obsolete? Why?",
    ],
    deliverable:
      "A one-page write-up with your stack map and a defensibility verdict (moat: technology, data, or distribution?).",
  },
  {
    title: "Feel tokenization and completion first-hand",
    difficulty: "Starter",
    time: "~1 hour",
    brief:
      "Build intuition for tokens and the 'completion machine' framing by poking at a real tokenizer and a base-style prompt.",
    steps: [
      "Open a tokenizer playground (e.g. OpenAI's tokenizer page or the <code>tiktoken</code> library) and tokenize: a normal sentence, a sentence with a made-up word, some code, and a non-English sentence. Note the token counts.",
      "Verify the ~¾ rule: count words vs tokens across a few paragraphs.",
      "Using any chat model, frame three different tasks purely as completions (translation, classification, Q&A) the way the chapter describes — e.g. <code>Question: Is this email spam? … Answer:</code>.",
      "Ask a question designed to expose completion-vs-conversation behavior and note how an instruction-tuned model differs from pure completion.",
    ],
    deliverable:
      "A short note with your token-count table and one observation that surprised you.",
  },
  {
    title: "Write a one-page AI product plan",
    difficulty: "Intermediate",
    time: "~2–3 hours",
    brief:
      "Run a real idea through the chapter's planning framework before writing any code — the discipline most demos skip.",
    steps: [
      "Pick an AI application idea you've been tempted to build.",
      "Use-case evaluation: which risk/opportunity level motivates it (existential, profit/productivity, or not-left-behind)? Buy or build?",
      "Define the role of AI (critical/complementary, reactive/proactive, dynamic/static) and the role of humans (crawl, walk, or run to start?).",
      "Set success metrics: business metrics plus a usefulness threshold (quality, latency including TTFT/TPOT, cost per request).",
      "Plan milestones assuming the last 20% takes 4× the effort of the first 80%, and list 3 maintenance risks (price changes, API deprecations, regulation).",
    ],
    deliverable:
      "A one-page plan you could defend to a skeptical engineering lead.",
  },
];
