import { OpenAPIDocument } from "actionschema/types";
import { makeProxyOpenapi } from "../makeProxyOpenapi";
import { operations } from "../../openapi-types";
import untypedOpenapi from "../../../public/api/openapi.json";
import { OpenapiDocument } from "openapi-util";
import { resolveOpenapiAppRequest } from "openapi-util/build/resolveOpenapiAppRequest";

const openapi = untypedOpenapi as unknown as OpenAPIDocument;

export type PromiseOrNot<T> = Promise<T> | T;

/** Endpoint Function types creator */
export type Endpoint<T extends keyof operations> = (
  context: operations[T]["requestBody"]["content"]["application/json"],
) => PromiseOrNot<
  operations[T]["responses"][200]["content"]["application/json"]
>;

/** function creator to DRY */
const getHandler = (method: string) => (request: Request) =>
  resolveOpenapiAppRequest(request, method, {
    // TODO: this typing really needs to be improved
    openapi: openapi as unknown as OpenapiDocument,
    // Define your functions here
    functions: { makeProxyOpenapi },
  });

export const GET = getHandler("get");
export const POST = getHandler("post");
export const PUT = getHandler("put");
export const PATCH = getHandler("patch");
export const DELETE = getHandler("delete");
export const HEAD = getHandler("head");
export const OPTIONS = getHandler("options");
