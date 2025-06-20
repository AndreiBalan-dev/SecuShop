import { Router, Request, Response } from "express";
import sanitizeHtml from "sanitize-html";

const router = Router();

const unsafeComments: { id: number; author: string; content: string }[] = [];
const safeComments: { id: number; author: string; content: string }[] = [];

router.post("/comment", (req: Request, res: Response): any => {
  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ error: "Author and content are required" });
  }

  const newComment = {
    id: unsafeComments.length + 1,
    author,
    content,
  };

  unsafeComments.push(newComment);
  res.status(201).json(newComment);
});

router.get("/comments", (_req: Request, res: Response) => {
  res.json(unsafeComments);
});

router.post("/comment-protected", (req: Request, res: Response): any => {
  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ error: "Author and content are required" });
  }

  const sanitized = sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const newComment = {
    id: safeComments.length + 1,
    author,
    content: sanitized,
  };

  safeComments.push(newComment);
  res.status(201).json(newComment);
});

router.get("/comments-protected", (_req: Request, res: Response) => {
  res.json(safeComments);
});

export default router;
