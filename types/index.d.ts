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
	// Root: NavigatorScreenParams<BottomTabScreenProps> | undefined;
	Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
	Pay: NavigatorScreenParams<PayStackParamList> | undefined;
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
	ShopInfoRegister: { phone: string };
	ShopInfoVerification: {
		shopName: string;
		address: string;
		email: string;
		phone: string;
	};
};
export type AuthScreenProps<T extends keyof AuthStackParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<AuthStackParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

/* 決済 */
export type PayStackParamList = {
	Calculator: undefined;
	VoiceRecord: { price: string };
	Passcode: { price: string };
};
export type PayScreenProps<T extends keyof PayStackParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<PayStackParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */

/* 未使用 */
export type BottomTabParamList = {
	TabOne: undefined;
	TabTwo: undefined;
	TabThree: undefined;
};
export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<BottomTabParamList, T>,
		NativeStackScreenProps<RootStackParamList>
	>;
/* ---- */
