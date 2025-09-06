# EaseJob Platform – Backend 🚀

EaseJob is a platform that connects **professionals and vocational workers (e.g., artisans, freelancers, tailors)** with job opportunities around them. This repository contains the **backend services**, including authentication, job management, user profiles, and collaboration features.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Branching Model](#branching-model)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

---

## About the Project

EaseJob’s goal is to bridge the gap between job seekers (artisans & professionals) and employers by:

- Allowing seekers to **find jobs near them**.
- Providing a **dual experience** (artisans vs. professionals).
- Providing young talent with affordable, reliable and sustainable job-seeking process

This repo contains only the **backend (API + business logic)**.

---

## Tech Stack

- **Node.js** + **Express.js** (backend framework)
- **Typescript**
- **MongoDB** (database)
- **Redis** (caching, notifications, session management)
- **JWT Authentication**
- **Google and Facebook Oauth**
- **Jest** (testing)
- **Docker** (optional containerization)

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- MongoDB running locally
- Redis

### Setup

```bash
# Clone repo
git clone https://github.com/slimzyBoom/easejob.git
cd easejob-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run in dev mode
npm run dev
```

### Running the Server

```bash
npm start
```

---

## Running Tests

```bash
npm run test
```

---

## Branching Model

We use a **Feature Branch Workflow**:

- **main** → production-ready code (protected, no direct commits).
- **develop** → integration branch for features.
- **feature/xyz** → feature branches from `develop`.
- **hotfix/xyz** → urgent fixes from `main`.

Flow:

1. Create a branch from `develop`.
2. Work on your feature/fix.
3. Push and open a Pull Request (PR) → reviewed → merged into `develop`.
4. `develop` is merged into `main` when stable for release.

---

## 🤝 Contribution Guidelines

Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Workflow
- Commit conventions
- PR rules
- Code style guidelines

---

## 📜 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.
