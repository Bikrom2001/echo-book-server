const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// username: Ebooks
// password: xGcCXvitwzf8OfC2

const uri =
  "mongodb+srv://Ebooks:xGcCXvitwzf8OfC2@cluster0.wwiopku.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const postCollection = client.db("Echobooks").collection("post");
    const userCollection = client.db("Echobooks").collection("userinfo");

    app.post("/post", async (req, res) => {
      const posts = req.body;
      const result = await postCollection.insertOne(posts);
      res.send(result);
    });

    app.get("/userinfo", async (req, res) => {
      const query = {};
      const result = await userCollection
        .find(query)
        .sort({ like: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const query = {};
      const result = await postCollection
        .find(query)
        .sort({ like: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/mediaDetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await postCollection.findOne(query);
      res.send(result);
    });

    app.patch("/updateAboute/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const query = { _id: ObjectId(id) };
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          university: user.university,
          address: user.address,
        },
      };
      const result = await userCollection.updateOne(query, updateDoc, option);
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("simple node server Running");
});

app.listen(port, () => {
  console.log(`simple node server running on port ${port}`);
});
