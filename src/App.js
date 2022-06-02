import React, {useState} from 'react';
import Count from './Count';
import './App.css';
function App() { 

  const [url, setUrl] = useState('');   
  const [name, setName] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
 
  return (
    <div className='allContainer'>
      <h1 className="font-link">Youtube Yorum Çekilişi</h1>   
      <input className="inputt" type="text" placeholder="Çekiliş Adı Yazınız" value={name} onChange={handleNameChange}/>   
      <input className="inputt" type="text" value={url} onChange={handleUrlChange} placeholder='YouTube Linkini Yapıştırınız' />
      <Count  name={name} url={url}></Count>
    </div>
  );
}
export default App;
