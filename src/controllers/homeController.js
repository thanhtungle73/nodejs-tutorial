import pool from "../configs/connectDB";

let getHomepage = async (req, res) => {
  // handle logic here...

  const [rows, fields] = await pool.execute("SELECT * FROM users");

  // Passing rows variable to view (index.ejs) and render.
  return res.render("index.ejs", { dataUser: rows });
};

let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute("select * from users where id = ?", [userId]);

  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  console.log("check request: ", req.body);
  const { firstName, lastName, email, address } = req.body;

  // insert data into SQL table
  await pool.execute(
    "insert into users(firstName, lastName, email, address) values(?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
};
