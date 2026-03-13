import {
  getDateString,
  getDateTimeString,
  sortAscendingByPublishedAt,
} from "../../src/utils/dates";
import type { Post } from "../../src/types";

const makePost = (publishedAt: string): Post => ({
  _id: publishedAt,
  title: "Test",
  slug: { current: publishedAt },
  categories: [],
  publishedAt,
  body: [],
  image: null,
});

describe("getDateTimeString", () => {
  it("returns placeholder string if value is undefined", () => {
    const dateStringUndefined = getDateTimeString(undefined);
    expect(dateStringUndefined).toEqual("some point in time");
  });

  it("returns a string that can be manipulated with Date API", () => {
    const dateString = getDateTimeString("2020-01-01");
    const timestamp = Date.parse(dateString);
    expect(timestamp).not.toBeNaN();
  });
});

describe("getDateString", () => {
  it("returns empty string if value is undefined", () => {
    const dateStringUndefined = getDateString(undefined);
    expect(dateStringUndefined).toEqual("");
  });

  it("returns a string that can be manipulated with Date API", () => {
    const dateString = getDateString("2020-01-01");
    const timestamp = Date.parse(dateString);
    expect(timestamp).not.toBeNaN();
  });
});

describe("sortAscendingByPublishedAt", () => {
  it("sorts newer posts before older posts", () => {
    const older = makePost("2020-01-01");
    const newer = makePost("2023-06-15");
    const result = [older, newer].sort(sortAscendingByPublishedAt);
    expect(result[0]).toBe(newer);
    expect(result[1]).toBe(older);
  });

  it("returns 0 for posts with equal publishedAt", () => {
    const a = makePost("2021-05-10");
    const b = makePost("2021-05-10");
    expect(sortAscendingByPublishedAt(a, b)).toBe(0);
  });

  it("sorts multiple posts newest-first", () => {
    const posts = [
      makePost("2021-01-01"),
      makePost("2023-01-01"),
      makePost("2019-01-01"),
    ].sort(sortAscendingByPublishedAt);
    expect(posts.map((p) => p.publishedAt)).toEqual([
      "2023-01-01",
      "2021-01-01",
      "2019-01-01",
    ]);
  });
});
