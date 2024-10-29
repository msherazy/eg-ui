
# Eeasygenertor UI

This repository hosts the **EG UI Portal**, a frontend interface built using **React** and **React Query** to manage user profiles and provide an interactive user experience.

## Project Structure

```
b2c-portal/
│
├── public/               # Static assets and public resources
├── src/
│   ├── api/              # API service files for external requests
│   ├── assets/           # Media assets (images, icons, etc.)
│   ├── components/       # Reusable UI components
│   ├── constants/        # Constant values used across the app
│   ├── context/          # React Contexts for state management
│   ├── hooks/            # Custom React hooks
│   ├── providers/        # Providers wrapping the app
│   ├── schemas/          # Validation schemas (e.g., for forms)
│   ├── services/         # Business logic and services
│   ├── types/            # TypeScript types used throughout the app
│   ├── utils/            # Utility functions
│   ├── App.tsx           # App root component
│   ├── index.css         # Global styles
│   ├── main.tsx          # Main entry point of the application
│   └── vite-env.d.ts     # Vite environment types
├── .gitignore            # Git ignored files
├── postcss.config.js     # PostCSS configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── README.md             # Documentation (this file)
└── vite.config.ts        # Vite configuration
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16.x or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/msherazy/eg-ui.git
   cd eg-ui
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on the provided `vite-env.d.ts` and configure the necessary environment variables.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## Features

- **User Authentication**: Manage user sessions and profiles.
- **API Integration**: Connect to external services using **Axios**.
- **React Query**: Manage server state efficiently with caching and synchronization.
- **Custom Hooks**: Encapsulate logic for reusability.
- **Tailwind CSS**: Rapid styling and UI development.
- **TypeScript**: Strict type checking for better development experience.

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run preview`**: Preview the production build locally.
- **`npm run lint`**: Lint the codebase.
- **`npm run format`**: Format the code with Prettier.

## API Integration

The project interacts with APIs using **Axios**. Example usage can be found in:

```ts
const { data, error, isLoading } = useQuery<UserInfoResponse, Error>(
  ['get-profile', token],
  () => AuthApi.getUserInfo(token),
  { enabled: !!token }
);
```

This query retrieves the user's profile data based on the authentication token stored in localStorage.

## Technologies

- **React** + **TypeScript**
- **React Query**
- **Vite** (Development build tool)
- **Tailwind CSS** (Styling)
- **Axios** (HTTP Client)
- **PostgreSQL** (For backend interaction, if applicable)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add new feature"`.
4. Push to your branch: `git push origin feature-name`.
5. Submit a pull request.
