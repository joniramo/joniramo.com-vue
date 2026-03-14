import { mount } from "@vue/test-utils";
import { createHead } from "@unhead/vue/client";
import Home from "../../src/views/Home.vue";

describe("Home.vue", () => {
  it("renders", () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [createHead()],
        stubs: ["router-link", "router-view"],
      },
    });
    expect(wrapper.html()).toContain("Joni Rämö");
  });
});
