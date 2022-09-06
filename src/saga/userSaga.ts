import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { register, login, logout, fogot } from "../slice/userSlice";
import { takeEvery } from "redux-saga/effects";

function* registerUser({ payload }: any) {
  yield createUserWithEmailAndPassword(
    payload.auth,
    payload.email,
    payload.password
  )
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Successfully Created Account");
      payload.navigate("/expenseHome");
      console.log(user);
      const uid = user.uid;
      console.log("UID :" + uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      alert("Sorry! Registering is Failed " + errorCode);
    });
}

function* loginUser({ payload }: any) {
  yield signInWithEmailAndPassword(
    payload.auth,
    payload.email,
    payload.password
  )
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      payload.navigate("/expenseHome");
    })
    .catch((error) => {
      const errorCode = error.code;
      alert("Sorry! Login is Failed " + errorCode);
    });
}

function* userSignOut({ payload }: any) {
  yield signOut(payload.auth)
    .then(() => {
      alert("Successfully Signout");
      payload.navigate("/");
    })
    .catch((error) => {
      alert(error);
    });
}

function* userResetPassword({ payload }: any) {
  yield sendPasswordResetEmail(payload.auth, payload.email)
    .then(() => {
      alert("Send Password Reset Email");
    })
    .catch((error) => {
      const errorCode = error.code;
      alert("Cannot Send Reset Password Email " + errorCode);
    });
}

function* allRegisterUsers() {
  yield takeEvery(register, registerUser);
  yield takeEvery(login, loginUser);
  yield takeEvery(logout, userSignOut);
  yield takeEvery(fogot, userResetPassword);
}

export default allRegisterUsers;
