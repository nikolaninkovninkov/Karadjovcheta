import React from 'react';
import ReactLoader from 'react-loader-spinner';
export default function Loader() {
  return (
    <div className='loader'>
      <ReactLoader type='Oval' color='black' width='100' height='300' />
    </div>
  );
}
