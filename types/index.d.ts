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
	Home: undefined;
	Payment: NavigatorScreenParams<PaymentStackParamList> | undefined;
	Setting: NavigatorScreenParams<SettingStackParamList> | undefined;
};
export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<BottomTabParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

/* 決済履歴 */
export type PaymentStackParamList = {
	PaymentList: undefined;
	PaymentDetail: {
		id: number;
		amount: number;
		shopName: string;
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
	VoiceRecord: undefined;
	Passcode: undefined;
};
export type SettingScreenProps<T extends keyof SettingStackParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<SettingStackParamList, T>,
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
