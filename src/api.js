import axios from "axios"
import queryString from "query-string"
export async function getComments(url,setLoading) {

  try {
    setLoading(true)
    const mainUrl = "https://www.googleapis.com/youtube/v3"
    const apiKey = "AIzaSyBCpRag47Xog-qy2Z8HBICo9Sqoa6dQpuE" 
    const parsed = queryString.parse(url.split('?')[1])  
    // const videoId= url.match('v=([a-zA-Z0-9_-]+)&?')[1]
    const videoId = parsed.v
    let urlWide = `${mainUrl}/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=100`;
    let response = await axios.get(urlWide);
    let comments = response.data.items;

    while(response.data.nextPageToken) {
    let nextPage = `${mainUrl}/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=100&pageToken=${response.data.nextPageToken}`;
    response = await axios.get(nextPage);
    comments = comments.concat(response.data.items);
    }
    setLoading(false)
    return comments;
  } 
  catch(err) {
    console.log("ApiError",err);
  }
} 
  
