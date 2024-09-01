import express, { Express, Router } from "express";
import { getTeams } from "../models/teams";
import { getPlayers } from "../models/players";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = await getPlayers(req.body.data);
    res.send(data);
  } catch (error) {
    res.send([]);
  }
});

export default router;
