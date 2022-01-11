/* eslint-disable @typescript-eslint/no-namespace */
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Main: NavigatorScreenParams<MainBottomTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};
export type StackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

/* 認証 */
export type AuthStackParamList = {
  SigninAction: undefined;
  Signin: undefined;
  Signup: undefined;
  Verify: { phone: string };
  UserInfoRegister: undefined;
};
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */

/* 下タブ */
export type MainBottomTabParamList = {
  Top: NativeStackScreenProps<TopStackParamList> | undefined;
  Payment: NativeStackScreenProps<PaymentStackParamList> | undefined;
  Setting: NativeStackScreenProps<SettingStackParamList> | undefined;
};
export type MainBottomTabScreenProps<T extends keyof MainBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */

/* トップ */
export type TopStackParamList = {
  Home: undefined;
};
export type TopScreenProps<T extends keyof TopStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<TopStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */

/* 決済履歴 */
export type PaymentStackParamList = {
  PaymentList: undefined;
  PaymentDetail: {
    id: number;
  };
};
export type PaymentScreenProps<T extends keyof PaymentStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PaymentStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */

/* 設定 */
export type SettingStackParamList = {
  SettingSelect: undefined;
  AccountSetting: NavigatorScreenParams<AccountStackParamList> | undefined;
  CreditSetting: NavigatorScreenParams<CreditStackParamList> | undefined;
  PasscodeSetting: NavigatorScreenParams<PasscodeStackParamList> | undefined;
  VoiceRecordSetting:
    | NavigatorScreenParams<VoiceRecordStackParamList>
    | undefined;
};
export type SettingScreenProps<T extends keyof SettingStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SettingStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */

/* アカウント */
export type AccountStackParamList = {
  // AccountSettingSelect: undefined;
  Account: undefined;
  AccountUpdate: undefined;
};
export type AccountScreenProps<T extends keyof AccountStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AccountStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */

/* クレジット */
export type CreditStackParamList = {
  // CreditSettingSelect: undefined;
  Credit: undefined;
  CreditUpdate: undefined;
};
export type CreditScreenProps<T extends keyof CreditStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CreditStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */

/* パスコード */
export type PasscodeStackParamList = {
  PasscodeSettingSelect: undefined;
  Passcode: undefined;
  PasscodeUpdate: undefined;
};
export type PasscodeScreenProps<T extends keyof PasscodeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PasscodeStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */

/* 声紋認証 */
export type VoiceRecordStackParamList = {
  VoiceRecordSettingSelect: undefined;
  VoiceRecord: undefined;
  VoiceRecordUpdate: undefined;
};
export type VoiceRecordScreenProps<T extends keyof VoiceRecordStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<VoiceRecordStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
/* ---- */
