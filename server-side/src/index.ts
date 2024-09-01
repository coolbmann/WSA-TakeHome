import express from "express";
import cors from "cors";
import teamsRouter from "./routes/teams";
import playersRouter from "./routes/players";

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
  })
);

app.use("/teams", teamsRouter);
app.use("/players", playersRouter);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  return console.log(`Listening on Port: ${PORT}`);
});
