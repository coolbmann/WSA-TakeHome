import express, { Express, Router } from "express";
import { getRules } from "../models/rules";
import { services } from "../services";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getRules();
  const formattedData = services.separateRuleData(data);
  res.send(formattedData);
});

export default router;
