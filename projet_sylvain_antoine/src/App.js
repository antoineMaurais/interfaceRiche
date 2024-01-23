import './App.css';
import Footer from './components/Footer/Footer';
import LecteurVideo from './components/LecteurVideo/LecteurVideo';
import BasicExample from './components/SideNavBar/SideNavBar';



function App() {
  return (
    <div className="App">

      <BasicExample></BasicExample>

      <div className='lecteur'>
        

        <LecteurVideo></LecteurVideo>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
