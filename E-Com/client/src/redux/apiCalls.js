
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data)); //we are sendiing out action and payload it gonna be response and data which our user info name image email etc 
  } catch (err) {
    dispatch(loginFailure());
  }
};


















