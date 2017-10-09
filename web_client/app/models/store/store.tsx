import { observable, computed, action, ObservableMap } from 'mobx';

interface Storable<J> {
  id: string
  updateFromFetch(json: Partial<J>): void
}

interface StorableJSON {
  id: string
}

// Workaround because mobx can't handle static properties right now.
export class Store<T extends Storable<J>, J extends StorableJSON> {
  @observable currentprojectId: string
  db: ObservableMap<T>
  indices: { [name: string]: ObservableMap<T[]> }
  indexNames: string[]

  constructor(private Klass: { new (incoming: Partial<J>): T }, indices: string[] = []) {
    this.indexNames = indices;
    this.reset()
  }

  @action
  indexValue(value: T, oldValue: string, indexColumn: string) {
    const index = this.indices[indexColumn];
    const oldList = index.get(oldValue);
    if (oldList) {
      index.set(oldValue, oldList.filter(v => v != value));
    }
    if (!value[indexColumn]) return;
    const list = index.get(value[indexColumn]) || [];
    index.set(value[indexColumn], list.concat([value]));
  }

  @action
  upsert(incoming: Partial<J>) {
    if (this.db.has(incoming.id)) {
      this.db.get(incoming.id).updateFromFetch(incoming);
    } else {
      const newT = new this.Klass(incoming);
      this.db.set(incoming.id, newT);
    }

    return this.db.get(incoming.id);
  }

  @action
  upsertList(incoming: Partial<J>[]) {
    return incoming.map(f => this.upsert(f))
  }

  get(id: string) {
    return this.db.get(id);
  }

  where(filter: (f: T) => boolean) {
    return this.db.values().filter(filter);
  }

  index() {
    return this.db.values()
  }

  remove(item: T) {
    Object.keys(this.indices).forEach(indexColumn => {
      const list = this.indices[indexColumn].get(item[indexColumn]);
      if (list) {
        this.indices[indexColumn].set(item[indexColumn], list.filter(i => i != item));
      }
    })
    this.db.delete(item.id);
  }

  reset() {
    this.db = observable.shallowMap({} as { [id: string]: T });
    this.indices = {};
    this.indexNames.forEach(i => {
      this.indices[i] = observable.shallowMap({} as { [value: string]: T[] });
    })
  }
};
