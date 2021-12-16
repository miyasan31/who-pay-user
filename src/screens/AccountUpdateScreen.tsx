import type { VFC } from "react";
import React, { useCallback } from "react";
// import { toast } from "react-hot-toast/src/core/toast";
// import { useSetRecoilState } from "recoil";
// import { user } from "src/atom";
import { ColorButton } from "src/components/custom";
import { Layout } from "src/components/layout";
// import { requestFetcher } from "src/functions/fetcher";
// import { deleteSequreStore, getSequreStore } from "src/functions/store";
import { useThemeColor } from "src/hooks";
import { buttonStyles } from "src/styles";
import type { AccountScreenProps } from "types";

export const AccountUpdateScreen: VFC<AccountScreenProps<"AccountUpdate">> =
	() => {
		const accent = useThemeColor({}, "accent");
		// const setUserInfo = useSetRecoilState(user);

		const onSubmit = useCallback(async () => {
			console.info("更新");
		}, []);

		return (
			<Layout>
				<ColorButton
					title="サインアウト"
					lightBgColor={accent}
					darkBgColor={accent}
					outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
					onPress={onSubmit}
				/>
			</Layout>
		);
	};
