import { createMiddleware } from "@mswjs/http-middleware"; //http요청을 가로채는데 사용
import express from "express";
import cors from "cors";
import { handlers } from "./handlers";

const app = express();
const port = 9090;

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
); // cors를 활용하여 3000포트에서의 요청을 허용
app.use(express.json());
app.use(createMiddleware(...handlers));

app.listen(port, () => console.log(`Mock server is running on port: ${port}`)); //express서버를 시작
