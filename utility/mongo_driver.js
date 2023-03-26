import { MongoClient, ServerApiVersion } from "mongodb";

const mongoUri =
  "mongodb+srv://blogging_backend:hbot_123@cluster0.nzvlqlv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongoUri);

await client.connect()

const db = client.db("blogging_backend")
console.log(db.databaseName)


// async function run() {
//     try {
//       // Connect the client to the server (optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
  
export default db;
