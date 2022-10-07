const express = require("express");
const bodyParser = require("body-parser");
const {
  createTransaction,
  deleteTransaction,
  readAllTransaction,
  readTransaction,
  updateTransaction,
} = require("./services/transaction");

const app = express();

app.use(bodyParser.json());

app.get("/api/transaction/:id", async (req, res) => {
  const { id } = req.params;
  const transaction = await readTransaction(id);

  if (!transaction) {
    res.status(404).send("Transaction not found");
  }

  res.send(transaction);
});

app.post("/api/transaction", async (req, res) => {
  const transaction = await createTransaction(req.body);

  res.send(transaction);
});

app.delete("/api/transaction/:id", async (req, res) => {
  const { id } = req.params;
  const transaction = await deleteTransaction(id);

  res.send(transaction);
});

app.get("/api/transactions", async (req, res) => {
  const transaction = await readAllTransaction();

  res.send(transaction);
});

app.put("/api/transaction/:id", async (req, res) => {
  const { id } = req.params;
  const transaction = await updateTransaction(id, req.body);

  res.send(transaction);
});

app.listen(3000, () => {
  console.log("API started");
});
