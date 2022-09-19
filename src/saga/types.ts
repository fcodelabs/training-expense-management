import { ActionCodeSettings, Auth } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";

export interface RegisterUserType {
  auth: Auth;
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export interface LoginUserType {
  auth: Auth;
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export interface UserSignOutType {
  auth: Auth;
  navigate: NavigateFunction;
}

export interface ResetPasswordType {
  auth: Auth;
  email: string;
}

export interface AddExpenseType {
  exname: string;
  excost: number;
}

export interface AddIncomeType {
  income: string;
  incost: number;
}

export interface UserType {
  uId: string;
}

export interface NumberType {
  exname: string;
  excost: string;
}

export interface UserDataType {
  exname: string;
  excost: string;
}

export interface ResetPaswordType {
  auth: Auth;
  email: string;
  actionCodeSettings: ActionCodeSettings;
}

export interface AddAllExpenseType {
  user?: UserType;
  response?: unknown;
}
