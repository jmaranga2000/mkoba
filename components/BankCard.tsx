import { formatAmount } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

const BankCard = ({ account, userName, showBalance =
    true }: CreditCardProps) => {
  return (
    <div className='flex flex-col'>
        <Link className='bank-card'>
        <div className='bank-card_content'>
            <div>
                <h1 className='text-16 font-semibold text-white'>
                    {account.name || userName}

                </h1>
                <p className='font-ibm-plex-serif font-black
                text text-white'>
                    {formatAmount(account.totalCurrentBalance)}
                    </p>
                    
               
                </div>
            
        </div>
         </Link>
    </div>
  )
}

export default BankCard