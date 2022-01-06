import type { VFC } from "react";
import React from "react";
import { Text } from "src/components/custom";
import { Layout } from "src/components/layout";
import type { CreditScreenProps } from "types";

export const CreditUpdateScreen: VFC<
  CreditScreenProps<"CreditUpdate">
> = () => {
  return (
    <Layout>
      <Text>CreditScreen</Text>
    </Layout>
  );
};
