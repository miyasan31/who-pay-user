import type { VFC } from "react";
import React, { useCallback } from "react";
import { toast } from "react-hot-toast/src/core/toast";
import { useSetRecoilState } from "recoil";
import { user } from "src/atom";
import { ColorButton } from "src/components/custom";
import { Layout } from "src/components/layout";
import { requestFetcher } from "src/functions/fetcher";
import { deleteSequreStore, getSequreStore } from "src/functions/store";
import { useThemeColor } from "src/hooks";
import { buttonStyles } from "src/styles";
import type { AccountScreenProps } from "types";

export const AccountUpdateScreen: VFC<AccountScreenProps<"AccountUpdate">> =
	() => {
		const accent = useThemeColor({}, "accent");
		const setUserInfo = useSetRecoilState(user);

		const onSignout = useCallback(async () => {
			const toastId = toast.loading("処理中...", {
				icon: "💁‍♂️",
			});

			const tokenResult = await getSequreStore("access_token");
			const { statusCode } = await requestFetcher(
				"/auth/signout",
				{ token: tokenResult },
				"POST"
			);
			if (statusCode >= 400) {
				toast("エラーが発生しました", {
					id: toastId,
					icon: "🤦‍♂️",
				});
				return;
			}

			toast.success("サインアウトしました", {
				duration: 1500,
				id: toastId,
				icon: "🙆‍♂️",
			});
			await new Promise((resolve) => setTimeout(resolve, 400));

			await deleteSequreStore("access_token");
			setUserInfo({
				id: "",
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				token: "",
				isSignin: false,
			});
		}, []);

		return (
			<Layout>
				<ColorButton
					title="サインアウト"
					lightBgColor={accent}
					darkBgColor={accent}
					outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
					onPress={onSignout}
				/>
			</Layout>
		);
	};
