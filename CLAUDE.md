# Claude Code Instructions

## 1. Core Mandates
- When code files contain `// linggen anchor: <path>` comments, read the referenced anchor file under `.linggen/anchor/` for context.
- Follow **Agentic Engineering** standards: research first, execute with precision, and verify every change.

## 2. Persistent Memory & Knowledge Management
- **Librarian Role:** Act as the project's autonomous librarian. Regularly audit and update `GEMINI.md` and `CLAUDE.md` to reflect the evolving state of the project, architecture decisions, and newly discovered 2026 best practices.
- **Context Preservation:** When a significant architectural shift occurs (e.g., rebranding to NAVYA MYTHOS or upgrading to DeepSeek-V4 patterns), document it immediately in the **Project Context** or **Memory** sections of these files.
- **Supersession:** When new 2026 standards (like **Engram Memory** or **Muon Optimization**) are adopted, explicitly archive or replace outdated methods to prevent knowledge rot.

## 3. 2026 Technical Execution
- **Architecture:** Default to **Liquid MoE** and **Sliding-Window Attention** for transformer-based tasks.
- **Memory Integration:** Proactively suggest **Engram** modules for knowledge-intensive sub-systems.
- **Agentic Loops:** Use **DeerFlow 2.0** patterns for complex, multi-turn tool use, ensuring all code execution happens in isolated sandboxes.
- **Efficiency:** Minimize context entropy by being surgical with `grep_search` and `read_file` calls.
