import React from "react";

function Default({children, title}) {
  // console.log(children);
  return (
    <div>
      <head>
        <title>{title}</title>
      </head>
      <body>
        <h1>{title}</h1>
        {children}
      </body>
    </div>
  );
}

module.exports = Default;
