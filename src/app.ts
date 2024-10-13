// npm run serve
// npm run dev for run on typescript

import { Response, Request } from "express";

import express from "express";
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req: Request, res: Response) => {
  res.send("new version of server hello ");
});
