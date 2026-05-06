import { render, screen } from "@testing-library/react"
import Container from "../components/ui/Container"

test("renders children", () => {
  render(<Container>Test</Container>)
  expect(screen.getByText("Test")).toBeInTheDocument()
})