import { mount, flushPromises } from "@vue/test-utils";
import { vi } from "vitest";
import type { Category, Post } from "../../src/types";

const mockCategories: Category[] = [
  { _id: "cat-1", title: "Vue" },
  { _id: "cat-2", title: "TypeScript" },
];

const mockPosts: Post[] = [
  {
    _id: "post-1",
    title: "Vue Basics",
    slug: { current: "vue-basics" },
    categories: [{ _id: "cat-1", title: "Vue" }],
    publishedAt: "2023-01-01",
    body: [],
    image: null,
  },
  {
    _id: "post-2",
    title: "TypeScript Tips",
    slug: { current: "typescript-tips" },
    categories: [{ _id: "cat-2", title: "TypeScript" }],
    publishedAt: "2022-06-15",
    body: [],
    image: null,
  },
  {
    _id: "post-3",
    title: "Full Stack",
    slug: { current: "full-stack" },
    categories: [
      { _id: "cat-1", title: "Vue" },
      { _id: "cat-2", title: "TypeScript" },
    ],
    publishedAt: "2021-03-10",
    body: [],
    image: null,
  },
];

vi.mock("../../src/client", () => ({
  default: {
    fetch: vi.fn(),
  },
}));

import sanity from "../../src/client";
import Blog from "../../src/views/Blog.vue";

const mountBlog = () =>
  mount(Blog, {
    global: {
      stubs: ["router-link", "LoadingIcon"],
    },
  });

describe("Blog.vue", () => {
  beforeEach(() => {
    vi.mocked(sanity.fetch)
      .mockResolvedValueOnce(mockCategories as any)
      .mockResolvedValueOnce(mockPosts as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders all posts when no category is selected", async () => {
    const wrapper = mountBlog();
    await flushPromises();
    const posts = wrapper.findAll(".post");
    expect(posts).toHaveLength(3);
  });

  it("shows only posts for the selected category", async () => {
    const wrapper = mountBlog();
    await flushPromises();
    const categoryButtons = wrapper.findAll("button.category");
    await categoryButtons[0].trigger("click");
    const posts = wrapper.findAll(".post");
    expect(posts).toHaveLength(2);
    expect(wrapper.html()).toContain("/blog/vue-basics");
    expect(wrapper.html()).toContain("/blog/full-stack");
    expect(wrapper.html()).not.toContain("/blog/typescript-tips");
  });

  it("deselects a category when clicked again, showing all posts", async () => {
    const wrapper = mountBlog();
    await flushPromises();
    const categoryButtons = wrapper.findAll("button.category");
    await categoryButtons[0].trigger("click");
    await categoryButtons[0].trigger("click");
    const posts = wrapper.findAll(".post");
    expect(posts).toHaveLength(3);
  });

  it("switches selected category when a different one is clicked", async () => {
    const wrapper = mountBlog();
    await flushPromises();
    const categoryButtons = wrapper.findAll("button.category");
    await categoryButtons[0].trigger("click");
    await categoryButtons[1].trigger("click");
    const posts = wrapper.findAll(".post");
    expect(posts).toHaveLength(2);
    expect(wrapper.html()).toContain("/blog/typescript-tips");
    expect(wrapper.html()).toContain("/blog/full-stack");
    expect(wrapper.html()).not.toContain("/blog/vue-basics");
  });

  it("marks the active category button with the active class", async () => {
    const wrapper = mountBlog();
    await flushPromises();
    const categoryButtons = wrapper.findAll("button.category");
    await categoryButtons[0].trigger("click");
    expect(categoryButtons[0].classes()).toContain("active");
    expect(categoryButtons[1].classes()).not.toContain("active");
  });

  it("shows error message when fetch fails", async () => {
    vi.mocked(sanity.fetch).mockReset();
    vi.mocked(sanity.fetch).mockRejectedValue(new Error("Network error"));
    const wrapper = mountBlog();
    await flushPromises();
    expect(wrapper.find(".error").exists()).toBe(true);
  });

  it("hides loading indicator after data is fetched", async () => {
    const wrapper = mountBlog();
    await flushPromises();
    expect(wrapper.find(".loading").exists()).toBe(false);
  });
});
