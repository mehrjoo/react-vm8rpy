import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";

import {useBreakpoint} from '../hooks/breakpoint';

const DEFAULT_SIDEBAR_WIDTH = 300;

export default ({
  leftSidebar,
  rightSidebar,
  content,
  breakpoints:{ left: leftBreakpoint, } ,
  openDocked:{ right: rightOpenDocked, } ,
  stretched:{ right: rightStretched, } ,
  innerProps: { left: leftInnerProps = {}, right: rightInnerProps = {} },
  styles: { left: leftStyles , right: rightStyles }
}) => {
  const media = useBreakpoint();

  const [state, setState] = useState({
    leftSidebarDocked: media[leftBreakpoint] || !!leftInnerProps.docked,
    leftSidebarOpen: !!leftInnerProps.open,
    rightSidebarOpen: !!rightInnerProps.open
  });

  const mediaQueryChanged = () => {
    setState({
      ...state,
      leftSidebarDocked: media[leftBreakpoint],
      leftSidebarOpen: media[leftBreakpoint] ? false : state.leftSidebarOpen,
    });
  };

  useEffect(()=>{
    console.log('media', media);
    mediaQueryChanged();
  },[media])


  const onLeftSidebarOpen = open => {
    setState({ ...state, leftSidebarOpen: open });
  };

  const onRightSidebarOpen = open => {
    let update = (rightOpenDocked)
    ? {
      rightSidebarDocked: open,
      rightSidebarOpen: false,
      }
    : {
      rightSidebarDocked: false,
      rightSidebarOpen: open,
    }
    setState({ 
      ...state,
      ...update,
      });
  };

  const _rightStyles = {
    ...rightStyles,
    sidebar: {
      ...rightStyles.sidebar, 
      width: !media[rightStretched]
      ? "100%"
      : rightStyles.sidebar && rightStyles.sidebar.width //|| DEFAULT_SIDEBAR_WIDTH
    }
  }
  console.log('_rightStyles',rightStretched, media, _rightStyles)
  console.log('state',state);

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
      {...leftInnerProps}
      styles={leftStyles}
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
        {...rightInnerProps}
        styles={_rightStyles}
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
