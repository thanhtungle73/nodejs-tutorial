import pool from "../configs/connectDB";
import multer from "multer";

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

let deleteUser = async (req, res) => {
  let userId = req.body.userId;

  // Delete user in users table.
  await pool.execute("delete from users where id = ?", [userId]);
  return res.redirect("/");
};

let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("Select * from users where id = ? ", [id]);

  return res.render("update.ejs", { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
  const { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

/* 
  // Upload file
*/
const upload = multer().single("profile_pic");

let handleUploadFile = async (req, res) => {
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFilePage,
  handleUploadFile,
};
