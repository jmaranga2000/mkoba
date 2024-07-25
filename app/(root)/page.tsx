import React from 'react';
import Headerbox from '@/components/Headerbox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

// Define TypeScript interface for props
interface SearchParamProps {
  searchParams: {
    id?: string;
    page?: string;
  };
}

const Home: React.FC<SearchParamProps> = async ({ searchParams: { id, page } }) => {
  const currentPage = Number(page) || 1;
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser) {
    return <p>Error: User not logged in</p>;
  }

  const accounts = await getAccounts({
    userId: loggedInUser.$id,
  });

  if (!accounts) {
    return <p>Error: Unable to fetch accounts</p>;
  }

  const accountsData = accounts?.data;
  const appwriteItemId = id || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  if (!account) {
    return <p>Error: Unable to fetch account details</p>;
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Headerbox
            type="greeting"
            title="Welcome to Mkoba"
            user={loggedInUser?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={loggedInUser}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
