import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {
	CompositeScreenProps,
	NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
	namespace ReactNavigation {
		type RootParamList = RootStackParamList;
	}
}

export type RootStackParamList = {
	Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
	Root: NavigatorScreenParams<BottomTabScreenProps> | undefined;
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
	UserInfoRegister: { phone: string };
};
export type AuthScreenProps<T extends keyof AuthStackParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<AuthStackParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

/* 下タブ */
export type BottomTabParamList = {
	Top: NavigatorScreenParams<TopStackParamList> | undefined;
	Payment: NavigatorScreenParams<PaymentStackParamList> | undefined;
	Setting: NavigatorScreenParams<SettingStackParamList> | undefined;
};
export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<BottomTabParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

/* トップ */
export type TopStackParamList = {
	Home: undefined;
};
export type TopScreenProps<T extends keyof TopStackParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<TopStackParamList, T>,
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
		BottomTabScreenProps<PaymentStackParamList, T>,
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
		BottomTabScreenProps<SettingStackParamList, T>,
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
		BottomTabScreenProps<AccountStackParamList, T>,
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
		BottomTabScreenProps<CreditStackParamList, T>,
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
		BottomTabScreenProps<PasscodeStackParamList, T>,
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
		BottomTabScreenProps<VoiceRecordStackParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

// /* 決済 */
// export type PayStackParamList = {
// 	VoiceRecord: { price: string };
// 	Passcode: { price: string };
// };
// export type PayScreenProps<T extends keyof PayStackParamList> =
// 	CompositeScreenProps<
// 		BottomTabScreenProps<PayStackParamList, T>,
// 		NativeStackScreenProps<RootStackParamList>
// 	>;
// /* ---- */
