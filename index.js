import express from "express";
import blog from "./routes/blog.js";
import comments from "./routes/comments.js"
import category from "./routes/category.js"
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Hello world");
});



app.use("/blog", blog);
app.use("/comments", comments)
app.use("/category", category)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
