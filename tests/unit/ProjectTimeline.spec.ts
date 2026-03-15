import { mount, flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProjectTimeline from "../../src/components/ProjectTimeline.vue";

vi.mock("../../src/client", () => ({
  default: { fetch: vi.fn() },
}));

import sanity from "../../src/client";

const mockProjects = [
  {
    _id: "1",
    title: "Project Alpha",
    dateFrom: "2022-01-01",
    dateTo: "2023-06-01",
    company: "Acme Corp",
    description: "A great project.",
  },
  {
    _id: "2",
    title: "Project Beta",
    dateFrom: "2023-07-01",
    dateTo: null,
    company: null,
    description: "An ongoing project.",
  },
];

beforeEach(() => {
  vi.resetAllMocks();
});

describe("ProjectTimeline", () => {
  it("shows loading icon while fetching", () => {
    vi.mocked(sanity.fetch).mockReturnValue(new Promise(() => {}) as any);
    const wrapper = mount(ProjectTimeline);
    expect(wrapper.findComponent({ name: "LoadingIcon" }).exists()).toBe(true);
    expect(wrapper.find(".timeline").exists()).toBe(false);
  });

  it("renders projects after fetch resolves", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue(mockProjects as any);
    const wrapper = mount(ProjectTimeline);
    await flushPromises();

    const items = wrapper.findAll(".timeline-item");
    expect(items).toHaveLength(2);
    expect(items[0].find("h3").text()).toBe("Project Alpha");
    expect(items[1].find("h3").text()).toBe("Project Beta");
  });

  it("shows error message when fetch fails", async () => {
    vi.mocked(sanity.fetch).mockRejectedValue(new Error("Network error"));
    const wrapper = mount(ProjectTimeline);
    await flushPromises();

    expect(wrapper.find(".error").exists()).toBe(true);
    expect(wrapper.find(".timeline").exists()).toBe(false);
  });

  it("formats date range with dateTo", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([mockProjects[0]] as any);
    const wrapper = mount(ProjectTimeline);
    await flushPromises();

    const meta = wrapper.find(".meta").text();
    expect(meta).toContain("Jan 2022");
    expect(meta).toContain("Jun 2023");
    expect(meta).toContain("Acme Corp");
  });

  it("shows Present when dateTo is null", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([mockProjects[1]] as any);
    const wrapper = mount(ProjectTimeline);
    await flushPromises();

    expect(wrapper.find(".meta").text()).toContain("Present");
  });

  it("omits company separator when company is null", async () => {
    vi.mocked(sanity.fetch).mockResolvedValue([mockProjects[1]] as any);
    const wrapper = mount(ProjectTimeline);
    await flushPromises();

    expect(wrapper.find(".meta").text()).not.toContain("·");
  });
});
