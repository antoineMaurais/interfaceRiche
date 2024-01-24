import './App.css';
import { useEffect, useState } from 'react';
import { getData } from './components/Services/servicesApi';
import Footer from './components/Footer/Footer';
import LecteurVideo from './components/LecteurVideo/LecteurVideo';
import BasicExample from './components/SideNavBar/SideNavBar';
import Chapitres from './components/Chapitre/Chapitre';
import MotsCles from './components/KeyWord/MotsCles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [data, setData] = useState({
    Film: { title: '' },
    Chapters: [],
    Waypoints: [],
    Keywords: [],
  });

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const fetchData = async () => {
    try {
      const response = await getData();
      if (response.data) {
        const dataApi = response.data;
        console.log('dataApi title : ' + dataApi.Film.title);
        return dataApi;
      } else {
        console.error('Erreur lors de la récupération des données 2');
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données 1 :', error);
      return [];
    }
  };

  useEffect(() => {
    fetchData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  const handleChapterClick = (pos) => {
    console.log(`Chapitre cliqué à la position ${pos}`);
    setSelectedChapter(pos);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  return (
    <div className="App">
      <h3>Title</h3>
      <p>{data.Film.file_url}</p>
      <p>{data.Film.title}</p>

      <h3>Chapters</h3>
      {data.Chapters.map((chapter, index) => (
        <li key={index}>
          {chapter.title} (Position: {chapter.pos})
        </li>
      ))}

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
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </div>
      ))}

      <BasicExample></BasicExample>
    <Container fluid >
      <Row style={{ height: '450px' }}  id='video'>
        <Col md={1}></Col>
        {/* Colonne pour la liste des chapitres */}
        <Col md={2} className="sidebar">
          <div className="chapitres">
            <Chapitres chapters={data.Chapters} onChapterClick={(pos) => handleChapterClick(pos)} />
          </div>
        </Col>

        {/* Colonne pour le lecteur vidéo */}
        <Col md={6} className="main-content" >
          <LecteurVideo
            filmLink={data.Film.file_url}
            initialTime={selectedChapter}
            onTimeUpdate={handleTimeUpdate}
          />
        </Col>

        {/* Colonne pour le futur chat */}
        <Col md={2}>
          <div>
            <h4 style={{color: "red"}}>Chat</h4>
          </div>
        </Col>
        <Col md={1}></Col>
      </Row>
      <div className='motsCles'>
        <MotsCles keywords={data.Keywords} currentTime={currentTime} />
      </div>
      <div id='map'>
          <h4 style={{color: "red"}}>Carte</h4>
      </div>
      {/* Footer en bas de la page */}
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
