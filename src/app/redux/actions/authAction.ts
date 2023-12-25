import { setSignInCreds, setSignUpCreds } from "../slices/authSlice";

export const updateSignInCreds =
  (field: string, value: string) => (dispatch: any, getState: any) => {
    const { signInCreds } = getState().auth;
    const updatedSignInCreds = {
      ...signInCreds,
      [field]: value,
    };
    console.log(updatedSignInCreds);
    dispatch(setSignInCreds(updatedSignInCreds));
  };

export const updateSignUpCreds =
  (field: string, value: string) => (dispatch: any, getState: any) => {
    const { signUpCreds } = getState().auth;
    const updatedSignUpCreds = {
      ...signUpCreds,
      [field]: value,
    };
    console.log(updatedSignUpCreds);
    dispatch(setSignUpCreds(updatedSignUpCreds));
  };

export const handleConfirmPass = (value: string) => (dispatch: any) => {};
