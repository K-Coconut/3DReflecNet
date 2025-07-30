import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './components/Layout/AppLayout';
import HomePage from './pages/HomePage';
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
      <Router basename="/3DReflecNet">
        <Routes>
          {/* Main academic page without layout */}
          <Route path="/" element={<HomePage />} />
          
          {/* Demo routes with layout */}
          <Route element={<AppLayout><Outlet /></AppLayout>}>
            <Route path="/demo" element={<Home />} />
            <Route path="/instances" element={<Instances />} />
            <Route path="/instances/:id" element={<InstanceDetail />} />
            <Route path="/environments" element={<Environments />} />
            <Route path="/environments/:id" element={<EnvMapDetail />} />
            <Route path="/lidars" element={<Lidars />} />
            <Route path="/lidars/:id" element={<LidarDetail />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;