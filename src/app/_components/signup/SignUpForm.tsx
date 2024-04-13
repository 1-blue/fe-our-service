"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import useToastStore from "#/store/toast";
import { postCreateUserAPI } from "#/apis";
import { CustomError } from "#/errors";

import { Step } from "#/app/_components/signup/Step";

/** 회원가입 폼 */
export interface SignUpFormType {
  email: string;
  password: string;
  nickname: string;
  imageId: string;

  /** [필요에 의해 추가] 이메일 검증을 위한 값 */
  emailAuthenticateToken: string;

  // 필수가 아닌 값들
  phone?: string;
}

/**
 * 회원가입 폼
 * @todo session storage에 넣는 방법도 고려하기
 */
const SignUpForm: React.FC = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const router = useRouter();
  const { openToast } = useToastStore();

  const [step, setStep] = useState(1);
  const moveToNextStep = () => setStep((prev) => prev + 1);
  const moveToPrevStep = () => setStep((prev) => prev - 1);

  const { control, handleSubmit, trigger, setValue } = useForm<SignUpFormType>({
    defaultValues: {
      email: isDevelopment ? "ghksaud55@naver.com" : "",
      emailAuthenticateToken: isDevelopment ? "111111" : "",
      password: isDevelopment ? "1234" : "",
      nickname: isDevelopment ? "Akaps" : "",
    },
  });

  /** 이미지 아이디 등록 함수 */
  const setImageId = (imageId: string) => setValue("imageId", imageId);

  /** 회원가입 함수 TODO: 바로 로그인 되도록 수정하기 */
  const onSubmit = handleSubmit(async ({ emailAuthenticateToken, ...body }) => {
    try {
      await postCreateUserAPI({ body });

      openToast({
        type: "success",
        message: "회원가입에 성공했습니다\n메인 페이지로 이동됩니다.",
      });

      router.replace("/");
    } catch (error) {
      if (!(error instanceof CustomError)) {
        console.error("🚀 FIXME: 회원가입 >> ", error);

        return;
      }

      openToast({ type: "error", message: error.message });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center gap-4 px-12 py-10"
    >
      {/* [회원가입 - 01] 이메일 입력 */}
      {step === 1 && (
        <Step.First
          control={control}
          trigger={trigger}
          moveToNextStep={moveToNextStep}
        />
      )}

      {/* [회원가입 - 02] 이메일 검증 */}
      {step === 2 && (
        <Step.Second
          control={control}
          trigger={trigger}
          moveToPrevStep={moveToPrevStep}
          moveToNextStep={moveToNextStep}
        />
      )}

      {/* [회원가입 - 03] 비밀번호 입력 */}
      {step === 3 && (
        <Step.Third
          control={control}
          trigger={trigger}
          moveToPrevStep={moveToPrevStep}
          moveToNextStep={moveToNextStep}
        />
      )}

      {/* [회원가입 - 04] 닉네임 입력 및 검증 */}
      {step === 4 && (
        <Step.Fourth
          control={control}
          trigger={trigger}
          moveToPrevStep={moveToPrevStep}
          moveToNextStep={moveToNextStep}
        />
      )}

      {/* [회원가입 - 05] 옵셔널 정보 */}
      {step === 5 && (
        <Step.Fifth
          control={control}
          moveToPrevStep={moveToPrevStep}
          setImageId={setImageId}
        />
      )}
    </form>
  );
};

export default SignUpForm;
