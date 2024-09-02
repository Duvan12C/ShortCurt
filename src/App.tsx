import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import IndexHistoryView from './assets/view/IndexHistoryView';
import HomeView from './assets/view/HomeView';
import ShortenUrlView from './assets/view/ShortenUrlView';
import './index.css'

const App: React.FC = () => {
    return (
        <div>
            <nav className=''>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/history">Historial de URLs</Link></li>
                    <li><Link to="/shorten-url">Acortar URL</Link></li>
                </ul>
                
            </nav>

            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/history" element={<IndexHistoryView />} />
                <Route path="/shorten-url" element={<ShortenUrlView />} />
            </Routes>
        </div>
    );
};

export default App;
