import { render } from "@testing-library/react";
import posts from "../../mock/posts";
import PostCard from "./post-card";

it('SignIn Component Test', () => {
    render(<PostCard {...posts[0]}/>)
});