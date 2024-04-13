import { useRef, useState } from "react";
import type { Control, UseFormTrigger } from "react-hook-form";
import { UserIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

import useToastStore from "#/store/toast";
import {
  patchMoveImageToDB,
  postCheckEmailAPI,
  postCreatePresignedURL,
  postSaveImageToDB,
  postSendTokenByEmailAPI,
  postUploadImageByPresignedURL,
  postAuthenticateByEmailAPI,
  postCheckNicknameAPI,
} from "#/apis";
import { CustomError } from "#/errors";
import { regexp } from "#/constants/regexp";

import Avatar from "#/components/atoms/Avatar";
import RHFToolkit from "#/components/atoms/RHFToolkit";
import Button from "#/components/atoms/Button";
import Countdown from "#/app/_components/Countdown";
import type { SignUpFormType } from "#/app/_components/signup/SignUpForm";

interface Props {
  control: Control<SignUpFormType, any, SignUpFormType>;
  trigger: UseFormTrigger<SignUpFormType>;
  moveToPrevStep: () => void;
  moveToNextStep: () => void;
}

/** [회원가입 - 01] 이메일 입력 */
const First: React.FC<Omit<Props, "moveToPrevStep">> = ({
  control,
  trigger,
  moveToNextStep,
}) => {
  const { openToast } = useToastStore();

  /** 유효성 검사 후 다음 스탭으로 이동 */
  const onClickNextButton = async () => {
    const result = await trigger("email");

    // 유효성 검사에 통과하지 못했다면
    if (!result) return;

    const { email } = control._getWatch();

    try {
      // 유저의 이메일 중복 검사
      await postCheckEmailAPI({ body: { email } });

      // 이메일로 토큰 전송
      await postSendTokenByEmailAPI({ body: { email } });

      // 다음 스탭으로 이동
      moveToNextStep();
    } catch (error) {
      console.error("🚫 [회원가입 - 01] 이메일 입력 에러 >> ", error);

      if (!(error instanceof CustomError)) {
        return openToast({
          type: "error",
          message: "알 수 없는 에러입니다.\n다시 시도해주세요 !",
        });
      }

      control.setError(
        "email",
        { type: "value", message: error.message },
        { shouldFocus: true },
      );

      openToast({ type: "error", message: error.message });
    }
  };

  /** 엔터를 누르는 경우 다음 스탭으로 이동 */
  const onPressNextButton: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    onClickNextButton();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">🔖 이메일을 입력해주세요 🔖</h2>
        <span className="text-sm text-sub-400">회원가입에 필요합니다.</span>
      </div>

      <RHFToolkit.Input
        type="text"
        control={control}
        name="email"
        displayName="이메일"
        shape="line"
        autoFocus
        placeholder="ex) tls123@naver.com"
        rules={{
          required: {
            value: true,
            message: "이메일은 필수로 입력해야합니다!",
          },
          pattern: {
            value: regexp.email,
            message: "이메일 형태에 맞게 입력해주세요!",
          },
        }}
        onKeyDown={onPressNextButton}
      />

      <div className="mt-16 flex gap-4 font-semibold">
        <Button
          type="button"
          primary
          fill
          className="h-12 w-full text-lg"
          onClick={onClickNextButton}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

/** [회원가입 - 02] 이메일 검증 */
const Second: React.FC<Props> = ({
  control,
  trigger,
  moveToPrevStep,
  moveToNextStep,
}) => {
  const { openToast } = useToastStore();

  /** 카운트 다운에 사용할 시간 ( `ms` ) */
  const [time, setTime] = useState(1000 * 60 * 5);
  /** 토큰 재전송 쿨타임 ( `30s`, 단위: `ms` ) */
  const [downtime, setDowntime] = useState(Date.now() + 1000 * 30);
  /** 토큰 재전송 시도 횟수 */
  const [retryCount, setRetryCount] = useState(0);

  /** 토큰 재전송 */
  const onClickResendToken = async () => {
    if (retryCount >= 5) {
      return openToast({
        type: "error",
        message:
          "이메일 재전송 횟수를 초과했습니다.\n새로고침 후 처음부터 다시 시도해주세요 !",
      });
    }

    if (downtime - Date.now() > 0) {
      return openToast({
        type: "warning",
        message: "이메일 전송 후 30초가 지나야 재전송이 가능합니다 !",
      });
    }

    try {
      const { email } = control._getWatch();

      // 이메일로 토큰 전송
      await postSendTokenByEmailAPI({ body: { email } });

      setTime((prev) => prev + 1);
      setDowntime(Date.now() + 1000 * 30);
      setRetryCount((prev) => prev + 1);

      return openToast({
        type: "info",
        message: `"${email}"으로 토큰이 재전송되었습니다 !`,
      });
    } catch (error) {
      console.error("🚫 [회원가입 - 02] 이메일 재전송 에러 >> ", error);

      if (!(error instanceof CustomError)) {
        return openToast({
          type: "error",
          message: "알 수 없는 에러입니다.\n다시 시도해주세요 !",
        });
      }

      openToast({ type: "error", message: error.message });
    }
  };

  /** 이전 스탭으로 이동 */
  const onClickPrevButton = () => moveToPrevStep();

  /** 유효성 검사 후 다음 스탭으로 이동 */
  const onClickNextButton = async () => {
    const result = await trigger("email");

    // 유효성 검사에 통과하지 못했다면
    if (!result) return;

    try {
      await postAuthenticateByEmailAPI({
        body: {
          email: control._getWatch("email"),
          token: control._getWatch("emailAuthenticateToken"),
        },
      });

      // 다음 스탭으로 이동
      moveToNextStep();
    } catch (error) {
      console.error("🚫 [회원가입 - 02] 이메일 토큰 검사 에러 >> ", error);

      if (!(error instanceof CustomError)) {
        return openToast({
          type: "error",
          message: "알 수 없는 에러입니다.\n다시 시도해주세요 !",
        });
      }

      control.setError(
        "emailAuthenticateToken",
        { type: "value", message: error.message },
        { shouldFocus: true },
      );

      openToast({ type: "error", message: error.message });
    }
  };

  /** 엔터를 누르는 경우 다음 스탭으로 이동 */
  const onPressNextButton: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    onClickNextButton();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">
          🪙 이메일 검증 토큰을 입력해주세요 🪙
        </h2>
        <span className="text-sm text-sub-400">
          &quot;<b>{control._getWatch().email}</b>&quot; 로 토큰이
          전송되었습니다.
        </span>
        <Countdown time={time} className="mt-2">
          <Button
            type="button"
            onClick={onClickResendToken}
            className="my-4 gap-2"
            secondary
          >
            <ArrowPathIcon className="h-5 w-5" />
            <span>이메일 재전송하기</span>
          </Button>
        </Countdown>
      </div>

      <div>
        <RHFToolkit.Input
          type="text"
          control={control}
          name="emailAuthenticateToken"
          displayName="이메일 검증"
          shape="line"
          autoFocus
          placeholder="ex) 123456"
          rules={{
            required: {
              value: true,
              message: "이메일 검증은 필수로 입력해야합니다!",
            },
          }}
          onKeyDown={onPressNextButton}
        />

        <button
          type="button"
          className="mt-1 flex w-full items-center justify-end gap-1 text-xs text-special-200 underline-offset-4 opacity-70 hover:underline"
          onClick={onClickResendToken}
        >
          <ArrowPathIcon className="h-4 w-4" />
          <span>토큰 재전송</span>
        </button>
      </div>

      <div className="mt-16 flex gap-4 font-semibold">
        <Button
          type="button"
          fill
          className="h-12 w-full text-lg"
          onClick={onClickPrevButton}
        >
          이전
        </Button>
        <Button
          type="button"
          primary
          fill
          className="h-12 w-full text-lg"
          onClick={onClickNextButton}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

/** [회원가입 - 03] 비밀번호 입력 */
const Third: React.FC<Props> = ({
  control,
  trigger,
  moveToPrevStep,
  moveToNextStep,
}) => {
  const { openToast } = useToastStore();

  /** 이전 스탭으로 이동 */
  const onClickPrevButton = () => moveToPrevStep();

  /** 유효성 검사 후 다음 스탭으로 이동 */
  const onClickNextButton = async () => {
    const result = await trigger("password");

    // 유효성 검사에 통과하지 못했다면
    if (!result) return;

    try {
      // 다음 스탭으로 이동
      moveToNextStep();
    } catch (error) {
      console.error("🚫 [회원가입 - 03] 비밀번호 입력 에러 >> ", error);

      if (!(error instanceof CustomError)) {
        return openToast({
          type: "error",
          message: "알 수 없는 에러입니다.\n다시 시도해주세요 !",
        });
      }

      openToast({ type: "error", message: error.message });
    }
  };

  /** 엔터를 누르는 경우 다음 스탭으로 이동 */
  const onPressNextButton: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    onClickNextButton();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">
          🔐 비밀번호를 입력해주세요 🔐
        </h2>
        <span className="text-sm text-sub-400">
          4 ~ 20자 이하로 입력해주세요
        </span>
      </div>

      <RHFToolkit.Input
        type="password"
        control={control}
        name="password"
        displayName="비밀번호"
        shape="line"
        autoFocus
        placeholder="ex) 1234"
        rules={{
          required: {
            value: true,
            message: "비밀번호는 필수로 입력해야합니다!",
          },
          minLength: {
            value: 4,
            message: "비밀번호는 4자 이상 입력해야합니다.",
          },
          maxLength: {
            value: 20,
            message: "비밀번호는 20자 이하 입력해야합니다.",
          },
        }}
        onKeyDown={onPressNextButton}
      />

      <div className="mt-16 flex gap-4 font-semibold">
        <Button
          type="button"
          fill
          className="h-12 w-full text-lg"
          onClick={onClickPrevButton}
        >
          이전
        </Button>
        <Button
          type="button"
          primary
          fill
          className="h-12 w-full text-lg"
          onClick={onClickNextButton}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

/** [회원가입 - 04] 닉네임 입력 및 검증 */
const Fourth: React.FC<Props> = ({
  control,
  trigger,
  moveToPrevStep,
  moveToNextStep,
}) => {
  const { openToast } = useToastStore();

  /** 이전 스탭으로 이동 */
  const onClickPrevButton = () => moveToPrevStep();

  /** 유효성 검사 후 다음 스탭으로 이동 */
  const onClickNextButton = async () => {
    const result = await trigger("nickname");

    // 유효성 검사에 통과하지 못했다면
    if (!result) return;

    try {
      await postCheckNicknameAPI({
        body: {
          nickname: control._getWatch("nickname"),
        },
      });

      // 다음 스탭으로 이동
      moveToNextStep();
    } catch (error) {
      if (!(error instanceof CustomError)) {
        console.error("🚫 [회원가입 - 04] 닉네임 입력 에러 >> ", error);

        return;
      }

      control.setError(
        "nickname",
        { type: "value", message: error.message },
        { shouldFocus: true },
      );

      openToast({ type: "error", message: error.message });
    }
  };

  /** 엔터를 누르는 경우 다음 스탭으로 이동 */
  const onPressNextButton: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    onClickNextButton();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">✏️ 닉네임을 입력해주세요 ✏️</h2>
      </div>

      <RHFToolkit.Input
        type="text"
        control={control}
        name="nickname"
        displayName="닉네임"
        shape="line"
        autoFocus
        placeholder="ex) Akaps"
        rules={{
          required: {
            value: true,
            message: "닉네임은 필수로 입력해야합니다!",
          },
        }}
        onKeyDown={onPressNextButton}
      />

      <div className="mt-16 flex gap-4 font-semibold">
        <Button
          type="button"
          fill
          className="h-12 w-full text-lg"
          onClick={onClickPrevButton}
        >
          이전
        </Button>
        <Button
          type="button"
          primary
          fill
          className="h-12 w-full text-lg"
          onClick={onClickNextButton}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

/**
 * [회원가입 - 05] 옵셔널 정보
 * 1. 프로필 이미지
 * 2. 휴대폰 번호 TODO: 중복검사
 * 3. 추천인 TODO: 구현하기
 */
const Fifth: React.FC<
  Pick<Props, "control" | "moveToPrevStep"> & {
    setImageId: (imageId: string) => void;
  }
> = ({ control, moveToPrevStep, setImageId }) => {
  const imageInputRef = useRef<null | HTMLInputElement>(null);
  const [imagePath, setImagePath] = useState("");
  const onChangeImageInput: React.ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    if (!e.target.files) return;
    const imageFile = e.target.files[0];

    if (!imageFile) return;

    try {
      // AWS-S3에 업로드할 준비
      const { url, fields } = await postCreatePresignedURL({
        body: { filename: imageFile.name },
      });

      // AWS-S3에 업로드
      await postUploadImageByPresignedURL({ fields, imageFile });

      // DB에 저장
      const savedImage = await postSaveImageToDB({
        body: { name: imageFile.name, url: url + fields.key },
      });

      // 사용하는 이미지로 변경 ( "임시 저장 폴더 -> 사용 폴더" 이동 )
      await patchMoveImageToDB({
        params: { id: savedImage.id },
        body: { beforeStatus: "TEMP", afterStatus: "USE" },
      });

      /** 최종으로 업로드된 이미지 URL */
      const URL = url + fields.key.replace("temp", "use");

      setImagePath(URL);
      setImageId(savedImage.id);
    } catch (error) {
      console.error("🚀 FIXME: 회원가입 이미지 업로드 >> ", error);
    }
  };

  /** 이전 스탭으로 이동 */
  const onClickPrevButton = () => moveToPrevStep();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">✏️ 닉네임을 입력해주세요 ✏️</h2>
        <span className="whitespace-pre-wrap text-sm text-sub-400">
          {
            "( 마지막 단계 ) 다음을 누르면 회원가입이 완료됩니다.\n( 아래 데이터 입력은 필수가 아닙니다 ! )"
          }
        </span>
      </div>

      <div>
        <Avatar
          rounded
          className="mx-auto bg-sub-200"
          imagePath={imagePath}
          size="xl"
          icon={<UserIcon className="h-full w-full p-1.5 text-main-500" />}
          onClick={() => imageInputRef.current?.click()}
        />
        <input
          type="file"
          hidden
          ref={imageInputRef}
          onChange={onChangeImageInput}
          accept="image/*"
        />
      </div>

      <RHFToolkit.Input
        type="text"
        control={control}
        name="phone"
        displayName="휴대폰 번호"
        shape="line"
        autoFocus
        placeholder="ex) 01012345678"
        rules={{
          pattern: {
            value: /^\d{11}$/,
            message: "숫자만 11자리 입력해주세요 !",
          },
        }}
      />

      <div className="mt-16 flex gap-4 font-semibold">
        <Button
          type="button"
          fill
          className="h-12 w-full text-lg"
          onClick={onClickPrevButton}
        >
          이전
        </Button>
        <Button type="submit" primary fill className="h-12 w-full text-lg">
          회원가입
        </Button>
      </div>
    </div>
  );
};

/** 회원가입 절차가 담긴 컴포넌트 */
export const Step = {
  /** [회원가입 - 01] 이메일 입력 */
  First,
  /** [회원가입 - 02] 이메일 검증 */
  Second,
  /** [회원가입 - 03] 비밀번호 입력 */
  Third,
  /** [회원가입 - 04] 닉네임 입력 및 검증 */
  Fourth,
  /** [회원가입 - 05] 옵셔널 정보 */
  Fifth,
};
