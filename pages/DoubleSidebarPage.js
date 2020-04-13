import React, { useEffect, useState } from "react";
import DoubleSidebarLayout from "../layouts/DoubleSidebarLayout";

const Content = props => {
  const openLeftSidebar = () => props.onLeftSidebarOpen(true);
  const openRightSidebar = () => props.onRightSidebarOpen(true);
  return (
    <div style={{ background: "#ef00ef" }}>
      <button onClick={openLeftSidebar}>left sidebar</button>
      <button onClick={openRightSidebar}>right sidebar</button>
      <p>
        SOME TEXT: Lorem ipsum dolor sit amet, mauris nisl sed vel, integer
        consectetuer fringilla consectetuer adipiscing, platea orci pede purus
        tempor, eget duis ac, pede posuere bibendum vel nec conubia. Neque quis
        ut viverra id vitae tincidunt, et curabitur vitae dui sagittis cum,
        imperdiet justo mauris a. Vulputate a tempus amet condimentum amet, eget
        est fermentum ipsum ipsum erat, feugiat ligula quam velit, eleifend
        litora hendrerit ac maiores tortor curabitur, dolor donec. Eu non
        curabitur, dignissim orci ornare eu consequat. Tortor erat auctor
        porttitor viverra, vitae in elementum sapien quis. Ullamcorper in, dolor
        facilisis varius at ac id euismod, rutrum consequat. Quam quis lectus
        urna commodo maecenas, nisl et ullamcorper mattis ante.
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

const mql = window.matchMedia("(min-width: 800px)");

export default () => {
  const [mqlMatch, setMqlMatch] = useState(mql.matches);

  const mediaQueryChanged = () => {
    setMqlMatch(mql.matches);
  };

  useEffect(() => {
    mql.addListener(mediaQueryChanged);
    return () => {
      mql.removeListener(mediaQueryChanged);
    };
  }, [mediaQueryChanged]);

  return (
    <DoubleSidebarLayout      
      leftSidebar={leftSidebarProps => <LeftSidebar {...leftSidebarProps} />}
      rightSidebar={rightSidebarProps => (
        <RightSidebar {...rightSidebarProps} />
      )}
      content={contentProps => <Content {...contentProps} />}
      breakpoints={{left:"md"}}
      innerProps={{
        //left: { docked: false }
      }}
      styles={{
        left: {
          root: { top: 40 },
          sidebar: { width: 300, background: "blue" },
        },
        right: {
          sidebar: { width: mqlMatch ? 300 : "100%", background: "green" },
          content: { background: "yellow" }
        }
      }}
    />
  );
};
