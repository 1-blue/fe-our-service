import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMeAPI, postLogInAPI, postLogOutAPI } from "#/apis";
import type { PostLogInAPIRequest, PostLogInAPIResponse } from "#/types/apis";

const useMe = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => getMeAPI({}),
  });
  /**
   * @description 기록용
   * 1. TData: Mutate()가 반환할 타입
   * 2. TError: 오류의 타입
   * 3. TVariables: Mutate()에 전달될 매개변수의 타입
   * 4. TContext: 옵션으로 제공되는 컨텍스트의 타입
   */
  const mutation = useMutation({
    mutationFn: getMeAPI,
  });

  const logInMutation = useMutation<
    PostLogInAPIResponse,
    Error,
    PostLogInAPIRequest
  >({
    mutationFn: postLogInAPI,
    onSuccess(user) {
      // 로그인된 유저 정보 등록
      queryClient.setQueryData(["users", "me"], user);

      router.back();
    },
  });

  const logOutMutation = useMutation({
    mutationFn: postLogOutAPI,
    onSuccess() {
      // 로그인된 유저 정보 초기화
      queryClient.setQueryData(["users", "me"], null);

      router.back();
    },
  });

  return {
    me: data,
    meIsLoading: isLoading,
    meMutation: mutation,
    logInMutation,
    logOutMutation,
  };
};

export default useMe;
