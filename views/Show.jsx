import React from 'react'

function Show( {log} ) {
  // console.log(log);
  return (
    <div>
      <h1>{log.title}</h1>
      <h2>{log.entry}</h2>
      <h2>{log.shipIsBroken ? "The ship has been destroyed!!" : "The Ship is operational."}</h2>
      <p>Log Created at: {(log.createdAt).toLocaleString()}</p>
      <p>Log Updated at: {(log.updatedAt).toLocaleString()}</p>
      <a href={`/logs`}>Back to Index</a>
    </div>
  )
}

module.exports = Show