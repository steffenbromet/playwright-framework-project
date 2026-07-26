# 🚀 Playwright Automation Framework

A scalable automation framework built with **Playwright** and **TypeScript**.

The project is developed in two major phases:

- **Phase 1:** API Automation Framework
- **Phase 2:** UI Automation Framework

The objective is to demonstrate how to design a complete automation framework using software engineering principles such as clean architecture, strong typing, reusable components and maintainable test design.



---

## ✨ Features

- ✅ Playwright API Testing
- ✅ TypeScript
- ✅ Generic API Client
- ✅ Authentication Layer
- ✅ Token Manager (Singleton)
- ✅ Strongly Typed Models
- ✅ Generic API Responses
- ✅ Reusable Request Execution
- 🚧 Products Module
- 🚧 Docker Support
- 🚧 GitHub Actions
- 🚧 Allure Reports
- 🚧 Environment Configuration
- 🚧 Playwright UI Testing

---

## 🛠 Tech Stack

- Playwright
- TypeScript
- Node.js
- npm

Future additions:

- Docker
- GitHub Actions
- Allure Report
- ESLint
- Prettier

---

# 📂 Project Structure

```
Playwright-FRAMEWORK-PROJECT
│
├── API Layer
│      │
│      ├── BaseApiClient
│      ├── AuthClient
│      ├── UsersClient
│      └── ...
│
├── UI Layer
│      │
│      ├── BasePage
│      ├── Components
│      ├── Pages
│      └── ...
│
├── Fixtures
│
├── Utilities
│
├── Reporting
│
└── Configuration
```

---

# 🏛 Architecture

The framework separates responsibilities into independent layers.

```
Tests
   │
   ▼
API Clients
   │
   ▼
BaseApiClient
   │
   ▼
Playwright APIRequestContext
```

Authentication is handled independently.

```
Tests
   │
   ▼
AuthenticatedApiClient
   │
   ▼
TokenManager
   │
   ▼
AuthClient
```

This separation allows business clients to focus only on API operations while authentication is managed automatically.

---

# 🔄 Request Flow

```
Test

↓

UsersClient

↓

AuthenticatedApiClient

↓

BaseApiClient

↓

Playwright

↓

API
```

---

# 🎯 Design Principles

This framework follows several software engineering principles.

## Single Responsibility Principle

Each class has a single responsibility.

Example:

- BaseApiClient → HTTP communication
- AuthClient → Authentication
- TokenManager → Token lifecycle
- UsersClient → User endpoints

---

# ▶️ Getting Started

Clone the repository

```bash
git clone ...
```

Install dependencies

```bash
npm install
```

Run all tests

```bash
npx playwright test
```

Run a specific test

```bash
npx playwright test tests/api/Auth.spec.ts
```

---

# 📈 Roadmap

## ✅ Phase 1 - API Automation

- [x] BaseApiClient
- [x] Generic API Responses
- [x] Authentication Layer
- [x] Token Manager
- [x] Users Client
- [ ] Products Client
- [ ] Carts Client
- [ ] Posts Client
- [ ] Docker
- [ ] Environment Variables
- [ ] GitHub Actions
- [ ] Allure Reports

---

## 🚀 Phase 2 - UI Automation

- [ ] Page Object Model
- [ ] Component Objects
- [ ] Custom Fixtures
- [ ] Test Data Management
- [ ] Visual Testing
- [ ] Cross Browser Testing
- [ ] Parallel Execution
- [ ] Mobile Emulation
- [ ] Accessibility Testing
- [ ] Performance Metrics

---

# 📄 License

MIT License
