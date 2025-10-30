# TypeScript Testing Setup

> **A clean, modern TypeScript testing configuration reference and template**

This repository provides a minimal, well-configured starting point for TypeScript projects with Jest testing, ESLint linting, and Prettier formatting. Use it as a reference, template, or learning resource.

---

## 🎯 Purpose

This project demonstrates:
- ✅ **Modern TypeScript setup** (TypeScript 5.6+ with Node 20 LTS)
- ✅ **Jest testing** with ts-jest for running TypeScript tests directly
- ✅ **ESLint 9** with flat config format
- ✅ **Prettier integration** without conflicts
- ✅ **Minimal test examples** proving the setup works

**Not included:** Frameworks (Express, etc.), databases, APIs, or advanced patterns. This is pure configuration.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (LTS recommended)
- npm 9+

### Installation

```bash
# Clone or download this repository
git clone <your-repo-url> ts-testing-setup
cd ts-testing-setup

# Install dependencies
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Other Commands

```bash
# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without changing files
npm run format:check

# Type check without emitting files
npm run type-check

# Build TypeScript to JavaScript
npm run build

# Development mode with auto-reload (uses nodemon)
npm run dev
```

---

## 📁 Project Structure

```
ts-testing-setup/
├── src/
│   ├── utils.ts                    # Pure utility functions
│   ├── Calculator.ts               # Simple class example
│   └── __tests__/
│       ├── utils.test.ts           # Tests for utils
│       └── Calculator.test.ts      # Tests for Calculator
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── jest.config.mjs                 # Jest configuration
├── eslint.config.mjs               # ESLint flat config
├── .prettierrc                     # Prettier configuration
├── .gitignore                      # Git ignore patterns
├── nodemon.json                    # Nodemon config (optional)
├── README.md                       # This file
└── CONFIGURATION_GUIDE.md          # Deep dive on configurations
```

---

## 🧪 What's Being Tested

### Pure Functions (`src/utils.ts`)
- `add(a, b)` - Addition
- `subtract(a, b)` - Subtraction
- `multiply(a, b)` - Multiplication
- `getErrorMessage(error)` - Error message extraction
- `isValidEmail(email)` - Email validation
- `capitalize(str)` - String capitalization

### Calculator Class (`src/Calculator.ts`)
- Basic arithmetic operations (add, subtract, multiply, divide)
- Method chaining
- State management
- Error handling (division by zero)
- Utility methods (isEven, isPositive)

---

## 📚 Learning Resources

### Included Documentation
- **[CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md)** - Detailed explanation of each configuration file and why it's set up that way

### Test Examples Demonstrate:
1. **Pure function testing** - Testing functions with no side effects
2. **Class testing** - Testing class instances with state
3. **Error handling** - Testing functions that throw errors
4. **Edge cases** - Testing boundary conditions
5. **Jest matchers** - Using `toBe`, `toEqual`, `toThrow`, `toBeCloseTo`, etc.
6. **Test organization** - Using `describe` and `test` blocks
7. **Test setup** - Using `beforeEach` for fresh instances

---

## 🔧 Technology Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **TypeScript** | 5.6+ | Type-safe JavaScript |
| **Node.js** | 20 LTS | Runtime environment |
| **Jest** | 29 | Testing framework |
| **ts-jest** | 29 | TypeScript support for Jest |
| **ESLint** | 9 | Code linting |
| **typescript-eslint** | 8 | TypeScript rules for ESLint |
| **Prettier** | 3 | Code formatting |
| **nodemon** | 3 | Auto-reload during development |

---

## ✅ Configuration Highlights

### TypeScript (`tsconfig.json`)
- Extends `@tsconfig/node20` for optimal Node.js 20 settings
- **Strict mode enabled** for maximum type safety
- Separate `src/` and `dist/` directories
- Tests excluded from build output

### Jest (`jest.config.mjs`)
- Uses `ts-jest` preset for TypeScript support
- Node.js test environment (not browser)
- Tests located in `__tests__/` directories
- **80% coverage thresholds** (realistic and achievable)

### ESLint (`eslint.config.mjs`)
- **Flat config format** (ESLint 9+, the future of ESLint)
- TypeScript ESLint recommended rules
- Prettier integration **without conflicts**
- Allows unused variables starting with `_`

### Prettier (`.prettierrc`)
- Standard JavaScript conventions
- 2-space indentation
- Semicolons enabled
- `endOfLine: auto` for cross-platform compatibility

---

## 🎓 Use Cases

### As a Template
```bash
# Copy this repository to start a new project
cp -r ts-testing-setup my-new-project
cd my-new-project
npm install
# Start coding!
```

### As a Reference
- Need Jest config? → Check `jest.config.mjs`
- Need ESLint flat config? → Check `eslint.config.mjs`
- Need TypeScript config? → Check `tsconfig.json`
- Need to integrate Prettier? → Check `eslint.config.mjs` (Prettier must be last!)

### As a Learning Resource
1. Read this README
2. Study `CONFIGURATION_GUIDE.md`
3. Explore the test files in `src/__tests__/`
4. Run tests and experiment
5. Modify examples and see what happens

---

## 🧩 Extending This Setup

### Adding Express or Other Frameworks
```bash
npm install express
npm install -D @types/express supertest @types/supertest
```

Then add integration tests using Supertest. See **Project 2: TypeScript Testing Patterns** for comprehensive examples.

### Adding Environment Variables
```bash
npm install dotenv
```

Create `.env` file and load it in your entry point.

### Adding Database
Install your ORM (Prisma, TypeORM, etc.) and add repository patterns. Keep tests focused on unit testing business logic with mocked repositories.

---

## 📊 Test Coverage

Run `npm run test:coverage` to see coverage report:

```
---------------------|---------|----------|---------|---------|
File                 | % Stmts | % Branch | % Funcs | % Lines |
---------------------|---------|----------|---------|---------|
All files            |   100   |   100    |   100   |   100   |
 Calculator.ts       |   100   |   100    |   100   |   100   |
 utils.ts            |   100   |   100    |   100   |   100   |
---------------------|---------|----------|---------|---------|
```

**Note:** 100% coverage doesn't mean bug-free code! It means all lines are executed during tests. Always combine coverage with thoughtful test cases.

---

## 🐛 Common Issues and Solutions

### Issue: Jest runs slowly
**Solution:** Jest with ts-jest is slower than pre-compiled tests. For larger projects, consider:
- Using `--maxWorkers=4` flag
- Splitting tests into unit/integration
- Running only changed tests with `--onlyChanged`

### Issue: ESLint and Prettier conflict
**Solution:** Make sure `eslintPluginPrettierRecommended` is **last** in `eslint.config.mjs`. This is critical!

### Issue: TypeScript errors in tests
**Solution:** Make sure test files are not in `tsconfig.json` exclude array, or create separate `tsconfig.test.json`.

### Issue: Coverage thresholds too strict
**Solution:** Adjust `coverageThreshold` in `jest.config.mjs`. 80% is realistic; 100% is often impractical.

---

## 🤝 Contributing

This is a reference/template project. Feel free to:
- Fork and customize for your needs
- Submit issues for clarifications
- Suggest improvements to configurations

---

## 📝 License

MIT License - Use freely in your projects

---

## 🔗 Related Resources

- [Jest Documentation](https://jestjs.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [typescript-eslint](https://typescript-eslint.io/)
- [Prettier](https://prettier.io/)

---

## 📧 Questions?

If you're stuck or confused:
1. Read `CONFIGURATION_GUIDE.md` for deeper explanations
2. Check the test examples in `src/__tests__/`
3. Run tests and experiment
4. Review official documentation for each tool

---

**Ready to start testing?** Run `npm install` and `npm test`! 🚀
