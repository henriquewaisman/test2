import express from "express";
import UserRouter from "./routes/UserRouter";
import PostRouter from "./routes/PostRouter";
import CommentRouter from "./routes/CommentRouter";
import AuthRouter from "./routes/AuthRouter";

const port = 3000;

const app = express();
app.use(express.json());

app.use(UserRouter);
app.use(AuthRouter);
app.use(PostRouter);
app.use(CommentRouter);

app.listen(port, function () {
  console.log("Server Running in Port " + port);
});