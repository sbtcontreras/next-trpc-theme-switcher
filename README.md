# Test Project: T3 Stack + Next-Themes

This is a demo project built with the **T3 Stack** that integrates `next-themes` for theme management across the application.

## Description

The application features a basic CRUD (Create, Read, Update, Delete) for "posts". The key feature is that the most recently created or updated post can determine the global theme of the app.

## Objective

The goal of this project is to test and showcase how to persist the theme state of a Next.js application in a database and dynamically apply it on the client side.

## Main Features

- **Post CRUD**: Full functionality to create, read, update, and delete posts.
- **Dynamic Theme Switching**: When creating or updating a post, a theme can be selected. This theme is saved to the database and applied to the entire UI.
- **Persistence**: The selected theme is stored in the database using Prisma, ensuring it persists between sessions.

## Tech Stack

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [TypeScript](https://www.typescriptlang.org)
- [NextAuth.js](https://next-auth.js.org)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sbtcontreras/next-trpc-theme-switcher
   cd next-trpc-theme-switcher
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Copy the `.env.example` file to a new file named `.env` and configure it.

   ```bash
   cp .env.example .env
   ```

   Your `.env` file should look like this:

   ```env
   # Prisma
   DATABASE_URL="postgresql://postgres:mypassword@localhost:5433/theme-switcher-crud"
   ```

4. **Start the database:**
   Run the following script to create and start the database in a Docker container.

   ```bash
   ./start-database.sh
   ```

5. **Sync the database schema:**
   This command pushes the Prisma schema to the database.

   ```bash
   pnpm db:push
   ```

6. **Start the development server:**

   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.
