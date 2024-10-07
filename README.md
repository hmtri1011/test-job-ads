# Job Ads Application

This repository contains a full-stack application for managing job advertisements.

## Tech Stack

### Backend

- Prisma
- PostgreSQL
- Express

### Frontend

- NextJS
- ShadcnUI
- React Query
- Zustand

## Prerequisites

- Docker
- Node.js
- pnpm

## Getting Started

### 1. Set up PostgreSQL

Pull and start the PostgreSQL Docker container:

```bash
docker pull postgres
docker run --name local-postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=localdb -p 5432:5432 -d postgres
```

### 2. Clone the repository

```bash
git clone https://github.com/hmtri1011/test-job-ads.git
cd test-job-ads
```

### 3. Set up the backend

Navigate to the server directory:

```bash
cd server
```

Create a `.env` file in the server directory. You can use the `.env.example` file as a template.
Install dependencies and start the development server:

```bash
pnpm install
pnpm migrate:dev
pnpm seed
pnpm dev
```

### 4. Set up the frontend

Open a new terminal and navigate to the client directory:

```bash
cd client/test-job-ads
```

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```
