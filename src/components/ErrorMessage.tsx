import type { VFC } from "react";
import React, { memo } from "react";
import { Text } from "src/components/custom";
import { textStyles } from "src/styles";

type Props = {
  message?: string;
};

export const ErrorMessage: VFC<Props> = memo((props) => {
  return (
    <Text lightTextColor="red" darkTextColor="red" style={textStyles.error}>
      {props.message}
    </Text>
  );
});
