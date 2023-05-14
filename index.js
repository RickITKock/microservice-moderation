import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());
app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// app.get("/posts", (req, res) => {
//   res.send(posts);
// });

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  // if (type === "PostCreated") {
  //   const { id, title } = data;

  //   posts[id] = { id, title, comments: [] };
  // }

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    const payload = {
      type: "CommentModerated",
      data: {
        ...data,
        status,
      },
    };

    await axios
      .post("http://event-bus-srv:4005/events", payload)
      .catch((error) => console.log(error));

    console.log(payload);

    // const { id, content, postId } = data;

    // const post = posts[postId];
    // post.comments.push({ id, content });
  }

  // console.log(posts);

  res.send({ status: "ok" });
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
