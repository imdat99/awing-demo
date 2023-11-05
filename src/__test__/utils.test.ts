import { deepCompare, deepCopy, validate } from "../common/utils";
import { initState } from "../store/reducer";
describe("Test ultils function", () => {
  it("Return new Object with same key and value", () => {
    const copiedObj = deepCopy(initState);

    expect(copiedObj).not.toBe(initState);

    expect(copiedObj).toEqual(initState);
  });
  it("Validation Campaign Object", () => {
    expect(validate(initState.campaignData)).toEqual(false);
    initState.campaignData.infomation.name = "name";
    initState.campaignData.subCampaigns[0].ads[0].quantity = 1;
    expect(validate(initState.campaignData)).toEqual(true);
  });
  test("deepCompare should correctly compare objects", () => {
    const obj1 = {
      name: "John",
      age: 30,
      address: {
        city: "New York",
        zip: "10001",
      },
      book: [
        {
          id: 1,
          name: "book1",
          category: "cat1",
        },
      ],
    };

    const obj2 = {
      name: "John",
      age: 30,
      address: {
        city: "New York",
        zip: "10001",
      },
      book: [
        {
          id: 1,
          name: "book1",
          category: "cat1",
        },
      ],
    };

    const obj3 = {
      name: "John",
      age: 30,
      address: {
        city: "New York",
        zip: "10001",
      },
      book: [
        {
          id: 1,
          name: "book2",
          category: "cat1",
        },
      ],
    };

    expect(deepCompare(obj1, obj2)).toBe(true);

    expect(deepCompare(obj1, obj3)).toBe(false);
  });
});
