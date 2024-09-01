import express, { Express, Router } from "express";
import { getTeams } from "../models/teams";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getTeams();
  res.send(data);
});

export default router;
