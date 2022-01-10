import type { VFC } from "react";
import React from "react";
import { Text } from "src/components/custom";
import { Layout } from "src/components/layout";
import type { AccountScreenProps } from "types";

export const AccountUpdateScreen: VFC<
  AccountScreenProps<"AccountUpdate">
> = () => {
  return (
    <Layout>
      <Text>AccountUpdateScreen</Text>
    </Layout>
  );
};
