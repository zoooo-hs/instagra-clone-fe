import { render, screen } from "@testing-library/react";
import GND from "./gnd";

it('SignIn Component Test', () => {
    render(<GND />);
    const element = screen.getByText(/Instagram Clone Project/i);
    expect(element).toBeInTheDocument();
});