import type { Card } from "../../components/Flashcards";
import type { Question } from "../../components/Quiz";
import type { Assignment } from "../../components/Assignments.astro";

export const flashcards: Card[] = [
  {
    front: "Why does evaluating foundation models get HARDER as models get better?",
    back: "Verifying quality starts to require expertise: anyone can spot a wrong first-grade answer, few can check PhD-level math. For sophisticated tasks you must fact-check, reason, and bring domain knowledge — you can no longer judge by how the answer sounds.",
  },
  {
    front: "Name the five reasons foundation models are harder to evaluate than traditional ML.",
    back: "1) Smarter models need smarter (slower) verification. 2) Open-ended outputs break ground-truth comparison. 3) Models are black boxes. 4) Public benchmarks saturate fast (GLUE→SuperGLUE in a year). 5) Scope expanded: evaluation now also means discovering what models can do.",
  },
  {
    front: "What is entropy, intuitively?",
    back: "How much information each token carries on average — equivalently, how hard the data is to predict. Low-entropy language = predictable = fewer bits needed per token.",
  },
  {
    front: "What is a model's cross entropy on a dataset made of?",
    back: "Two parts: the data's own entropy H(P) (how predictable the data inherently is) plus the KL divergence of the model's learned distribution Q from the true distribution P (how far off the model is). Perfect learning → cross entropy = data's entropy.",
  },
  {
    front: "What is perplexity, and how do you read a value like 3?",
    back: "The exponential of cross entropy (2^H in bits, e^H in nats): the effective number of options the model weighs per next token. Perplexity 3 ≈ choosing among 3 tokens — remarkable given vocabularies of 100K+.",
  },
  {
    front: "Three rules of thumb for what moves perplexity?",
    back: "Structured data → lower (HTML is predictable). Bigger vocabulary → higher (more options). Longer context → lower (less uncertainty about what comes next).",
  },
  {
    front: "Give three practical uses of perplexity beyond training.",
    back: "1) Proxy for model capability (lower = better LM). 2) Detecting data contamination — suspiciously low perplexity on a benchmark suggests it was in training data. 3) Data work: dedup (only add high-perplexity new data) and anomaly detection (gibberish scores very high).",
  },
  {
    front: "Why does perplexity become less trustworthy after post-training or quantization?",
    back: "Post-training optimizes task completion, not next-token prediction — perplexity typically rises ('post-training collapses entropy'). Quantization can also shift perplexity unpredictably. A post-trained model's perplexity no longer cleanly reflects capability.",
  },
  {
    front: "What is functional correctness, and where can it be automated?",
    back: "Judging output by whether it does its job. Automatable wherever validity is checkable: code (run unit tests — HumanEval, MBPP), text-to-SQL (execute the query), game bots (the score), optimization tasks (measured energy saved).",
  },
  {
    front: "What does pass@k measure?",
    back: "The fraction of problems solved when the model may generate k samples per problem and a problem counts as solved if ANY sample passes all test cases. pass@1 ≤ pass@3 ≤ pass@10 in expectation.",
  },
  {
    front: "Exact match vs lexical vs semantic similarity — one line each.",
    back: "Exact: candidate equals a reference (short factual answers only). Lexical: surface overlap — tokens, n-grams, edit distance (BLEU/ROUGE). Semantic: meaning — embed both texts, take cosine similarity (BERTScore).",
  },
  {
    front: "Two failure modes of reference-based evaluation?",
    back: "Incomplete references — a correct answer scores low because nothing similar is in the reference set (Adept's Fuyu hit this). Wrong references — WMT found many bad reference translations; low-quality references are why reference-free metrics can rival reference-based ones.",
  },
  {
    front: "What is an embedding, and what makes one 'good'?",
    back: "A vector (typically 100–10,000 numbers) meant to capture the meaning of data. Good = similar items get close vectors (by cosine similarity), and it performs well on downstream tasks (MTEB benchmarks this).",
  },
  {
    front: "How does CLIP create a joint text-image embedding space?",
    back: "Trained on (image, text) pairs: a text encoder and an image encoder each produce embeddings, projected into one space, trained so an image lands near its caption. This enables cross-modal comparison — e.g. text-based image search.",
  },
  {
    front: "What evidence supports AI judges correlating with humans?",
    back: "On MT-Bench, GPT-4 agreed with humans 85% of the time — higher than human-human agreement (81%). AlpacaEval's judges correlate ~0.98 with the human-voted Chatbot Arena leaderboard.",
  },
  {
    front: "What are the three common AI-judge prompt patterns?",
    back: "1) Score a response given the question (no reference needed — usable in production). 2) Compare the response to a reference answer. 3) Compare two responses and pick a winner (feeds preference data and rankings).",
  },
  {
    front: "Best practices for an AI judge's scoring system?",
    back: "Models handle text better than numbers: classification beats numeric scoring; discrete beats continuous; keep ranges narrow (1–5); include example responses for each score with reasons.",
  },
  {
    front: "Name three specialized (small) judge types.",
    back: "Reward models — score (prompt, response), e.g. Cappy at 360M params. Reference-based judges — score candidate vs reference, e.g. BLEURT, Prometheus. Preference models — predict which of two responses users prefer, e.g. PandaLM, JudgeLM.",
  },
  {
    front: "Pointwise vs comparative evaluation?",
    back: "Pointwise: score each model independently, rank by scores. Comparative: run head-to-head matches, pick winners, and let a rating algorithm (Elo, Bradley–Terry) compute a ranking. Comparing is easier than absolute scoring for subjective quality.",
  },
  {
    front: "What does a comparative ranking NOT tell you?",
    back: "Absolute quality. 'B beats A 51% of the time' is consistent with both being great or both being terrible, and gives no idea how a win rate translates to business metrics (e.g. tickets resolved) — making cost-benefit analysis hard.",
  },
];

export const quiz: Question[] = [
  {
    q: "A model's cross entropy on its training data can never be lower than what?",
    options: [
      "Zero",
      "The entropy of the training data itself",
      "The model's perplexity",
      "1 bit per token",
    ],
    answer: 1,
    explanation:
      "Cross entropy = H(P) + KL(P||Q), and KL divergence is non-negative. A perfect learner drives KL to zero, leaving exactly the data's own entropy — you can't predict data better than its inherent predictability allows.",
  },
  {
    q: "Why do many papers report perplexity instead of cross entropy?",
    options: [
      "Perplexity is always an integer",
      "Cross entropy is proprietary information",
      "Units are confusing — bits vs nats change the number, and perplexity sidesteps the ambiguity",
      "Perplexity can be computed without logprobs",
    ],
    answer: 2,
    explanation:
      "Entropy can be measured in bits (base 2) or nats (base e, used by PyTorch/TensorFlow). The same model gets different cross-entropy numbers depending on units; perplexity (the exponential) avoids the confusion.",
  },
  {
    q: "A benchmark creator wants to check whether models were trained on her benchmark. How can perplexity help?",
    options: [
      "High perplexity on the benchmark proves contamination",
      "Suspiciously low perplexity on the benchmark suggests it was in the training data — models predict memorized text easily",
      "Perplexity can't help; only the provider knows",
      "She should compare BLEU scores instead",
    ],
    answer: 1,
    explanation:
      "Perplexity is lowest on text a model has seen and memorized. Low perplexity on supposedly unseen test data is a contamination red flag — and the same trick powers training-data dedup.",
  },
  {
    q: "On HumanEval, OpenAI found BLEU scores for correct and incorrect code solutions were similar. What does this imply?",
    options: [
      "BLEU is computed wrong for code",
      "Lexical similarity doesn't measure what you care about — optimizing BLEU ≠ optimizing functional correctness",
      "Incorrect solutions are usually shorter",
      "HumanEval's reference solutions are wrong",
    ],
    answer: 1,
    explanation:
      "Looking like a correct solution and being one are different things. For tasks with checkable outcomes, functional correctness (run the tests!) beats any surface-similarity metric.",
  },
  {
    q: "\"What's up?\" vs \"How are you?\" — which evaluation method recognizes these as near-equivalent?",
    options: [
      "Exact match",
      "Edit distance",
      "N-gram overlap",
      "Semantic similarity via embeddings",
    ],
    answer: 3,
    explanation:
      "They share almost no surface text, so exact and lexical methods fail. Embeddings capture meaning; cosine similarity between their vectors is high. (The reverse trap: 'Let's eat, grandma' vs 'Let's eat grandma' look almost identical lexically.)",
  },
  {
    q: "Your coherence score moved from 90% to 92% month-over-month, measured by an AI judge. What must you verify before celebrating?",
    options: [
      "That the application's traffic grew",
      "That the judge — model, prompt, and sampling settings — is EXACTLY the same as last month",
      "That the score is statistically significant at p<0.05",
      "That coherence correlates with revenue",
    ],
    answer: 1,
    explanation:
      "An AI judge is a system of model + prompt + sampling; change any piece (a coworker fixing a 'typo' in the prompt counts) and scores aren't comparable. Judges drift like any AI application — a core reason they're unreliable as longitudinal benchmarks.",
  },
  {
    q: "MLflow scores faithfulness 1–5, Ragas outputs 0/1, LlamaIndex says YES/NO — all for 'faithfulness'. The lesson?",
    options: [
      "Use the average of all three",
      "AI-judge criteria aren't standardized: same name, different prompts and scales — scores aren't comparable across tools",
      "LlamaIndex is the most accurate",
      "Faithfulness can't be measured",
    ],
    answer: 1,
    explanation:
      "Built-in criteria names create an illusion of standardization. The score's meaning lives in the judge's prompt and scale — read them before trusting any number.",
  },
  {
    q: "An AI judge consistently prefers responses placed first in pairwise comparisons. Cheapest sound mitigation?",
    options: [
      "Use a bigger judge model",
      "Run each comparison twice with the order swapped",
      "Only evaluate single responses",
      "Lower the judge's temperature to 0",
    ],
    answer: 1,
    explanation:
      "First-position bias is well documented (interestingly, opposite to humans' recency bias). Swapping order and aggregating cancels it. Temperature affects consistency, not position preference.",
  },
  {
    q: "Why might you deliberately use a WEAKER model to judge a stronger one?",
    options: [
      "You shouldn't — judges must always be stronger",
      "Judging is plausibly easier than generating (anyone can have an opinion about a song without writing one), and weak judges are cheap and fast",
      "Weaker models have fewer biases",
      "Strong models refuse to judge",
    ],
    answer: 1,
    explanation:
      "Stronger judges correlate better with humans, but cost/latency matter, the strongest model has no eligible judge, and small specialized judges (reward, reference-based, preference models) can beat general-purpose giants at their one job.",
  },
  {
    q: "Chatbot Arena lets anyone vote on anonymous model pairs. Which is a REAL documented quality problem with such crowdsourcing?",
    options: [
      "Voters see model names and vote for brands",
      "Trivial prompts pollute rankings — 'hello'-style prompts and repeated brainteasers can't differentiate models",
      "Models can refuse to participate",
      "Votes are weighted by account age",
    ],
    answer: 1,
    explanation:
      "Among 33K published Arena prompts, ~0.55% were literally 'hello'/'hi' variants; one brainteaser appeared 44 times. Easy prompts make all models look alike. (LMSYS now filters to hard prompts with an internal model. Names are revealed only after voting.)",
  },
  {
    q: "Model B beats model A 51% of the time, but costs twice as much. Model A resolves 70% of support tickets. What can you conclude about B's ticket-resolution rate?",
    options: [
      "About 71.4%",
      "At least 70%",
      "Almost nothing — win rate doesn't translate to absolute task performance",
      "Exactly 51% of tickets",
    ],
    answer: 2,
    explanation:
      "Comparative evaluation orders models; it doesn't locate them on an absolute scale. A 1% win-rate edge has meant huge gains in some applications and nothing in others — you need separate absolute evaluation to do the cost-benefit math.",
  },
];

export const assignments: Assignment[] = [
  {
    title: "Compute perplexity by hand (then with a model)",
    difficulty: "Starter",
    time: "~1.5 hours",
    brief:
      "Demystify the chapter's math by computing cross entropy and perplexity yourself for a toy distribution and a real model.",
    steps: [
      "Toy: a 'language' has 4 equally likely tokens. Compute its entropy, and the perplexity of a perfect model on it. Now make one token 70% likely and recompute — watch entropy fall.",
      "Real: load a small open model (e.g. GPT-2 via Hugging Face) and compute perplexity over three texts: a Wikipedia paragraph, an HTML snippet, and shuffled-word gibberish.",
      "Verify the chapter's rules: structured &lt; prose &lt; gibberish.",
      "Bonus: compute the same text's perplexity with 10 vs 500 tokens of preceding context and observe the drop.",
    ],
    deliverable:
      "Your numbers plus one paragraph: which rule of thumb surprised you and why?",
  },
  {
    title: "Build an AI judge and audit its biases",
    difficulty: "Intermediate",
    time: "~3 hours",
    brief:
      "Construct a judge following the chapter's prompt recipe, measure its agreement with you, then probe it for position and verbosity bias.",
    steps: [
      "Create 15 question-answer pairs spanning clearly good, clearly bad, and borderline answers. Score them yourself first (1–5 with reasons).",
      "Write a judge prompt with: the task, detailed criteria, a 1–5 discrete scale, and one worked example per score band. Run it and compute agreement with your scores.",
      "Position bias: convert to pairwise comparisons and run each pair in both orders. How often does the verdict flip?",
      "Verbosity bias: take 5 correct short answers, pad them into long waffly versions with one factual error, and see which the judge prefers.",
      "Re-run the whole suite twice and measure self-consistency.",
    ],
    deliverable:
      "A bias report: agreement %, flip rate, verbosity preference rate, consistency — and your verdict on whether you'd trust this judge in CI.",
  },
  {
    title: "Run your own mini Chatbot Arena",
    difficulty: "Advanced",
    time: "~4 hours",
    brief:
      "Rank 3–4 models with comparative evaluation and discover firsthand why ranking is harder than it looks.",
    steps: [
      "Pick 3–4 models (mix sizes/providers; local models via Ollama work great). Write 20 diverse, non-trivial prompts.",
      "Generate responses for every (prompt, model) pair. Build all pairwise matchups, randomize position, and judge each match — yourself, an AI judge, or both.",
      "Implement Bradley–Terry or simple Elo over the match results to produce a ranking. (A 30-line script is plenty.)",
      "Stress-test: recompute the ranking with matches in a different random order, and with 5 'hello'-grade prompts added. Does the ranking hold?",
      "Compare your ranking against the models' public leaderboard positions.",
    ],
    deliverable:
      "Your leaderboard, the stability analysis, and three sentences on where comparative evaluation earned (or lost) your trust.",
  },
];
