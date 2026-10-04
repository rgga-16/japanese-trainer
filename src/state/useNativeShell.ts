import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Style, StatusBar } from "@capacitor/status-bar";
import { useEffect } from "react";
import type { Location, NavigateFunction } from "react-router-dom";

/**
 * Wires native-shell integration for Capacitor builds: the Android
 * hardware/gesture back button and status bar styling. A no-op on web.
 */
export function useNativeShell(
  navigate: NavigateFunction,
  location: Location,
) {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
    if (Capacitor.getPlatform() === "android") {
      StatusBar.setBackgroundColor({ color: "#10141c" }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let torndown = false;
    let handle: { remove: () => void } | undefined;

    CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (location.pathname !== "/") {
        navigate(-1);
      } else if (canGoBack) {
        navigate(-1);
      } else {
        CapacitorApp.exitApp();
      }
    }).then((h) => {
      if (torndown) {
        h.remove();
      } else {
        handle = h;
      }
    });

    return () => {
      torndown = true;
      handle?.remove();
    };
  }, [navigate, location.pathname]);
}
