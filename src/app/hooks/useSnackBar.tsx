import { useSnackbar, SnackbarMessage, OptionsWithExtraProps } from 'notistack';
import { useCallback } from 'react';

export const useSnackbarMessage = () => {
  const { enqueueSnackbar } = useSnackbar();
  // const action = useCallback(
  //   (snackbarId: SnackbarKey) => (
  //     <CloseIcon
  //       sx={{ cursor: 'pointer' }}
  //       onClick={() => closeSnackbar(snackbarId)}
  //     />
  //   ),
  //   [closeSnackbar],
  // );
  return {
    successMessage: useCallback(
      (message: SnackbarMessage, options?: OptionsWithExtraProps<'success'>) =>
        enqueueSnackbar(message, { variant: 'success', ...options }),
      [enqueueSnackbar],
    ),
    errorMessage: useCallback(
      (message: SnackbarMessage, options?: OptionsWithExtraProps<'error'>) =>
        enqueueSnackbar(message, { variant: 'error', ...options }),
      [enqueueSnackbar],
    ),
  };
};
