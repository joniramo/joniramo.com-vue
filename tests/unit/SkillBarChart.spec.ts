import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SkillBarChart from "../../src/components/SkillBarChart.vue";

vi.mock("../../src/client", () => ({
  default: { fetch: vi.fn() },
}));

import sanity from "../../src/client";

const mockSkills = [
  { _id: "1", title: "TypeScript", level: 90 },
  { _id: "2", title: "CSS", level: 60 },
  { _id: "3", title: "Rust", level: 20 },
];

beforeEach(() => {
  vi.resetAllMocks();
});

describe("SkillBarChart", () => {
  it("shows loading icon while fetching", () => {
    vi.mocked(sanity.fetch).mockReturnValue(new Promise(() => {}) as any);
    const wrapper = mount(SkillBarChart);
    expect(wrapper.findComponent({ name: "LoadingIcon" }).exists()).toBe(true);
    expect(wrapper.find(".skill-chart").exists()).toBe(false);
  });

  it("renders skills after fetch resolves", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue(mockSkills as any);
    const wrapper = mount(SkillBarChart);
    await flushPromises();

    expect(wrapper.findAll(".skill-row")).toHaveLength(3);
  });

  it("shows error message when fetch fails", async () => {
    vi.mocked(sanity.fetch).mockRejectedValue(new Error("Network error"));
    const wrapper = mount(SkillBarChart);
    await flushPromises();

    expect(wrapper.find(".error").exists()).toBe(true);
    expect(wrapper.find(".skill-chart").exists()).toBe(false);
  });

  it("renders skills sorted highest to lowest", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue(mockSkills as any);
    const wrapper = mount(SkillBarChart);
    await flushPromises();

    const labels = wrapper.findAll(".skill-label").map((el) => el.text());
    expect(labels).toEqual(["TypeScript", "CSS", "Rust"]);
  });

  it("sets bar width to the skill level percentage", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([mockSkills[0]] as any);
    const wrapper = mount(SkillBarChart);
    await flushPromises();

    const fill = wrapper.find(".skill-bar-fill");
    expect(fill.attributes("style")).toContain("width: 90%");
  });

  it("shows tooltip on mouseenter and hides on mouseleave", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([mockSkills[0]] as any);
    const wrapper = mount(SkillBarChart);
    await flushPromises();

    const row = wrapper.find(".skill-row");
    expect(wrapper.find(".skill-tooltip").exists()).toBe(false);

    await row.trigger("mouseenter");
    expect(wrapper.find(".skill-tooltip").exists()).toBe(true);

    await row.trigger("mouseleave");
    expect(wrapper.find(".skill-tooltip").exists()).toBe(false);
  });

  it("tooltip contains correct skill name and percentage", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([mockSkills[0]] as any);
    const wrapper = mount(SkillBarChart);
    await flushPromises();

    await wrapper.find(".skill-row").trigger("mouseenter");
    const tooltip = wrapper.find(".skill-tooltip").text();
    expect(tooltip).toContain("TypeScript");
    expect(tooltip).toContain("90%");
  });

  it("tooltip years calculation uses current year minus 2016", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([
      { _id: "1", title: "Go", level: 100 },
    ] as any);
    const wrapper = mount(SkillBarChart);
    await flushPromises();

    await wrapper.find(".skill-row").trigger("mouseenter");
    const careerYears = new Date().getFullYear() - 2016;
    const tooltip = wrapper.find(".skill-tooltip").text();
    expect(tooltip).toContain(`${careerYears} years`);
  });
});
