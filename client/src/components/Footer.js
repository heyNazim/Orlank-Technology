import React from 'react';

const FixedFooter = () => {
  return (
    <div className="flex flex-col">
      <footer className="bg-gray-800 text-white text-center p-4 fixed bottom-0 w-full">
        <p>&copy; 2024 Your Website. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default FixedFooter;
