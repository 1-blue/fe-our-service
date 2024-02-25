import {
  useController,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

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
          className="mx-1 mt-1.5 text-xs text-red-500 font-semibold"
        >
          {String(error.message)}
        </span>
      )}
      <div
        className={twMerge(
          "peer flex min-w-[400px] w-full border-2 rounded-md border-line-default transition-colors hover:border-main-500 focus-within:border-main-600",
          error && "!border-red-500"
        )}
      >
        {left &&
          (left.isButton ? (
            <button
              type="button"
              className="flex justify-center items-center pl-2 py-2 transition-colors hover:text-main-500 focus:text-main-600"
            >
              {left.children}
            </button>
          ) : (
            <div className="flex justify-center items-center pl-2 py-2">
              {left.children}
            </div>
          ))}
        <input
          {...field}
          {...props}
          id={name}
          data-testid={name}
          className={twMerge(
            "px-3 py-2 flex-1 bg-transparent outline-none text-text-default transition-colors placeholder:text-sm placeholder:text-text-dark hover:border-main-500 focus:border-main-600 hover:z-10 focus:z-10",
            className
          )}
        />
        {right &&
          (right.isButton ? (
            <button
              type="button"
              className="flex justify-center items-center pr-2 py-2 transition-colors hover:text-main-500 focus:text-main-600"
            >
              {right.children}
            </button>
          ) : (
            <div className="flex justify-center items-center pr-2 py-2">
              {right.children}
            </div>
          ))}
      </div>
      <label
        htmlFor={name}
        className={twMerge(
          "mb-0.5 text-text-default font-semibold cursor-pointer transition-colors hover:text-main-500 peer-hover:text-main-500 peer-focus-within:text-main-600",
          error && "!text-red-500"
        )}
      >
        {displayName || name}
      </label>
    </fieldset>
  );
};

export default Input;
