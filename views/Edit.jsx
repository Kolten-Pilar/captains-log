import React from 'react'
const Default = require('./layout/Default.jsx');

function Edit( {log} ) {
  return (
    <Default title='Edit Logs'>
      <form method='POST' action={`/logs/${log._id}?_method=PUT`}>
        <h1>Title: <input type="text" name="title" defaultValue={log.title}/></h1>
        <h2>Entry: <input type="textarea" name="entry" defaultValue={log.entry}/></h2>
        <h2>Is Ship Broken:
           {log.shipIsBroken ? (
            <input 
              type="checkbox"
              name="shipIsBroken" 
              defaultChecked />
            ) : (
              <input 
              type="checkbox" 
              name="shipIsBroken"
              />)} 
        </h2>
        <input type="submit" value='Edit Entry'/>
      </form>
    </Default>
  )
}

module.exports = Edit;