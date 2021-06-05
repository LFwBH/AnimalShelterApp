import { CheckBox as RNCheckBox } from "react-native-elements";
import styled from "styled-components/native";

const CheckboxView = styled(RNCheckBox).attrs(({ theme }) => ({
  iconRight: true,
  containerStyle: {
    backgroundColor: theme.palette.background,
    width: "50%",
    borderColor: theme.palette.background,
    paddingLeft: 0,
    marginLeft: 0,
  },
  textStyle: {
    fontWeight: "500",
  },
}))``;

export default CheckboxView;
