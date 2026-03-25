import { mount, flushPromises } from "@vue/test-utils";
import { createHead } from "@unhead/vue/client";
import { vi } from "vitest";
import type { Post } from "../../src/types";

const mockPosts: Post[] = [
  {
    _id: "post-1",
    title: "Vue Basics",
    slug: { current: "vue-basics" },
    categories: [],
    publishedAt: "2023-01-01",
    body: [],
    image: null,
  },
  {
    _id: "post-2",
    title: "TypeScript Tips",
    slug: { current: "typescript-tips" },
    categories: [],
    publishedAt: "2022-06-15",
    body: [],
    image: null,
  },
  {
    _id: "post-3",
    title: "Full Stack",
    slug: { current: "full-stack" },
    categories: [],
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
      plugins: [createHead()],
      stubs: ["router-link", "LoadingIcon"],
    },
  });

describe("Blog.vue", () => {
  beforeEach(() => {
    vi.mocked(sanity.fetch).mockResolvedValueOnce(mockPosts as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
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
