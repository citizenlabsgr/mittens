const deepEqual = require('deep-equal') as (a: any, b: any) => boolean

export function camelCase(s: string) {
  return s.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

export function snakeCase(s: string) {
  return s.replace(/([A-Z])/g, function($1) { return "_" + $1.toLowerCase(); });
}

export function camelCaseObject(o: { [key: string]: any }) {
  const ret = {};
  Object.keys(o).map(k => ret[camelCase(k)] = o[k]);
  return ret;
}

export function snakeCaseObject(o: { [key: string]: any }) {
  const ret = {};
  Object.keys(o).map(k => ret[snakeCase(k)] = o[k]);
  return ret;
}