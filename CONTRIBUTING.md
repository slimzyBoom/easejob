# Contributing to EaseJob Platform

1. **Fork** the repository and clone it to your machine.

   ```bash
   git clone https://github.com/slimzyBoom/easejob.git
   ```
2. **Create a feature branch** from `develop`:

   ```bash
   git checkout -b feature/add-job-filter
   ```
3. Make your changes.
4. **Run lint & tests** before committing:

   ```bash
   npm run lint
   npm run test
   ```
5. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

   * `feat: add endpoint to filter jobs by location`
   * `fix: correct user validation middleware`
   * `docs: update API usage for job creation`
6. **Push** your branch and open a **Pull Request** to `develop`.
7. Request at least **1 review** before merging.

---

## Branching Rules

* `main` → **production** (protected, no direct commits).
* `develop` → **staging** / integration.
* `feature/*` → new features.
* `bugfix/*` → non-urgent fixes.
* `hotfix/*` → urgent fixes for production.

---

## Pull Request Guidelines

* Keep PRs **small and focused**.
* PR title must follow **conventional commits**.
* Ensure PR has:

  * Description of changes
  * Linked issue (if any)
  * Checklist ticked (tests, docs, lint)
* CI/CD must pass before merge.

---

## Issues

* Use **GitHub Issues** for bugs & feature requests.
* When creating an issue:

  * Use the correct template (Bug Report / Feature Request).
  * Provide enough details (steps, screenshots, expected vs. actual).

