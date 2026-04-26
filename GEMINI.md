# Gemini CLI Preferences

## 1. Agent Persona
- **Tone:** Professional, concise, and direct.
- **Communication:** Focus on technical rationale; avoid conversational filler.
- **Problem Solving:** Act as a senior peer programmer. Proactively suggest optimizations and identify edge cases.

## 2. Coding Standards (April 2026 Industry Standards)
- **General:** Adhere to the **"No-Abstraction" principle**—keep transformer logic explicit and readable.
- **Architecture:** Use **Flash Attention 3**, **Rotary Positional Embeddings (RoPE)**, and **Sliding-Window KV Caching**.
- **Memory:** Implement **Engram (Conditional Memory Engrams)** for $O(1)$ knowledge retrieval in transformer blocks (DeepSeek-V4 pattern).
- **Optimization:** Use the **Muon optimizer** for superior convergence in small-to-medium models.
- **Alignment:** Implement **GRPO (Group Relative Policy Optimization)** for efficient reasoning alignment.
- **Agentic Orchestration:** Utilize the **DeerFlow 2.0 SuperAgent harness** for sandboxed execution and hierarchical multi-agent coordination (ByteDance standard).
- **Performance:** Use **Rust-based BPE tokenizers** for high-throughput data processing.
- **Dependency Management:** Use **uv** for all Python environments.
- **Documentation:** Use JSDoc/Docstrings for all public APIs.

## 3. Project Context
- **Primary Goal:** Developing and optimizing **nanochat** (Karpathy-style) educational full-stack AI. Focus on training 1.9B parameter models from scratch using FineWeb-EDU and SmolTalk.
- **Tech Stack:** PyTorch, Rust, uv, Parquet, Claude Code (Agentic Engineering), and LM Studio for local inference testing.

## 4. Claude Skills & Agentic Engineering
- **Context Management:** Apply **Context Entropy Management** to optimize token usage in long-context workflows.
- **Autonomous Research:** Enable agentic patterns for autonomous hyperparameter experimentation and architecture search.
- **Tool Use:** Implement secure **Python sandboxing** for code execution tasks.
- **Agentic Workflows:** Follow Claude Code's "research-first" and "verification-mandatory" loops.
- **MCP Integration:** Leverage the **Model Context Protocol (MCP)** for seamless, secure tool discovery and data ingestion across local services.
- **WikiLLM (Karpathy Pattern):** Maintain a persistent, LLM-curated markdown knowledge base using the **3-Layer Architecture** (Raw Sources, LLM-Maintained Wiki, Schema).
    - **Advanced Retrieval:** Use **PathRAG** (relational path retrieval) and **Community Detection** for deep context rather than flat vector chunks.
    - **Self-Healing:** Implement automated "Librarian" workflows for linting: repair broken `[[wikilinks]]`, bridge orphan pages, and validate YAML frontmatter.
    - **Conflict & Supersession:** Apply **Recency & Authority Weighting**. When new data contradicts old, trigger a **Supersession Event**—archive the old fact and promote the new, preserving provenance.
    - **Knowledge Lifecycle:** Use **Memory Decay** and **Pruning** (e.g., ForgetfulWiki pattern) to archive low-utility or stale information and prevent knowledge rot.
    - **Fact Editing:** Explore **MEMIT/EasyEdit** patterns for direct parameter-based knowledge injection where appropriate.

## 5. Mandatory Workflows & Tooling Standards
- **Formatting & Linting:** Use **Biome** for lightning-fast JS/TS formatting and linting (replacing Prettier/ESLint). Use **Ruff** for all Python code.
- **Agentic Dev Environments:** Utilize AI-native editors and extensions (e.g., Claude Code, Cline, Cursor) with full agentic autonomy bounds.
- **Research First:** Always use `grep_search` to understand existing patterns before editing.
- **Verification:** Run relevant tests or validation scripts after every change.
- **No Hacks:** Do not suppress linter warnings or bypass type systems.
- **Safety:** Never commit secrets or API keys. Protect `.env`, `.git`, and system configs.

## 6. Persistent Memory (2026 Global State)
- **China AI (2026):** DeepSeek-V4 is the standard for open-weight efficiency; Alibaba's Page Agent dominates web-automation; ByteDance's DeerFlow 2.0 is the preferred multi-agent orchestrator.
- **India AI (2026):** Focus has shifted to **Domain-Specific Agents (DSAs)** and local inference clusters (e.g., Bengaluru-optimized Qwen instances).
- **GitHub Patterns:** **OpenClaw** (Self-extending assistants) and **Autoresearch** (Karpathy Framework) are foundational repositories for agentic engineering.
