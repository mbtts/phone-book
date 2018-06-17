class Repository {
  constructor(items, selection) {
    this._items = items;
    this._selection = selection || items;
  }

  get selection() {
    return this._selection;
  }

  reset() {
    return new Repository(this._items);
  }

  sort(comparator) {
    const selection = [...this._items];
    selection.sort(comparator);
    return new Repository(this._items, selection);
  }

  filter(predicate) {
    const selection = this._items.filter(predicate);
    return new Repository(this._items, selection);
  }
}

export default Repository;
