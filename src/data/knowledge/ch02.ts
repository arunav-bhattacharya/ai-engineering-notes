import type { Card } from "../../components/Flashcards";
import type { Question } from "../../components/Quiz";
import type { Assignment } from "../../components/Assignments.astro";

export const flashcards: Card[] = [
  {
    front: "Why do most foundation models perform much better in English than in, say, Telugu or Punjabi?",
    back: "Training-data representation. English is roughly 46% of Common Crawl — about 8× the next language — while many widely spoken languages are under-represented by factors of 50–230× relative to their speaker populations. Language structure and culture play a role too.",
  },
  {
    front: "Why can a prompt in Burmese cost ~10× more than the same prompt in English?",
    back: "Tokenization efficiency. Cost and latency scale with token count, and the same meaning can need far more tokens in some languages (median ~7 tokens in English vs ~72 in Burmese on the MASSIVE benchmark).",
  },
  {
    front: "What two problems with seq2seq did the transformer fix?",
    back: "1) The decoder only saw the input's final hidden state (like answering questions about a book from just its summary); attention lets it reference every token. 2) RNNs processed input sequentially; transformers process input tokens in parallel.",
  },
  {
    front: "What do query, key, and value vectors each represent in attention?",
    back: "Query = what the model is looking for at this decoding step (the researcher). Keys = an index of all previous tokens (page numbers). Values = the learned content of those tokens (page contents). Attention scores come from Q·K; the output is the scores-weighted sum of V.",
  },
  {
    front: "What's inside one transformer block?",
    back: "An attention module (four weight matrices: query, key, value, output projection) followed by an MLP module (linear/feedforward layers separated by simple nonlinear activations like ReLU or GELU).",
  },
  {
    front: "What sits before and after the stack of transformer blocks?",
    back: "Before: an embedding module (token embeddings + positional embeddings). After: an output layer ('model head'/unembedding) that converts the final vector into one logit per vocabulary token.",
  },
  {
    front: "What are the two phases of transformer inference?",
    back: "Prefill — all input tokens processed in parallel, building key/value vectors; and decode — output tokens generated strictly one at a time. The split drives most inference-optimization work (Chapter 9).",
  },
  {
    front: "How can a mixture-of-experts model be 'big and cheap' at the same time?",
    back: "Only a subset of expert parameter groups activates per token. Mixtral 8x7B holds 46.7B parameters, but with 2 of 8 experts active per token it computes like a 12.9B model — sparsity decouples capacity from per-token cost.",
  },
  {
    front: "Which three numbers summarize a model's scale, and what does each proxy?",
    back: "Parameters → learning capacity; training tokens → how much it has learned; FLOPs → training cost/compute.",
  },
  {
    front: "What does the Chinchilla scaling law prescribe?",
    back: "For compute-optimal training, use ~20 training tokens per parameter, and scale model size and data size together (double one → double the other).",
  },
  {
    front: "FLOPs vs FLOP/s — what's the difference?",
    back: "FLOPs counts floating-point operations a task needs (a quantity of work). FLOP/s measures how many a machine can do per second (a speed). Utilization is the share of peak FLOP/s you actually achieve — ~50% is okay, 70%+ is great.",
  },
  {
    front: "Name the two visible bottlenecks to continued model scaling.",
    back: "Training data — dataset growth is outpacing new human-generated data (plus rising data restrictions: ~45% of C4 is now restricted), and the web is filling with AI output. And electricity — data centers already use 1–2% of global power.",
  },
  {
    front: "What two problems does post-training fix in a pre-trained model?",
    back: "1) Pre-training optimizes completion, not conversation — the model continues your text instead of answering. 2) Indiscriminate web data means outputs can be wrong, biased, or toxic. SFT fixes the first; preference finetuning targets the second.",
  },
  {
    front: "Why is preference data collected as comparisons rather than scores?",
    back: "Absolute scores are unreliable — different labelers (or the same labeler twice) give different numbers. Picking which of two responses is better is more consistent, yielding (prompt, winner, loser) data the reward model learns to score from.",
  },
  {
    front: "Walk through RLHF in two steps.",
    back: "1) Train a reward model on comparison data to score (prompt, response) pairs — maximizing the score gap between winners and losers. 2) Use RL (typically PPO) to finetune the model to produce responses the reward model scores highly. DPO is a simpler alternative (used for Llama 3).",
  },
  {
    front: "What does temperature actually do, mechanically?",
    back: "Logits are divided by T before softmax. T<1 sharpens the distribution (consistent, predictable picks); T>1 flattens it (rarer tokens surface — more creative, less coherent). 'T=0' means skip sampling and take the argmax.",
  },
  {
    front: "Top-k vs top-p sampling?",
    back: "Top-k keeps a fixed number of highest-logit tokens (saves softmax compute). Top-p (nucleus) keeps the smallest set whose cumulative probability ≥ p, so the candidate pool adapts: tiny for 'yes/no' questions, wide for open-ended ones.",
  },
  {
    front: "What is test-time compute, and how strong is the effect?",
    back: "Spending more inference compute per query — generating multiple candidate outputs (best-of-N, beam search) and picking the best via highest average logprob, a reward model/verifier, or majority vote. OpenAI found verifiers gave a boost roughly equal to a 30× model-size increase.",
  },
  {
    front: "Name the five levers for getting structured outputs, from lightest to heaviest.",
    back: "Prompting → post-processing (fix recurring small mistakes) → test-time compute (resample until valid) → constrained sampling (filter logits by a format grammar) → finetuning (optionally with an architecture change like a classifier head).",
  },
  {
    front: "What are the two leading hypotheses for why models hallucinate?",
    back: "1) Self-delusion: the model can't distinguish tokens it generated from given facts, so one wrong assumption snowballs. 2) Knowledge mismatch: SFT teaches the model to mimic labeler answers that rely on knowledge the model lacks — effectively training it to make things up.",
  },
];

export const quiz: Question[] = [
  {
    q: "A 1.3B-parameter model trained on 7B tokens of high-quality code outperformed much larger models on coding benchmarks. What's the lesson?",
    options: [
      "Small models are generally better than large ones",
      "Data quality can beat data (and model) quantity",
      "Coding benchmarks are unreliable",
      "More training data always helps",
    ],
    answer: 1,
    explanation:
      "The phi-style result cited in the chapter shows curation matters: a small model on excellent data can beat big models trained on indiscriminate web data. 'Use what we have' is the default, not the optimum.",
  },
  {
    q: "Translating every user query to English, answering, and translating back is a common multilingual strategy. Which is a real drawback the chapter raises?",
    options: [
      "Translation makes responses longer in every language",
      "Information loss — e.g. Vietnamese pronouns encode speaker relationships that English 'I/you' erases",
      "Models refuse to translate low-resource languages",
      "It violates most API terms of service",
    ],
    answer: 1,
    explanation:
      "Besides needing a model that understands the source language well enough anyway, translation can destroy meaning that the source language encodes structurally — relationship-bearing pronouns being a vivid example.",
  },
  {
    q: "Why is it hard to extend a transformer's context length?",
    options: [
      "The vocabulary must grow with context length",
      "Every previous token needs key and value vectors computed and stored — the cost grows with sequence length",
      "Positional embeddings cannot be changed after pre-training",
      "Longer contexts require more experts in an MoE",
    ],
    answer: 1,
    explanation:
      "Each previous token contributes a K and V vector that must be kept around for attention. Longer sequences mean more compute and memory — which is also why KV-cache management dominates inference optimization.",
  },
  {
    q: "Llama 2-7B has hidden dimension 4096 and 32 attention heads. What does multi-head attention do with the 4096-dim Q/K/V vectors?",
    options: [
      "Each head gets its own full 4096-dim copy",
      "They're split into 32 vectors of 128 dims, letting heads attend to different token groups simultaneously",
      "Heads take turns processing alternate tokens",
      "31 heads are dropped at inference time",
    ],
    answer: 1,
    explanation:
      "4096 / 32 = 128 dims per head. Each head attends to different patterns in parallel; outputs are concatenated and passed through the output projection matrix.",
  },
  {
    q: "GPT-3 took ~3.14×10²³ FLOPs to train. With 256 H100s (5.2×10¹⁸ FLOPs/day each) at PERFECT utilization that's ~236 days. What does 70% utilization do to the real cost?",
    options: [
      "Nothing — utilization only affects latency",
      "Raises it ~1.4×: you pay for the machines whether or not they hit peak — over $4M at $2/GPU-hour",
      "Halves it, because utilization measures idle time you don't pay for",
      "Makes training impossible",
    ],
    answer: 1,
    explanation:
      "Utilization is achieved-vs-peak compute. At 70% (already considered great), wall-clock time and cost scale by 1/0.7 — the chapter's arithmetic lands at ~$4.1M. 50% utilization is 'okay'; above 70% is excellent.",
  },
  {
    q: "Per Chinchilla, a 3B-parameter model is compute-optimal with roughly how many training tokens?",
    options: ["3 billion", "20 billion", "60 billion", "1 trillion"],
    answer: 2,
    explanation:
      "The rule of thumb is ~20 tokens per parameter: 3B × 20 = 60B tokens. Notably, Llama models deliberately 'overtrain' smaller models past this optimum because smaller models are cheaper for everyone to deploy.",
  },
  {
    q: "Why did labelers for InstructGPT need college degrees when ImageNet labeling needed no special training?",
    options: [
      "OpenAI's HR policy required it",
      "Writing demonstration responses takes critical thinking, research, and judgment — one (prompt, response) pair can take 30 minutes and ~$10",
      "The work involved reading source code",
      "Regulations require credentialed annotators",
    ],
    answer: 1,
    explanation:
      "Demonstration data is authored, not just tagged: ~90% of InstructGPT's labelers had degrees, a third had master's degrees. That's why the 13,000 pairs cost on the order of $130k before design and QC costs.",
  },
  {
    q: "OpenAI sampled up to 400 outputs per query with a verifier and found performance eventually DECLINED. Their hypothesis?",
    options: [
      "The model ran out of distinct answers",
      "More samples increase the chance of an adversarial output that fools the verifier",
      "GPU memory fragmentation",
      "The verifier got slower with more candidates",
    ],
    answer: 1,
    explanation:
      "Best-of-N is a search against the verifier — search hard enough and you find its blind spots. (A Stanford study found log-linear gains up to 10,000 samples on other tasks, so the ceiling is task-dependent. Either way, nobody serves 400 samples in production.)",
  },
  {
    q: "Your JSON outputs are valid 90% of the time, with failures being tiny recurring mistakes like a missing closing bracket. Per the chapter, what's the cheapest effective fix?",
    options: [
      "Finetune the model on JSON examples",
      "Constrained sampling with a JSON grammar",
      "A post-processing script that fixes the known recurring mistakes",
      "Switch model providers",
    ],
    answer: 2,
    explanation:
      "Models repeat similar mistakes across queries — so a small repair script goes far. LinkedIn's defensive YAML parser took correct outputs from 90% to 99.99%. Constrained sampling and finetuning are the heavier 'intensive treatment' options.",
  },
  {
    q: "You set temperature=0 and a fixed seed, yet outputs still occasionally differ between runs. What does the chapter say?",
    options: [
      "That's impossible — something is misconfigured",
      "Even with fixed sampling variables, hardware differences in executing instructions can change outputs, especially across machines you don't control",
      "Temperature 0 increases randomness",
      "Seeds only work for image models",
    ],
    answer: 1,
    explanation:
      "Fixing temperature/top-k/top-p/seed is good practice but not a guarantee: different machines execute the same instructions differently and handle different numeric ranges. With a hosted API, the hardware isn't yours to pin.",
  },
  {
    q: "The InstructGPT paper's own data showed RLHF made one thing WORSE even as labelers preferred the RLHF model overall. Which?",
    options: ["Verbosity", "Hallucination", "Refusals", "Latency"],
    answer: 1,
    explanation:
      "A nuance worth remembering: RLHF improved overall preference while increasing hallucination versus SFT-only — even insiders' intuitions ('RLHF reduces hallucination') conflict with published measurements.",
  },
];

export const assignments: Assignment[] = [
  {
    title: "Play the sampling dials like an instrument",
    difficulty: "Starter",
    time: "~1 hour",
    brief:
      "Make temperature, top-p, and logprobs tangible by sweeping them on a real model and watching the distribution shift.",
    steps: [
      "Pick any API or local model that exposes temperature and top-p (and ideally logprobs).",
      "Use one creative prompt ('name my coffee shop') and one factual prompt ('capital of Australia'). Run each 5× at temperature 0, 0.7, and 1.5.",
      "Record: how often outputs repeat, where incoherence creeps in, and whether the factual answer ever changes.",
      "If your API returns logprobs, inspect the top-10 candidates for the first token at each temperature and watch the distribution flatten.",
      "Bonus: implement softmax-with-temperature in 10 lines of Python over a toy logit vector [1, 2, 4] and reproduce the chapter's math.",
    ],
    deliverable:
      "A short table of your runs plus a two-sentence rule of thumb for when YOU would use each temperature.",
  },
  {
    title: "Best-of-N with a homemade verifier",
    difficulty: "Intermediate",
    time: "~2 hours",
    brief:
      "Reproduce the test-time-compute effect: sample multiple outputs and select the best automatically.",
    steps: [
      "Choose a task with checkable answers — grade-school math word problems work well (e.g. 20 GSM8K-style questions).",
      "Baseline: one sample per question at temperature 0. Record accuracy.",
      "Test-time compute: 5–10 samples per question at temperature 0.7–1.0, then pick the final answer by majority vote (self-consistency).",
      "Compare accuracies and cost (total tokens). Then try N=3 vs N=10 — where do gains flatten for your task?",
    ],
    deliverable:
      "Accuracy-vs-N chart and a one-paragraph verdict: when is the extra cost worth it?",
  },
  {
    title: "Break a model's structured output, then fix it in layers",
    difficulty: "Advanced",
    time: "~3 hours",
    brief:
      "Work through the chapter's escalation ladder for structured outputs on a deliberately tricky schema.",
    steps: [
      "Define a JSON schema with nesting, enums, and a field whose value legitimately contains braces/quotes (to stress parsers).",
      "Layer 1 — prompting: instruct the model to emit this JSON from messy input text. Measure valid-parse rate over 30 runs.",
      "Layer 2 — post-processing: catalog the recurring failure modes and write a repair script. Re-measure.",
      "Layer 3 — constrained generation: use a library like <code>outlines</code>, <code>guidance</code>, or your provider's strict/JSON-schema mode. Re-measure.",
      "Compare validity, latency, and effort across layers.",
    ],
    deliverable:
      "A table of valid-parse rates per layer and your recommendation for which layer a production team should reach for first.",
  },
];
