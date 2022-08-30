import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
//morgan module 사용 시 dev옵션을 사용 (dev,short,common,combined)
app.use(morgan("dev"));
//app.get의 url로 접속을 하면 해당 블록의 코드를 실행합니다.
app.get("/", (_, res) => res.send("running"));

let port = 4000;
//app.listen의 포트로 접속하면 해당 블록의 코드를 실행합니다.
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
});
