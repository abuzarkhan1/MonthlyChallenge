import './App.css';
import { Routes, Route } from 'react-router-dom';
import CreateChallenge from './components/CreateChallenge';
import GetChallenge from './components/GetChallenge';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<GetChallenge />} />
        <Route path="/create" element={<CreateChallenge />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
