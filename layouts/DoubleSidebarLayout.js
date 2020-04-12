import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";

const mql = window.matchMedia("(min-width: 800px)");

export default ({
  responsive,
  leftSidebar,
  rightSidebar,
  content,
  innerProps = { leftSidebar: {}, rightSidebar: {} },
  styles = {}
}) => {
  const [state, setState] = useState({
    leftSidebarDocked: responsive
      ? mql.matches
      : !!innerProps.leftSidebar.docked,
    leftSidebarOpen: responsive 
      ? mql.matches 
      : !!innerProps.leftSidebar.open,
    rightSidebarOpen: !!innerProps.rightSidebar.open
  });

  const mediaQueryChanged = () => {
    setState({
      ...state,
      leftSidebarDocked: mql.matches,
      leftSidebarOpen: mql.matches
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
    setState({ ...state, rightSidebarOpen: open });
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
      {...innerProps.leftSidebar}
      styles={{
        root: styles.root,
        sidebar: styles.leftSidebar
      }}
    >
      <Sidebar
        sidebar={rightSidebar({
          onSidebarOpen: onRightSidebarOpen,
          sidebarOpen: state.rightSidebarOpen,
          sidebarDocked: state.rightSidebarDocked
        })}
        open={state.rightSidebarOpen}
        docked={state.rightSidebarOpen}
        onSetOpen={onRightSidebarOpen}
        pullRight
        {...innerProps.rightSidebar}
        styles={{
          sidebar: styles.rightSidebar,
          content: styles.content
        }}
      >
        {content({
          onLeftSidebarOpen: onLeftSidebarOpen,
          onRightSidebarOpen: onRightSidebarOpen,
          leftSidebarOpen: state.leftSidebarOpen,
          rightSidebarOpen: state.rightSidebarOpen
        })}
      </Sidebar>
    </Sidebar>
  );
};
