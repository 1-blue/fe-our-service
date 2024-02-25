"use client";

import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { Control, useForm } from "react-hook-form";

import Input from "./index";

interface InputForm {
  name: string;
  age: number;
}

describe("🚀 공용 인풋 컴포넌트 테스트", () => {
  beforeEach(() => {
    const CustomComponent = () => {
      const { control, handleSubmit } = useForm<InputForm>();

      return (
        <form onSubmit={handleSubmit(() => {})}>
          <Input
            control={control}
            name="name"
            displayName="이름"
            type="text"
            placeholder="ex) 김독자"
            rules={{
              required: { message: "값을 입력해주세요!", value: true },
              minLength: { message: "네글자 이상 입력해주세요!", value: 3 },
            }}
          />
          <Input
            control={control}
            name="age"
            displayName="나이"
            type="number"
            placeholder="ex) 28"
          />
          <button type="submit">click me</button>
        </form>
      );
    };

    render(<CustomComponent />);
  });

  test("<input />을 렌더링하는지?", () => {
    const $nameInput = screen.getByTestId<HTMLInputElement>("name");
    const $ageInput = screen.getByTestId<HTMLInputElement>("age");

    expect($nameInput).toBeInTheDocument();
    expect($ageInput).toBeInTheDocument();
  });
  test("placeholder가 제대로 동작하는지?", () => {
    const $nameInput = screen.getByPlaceholderText("ex) 김독자");

    expect($nameInput).toBeInTheDocument();
  });
  test("<input /> 입력이 동작하는지?", () => {
    const INPUT_VALUE = "한글두글";
    const $nameInput = screen.getByTestId<HTMLInputElement>("name");

    act(() => fireEvent.change($nameInput, { target: { value: INPUT_VALUE } }));

    expect($nameInput).toHaveValue(INPUT_VALUE);
  });
});
