import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './Page';

function PortfolioBook() {
  return (
    <div style={{ marginTop: '100px' }}>
      <HTMLFlipBook
        width={300}
        height={400}
        showCover={true}
        flippingTime={1000}
        useMouseEvents={true}
        startPage={0}
        style={{ zIndex: 1 }}
      >
        <Page>
          <div className="cover">
            <h1>Welcome to My Digital Book</h1>
            <h2>Shashank Kesavamatham</h2>
            <p>Turn the page to see my journey</p>
          </div>
        </Page>
        <Page>
          <div className="page-wrapper">
            <div className="page-inner">
              <h2>About Me</h2>
              <p>Cybersecurity-focused student driven by curiosity and integrity.</p>
            </div>
          </div>
        </Page>
        <Page>
          <div className="page-wrapper">
            <div className="page-inner">
              <h2>Work Experience</h2>
            </div>
          </div>
        </Page>
        <Page>
          <div className="page-wrapper">
            <div className="page-inner">
              <h2>Skills</h2>
            </div>
          </div>
        </Page>
      </HTMLFlipBook>
    </div>
  );
}

export default PortfolioBook;
