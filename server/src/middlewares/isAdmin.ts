export function isAdmin(req: any, res: any, next: any) {
  const user = req.session?.user;

  if (!user || user.role !== "admin") {
    return res.status(401).json({ error: "Neautorizat" });
  }

  next();
}
