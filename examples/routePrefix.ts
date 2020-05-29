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
  return Promise.resolve("promise works!");
};

router
  .get("/", ({ response }: { response: any }) => {
    somePromise().then((res) => {
      response.status = 200;
      response.body = { msg: res };
    });
  })
  .get(
    "/:id",
    ({ params, response }: { params: { id: string }; response: any }) => {
      console.log("------with params-----");
      somePromise().then((res) => {
        response.status = 300;
        response.body = { msg: res };
      });
    },
  )
  .get(
    "/test",
    ({ params, response }: { params: { id: string }; response: any }) => {
      response.body = `test`;
    },
  );

console.log("server running");

await server.listen({ port });
