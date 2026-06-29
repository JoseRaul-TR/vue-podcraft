# 🎙️ Podcraft

> **Discover, subscribe, and track your favorite podcasts.**

A modern, full-stack podcast discovery and subscription app built with **Nuxt 4**, **Vue 3**, **Pinia**, and **TanStack Query**. This project is a learning showcase for modern Vue ecosystem tools, including server-side rendering (SSR), state management, internationalization (i18n), and API integration with iTunes.

![Podcraft Preview](https://img.shields.io/badge/status-learning-green) ![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

---

## ✨ Features

- 🔍 **Search Podcasts**: Fetch and explore podcasts from the iTunes API.
- 📡 **Real-Time Updates**: Uses TanStack Query for efficient data fetching and caching.
- 🌍 **Multi-Language Support**: Available in English, Spanish, and Swedish (i18n).
- 🎨 **Dark/Light Mode**: Toggle between themes with VueUse.
- 💾 **Local Subscriptions**: Save and manage your favorite podcasts in localStorage.
- 📱 **Responsive Design**: Works on all devices.
- 🔗 **SEO-Friendly**: Dynamic meta tags for better discoverability.

---

## 🛠 Tech Stack

| Area           | Technologies                                                     |
| -------------- | ---------------------------------------------------------------- |
| **Framework**  | [Nuxt 4](https://nuxt.com/), [Vue 3](https://vuejs.org/)         |
| **State**      | [Pinia](https://pinia.vuejs.org/), [VueUse](https://vueuse.org/) |
| **Data**       | [TanStack Query](https://tanstack.com/query/latest), iTunes API  |
| **Styling**    | CSS Variables, Responsive Design                                 |
| **i18n**       | [@nuxtjs/i18n](https://i18n.nuxtjs.org/)                         |
| **TypeScript** | Full TypeScript support                                          |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: [nvm](https://github.com/nvm-sh/nvm))
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nuxt-podcraft.git
   cd nuxt-podcraft
   ```

2. Install dependencies:

   ```bash
   # npm
   npm install

   # pnpm
   pnpm install

   # yarn
   yarn install

   # bun
   bun install
   ```

3. Start the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun run dev
```

4. Open http://localhost:3000 in your browser.

### 📂 Project Structure

```
nuxt-podcraft/
├── app/
│   ├── components/       # Reusable Vue components
│   ├── composables/      # Custom composables (e.g., usePodcastsQuery)
│   ├── layouts/          # App layouts (default, podcast)
│   ├── middleware/       # Route middleware (auth, logging)
│   ├── pages/            # Page components
│   ├── plugins/          # Nuxt plugins (Vue Query, i18n locale)
│   └── stores/           # Pinia stores (subscriptions)
├── server/
│   ├── api/              # API routes (podcasts, episodes)
│   └── middleware/       # Server middleware (logger)
├── shared/
│   └── types/            # TypeScript interfaces (Podcast, Episode)
├── public/               # Static assets
├── nuxt.config.ts        # Nuxt configuration
├── package.json          # Project metadata and dependencies
└── README.md             # This file
```

### 🌐 API Endpoints

| Endpoint           | Description                          | Method |
| ------------------ | ------------------------------------ | ------ |
| /api/podcasts      | Search podcasts (query: term, limit) | GET    |
| /api/podcasts/[id] | Get podcast details and episodes     | GET    |

### 🎨 Customization

#### Adding a New Language

1. Add a new locale in nuxt.config.ts:

```ts
i18n: {
  locales: [
    // ...
    { code: 'fr', name: 'Français', file: 'fr.json' },
  ],
}
```

2. Create a translation file in app/locales/fr.json.

3. Use the new locale in the app with useI18n().

#### Changing the Theme

Edit the CSS variables in app/app.vue:

```css
\:root {
  --bg: #fafafa;
  --text: #111111;
  --accent: #7c3aed;
  /* ... */
}
```

### 📦 Dependencies

#### Core

- Nuxt 4: The framework for building the app.
- Vue 3: The progressive JavaScript framework.
- Pinia: State management.
- TanStack Query: Data fetching and caching.

#### Utilities

- VueUse: Collection of useful composables.
- Zod: Type-safe schema validation.

#### i18n

- @nuxtjs/i18n: Internationalization for Nuxt.

### 🚀 Deployment

#### Vercel (Recommended)

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Deploy!

#### Netlify

1. Push your code to a Git repository.
2. Import the project in Netlify.
3. Configure the build command: npm run build.
4. Deploy!

#### Static Hosting

For static hosting (e.g., GitHub Pages, Surge), run:

```bash

npm run generate
```

This generates a static version of your app in the dist/ folder.

### 🤝 Contributing

Contributions are welcome! Open an issue or submit a pull request.

1. Fork the repository.
2. Create a feature branch (git checkout -b feature/amazing-feature).
3. Commit your changes (git commit -m 'Add amazing feature').
4. Push to the branch (git push origin feature/amazing-feature).
5. Open a Pull Request.

### 📜 License

This project is licensed under the MIT License – see the LICENSE file for details.

### 🙏 Acknowledgments

Nuxt Documentation
Vue Documentation
iTunes Search API
TanStack Query Docs

Built with ❤️ and Vue.
