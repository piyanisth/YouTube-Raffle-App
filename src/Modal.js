import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
function Modal({modal,setModal,name,winners,backups}) {

  return (
      <>
        {modal && (
          <div className="modal">
            <div onClick={() => setModal(!modal)} className="outsideofModal"></div>
            <div className="modalContent">
              <h2>Çekiliş Adı: {name}</h2>
              {winners?.length >= 1 && <h4 className='winnerh4'>Asil Kazanan</h4>}
              { winners?.map((e,item) => {
                return <ul key={item}>
                  <li>
                  <img src={e.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                  <a href={e.snippet.topLevelComment.snippet.authorChannelUrl}  rel="noreferrer" target="_blank">
                  <h3>{e.snippet.topLevelComment.snippet.authorDisplayName}</h3>
                  </a>
                  <p>{e.snippet.topLevelComment.snippet.textOriginal}</p>
                  </li>
                  </ul>
                })}
              {backups?.length >= 1 && <h4 className='winnerh4'>Yedek Kazanan</h4>}
              { backups?.map((e, item) => {
                return <ul key={item}>
                  <li>
                  <img src={e.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                  <a href={e.snippet.topLevelComment.snippet.authorChannelUrl}  rel="noreferrer" target="_blank">
                  <h3>{e.snippet.topLevelComment.snippet.authorDisplayName}</h3>
                  </a>
                  <p>{e.snippet.topLevelComment.snippet.textOriginal}</p>
                  </li>
                  </ul>
                })}
                <HighlightOffIcon className="close-modalBtn" fontSize='large' onClick={() => setModal(!modal)}></HighlightOffIcon>
            </div>
          </div>
        )}
      </>
  )
}
export default Modal