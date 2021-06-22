import { Platform } from "react-native"
export const typography = {
  primary: Platform.select({ ios: "Spartan-Regular", android: "Spartan-Regular" }),
  primaryBold: Platform.select({ ios: "Spartan-Bold", android: "Spartan-Bold" }),
  secondary: Platform.select({ ios: "Antonio-Medium", android: "Antonio-Medium" }),
}
