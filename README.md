# Inertia Svelte Type Definitions

This package provides TypeScript type definitions for `@inertiajs/svelte`, enhancing type safety and developer experience when working with Inertia.js in Svelte applications.

## Installation

1. To install this package, use npm or yarn:

```bash
npm install --save-dev types-inertiajs-svelte
```

2. Create inertia.d.ts file at resources/js/types/inertia.d.ts
```js
import type { Page as DefaultPage } from 'types-inertiajs-svelte';

export type User = {
    id: number;
    name: string;
    username: string;
};

export type Page = DefaultPage<{
    auth: {
        user?: User;
    };
    flash: {
        message?: string;
        error?: string;
    };
    errors: object;
}>;
```

3. Add to tsconfig.json
```json
    "paths": {
        "@inertiajs/svelte": ["resources/js/types/inertia.d.ts"]
    },
```
