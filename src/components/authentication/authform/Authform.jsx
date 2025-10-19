import React from 'react'
import GoogleSignInButton from '../google/GoogleSignInButton'
import GithubSignInButton from '../github/GithubSignInButton'


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
