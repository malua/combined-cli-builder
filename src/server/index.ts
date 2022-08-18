import { Observable } from "rxjs";
import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import { json } from "@angular-devkit/core";
import {
  ServerBuilderOptions,
  ServerBuilderOutput,
} from "@angular-devkit/build-angular";
import { server } from "ng-cli-hooks";
import { IHookableOptions } from "../IHookable";

type ServerSchema = IHookableOptions & ServerBuilderOptions;

export function combinedServer(
  options: ServerSchema,
  context: BuilderContext
): Observable<ServerBuilderOutput> {
  return server(options, context);
}

export default createBuilder<json.JsonObject & ServerSchema>(combinedServer);
