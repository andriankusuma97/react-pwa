import './App.css';
import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import iconScan from './assets/icon_scan.svg';
import {  Outlet, useNavigate } from "react-router-dom";



const dataItems = [
  { id: 1, title: 'Pindai Kertas', subtitle: 'Modul React PWM', type: 'Tipe 1', icon: iconScan ,route:'/todo'},
  { id: 2, title: 'Pindai Foto', subtitle: 'Modul React PWM', type: 'Tipe 2', icon: iconScan ,route:'/todo'},
  { id: 3, title: 'Pindai Catatan', subtitle: 'Modul React PWM', type: 'Tipe 3', icon: iconScan ,route:'/todo'},
  { id: 4, title: 'Pindai Dokumen', subtitle: 'Modul React PWM', type: 'Tipe 1', icon: iconScan ,route:'/todo'},
  { id: 5, title: 'Pindai Struk', subtitle: 'Modul React PWM', type: 'Tipe 2', icon: iconScan ,route:'/todo'},
  { id: 6, title: 'Pindai Lembar', subtitle: 'Modul React PWM', type: 'Tipe 3', icon: iconScan ,route:'/todo'},
];

const tabs = ['Semua', 'Tipe 1', 'Tipe 2', 'Tipe 3'];

function App() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const filteredItems = dataItems.filter((item) => {
    const matchesTab = activeTab === 'Semua' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="app">
      <header>
        <h1>Web dibuat dengan AI</h1>
        <p>Prompt by Deta and Code by Kusuma</p>
      </header>

      <div className="search-box">
        <FiSearch size={20} />
        <input
          placeholder="Cari konten..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-btn" onClick={() => setSearchTerm('')}>
            <FiX size={20} />
          </button>
        )}

      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredItems.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Data tidak ditemukan</p>
        ) : (
          filteredItems.map((item) => (
            <div onClick={()=>  navigate(item.route)} className="card" key={item.id}>
              <div className="icon-wrapper">
                <img src={item.icon} alt="Scan Icon" />
              </div>
              <p className="title">{item.title}</p>
              <p className="subtitle">{item.subtitle}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
