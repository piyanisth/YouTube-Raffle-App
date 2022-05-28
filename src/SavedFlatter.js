import React from 'react'
function SavedFlatter({name,winners,backups}) {

  if(winners) {

  return (
    <div>
      {name.length >= 1 && <h2>Son Çekilişin Adı: {name}</h2>}
      <div className='save'>
        <div> 
        {winners.length >= 1 && <h4>Son Asil Kazanan</h4>}
          { winners.map( e => {
          return <ul>
              <li>
              <img src={e.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <a href={e.snippet.topLevelComment.snippet.authorChannelUrl} rel="noreferrer" target="_blank">
              <h3>{e.snippet.topLevelComment.snippet.authorDisplayName}</h3>
              </a>
              <p>{e.snippet.topLevelComment.snippet.textOriginal}</p>
              </li>
            </ul>
          })
        }
        </div>
        <div> 
        {backups.length >= 1 && <h4>Son Yedek Kazanan</h4>}
        { backups.map( e => {
          return <ul>
              <li>
              <img src={e.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <a href={e.snippet.topLevelComment.snippet.authorChannelUrl} rel="noreferrer" target="_blank">
              <h3>{e.snippet.topLevelComment.snippet.authorDisplayName}</h3>
              </a>
              <p>{e.snippet.topLevelComment.snippet.textOriginal}</p>
              </li>
            </ul>
          })
        }
        </div>
      </div>
    </div>
  )
  }
}

export default SavedFlatter