import { render, screen } from "@testing-library/react";
import PostForm from "./post-form";

it('SignIn Component Test', () => {
    render(<PostForm/>)
    const labelStrings = ["Photos", "Description"]
    labelStrings.forEach(labelString => {
        const input = screen.getByLabelText(labelString);
        expect(input).toBeInTheDocument();
    });
});