import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <>
      <ul className="flex flex-col">
        {Array(50)
          .fill(null)
          .map((_, i) => (
            <li key={i}>TEST - {i}</li>
          ))}
      </ul>
    </>
  );
};

export default Page;
