import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import { json } from "@angular-devkit/core";
import {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
} from "@angular-devkit/build-angular";
import { serveBrowser } from "ng-cli-hooks";
import { Observable } from "rxjs";
import { IHookableOptions } from "../IHookable";

type DevServerSchema = IHookableOptions & DevServerBuilderOptions;

export function combinedServeBrowser(
  options: DevServerSchema,
  context: BuilderContext
): Observable<DevServerBuilderOutput> {
  const cliHooksOutput = serveBrowser(options, context);

  return cliHooksOutput;
}

export default createBuilder<json.JsonObject & DevServerSchema>(
  combinedServeBrowser
);
