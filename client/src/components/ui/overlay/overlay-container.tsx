import { useLocation } from "react-router-dom";
import { useOverlay } from "./use-overlay"
import { useEffect } from "react";
import { OverlayLayout } from "./overlay-layout";

export const OverlayContainer = () => {
    const { component, dismiss } = useOverlay();
    const { pathname } = useLocation();

    useEffect(() => {
        if (component) {
            dismiss();
        }
    }, [pathname]);

    if (!component) {
        return <></>;
    }

    return <OverlayLayout onDismiss={dismiss}>{component}</OverlayLayout>
}
