import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";

const testEpisode = {
    airdate: "2016-07-15",
    airstamp: "2016-07-15T12:00:00+00:00",
    airtime: "",
    id: 553946,
    image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
    name: "Chapter One: The Vanishing of Will Byers",
    number: 1,
    rating: { average: 8.2 },
    runtime: 49,
    season: 1,
    summary:
        "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
    type: "regular",
    url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
}

const testEpisodeWithoutImage = {
    id: 1,
    image: null,
    name: "",
    number: 1,
    runtime: 1,
    season: 1,
    summary:
        "test summary",
    
}

test("renders without error", () => {
    render(<Episode episode={testEpisode} />);
});

test("renders the summary test passed as prop", () => {
    render(<Episode episode={testEpisode} />);

    const summary = screen.queryByText(/A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest./i);
    
    expect(summary).toBeInTheDocument();
    expect(summary).toBeTruthy();
    expect(summary).toHaveTextContent("A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.");
});

test("renders default image when image is not defined", () => {
    render(<Episode episode={testEpisodeWithoutImage} />);

    const image = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
    
    expect(image).toBeInTheDocument();

});



// - [ ] Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
// - [ ] Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. **Use at least then 3 different types of expect statements to test the the existence of the summary value.**
// - [ ] The episode component displays a default value ('https://i.ibb.co/2FsfXqM/stranger-things.png') when a image url is not provided. Create a new piece of test data with the image property set to `null`. Test that the alt tag of the image displayed is set to './stranger_things.png'.