const service = require("../services/list.service");

exports.getAll = (req, res) => {
  const lists = service.getAll();
  res.status(200).json(lists);
};

exports.getOne = (req, res) => {
  const list = service.getOne(req.params.id);
  if (!list) return res.status(404).json({ error: "Not found" });
  res.status(200).json(list);
};

exports.create = (req, res) => {
  const newList = service.create(req.body);
  res.status(201).json(newList);
};

exports.update = (req, res) => {
  const updated = service.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.status(200).json(updated);
};

exports.remove = (req, res) => {
  const deleted = service.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.status(200).json({ message: "Deleted" });
};
