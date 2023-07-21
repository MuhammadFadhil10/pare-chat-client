import * as React from "react";
import { SideMenu } from "./SideMenu";
import { BottomMenu } from "./BottomMenu";

const Components = () => {
  return (
    <>
      <SideMenu />
      <BottomMenu />
    </>
  );
};

export const Menu = React.memo(Components);
