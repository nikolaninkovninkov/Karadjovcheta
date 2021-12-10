import React from 'react';
import Honeycomb from '../layout/honeycomb/Honeycomb';
import voteImage from '../../assets/images/vote.png';
export default function StudentDashboard() {
  return (
    <div className='dashboard-student'>
      <Honeycomb>
        <Honeycomb.Cell
          link='/vote'
          title='Vote'
          image={voteImage}
          alt='Hand turning in a vote sheet into a box'
        />
      </Honeycomb>
    </div>
  );
}
