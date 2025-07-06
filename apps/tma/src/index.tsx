import { render } from "preact";
import { App } from "./app/app";
import { getQueryParams } from "./shared/lib/get-query.params";

const queryParams = getQueryParams();

if (queryParams.get("theme") === "dark") {
  document.body.dataset.theme = "dark";
}

render(<App />, document.getElementById("root") as HTMLElement);
