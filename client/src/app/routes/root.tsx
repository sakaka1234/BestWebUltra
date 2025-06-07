import { Outlet } from "react-router-dom";
import { OverlayContainer } from "../../components/ui/overlay/overlay-container";

export const AppRouterRoot = () => {
  return (
    <>
      <OverlayContainer />
      <Outlet />
    </>
  );
};
