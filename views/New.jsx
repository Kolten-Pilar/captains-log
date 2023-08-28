import React from "react";

function New() {
  return (
    <div>
      {/* form */}
      <h1>Create a New Entry</h1>
      <form action="/logs" method="POST">
        Title: <input type="text" name="title"/> <br />
        Entry: <input type="textarea" name="entry"/> <br />
        Is Ship Broken: <input type="checkbox" name="shipIsBroken" /> <br />
        <input type="submit" value='Create Entry'/> <br />
      </form>
    </div>
  );
}

module.exports = New;
