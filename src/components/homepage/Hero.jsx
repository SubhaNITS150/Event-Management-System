import React from 'react'
import { useAuthStore } from '../../services/authservices/authStore'

const Hero = () => {

    const { user, signOut } = useAuthStore();

  return (
    <div>
      <h1>Welcome {user?.email || "Guest"} </h1> 
      {user && <button onClick={signOut}>Sign Out</button>}
    </div>
  )
}

export default Hero
