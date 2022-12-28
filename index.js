const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
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

    app.post("/post", async (req, res) => {
      const posts = req.body;
      const result = await postCollection.insertOne(posts);
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
