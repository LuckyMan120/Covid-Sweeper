import React from 'react';
import '../stylesheets/NotFound.css';

export default function NotFound() {
  return (
    <div className='NotFound'>
      <h3 style={{ margin: '1rem' }}>
        Sorry, this device or page is unsupported!
      </h3>
      <p>You might be seeing this page because you're on a handheld device.</p>
      <p>
        Unfortunately, mouse clicks are essential to the use of this
        application. Please return again soon on a suitable device!
      </p>
    </div>
  );
}
