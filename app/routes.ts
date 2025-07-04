import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("traditional-super-heroes", "routes/traditional-super-heroes.tsx"),
  route("rq-super-heroes", "routes/rq-super-heroes.tsx"),
  route("rq-super-heroes/:id", "routes/rq-super-heroe.tsx"),
  route(
    "rq-super-heroes-parallel-queries",
    "routes/rq-super-heroes-parallel-queries.tsx"
  ),
] satisfies RouteConfig;
