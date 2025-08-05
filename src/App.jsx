import './App.css';
import { useState,useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import iconScan from './assets/icon_scan.svg';
import {  useNavigate } from "react-router-dom";
import { usePWA } from '/src/hooks/usePWA';
import { Plus, Trash2, Wifi, WifiOff, Download } from 'lucide-react';


const dataItems = [
  { id: 1, title: 'Pindai Kertas', subtitle: 'Modul React PWM', type: 'Tipe 1', icon: iconScan , route:'/todo' },
  { id: 2, title: 'Pindai Foto', subtitle: 'Modul React PWM', type: 'Tipe 2', icon: iconScan,route:'/todo' },
  { id: 3, title: 'Pindai Catatan', subtitle: 'Modul React PWM', type: 'Tipe 3', icon: iconScan,route:'/todo' },
  { id: 4, title: 'Pindai Dokumen', subtitle: 'Modul React PWM', type: 'Tipe 1', icon: iconScan,route:'/todo' },
  { id: 5, title: 'Pindai Struk', subtitle: 'Modul React PWM', type: 'Tipe 2', icon: iconScan,route:'/todo' },
  { id: 6, title: 'Pindai Lembar', subtitle: 'Modul React PWM', type: 'Tipe 3', icon: iconScan,route:'/todo' },
];

const tabs = ['Semua', 'Tipe 1', 'Tipe 2', 'Tipe 3'];

function App() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isOnline } = usePWA() 
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false) 

  useEffect(() => {
  // Test apakah event listener terpasang
  console.log('🔧 PWA Hook initialized')
  
  const handleBeforeInstallPrompt = (e) => {
    console.log('🎯 beforeinstallprompt EVENT TRIGGERED!', e)
    e.preventDefault()
    setInstallPrompt(e)
    setIsInstallable(true)
  }

  // Test apakah addEventListener berhasil
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  console.log('✅ Event listener added for beforeinstallprompt')

  return () => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    console.log('🗑️ Event listener removed')
  }
}, [])


  const filteredItems = dataItems.filter((item) => {
    const matchesTab = activeTab === 'Semua' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const installApp = async () => {
    console.log(installPrompt,"<<<masuk");
    
    if (installPrompt) {

      installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice
      console.log("<<<done");
      
      if (outcome === 'accepted') {
        console.log("download");
        
        setIsInstallable(false)
      }
      setInstallPrompt(null)
    }
  }

  useEffect(() => {
    // Cek apakah running di Alipay
    const isAlipayEnv = navigator.userAgent.indexOf('AliApp') > -1;
    
    if (isAlipayEnv && window.my) {
      console.log('Running in Alipay Mini Program WebView');
      
      // Setup message listener (terima pesan dari mini program)
      window.addEventListener('message', (event) => {
        console.log('Message from mini program:', event.data);
      });
    }
  }, []);

  const sendMessageToMiniProgram = () => {
    if (window.my && window.my.postMessage) {
      window.my.postMessage({
        type: 'userAction',
        data: 'Hello from React app'
      });
    }
  };

  const navigateInMiniProgram = () => {
    if (window.my && window.my.navigateTo) {
      window.my.navigateTo({
        url: 'pages/index/index'
      });
    }
  };

  return (
    <div className="app">
      <header className='p-8 w-full flex justify-between items-center'>
        <div>
          <h1>Web dibuat dengan AI</h1>
          <p>Prompt by Deta and Code by Kusuma</p>
        </div>
        <div className="flex items-center space-x-3">
              {/* Online/Offline Indicator */}
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                isOnline 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
              
              {/* Install Button */}
              {isInstallable && (
                <button
                  onClick={installApp}
                  className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600 transition-colors"
                >
                  <Download size={12} />
                  <span>Install</span>
                </button>
              )}
        </div>
        
      </header>
      
        <div className="flex flex-col items-center gap-2 p-4">
          <h1>My React App in Alipay WebView</h1>
          <button className="bg-amber-200" onClick={sendMessageToMiniProgram}>
            Send Message to Mini Program
          </button>
          <button className="bg-amber-200" onClick={navigateInMiniProgram}>
            Navigate in Mini Program
          </button>
        </div>
      <div className="search-box mx-auto">
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
            <div className="card" key={item.id} onClick={()=>navigate(item.route)}>
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