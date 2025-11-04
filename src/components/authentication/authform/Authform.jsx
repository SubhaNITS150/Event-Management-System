import React from 'react'
import GoogleSignInButton from '../google/GoogleSignInButton.jsx'
import GithubSignInButton from '../github/GithubSignInButton.jsx'


const AuthForm = () => {
  return (
    <div>
      {/* Login signup Form */}
      <GoogleSignInButton />
      <GithubSignInButton />
    </div>
  )
}

export default AuthForm
