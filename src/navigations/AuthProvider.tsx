/* eslint-disable react-hooks/exhaustive-deps */
import type { ReactNode, VFC } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast/src/core/toast";
import { useRecoilState } from "recoil";
import { user } from "src/atom";
import { Progress } from "src/components";
import { requestFetcher } from "src/functions/fetcher";
import { getSequreStore, saveSequreStore } from "src/functions/store";
import type { User } from "types/fetcher";

type Props = {
	children: ReactNode;
};

export const AuthProvider: VFC<Props> = (props) => {
	const [isLoading, seIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useRecoilState(user);

	const listenAuthState = useCallback(async () => {
		const tokenResult = await getSequreStore("template_access_token");
		if (tokenResult) {
			const requestBody = { token: tokenResult };
			const { statusCode, response } = await requestFetcher<User>(
				"/auth/session/user",
				requestBody,
				"POST",
				"token"
			);

			if (statusCode >= 400) {
				toast("エラーが発生しました", {
					icon: "🤦‍♂️",
				});
				return;
			}

			await saveSequreStore("template_access_token", response.token);
			await setUserInfo({
				id: response.id,
				firstName: response.firstName,
				lastName: response.lastName,
				email: response.email,
				phone: response.phone,
				token: response.token,
				isSignin: true,
			});
		}
		await new Promise((resolve) => setTimeout(resolve, 500));
		seIsLoading(false);
	}, []);

	const loadingFalse = useCallback(async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		seIsLoading(false);
	}, []);

	useEffect(() => {
		if (!isLoading) seIsLoading(true);
		if (!userInfo.isSignin) {
			listenAuthState();
		} else {
			loadingFalse();
		}
	}, [userInfo.isSignin]);

	if (isLoading) {
		return <Progress />;
	} else {
		return (
			<>{userInfo.isSignin ? <>{props.children}</> : <>{props.children}</>}</>
		);
	}
};
