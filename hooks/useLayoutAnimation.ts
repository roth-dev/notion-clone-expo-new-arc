import { useEffect } from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";
const { easeInEaseOut, linear, spring } = LayoutAnimation.Presets;
const CONFIGURE = {
  linear,
  spring,
  easeInEaseOut,
};
type Configure = "linear" | "spring" | "easeInEaseOut";

export default function useLayoutAnimation() {
  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  function configureNext(configure: Configure = "easeInEaseOut") {
    LayoutAnimation.configureNext(CONFIGURE[configure]);
  }

  return { configureNext };
}
