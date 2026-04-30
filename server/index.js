const express = require("express");
const cors = require("cors");
const listRoutes = require("./routes/list.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/lists", listRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
