import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BlogPostCard from "../../src/components/BlogPostCard.vue";
import type { Post } from "../../src/types";

const mockPost: Post = {
  _id: "post-1",
  title: "Hello World",
  slug: { current: "hello-world" },
  publishedAt: "2024-03-01",
  body: [],
  image: null,
};

const mountCard = () =>
  mount(BlogPostCard, {
    props: { post: mockPost },
    global: { stubs: { RouterLink: RouterLinkStub } },
  });

describe("BlogPostCard", () => {
  it("renders the post title", () => {
    const wrapper = mountCard();
    expect(wrapper.find("h2").text()).toBe("Hello World");
  });

  it("renders the formatted date", () => {
    const wrapper = mountCard();
    expect(wrapper.find(".date").text()).toBeTruthy();
  });

  it("links to the correct blog post URL", () => {
    const wrapper = mountCard();
    const link = wrapper.findComponent(RouterLinkStub);
    expect(link.props("to")).toBe("/blog/hello-world");
  });
});
