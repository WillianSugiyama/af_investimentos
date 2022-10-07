const database = require("../db.js");
const transaction = require("../models/transaction");

const createTransaction = async (transactionData) => {
  try {
    console.log(transactionData);
    await database.sync();
    const resultCreated = await transaction.create({
      ...transactionData,
    });

    console.log(resultCreated);

    return resultCreated;
  } catch (error) {
    return error;
  }
};

const readTransaction = async (id) => {
  try {
    await database.sync();
    const transactionResult = await transaction.findByPk(id);

    return transactionResult;
  } catch (error) {
    return error;
  }
};

const readAllTransaction = async () => {
  try {
    await database.sync();
    const transactionResult = await transaction.findAll({});
    console.log("OI", transaction);

    return transactionResult;
  } catch (error) {
    console.log("OI", error);
    return error;
  }
};

const updateTransaction = async (id, transactionData) => {
  try {
    await database.sync();
    const transactionResult = await transaction.findByPk(id);

    const transactionToUpdate = {
      ...transactionData,
      ...transactionResult,
    };

    const transactionUpdated = await transaction.update(transactionToUpdate);

    return transactionUpdated;
  } catch (error) {
    return error;
  }
};

const deleteTransaction = async (id) => {
  try {
    await database.sync();
    const transactionDeleted = await transaction.destroy({
      where: { id },
    });

    return transactionDeleted;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createTransaction,
  readAllTransaction,
  readTransaction,
  updateTransaction,
  deleteTransaction,
};
