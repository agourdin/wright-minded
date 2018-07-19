import React from 'react';

import Hero from 'common/wrappers/styling/Hero';

export function Loading(props) {
  if (props.error) {
    return (
      <Hero>
        <div>Whoops! Something went wrong...</div>
        <div>
          <button onClick={props.retry}>Retry</button>
        </div>
      </Hero>
    );
  } else if (props.timedOut) {
    return (
      <Hero>
        <div>
          Hmm, this is taking a while...{' '}
          <button onClick={props.retry}>Retry</button>
        </div>
      </Hero>
    );
  } else if (props.pastDelay) {
    return (
      <Hero>
        <h1>Loading...</h1>
      </Hero>
    );
  } else {
    return null;
  }
}

export default Loading;
