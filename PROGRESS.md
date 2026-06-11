# Build Progress Tracker

Single source of truth for resuming this build after any interruption (usage
limits, session restarts). Update before and after each unit of work. One git
commit per completed chapter.

## Phase A — Scaffold
- [x] git init, .gitignore, Astro + MDX + Preact + Pagefind installed
- [x] astro.config (site/base for GitHub Pages), package.json named
- [x] extract_chapter.py script
- [x] Design tokens + global styles (Google Sans Flex, light/dark)
- [x] Base + Chapter layouts, header, sidebar, TOC, theme toggle, search
- [x] Interactive components: Flashcards, Quiz, Assignments, KeyTakeaways, References, Figure, KnowledgeCheck
- [x] Content collection config + chapter route
- [x] GitHub Actions deploy workflow
- [x] Home page (final content pass happens at end of Phase B)

## Phase B — Content (per chapter: MDX all sections · diagrams · takeaways · researched references · flashcards/quiz/assignments · build green · commit)
- [x] Chapter 1 — Introduction (template validator) · diagrams 1.1/1.2 visually verified; 1.3/1.4 re-check in Phase C
- [x] Chapter 2 — Understanding Foundation Models
- [x] Chapter 3 — Evaluation Methodology
- [x] Chapter 4 — Evaluate AI Systems
- [x] Chapter 5 — Prompt Engineering
- [x] Chapter 6 — RAG and Agents
- [x] Chapter 7 — Finetuning
- [x] Chapter 8 — Dataset Engineering
- [ ] Chapter 9 — Inference Optimization
- [ ] Chapter 10 — Architecture and User Feedback
- [ ] Home page final pass (chapter cards, overview, preface/epilogue essence)

## Phase C — QA
- [ ] Light/dark screenshots, every diagram checked for text overlap
- [ ] Mobile 380px pass
- [ ] Search returns results; quiz/flashcard persistence across reload
- [ ] Section headings diffed against PDF bookmark list (zero topics missed)
- [ ] All reference links fetch OK

## Phase D — Deploy
- [ ] gh repo create ai-engineering-notes (public), push
- [ ] Pages enabled via Actions, live URL verified (incl. search under base path)
