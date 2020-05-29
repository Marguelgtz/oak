import {
  Application,
  Router,
} from "../mod.ts";
const router = new Router({
  prefix: "/prefix",
  // strict: true,
});

const port = 4000;

const server = new Application();

server.use(
  router.routes(),
  router.allowedMethods(),
);

const somePromise = async () => {
  return Promise.resolve({ status: 300, body: "promise works!" });
};

router
  .get("/", async ({ response }: { response: any }) => {
    response.status = 200;
    response.body = await somePromise().then((res) => res);
  })
  .get(
    "/:id",
    async ({ params, response }: { params: { id: string }; response: any }) => {
      console.log("------with params-----");
      await somePromise().then((res) => {
        response.status = res.status;
        response.body = res.body;
      });
    },
  )
  .get(
    "/test",
    ({ params, response }: { params: { id: string }; response: any }) => {
      somePromise()
        .then((res) => {
          response.status = 200; // This works
          response.body = "body test"; // Doesn't work
        });
    },
  );

console.log("server running");

await server.listen({ port });
