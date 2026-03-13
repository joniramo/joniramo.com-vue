import { hashtagify } from "../../src/utils/string";

describe("hashtagify", () => {
  it("prepends # to a string", () => {
    expect(hashtagify("vue")).toBe("#vue");
  });

  it("lowercases the string", () => {
    expect(hashtagify("TypeScript")).toBe("#typescript");
  });

  it("handles mixed case", () => {
    expect(hashtagify("WebDev")).toBe("#webdev");
  });

  it("handles an empty string", () => {
    expect(hashtagify("")).toBe("#");
  });
});
