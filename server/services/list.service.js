const crypto = require("crypto");

let lists = [];

exports.getAll = () => lists;

exports.getOne = (id) => lists.find((l) => l.id === id);

exports.create = (data) => {
  const newList = { id: crypto.randomUUID(), ...data };
  lists.push(newList);
  return newList;
};

exports.update = (id, data) => {
  const index = lists.findIndex((l) => l.id === id);
  if (index === -1) return null;
  lists[index] = { ...lists[index], ...data };
  return lists[index];
};

exports.remove = (id) => {
  const index = lists.findIndex((l) => l.id === id);
  if (index === -1) return null;
  const deleted = lists[index];
  lists.splice(index, 1);
  return deleted;
};
