import type { Card } from "../../components/Flashcards";
import type { Question } from "../../components/Quiz";
import type { Assignment } from "../../components/Assignments.astro";

export const flashcards: Card[] = [
  {
    front: "What is evaluation-driven development?",
    back: "Defining your evaluation criteria BEFORE building the application — the AI analog of test-driven development. The most successful enterprise AI applications (recommenders, fraud detection, coding) are exactly the ones with clear, measurable success criteria.",
  },
  {
    front: "Name the four buckets of evaluation criteria for an AI application.",
    back: "Domain-specific capability (does it understand the domain?), generation capability (coherent? factually consistent? safe?), instruction-following capability (does it obey your format/constraints?), and cost & latency.",
  },
  {
    front: "Why are multiple-choice questions both the most popular benchmark format and a questionable one?",
    back: "Popular: easy to create, verify, and baseline (4 options → 25% random). Questionable: MCQs test the ability to PICK a good answer (classification), not GENERATE one — fine for knowledge and reasoning, wrong for summarization or writing. Scores also shift with tiny formatting changes.",
  },
  {
    front: "Local vs global factual consistency?",
    back: "Local: the output must be supported by a provided context (summaries, RAG, support bots vs policy). Global: the output is checked against open knowledge — which first requires deciding what the facts are, often the hardest part.",
  },
  {
    front: "How does SelfCheckGPT detect hallucinations?",
    back: "Sample N new responses to the same prompt; if the original response disagrees with most of them, it's likely hallucinated. Works, but multiplies inference cost per evaluated response.",
  },
  {
    front: "Describe SAFE's four steps for verifying long-form factuality.",
    back: "1) Decompose the response into individual statements. 2) Rewrite each to be self-contained (resolve 'it', 'they'). 3) Generate fact-check queries for a search engine. 4) Use AI to judge each statement against the search results.",
  },
  {
    front: "How does textual entailment turn factual consistency into classification?",
    back: "Given (premise = context, hypothesis = output claim), classify: entailment (consistent), contradiction (inconsistent), or neutral (can't tell). Small specialized models (e.g. a 184M DeBERTa) do this fast and cheap.",
  },
  {
    front: "What two query types are hallucination hot spots worth oversampling in your eval set?",
    back: "Niche-knowledge queries (rarely referenced topics) and queries about things that don't exist ('What did X say about Y?' when X never said anything about Y).",
  },
  {
    front: "What's the difference between a model failing instruction-following vs domain capability?",
    back: "A model that understands tweet sentiment but outputs HAPPY/ANGRY instead of the requested POSITIVE/NEGATIVE has the domain skill but poor instruction-following. The two are easy to conflate — a failed Vietnamese verse could be either deficit.",
  },
  {
    front: "How do IFEval and INFOBench differ in measuring instruction-following?",
    back: "IFEval uses 25 automatically verifiable instruction types (keywords, length, bullet counts, JSON) — a program checks compliance. INFOBench adds content/style/linguistic constraints, verified by yes/no criteria questions answered by AI or human evaluators.",
  },
  {
    front: "What should you check when evaluating a roleplaying model?",
    back: "Both style (does it sound like the character?) and knowledge (does it use — and stay within — the character's knowledge?). Negative knowledge matters: an NPC shouldn't reveal things the character can't know, like game spoilers.",
  },
  {
    front: "Open weight vs open model?",
    back: "Open weight: weights are downloadable but training data isn't public (the vast majority). Open model: weights AND training data are public, enabling auditing and retraining. License terms — commercial use, user caps, training-on-outputs — vary per model.",
  },
  {
    front: "Name the seven axes of the API-vs-self-host decision.",
    back: "Data privacy, data lineage/copyright, performance, functionality (function calling, structured outputs, logprobs, finetuning access), cost (API fees vs engineering), control/access/transparency, and on-device deployment.",
  },
  {
    front: "Why do many APIs not expose logprobs, and why does it matter?",
    back: "Exposed logprobs make a model easier to replicate/distill, so providers restrict them. It matters because logprobs power classification confidence, perplexity-based evaluation, and interpretability — a real functionality loss when buying instead of hosting.",
  },
  {
    front: "What is data contamination and why does it poison benchmark scores?",
    back: "The model trained on the data it's evaluated on, so it can score high by memorization. A satirical paper trained a 1M-parameter model exclusively on benchmark data and beat much larger models — perfect scores, zero usefulness.",
  },
  {
    front: "Two heuristics for detecting benchmark contamination?",
    back: "N-gram overlap (a 13-token sequence from the eval set found in training data → dirty sample; accurate but needs training-data access) and perplexity (unusually low perplexity on eval data → probably seen in training; cheaper, less precise).",
  },
  {
    front: "Why check correlation between benchmarks on your leaderboard?",
    back: "Perfectly correlated benchmarks are redundant and exaggerate biases. On Hugging Face's 2024 analysis, WinoGrande/MMLU/ARC-C correlated ~0.9 (all reasoning), while TruthfulQA was only moderately correlated — better reasoning doesn't imply more truthfulness.",
  },
  {
    front: "What's the rough sample-size rule for comparing two systems?",
    back: "Per OpenAI's estimate: detecting a 30% score difference needs ~10 examples; 10% → ~100; 3% → ~1,000; 1% → ~10,000. Every 3× smaller difference costs 10× more samples. Bootstrap your eval set to check whether results are stable.",
  },
  {
    front: "Turn-based vs task-based evaluation?",
    back: "Turn-based scores each individual response; task-based scores whether the user's job got done — and in how many turns (2 vs 20 matters). Task-based is what users care about, but task boundaries are hard to draw in real conversations.",
  },
  {
    front: "What is Simpson's paradox, and why does it matter for eval?",
    back: "Model A can beat model B on every data slice yet lose on the aggregate (or vice versa) because slice sizes differ. It's a key reason to slice evaluation data instead of trusting one overall number.",
  },
];

export const quiz: Question[] = [
  {
    q: "Per the chapter, which is worse: an application never deployed, or one deployed that nobody can evaluate?",
    options: [
      "Never deployed — sunk cost with zero return",
      "Deployed but unevaluatable — it costs to maintain, may cost more to remove, and you can't tell if it helps or hurts",
      "They're equally bad",
      "Neither is bad if users seem happy",
    ],
    answer: 1,
    explanation:
      "The chapter's conference-audience consensus: deployed-but-unmeasurable is worse. The used-car-valuation model running for a year with unknown accuracy is the cautionary tale — hence evaluation-driven development.",
  },
  {
    q: "A text-to-SQL model produces correct queries. Per the chapter, what ELSE should your evaluation cover?",
    options: [
      "Nothing — execution accuracy is sufficient",
      "Query efficiency (runtime/memory vs ground truth, as BIRD-SQL does) and readability (likely via AI judge)",
      "The SQL dialect's popularity",
      "Whether the model can also write Python",
    ],
    answer: 1,
    explanation:
      "Functional correctness is necessary, not sufficient — a correct query that's too slow or unmaintainable may be unusable. Efficiency is exactly measurable; readability needs subjective evaluation.",
  },
  {
    q: "Researchers found models judge evidence credibility mainly by ___, while humans also weigh ___.",
    options: [
      "source age; recency",
      "relevance to the query; scientific references and neutral tone",
      "website popularity; paywalls",
      "length; brevity",
    ],
    answer: 1,
    explanation:
      "Wan et al. (2024): models lean heavily on query-relevance and largely ignore stylistic credibility signals humans use — worth remembering when an AI fact-checker confidently cites a junk source.",
  },
  {
    q: "On TruthfulQA, what made the questions hard by design?",
    options: [
      "They require graduate-level math",
      "They're questions some humans answer wrongly due to popular misconceptions — testing whether models mimic human falsehoods",
      "They're in low-resource languages",
      "They require real-time information",
    ],
    answer: 1,
    explanation:
      "817 questions across 38 categories built around false beliefs (cracking knuckles → arthritis, etc.). The human-expert baseline is 94%; models historically scored far lower — knowledge absorbed from the internet includes the internet's errors.",
  },
  {
    q: "Your latency requirement is non-negotiable. What does the chapter's Pareto-optimization advice say to do?",
    options: [
      "Average latency with quality scores into one number",
      "Filter out every model that misses the latency bar FIRST, then pick the best quality among survivors",
      "Pick the highest-quality model and optimize latency later",
      "Always choose the fastest model",
    ],
    answer: 1,
    explanation:
      "With multiple objectives, be explicit about what you can't compromise on: hard-filter on that, then optimize the rest. Also separate must-have from nice-to-have — users always SAY they want lower latency.",
  },
  {
    q: "Why is it 'not a coincidence' that many popular models have ~7B or ~65-70B parameters?",
    options: [
      "Those sizes are optimal per Chinchilla",
      "They max out common GPU memory configurations (16/24/48/80 GB) for self-hosting",
      "Regulators cap model sizes",
      "Benchmarks only accept those sizes",
    ],
    answer: 1,
    explanation:
      "Self-hosters pick the largest model that fits their hardware, so model developers size for standard GPU memory tiers. Economics shapes architecture.",
  },
  {
    q: "Llama's license historically prohibited one thing that matters for the model ecosystem. Which?",
    options: [
      "Running on AWS",
      "Using Llama outputs to train/improve other models (distillation)",
      "Finetuning of any kind",
      "Commercial use by anyone",
    ],
    answer: 1,
    explanation:
      "Beyond the 700M-MAU clause, Llama licenses disallowed training other models on Llama outputs. Data lineage compounds the issue: a model trained on ChatGPT outputs can be tainted even if its own license is permissive.",
  },
  {
    q: "Convai's 3D characters kept replying 'As an AI model, I don't have physical abilities.' What does this illustrate?",
    options: [
      "Open source models are always better",
      "Provider safety guardrails — sensible for most uses — can be a hard blocker for legitimate use cases, pushing teams to finetune open models",
      "3D applications can't use LLMs",
      "The prompt was too short",
    ],
    answer: 1,
    explanation:
      "Proprietary models err toward over-censoring, and you can't remove their guardrails. Control and customizability are the top two reasons enterprises cite for choosing open source (a16z 2024).",
  },
  {
    q: "Hugging Face averages six benchmark scores to rank models. What's the chapter's critique of averaging?",
    options: [
      "Averages are mathematically invalid",
      "It weights all benchmarks equally even though difficulty and relevance differ — 80% on TruthfulQA ≠ 80% on GSM-8K (HELM uses mean win rate instead)",
      "It favors smaller models",
      "Averaging requires logprobs",
    ],
    answer: 1,
    explanation:
      "Aggregation embeds value judgments. Averaging treats every point as equal across benchmarks of wildly different difficulty and importance to YOUR use case — one reason to build a custom leaderboard with your own weights.",
  },
  {
    q: "GPT-3's report found 13 benchmarks with ≥40% of their data in its training set. What's the recommended disclosure practice?",
    options: [
      "Withdraw from those benchmarks entirely",
      "Report the contamination percentage plus performance on both the full benchmark and the clean subset",
      "Only report the contaminated score — it reflects real usage",
      "Retrain from scratch",
    ],
    answer: 1,
    explanation:
      "Contamination is often unintentional (web scraping) and sometimes even justified (benchmark data is high-quality training data) — but trustworthy reporting separates clean from dirty performance. Many skip it because detection takes effort.",
  },
  {
    q: "LinkedIn's Job Assessment example: 'You are a terrible fit' was rejected as a bad response. Why is this the chapter's favorite guideline lesson?",
    options: [
      "The response was factually wrong",
      "Correct ≠ good — a good response explains the gap and how to close it; your guideline must define 'good', not just 'correct'",
      "Negative responses are always disallowed",
      "It was too short for the rubric",
    ],
    answer: 1,
    explanation:
      "The hardest part of evaluation isn't scoring outputs against a definition of good — it's writing that definition. That's why guideline creation is the most important step in the pipeline.",
  },
];

export const assignments: Assignment[] = [
  {
    title: "Write the evaluation criteria table before the app",
    difficulty: "Starter",
    time: "~1 hour",
    brief:
      "Practice evaluation-driven development by producing the chapter's criteria table for an application you'd like to build.",
    steps: [
      "Pick a concrete application (support bot, SQL assistant, study-note generator…).",
      "Fill a table with columns: criterion, metric, benchmark/data source, hard requirement, ideal target — covering all four buckets (domain, generation, instruction-following, cost/latency).",
      "Mark each criterion as a hard or soft attribute for your situation, and justify one of each.",
      "Sketch the metric→business mapping: what does e.g. 80% vs 95% factual consistency let the business automate?",
    ],
    deliverable:
      "A one-page criteria table plus the usefulness threshold below which you would not ship.",
  },
  {
    title: "Audit a public leaderboard",
    difficulty: "Intermediate",
    time: "~2 hours",
    brief:
      "Build healthy skepticism by dissecting how a real leaderboard selects and aggregates benchmarks.",
    steps: [
      "Pick a current public leaderboard (e.g. an LLM leaderboard on Hugging Face, HELM, or a domain-specific one).",
      "For each benchmark included: what does it measure, when was it published, how likely is contamination, and is it close to saturation?",
      "Find the aggregation method (average? win rate? weighted?). What value judgments does it embed?",
      "Identify two capabilities relevant to an application you care about that the leaderboard does NOT cover.",
      "Write down which 2–3 models you'd shortlist from it for your use case — and what your own pipeline would still need to test.",
    ],
    deliverable:
      "A one-page audit memo: what this leaderboard can and cannot tell you.",
  },
  {
    title: "Build a mini evaluation pipeline end to end",
    difficulty: "Advanced",
    time: "~4–6 hours",
    brief:
      "Implement the chapter's three-step pipeline for one real task and stress-test its reliability.",
    steps: [
      "Choose a task with a two-component flow (e.g. retrieve-then-answer, or extract-then-summarize) so you can evaluate components separately.",
      "Write the guideline: 2–3 criteria, a scoring rubric per criterion with worked examples, and an out-of-scope policy. Validate the rubric on a friend — revise until they apply it consistently.",
      "Assemble ~50 evaluation examples including at least two slices (e.g. short vs long inputs, plus an out-of-scope set). Annotate them.",
      "Wire up methods: one cheap automatic metric on everything + one AI judge on a sample. Run two models (or two prompts) through the pipeline.",
      "Reliability check: bootstrap your 50 examples 10× — how stable is the winner? Re-run the AI judge twice — how consistent is it?",
    ],
    deliverable:
      "A repo (or notebook) with the guideline, data, scores per slice, the bootstrap stability analysis, and your verdict on which system wins.",
  },
];
