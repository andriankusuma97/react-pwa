import { useState, useEffect } from 'react'

export const usePWA = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    // Handle online/offline
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    console.log("<<< masuk sini");

     // Cek apakah sudah diinstall
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('PWA sudah diinstall!');
    // setIsInstalled(true)
  }
    
    // Handle install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
      setIsInstallable(true)
      console.log(isInstallable,"<<<<<ini");
      
    }

    // Handle app installed
    const handleAppInstalled = () => {
      setIsInstallable(false)
      setInstallPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('Install prompt ready!', e)
    })

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    // handleBeforeInstallPrompt()
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

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

  return {
    isOnline,
    isInstallable,
    installApp
  }
}