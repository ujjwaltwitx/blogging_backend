import express from "express";
import firestore from "../utility/firestore.js";
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const data = await firestore.f_getDoc(`/users/${req.params.userId}/blog/`);
  console.log(data);
  res.send(data);
});

router.post("/add", async (req, res) => {
  let status = 200;
  try {
    let data = req.body;
    await firestore.f_saveDoc(`/users/${data.userId}/blog/`, data.blogData);
    data = { message: "data saved successfully" };
  } catch (error) {
    status = 203;
    data = { message: `${error}` };
  }
  res.statusCode = status;
  res.send("saved");
});

router.delete("/delete", async (req, res) => {
  let status = 200;
  let data = { message: "deleted successfully" };
  try {
    let data = req.body;
    await firestore.f_deleteDoc(`/users/${data.userId}/blog/`, data.blogId);
  } catch (error) {
    data = { message: `${error}` };
    status = 500;
  }
  res.statusCode = status;
  res.send(data);
});

router.post("/update", async (req, res) => {
    let status = 200;
    try {
      let data = req.body;
      await firestore.f_updateDoc(`/users/${data.userId}/blog/`, data.blogId, data.update);
      data = { message: "data saved successfully" };
    } catch (error) {
      status = 203;
      data = { message: `${error}` };
    }
    res.statusCode = status;
    res.send("saved");
  });

export default router;
