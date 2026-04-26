import { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Menu from './components/Menu';
import Prebook from './components/Prebook';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePrebook = () => {
    document.getElementById('prebook').scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    document.getElementById('prebook').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Hero onPrebook={handlePrebook} />
      <Story />
      <Menu onSelect={handleSelect} />
      <Prebook selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <Footer />
    </>
  );
}

export default App;
