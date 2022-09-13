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

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const id = user.uid;
    localStorage.setItem("Uid", id);
  } else {
    console.log("User SignOut");
  }
});

function* getUserId(): any {
  const id = yield localStorage.getItem("Uid");
  yield put(saveId({ Uid: id }));
}

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

function* addAllExpense({ payload }: any): any {
  const user: any = yield select(selectUser);
  const uid = user.Uid;
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

function* addAllIncome({ payload }: any): any {
  const user: any = yield select(selectUser);
  const uid = user.Uid;

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
    const userData: any = [];
    let totalEx = 0;
    let totalIn = 0;

    const querySnapshot = await getDocs(collection(firestore, uid));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      userData.push(doc.data());
    });
    userData.map((number: any) => {
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
  const user: any = yield select(selectUser);
  const uid = user.Uid;
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
