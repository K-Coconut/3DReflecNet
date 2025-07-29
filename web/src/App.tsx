import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './components/Layout/AppLayout';
import Home from './pages/Home';
import Instances from './pages/Instances';
import InstanceDetail from './pages/InstanceDetail';
import Environments from './pages/Environments';
import EnvMapDetail from './pages/EnvMapDetail';
import Lidars from './pages/Lidars';
import LidarDetail from './pages/LidarDetail';
import './App.css';

function App() {
  return (
    <ConfigProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instances" element={<Instances />} />
            <Route path="/instances/:id" element={<InstanceDetail />} />
            <Route path="/environments" element={<Environments />} />
            <Route path="/environments/:id" element={<EnvMapDetail />} />
            <Route path="/lidars" element={<Lidars />} />
            <Route path="/lidars/:id" element={<LidarDetail />} />
          </Routes>
        </AppLayout>
      </Router>
    </ConfigProvider>
  );
}

export default App
