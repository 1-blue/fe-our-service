import {
  useController,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

/**
 * + 인풋 형태
 *   1. `square`: 사각형 형태
 *   2. `line`: 라인 형태
 */
type InputShape = "square" | "line";

interface Props<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** `<label>`에 사용할 렌더링될 이름 */
  displayName?: string;
  /** `react-hook-form`의 `useController()`에 사용할 `name` ( 구분을 위한 유니크 값 ) */
  name: Path<T>;
  /** `react-hook-form`의 `useController()`에 사용할 `control` */
  control: Control<T>;
  /** `react-hook-form`의 `validation` */
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  /** 인풋 좌측끝에 특수한 처리를 하는 경우 사용 */
  left?: {
    /** 인풋 좌측끝에 넣을 엘리먼트 */
    children: React.ReactNode;
    /** 인풋 좌측끝에 넣은 엘리먼트를 버튼으로 사용할 경우 */
    isButton?: boolean;
  };
  /** 인풋 우측끝에 특수한 처리를 하는 경우 사용 */
  right?: {
    /** 인풋 우측끝에 넣을 엘리먼트 */
    children: React.ReactNode;
    /** 인풋 우측끝에 넣은 엘리먼트를 버튼으로 사용할 경우 */
    isButton?: boolean;
  };
  /**
   * 라벨 숨길지 여부
   * @default false
   */
  hiddenLabel?: boolean;
  /**
   * 인풋 형태
   * @default square
   */
  shape?: InputShape;
}

/**
 * `react-hook-form`을 사용하는 공용 인풋
 * @example
 * const Form: React.FC = () => {
 *   const { control } = useForm<{ id: string; password: string }>();
 *
 *   return (
 *     <article>
 *       <RHFToolkit.Input
 *         control={control}
 *         name="id"
 *         displayName="아이디"
 *         rules={{
 *           pattern: {
 *             value: /^[a-zA-Z0-9]{6,12}$/,
 *             message: `소문자, 대문자, 숫자로 구성되어야하며, 6~12자를 작성해야합니다.`,
 *           },
 *         }}
 *       />
 *       <RHFToolkit.Input
 *         control={control}
 *         name="password"
 *         displayName="비밀번호"
 *         left={{ children: <LockIcon /> }}
 *       />
 *     </article>
 *   );
 * };
 *
 * @todo 테스트 코드 에러 해결하기 ( `Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components` )
 **/
const Input = <T extends FieldValues>({
  displayName,
  name,
  control,
  rules,
  left,
  right,
  className,
  hiddenLabel = false,
  shape = "square",
  ...props
}: Props<T>) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  // 제네릭(`T`)을 사용해서 그런지 사용할때 타입에서 오류가 발생함
  const error = errors[name];

  return (
    <fieldset className="flex flex-col-reverse">
      {error && error.message && (
        <span
          role="alert"
          className="mx-1 mt-1.5 whitespace-pre-wrap text-xs font-semibold text-red-500"
        >
          {String(error.message).replaceAll(",", "\n")}
        </span>
      )}
      <div
        className={twMerge(
          "peer flex w-full min-w-[400px] border-line-default py-2 transition-colors focus-within:border-main-600 hover:border-main-500",
          error && "!border-red-500",
          shape === "square" && "rounded-md border-2 px-3",
          shape === "line" && "border-b-2 px-2",
        )}
      >
        {left &&
          (left.isButton ? (
            <button
              type="button"
              className="flex items-center justify-center py-2 pl-2 transition-colors hover:text-main-500 focus:text-main-600"
            >
              {left.children}
            </button>
          ) : (
            <div className="flex items-center justify-center py-2 pl-2">
              {left.children}
            </div>
          ))}
        <input
          {...field}
          {...props}
          id={name}
          data-testid={name}
          className={twMerge(
            "flex-1 bg-transparent text-text-default outline-none transition-colors placeholder:text-sm placeholder:text-text-dark hover:z-10 hover:border-main-500 focus:z-10 focus:border-main-600",
            className,
          )}
        />
        {right &&
          (right.isButton ? (
            <button
              type="button"
              className="flex items-center justify-center py-2 pr-2 transition-colors hover:text-main-500 focus:text-main-600"
            >
              {right.children}
            </button>
          ) : (
            <div className="flex items-center justify-center py-2 pr-2">
              {right.children}
            </div>
          ))}
      </div>
      {!hiddenLabel && (
        <label
          htmlFor={name}
          className={twMerge(
            "mb-0.5 cursor-pointer text-xs font-semibold text-text-default transition-colors hover:text-main-500 peer-focus-within:text-main-600 peer-hover:text-main-500",
            error && "!text-red-500",
          )}
        >
          {displayName || name}
        </label>
      )}
    </fieldset>
  );
};

export default Input;
