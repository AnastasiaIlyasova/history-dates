import './App.css';
import { Container } from './components/container/Container';
import { MainComponent } from './components/MainComponent/MainComponent';

function App() {
  return (
    <div className="App">
      <Container>
        <MainComponent/>
      </Container>
    </div>
  );
}

export default App;
