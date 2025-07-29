# Proyecto de Prueba: T3 Stack + Next-Themes

Este es un proyecto de demostración construido con el **T3 Stack** que integra `next-themes` para la gestión de temas de la aplicación.

## Descripción

La aplicación consiste en un CRUD (Crear, Leer, Actualizar, Eliminar) básico de "posts". La característica principal es que el último post creado o actualizado tiene la capacidad de cambiar el tema general de la aplicación.

## Objetivo

El propósito de este proyecto es testear y demostrar cómo se puede persistir el estado del tema de una aplicación Next.js en una base de datos y aplicarlo dinámicamente en el lado del cliente.

## Características Principales

- **CRUD de Posts**: Funcionalidad completa para crear, leer, actualizar y eliminar posts.
- **Cambio de Tema Dinámico**: Al crear o actualizar un post, se puede seleccionar un tema. Este tema se guarda en la base de datos y se aplica a toda la interfaz de usuario.
- **Persistencia**: El tema seleccionado se persiste en la base de datos a través de Prisma, asegurando que la selección se mantenga entre sesiones.

## Stack Tecnológico

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [TypeScript](https://www.typescriptlang.org)
- [NextAuth.js](https://next-auth.js.org)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Cómo Empezar

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/sbtcontreras/next-trpc-theme-switcher
    cd next-trpc-theme-switcher
    ```

2.  **Instalar dependencias:**

    ```bash
    pnpm install
    ```

3.  **Configurar variables de entorno:**
    Copia el archivo `.env.example` a un nuevo archivo llamado `.env` y configúralo.

    ```bash
    cp .env.example .env
    ```

    El contenido del `.env` debería ser similar a este:

    ```env
    # Prisma
    DATABASE_URL="postgresql://postgres:mypassword@localhost:5433/theme-switcher-crud"

    ```

4.  **Iniciar la base de datos:**
    Ejecuta el siguiente script para crear y iniciar la base de datos en un contenedor de Docker.

    ```bash
    ./start-database.sh
    ```

5.  **Sincronizar la base de datos:**
    Este comando carga el esquema de Prisma en la base de datos.

    ```bash
    pnpm db:push
    ```

6.  **Iniciar el servidor de desarrollo:**

    ```bash
    pnpm dev
    ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.
