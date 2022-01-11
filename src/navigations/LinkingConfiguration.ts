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
      Main: {
        path: "main",
        screens: {
          Top: {
            path: "top",
            // screens: {
            //   Home: {
            //     path: "home",
            //   },
            // },
          },
          Payment: {
            path: "payment",
            // screens: {
            //   PaymentList: {
            //     path: "payment_list",
            //   },
            //   PaymentDetail: {
            //     path: "payment_detail/:id",
            //   },
            // },
          },
          Setting: {
            path: "setting",
            //   screens: {
            //     SettingSelect: {
            //       path: "setting_select",
            //     },
            //     AccountSetting: {
            //       path: "account_setting",
            //       screens: {
            //         Account: {
            //           path: "account",
            //         },
            //         AccountUpdate: {
            //           path: "account_update",
            //         },
            //       }
            //     },
            //     CreditSetting: {
            //       path: "credit_setting",
            //       screens: {
            //         Credit: {
            //           path: "credit",
            //         },
            //         CreditUpdate: {
            //           path: "credit_update",
            //         },
            //     },
            //     PasscodeSetting: {
            //       path: "passcode_setting",
            //       screens: {
            //         PasscodeSettingSelect: {
            //           path: "passcode_setting_select",
            //         },
            //         Passcode: {
            //           path: "passcode",
            //         },
            //         PasscodeUpdate: {
            //           path: "passcode_update",
            //         },

            //       }
            //     },
            //     VoiceRecordSetting: {
            //       path: "voice_record_setting",
            //       screens: {
            //         VoiceRecordSettingSelect: {
            //           path: "voice_record_setting_select",
            //         },
            //         VoiceRecord: {
            //           path: "voice_record",
            //         },
            //         VoiceRecordUpdate: {
            //           path: "voice_record_update",
            //         },

            //       }
            //     },
            //   },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};
