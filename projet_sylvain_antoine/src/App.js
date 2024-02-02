import React, { useEffect, useState } from 'react';
import { getData } from './components/Services/servicesApi';
import Footer from './components/Footer/Footer';
import LecteurVideo from './components/LecteurVideo/LecteurVideo';
import NitFlexNavBar from './components/SideNavBar/SideNavBar';
import Chapitres from './components/Chapitre/Chapitre';
import MotsCles from './components/KeyWord/MotsCles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapChart from "./components/MapChart/MapChart";
import StyleChat from "./components/Chat/StyleChat";
import Button from "react-bootstrap/Button";
import './App.css';

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
        return response.data;
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
    setSelectedChapter(pos);
  };

  const handleMarkerClick = (pos) => {
    setSelectedChapter(pos);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  return (
      <div className="App">
        <div className='navBar'>
          <NitFlexNavBar></NitFlexNavBar>
        </div>
        <Container fluid style={{ paddingTop: '4rem' }}>
          <Row className="justify-content-md-center" style={{ paddingTop: '2rem' }}>
            <Col md={8} className="text-center">
              <h4 style={{ color: "red" }}>{data.Film.title}</h4>
              <a href={data.Film.synopsis_url}>
                <Button variant="danger">Synopsis</Button>
              </a>
            </Col>
          </Row>

          <Row style={{ paddingTop: '2rem', paddingBottom: '2rem' }} className="align-items-start">
            <Col md={2}>
              <Chapitres chapters={data.Chapters} onChapterClick={handleChapterClick} />
            </Col>

            <Col md={7} id='video'>
              <LecteurVideo
                  filmLink={data.Film.file_url}
                  initialTime={selectedChapter}
                  onTimeUpdate={handleTimeUpdate}
              />
            </Col>

            <Col md={3}>
              <StyleChat username={"Sylvain"}/>
            </Col>
          </Row>

          <Row>
            <Col>
              <MotsCles keywords={data.Keywords} currentTime={currentTime} />
            </Col>
          </Row>

          <Row className="justify-content-md-center" style={{ marginTop: '2rem' }} id='map'>
            <Col md={8}>
              <h4 style={{ color: "red" }}>Carte du road trip</h4>
              <MapChart
                  id="map"
                  waypoints={data.Waypoints}
                  currentTime={currentTime}
                  onMarkerClick={handleMarkerClick}/>
            </Col>
          </Row>
        </Container>
        <div id='contact'>
          <Footer />
        </div>
      </div>
  );
}

export default App;
