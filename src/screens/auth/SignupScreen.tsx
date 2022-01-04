import type { VFC } from "react";
import React from "react";
import { SignupEmailForm, SignupPhoneForm } from "src/components/form";
import { AuthLayout } from "src/components/layout";
import { useTab } from "src/hooks";
import type { AuthScreenProps } from "types";

export const SignupScreen: VFC<AuthScreenProps<"Signup">> = (props) => {
	const { select, Tab } = useTab();

	return (
		<AuthLayout tab={<Tab />}>
			{select === "email" ? (
				<SignupEmailForm {...props} />
			) : (
				<SignupPhoneForm {...props} />
			)}
		</AuthLayout>
	);
};
