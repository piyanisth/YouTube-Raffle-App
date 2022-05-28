import React, {useState} from 'react'
import Switch from '@mui/material/Switch';
import SavedFlatter from './SavedFlatter';
import { getComments } from './api';
function Comments({winnerCount,backupCount,name,url,loading,setLoading}) {

  const [keywords, setKeyWords] = useState([""])
  const [countEachAuthorOnce, setCountEachAuthorOnce] = useState(false)
  const [countSameCommentsOnce, setCountSameCommentsOnce] = useState(false)  
  const [winners, setWinners] = useState([])
  const [backups, setBackups] = useState([])
  const [savedWinners, setSavedWinners] = useState([])
  const [savedBackups, setSavedBackups] = useState([])
  const [savedNames, setSavedNames] = useState([])
  async function startHandle(e)  {
    
    e.preventDefault()
    const comments = await getComments(url,setLoading) 
    let finalArray = []
    
    const uniquebyAuthorComment = new Set()  
    const uniquebyAuthorId = new Set()  

    for( const comment of comments){

      if(keywords.length > 1){
        let seperatedKeywords = keywords.split(/[ ,]+/);
        let seperatedComments = comment.snippet.topLevelComment.snippet.textOriginal.split(/[ ,]+/)
        let isContainsAll = seperatedKeywords.every(item => seperatedComments.includes(item))
        if(!isContainsAll){
          continue
        }
      } 
      else{
        if(!comment.snippet.topLevelComment.snippet.textOriginal.includes(keywords)) {
          continue
        }
      }
      
      if(countEachAuthorOnce && uniquebyAuthorId.has(comment.snippet.topLevelComment.snippet.authorChannelId.value)){
        continue
      }
      if(countSameCommentsOnce && uniquebyAuthorComment.has(comment.snippet.topLevelComment.snippet.authorChannelId.value + comment.snippet.topLevelComment.snippet.textOriginal)){
        continue
      }
      uniquebyAuthorId.add(comment.snippet.topLevelComment.snippet.authorChannelId.value) 
      uniquebyAuthorComment.add(comment.snippet.topLevelComment.snippet.authorChannelId.value + comment.snippet.topLevelComment.snippet.textOriginal)
      finalArray.push(comment)
    }
    console.log("uniquebyAuthorComment",uniquebyAuthorComment)
    console.log("uniquebyAuthorId",uniquebyAuthorId)    
    console.log("finalArray",finalArray)
    const shuffled = finalArray.sort(() => 0.5 - Math.random());    
    setWinners(shuffled.slice(0, winnerCount))
    setBackups(shuffled.slice(winnerCount, winnerCount+backupCount))
  }
 
  const keywordHandle = (e) => {
    setKeyWords(e.target.value)
  }

  const countEachAuthorOnceHandle = (e) => {
    setCountEachAuthorOnce(e.target.checked);
  };
  const countSameCommentsOnceHandle = (e) => {
    setCountSameCommentsOnce(e.target.checked);
  };

  const saveHandle = (e) => {
    
    e.preventDefault()
    setSavedWinners(winners)
    setSavedBackups(backups)
    setSavedNames(name)
  }

  return (
    <div>     
    <input value={keywords} type="text" className='words' placeholder='Anahtar Kelime' onChange={keywordHandle}></input>
    <div className='p2'>
    - Yazılan kelime veya kelime gruplarını içeren yorumları seçer <br />
    - Birden fazla kelime veya kelime grubu belirleyebilirsiniz
    </div>
    <h2>
    <Switch checked={countEachAuthorOnce} onChange={countEachAuthorOnceHandle} color="error"/>
    Her kullanıcıyı bir kere say
    </h2>
    <div className='p2'>- Birden fazla yorum yapan kullanıcıların sadece tek yorumu geçerli olur</div>
    <h2>
    <Switch checked={countSameCommentsOnce} onChange={countSameCommentsOnceHandle} color="error"/>
    Aynı yorumları bir kere say
    </h2>
    <div className='p2'>- Aynı yorumu birden fazla kez yapan kullanıcıların yalnızca tek yorumları geçerli olur</div>
    <button className="startButton" onClick={startHandle} >BAŞLAT</button>
    {loading && <h2 className='loading'>Sonuçlar Yükleniyor..</h2>}
    {winners.length >= 1 && <h2>Asil Kazanan</h2>}
    { winners.map((e) => {
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
    {backups.length >= 1 && <h2>Yedek Kazanan</h2>}
    { backups.map((e) => {
      return <ul>
        <li>
        <img src={e.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
        <a href={e.snippet.topLevelComment.snippet.authorChannelUrl}  rel="noreferrer" target="_blank">
        <h3>{e.snippet.topLevelComment.snippet.authorDisplayName}</h3>
        </a>
        <p>{e.snippet.topLevelComment.snippet.textOriginal}</p>
        </li>
        </ul>
      })
    }
    <button className="saveButton" onClick={saveHandle}>Çekilişi Kaydet</button>
    <SavedFlatter winners={savedWinners} backups={savedBackups} name={savedNames}></SavedFlatter>
    </div>    
  )
}
export default Comments