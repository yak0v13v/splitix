import { Route, Switch } from "wouter-preact";

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={() => <h1>Hello world</h1>} />

      <Route path="/test">
        <h1>Test Page</h1>
      </Route>

      <Route>404: No such page!</Route>
    </Switch>
  );
};

export { Router };
