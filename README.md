# Dynamic MDX Documentation System

This project implements a dynamic routing system for MDX files in the `docs` folder, automatically generating the sidebar navigation.

## Features

- **Dynamic Routing**: All MDX files in the `src/app/docs` folder are automatically accessible via their filename
- **Automatic Sidebar**: The sidebar is automatically generated from MDX files and their front matter
- **Nested Directories**: Support for organizing MDX files in subdirectories
- **Front Matter Support**: Use YAML front matter to customize titles and metadata

## How to Use

### Adding New Documentation Pages

1. Create a new `.mdx` file in the `src/app/docs` folder
2. Add front matter at the top of the file:

```mdx
---
title: Your Page Title
---

# Your Content Here

Your MDX content goes here...
```

3. The page will automatically appear in the sidebar and be accessible at `/docs/your-filename`

### Nested Directories

You can organize your documentation in subdirectories:

```
src/app/docs/
├── getting-started.mdx
├── installation.mdx
└── api/
    ├── endpoints.mdx
    └── authentication.mdx
```

This will create a nested structure in the sidebar:
- Getting Started
- Installation Guide
- API
  - Endpoints
  - Authentication

### Front Matter Options

- `title`: The title that appears in the sidebar (defaults to filename if not provided)
- Any other front matter will be available in the page data

## Build Process

The build process automatically:

1. Scans the `docs` folder for MDX files
2. Generates the `_meta.ts` file with the sidebar structure
3. Builds the Next.js application

To manually regenerate the sidebar:

```bash
npm run prebuild
```

## File Structure

```
src/
├── app/
│   ├── docs/
│   │   ├── page.mdx (main docs page)
│   │   ├── getting-started.mdx
│   │   ├── installation.mdx
│   │   └── api/
│   │       └── endpoints.mdx
│   ├── _meta.ts (auto-generated)
│   └── [...slug]/
│       └── page.tsx (dynamic route handler)
├── lib/
│   └── mdx-utils.ts (MDX file utilities)
└── scripts/
    └── generate-meta.ts (meta generation script)
```

## Development

```bash
npm run dev
```

The development server will automatically pick up new MDX files, but you may need to restart to see sidebar changes.

## Build

```bash
npm run build
```

This will generate the static site with all MDX files properly routed and the sidebar updated.
