import { useCallback } from "react";
import { toast } from "react-hot-toast/src/core/toast";
import { Alert } from "react-native";
import { useSetRecoilState } from "recoil";
import { user } from "src/atoms";
import { requestFetcher } from "src/functions/fetcher";
import { deleteSequreStore, getSequreStore } from "src/functions/store";

export const useSignout = () => {
	const setUserInfo = useSetRecoilState(user);

	const onSignoutDialog = useCallback(() => {
		Alert.alert("本当によろしいですか？", "", [
			{
				text: "キャンセル",
			},
			{ text: "サインアウト", onPress: onSignout },
		]);
	}, []);

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

	return {
		onSignoutDialog,
	};
};
