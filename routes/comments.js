import express from "express";
import { ObjectId } from "mongodb";
import db from "../utility/mongo_driver.js";

const collection = db.collection("comments")
const router = express.Router();

router.get("/", async (req, res) => {
  let status = 200;
  let data;
  try {
    const body = req.body;
    // data = await firestore.f_getDoc(
    //   `/users/${body.userId}/blog/${body.blogId}/comments/`
    // );
    data = collection.find({"blogId" : body.blogId})
    data = await data.toArray()
  } catch (error) {
    status = 401;
    data = { "message": `${error}` };
  }
  res.statusCode = status;
  res.send(data);
});

router.delete("/delete", async (req, res) => {
  let status = 200;
  let data = { "message": "deleted successfully" };
  try {
    const body = req.body;
    collection.deleteOne({"_id" : new ObjectId(body.commentId)})
    // await firestore.f_deleteDoc(
    //   `/users/${body.userId}/blog/${body.blogId}/comments/`,
    //   `${body.commentId}`
    // );
  } catch (error) {
    data = { "message": `${error}` };
    status = 401;
  }
  res.statusCode = status;
  res.send(data);
});

// save a new comment
router.post("/post", async (req, res) => {
  let status = 200;
  let data = { "message": "save successfull" };
  try {
    const body = req.body;
    // await firestore.f_saveDoc(
    //   `/users/${body.userId}/blog/${body.blogId}/comments/`,
    //   body.commentData
    // );
    await collection.insertOne(body)
  } catch (error) {
    data = { "message": `${error}` };
    status = 401;
  }
  res.statusCode = status;
  res.send(data);
});


// push update to a comment
router.post("/update", async (req, res) => {
  let status = 200;
  let data = { "message": "save successfull" };
  try {
    const body = req.body;
    // await firestore.f_updateDoc(
    //   `/users/${body.userId}/blog/${body.blogId}/comments/`,
    //   body.commentId,
    //   body.updatedData
    // );
    await collection.updateOne({"_id" : new ObjectId(body.commentId)}, {"$set" : body.update})
  } catch (error) {
    data = { "message": `${error}` };
    status = 401;
  }
  res.statusCode = status;
  res.send(data);
});

export default router;
