import './App.css';
import { useEffect, useState } from 'react';
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
      <Container>
        <Row style={{paddingTop: '100px'}}>
          <Col md={{ span: 4, offset: 4 }}>
                <h4 style={{color: "red"}}>{data.Film.title}</h4>
          </Col>
          <Col md={{ span: 4}}>
                <a href={data.Film.synopsis_url}>Synopsis</a>
          </Col>
        </Row>

        <Row style={{ height: '650px', padding: '50px 0px'}}  id='video'>
          <Col xs={12} md={2} lg={2} xl={2} className="sidebar" style={{ height: '600px'}}>
            <div className="chapitres">
              <Chapitres
                  chapters={data.Chapters}
                  onChapterClick={(pos) => handleChapterClick(pos)} />
            </div>
          </Col>

          <Col xs={12} md={7} lg={7} xl={7} style={{ margin: '50px 0px'}} >
            <LecteurVideo
              filmLink={data.Film.file_url}
              initialTime={selectedChapter}
              onTimeUpdate={handleTimeUpdate}
            />
          </Col>

          <Col xs={12} md={3} lg={3} xl={3} style={{ height: '600px'}}>
            <StyleChat username={"Sylvain"}/>
          </Col>
        </Row>
      
        <Row>
          <Col xs={12} md={12} lg={12} xl={12}>
            <div>
              <MotsCles
                  keywords={data.Keywords}
                  currentTime={currentTime} />
            </div>
          </Col>
        </Row>

        <Row>
          <div id='map' style={{marginTop: '20px'}}>
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <h4 style={{color: "red"}}>Carte du road trip</h4>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <MapChart
                  waypoints={data.Waypoints}
                  currentTime={currentTime}
                  onMarkerClick={(pos) => handleMarkerClick(pos)}/>
              </Col>
            </Row>            
          </div>
        </Row>
      </Container>
    <div id='contact'>
      <Footer />
    </div>
  </div>
  );
}

export default App;
