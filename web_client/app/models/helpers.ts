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

export function changed(oldO: {}, newO: {}) {
  return Object.keys(newO).filter(k => !deepEqual(oldO[k], unObservify(newO[k])))
}

export function keepChanged<T>(oldO: T, newO: T): Partial<T> {
  const keys = changed(oldO, newO);
  const out = {};
  keys.forEach(k => { out[k] = newO[k] });
  return out;
}

export function removeChanged(oldO: {}, newO: {}, filterO: {}) {
  const out = {};
  Object.keys(filterO).forEach(k => {
    if (deepEqual(oldO[k], unObservify(newO[k]))) {
      out[k] = filterO[k];
    }
  });
  return out;
}

function unObservify(x: any) {
  // We can't compare Observables and non-observables. This deep-POJOs mobx
  // objects. TODO performance
  return x ? JSON.parse(JSON.stringify(x)) : x
}
