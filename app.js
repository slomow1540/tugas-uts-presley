const express = require("express");
const exlay = require("express-ejs-layouts");
const { check, body, validationResult } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const auth = require("./App/Middlewares/auth");
const upload = require("./Utils/upload")();

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(exlay);
app.use(express.static("public"));
app.use(express.urlencoded({ extends: true }));
app.use(methodOverride("_method"));

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(auth);

app.get("/", (req, res) => {
  res.render("index", {
    layout: "components/layout",
    nama: "Howard",
    title: "Home Page",
  });
});
app.get("/home", (req, res) => {
  res.render("index", {
    layout: "components/layout",
    nama: "Howard",
    title: "Home Page",
  });
});

// // Route to serve the form for image upload
// app.get("/upload", (req, res) => {
//   res.send(`
//     <form action="/upload" method="POST" enctype="multipart/form-data">
//       <input type="file" name="image" accept="image/*" required />
//       <button type="submit">Upload Image</button>
//     </form>
//   `);
// });

// // Route to handle image upload
// app.post("/upload", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   // Successfully uploaded
//   res.send(
//     `Image uploaded successfully: <a href="/uploads/${req.file.filename}">View Image</a>`
//   );
// });

app.listen(port, () => {
  console.log(`Server is now running at http://localhost:${port}`);
});
