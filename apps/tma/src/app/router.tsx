import { type JSX } from "preact/jsx-runtime";
import { Route, Switch } from "wouter-preact";
import { Suspense, lazy } from "preact/compat";

type CustomRoute = {
  path: string;
  component: () => () => JSX.Element;
};

const routes: CustomRoute[] = [
  {
    path: "/",
    component: () => lazy(async () => (await import("@/pages/home")).Page),
  },
];

const Router = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} path={route.path}>
          <CustomRoute component={route.component} />
        </Route>
      ))}

      <Route>404: No such page!</Route>
    </Switch>
  );
};

const CustomRoute = ({ component }: { component: () => () => JSX.Element }) => {
  const Component = component();

  return (
    <Suspense fallback="">
      <Component />
    </Suspense>
  );
};

export { Router };
