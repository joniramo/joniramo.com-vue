import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ExperienceTimeline from "../../src/components/ExperienceTimeline.vue";

vi.mock("../../src/client", () => ({
  default: { fetch: vi.fn() },
}));

import sanity from "../../src/client";

const mockExperience = [
  {
    _id: "1",
    title: "Senior Engineer",
    company: "Acme Corp",
    dateFrom: "2022-01-01",
    dateTo: "2023-06-01",
    logoUrl: null,
    companyUrl: "https://acme.example.com",
  },
  {
    _id: "2",
    title: "Junior Engineer",
    company: "Beta Ltd",
    dateFrom: "2020-03-01",
    dateTo: null,
    logoUrl: null,
    companyUrl: null,
  },
];

beforeEach(() => {
  vi.resetAllMocks();
});

describe("ExperienceTimeline", () => {
  it("shows loading icon while fetching", () => {
    vi.mocked(sanity.fetch).mockReturnValue(new Promise(() => {}) as any);
    const wrapper = mount(ExperienceTimeline);
    expect(wrapper.findComponent({ name: "LoadingIcon" }).exists()).toBe(true);
    expect(wrapper.find(".timeline").exists()).toBe(false);
  });

  it("renders experience items after fetch resolves", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue(mockExperience as any);
    const wrapper = mount(ExperienceTimeline);
    await flushPromises();

    const items = wrapper.findAll(".timeline-item");
    expect(items).toHaveLength(2);
    expect(items[0].find("h3").text()).toContain("Senior Engineer");
    expect(items[0].find("h3").text()).toContain("Acme Corp");
    expect(items[1].find("h3").text()).toContain("Junior Engineer");
  });

  it("shows error message when fetch fails", async () => {
    vi.mocked(sanity.fetch).mockRejectedValue(new Error("Network error"));
    const wrapper = mount(ExperienceTimeline);
    await flushPromises();

    expect(wrapper.find(".error").exists()).toBe(true);
    expect(wrapper.find(".timeline").exists()).toBe(false);
  });

  it("formats date range with dateTo", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([mockExperience[0]] as any);
    const wrapper = mount(ExperienceTimeline);
    await flushPromises();

    const meta = wrapper.find(".meta").text();
    expect(meta).toContain("Jan 2022");
    expect(meta).toContain("Jun 2023");
  });

  it("shows Present when dateTo is null", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([mockExperience[1]] as any);
    const wrapper = mount(ExperienceTimeline);
    await flushPromises();

    expect(wrapper.find(".meta").text()).toContain("Present");
  });

  it("renders a link node when companyUrl is set", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([mockExperience[0]] as any);
    const wrapper = mount(ExperienceTimeline);
    await flushPromises();

    const node = wrapper.find(".node");
    expect(node.element.tagName).toBe("A");
    expect(node.attributes("href")).toBe("https://acme.example.com");
    expect(node.attributes("target")).toBe("_blank");
  });

  it("renders a div node when companyUrl is not set", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([mockExperience[1]] as any);
    const wrapper = mount(ExperienceTimeline);
    await flushPromises();

    const node = wrapper.find(".node");
    expect(node.element.tagName).toBe("DIV");
    expect(node.attributes("href")).toBeUndefined();
  });
});
