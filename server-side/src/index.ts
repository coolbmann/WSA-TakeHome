import express from "express";
import cors from "cors";
import teamsRouter from "./routes/teams";
import playersRouter from "./routes/players";
import rulesRouter from "./routes/rules";

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(
  cors({
    origin: "https://www.wsa-take-home.bryanherijanto.com",
  })
);

app.use("/teams", teamsRouter);
app.use("/players", playersRouter);
app.use("/rules", rulesRouter);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  return console.log(`Listening on Port: ${PORT}`);
});
