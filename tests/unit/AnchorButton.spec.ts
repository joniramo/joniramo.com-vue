import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AnchorButton from "../../src/components/AnchorButton.vue";

beforeEach(() => {
  Object.defineProperty(window, "location", {
    value: { origin: "https://example.com", pathname: "/cv" },
    writable: true,
  });
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

describe("AnchorButton", () => {
  it("renders slot content", () => {
    const wrapper = mount(AnchorButton, {
      props: { anchor: "section-1" },
      slots: { default: "<h2>Section</h2>" },
    });
    expect(wrapper.find("h2").text()).toBe("Section");
  });

  it("shows # on the button by default", () => {
    const wrapper = mount(AnchorButton, { props: { anchor: "section-1" } });
    expect(wrapper.find(".anchor-btn").text()).toBe("#");
  });

  it("makes button visible on mouseenter", async () => {
    const wrapper = mount(AnchorButton, { props: { anchor: "section-1" } });
    await wrapper.find(".anchor-heading").trigger("mouseenter");
    expect(wrapper.find(".anchor-btn").classes()).toContain("visible");
  });

  it("hides button on mouseleave", async () => {
    const wrapper = mount(AnchorButton, { props: { anchor: "section-1" } });
    await wrapper.find(".anchor-heading").trigger("mouseenter");
    await wrapper.find(".anchor-heading").trigger("mouseleave");
    expect(wrapper.find(".anchor-btn").classes()).not.toContain("visible");
  });

  it("copies the correct URL and shows ✓ on click", async () => {
    const wrapper = mount(AnchorButton, { props: { anchor: "my-section" } });
    await wrapper.find(".anchor-btn").trigger("click");
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "https://example.com/cv#my-section"
    );
    expect(wrapper.find(".anchor-btn").text()).toBe("✓");
    expect(wrapper.find(".anchor-btn").classes()).toContain("copied");
  });
});
