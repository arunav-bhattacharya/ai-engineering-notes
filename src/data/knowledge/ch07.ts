import type { Card } from "../../components/Flashcards";
import type { Question } from "../../components/Quiz";
import type { Assignment } from "../../components/Assignments.astro";

export const flashcards: Card[] = [
  {
    front: "What is finetuning, and how does it relate to transfer learning?",
    back: "Adapting a model to a task by further training all or part of its weights. It's a form of transfer learning (an idea from 1976): knowledge from a data-rich task (text completion) transfers to data-poor tasks (legal Q&A) — improving sample efficiency from millions of examples to a few hundred.",
  },
  {
    front: "What is continued pre-training?",
    back: "Self-supervised finetuning on cheap task-RELATED data before expensive task-specific data — e.g., raw legal documents before annotated legal Q&A pairs, or a Vietnamese corpus before Vietnamese summarization data.",
  },
  {
    front: "What does 'finetuning is for form, RAG is for facts' mean?",
    back: "Information-based failures (wrong/outdated/missing facts) → RAG fixes them by supplying knowledge. Behavior-based failures (wrong format, style, syntax) → finetuning fixes them. Research found RAG beat finetuning on current-events questions — even RAG with the BASE model beat RAG with finetuned ones.",
  },
  {
    front: "Give three reasons NOT to finetune.",
    back: "1) Task-specific finetuning can degrade other tasks (the model gets narrower). 2) High upfront investment: data, ML expertise, serving infrastructure, ongoing maintenance. 3) Base models improve fast — your finetuned model may be lapped by next quarter's off-the-shelf model.",
  },
  {
    front: "What does the BloombergGPT story teach about domain-specific training?",
    back: "Bloomberg spent ~$1.3–2.6M training a 50B financial model; within weeks GPT-4 beat it substantially on financial benchmarks. General models keep absorbing domains — verify 'general models don't work for our domain' before spending millions on it.",
  },
  {
    front: "Why does training need so much more memory than inference?",
    back: "Inference stores weights + ~20% for activations. Training adds gradients and optimizer states per TRAINABLE parameter (Adam: 1 gradient + 2 optimizer values each) — for a 13B full finetune at 2 bytes: 78 GB on top of the 26 GB weights — plus activations stored for backprop, which can dwarf the weights.",
  },
  {
    front: "Approximate inference memory for a 13B model at 2 bytes/param?",
    back: "Weights: 13B × 2 = 26 GB; plus ~20% for activations/KV vectors ≈ 31 GB total. Rule: N × M × 1.2.",
  },
  {
    front: "What is gradient checkpointing?",
    back: "Don't store activations for the backward pass — recompute them when needed. Cuts memory substantially at the cost of extra computation time. (Also called activation recomputation.)",
  },
  {
    front: "FP16 vs BF16 — same bits, different trade-off. Explain.",
    back: "Both use 16 bits, but BF16 allocates more bits to range, fewer to precision: it can represent huge values FP16 rounds to infinity, but each value is less precise. Loading a model in the wrong format (e.g., a BF16 model as FP16) visibly degrades quality.",
  },
  {
    front: "What is quantization, and what's the standard practice for inference vs training?",
    back: "Reducing bits per value (strictly: to integer formats, loosely: any precision reduction). Inference: post-training quantization to 16/8/4 bits is standard and nearly free. Training: more precision-sensitive — done in mixed precision (weights high, gradients/activations low); QAT simulates low precision to prepare models for quantized inference.",
  },
  {
    front: "Why is partial finetuning (freeze most layers, tune the last few) parameter-INefficient?",
    back: "It needs many trainable parameters to approach full-finetuning quality — ~25% of BERT's parameters for comparable GLUE performance. PEFT methods (adapters) hit within 0.4% using just 3% — by inserting parameters in the right places rather than unfreezing layers.",
  },
  {
    front: "What are the two main PEFT families?",
    back: "Adapter-based (additive): bolt trainable modules onto the weights — LoRA, BitFit, IA3, LongLoRA. Soft-prompt-based: trainable continuous 'tokens' fed alongside input — prefix-tuning, P-tuning, prompt tuning (differing mainly in insertion location).",
  },
  {
    front: "Mechanically, how does LoRA work?",
    back: "For weight matrix W (n×m): create A (n×r) and B (r×m); W′ = W + (α/r)·A·B. Train only A and B; W stays frozen. Merge A·B into W before serving — zero added inference latency, unlike classic adapters.",
  },
  {
    front: "Why can tiny LoRA updates steer huge models? (Why does PEFT work at all?)",
    back: "Research suggests LLMs have low INTRINSIC dimension — pre-training implicitly compresses the task space, and bigger/better-trained models have lower intrinsic dimension. Pre-training acts as a compression framework, so adaptation needs few parameters and few examples.",
  },
  {
    front: "LoRA configuration rules of thumb?",
    back: "Apply to attention matrices (query + value first if budget-bound; all four spread thin beat one thick); feedforward layers add more gains if memory allows. Rank 4–64 usually suffices — raising r often doesn't help. α:r ratio typically 1:8 to 8:1.",
  },
  {
    front: "How does multi-LoRA serving make 100 per-customer models cheap?",
    back: "Keep adapters separate from the shared base: one full W (16.8M params for a 4096×4096 matrix) + 100 (A,B) pairs (65K params each) ≈ 23.3M params total, vs 1.68B for 100 merged copies. Adapter swap beats full-model reload; slight latency cost from runtime merging.",
  },
  {
    front: "What's QLoRA's trick?",
    back: "Store frozen base weights in 4-bit NF4 (a format exploiting that pre-trained weights are roughly normally distributed), dequantize to BF16 per forward/backward pass, plus paged optimizers spilling to CPU — a 65B model finetunes on a single 48 GB GPU. Cost: quantize/dequantize time.",
  },
  {
    front: "Why is model merging a fix for multi-task finetuning?",
    back: "Simultaneous multi-task finetuning needs more data; sequential finetuning suffers catastrophic forgetting (learning task B erases task A). Merging: finetune per task in parallel, then combine — each task learned well, no forgetting, and no GPU needed for the merge itself.",
  },
  {
    front: "What is task arithmetic?",
    back: "Subtract base weights from a finetuned model to get a task vector capturing the task's essence. Add task vectors to combine capabilities; subtract to REMOVE behaviors (biases, unwanted capabilities). TIES/DARE prune redundant delta parameters first — keeping the top ~20% performs like keeping all.",
  },
  {
    front: "Key finetuning hyperparameters and their tells?",
    back: "Learning rate (loss fluctuates → too high; slow decline → too low). Batch size (too small → unstable; fix with gradient accumulation). Epochs (training loss ↓ but validation ↑ → overfitting, reduce). Prompt loss weight (~10%: learn mostly from responses, slightly from prompts).",
  },
];

export const quiz: Question[] = [
  {
    q: "Grammarly's finetuned Flan-T5 beat a GPT-3 variant 60× its size on writing tasks using 82K examples. Which finetuning argument does this support?",
    options: [
      "Bigger models always win",
      "A small model finetuned on a specific task can beat a much larger general model on that task — cheaper to serve, too",
      "Finetuning requires millions of examples",
      "Text editing is unusually easy",
    ],
    answer: 1,
    explanation:
      "Task-specific finetuning of small models is the common pattern: better task quality, lower serving cost. 82K pairs is also far less than training a text editor from scratch would need.",
  },
  {
    q: "Your model answers product questions well but fails order-change requests. You finetune on order-change data. The most likely side effect?",
    options: [
      "Universal improvement across all tasks",
      "Order-changes improve while product questions and feedback may DEGRADE — single-task finetuning narrows models",
      "No change at all",
      "Only latency changes",
    ],
    answer: 1,
    explanation:
      "Task-specific gains often tax other tasks. Fixes: finetune on ALL query types together, use separate models per task, or merge per-task models afterward.",
  },
  {
    q: "Ovadia et al. compared RAG vs finetuning on current-events QA. The headline result?",
    options: [
      "Finetuning won decisively",
      "RAG beat finetuning — and RAG with the BASE model beat RAG with finetuned models",
      "Both performed identically",
      "Neither helped over the base model",
    ],
    answer: 1,
    explanation:
      "For information-based failures, retrieval wins — and finetuning can actively hurt by degrading general abilities. Combining RAG + finetuning helped only ~43% of the time over RAG alone. Facts → RAG; form → finetuning.",
  },
  {
    q: "Full finetuning of a 7B model in 16-bit with Adam needs roughly how much memory (weights + gradients + optimizer)?",
    options: [
      "14 GB",
      "28 GB",
      "~56 GB — 14 GB weights + 42 GB for gradients and optimizer states",
      "7 GB",
    ],
    answer: 2,
    explanation:
      "7B × 2 bytes = 14 GB weights; each trainable param adds 3 values (1 gradient + 2 Adam states) × 2 bytes = 42 GB. Past consumer GPUs (12–48 GB) before counting activations — exactly why PEFT exists.",
  },
  {
    q: "Llama 2 shipped in BF16; many teams loaded it in FP16 and found quality 'much worse than advertised'. Why?",
    options: [
      "FP16 uses fewer bits than BF16",
      "Same bit count, different layout: BF16 has more range bits — values legal in BF16 overflow or distort in FP16",
      "FP16 isn't supported on GPUs",
      "The teams forgot to quantize",
    ],
    answer: 1,
    explanation:
      "BF16 sacrifices precision for range. Conversion changes values (and out-of-range values round to infinity in FP16). Always load a model in its intended format.",
  },
  {
    q: "Houlsby's adapters (PEFT's origin) matched full finetuning within 0.4% using 3% of trainable parameters — but had one drawback LoRA later fixed. Which?",
    options: [
      "They required more data",
      "Extra adapter layers added inference latency; LoRA's A·B merges back into W, adding none",
      "They only worked on GPT models",
      "They needed special hardware",
    ],
    answer: 1,
    explanation:
      "Bolt-on adapter modules add computation steps in the forward pass. LoRA's low-rank decomposition merges into the original matrix before serving — parameter-efficient AND latency-free.",
  },
  {
    q: "With an 18M trainable-parameter budget on GPT-3, LoRA performed best when applied to:",
    options: [
      "One attention matrix at high rank (r=8)",
      "All four attention matrices at low rank (r=2) — spreading thin beat concentrating",
      "Only the embedding layer",
      "The output head only",
    ],
    answer: 1,
    explanation:
      "Coverage beat depth: all four matrices at r=2 outperformed one at r=8. If limited to two, query + value matrices are the standard pick; feedforward layers add complementary gains when memory allows.",
  },
  {
    q: "Why does QLoRA's NF4 format quantize pre-trained weights particularly well?",
    options: [
      "It uses 8 bits instead of 4",
      "It exploits the fact that pre-trained weights roughly follow a zero-centered normal distribution",
      "It only quantizes the adapters",
      "It rounds everything to integers",
    ],
    answer: 1,
    explanation:
      "NormalFloat-4 allocates its 16 representable values to match a normal distribution — more resolution where weights actually cluster. Combined with paged optimizers, it put 65B-parameter finetuning on one 48 GB GPU.",
  },
  {
    q: "You want one model that handles three tasks, but sequential finetuning keeps destroying earlier tasks. Name the phenomenon and the merging-based fix.",
    options: [
      "Overfitting; lower the learning rate",
      "Catastrophic forgetting; finetune per-task in parallel and merge the resulting models",
      "Mode collapse; increase batch size",
      "Alignment tax; more RLHF",
    ],
    answer: 1,
    explanation:
      "Neural networks forget old tasks when trained on new ones. Parallel per-task finetuning + merging (e.g. task-vector summing with TIES/DARE pruning) sidesteps the sequence entirely.",
  },
  {
    q: "OpenAI's 'distillation path' for finetuning development is:",
    options: [
      "Start with the cheapest model and work up",
      "Finetune the strongest affordable model on a small dataset, use it to GENERATE more data, then train a cheaper model on that data",
      "Merge several small models",
      "Quantize the largest model to 1 bit",
    ],
    answer: 1,
    explanation:
      "Strong base + small data → good teacher; teacher generates training data; cheap student learns it. The complementary 'progression path' goes cheap-to-strong to validate code, then data, then the frontier.",
  },
  {
    q: "Memory forces you into a batch size of 2 and training is unstable. The standard remedy?",
    options: [
      "Reduce epochs",
      "Gradient accumulation — accumulate gradients across several small batches, update weights once enough signal is gathered",
      "Raise the learning rate to compensate",
      "Remove the optimizer states",
    ],
    answer: 1,
    explanation:
      "Tiny batches give noisy updates. Accumulating gradients across batches simulates a larger effective batch without the memory cost — the classic compute-constrained finetuning trick.",
  },
];

export const assignments: Assignment[] = [
  {
    title: "Do the memory math for three real models",
    difficulty: "Starter",
    time: "~45 min",
    brief:
      "Build the back-of-napkin skill that decides what hardware you need before you rent it.",
    steps: [
      "Pick three models you care about (e.g. 3B, 8B, 70B). For each, compute inference memory at FP16, INT8, and INT4 (weights × 1.2).",
      "Compute FULL finetuning memory at FP16 with Adam (weights + 3 values per trainable param), ignoring activations.",
      "Compute LoRA finetuning memory: same weights, but trainable params = only adapters (assume r=16 on attention matrices; estimate ~0.5–1% of model params).",
      "Map each scenario onto real GPUs (24 GB, 48 GB, 80 GB): what fits where? Where does QLoRA (4-bit base) change the answer?",
    ],
    deliverable:
      "A table: model × precision × (inference / full FT / LoRA / QLoRA) → minimum GPU.",
  },
  {
    title: "LoRA-finetune a small model end to end",
    difficulty: "Intermediate",
    time: "~3–4 hours",
    brief:
      "Run the full finetuning loop on a task where prompting genuinely underperforms — structured output is ideal.",
    steps: [
      "Pick a small open model (1–8B) and a form-based task: e.g. converting messy text into a strict custom JSON schema, or a niche output style. Verify prompting alone struggles (20-example eval set first!).",
      "Prepare 200–1,000 (input, output) pairs. Hold out 20% for validation.",
      "Finetune with LoRA via a framework (Hugging Face PEFT, unsloth, or Axolotl): r=16, α=32, lr ~1e-4 as starting points.",
      "Watch the loss curves: adjust learning rate if fluctuating/flat; stop when validation loss turns up.",
      "Compare base vs finetuned on your eval set. Then try r=4 and r=64 — does rank matter for YOUR task?",
    ],
    deliverable:
      "Eval scores (base / finetuned at 3 ranks), loss curves, and one paragraph: was finetuning worth it over prompting here?",
  },
  {
    title: "Merge two finetuned models and test for forgetting",
    difficulty: "Advanced",
    time: "~4 hours",
    brief:
      "Experience multi-task merging firsthand: finetune one base model on two tasks separately, merge, and measure what survives.",
    steps: [
      "From one base model, create two LoRA finetunes on distinct tasks (e.g. JSON extraction and a specific tone/style rewrite). Build a 15-example eval per task.",
      "Baseline grid: score base, finetune-A, finetune-B on both tasks (note how A degrades on task B and vice versa).",
      "Merge: try (a) sequential finetuning A→B to witness catastrophic forgetting, and (b) weight merging via mergekit or simple task-vector addition of the LoRA deltas.",
      "Score the merged model on both evals. Experiment with merge weights (0.3/0.7, 0.5/0.5).",
      "Bonus: prune small task-vector deltas (zero out the bottom 80% by magnitude) before merging — does quality hold, per TIES/DARE?",
    ],
    deliverable:
      "A 2-task × 5-model score grid, plus your observation of forgetting vs merging trade-offs.",
  },
];
