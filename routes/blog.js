import express from "express";
import { ObjectId } from "mongodb";
import db from "../utility/mongo_driver.js";
const router = express.Router();

const collection = db.collection("blogs");

router.get("/", async (req, res) => {
  const data = req.body;
  const queryRes = collection.find({ userId: data.userId });
  const json = await queryRes.toArray();
  res.send(json);
});

router.post("/add", async (req, res) => {
  let status = 200;
  try {
    let data = req.body;
    // await firestore.f_saveDoc(`/users/${data.userId}/blog/`, data.blogData);
    await collection.insertOne(data);
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
    // await firestore.f_deleteDoc(`/users/${data.userId}/blog/`, data.blogId);
    await collection.deleteOne({ _id: new ObjectId(data.blogId) });
  } catch (error) {
    data = { message: `${error}` };
    status = 500;
  }
  res.statusCode = status;
  res.send(data);
});

router.post("/update", async (req, res) => {
  let status = 200;
  let data = req.body;
  try {
    // await firestore.f_updateDoc(`/users/${data.userId}/blog/`, data.blogId, data.update);
    collection.updateOne({ _id: new ObjectId(data.blogId) }, {"$set" : data.update});
    data = { message: "data saved successfully" };
  } catch (error) {
    status = 203;
    data = { message: `${error}` };
  }
  res.statusCode = status;
  res.send(data);
});

export default router;
