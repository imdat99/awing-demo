import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomTab, { TabPanel } from "../views/components/CustomTab";
import { act } from "react-dom/test-utils";

// Test case
describe("Customtab", () => {
  it("CustomTab renders tabs and switches between them", () => {
    render(
      <CustomTab>
        <TabPanel label="Tab 1">Content of Tab 1</TabPanel>
        <TabPanel label="Tab 2">Content of Tab 2</TabPanel>
        <TabPanel label="Tab 3">Content of Tab 3</TabPanel>
      </CustomTab>
    );

    const tab1 = screen.getByText("Tab 1");
    const tab2 = screen.getByText("Tab 2");
    const tab3 = screen.getByText("Tab 3");

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();

    expect(tab1).toHaveClass("Mui-selected");
    const contentTab1 = screen.getByText("Content of Tab 1");
    expect(contentTab1).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(tab2);
    });

    expect(tab2).toHaveClass("Mui-selected");

    const contentTab2 = screen.getByText("Content of Tab 2");
    expect(contentTab2).toBeInTheDocument();
  });

  it("CustomTab renders tabs and another Hmtl tags", () => {
    expect(() =>
      render(
        <CustomTab>
          <TabPanel label="Tab 1">Content of Tab 1</TabPanel>
          <div>Custom Content</div>
        </CustomTab>,
        {}
      )
    ).toThrowError();
  });
});
