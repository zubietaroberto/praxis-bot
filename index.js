const Koa = require("koa");
const KoaRouter = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const endpoint_webhook = require("./endpoints/webhook");

const app = new Koa();
const router_webhook = new KoaRouter();

router_webhook.post("/webhook", endpoint_webhook);
router_webhook.get("/webhook", endpoint_webhook);
router_webhook.get("/", ctx => (ctx.body = "Hello World"));

app.use(router_webhook.routes());

app.listen(3000);
