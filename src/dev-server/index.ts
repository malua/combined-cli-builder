import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import { json } from "@angular-devkit/core";
import {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
  executeDevServerBuilder,
} from "@angular-devkit/build-angular";
import { Observable, from } from "rxjs";
import { IHookableOptions } from "../IHookable";
import { modifyIndexHtml, modifyOptions, modifyWebpack } from "../modifiers";
import { switchMap } from "rxjs/operators";
import { getTargetOptions } from "../utils";

type DevServerSchema = IHookableOptions & DevServerBuilderOptions;

export function combinedServeBrowser(
  options: DevServerSchema,
  context: BuilderContext
): Observable<DevServerBuilderOutput> {
  const originalGetTargetOption = context.getTargetOptions;
  context.getTargetOptions = async (target) => {
    const opts = await originalGetTargetOption(target);
    return modifyOptions(opts, context);
  };
  return from(getTargetOptions(options, context)).pipe(
    switchMap((targetOptions) =>
      executeDevServerBuilder(modifyOptions(options, context), context, {
        webpackConfiguration: modifyWebpack(targetOptions, context),
        indexHtml: modifyIndexHtml(targetOptions, context),
      })
    )
  );
}

export default createBuilder<json.JsonObject & DevServerSchema>(
  combinedServeBrowser
);
