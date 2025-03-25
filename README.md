# Ignition - Modern Full-Stack Starter Kit

A production-ready full-stack starter kit with modern technologies and a beautiful UI. Build your next project in minutes, not hours.

![Ignition](https://img.shields.io/badge/Ignition-Modern%20Full%20Stack-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

- **Type-Safe API Layer**: End-to-end type safety with tRPC
- **Authentication**: Secure auth with email/password and social providers
- **Database**: Type-safe operations with Drizzle ORM
- **Modern UI**: Beautiful components with Shadcn/ui
- **AI Ready**: Pre-configured AI handlers and integrations
- **Developer Experience**: Hot reload, TypeScript, ESLint, and Prettier configured

## 🛠️ Tech Stack

- **Frontend**: Remix, React, TypeScript, Tailwind CSS
- **Backend**: tRPC, Node.js
- **Database**: Drizzle ORM, SQLite
- **Authentication**: Better Auth
- **UI Components**: Shadcn/ui
- **AI Integration**: OpenAI, Anthropic
- **Testing**: Vitest
- **Package Manager**: pnpm

## 📦 Project Structure

```
ignition/
├── apps/
│   └── web/                 # Remix web application
├── packages/
│   ├── ai/                  # AI integration package
│   ├── api/                 # API routes and handlers
│   ├── auth/                # Authentication package
│   ├── auth-db/             # Auth database package
│   ├── database/            # Database package
│   └── typescript-config/   # Shared TypeScript config
└── package.json
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ignition.git
   cd ignition
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Visit `http://localhost:3000`

## 🧪 Testing

Run tests across all packages:
```bash
pnpm test
```

## 📚 Documentation

- [Getting Started Guide](docs/getting-started.md)
- [Architecture Overview](docs/architecture.md)
- [API Documentation](docs/api.md)
- [Contributing Guide](CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Remix](https://remix.run)
- [tRPC](https://trpc.io)
- [Drizzle ORM](https://orm.drizzle.team)
- [Shadcn/ui](https://ui.shadcn.com)
- [Better Auth](https://github.com/your-username/better-auth)
