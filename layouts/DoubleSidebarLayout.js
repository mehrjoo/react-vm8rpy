import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";

import {useBreakpoint} from '../hooks/breakpoint';

export default ({
  leftSidebar,
  rightSidebar,
  content,
  breakpoints:{ left: leftBreakpoint, } ,
  innerProps: { left: innerPropsLeft = {}, right: innerPropsRight = {} },
  styles: { left: stylesLeft = {}, right: stylesRight = {} }
}) => {
  const media = useBreakpoint();

  const [state, setState] = useState({
    leftSidebarDocked: media[leftBreakpoint] || !!innerPropsLeft.docked,
    leftSidebarOpen: !!innerPropsLeft.open,
    rightSidebarOpen: !!innerPropsRight.open
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
    setState({ 
      ...state, 
      rightSidebarDocked: open 
      // rightSidebarOpen: open 
      });
  };

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
