module.exports = (req, res, next) => {
  const { title, category, items } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!category || !category.trim()) {
    return res.status(400).json({ error: "Category is required" });
  }

  if (!Array.isArray(items) || items.length !== 5) {
    return res.status(400).json({ error: "Items must be an array of 5 elements" });
  }

  next();
};
