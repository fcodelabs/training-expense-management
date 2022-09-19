import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import {
  register,
  userId,
  saveId,
  login,
  logout,
  fogot,
  selectUser,
} from "../slice/userSlice";
import {
  addEx,
  addIn,
  getExIn,
  saveExIn,
  totEx,
  totIn,
} from "../slice/expenseSlice";
import { takeEvery, put, call, select } from "redux-saga/effects";
//import { doc } from "../Firebase/firebase";
import { firestore } from "../Firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  AddAllExpenseType,
  AddExpenseType,
  AddIncomeType,
  LoginUserType,
  NumberType,
  RegisterUserType,
  ResetPaswordType,
  UserDataType,
  UserSignOutType,
  UserType,
} from "./types";
import { PayloadAction } from "@reduxjs/toolkit";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const id = user.uid;
    localStorage.setItem("UId", id);
  } else {
    console.log("User SignOut");
  }
});

function* getUserId(): Generator {
  const id = yield localStorage.getItem("UId");
  yield put(saveId({ uId: id }));
}

function* registerUser({ payload }: PayloadAction<RegisterUserType>) {
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
    })
    .catch((error) => {
      const errorCode = error.code;
      alert("Sorry! Registering is Failed " + errorCode);
    });
}

function* loginUser({ payload }: PayloadAction<LoginUserType>) {
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

function* userSignOut({ payload }: PayloadAction<UserSignOutType>) {
  yield signOut(payload.auth)
    .then(() => {
      alert("Successfully Signout");
      payload.navigate("/");
    })
    .catch((error) => {
      alert(error);
    });
}

function* userResetPassword({ payload }: PayloadAction<ResetPaswordType>) {
  console.log("payload ", payload);
  yield sendPasswordResetEmail(payload.auth, payload.email)
    .then(() => {
      alert("Send Password Reset Email");
    })
    .catch((error) => {
      const errorCode = error.code;
      alert("Cannot Send Reset Password Email " + errorCode);
    });
}

function* addAllExpense({ payload }: PayloadAction<AddExpenseType>): any {
  const user: UserType = yield select(selectUser);
  const uid = user.uId;
  try {
    yield addDoc(collection(firestore, uid), {
      exname: payload.exname,
      excost: payload.excost,
    });
    const response = yield call(getAllExpenseIncome, uid);
    const totExpense = response.totalEx;
    yield put(saveExIn(response.userData));
    yield put(totEx({ totalExpense: totExpense }));
  } catch (err) {
    console.log(err);
  }
}

function* addAllIncome({ payload }: PayloadAction<AddIncomeType>): any {
  const user: UserType = yield select(selectUser);
  const uid = user.uId;

  try {
    yield addDoc(collection(firestore, uid), {
      exname: payload.income,
      excost: payload.incost,
    });
    const response = yield call(getAllExpenseIncome, uid);
    const totIncome = response.totalIn;
    yield put(saveExIn(response.userData));
    yield put(totIn({ totalIncome: totIncome }));
  } catch (err) {
    console.log(err);
  }
}

const getAllExpenseIncome = async (uid: string) => {
  try {
    const userData: Array<UserDataType> = [];
    let totalEx = 0;
    let totalIn = 0;

    const querySnapshot = await getDocs(collection(firestore, uid));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data = { exname: doc.data().exname, excost: doc.data().excost };
      userData.push(data);
    });
    userData.map((number: NumberType) => {
      (number.exname !== "Income" &&
        (totalEx = totalEx + parseInt(number.excost))) ||
        (totalIn = totalIn + parseInt(number.excost));
    });
    return {
      userData: userData,
      totalEx: totalEx,
      totalIn: totalIn,
    };
  } catch (err) {
    console.log(err);
  }
};

function* saveAllExpenseIncome(): any {
  const user: UserType = yield select(selectUser);
  const uid = user.uId;
  try {
    if (uid) {
      const response = yield call(getAllExpenseIncome, uid);
      const totExpense = response.totalEx;
      const totIncome = response.totalIn;
      yield put(saveExIn(response.userData));
      yield put(totEx({ totalExpense: totExpense }));
      yield put(totIn({ totalIncome: totIncome }));
    }
  } catch (err) {
    console.log(err);
  }
}

function* allRegisterUsers() {
  yield takeEvery(register, registerUser);
  yield takeEvery(userId, getUserId);
  yield takeEvery(login, loginUser);
  yield takeEvery(logout, userSignOut);
  yield takeEvery(fogot, userResetPassword);
  yield takeEvery(addEx, addAllExpense);
  yield takeEvery(addIn, addAllIncome);
  yield takeEvery(getExIn, saveAllExpenseIncome);
}

export default allRegisterUsers;
