# How to Add Blog Posts

## Option 1: Edit JSON Files Directly (Easy)

1. Go to `src/content/posts/`
2. Create a new `.json` file (e.g., `my-post.json`)
3. Copy this template:

```json
{
  "title": "Your Post Title",
  "date": "2026-02-11T12:00:00.000Z",
  "author": "Elaine Taylor",
  "image": "/images/uploads/your-image.jpg",
  "excerpt": "Short description of the post",
  "body": "Your post content here. Use \\n\\n for new lines.\\n\\n**Bold text** like this."
}
```

4. Save the file
5. The post appears automatically!

## Option 2: Use the Admin Panel (Visual Editor)

1. Go to: `http://localhost:3000/admin` (or your deployed URL + `/admin`)
2. Login with your GitHub account
3. Click "Blog Posts"
4. Click "New Blog Post"
5. Fill in the form:
   - **Title**: Post title
   - **Publish Date**: When it should appear
   - **Author**: Your name
   - **Featured Image**: Upload an image
   - **Excerpt**: Short summary
   - **Body**: Full post content (supports formatting)
6. Click "Publish" → "Save"

## Adding Images

### For Admin Panel:
- Click "Choose different image" when creating/editing a post
- Upload directly - images save to `/images/uploads/`

### For JSON Files:
1. Put images in `public/images/uploads/`
2. Reference as: `/images/uploads/your-image.jpg`

## Markdown Formatting in Body

Use these in the **Body** field:

```
**Bold text**
*Italic text*

## Heading 2

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Numbered item

[Link text](https://example.com)
```

## Need Help?

Contact your developer or check the site README.
