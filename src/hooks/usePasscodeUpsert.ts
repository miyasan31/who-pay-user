import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast/src/core/toast";
import type { PasscodeScreenProps } from "types";

type Props = PasscodeScreenProps<"Passcode" | "PasscodeUpdate"> & {
	screen: "Passcode" | "PasscodeUpdate";
};

export const usePasscodeUpsert = (props: Props) => {
	const [passcode, setPasscode] = useState({
		isVerify: false,
		input: "",
		verify: "",
	});

	const result = useMemo(() => {
		return passcode.isVerify ? "verify" : "input";
	}, [passcode.isVerify]);

	const secretView = useMemo(() => {
		const length = passcode[result].length;
		return "●".repeat(length);
	}, [result, passcode]);

	const onClick = useCallback(
		(number?: string) => {
			setPasscode((prevPrice) => {
				if (prevPrice[result].length === 4) return prevPrice;
				if (number && prevPrice[result] === "" && ["00"].includes(number))
					return prevPrice;
				return {
					...prevPrice,
					[result]: prevPrice[result] + number,
				};
			});
		},
		[result]
	);

	const onDelete = useCallback(() => {
		setPasscode((prevPrice) => {
			return {
				...prevPrice,
				[result]: prevPrice[result].slice(0, -1),
			};
		});
	}, [result]);

	const onSubmit = useCallback(async () => {
		if (!passcode.isVerify) {
			if (passcode.input.length !== 4) {
				toast.error("４桁入力してください", {
					icon: "🤦‍♂️",
				});
				return;
			}

			setPasscode((prev) => {
				return {
					...prev,
					isVerify: true,
				};
			});
			return;
		}

		if (passcode.verify.length !== 4) {
			toast.error("４桁入力してください", {
				icon: "🤦‍♂️",
			});
			return;
		}

		if (passcode.input !== passcode.verify) {
			toast.error("パスコードが一致しません", {
				icon: "🤦‍♂️",
			});
			setPasscode((prev) => {
				return {
					...prev,
					verify: "",
				};
			});
			return;
		}

		const toastId = toast.loading("処理中...", {
			icon: "💁‍♂️",
		});

		/*
			ここでリクエスト処理&エラー処理
		*/

		if (props.screen === "Passcode") {
			console.info("登録処理");
		}

		if (props.screen === "PasscodeUpdate") {
			console.info("更新処理");
		}

		await new Promise((resolve) => setTimeout(resolve, 800));
		// await new Promise((resolve) => setTimeout(resolve,400));

		toast.success("パスコードを更新しました", {
			duration: 1500,
			id: toastId,
			icon: "🙆‍♂️",
		});

		// 一致したらバックエンドに送信
		props.navigation.navigate("PasscodeSettingSelect");
	}, [passcode, props]);

	useEffect(() => {
		return () => {
			setPasscode({
				isVerify: false,
				input: "",
				verify: "",
			});
		};
	}, []);

	return {
		passcode,
		secretView,
		onClick,
		onDelete,
		onSubmit,
	};
};
