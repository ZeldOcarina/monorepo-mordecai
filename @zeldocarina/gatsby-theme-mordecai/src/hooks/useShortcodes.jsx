import { useContext } from "react";

import ShortcodesContext from "../context/ShortcodesContext";
import AppContext from "../context/AppContext";

function useShortcodes() {
  const pageShortcodes = useContext(ShortcodesContext);
  const { globalShortcodes } = useContext(AppContext);

  const rawShortcodes =
    pageShortcodes?.pageShortcodes.length > 0
      ? pageShortcodes.pageShortcodes
      : globalShortcodes;

  const parsedShortcodes = rawShortcodes.map((item) => {
    return {
      shortcode: item.data.Shortcodes,
      data: item.data.Value,
    };
  });

  return parsedShortcodes;
}

export default useShortcodes;
