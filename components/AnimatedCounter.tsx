
'use client'

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className='w-full'>
      <CountUp
        duration={2.75}
        decimal=","
        prefix="KES"
        decimals={2}
        end={amount}
      />
    </div>
  );
};

export default AnimatedCounter;
 