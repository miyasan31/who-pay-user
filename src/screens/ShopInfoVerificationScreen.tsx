import type { VFC } from "react";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { shop } from "src/atom";
import { ColorButton, Text, View } from "src/components/custom";
import { authRequestFetcher } from "src/functions/fetcher";
import { saveSequreStore } from "src/functions/store";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textStyles, viewStyles } from "src/styles";
import type { AuthScreenProps } from "types";

export const ShopInfoVerificationScreen: VFC<
	AuthScreenProps<"ShopInfoVerification">
> = (props) => {
	const { shopName, address, email } = props.route.params;
	const color = useThemeColor({}, "text2");
	const [shopInfo, setShopInfo] = useRecoilState(shop);

	const onShopInfoRegister = useCallback(async () => {
		const body = {
			...props.route.params,
			id: shopInfo.id,
			token: shopInfo.token,
		};
		const result = await authRequestFetcher(
			"/auth/register/shop",
			body,
			"POST"
		);
		if (result.status >= 400) {
			console.info("不正なリクエスト");
			return;
		}
		await saveSequreStore("access_token", shopInfo.token);
		setShopInfo((prev) => ({
			...prev,
			id: result.id,
			shopName: body.shopName,
			email: body.email,
			phone: body.phone,
			isSignin: true,
		}));
	}, [props]);

	const onStackBack = useCallback(() => {
		props.navigation.goBack();
	}, [props]);

	return (
		<View style={viewStyles.semi}>
			<Text style={textStyles.title}>新規登録確認画面</Text>

			<Text
				lightTextColor={color}
				darkTextColor={color}
				style={textStyles.label}
			>
				店舗名
			</Text>
			<Text style={textStyles.text}>{shopName}</Text>

			<Text
				lightTextColor={color}
				darkTextColor={color}
				style={textStyles.label}
			>
				住所
			</Text>
			<Text style={textStyles.text}>{address}</Text>

			<Text
				lightTextColor={color}
				darkTextColor={color}
				style={textStyles.label}
			>
				メールアドレス
			</Text>
			<Text style={textStyles.text}>{email}</Text>

			<ColorButton
				title="登録"
				outlineStyle={buttonStyles.outline}
				onPress={onShopInfoRegister}
			/>
			<ColorButton
				title="入力画面に戻る"
				lightBgColor="#bfbfbf"
				darkBgColor="#bfbfbf84"
				outlineStyle={buttonStyles.outline}
				onPress={onStackBack}
			/>
		</View>
	);
};
