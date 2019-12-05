import React from 'react';

const Web = (props: React.Props<any>) => {
  return (
    <div className="web">
      {props.children}
    </div>
  );
}

export default Web;
