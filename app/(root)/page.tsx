import Headerbox from '@/components/Headerbox'
import TotalBalanceBox from '@/components/TotalBalanceBox';
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
          user={loggedIn?.firstName || 'Guest'}
          subtext='Access and manage your account and transactions first and effeciently.'
          />
          <TotalBalanceBox
          accounts={[]}
          totalbanks={1}
          totalCurrentBalance={1500.0}
          />
        </header>
      </div>
    </section>
  )
}

export default Home