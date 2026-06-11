import type { Card } from "../../components/Flashcards";
import type { Question } from "../../components/Quiz";
import type { Assignment } from "../../components/Assignments.astro";

export const flashcards: Card[] = [
  {
    front: "Model-centric vs data-centric AI?",
    back: "Model-centric improves performance by improving the model (architecture, size, training methods); data-centric improves it by improving the data (better datasets, better processing). Benchmarks have shifted from 'best model on fixed data' to 'best dataset for a fixed model'. Real progress usually needs both.",
  },
  {
    front: "What data formats do the different training phases need?",
    back: "Self-supervised finetuning: raw sequences. Instruction finetuning: (instruction, response). Preference finetuning: (instruction, winning response, losing response). Reward modeling: the same, or ((instruction, response), score).",
  },
  {
    front: "Why is chain-of-thought training data scarce and expensive?",
    back: "Annotators must write the full step-by-step reasoning, not just the answer — explaining a math solution stepwise takes far longer than stating the result. Yet including stepwise responses in finetuning data dramatically improves CoT task performance.",
  },
  {
    front: "Why might human annotations be poorly suited for agent/tool-use data?",
    back: "Humans and AI operate differently: a human clicks through a browser; a model calls an API once. Human-efficient workflows aren't AI-efficient, and experts skip steps when describing their work. That's why tool-use data is often simulated or synthesized.",
  },
  {
    front: "Data curation also means REMOVING data. Give the chapter's example.",
    back: "A chatbot kept appending unsolicited rewrites to fact-check requests. The cause: training examples with unsolicited suggestions. Fix: remove those examples AND add examples demonstrating the desired behavior — unlearning through curation.",
  },
  {
    front: "Name the six characteristics of high-quality finetuning data.",
    back: "Relevant, aligned with task requirements (deliberately 'aligned', not 'accurate' — correct may not be what's wanted), consistent across annotators, correctly formatted, sufficiently unique, compliant with policies.",
  },
  {
    front: "What evidence supports 'less but better' for finetuning data?",
    back: "1,000 carefully curated examples made a 65B model competitive with much stronger models in human evaluation (LIMA); the Yi team found ~10K crafted instructions beat hundreds of thousands of noisy ones. Caveat: tiny datasets produce less robust models than product-grade pipelines.",
  },
  {
    front: "What did the quality × diversity experiment show?",
    back: "Three same-size (2K) datasets: high-quality-only, diverse-only, and both. The model trained on data that was BOTH high-quality and diverse clearly won — neither property substitutes for the other.",
  },
  {
    front: "How did Llama 3's data mix shift between training phases?",
    back: "Math/reasoning + code ≈ half of pre-training and SFT (high-quality code/math boosts reasoning beyond their share of the internet), but only ~13% of preference data — preference tuning aims to mirror the real distribution of user preferences.",
  },
  {
    front: "Three factors (besides quality/diversity) that set how much finetuning data you need?",
    back: "Finetuning technique (full FT: thousands–millions; PEFT: hundreds work), task complexity (sentiment vs financial QA), and base model strength (stronger base → fewer examples; with ~100 examples stronger bases win, with ~550K all converge).",
  },
  {
    front: "What is ossification?",
    back: "Pre-training can 'freeze' model weights so they adapt less well to finetuning data — smaller models suffer more. It's one reason that, with millions of examples, training from scratch is worth evaluating against finetuning.",
  },
  {
    front: "What's the cheapest experiment to size your data needs?",
    back: "Finetune on subsets — 25%, 50%, 100% — and plot performance vs data size. A steep slope says more data pays; a plateau says it won't. Also: start with ~50 quality examples — if no improvement appears, more data rarely fixes it (but check hyperparameters first).",
  },
  {
    front: "Data augmentation vs data synthesis?",
    back: "Augmentation derives new examples from real data (flip a cat photo); synthesis generates data mimicking real-data properties (simulated bot mouse movements). The terms blur in practice; both automate data creation.",
  },
  {
    front: "Five reasons to synthesize data?",
    back: "Quantity (scale where real data is scarce), coverage (targeted: rare classes, toxic examples for detectors, adversarial cases), quality (AI can beat humans at e.g. complex math problems, consistent preference ratings), privacy (synthetic patient records), and distillation.",
  },
  {
    front: "What is reverse instruction?",
    back: "Take existing high-quality long-form content (books, articles) and ask AI to generate the instruction that would elicit it. Responses stay human-quality, hallucination-free; only the (easier) prompts are synthetic. It can even bootstrap a model iteratively from few seeds.",
  },
  {
    front: "How does back-translation verify synthetic translations and code docs?",
    back: "Translate output back to the source and compare with the original — big divergence = bad translation. For code: generate docs from code, regenerate code from docs, keep the docs only if the regenerated code is faithful.",
  },
  {
    front: "What is model collapse, and the known mitigation?",
    back: "Recursive training on AI-generated data degrades models — probable events get over-represented, rare events vanish, errors compound irreversibly. Mitigation per follow-up work: mix synthetic with real data (no agreed ratio); collapse looks inevitable only on 100% synthetic.",
  },
  {
    front: "Why can imitation/distillation be 'superficial' — and even teach hallucination?",
    back: "Students mimic the teacher's STYLE without its knowledge — failing on factuality and generalization. Worse: training on teacher solutions the student can't actually derive teaches it to produce answer-shaped text regardless of ability. (Human annotations beyond the model's knowledge do the same.)",
  },
  {
    front: "What's the chapter's most repeated processing advice?",
    back: "Manually inspect your data — 15 minutes of staring routinely saves hours. Plot distributions, check annotator consistency, annotate samples yourself, fact-check. 'Manual inspection of data has probably the highest value-to-prestige ratio of any activity in ML.'",
  },
  {
    front: "Why must finetuning data format match serving format exactly?",
    back: "Models learn the literal pattern: trained on 'burger -->', the prompts 'burger' (no arrow), 'Item: burger -->' (extra prefix), or 'burger --> ' (trailing space) can all misbehave. Also: finetuning instructions usually drop task descriptions and shots — the examples carry the task.",
  },
];

export const quiz: Question[] = [
  {
    q: "GPT-3's data work credited 2 people; GPT-4's credited ~80 (plus contractors). What does the chapter conclude from this?",
    options: [
      "OpenAI over-hired",
      "Data operations evolved from side tasks into dedicated roles — data increasingly differentiates AI performance as fewer teams train models from scratch",
      "GPT-4 used 40× more data",
      "Data work is fully automated now",
    ],
    answer: 1,
    explanation:
      "The data landscape now employs dataset creators, labelers, and quality engineers as core roles. When everyone uses similar base models, data is where differentiation lives.",
  },
  {
    q: "Why did the chapter choose 'aligned with task requirements' instead of 'accurate' as a quality criterion?",
    options: [
      "Accuracy can't be measured",
      "Depending on the task, an accurate response may not be what's wanted — creative tasks want creativity, concise tasks want brevity",
      "Alignment refers to RLHF",
      "Accuracy applies only to classification",
    ],
    answer: 1,
    explanation:
      "Annotations must match what the task demands: factual consistency where required, creativity where required, score-plus-justification where required. 'Correct but wrong-for-the-task' is a real failure mode.",
  },
  {
    q: "Llama 3's pre-training/SFT data is nearly half math, reasoning, and code — far above their share of the internet. Why?",
    options: [
      "Code is cheaper to license",
      "High-quality code and math data boosts reasoning more effectively than natural text — they even annealed on extra code/math to lift key benchmarks",
      "Regulators require it",
      "Tokenizers prefer code",
    ],
    answer: 1,
    explanation:
      "A deliberate over-weighting confirming a common belief about reasoning data. Note the contrast: preference-tuning data drops to ~13% code/math to mirror real user-preference distributions.",
  },
  {
    q: "With ~100 finetuning examples, which base model wins? With ~550,000?",
    options: [
      "Small models win both",
      "With 100, the more advanced base wins (already closer); with 550K, all models converge to similar performance",
      "Advanced models win both by the same margin",
      "Data volume doesn't interact with base strength",
    ],
    answer: 1,
    explanation:
      "OpenAI's finetuning data: base strength matters most when data is scarce. Practical rule: small data → PEFT on the best base; big data → full finetuning on a smaller model.",
  },
  {
    q: "You have few (question, answer) legal pairs but mountains of legal documents. The chapter's bootstrapping recipe?",
    options: [
      "Give up on finetuning",
      "First finetune self-supervised on the raw legal documents (continued pre-training), then finetune on the scarce annotated pairs",
      "Train only on the documents",
      "Convert documents to Q&A with regex",
    ],
    answer: 1,
    explanation:
      "Cheap task-related data first, expensive task-specific data second. Siblings: less-relevant→relevant (tweets before product reviews) and synthetic→real (harder to coordinate, easy to botch).",
  },
  {
    q: "Gender-swapping words in training text ('she' → 'he' for nurses) is an example of:",
    options: [
      "Data leakage",
      "Rule-based augmentation used to mitigate dataset bias",
      "Model collapse",
      "Reverse instruction",
    ],
    answer: 1,
    explanation:
      "Simple transformations (synonym swaps, gender swaps, perturbation) create new examples from real ones — and counteract biases like gendered occupation associations. Perturbed data also hardens models against adversarial attacks.",
  },
  {
    q: "Why does the chapter say 'people synthesize data they can verify' — and which domain dominates synthetic data as a result?",
    options: [
      "Legal text; lawyers verify it",
      "Coding — execution, parsers, linters, unit tests, and back-translation give programmatic ground truth for generated examples",
      "Poetry; style is verifiable",
      "Medical data; doctors check it",
    ],
    answer: 1,
    explanation:
      "Echoing evaluation-driven development: verifiability drives synthesis. The Llama 3 coding pipeline gates every generated example through parsers, AI-generated unit tests, and revision loops — 2.7M verified examples.",
  },
  {
    q: "An AI judge generates preference data. NVIDIA's guard against first-position bias was:",
    options: [
      "Using three judges",
      "Asking twice with response order swapped, keeping the triplet only if the same winner was picked both times",
      "Using temperature 0",
      "Only short responses",
    ],
    answer: 1,
    explanation:
      "Order-swap consistency filtering — the same mitigation from Chapter 3's judge-bias toolkit, applied at dataset scale.",
  },
  {
    q: "Repeating just 0.1% of training data 100 times did what, per the Anthropic study?",
    options: [
      "Nothing measurable",
      "Degraded an 800M-parameter model to 400M-level performance despite 90% of tokens remaining unique",
      "Improved memorization usefully",
      "Only slowed training",
    ],
    answer: 1,
    explanation:
      "Duplication quietly halves your effective model. Hence dedup at multiple levels (whole-doc, intra-doc, cross-doc) via pairwise similarity, hashing (MinHash/Bloom filters), or dimensionality reduction.",
  },
  {
    q: "Databricks stripped extraneous Markdown/HTML tokens from training data and saw:",
    options: [
      "No change",
      "+20% accuracy and 60% shorter inputs",
      "Worse formatting ability",
      "Only cost savings",
    ],
    answer: 1,
    explanation:
      "Formatting junk interferes with learning AND wastes tokens. Cleaning is unglamorous and high-yield — like the finding that late-session annotations are lower quality (annotator fatigue) and can be filtered by timestamp.",
  },
  {
    q: "Nemotron-4-340B was instruction-tuned on 98% synthetic data from a smaller teacher and OUTPERFORMED it. Why isn't this 'distillation'?",
    options: [
      "It is distillation",
      "Distillation implies the teacher is the student's ceiling — here synthetic data trained a LARGER, stronger student, with verification keeping quality high",
      "Distillation requires human data",
      "The teacher was proprietary",
    ],
    answer: 1,
    explanation:
      "Synthetic training ≠ distillation. With quality verification (and per Llama 3's note, only VERIFIED self-generated data helps — indiscriminate self-training can degrade), students can exceed teachers.",
  },
];

export const assignments: Assignment[] = [
  {
    title: "Audit a public instruction dataset",
    difficulty: "Starter",
    time: "~1.5 hours",
    brief:
      "Apply the six quality characteristics and inspection habits to a dataset people actually finetune on.",
    steps: [
      "Pick an instruction dataset from Hugging Face (e.g. a popular SFT set). Sample 100 examples.",
      "Plot distributions: instruction length, response length, and a rough topic breakdown.",
      "Manually read 30 examples. Score each against the six characteristics (relevant, aligned, consistent, formatted, unique, compliant). Annotate 5 instructions yourself and compare with given responses.",
      "Run a cheap dedup pass (exact + near-duplicate via fuzzy matching) and report the duplication rate.",
      "Write the dataset's report card: would you finetune on it? What would you filter first?",
    ],
    deliverable:
      "A one-page audit with distributions, quality scores, duplication rate, and verdict.",
  },
  {
    title: "Synthesize and verify your own instruction data",
    difficulty: "Intermediate",
    time: "~3 hours",
    brief:
      "Build a mini UltraChat/Alpaca pipeline with a verification gate, and measure how much the gate matters.",
    steps: [
      "Pick a narrow domain you know well. Create 10 seed (instruction, response) examples by hand.",
      "Topic-tree generation: ask a model for 10 subtopics, then 10 instructions per subtopic (100 total), seeded by your examples.",
      "Generate responses for each instruction.",
      "Build a verification gate: an AI judge scoring 1–5 on relevance + alignment, plus heuristics (length bounds, repetition, near-duplicates). Record the rejection rate.",
      "Manually review 20 accepted and 20 rejected examples — does the gate agree with you? Compute your agreement rate with the judge.",
    ],
    deliverable:
      "The dataset, rejection statistics, your agreement analysis, and three failure patterns you found in synthetic data.",
  },
  {
    title: "Reverse instruction + finetune comparison",
    difficulty: "Advanced",
    time: "~4–5 hours",
    brief:
      "Test the chapter's claim that reverse instruction yields higher-quality data than forward generation.",
    steps: [
      "Collect 200 pieces of genuinely high-quality content in one format (your best notes, good documentation sections, quality answers from a forum dump with a permissive license).",
      "Reverse-instruct: ask AI to write the prompt that would elicit each piece. Spot-check 20.",
      "Forward-generate a comparison set: 200 fully synthetic (instruction, response) pairs in the same domain.",
      "LoRA-finetune the same small base model on each dataset separately (same hyperparameters).",
      "Evaluate both finetunes on a held-out 20-prompt eval you wrote BEFORE training, judged blind (you or an AI judge, order-swapped). Which dataset wins, and on what criteria?",
    ],
    deliverable:
      "Blind eval results, example outputs from both models, and your verdict on reverse instruction.",
  },
];
