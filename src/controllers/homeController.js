import connection from "../configs/connectDB";

let getHomepage = (req, res) => {
  // handle logic here...
  let data = [];
  connection.query("SELECT * FROM `users` ", function (err, results, fields) {
    data = Object.values(JSON.parse(JSON.stringify(results)));

    // Passing dataUser variable to view (index.ejs) and render.
    return res.render("index.ejs", { dataUser: data });
  });
};

module.exports = {
  getHomepage,
};
