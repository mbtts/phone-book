import Repository from "./";

describe("repository", () => {
  let repository;

  beforeEach(() => {
    repository = new Repository(["apple", "pear", "banana"]);
  });

  it("sorts a selection but does not modify the underlying collection", () => {
    repository = repository.sort((a, b) => a.localeCompare(b));
    expect(repository.selection).toEqual(["apple", "banana", "pear"]);
    expect(repository._items).toEqual(["apple", "pear", "banana"]);
  });

  it("filters a selection but does not modify the underlying collection", () => {
    repository = repository.filter(item => item === "banana");
    expect(repository.selection).toEqual(["banana"]);
    expect(repository._items).toEqual(["apple", "pear", "banana"]);
  });

  it("resets a selection after modification", () => {
    repository = repository.sort((a, b) => a.localeCompare(b));
    repository = repository.filter(item => item === "banana");
    repository = repository.reset();
    expect(repository.selection).toEqual(["apple", "pear", "banana"]);
  });
});
