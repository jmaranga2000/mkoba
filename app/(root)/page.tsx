import Headerbox from '@/components/Headerbox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
  const loggedIn ={
    firstName: 'James', lastName: 'Kamanda',
    email: 'jmaranga@gmail.com'
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
          totalCurrentBalance={1500000.0}
          />
        </header>

        RECENT TRANSACTIONS
      </div>
      <RightSidebar 
      user={loggedIn}
      transactions={[]}

      banks={[
        { currentBalance: 17000.50},
         {currentBalance: 67000.50}
        ]}
      />

    </section>
  )
}

export default Home