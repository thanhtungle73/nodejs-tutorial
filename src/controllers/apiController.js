import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");
  // Return http status and json message.
  res.status(200).json({
    message: "All users are get successfully",
    data: rows,
  });
};

// Created new user.
let createNewUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;

  if (!firstName || !lastName || !email || !address) {
    return res.status(400).json({
      message: "Missing required parameters",
    });
  }

  // insert data into SQL table
  await pool.execute(
    "insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );

  return res.status(200).json({
    message: "User is created successfully",
  });
};

// Update user.
let updateUser = async (req, res) => {
  const { firstName, lastName, email, address, id } = req.body;

  if (!firstName || !lastName || !email || !address) {
    return res.status(400).json({
      message: "Missing required parameters",
    });
  }

  await pool.execute(
    "update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );

  return res.status(200).json({
    message: "User is updated successfully",
  });
};

let deleteUser = async (req, res) => {
  let userId = req.params.userId;

  // Delete user in users table.
  await pool.execute("delete from users where id = ?", [userId]);
  return res.status(200).json({
    message: "user has been deleted successfully",
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
