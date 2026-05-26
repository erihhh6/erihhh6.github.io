# erihhh6.github.io // Root Directory

> "Security is not a feature. It is the fundamental architecture of the system."

This repository contains the source code for my personal nexus and portfolio. It is designed to be lightweight, modular, and strictly functional, serving as a central hub for my work in computer engineering, systems architecture, and secure computation.

## 0x01. System Overview
- **Entity:** Eric Oprea (`erihhh6`)
- **Focus:** Computer Engineering, Advanced Cryptography (ZKP, MPC), Secure Computation, and Low-Level Systems.
- **Objective:** Moving beyond default implementations to engineer, break, and understand systems at a fundamental level.

## 0x02. Architecture & Stack
This interface is intentionally minimal, prioritizing rendering speed and structural clarity over unnecessary bloat.
- **Core Framework:** React 18 
- **Build Engine:** Vite (Implemented for instant HMR and optimized asset compilation)
- **Styling:** Tailwind CSS (Strict utility-class architecture)
- **Deployment:** GitHub Actions CI/CD pipeline automatically routing compiled binaries to the `gh-pages` environment.

## 0x03. Execution Protocol
To initialize the environment locally, execute the following commands in sequence:

```bash
# Clone the repository
git clone [https://github.com/erihhh6/erihhh6.github.io.git](https://github.com/erihhh6/erihhh6.github.io.git)
cd erihhh6.github.io

# Install required dependencies
npm ci

# Initialize local development server
npm run dev
