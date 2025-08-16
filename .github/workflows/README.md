# GitHub Actions Release Workflow

This workflow uses [semantic-release](https://semantic-release.gitbook.io/) for automated releases based on conventional commits.

## Setup Instructions

### 1. NPM Token
You need to add your npm authentication token as a repository secret:

1. Go to your npm account settings at https://www.npmjs.com/settings/[username]/tokens
2. Create a new "Publish" token
3. Go to your GitHub repository settings: `Settings > Secrets and variables > Actions`
4. Click "New repository secret"
5. Name: `NPM_TOKEN`
6. Value: Your npm publish token

### 2. How it works

- **Trigger**: Automatically runs when code is pushed to the `main` branch
- **Analyze**: Uses conventional commits to determine version bump (patch/minor/major)
- **Build**: Runs `npm ci` and `npm run build`
- **Release**: Automatically creates GitHub releases and publishes to npm
- **Changelog**: Generates CHANGELOG.md automatically

### 3. Commit Convention

Use conventional commits for automatic versioning:

```bash
# Patch release (bug fixes)
git commit -m "fix: resolve routing issue"

# Minor release (new features)
git commit -m "feat: add support for nested routes"

# Major release (breaking changes)
git commit -m "feat!: remove deprecated API"

# Other types: docs, style, refactor, test, chore
```

### 4. Workflow

Just push to main - semantic-release handles everything:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

The workflow will:
- Determine version based on commits
- Update package.json
- Generate CHANGELOG.md
- Create GitHub release
- Publish to npm

No manual version bumping needed!