import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import KoaRouter from "koa-router";
import pino from "pino";
import { Model } from "objection";
import Knex from "knex";

import { meaningOfLife } from "common";

const logger = pino({
  prettyPrint: {
    colorize: true,
  },
});

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

class MoveData extends Model {
  id!: number;
  name!: string;

  static override get tableName() {
    return "moves";
  }
}

const router = new KoaRouter();

router.get("meaningOfLife", "/meaningOfLife", (ctx) => {
  logger.info("Someone's looking for the meaning of life?");
  ctx.body = `The meaning of life is ${meaningOfLife()}`;
});

router.get("moves", "/moves", async (ctx) => {
  const dbMoves = await MoveData.query();
  ctx.body = dbMoves;
});

router.get("move", "/move/:id", async (ctx) => {
  const moveId = ctx.params.id;
  const dbMove = await MoveData.query().findById(moveId);

  if (!dbMove) {
    ctx.status = 404;
    ctx.body = `Could not find move with id ${moveId}`;
    return;
  }

  ctx.body = dbMove;
});

router.get("error", "/error", async () => {
  throw new Error("Test error!");
});

const port = 8000;

const app = new Koa();

app.use(cors());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.on("error", (err) => {
  logger.info(err, "Encountered an error!");
});

async function main() {
  logger.info("BJJ Classified: db-accessor initializing");
  app.listen(port, () => logger.info(`Listening on port ${port}`));
}

main();
