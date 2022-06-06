import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

test('checks page title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/todos/i);
  expect(titleElement).toBeInTheDocument();
});

test('checks if input is focused', () => {
  const { getByPlaceholderText } = render(<App />);
  const input = getByPlaceholderText('Enter task name');
  expect(input).toHaveFocus();
});

test('test create new todo', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const input = getByPlaceholderText('Enter task name');
  userEvent.type(input, "TaskName");
  fireEvent.submit(input);
  const titleElement = getByText(/TaskName/i);
  expect(titleElement).toBeInTheDocument();
});