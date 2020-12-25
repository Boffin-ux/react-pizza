import React from 'react';
import ContentLoader from 'react-content-loader';

const PreLoadBlock = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={3}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#fafafa"
      foregroundColor="#ecebeb">
      <circle cx="140" cy="121" r="120" />
      <rect x="0" y="257" rx="6" ry="6" width="280" height="25" />
      <rect x="0" y="292" rx="10" ry="10" width="280" height="85" />
      <rect x="0" y="395" rx="6" ry="6" width="100" height="30" />
      <rect x="130" y="387" rx="25" ry="25" width="150" height="45" />
    </ContentLoader>
  );
};

export default PreLoadBlock;
