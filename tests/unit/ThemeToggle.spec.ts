import { mount, flushPromises } from "@vue/test-utils";
import ThemeToggle from "../../src/components/ThemeToggle.vue";

describe("ThemeToggle.vue", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = "";
  });

  it("applies light theme to body when no localStorage value is set", async () => {
    mount(ThemeToggle, {
      global: { stubs: ["ToggleIconLight", "ToggleIconDark"] },
    });
    await flushPromises();
    expect(document.body.className).toBe("light");
  });

  it("applies dark theme to body when localStorage has darkTheme=true", async () => {
    localStorage.setItem("darkTheme", "true");
    mount(ThemeToggle, {
      global: { stubs: ["ToggleIconLight", "ToggleIconDark"] },
    });
    await flushPromises();
    expect(document.body.className).toBe("dark");
  });

  it("persists theme choice to localStorage on mount", async () => {
    mount(ThemeToggle, {
      global: { stubs: ["ToggleIconLight", "ToggleIconDark"] },
    });
    await flushPromises();
    expect(localStorage.getItem("darkTheme")).toBe("false");
  });

  it("toggles to dark theme when checkbox is checked", async () => {
    const wrapper = mount(ThemeToggle, {
      global: { stubs: ["ToggleIconLight", "ToggleIconDark"] },
    });
    await flushPromises();
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setValue(true);
    expect(document.body.className).toBe("dark");
    expect(localStorage.getItem("darkTheme")).toBe("true");
  });

  it("toggles back to light theme when checkbox is unchecked", async () => {
    localStorage.setItem("darkTheme", "true");
    const wrapper = mount(ThemeToggle, {
      global: { stubs: ["ToggleIconLight", "ToggleIconDark"] },
    });
    await flushPromises();
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setValue(false);
    expect(document.body.className).toBe("light");
    expect(localStorage.getItem("darkTheme")).toBe("false");
  });
});
