import type { ReactNode, VFC } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { user } from "src/atom";
import { requestFetcher } from "src/functions/fetcher";
import { getSequreStore } from "src/functions/store";
import { AuthNavigator } from "src/navigations/AuthNavigator";
import type { User } from "types/fetcher";

type Props = {
	children: ReactNode;
};

export const AuthProvider: VFC<Props> = (props) => {
	const [isLoading, seIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useRecoilState(user);

	const listenAuthState = useCallback(async () => {
		const tokenResult = await getSequreStore("access_token");
		if (tokenResult) {
			const requestBody = { token: tokenResult };
			const { statusCode, response } = await requestFetcher<User>(
				"/auth/session/user",
				requestBody,
				"POST"
			);
			if (statusCode >= 400) {
				throw new Error("不正なリクエストです");
			}
			setUserInfo({
				id: response.id,
				firstName: response.firstName,
				lastName: response.lastName,
				email: response.email,
				phone: response.phone,
				token: response.token,
				isSignin: true,
			});
		}
		seIsLoading(false);
	}, []);

	useEffect(() => {
		listenAuthState();
	}, []);

	if (isLoading) {
		return null;
	} else {
		return <>{userInfo.isSignin ? <>{props.children}</> : <AuthNavigator />}</>;
	}
};
