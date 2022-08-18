import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import { json } from "@angular-devkit/core";
import { executeBrowserBuilder } from "@angular-devkit/build-angular";
import { BrowserBuilderSchema, buildBrowser } from "ng-cli-hooks";

export function combinedBuildBrowser(
  options: BrowserBuilderSchema,
  context: BuilderContext
): ReturnType<typeof executeBrowserBuilder> {
  const cliHooksOutput = buildBrowser(options, context);

  return cliHooksOutput;
}

export default createBuilder<json.JsonObject & BrowserBuilderSchema>(
  buildBrowser
);
