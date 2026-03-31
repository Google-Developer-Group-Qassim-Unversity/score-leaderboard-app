# Environment Variables

This project uses [Infisical](https://infisical.com/) for secrets management, with support for local overrides via `.env.local` during development.

This document explains how environment variables are loaded and managed in this project

## How It Works

### Priority Order (highest to lowest)

1. **`.env.local`** - Local overrides for development
2. **Infisical cloud secrets** - Shared team secrets

When running `pnpm run dev`, the command:

```bash
infisical run --env=dev --path=/main-frontend -- ./node_modules/.bin/dotenv -e .env.local -o -- next dev
```

1. Fetches secrets from Infisical cloud
2. Loads `.env.local` and **overrides** any conflicting values
3. Starts Next.js with the merged environment

## Setup

### 1. Install Infisical CLI

```bash
# Windows
winget install infisical

# macOS/Linux
brew install infisical/get-cli/infisical

# Arch Linux
yay -S infisical-bin

# Ubuntu
# 1. Add Infisical repository
curl -1sLf 'https://artifacts-cli.infisical.com/setup.deb.sh' | sudo -E bash
# 2. install CLI
sudo apt-get update && sudo apt-get install -y infisical

# Or visit https://infisical.com/docs/cli/overview
```

### 2. Login to Infisical

1. `infisical login`
2. Select ` ▸ Self-Hosting or Dedicated Instance`
3. Select ` ▸ Add a new domain`
4. add `https://infisical.albrrak773.com`

### 3. Create Local Overrides (Optional)

Create a `.env.local` file in the project root:

```env
# Override backend API URL for local development
NEXT_PUBLIC_BACKEND_API_URL=https://your-local-url.com
```

## Infisical Dashboard

you can see and manage the secrets in the [link here](https://infisical.albrrak773.com/organizations/de21a8c1-87e7-4f92-9e3b-253791905f8e/projects/secret-management/300b1e97-7e52-4a4e-872d-053b9082cac5/overview)
