# How to Publish a Blog Post

Ragnild Web uses a file-based CMS. Publishing a new blog post is as simple as creating a text file.

## 1. Create a New File
Navigate to the `content/blogs` directory in the project.
Create a new file with a `.md` extension.
**Filename Rule:** The filename becomes the URL slug.
*   Example: `my-new-post.md` becomes `ragnild.com/blog/my-new-post`

## 2. Add Frontmatter
At the very top of your new file, add the following metadata block (frontmatter). This is required.

```markdown
---
title: "The Future of Cloud Computing"
date: "2026-01-26"
excerpt: "An in-depth look at how serverless architectures are reshaping the industry."
author: "Eniyavan"
readTime: "5 min read"
category: "Cloud Engineering"
---
```

### Fields Explained:
*   **title**: The headline of the article.
*   **date**: (YYYY-MM-DD) Used for sorting.
*   **excerpt**: A short summary shown on the main Blog page cards.
*   **author**: The name of the writer.
*   **readTime**: Estimated reading time (e.g., "5 min read").
*   **category**: The topic tag (e.g., "DevOps", "AI", "Security").

## 3. Write Your Content
Below the `---`, write your article using standard Markdown.

### Supported Formatting:
*   **Headers**: `# H1`, `## H2`, `### H3`
*   **Bold/Italics**: `**Bold**`, `*Italic*`
*   **Lists**: `- Item 1` or `1. Item 1`
*   **Links**: `[Link Text](https://example.com)`
*   **Code Blocks**:
    ```javascript
    console.log("Hello World");
    ```

## 4. Preview
1.  Ensure the development server is running (`npm run dev`).
2.  Go to `http://localhost:3000/blog`.
3.  Your new post should appear automatically in the grid.
