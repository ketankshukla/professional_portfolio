---
title: Building Modern Web Apps with Next.js 14
date: 2024-01-01
excerpt: A comprehensive guide to building production-ready applications with Next.js 14, featuring the new App Router and Server Components.
tags:
  - Next.js
  - React
  - Web Development
  - TypeScript
coverImage: /images/profile/logo.png
---

Next.js 14 represents a significant evolution in React-based web development. In this comprehensive guide, we'll explore its new features and how to leverage them effectively.

## Key Features in Next.js 14

### 1. App Router
The new App Router brings significant improvements:
- Nested layouts and routes
- Server Components by default
- Streaming and Suspense
- Data fetching within components

### 2. Server Components
```tsx
// app/page.tsx
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">
        {data.title}
      </h1>
      {/* Rest of your component */}
    </main>
  );
}
```

### 3. Data Fetching
Next.js 14 simplifies data fetching:
```tsx
// Parallel data fetching
async function ParallelDataFetch() {
  const [userData, postData] = await Promise.all([
    fetch('https://api.example.com/user'),
    fetch('https://api.example.com/posts')
  ]);
  
  // Use the data...
}
```

## Best Practices

1. **Use Server Components by Default**
   - Better performance
   - Reduced client-side JavaScript
   - Simplified data fetching

2. **Implement Loading States**
```tsx
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
    </div>
  );
}
```

3. **Error Handling**
```tsx
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
```

## Advanced Features

### 1. Metadata API
```tsx
// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
  description: 'A modern web application built with Next.js 14',
};
```

### 2. Route Handlers
```tsx
// app/api/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const data = { message: 'Hello from Next.js 14!' };
  return NextResponse.json(data);
}
```

## Conclusion

Next.js 14 provides a robust foundation for building modern web applications. Its focus on server components, improved data fetching, and enhanced routing system makes it an excellent choice for your next project.
