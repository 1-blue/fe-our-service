"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";

import Dim from "#/components/atoms/Dim";
import LoginForm from "#/app/_components/LogInForm";

const Page: NextPage = () => {
  const router = useRouter();

  return (
    <Dim onClick={() => router.back()}>
      <aside
        className="absolute left-1/2 top-0 mt-36 -translate-x-1/2 rounded-md bg-depth-1"
        onClick={(e) => e.stopPropagation()}
      >
        <LoginForm />
      </aside>
    </Dim>
  );
};

export default Page;
