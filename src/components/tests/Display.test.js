import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import userEvent from '@testing-library/user-event';
import mockFetchShow from './../../api/fetchShow'
jest.mock('./../../api/fetchShow')

test('renders without errors with no props', async () => {
    render(<Display />);
 });

 const testShow = {
    name: "test show",
    summary: "test summary",
    seasons: [
        {
            id: 0,
            name: "season 1",
            episodes: []
        },
        {
            id: 1,
            name: "season 2",
            episodes: []
        }
    ]

}

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)

    render(<Display  />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
 });

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(testShow)

    render(<Display  />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(()=>{
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(2);
    }) 
});

test('displayFunc is called when the fetch button is pressed', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled()
    })

})

// > _This component holds the state values of the application and handles api calls. In this component's tests, you work with mocking external modules and working with async / await / waitFor_

// - [ ] Test that the Display component renders without any passed in props.
// - [ ] Rebuild or copy the show test data element as used in the previous set of tests.
// - [ NC] Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
// - [ Not Completed] Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
// - [ NC] Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
