import React from 'react';

function Hero({ children }) {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="content has-text-centered">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
