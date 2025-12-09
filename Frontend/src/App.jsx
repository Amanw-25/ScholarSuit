import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@/components/ui/button'
import { Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import Header from '@/components/custom/Header'
import { Toaster } from '@/components/ui/sonner'
function App() {
  const [count, setCount] = useState(0)
  const { isSignedIn, user ,isLoaded} = useUser()

  
  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  )
}

export default App
