import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import KoaRouter from "koa-router";
import { Model } from "objection";
import Knex from "knex";
import koaPinoLogger from "koa-pino-logger";

import { meaningOfLife } from "common";
import { MoveData } from "./data/MoveData";
import { VideoData } from "./data/VideoData";
import { EventData } from "./data/EventData";

const loggerMiddleware = koaPinoLogger({
  prettyPrint: { colorize: true, translateTime: true },
});
const logger = loggerMiddleware.logger;

const knex = Knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 8001,
    user: "root",
    password: "p@ssw0rd1",
    database: "bjj_classified",
  },
});

Model.knex(knex);

const router = new KoaRouter();

router.get("meaningOfLife", "/meaningOfLife", (ctx) => {
  logger.info("Someone's looking for the meaning of life?");
  ctx.body = `The meaning of life is ${meaningOfLife()}`;
});

router.get("moves", "/moves", async (ctx) => {
  const dbMoves = await MoveData.query();
  ctx.body = dbMoves;
});

router.get("move", "/moves/:id", async (ctx) => {
  const moveId = ctx.params.id;

  if (!moveId) {
    ctx.throw(400, "Missing moveId");
  }

  const dbMove = await MoveData.query().findById(moveId);

  if (!dbMove) {
    ctx.status = 404;
    ctx.body = `Could not find move with id ${moveId}`;
    return;
  }

  ctx.body = dbMove;
});

router.get("moveVideos", "/moves/:id/videos", async (ctx) => {
  const moveId = ctx.params.id;

  if (!moveId) {
    ctx.throw(400, "Missing moveId");
  }

  const dbVideos = await VideoData.query()
    .joinRelated("events")
    .where("events.moveId", moveId)
    .withGraphFetched("events.move");

  ctx.body = dbVideos;
});

router.get("events", "/events", async (ctx) => {
  const dbEvents = await EventData.query().withGraphFetched("[move, video]");

  ctx.body = dbEvents;
});

router.get("videos", "/videos", async (ctx) => {
  const dbVideos = await VideoData.query();
  ctx.body = dbVideos;
});

router.get("error", "/error", async () => {
  throw new Error("Test error!");
});

const port = 8000;

const app = new Koa();

app.use(loggerMiddleware);

app.use(cors());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

async function main() {
  logger.info("BJJ Classified: db-accessor initializing");
  app.listen(port, () => logger.info(`Listening on port ${port}`));
}

main();
