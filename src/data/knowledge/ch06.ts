import type { Card } from "../../components/Flashcards";
import type { Question } from "../../components/Quiz";
import type { Assignment } from "../../components/Assignments.astro";

export const flashcards: Card[] = [
  {
    front: "What are the two components of a RAG system, and which one usually decides success?",
    back: "A retriever (indexes external data, fetches what's relevant per query) and a generator (answers using the retrieved context). The retriever is the make-or-break component — its two functions are indexing and querying.",
  },
  {
    front: "Why won't long context windows kill RAG?",
    back: "1) Data grows faster than context limits (and applications expand to fill whatever limit exists). 2) Models use long context poorly (lost in the middle). 3) Every extra token costs money and latency — retrieving only what's relevant is more efficient.",
  },
  {
    front: "How does TF-IDF intuitively score a document for a query?",
    back: "Term frequency: the more often a query term appears in the document, the more relevant it is. Inverse document frequency: terms appearing in many documents ('for', 'at') are less informative. Score = sum over query terms of TF × IDF. BM25 adds document-length normalization.",
  },
  {
    front: "What is an inverted index?",
    back: "A dictionary mapping each term to the documents containing it (often with term frequencies and document counts), enabling fast term-based lookup — the data structure behind Elasticsearch.",
  },
  {
    front: "Term-based vs embedding-based retrieval — core trade-off?",
    back: "Term-based: fast, cheap, strong out of the box, but literal (term ambiguity) and hard to improve. Embedding-based: matches meaning, supports natural queries, finetunable past the lexical ceiling — but adds embedding/vector-search cost and can bury exact keywords like error codes.",
  },
  {
    front: "Name four ANN vector-search approaches.",
    back: "LSH (hash similar vectors into buckets), HNSW (multi-layer proximity graph traversal), product quantization (compress vectors into subvector codes), IVF (k-means clusters; search nearest centroids' clusters). Trees too (Annoy). FAISS combines IVF + PQ.",
  },
  {
    front: "Context precision vs context recall?",
    back: "Precision: of retrieved documents, what fraction is relevant? Recall: of all relevant documents, what fraction got retrieved? Recall needs every document annotated per query, so many production frameworks only track precision. Ranking-aware metrics: NDCG, MAP, MRR.",
  },
  {
    front: "What is hybrid search, and what are the two combination patterns?",
    back: "Combining term-based and embedding-based retrieval. Sequential: cheap retriever fetches candidates, precise mechanism reranks. Parallel ensemble: run multiple retrievers, fuse rankings with reciprocal rank fusion — score(D) = Σ 1/(k + rankᵢ(D)).",
  },
  {
    front: "Why does chunk size matter, in both directions?",
    back: "Smaller chunks = more diverse information in context and finer retrieval — but risk severing key context, and double the chunks to embed, store, and search. Bigger chunks preserve context but waste tokens. Overlap protects boundary information. No universal best — experiment.",
  },
  {
    front: "What is query rewriting and when is it essential?",
    back: "Reformulating a query so it stands alone — 'How about Emily Doe?' → 'When did Emily Doe last buy from us?'. Essential for conversational follow-ups; can require identity resolution, and the rewriter must admit when it can't resolve rather than hallucinate.",
  },
  {
    front: "What is contextual retrieval (à la Anthropic)?",
    back: "Augmenting each chunk before indexing: metadata/keywords/entities, questions the chunk can answer, or an AI-generated 50–100 token blurb situating the chunk within its original document — so the retriever can find it from more angles.",
  },
  {
    front: "How does RAG work over tabular data?",
    back: "Text-to-SQL (predict relevant tables first if schemas overflow context) → execute the SQL → generate the answer from results. Semantic parsing replaces embedding search; the system needs query generation AND execution abilities.",
  },
  {
    front: "What defines an agent?",
    back: "Anything that perceives its environment and acts upon it — characterized by its environment (game, internet, terminal+filesystem) and its action set (tools). AI is the brain: it processes the task, plans actions, and judges completion. RAG is a simple agent; ChatGPT is too.",
  },
  {
    front: "Why do agents need stronger models than single-shot tasks?",
    back: "Compound errors — 95% per-step accuracy becomes 60% over 10 steps and 0.6% over 100 — and higher stakes: tool access makes failures more consequential.",
  },
  {
    front: "Three categories of agent tools?",
    back: "Knowledge augmentation (retrievers, SQL, web search — fresh context), capability extension (calculator, code interpreter, translator, image generator — patch model weaknesses), and write actions (send/update/delete — powerful, dangerous, gate them).",
  },
  {
    front: "Why decouple planning from execution?",
    back: "An unvalidated 1,000-step plan can burn hours and dollars going nowhere. Generate the plan, validate it (heuristics: valid tools, step caps; or AI judge), only then execute. Plan-generator + validator + executor is already a multi-agent system.",
  },
  {
    front: "Why generate plans in natural language instead of exact function names?",
    back: "Tool APIs change ('get_time' → 'get_current_time'); natural-language plans survive renames and transfer across toolsets, and models hallucinate them less. Cost: a translator module converts steps into executable calls — but translation is much easier than planning.",
  },
  {
    front: "What is ReAct, and what does Reflexion add?",
    back: "ReAct interleaves Thought (plan) → Act → Observation (reflect) until done — the canonical agent loop. Reflexion splits reflection into an evaluator (scores the outcome) and a self-reflection module (analyzes what went wrong), feeding a corrected new plan.",
  },
  {
    front: "List the three flavors of tool-use planning failure.",
    back: "Invalid tool (not in inventory), valid tool + invalid parameters (wrong count/names), valid tool + incorrect parameter values. Plus goal failures (wrong target or ignored constraints — budget, time) and reflection errors (claiming success falsely).",
  },
  {
    front: "What are a model's three memory mechanisms?",
    back: "Internal knowledge (in the weights, always available, changes only via training), short-term memory (the context window — fast, small, per-task), long-term memory (external storage accessed by retrieval — persists across sessions, deletable without retraining).",
  },
];

export const quiz: Question[] = [
  {
    q: "Anthropic's guidance: if your knowledge base is under ~200K tokens (~500 pages), you can…",
    options: [
      "Still need full RAG infrastructure",
      "Put the entire knowledge base in the prompt and skip RAG",
      "Must finetune instead",
      "Split it into exactly 200 chunks",
    ],
    answer: 1,
    explanation:
      "Small corpora fit in modern context windows — RAG earns its complexity when data exceeds context or when cost/latency/relevance demand selectivity. Know when NOT to build the pipeline.",
  },
  {
    q: "Querying 'transformer architecture' returns documents about the movie. Which retrieval property failed?",
    options: [
      "Context recall",
      "Term-based retrieval matches words, not meaning — term ambiguity strikes",
      "The chunk size was too small",
      "The vector database was misconfigured",
    ],
    answer: 1,
    explanation:
      "Lexical retrieval can't disambiguate senses. Embedding-based (semantic) retrieval ranks by meaning — or hybrid: fetch all 'transformer' docs cheaply, then vector-rerank toward the neural-architecture sense.",
  },
  {
    q: "Why does BM25 normalize term frequency by document length?",
    options: [
      "To penalize short documents",
      "Longer documents naturally contain more occurrences of any term, inflating raw TF scores",
      "To make indexing faster",
      "Because IDF requires it",
    ],
    answer: 1,
    explanation:
      "Raw TF favors long documents unfairly. BM25's length normalization is the key upgrade over naive TF-IDF — and BM25 remains a formidable baseline that's genuinely hard to beat.",
  },
  {
    q: "Your RAG data changes daily — 100M documents re-embedded every day. Which cost does the chapter flag here?",
    options: [
      "Generator API fees",
      "Embedding regeneration plus vector storage/search — vector DB spend can hit 20–50% of model API spend",
      "Network egress",
      "Prompt-engineering labor",
    ],
    answer: 1,
    explanation:
      "Embedding-based retrieval's costs concentrate in embedding generation and vector operations, and they scale with data churn. Term-based indexes update far more cheaply.",
  },
  {
    q: "The text 'I left my wife a note' gets chunked into 'I left my wife' + 'a note'. What's the standard protection?",
    options: [
      "Bigger vector dimensions",
      "Chunk overlap — boundary information lands intact in at least one chunk",
      "Reranking",
      "Query rewriting",
    ],
    answer: 1,
    explanation:
      "Non-overlapping chunks can sever meaning at boundaries. A modest overlap (e.g. ~20 chars on 2,048-char chunks) keeps boundary context retrievable. Recursive splitting (sections→paragraphs→sentences) reduces arbitrary cuts too.",
  },
  {
    q: "Why does tokenizer-based chunking create a maintenance hazard?",
    options: [
      "Tokens are larger than words",
      "Switching to a generative model with a different tokenizer forces reindexing all your data",
      "It prevents overlap",
      "Embedding models reject token boundaries",
    ],
    answer: 1,
    explanation:
      "Chunk by Llama 3's tokenizer and your index is coupled to Llama 3. Model swap → re-chunk and re-embed everything. Convenience now, migration cost later.",
  },
  {
    q: "An agent answers 'How many companies without revenue raised $1B+?' by enumerating all no-revenue companies first. What planning principle does this violate?",
    options: [
      "Tool selection",
      "Among correct plans, efficiency differs hugely — filter from the small set ($1B+ raisers), not the enormous one",
      "Plans must be validated by humans",
      "Agents may not use SQL",
    ],
    answer: 1,
    explanation:
      "Both decompositions are correct; one is wildly cheaper. Planning quality isn't just validity — it's choosing the promising path, which is why planning is framed as search.",
  },
  {
    q: "The Chameleon experiments showed GPT-4 + 13 tools beating GPT-4 alone by 11–17% on benchmarks. The chapter's framing of this result:",
    options: [
      "Tools are only for weak models",
      "Tool use can boost performance more than prompting or even finetuning — give the model a calculator instead of teaching it arithmetic",
      "13 is the optimal tool count",
      "Benchmarks favor tool users unfairly",
    ],
    answer: 1,
    explanation:
      "Patching model weaknesses with tools is resource-efficient capability extension. But more tools ≠ better: bigger inventories are harder to use well — ablate, watch per-tool error rates, and prune.",
  },
  {
    q: "Yann LeCun says autoregressive LLMs can't plan. What's the chapter's counterpoint?",
    options: [
      "LeCun is simply wrong — benchmarks prove planning",
      "Unclear if LLMs fundamentally can't plan or just lack the tooling: planning is search needing outcome prediction and backtracking, which models can approximate (revise paths, restart) or be augmented with",
      "Planning doesn't matter for agents",
      "Only RL agents can plan",
    ],
    answer: 1,
    explanation:
      "Critics note plans that 'look reasonable' but fail at execution. Yet models can revise and restart (effective backtracking), may predict action outcomes from world knowledge, and can be augmented with search/state tracking. Open question, not settled verdict.",
  },
  {
    q: "Your agent calls lbs_to_kg(lbs=100) when the user said 120 pounds. Classify the failure.",
    options: [
      "Invalid tool",
      "Valid tool, invalid parameters",
      "Valid tool, incorrect parameter VALUES — the subtlest tool-use failure to catch",
      "Tool failure (the tool computed wrong)",
    ],
    answer: 2,
    explanation:
      "The tool exists and the signature is right; the value is wrong. That's why the chapter insists: always log every function call's parameters and inspect them. Evaluation = counting how often each failure mode occurs.",
  },
  {
    q: "FIFO is the simplest short-term-memory eviction strategy. Its documented danger?",
    options: [
      "It's too slow to compute",
      "Early messages often state the conversation's PURPOSE — dropping the oldest can discard the most important information",
      "It deletes long-term memory",
      "It requires extra API calls",
    ],
    answer: 1,
    explanation:
      "FIFO assumes early = stale, which fails when the goal was stated upfront. Smarter strategies summarize, deduplicate redundancy, or use reflection: insert / merge / replace-outdated decisions per new piece of information.",
  },
];

export const assignments: Assignment[] = [
  {
    title: "Build a minimal RAG over your own notes",
    difficulty: "Starter",
    time: "~2–3 hours",
    brief:
      "Assemble the full retrieve-then-generate loop with the simplest possible parts, then locate its weakest link.",
    steps: [
      "Collect 20–50 of your own documents (notes, blog drafts, READMEs). Chunk by paragraph with small overlap.",
      "Implement BM25 retrieval (e.g. <code>rank_bm25</code>) and embedding retrieval (any embedding API or sentence-transformers + cosine similarity) side by side.",
      "Write 10 test questions with known source chunks. Measure context precision for both retrievers at k=3.",
      "Wire the top-k chunks into a generation prompt and compare answers vs no-retrieval baseline.",
      "Find one question each retriever fails — diagnose why (term ambiguity? meaning buried? bad chunking?).",
    ],
    deliverable:
      "Precision table for both retrievers, two failure diagnoses, and your verdict on which to ship first.",
  },
  {
    title: "Chunking and hybrid-search shootout",
    difficulty: "Intermediate",
    time: "~3 hours",
    brief:
      "Quantify how chunking strategy and hybrid search change retrieval quality on the corpus from the starter assignment.",
    steps: [
      "Index your corpus three ways: small chunks (~128 tokens), large chunks (~512), and recursive splitting — same overlap rules.",
      "Re-run your 10-question evaluation per configuration; record precision and answer quality.",
      "Implement reciprocal rank fusion over BM25 + embeddings (a 15-line function) and re-measure.",
      "Add contextual retrieval to your worst-performing chunks: prepend a one-sentence AI-generated 'this chunk is about…' blurb, re-embed, re-test.",
    ],
    deliverable:
      "A results matrix (3 chunkings × 3 retrievers) and the single change that bought the most quality.",
  },
  {
    title: "Build and stress-test a tool-using agent",
    difficulty: "Advanced",
    time: "~4–6 hours",
    brief:
      "Implement a small function-calling agent, then evaluate it with the chapter's failure-mode taxonomy.",
    steps: [
      "Define 4–5 tools with clear docstrings (calculator, date lookup, a mock product database query, a unit converter). Use any function-calling API.",
      "Implement the loop: plan → validate (reject plans with unknown tools or >6 steps) → execute → reflect (ReAct-style Thought/Act/Observation logging).",
      "Write 20 tasks: 12 solvable, 4 requiring multi-tool chains, 2 with missing tools, 2 out of scope. Run them.",
      "Score with the taxonomy: invalid tool / invalid params / wrong param values / goal failure / reflection error. Also track steps and cost per task.",
      "Remove one tool (ablation) and re-run the solvable set — which tasks break?",
    ],
    deliverable:
      "A failure-mode frequency table, cost/steps stats, and three concrete changes that would most improve your agent.",
  },
];
