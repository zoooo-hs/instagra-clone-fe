import { render, screen } from "@testing-library/react";
import SignIn from "./sign-in";

it('SignIn Component Test', () => {
    render(<SignIn/>)
    const labelStrings = ["Email", "Password"]
    labelStrings.forEach(labelString => {
        const input = screen.getByLabelText(labelString);
        expect(input).toBeInTheDocument();
    });
});