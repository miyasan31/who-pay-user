import type { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import type { RootStackParamList } from "types";

export const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.makeUrl("/")],
	config: {
		screens: {
			Auth: {
				path: "auth",
				screens: {
					Signin: {
						path: "signin",
					},
					Signup: {
						path: "signup",
					},
					Verify: {
						path: "verify/:phone",
					},
					ShopInfoRegister: {
						path: "shop_info_register/:phone",
					},
					ShopInfoVerification: {
						path: "shop_info_verification/:shopName/:passcode/:creditNumber/:securityCode/:email/:phone",
					},
				},
			},
			Pay: {
				path: "pay",
				screens: {
					Calculator: {
						path: "calculator",
					},
					VoiceRecord: {
						path: "voice_record/:price",
					},
					Passcode: {
						path: "passcode/:price",
					},
				},
			},

			Modal: "modal",
			NotFound: "*",
		},
	},
};
