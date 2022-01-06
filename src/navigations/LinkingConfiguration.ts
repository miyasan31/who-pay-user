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
          SigninAction: {
            path: "signin_action",
          },
          Signin: {
            path: "signin",
          },
          Signup: {
            path: "signup",
          },
          Verify: {
            path: "verify/:phone",
          },
          UserInfoRegister: {
            path: "user_info_register/:phone",
          },
        },
      },
      // Pay: {
      // 	path: "pay",
      // 	screens: {
      // 		VoiceRecord: {
      // 			path: "voice_record/:price",
      // 		},
      // 		Passcode: {
      // 			path: "passcode/:price",
      // 		},
      // 	},
      // },

      Modal: "modal",
      NotFound: "*",
    },
  },
};
