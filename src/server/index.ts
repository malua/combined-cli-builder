import { Observable } from "rxjs";
import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import { json } from "@angular-devkit/core";
import {
  executeServerBuilder,
  ServerBuilderOptions,
  ServerBuilderOutput,
} from "@angular-devkit/build-angular";
import { IHookableOptions } from "../IHookable";
import { modifyOptions, modifyWebpack } from "../modifiers";

type ServerSchema = IHookableOptions & ServerBuilderOptions;

export function combinedServer(
  options: ServerSchema,
  context: BuilderContext
): Observable<ServerBuilderOutput> {
  return executeServerBuilder(modifyOptions(options, context), context, {
    webpackConfiguration: modifyWebpack(options, context),
  });
}

export default createBuilder<json.JsonObject & ServerSchema>(combinedServer);
