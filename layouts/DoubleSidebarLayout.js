import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";

const mql = window.matchMedia("(min-width: 800px)");

export default ({
  autoDock,
  leftSidebar,
  rightSidebar,
  content,
  innerProps: { left: innerPropsLeft = {}, right: innerPropsRight = {} },
  styles: { left: stylesLeft = {}, right: stylesRight = {} }
}) => {
  const [state, setState] = useState({
    // leftSidebarDocked: autoDock ? mql.matches : !!innerPropsLeft.docked,
    // leftSidebarOpen: autoDock ? mql.matches : !!innerPropsLeft.open,
    leftSidebarDocked: autoDock ? mql.matches : !!innerPropsLeft.docked,
    leftSidebarOpen: !!innerPropsLeft.open,
    rightSidebarOpen: !!innerPropsRight.open
  });

  const mediaQueryChanged = () => {
    setState({
      ...state,
      leftSidebarDocked: autoDock ? mql.matches : !!innerPropsLeft.docked,
      leftSidebarOpen: false //autoDock ? mql.matches : !!innerPropsLeft.open
    });
  };

  useEffect(() => {
    mql.addListener(mediaQueryChanged);
    return () => {
      mql.removeListener(mediaQueryChanged);
    };
  }, [mediaQueryChanged]);

  const onLeftSidebarOpen = open => {
    setState({ ...state, leftSidebarOpen: open });
  };

  const onRightSidebarOpen = open => {
    setState({ 
      ...state, 
      rightSidebarDocked: open 
      // rightSidebarOpen: open 
      });
  };

  useEffect(() => console.log(state), [state]);

  return (
    <Sidebar
      sidebar={leftSidebar({
        onSidebarOpen: onLeftSidebarOpen,
        sidebarOpen: state.leftSidebarOpen,
        sidebarDocked: state.leftSidebarDocked
      })}
      open={state.leftSidebarOpen}
      docked={state.leftSidebarDocked}
      onSetOpen={onLeftSidebarOpen}
      {...innerPropsLeft}
      styles={stylesLeft}
    >
      <Sidebar
        sidebar={rightSidebar({
          onSidebarOpen: onRightSidebarOpen,
          sidebarOpen: state.rightSidebarOpen,
          sidebarDocked: state.rightSidebarDocked
        })}
        open={state.rightSidebarOpen}
        docked={state.rightSidebarDocked}
        onSetOpen={onRightSidebarOpen}
        pullRight
        {...innerPropsRight}
        styles={stylesRight}
      >
        {content({
          onLeftSidebarOpen: onLeftSidebarOpen,
          onRightSidebarOpen: onRightSidebarOpen,
          leftSidebarOpen: state.leftSidebarOpen,
          rightSidebarOpen: state.rightSidebarOpen,
          leftSidebarDocked: state.leftSidebarDocked,
          rightSidebarDocked: state.rightSidebarDocked
        })}
      </Sidebar>
    </Sidebar>
  );
};
