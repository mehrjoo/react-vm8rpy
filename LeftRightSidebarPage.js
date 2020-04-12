import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";

const mql = window.matchMedia('(min-width: 800px)'); 

const Content = props => {
  const openLeftSidebar = () => props.onLeftSidebarOpen(true)
  const openRightSidebar = () => props.onRightSidebarOpen(true)
  return (
    <div style={{ background: "#ef00ef" }}>
      <button onClick={openLeftSidebar}>open left sidebar</button>
      <button onClick={openRightSidebar}>open right sidebar</button>
      <p>
        {" "}
        Lorem ipsum dolor sit amet, mauris nisl sed vel, integer consectetuer
        fringilla consectetuer adipiscing, platea orci pede purus tempor, eget
        duis ac, pede posuere bibendum vel nec conubia. Neque quis ut viverra id
        vitae tincidunt, et curabitur vitae dui sagittis cum, imperdiet justo
        mauris a. Vulputate a tempus amet condimentum amet, eget est fermentum
        ipsum ipsum erat, feugiat ligula quam velit, eleifend litora hendrerit
        ac maiores tortor curabitur, dolor donec. Eu non curabitur, dignissim
        orci ornare eu consequat. Tortor erat auctor porttitor viverra, vitae in
        elementum sapien quis. Ullamcorper in, dolor facilisis varius at ac id
        euismod, rutrum consequat. Quam quis lectus urna commodo maecenas, nisl
        et ullamcorper mattis ante.
      </p>
    </div>
  );
};

const RightSidebar = props => {
  const closeSidebar = () => {
    props.onSidebarOpen(false);
  };

  return (
    <>
      <button onClick={closeSidebar}>close</button>
      <div>RIGHT SIDEBAR</div>
    </>
  );
};

const LeftSidebar = props => {
  return <div>LEFT SIDEBAR</div>;
};

export default ({ name }) => {
  const [state, setState] = useState({
    leftSidebarDocked: mql.matches,
    leftSidebarOpen: mql.matches, //false,
    rightSidebarOpen: false
  });

  const mediaQueryChanged = () => {
    setState({
      ...state,
      leftSidebarDocked: mql.matches, 
      leftSidebarOpen: mql.matches,
    })
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
  useEffect(()=>console.log(state),[state]);
  
  return (
    <Sidebar
      sidebar={
        <LeftSidebar
          onSidebarOpen={onLeftSidebarOpen}
          sidebarDocked={state.leftSidebarDocked}
          sidebarOpen={state.leftSidebarOpen}
        />
      }
      open={state.leftSidebarOpen}
      docked={state.leftSidebarDocked}
      onSetOpen={onLeftSidebarOpen}
      styles={{
        root: { top: 41 },
        sidebar: { width: 300, background: "blue" }
      }}
    >
      <Sidebar
        sidebar={
          <RightSidebar
            onSidebarOpen={onRightSidebarOpen}
            // sidebarDocked={state.sidebarDocked}
            sidebarOpen={state.rightSidebarOpen}
          />
        }
        open={state.rightSidebarOpen}
        docked={state.rightSidebarOpen}
        onSetOpen={onRightSidebarOpen}
        pullRight
        styles={{
          //   root: { top: 41 },
          //   content: { background: "#ddd" },
          sidebar: { width: (!mql.matches? '100%': 500), background: "green" }
        }}
      >
        <Content
          onLeftSidebarOpen={onLeftSidebarOpen}
          onRightSidebarOpen={onRightSidebarOpen}
          leftSidebarOpen={state.leftSidebarOpen}
          rightSidebarOpen={state.rightSidebarOpen}
        />
      </Sidebar>
    </Sidebar>
  );
};
