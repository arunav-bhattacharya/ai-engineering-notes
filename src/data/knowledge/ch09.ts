import type { Card } from "../../components/Flashcards";
import type { Question } from "../../components/Quiz";
import type { Assignment } from "../../components/Assignments.astro";

export const flashcards: Card[] = [
  {
    front: "Compute-bound vs memory bandwidth-bound — and which is which for LLM inference?",
    back: "Compute-bound: limited by arithmetic capacity (image generation, LLM prefill — input tokens in parallel). Bandwidth-bound: limited by data-movement speed (LLM decode — weights stream into compute units for every token). Classified via arithmetic intensity on a roofline chart.",
  },
  {
    front: "What are TTFT and TPOT, and how do they compose into total latency?",
    back: "TTFT = time to first token (the prefill phase, grows with input length). TPOT = time per output token (decode). Total latency = TTFT + TPOT × output tokens. ~120ms/token TPOT matches fast reading speed — usually enough for streaming.",
  },
  {
    front: "Why report latency in percentiles instead of averages?",
    back: "Latency is a distribution: one 3,000ms outlier among ten ~100ms requests yields a 390ms average that misrepresents the service. p50/p90/p99 describe what fractions of users actually experience — and surface outliers worth investigating.",
  },
  {
    front: "Why can user-perceived TTFT differ from the model's TTFT?",
    back: "Hidden intermediate steps: a CoT or agentic query generates plans and tool calls users never see — the model's 'first token' happens long before the user's. Some teams track 'time to publish' for the user-visible moment.",
  },
  {
    front: "What is goodput?",
    back: "Requests per second that SATISFY your latency SLO (e.g., TTFT ≤ 200ms, TPOT ≤ 100ms). A service completing 100 req/min with only 30 inside SLO has goodput 30 — optimizing raw throughput alone can ruin user experience.",
  },
  {
    front: "Why is nvidia-smi's 'GPU utilization' almost useless, and what replaces it?",
    back: "It measures % of time the GPU is busy — a chip doing 1 of its 100 possible ops/s reports 100%. Use MFU (achieved vs peak-FLOP/s throughput) and MBU (achieved vs peak bandwidth) instead.",
  },
  {
    front: "How do you compute MBU for an LLM?",
    back: "(param count × bytes/param × tokens/s) ÷ theoretical bandwidth. A 7B FP16 model at 100 tokens/s uses 700 GB/s; on 2 TB/s hardware that's 35% MBU — and it shows why quantization frees bandwidth directly.",
  },
  {
    front: "Online vs batch inference APIs?",
    back: "Online optimizes latency (process on arrival); batch optimizes cost (hours-scale turnaround, ~50% discounts) for jobs like synthetic data generation, periodic reports, reindexing, migrations. Note: foundation-model 'batch' differs from classic ML batch inference, which PREcomputes predictions.",
  },
  {
    front: "Why do GPUs beat CPUs for ML workloads?",
    back: "CPUs: few powerful cores for sequential, general-purpose work. GPUs: thousands of small cores for parallelizable work — and matrix multiplication, ~90%+ of neural-net FLOPs, is exactly that.",
  },
  {
    front: "Name the three accelerator characteristics that matter across use cases.",
    back: "Computational capability (peak FLOP/s — which halves-ish as precision doubles), memory size and bandwidth (the DRAM→HBM→SRAM hierarchy), and power consumption (an H100 at peak for a year ≈ 70% of a US household's annual electricity).",
  },
  {
    front: "What's the GPU memory hierarchy, and why does it matter?",
    back: "CPU DRAM (big, ~25–50 GB/s) → GPU HBM (24–80 GB, 256 GB/s–1.5+ TB/s — weights and KV cache) → on-chip SRAM (≤~40 MB, 10+ TB/s). Much of GPU optimization is keeping work in the fast small tiers — what kernels like FlashAttention exploit.",
  },
  {
    front: "How does speculative decoding work, and why is it nearly free?",
    back: "A small draft model proposes K tokens; the target model verifies them all in parallel, accepts the agreeing prefix, adds one real token, repeats. Verification parallelizes like prefill, decode leaves idle FLOPs to use, and easy tokens accept at high rates — published results halved latency with no quality change.",
  },
  {
    front: "What is inference with reference?",
    back: "Speculative decoding without the draft model: copy candidate tokens from the INPUT (quoted document spans, code being fixed). Only helps when outputs overlap context heavily — retrieval, coding, multi-turn — where it's reached ~2× speedups.",
  },
  {
    front: "What is the KV cache, and how big can it get?",
    back: "Stored key/value vectors of all previous tokens so each decode step computes only the newest token's. Size = 2 × batch × seq-len × layers × model-dim × bytes — ~54 GB for a 13B model at batch 32/2K context; ~3 TB for a 500B model at batch 512 (3× its weights). Inference-only — training knows all tokens upfront.",
  },
  {
    front: "Three families of attention optimization?",
    back: "Redesign the mechanism (local windowed, multi-query, grouped-query, cross-layer attention — train-time changes; 20× KV reduction reported in production chat), manage the cache (PagedAttention's non-contiguous blocks, KV quantization/compression), and write kernels (FlashAttention's fused ops).",
  },
  {
    front: "What are the four classic kernel-optimization techniques?",
    back: "Vectorization (process contiguous elements together), parallelization (independent chunks across cores), loop tiling (order data access for the cache — hardware-specific), and operator fusion (combine ops into one pass to skip redundant memory trips).",
  },
  {
    front: "Static vs dynamic vs continuous batching?",
    back: "Static: wait until the batch is full (first request waits for last). Dynamic: full OR time window — bounded latency, sometimes half-empty batches. Continuous (in-flight): return each finished response immediately and slot a new request in — short responses stop waiting for long ones.",
  },
  {
    front: "Why decouple prefill and decode onto separate machines?",
    back: "They have opposite bottlenecks (compute vs bandwidth); colocated, an arriving prefill job steals compute from in-flight decodes, hurting TPOT. Disaggregation improves volume within latency targets; tune the instance ratio for TTFT vs TPOT priorities.",
  },
  {
    front: "What does prompt caching save, and what does it cost?",
    back: "Shared prompt segments (system prompts, long docs, conversation history) are processed once: a 1K-token system prompt at 1M calls/day ≈ a billion repeated tokens avoided; providers cite up to 90% cost and 75% latency cuts. Costs: cache storage memory and engineering (or provider fees).",
  },
  {
    front: "Replica vs tensor vs pipeline parallelism?",
    back: "Replica: more model copies — simple, more traffic. Tensor (intra-operator): split matrices across devices — fits oversized models AND reduces latency (communication overhead aside). Pipeline: stage layers across machines — throughput up, per-request latency up, so serving avoids it; training loves it.",
  },
];

export const quiz: Question[] = [
  {
    q: "Why is LLM decode memory bandwidth-bound rather than compute-bound?",
    options: [
      "Decoding requires no arithmetic",
      "Each generated token requires streaming the model's weights from HBM into compute units, while producing just one token's worth of FLOPs",
      "GPUs lack enough cores for decoding",
      "The KV cache performs the computation",
    ],
    answer: 1,
    explanation:
      "One token per step = tiny compute, huge data movement. That's also why quantization helps decode so much (fewer bytes per parameter = less bandwidth) and why idle decode FLOPs make speculative-decoding verification nearly free.",
  },
  {
    q: "Your TTFT distribution: nine requests near 100ms, one at 3,000ms. The chapter's guidance?",
    options: [
      "Report the 390ms average — it's accurate",
      "Use percentiles (p50/p90/p99), investigate the outlier, and plot TTFT against input length",
      "Discard the outlier and report 100ms",
      "Switch providers",
    ],
    answer: 1,
    explanation:
      "Averages hide what users experience; percentiles characterize it. Outliers are diagnostic signals — a network blip or an unusually long prompt — not noise to delete silently.",
  },
  {
    q: "An inference service completes 100 requests/minute; 30 meet the SLO. A rival completes 60 with 50 meeting it. Which has better goodput?",
    options: [
      "The first — 100 beats 60",
      "The second — goodput 50 vs 30; raw throughput flattered the worse service",
      "They're equal",
      "Cannot be determined",
    ],
    answer: 1,
    explanation:
      "Goodput counts only SLO-satisfying requests. Batching aggressively can multiply throughput while pushing most requests out of SLO — exactly the trap goodput exists to catch.",
  },
  {
    q: "A 7B FP16 model generates 100 tokens/s on hardware with 2 TB/s peak bandwidth. Its MBU is roughly:",
    options: ["7%", "20%", "35%", "70%"],
    answer: 3,
    explanation:
      "Each decoded token streams the full weights: 7B params × 2 bytes = 14 GB per token. At 100 tokens/s that's 1.4 TB/s of bandwidth used; 1.4 ÷ 2 TB/s = 70% MBU. The formula also shows why quantization helps decode: halve the bytes per parameter and you halve the bandwidth each token needs.",
  },
  {
    q: "Speculative decoding 'turns the computation profile of decoding into that of prefilling'. What does this mean?",
    options: [
      "It eliminates the decode step",
      "Verifying K draft tokens happens in parallel (like prefill), replacing K sequential generations — using FLOPs that bandwidth-bound decode left idle",
      "It caches the prefill",
      "It requires retraining the model",
    ],
    answer: 1,
    explanation:
      "Generation is sequential; verification is parallel. A draft model ~8× faster than the target halved overall latency in DeepMind's setup with zero quality change — implementable in ~50 lines and standard in major serving frameworks.",
  },
  {
    q: "Which workload benefits most from inference with reference?",
    options: [
      "Open-ended creative writing",
      "Bug-fixing code, document Q&A with quoting, multi-turn chat — anywhere outputs copy heavily from the context",
      "Image generation",
      "Classification",
    ],
    answer: 1,
    explanation:
      "Draft tokens come from the input instead of a draft model, so it only pays off when output overlaps context substantially — ~2× speedups in such scenarios, no extra model needed.",
  },
  {
    q: "A production chat service reduced its KV cache 20× via multi-query attention, local/global interleaving, and cross-layer attention. When can such changes be applied?",
    options: [
      "At serving time, transparently",
      "Only during training or finetuning — they alter the model architecture itself",
      "By editing the inference server config",
      "Through prompt engineering",
    ],
    answer: 1,
    explanation:
      "Attention redesigns change the model, unlike serving-level tricks. That's the recurring split: model-level optimization can change behavior and needs training; service-level keeps the model intact.",
  },
  {
    q: "vLLM's signature innovation, PagedAttention, optimizes what?",
    options: [
      "The attention mathematics",
      "KV-cache memory management — non-contiguous blocks reduce fragmentation and enable sharing",
      "Disk I/O for model loading",
      "Network routing between GPUs",
    ],
    answer: 1,
    explanation:
      "Borrowing virtual-memory paging ideas for the KV cache made serving dramatically more memory-efficient — a service-level win requiring no model changes.",
  },
  {
    q: "Your requests have wildly variable response lengths and users complain short queries are slow. Which batching strategy targets this directly?",
    options: [
      "Static batching",
      "Dynamic batching",
      "Continuous (in-flight) batching — finished responses return immediately, new requests take their slots",
      "No batching",
    ],
    answer: 2,
    explanation:
      "In naive batching a 10-token response waits for a 1,000-token batchmate. Continuous batching (the Orca approach) releases completions as they finish — the bus drops you at your stop.",
  },
  {
    q: "When would you AVOID pipeline parallelism for serving?",
    options: [
      "When the model fits on one machine",
      "When per-request latency is critical — inter-stage communication adds latency, so replica parallelism is preferred",
      "Both of the above",
      "Never — it's always optimal",
    ],
    answer: 2,
    explanation:
      "Pipeline parallelism boosts throughput but taxes each request with stage-to-stage hops (and is unnecessary if the model fits on one device). Tensor parallelism is the latency-friendly way to split big models.",
  },
  {
    q: "The PyTorch case study stacked optimizations on Llama-7B in this order — compile, INT8, INT4, speculative decoding. What caveat did the chapter attach?",
    options: [
      "The order was wrong",
      "It was unclear how these steps affected output QUALITY — and provider-side optimizations measurably alter model behavior across inference services",
      "It only works on TPUs",
      "Speculative decoding negated the quantization gains",
    ],
    answer: 1,
    explanation:
      "Throughput charts rarely show the quality axis. Benchmarks of identical models across inference providers show real quality variation from optimization choices — evaluate quality alongside speed when picking a provider.",
  },
];

export const assignments: Assignment[] = [
  {
    title: "Profile a local model's latency anatomy",
    difficulty: "Starter",
    time: "~1.5 hours",
    brief:
      "Measure TTFT, TPOT, and their drivers on any locally served model (Ollama, llama.cpp, or vLLM).",
    steps: [
      "Serve a small model locally with streaming enabled.",
      "Script 30 requests across 3 input lengths (50, 500, 2,000 tokens) × fixed output length. Record TTFT and TPOT per request.",
      "Plot TTFT vs input length (expect linear-ish growth — that's prefill) and TPOT vs input length (expect near-flat — that's decode).",
      "Report p50/p90/p99 rather than means. Find one outlier and explain it.",
      "Bonus: quantize the same model (e.g. 8-bit vs 4-bit GGUF) and re-measure TPOT — how much does bandwidth relief buy?",
    ],
    deliverable:
      "Two plots, a percentile table, and one paragraph connecting your numbers to prefill/decode bottlenecks.",
  },
  {
    title: "Compute the full cost model for a hypothetical service",
    difficulty: "Intermediate",
    time: "~2 hours",
    brief:
      "Turn the chapter's formulas into a spreadsheet that prices an inference service end to end.",
    steps: [
      "Pick a model size, precision, and GPU (with its $/hour, peak FLOP/s, bandwidth, HBM size).",
      "Compute: inference memory (×1.2 rule), KV cache size at 3 batch/context combos, theoretical max tokens/s from bandwidth (params × bytes vs bandwidth), and $/1M output tokens at 3 MBU assumptions (30/50/70%).",
      "Add prompt caching: model a 1,500-token system prompt at 100K requests/day — tokens saved and dollars saved at your computed rates.",
      "Decision memo: at what daily volume does self-hosting this beat a commercial API's posted prices?",
    ],
    deliverable:
      "The spreadsheet plus a half-page memo with your break-even estimate and its three shakiest assumptions.",
  },
  {
    title: "Benchmark batching and caching on a real serving stack",
    difficulty: "Advanced",
    time: "~4 hours",
    brief:
      "Use vLLM (or similar) to observe the latency/throughput trade-off and prompt caching's effect firsthand.",
    steps: [
      "Serve a small model with vLLM. Build a load generator sending concurrent requests with mixed output lengths (50–800 tokens).",
      "Sweep concurrency (1, 4, 16, 64): record throughput (tokens/s), p50/p99 TTFT and TPOT at each level. Plot the latency/throughput frontier.",
      "Define an SLO (e.g. TTFT ≤ 500ms, TPOT ≤ 120ms) and compute goodput at each concurrency — where does goodput peak vs raw throughput?",
      "Enable prefix caching; send requests sharing a 1,000-token system prompt. Compare TTFT with/without caching.",
      "Write up which serving configuration you'd ship for (a) a chatbot, (b) a nightly batch summarizer.",
    ],
    deliverable:
      "The frontier plot, goodput-vs-concurrency table, caching comparison, and your two configuration recommendations.",
  },
];
