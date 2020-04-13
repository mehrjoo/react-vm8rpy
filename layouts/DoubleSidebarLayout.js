import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";

import {useBreakpoint} from '../hooks/breakpoint';

//const mql = window.matchMedia("(min-width: 800px)");

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
    // leftSidebarDocked: autoDock ? mql.matches : !!innerPropsLeft.docked,
    // leftSidebarOpen: autoDock ? mql.matches : !!innerPropsLeft.open,
    leftSidebarDocked: media[leftBreakpoint] || !!innerPropsLeft.docked,
    // leftSidebarDocked: autoDock ? mql.matches : !!innerPropsLeft.docked,
    leftSidebarOpen: !!innerPropsLeft.open,
    rightSidebarOpen: !!innerPropsRight.open
  });

  const mediaQueryChanged = () => {
    setState({
      ...state,
      leftSidebarDocked: media[leftBreakpoint],// || state.leftSidebarDocked,//!!innerPropsLeft.docked,
      leftSidebarOpen: media[leftBreakpoint] ? false : state.leftSidebarOpen//!!innerPropsLeft.open
    });
  };

  useEffect(()=>{
    console.log('media', media);
    mediaQueryChanged();
  },[media])

  // useEffect(() => {
  //   mql.addListener(mediaQueryChanged);
  //   return () => {
  //     mql.removeListener(mediaQueryChanged);
  //   };
  // }, [mediaQueryChanged]);

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

  // useEffect(() => console.log(state), [state]);
  console.log('state',state)
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
