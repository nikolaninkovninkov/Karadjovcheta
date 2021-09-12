import React from 'react';
import voteImage from '../../assets/images/vote.png';
export default function DashboardCard() {
  return (
    <div className='dashboard-card'>
      <img src={voteImage} alt='Person putting their vote in a box' />
      <h1>Lorem.</h1>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        temporibus excepturi, ad soluta quaerat voluptatibus unde fugiat
        necessitatibus quod cumque.
      </h3>
    </div>
  );
}
