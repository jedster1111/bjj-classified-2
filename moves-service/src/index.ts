import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import KoaRouter from "koa-router";
import pino from "pino";

import { meaningOfLife, Move } from "common";

const logger = pino({
  prettyPrint: {
    colorize: true,
  },
});

const router = new KoaRouter();

router.get("meaningOfLife", "/meaningOfLife", (ctx) => {
  logger.info("Someone's looking for the meaning of life?");
  ctx.body = `The meaning of life is ${meaningOfLife()}`;
});

const moves: Move[] = [
  { id: "1", name: "Triangle Choke" },
  { id: "2", name: "Armbar" },
];

router.get("moves", "/moves", (ctx) => {
  ctx.body = moves;
});

router.get("move", "/move/:id", (ctx) => {
  const moveId = ctx.params.id;
  const move = moves.find((move) => move.id === moveId);

  if (!move) {
    ctx.status = 404;
    ctx.body = `Could not find move with id ${moveId}`;
    return;
  }

  ctx.body = move;
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
