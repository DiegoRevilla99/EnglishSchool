import React from "react";

import { IActionProps } from "@/interfaces/IDataTable";
import { INavigateIconButtonProps } from "@/interfaces/INavigateButton";

const Actions = (props: IActionProps) => {
  return (
    <>
      {React.Children.map(props.actions, (child, childIndex) => {
        if (React.isValidElement<INavigateIconButtonProps>(child)) {
          return React.cloneElement(child, {
            id: `actionElement${childIndex}#${
              props.item.user?.id || props.item.id
            }`,
          });
        }
        return child;
      })}
    </>
  );
};

export default Actions;
