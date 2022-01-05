import { MaterialIcons } from "@expo/vector-icons";
import type { VFC } from "react";
import React, { useCallback, useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { date } from "src/atoms";
import { CustomText as Text } from "src/components/custom/CustomText";
import { useThemeColor } from "src/hooks/useThemeColor";

export const useMonthPagenation = () => {
	const icon1 = useThemeColor({}, "icon1");

	const [dateInfo, setDateInfo] = useRecoilState(date);

	const onPrevMonth = useCallback(() => {
		setDateInfo((prev) => {
			return {
				year: prev.month === 1 ? prev.year - 1 : prev.year,
				month: prev.month === 1 ? 12 : prev.month - 1,
			};
		});
	}, []);

	const onNextMonth = useCallback(() => {
		setDateInfo((prev) => {
			return {
				year: prev.month === 12 ? prev.year + 1 : prev.year,
				month: prev.month === 12 ? 1 : prev.month + 1,
			};
		});
	}, []);

	const prevLabel = useMemo(() => {
		return dateInfo.month === 1 ? 12 : dateInfo.month - 1;
	}, [dateInfo]);

	const nextLabel = useMemo(() => {
		return dateInfo.month === 12 ? 1 : dateInfo.month + 1;
	}, [dateInfo]);

	const isThisMonth = useMemo(() => {
		if (
			new Date().getFullYear() === dateInfo.year &&
			new Date().getMonth() + 1 === dateInfo.month
		) {
			return false;
		} else {
			return true;
		}
	}, [nextLabel, dateInfo]);

	const PrevMounth: VFC = () => {
		return (
			<Pressable
				onPress={onPrevMonth}
				style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }, styles.prev]}
			>
				<MaterialIcons name="keyboard-arrow-left" size={24} color={icon1} />
				<Text
					style={styles.buttonLabel}
					lightTextColor={icon1}
					darkTextColor={icon1}
				>
					{prevLabel}月
				</Text>
			</Pressable>
		);
	};

	const NextMounth: VFC = () => {
		return (
			<Pressable
				onPress={onNextMonth}
				style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }, styles.next]}
			>
				<Text
					style={styles.buttonLabel}
					lightTextColor={icon1}
					darkTextColor={icon1}
				>
					{nextLabel}月
				</Text>
				<MaterialIcons name="keyboard-arrow-right" size={24} color={icon1} />
			</Pressable>
		);
	};

	return {
		dateInfo,
		onPrevMonth,
		onNextMonth,
		prevLabel,
		nextLabel,
		isThisMonth,
		PrevMounth,
		NextMounth,
	};
};

const styles = StyleSheet.create({
	buttonLabel: {
		fontWeight: "400",
	},
	prev: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",

		width: 40,
		marginLeft: 20,
	},
	next: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",

		width: 40,
		marginRight: 20,
	},
});
