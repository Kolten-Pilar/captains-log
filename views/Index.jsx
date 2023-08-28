import React from 'react';
const Default = require('./layout/Default.jsx');

function Index( {logs} ) {
  return (
    <Default title={'Logs Index Page'}>
      <nav>
        <a href="/new">Create a New Entry</a>
      </nav>
      <br />
      <ul>
        {logs.map((log, i) => {
          return (
            <li key={i}>
              <h1><a href={`/logs/${log.id}`}>{log.title}</a></h1>
              <h2>- {log.entry}</h2>
              <h2>- {log.shipIsBroken ? 'Ship is broken' : 'Ship is not broken'}</h2> 
              {/* delete button */}
              <form method='POST' action={`/logs/${log.id}?_method=DELETE`}>
                <input type='submit' value='Delete Log' />
              </form>
              <br />
              {/* edit button */}
              <a href={`/logs/${log.id}/edit`}>Edit Log</a>
            </li>
          );
        })}
      </ul>
    </Default>
  )
}

module.exports = Index;