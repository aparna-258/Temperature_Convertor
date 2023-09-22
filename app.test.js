import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.js";

afterEach(cleanup);

test("user is able to convert from celsius to fahrenheit", () => {
  render(<App />);
  const input = screen.getByLabelText("Temperature:");
  userEvent.type(input, "25");
  expect(screen.getByText("25ºC equals to 77ºF")).toBeTruthy();
  userEvent.type(input, "0");
  expect(screen.getByText("0ºC equals to 32ºF")).toBeTruthy();
  userEvent.type(input, "banana");
  expect(screen.queryByTestId("result")).toBeFalsy();
});

test("user is able to convert from fahrenheit to celsius", () => {
  render(<App />);
  const fahrenheitOption = screen.getByLabelText("Fahrenheit to Celsius");
  userEvent.click(fahrenheitOption);
  const input = screen.getByLabelText("Temperature:");
  userEvent.type(input, "77");
  expect(screen.getByText("77ºF equals to 25ºC")).toBeTruthy();
  userEvent.type(input, "32");
  expect(screen.getByText("32ºF equals to 0ºC")).toBeTruthy();
  userEvent.type(input, "banana");
  expect(screen.queryByTestId("result")).toBeFalsy();
});

test("user can reset calculation and automatically focus on the input", () => {
  render(<App />);
  const input = screen.getByLabelText("Temperature:");
  userEvent.type(input, "25");
  expect(screen.queryByTestId("result")).toBeTruthy();
  const resetButton = screen.getByText("Reset");
  userEvent.click(resetButton);
  expect(screen.queryByTestId("result")).toBeFalsy();
  expect(document.activeElement).toBe(input);
});