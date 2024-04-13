"use client";

import React, { useMemo } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { CustomError } from "#/errors";
import useToastStore from "#/store/toast";

const ReactQueryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { openToast } = useToastStore();

  const queryCache = useMemo(
    () =>
      new QueryCache({
        onError: (error) => {
          // TODO: Sentry
          console.error("queryCache >> ", error);

          if (error instanceof CustomError) {
            openToast({ type: "error", message: error.message });
          }
        },
      }),
    [openToast],
  );
  const mutationCache = useMemo(
    () =>
      new MutationCache({
        onError: (error) => {
          // TODO: Sentry
          console.error("mutationCache >> ", error);

          if (error instanceof CustomError) {
            openToast({ type: "error", message: error.message });
          }
        },
      }),
    [openToast],
  );
  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache,
        mutationCache,
        defaultOptions: {
          queries: { retry: false },
        },
      }),
    [queryCache, mutationCache],
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NODE_ENV === "development"}
        buttonPosition="top-left"
      />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
