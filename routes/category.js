import express from "express";
import firestore from "../utility/firestore.js";
const router = express.Router();

router.get("/", async (req, res)=>{
    let status = 200
    let data = {"message" : "success"}
    try {
        const body = req.body
        data = await firestore.f_getDoc(`users/${body.userId}/category/`)
    } catch (error) {
        data = {'message' : `${error}`}
        status = 401
    }
    res.statusCode = status
    res.send(data)
})


//saves a new category
router.post("/post", async (req, res) => {
    let status = 200;
    let data = { "message": "save successfull" };
    try {
      const body = req.body;
      await firestore.f_saveDoc(
        `/users/${body.userId}/category/`,
        body.categoryData
      );
    } catch (error) {
      data = { "message": `${error}` };
      status = 401;
    }
    res.statusCode = status;
    res.send(data);
  });

//adds update to the data
  router.post("/update", async (req, res) => {
    let status = 200;
    let data = { "message": "save successfull" };
    try {
      const body = req.body;
      await firestore.f_updateDoc(
        `/users/${body.userId}/category/`,
        body.categoryId,
        body.updatedData
      );
    } catch (error) {
      data = { "message": `${error}` };
      status = 401;
    }
    res.statusCode = status;
    res.send(data);
  });

router.delete("/delete", async (req, res) => {
    let status = 200;
    let data = { "message": "deleted successfully" };
    try {
      const body = req.body;
      await firestore.f_deleteDoc(
        `/users/${body.userId}/category/`,
        `${body.categoryId}`
      );
    } catch (error) {
      data = { "message": `${error}` };
      status = 401;
    }
    res.statusCode = status;
    res.send(data);
  });


export default router