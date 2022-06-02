import React, {useState, useEffect} from 'react'
import Switch from '@mui/material/Switch';
import { getComments } from './api';
import Tags from './Tags';
import Modal from './Modal';
import InventoryIcon from '@mui/icons-material/Inventory';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
function Home({winnerCount,backupCount,name,url}) {

  const [countEachAuthorOnce, setCountEachAuthorOnce] = useState(false)
  const [countSameCommentsOnce, setCountSameCommentsOnce] = useState(false)  
  const [winners, setWinners] = useState([])
  const [backups, setBackups] = useState([])
  const [savedRaffles, setSavedRaffles] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalWinners, setModalWinners] = useState([]);
  const [modalBackups, setModalBackups] = useState([]);

  async function startHandle(e)  {
    
    e.preventDefault()
    const comments = await getComments(url,setLoading) 
    let finalArray = []
    
    const uniquebyAuthorComment = new Set()  
    const uniquebyAuthorId = new Set()  
    
    for( const comment of comments){
      if(tags.length > 0){
        let seperatedTags = tags.toString().split(/[ ,]+/)
        let seperatedComments = comment.snippet.topLevelComment.snippet.textOriginal.split(/[ ,]+/)
        const isContainsAll = seperatedTags.every(item => seperatedComments.includes(item))
        if(!isContainsAll) {
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
    const shuffled = finalArray.sort(() => 0.5 - Math.random());    
    setWinners(shuffled.slice(0, winnerCount))
    setBackups(shuffled.slice(winnerCount, winnerCount+backupCount))
  }
 
  const countEachAuthorOnceHandle = (e) => {
    setCountEachAuthorOnce(e.target.checked);
  };
  const countSameCommentsOnceHandle = (e) => {
    setCountSameCommentsOnce(e.target.checked);
  };
  useEffect(() => {
    window.localStorage.getItem("raffles") ? setSavedRaffles(JSON.parse(window.localStorage.getItem("raffles"))) : setSavedRaffles([])
  }, []);
  function SaveHandle() {
    const newRaffles = [...savedRaffles, {name,winners,backups}]
    setSavedRaffles(newRaffles)
    window.localStorage.setItem("raffles", JSON.stringify(newRaffles))
  }  
  function modalShow(index) {
    const chosenRaffle = savedRaffles[index]
    setModalName(chosenRaffle.name)
    setModalWinners(chosenRaffle.winners)
    setModalBackups(chosenRaffle.backups)
    setModal(!modal)
  }
  function modalDelete(index){
    const remainingRaffles = savedRaffles.filter(((e,i) => index !== i))
    setSavedRaffles(remainingRaffles)
    window.localStorage.setItem("raffles", JSON.stringify(remainingRaffles))
  }

  return (
    <div>     
   <Tags tags={tags} setTags={setTags}></Tags>
    <div className='p1'>
    - Yazılan kelime veya kelime gruplarını içeren yorumları seçer <br />
    - Birden fazla kelime veya kelime grubu belirleyebilirsiniz <br />
    - Yazdıktan sonra Enter'a basın
    </div>
    <h2 className='h22'>
    <Switch checked={countEachAuthorOnce} onChange={countEachAuthorOnceHandle} color="error"/>
    Her kullanıcıyı bir kere say
    </h2>
    <div className='p2'>- Birden fazla yorum yapan kullanıcıların sadece tek yorumu geçerli olur</div>
    <h2 className='h22'>
    <Switch checked={countSameCommentsOnce} onChange={countSameCommentsOnceHandle} color="error"/>
    Aynı yorumları bir kere say
    </h2>
    <div className='p2'>- Aynı yorumu birden fazla kez yapan kullanıcıların yalnızca tek yorumları geçerli olur</div>
    <buttonstart className={loading ? "loading" : "startButton"} onClick={startHandle}><div className='spinner'/><p className="btntext">BAŞLAT</p></buttonstart>
    {loading && <h2 className='loading'>Sonuçlar Yükleniyor..</h2>}
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
      <button className="saveButton" onClick={SaveHandle} > <SaveAltIcon />  Çekilişi Kaydet</button>
    <table>
      <thead>
        <tr><th><InventoryIcon/>  Geçmiş Çekilişler</th></tr>
        <tbody>
        {savedRaffles.map((e,index) => {
          return <tr key={index}>
            <td className='tdName'>{e.name}</td>
            <td><button className="showRaffleBtn" onClick={() => modalShow(index)}>GÖSTER</button></td>
            <td className='tdIcon'><RemoveCircleOutlineIcon onClick={() =>modalDelete(index)}/></td>
            </tr>
          })
        }
        </tbody>
      </thead>
    </table>
    <Modal modal={modal} setModal={setModal} name={modalName} winners={modalWinners} backups={modalBackups}  ></Modal>
    </div>    
  )
}
export default Home