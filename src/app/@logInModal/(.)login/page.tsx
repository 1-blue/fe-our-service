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
        className="absolute top-0 left-1/2 -translate-x-1/2 mt-36 bg-depth-1 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <LoginForm />
      </aside>
    </Dim>
  );
};

export default Page;
