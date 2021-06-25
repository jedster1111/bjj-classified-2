import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import KoaRouter from "koa-router";
import pino from "pino";

import { meaningOfLife } from "common";

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

router.get("moves", "/moves", (ctx) => {
  ctx.body = [
    { id: 1, name: "Triangle Choke" },
    { id: 2, name: "Armbar" },
  ];
});

router.get("error", "/error", async (ctx) => {
  ctx.throw("This is an endpoint to test error handling!");
});

const port = 8000;

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(err as Error, "Error encountered!");

    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

app.use(cors());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

async function main() {
  logger.info("BJJ Classified: db-accessor initializing");
  app.listen(port, () => logger.info(`Listening on port ${port}`));
}

main();
