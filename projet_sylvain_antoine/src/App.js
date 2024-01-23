import './App.css';
import {useEffect, useState} from "react";
import {getData} from "./components/Services/servicesApi";
import Footer from './components/Footer/Footer';
import LecteurVideo from './components/LecteurVideo/LecteurVideo';
import BasicExample from './components/SideNavBar/SideNavBar';


function App() {
  const [data, setData] = useState({ Film: { title: '' }, Chapters: [], Waypoints: [], Keywords: [] });

  const fetchData = async () => {
    try {
      const response = await getData();
      if (response.data) {
        const dataApi = response.data;
        console.log("dataApi title : " + dataApi.Film.title);

        return dataApi
      } else {
        // Gérez les erreurs ici (par exemple, réponse non ok)
        console.error('Erreur lors de la récupération des donnnées 2');
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des donnnées 1 :', error);
      return [];
    }
  };

  useEffect(() => {
    fetchData().then(fetchedData => {
      setData(fetchedData);
    });
  }, []);

  

  return (
    <div className="App">
      <h3>Title</h3>
      <p>{data.Film.file_url}</p>
      <p>{data.Film.title}</p>

      <h3>Chapters</h3>
        {
          data.Chapters.map((chapter, index) => (
            <li key={index}>
              {chapter.title} (Position: {chapter.pos})
            </li>
          ))
        }

        <h3>Waypoints</h3>
        {data.Waypoints.map((waypoint, index) => (
            <li key={index}>
              {waypoint.label} (Lat: {waypoint.lat}, Lng: {waypoint.lng}, Timestamp: {waypoint.timestamp})
            </li>
        ))}

        <h3>Keywords</h3>
        {data.Keywords.map((keyword, index) => (
            <div key={index}>
              <h4>Position: {keyword.pos}</h4>

                {keyword.data.map((item, idx) => (
                    <li key={idx}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    </li>
                ))}

            </div>
        ))}


      <BasicExample></BasicExample>

      <div className='lecteur'>
        

        <LecteurVideo  filmLink={data.Film.file_url}></LecteurVideo>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
