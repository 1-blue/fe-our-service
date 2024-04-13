"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import useMe from "#/hooks/queries/useMe";

import Button from "#/components/atoms/Button";
import Icon from "#/components/atoms/Icon";
import RHFToolkit from "#/components/atoms/RHFToolkit";

interface LoginFormType {
  email: string;
  password: string;
}

/** 로그인 폼 */
const LoginForm: React.FC = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const { logInMutation } = useMe();
  const { control, handleSubmit } = useForm<LoginFormType>({
    defaultValues: {
      email: isDevelopment ? "tls123@ruu.kr" : "",
      password: isDevelopment ? "1111" : "",
    },
  });
  const onSubmit = handleSubmit(async (body) => {
    logInMutation.mutate({ body });
  });

  const kakaoLogin = () => {
    window.location.href = `http://localhost:3050/api/v1/auth/login/kakao`;
  };

  const googleLogin = () => {
    window.location.href = `http://localhost:3050/api/v1/auth/login/google`;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center gap-4 px-12 py-10"
    >
      <RHFToolkit.Input
        type="text"
        control={control}
        name="email"
        displayName="이메일"
      />
      <RHFToolkit.Input
        type="password"
        control={control}
        name="password"
        displayName="비밀번호"
      />

      <Button
        type="submit"
        primary
        fill
        className="w-full flex justify-center font-semibold"
      >
        로그인
      </Button>

      <div className="relative w-full my-6 h-0.5 bg-line-default" />

      <Button
        type="submit"
        secondary
        fill
        className="w-full flex justify-center font-semibold"
      >
        임시 로그인
      </Button>
      <div className="w-full flex gap-4">
        <Button
          type="button"
          fill
          className="flex-1 flex justify-center bg-yellow-400 border-yellow-400 text-white hover:text-white active:text-white gap-2 font-semibold"
          onClick={kakaoLogin}
        >
          <Icon name="Kakao" size={18} fill="white" />
          <span>카카오 로그인</span>
        </Button>
        <Button
          type="button"
          fill
          className="flex-1 flex justify-center bg-red-300 border-red-300 text-white hover:text-white active:text-white gap-2 font-semibold"
          onClick={googleLogin}
        >
          <Icon name="Google" size={18} fill="white" />
          <span>구글 로그인</span>
        </Button>
      </div>

      <div className="w-full mt-4 flex flex-col gap-2">
        <div className="relative h-0.5 bg-line-default" />
        <div className="flex justify-between">
          <Link
            href="/signup"
            className="text-sm text-sub-400 hover:text-sub-300 underline-offset-4 hover:underline"
          >
            비밀번호 찾기
          </Link>
          <Link
            href="/signup"
            className="text-sm text-sub-400 hover:text-sub-300 underline-offset-4 hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
