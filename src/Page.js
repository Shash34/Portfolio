import React from 'react';

const Page = React.forwardRef(({ children }, ref) => {
  return (
    <div className="page" ref={ref}>
      {children}
    </div>
  );
});

export default Page;
