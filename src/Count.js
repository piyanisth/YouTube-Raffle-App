import React, {useState} from 'react'
import Comments from './Comments'
function Count({name,url,loading,setLoading}) {

  const [winnerCount, setWinnerCount] = useState(1)
  const [backupCount, setBackupCount] = useState(1)

  function decrementWinner() {
    setWinnerCount(winnerCount - 1)
    if(winnerCount <= 1) {
      setWinnerCount(1)
    }
  }
   function incrementWinner() {
    setWinnerCount(winnerCount + 1)
     if(winnerCount >=9){
        setWinnerCount(9)
     }
  }
  function decrementBackup() {
    setBackupCount(backupCount - 1)
    if(backupCount <= 1) {
      setBackupCount(1)
    }
  }
   function incrementBackup() {
    setBackupCount(backupCount + 1)
     if(backupCount >=9){
        setBackupCount(9)
     }
  }

  return (
    <>
    <div className='buttons'>
      <div className='btnWinner'>
        <h4>Asil Sayısı</h4>
          <button className="minus"  onClick={decrementWinner}>–</button>
          <input type="number" id="input" value={winnerCount}></input>
          <button className="plus" onClick={incrementWinner}>+</button>
      </div>
      <div className='btnBackup'>
        <h4>Yedek Sayısı</h4>
          <button className="minus" onClick={decrementBackup}>–</button>
          <input type="number" id="input" value={backupCount}></input>
          <button className="plus" onClick={incrementBackup}>+</button>
      </div>
    </div>
    <Comments winnerCount={winnerCount} backupCount={backupCount} name={name} url={url} loading={loading} setLoading={setLoading}></Comments>
    </>
  )
}
export default Count


 
    


     
 

