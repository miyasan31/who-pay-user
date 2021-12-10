import type { ReactNode, VFC } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { shop } from "src/atom";
import { authRequestFetcher } from "src/functions/fetcher";
import { getSequreStore } from "src/functions/store";
import { AuthNavigator } from "src/navigations/AuthNavigator";

type Props = {
	children: ReactNode;
};

export const AuthProvider: VFC<Props> = (props) => {
	const [isLoading, seIsLoading] = useState(true);
	const [shopInfo, setShopInfo] = useRecoilState(shop);

	const listenAuthState = useCallback(async () => {
		const tokenResult = await getSequreStore("access_token");
		if (tokenResult) {
			const result = await authRequestFetcher("/auth/session/shop", { token: tokenResult }, "POST");
			if (result.status >= 400) {
				throw new Error("不正なリクエストです");
			}
			setShopInfo({
				id: result.response.id,
				shopName: result.response.shopName,
				email: result.response.email,
				phone: result.response.phone,
				token: result.response.token,
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
		return <>{shopInfo.isSignin ? <>{props.children}</> : <AuthNavigator />}</>;
	}
};
