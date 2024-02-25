"use client";

import useSnackbarStore from "#/store/snackbar";
import Portal from "#/components/Portal";
import Snackbar from "#/components/atoms/Snackbar";

const SnackbarProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const snackbars = useSnackbarStore((store) => store.snackbars);
  const closeSnackbar = useSnackbarStore((store) => store.closeSnackbar);

  return (
    <>
      {children}

      <Portal rootName="snackbar-root">
        {snackbars.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            closeSnackbar={closeSnackbar}
            {...snackbar}
          />
        ))}
      </Portal>
    </>
  );
};

export default SnackbarProvider;
