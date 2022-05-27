import React, {useState} from 'react';
import './App.css';
import Count from './Count';

function App() { 

  const [url, setUrl] = useState('');   
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
 
  return (
    <div>
      <h1 className="font-link">Youtube Yorum Çekilişi</h1>   
      <input className="input" type="text" placeholder="Çekiliş Adı Yazın" value={name} onChange={handleNameChange}/>   
      <input className="input" type="text" value={url} onChange={handleUrlChange} placeholder='Linki Buraya Yapıştırınız' />
      <Count  name={name} url={url} loading={loading} setLoading={setLoading}></Count>
    </div>
  );
}export default App;
