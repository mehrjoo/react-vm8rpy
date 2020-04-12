import React, { useState } from "react";
import Sidebar from "react-sidebar";

const Content = props => {
  return (
    <div style={{ background: "#ef00ef" }}>
      <button onClick={props.onLeftSidebarOpen}>left sidebar</button>
      <button onClick={props.onRightSidebarOpen}>right sidebar</button>
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

const ContentWithSidebar = props => {
  return (
    <Sidebar
      sidebar={
        <RightSidebar
          onSidebarOpen={props.onRightSidebarOpen}
          // sidebarDocked={state.sidebarDocked}
          sidebarOpen={props.rightSidebarOpen}
        />
      }
      open={props.rightSidebarOpen}
      docked={props.rightSidebarOpen}
      onSetOpen={props.onRightSidebarOpen}
      // contentId="contentView"
      // contentClassName="element"
      // shadow={false}
      pullRight
      styles={{
        //   root: { top: 41 },
        //   content: { background: "#ddd" },
        sidebar: { width: 500, background: "green" }
      }}
    >
      <Content
        onLeftSidebarOpen={props.onLeftSidebarOpen}
        onRightSidebarOpen={props.onRightSidebarOpen}
        sidebarOpen={props.leftSidebarOpen}
        sidebarOpen={props.rightSidebarOpen}
      />
    </Sidebar>
  );
};

export default ({ name }) => {
  const [state, setState] = useState({
    //sidebarDocked: mql.matches,
    leftSidebarOpen: false,
    rightSidebarOpen: false
  });

  const onLeftSidebarOpen = open => {
    setState({ leftSidebarOpen: open });
  };

  const onRightSidebarOpen = open => {
    setState({ rightSidebarOpen: open });
  };

  return (
    <Sidebar
      sidebar={
        <LeftSidebar
          onSidebarOpen={onLeftSidebarOpen}
          // sidebarDocked={state.sidebarDocked}
          sidebarOpen={state.leftSidebarOpen}
        />
      }
      open={state.leftSidebarOpen}
      docked={state.leftSidebarOpen}
      onSetOpen={onLeftSidebarOpen}
      // contentId="contentView"
      // contentClassName="element"
      // shadow={false}
      styles={{
        root: { top: 41 },
        sidebar: { width: 300, background: "blue" }
        //   content: { background: 'white' },
      }}
    >
      <ContentWithSidebar
        leftSidebarOpen={state.leftSidebarOpen} 
        rightSidebarOpen={state.rightSidebarOpen} 
        onLeftSidebarOpen={onLeftSidebarOpen} 
        onRightSidebarOpen={onRightSidebarOpen} 
        />
    </Sidebar>
  );
};
