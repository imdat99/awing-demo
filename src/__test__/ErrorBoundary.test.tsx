import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../views/components/ErrorBoundary";

test("ErrorBoundary renders errors Component", () => {
  const Foo: React.FC = () => {
    throw new Error("Oh no");
  };

  render(
    <ErrorBoundary>
      <Foo />
    </ErrorBoundary>
  );
  const errorScreen = screen.getByText("Something went wrong.");
  expect(errorScreen).toBeInTheDocument();
});
