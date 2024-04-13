"use client";

import useMe from "#/hooks/queries";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page: NextPage = () => {
  const router = useRouter();
  const { me, meIsLoading, logOutMutation, meMutation } = useMe();

  useEffect(() => {
    if (meIsLoading) return;
    if (!me) router.replace("/");
  }, [me, meIsLoading, router]);

  return (
    <>
      <h1>Me</h1>

      <button type="button" onClick={() => logOutMutation.mutate({})}>
        로그아웃
      </button>

      <button type="button" onClick={() => meMutation.mutate({})}>
        유저정보리패치
      </button>
    </>
  );
};

export default Page;
