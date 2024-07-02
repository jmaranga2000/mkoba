import Headerbox from '@/components/Headerbox'
import React from 'react'

const Home = () => {
  const loggedIn ={
    firstName: 'James'
  };
  return (
    <section className='Home'>
      <div className='home-content'>
        <header className='home-header'>
          <Headerbox
          type="greeting"
          title="Welcome to MKOBA"
          user={loggedIn?.firstName || 'James'}
          subtext='Access and manage your account and transactions first and effeciently.'
          />
        </header>
      </div>
    </section>
  )
}

export default Home