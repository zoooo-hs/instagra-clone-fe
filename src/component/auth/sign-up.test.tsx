import { render, screen } from "@testing-library/react";
import SignUp from "./sign-up";

it('SignIn Component Test', () => {
    render(<SignUp/>)
    const labelStrings = ["Email", "Password", "Name"]
    labelStrings.forEach(labelString => {
        const input = screen.getByLabelText(labelString);
        expect(input).toBeInTheDocument();
    });
});