const Koa = require("koa");
const KoaRouter = require("koa-router");
const dotenv = require("dotenv");
const KoaBodyParser = require("koa-bodyparser");
const KoaLogger = require("koa-logger");

dotenv.config();

const endpoint_webhook = require("./endpoints/webhook");

const app = new Koa();
const router_webhook = new KoaRouter();

router_webhook.post("/webhook", endpoint_webhook);
router_webhook.get("/webhook", endpoint_webhook);
router_webhook.get("/", ctx => (ctx.body = "Hello World"));

if (process.env.NODE_ENV !== "test") {
  app.use(KoaLogger());
}
app.use(KoaBodyParser());
app.use(router_webhook.routes());

module.exports = app;
