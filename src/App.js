import './app.scss';
import Navbar from './components/Navbar/Navbar'
import Main from './pages/Main/Main'
import SobreMim from './pages/SobreMim/SobreMim'
import Habilidades from './pages/Habilidades/Habilidades';
import Servicos from './pages/Servicos/Servicos';
import Projetos from './pages/Projetos/Projetos';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      
      <Navbar />
      <Main />
      <SobreMim />
      <Habilidades />
      <Servicos />
      <Projetos />
      <Footer />
 
    </div>
  );
}

export default App;
