import type { Card } from "../../components/Flashcards";
import type { Question } from "../../components/Quiz";
import type { Assignment } from "../../components/Assignments.astro";

export const flashcards: Card[] = [
  {
    front: "What's the simplest AI application architecture, and the five additions made as needs arise?",
    back: "Query → model API → response. Then: 1) context construction (retrieval, tools), 2) input/output guardrails, 3) router + gateway, 4) caches, 5) agent patterns (loops, write actions) — with observability woven through and orchestration tying it together.",
  },
  {
    front: "What two risks do input guardrails target?",
    back: "Leaking private information to external APIs (employees pasting secrets, system prompts containing internal data, tools retrieving private records) and executing harmful prompts (Chapter 5's attacks). PII can be masked with placeholders and unmasked on return via a reverse map.",
  },
  {
    front: "What are output guardrails' two functions, and the common failure categories?",
    back: "Catch failures and define handling policies. Quality failures: empty, malformatted, hallucinated, plain bad. Security failures: toxic content, leaked PII, triggered tool/code execution, brand-damaging statements. Track false refusal rate too — overblocking ruins products.",
  },
  {
    front: "Why does retry logic work for AI failures, and what's the latency trick?",
    back: "Models are probabilistic — the same query can succeed on a second try (empty or malformed responses especially). Sequential retries double user latency, so send parallel calls and pick the better response — redundancy traded for speed.",
  },
  {
    front: "Why do guardrails clash with streaming?",
    back: "Streaming shows tokens as generated, but partial responses are hard to evaluate — unsafe content can reach users before guardrails finish judging. Teams weigh reliability vs latency; some accept the risk and retract bad responses retroactively.",
  },
  {
    front: "What does a router do in an AI application?",
    back: "Usually an intent classifier: send queries to specialized models, cheaper models for simple queries, humans for delicate ones, FAQ pages, or polite refusal for out-of-scope asks — plus next-action prediction and clarification requests for ambiguous queries. Routers must be small, fast, cheap.",
  },
  {
    front: "What is a model gateway, and what does it buy you?",
    back: "A unified interface layer over all models (API and self-hosted): one place to update when APIs change, centralized access control and cost monitoring (no shared org tokens), fallback policies for rate limits and outages, plus logging, load balancing, sometimes caching and guardrails.",
  },
  {
    front: "Exact caching vs semantic caching?",
    back: "Exact: reuse results only for identical requests (also caches vector-search results); implemented in-memory or Redis/PostgreSQL with eviction policies (LRU/LFU/FIFO). Semantic: reuse for SIMILAR queries via embedding similarity — higher hit rate, but dependent on embeddings, thresholds, and vector search all working; wrong matches return wrong answers.",
  },
  {
    front: "What's the cache data-leak trap?",
    back: "A query that looks generic ('what's the return policy?') may have a user-specific answer (depends on membership). Cache it and the next user gets the first user's information. Decide cacheability carefully — some teams train a classifier for it.",
  },
  {
    front: "Monitoring vs observability?",
    back: "Monitoring tracks external outputs to know WHEN something's wrong; observability instruments the system so internal failures can be diagnosed from outputs WITHOUT shipping new code. Health metrics: MTTD, MTTR, and change failure rate (CFR) — unknown CFR means redesign.",
  },
  {
    front: "How should you design monitoring metrics?",
    back: "Start from the failures you fear, not from available metrics: hallucination → context-inferability scores; cost → tokens per request, cache hit rate. Slice by user, version, prompt type, time. Correlate metrics with each other and your business north star.",
  },
  {
    front: "Metrics vs logs vs traces?",
    back: "Metrics: aggregated numbers — fast detection. Logs: append-only event records — figure out what happened (log everything: configs, prompts, outputs, tool calls). Traces: a request's full path stitched together — pinpoint the failing step with its time and cost.",
  },
  {
    front: "Name three things that drift silently in production AI systems.",
    back: "The system prompt (someone edits a shared template), user behavior (people adapt — e.g. learning to prompt for concision, gradually shifting your metrics), and the underlying model behind an unchanged API (providers update without announcing; measured benchmark swings between versions).",
  },
  {
    front: "When should you adopt an AI orchestrator, and what should you evaluate?",
    back: "Not at the start — build without one first; abstractions hide critical details and complicate debugging. When adopting: integration/extensibility (your components supported?), complex-pipeline support (branching, parallelism, error handling), and ease/performance (no hidden API calls or added latency).",
  },
  {
    front: "Why is user feedback extra valuable in AI products?",
    back: "Beyond evaluation and product guidance, it's proprietary training data — the data flywheel. It powers evaluation metrics, future model training, and personalization. It's also user data: privacy and transparency obligations apply.",
  },
  {
    front: "Give four natural-language feedback signals worth tracking.",
    back: "Early termination (stopping generation, abandoning), error corrections ('No…', 'I meant…', rephrasings, direct edits — each edit is a preference pair: original = loser, edited = winner), complaints (the biggest clusters in feedback datasets), and sentiment trajectories (angry → happy = resolved).",
  },
  {
    front: "How is regeneration ambiguous as a feedback signal?",
    back: "It can mean dissatisfaction — or just wanting options (common for creative tasks, and weaker as a signal with subscriptions than usage billing, where regenerating costs money). Some apps disambiguate by asking 'better or worse?' afterward — yielding preference data.",
  },
  {
    front: "When are the best moments to ask for feedback?",
    back: "At onboarding (calibration — keep it optional), when something fails (let users correct and still finish their task — inpainting is the model example), and when the model is uncertain (side-by-side options double as preference data). Positive feedback: useful for finding loved features, but don't make good results feel exceptional.",
  },
  {
    front: "Name the four feedback biases to design around.",
    back: "Leniency (positive is the path of least resistance — 4.8-star averages; use descriptive labels instead of numbers), randomness (unmotivated clicking), position (first option wins — randomize), and preference biases (longer-looks-better, recency).",
  },
  {
    front: "What is a degenerate feedback loop, and its model-behavior cousin?",
    back: "Predictions influence feedback, which trains the next model, amplifying initial quirks (exposure/popularity bias — the cat-photo spiral). Trained on feedback, models also drift toward sycophancy: telling users what they want to hear over what's accurate.",
  },
];

export const quiz: Question[] = [
  {
    q: "An employee's prompt contains a customer's phone number, and you must call an external API. The chapter's mitigation?",
    options: [
      "Block all queries containing digits",
      "Mask the PII with a placeholder, send it, then unmask the response via a reverse PII map",
      "Switch to a self-hosted model for all traffic",
      "Log the number for audit purposes",
    ],
    answer: 1,
    explanation:
      "Masking preserves the workflow while keeping sensitive data inside: [PHONE NUMBER] goes out, and the reverse dictionary restores the real value if the placeholder appears in the response. Blocking entirely is the blunter alternative.",
  },
  {
    q: "Some teams consciously skip output guardrails. What trade-off are they making?",
    options: [
      "Cost vs accuracy",
      "Reliability vs latency — guardrails add response time, and streaming makes full-response checks even harder",
      "Privacy vs personalization",
      "Throughput vs goodput",
    ],
    answer: 1,
    explanation:
      "Evaluating outputs takes time, and in streaming mode unsafe tokens may reach users before checks complete. Teams prioritizing latency sometimes accept the risk — a decision to make consciously, not by default.",
  },
  {
    q: "A user asks your support bot who to vote for. With a router in place, what should ideally happen?",
    options: [
      "The strongest model crafts a diplomatic answer",
      "The intent classifier flags it out-of-scope and returns a stock polite refusal — no API call wasted",
      "The query is cached for future users",
      "The gateway blocks the user",
    ],
    answer: 1,
    explanation:
      "Routers aren't just for model selection: scope enforcement, clarification of ambiguous queries ('Freezing — your account, or the weather?'), and human handoff are all routing decisions, made by small, fast, cheap models.",
  },
  {
    q: "Why route all model traffic through a gateway instead of letting each app call APIs directly?",
    options: [
      "Gateways make models more accurate",
      "One place for API changes, access control without shared org tokens, usage/cost limits, and fallback policies for outages and rate limits",
      "Gateways eliminate the need for guardrails",
      "It's required by most model providers",
    ],
    answer: 1,
    explanation:
      "The gateway is a control point: maintenance (update once, not per app), security (centralized, fine-grained access), economics (monitor and cap usage), and resilience (failover to alternative models). Logging and analytics ride along for free.",
  },
  {
    q: "User X asks 'what's the return policy for electronics?' and the answer (computed from X's membership) gets cached. User Y asks the same. What went wrong?",
    options: [
      "Nothing — caching identical queries is correct",
      "A user-specific response was mistaken for a generic one; Y now sees X's information — a caching data leak",
      "The cache should have used semantic matching",
      "The TTL was too long",
    ],
    answer: 1,
    explanation:
      "Cacheability is about the ANSWER's dependence on user context, not the question's wording. User-specific and time-sensitive queries shouldn't be cached; some teams train classifiers to decide.",
  },
  {
    q: "Semantic caching promises higher hit rates than exact caching. Why does the chapter call its value 'more dubious'?",
    options: [
      "It can't be implemented with current technology",
      "Its components stack failure risks: embedding quality, vector search, and a hand-tuned similarity threshold — a wrong match silently returns a wrong answer",
      "It's illegal in some jurisdictions",
      "It only works for English",
    ],
    answer: 1,
    explanation:
      "Plus the vector search itself costs time and compute. Worth it only with high hit rates — evaluate efficiency, cost, AND the performance risk before adding the complexity.",
  },
  {
    q: "Your response-length metric drifts downward over a quarter. Per the chapter, which non-obvious cause should you investigate?",
    options: [
      "GPU degradation",
      "Users adapting their behavior — e.g. learning to ask for concise answers; behavior drift looks like model drift in aggregate metrics",
      "Cache eviction misconfiguration",
      "Tokenizer updates",
    ],
    answer: 1,
    explanation:
      "Three things drift silently: system prompts (a coworker's edit), user behavior (people adapt to the tool), and unannounced model updates behind stable APIs. Aggregate metrics flag the symptom; investigation finds the cause.",
  },
  {
    q: "Why does the chapter advise starting WITHOUT an orchestration framework?",
    options: [
      "Orchestrators are too expensive",
      "Abstractions hide critical system details, complicating understanding and debugging — add one when complexity justifies it, checking for hidden API calls and added latency",
      "They don't support foundation models",
      "They require Kubernetes",
    ],
    answer: 1,
    explanation:
      "Every external tool adds complexity. Evaluate orchestrators on integration/extensibility, complex-flow support (branching, parallelism — run routing and PII removal concurrently!), and ease/performance.",
  },
  {
    q: "A user edits the code your model generated. Beyond signaling a miss, what does the edit literally provide?",
    options: [
      "A unit test",
      "A preference-data pair: the original response (loser) and the edited version (winner) — ready for preference finetuning",
      "A new system prompt",
      "Nothing actionable",
    ],
    answer: 1,
    explanation:
      "User edits are among the highest-quality implicit signals — exactly the (query, winner, loser) format alignment training needs. Integrated products (IDEs, email clients) can capture them; standalone chatbots mostly can't.",
  },
  {
    q: "Apple's design guidance warns against routinely asking for positive feedback because:",
    options: [
      "Positive feedback has no analytical value",
      "Your app should produce good results by default — soliciting praise frames good results as exceptions",
      "It violates app store policies",
      "Users always decline",
    ],
    answer: 1,
    explanation:
      "Counterpoint from practice: positive signals reveal which features users love enough to cheer for, focusing investment. The compromise: ask sparingly (e.g. 1% of users), accepting some sampling bias.",
  },
  {
    q: "A workshop feedback form put the angry emoji where five stars should be, garbling the ratings. The chapter's lesson?",
    options: [
      "Never use emojis",
      "Ambiguous or confusing feedback UI produces noisy, misleading data — design clarity is data quality",
      "Always use 10-point scales",
      "Feedback forms are obsolete",
    ],
    answer: 1,
    explanation:
      "Feedback design IS data engineering: confusing layouts, impossible questions (choosing between two answers the user can't evaluate), and missing 'I don't know' options all corrupt the signal at the source.",
  },
];

export const assignments: Assignment[] = [
  {
    title: "Architect your application on paper",
    difficulty: "Starter",
    time: "~1.5 hours",
    brief:
      "Apply the five-step architecture progression to an application you've built or want to build.",
    steps: [
      "Draw the simplest version: query → model → response. Then add components in the chapter's order, justifying each: do YOU need retrieval? which guardrails? a router? which caches?",
      "For every component you add, write down: the failure modes it introduces, and one metric to monitor it.",
      "Mark where the three drift risks (system prompt, user behavior, model updates) would show up, and how you'd detect each.",
      "Decide where you'd stop for v1 — and what user signal would trigger adding the next component.",
    ],
    deliverable:
      "An architecture diagram with per-component failure modes, metrics, and your v1 cut line.",
  },
  {
    title: "Instrument a small AI app with logs, traces, and metrics",
    difficulty: "Intermediate",
    time: "~3 hours",
    brief:
      "Add real observability to any LLM app you have (even a script) and use it to find an actual issue.",
    steps: [
      "Log everything per request: timestamp, model, sampling settings, full prompt, response, latency (TTFT if streaming), token counts, and any tool calls — with a request ID.",
      "Build a trace view: for one multi-step request (e.g. retrieve → generate), reconstruct the timeline with per-step duration and cost.",
      "Define 3 failure-driven metrics (e.g. invalid-JSON rate, refusal rate, p90 latency) and compute them over 100 logged requests.",
      "Manually read 20 production (or test) interactions — note one insight that the metrics alone wouldn't have surfaced.",
      "Simulate drift: change the system prompt subtly and confirm your logging catches the change.",
    ],
    deliverable:
      "Your logging schema, one annotated trace, the metrics dashboard (a table is fine), and the manual-inspection insight.",
  },
  {
    title: "Design and critique a feedback system",
    difficulty: "Advanced",
    time: "~3–4 hours",
    brief:
      "Build the feedback design for a conversational app, then red-team it against the chapter's bias catalog.",
    steps: [
      "Pick an app type (support bot, writing assistant, code helper). List every implicit signal available in its interface — content-based and action-based — and classify each as strong/weak/ambiguous.",
      "Design collection moments: onboarding calibration, failure reporting, and a low-confidence comparison flow. Sketch the UI for each (wireframes or text).",
      "Specify how each signal feeds evaluation, development, or personalization — and which become preference pairs.",
      "Red-team: for each of leniency, randomness, position, and preference bias, explain how it would corrupt YOUR signals and one design mitigation.",
      "Describe the degenerate feedback loop most likely in your app and an early-warning metric for it.",
    ],
    deliverable:
      "A feedback design doc: signal inventory, collection flows, usage mapping, bias mitigations, and the loop watch-metric.",
  },
];
