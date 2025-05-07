import React from 'react';

function DocAdv() {
  return (
    <div className="w-full max-w-md ">
      <div 
        className="rounded-3xl overflow-hidden shadow-lg"
        style={{ backgroundColor: '#001847' }}
      >
        {/* Doctor Image Section - In your implementation, replace with your actual image */}
        <div className="w-full p-4">
          <img 
            src="\images\doctor-listing\consult_doctor.webp " 
            alt="Three doctors standing together" 
            className="w-full object-cover"
          />
        </div>
        
        {/* Text Content */}
        <div className="p-6 text-white">
          <h2 className="text-4 font-bold mb-8 leading-tight">
            Need help consult the
            <br />
            right doctor?
          </h2>
          
          <p className="text-2 mb-6">
            <a href="tel:+91-8040245807" className="text-white">
              <span className="underline">
                <span className="font-normal">Call </span>
                <span className="font-bold">+91-8040245807</span>
                <span className="font-normal"> to</span>
              </span>
              <br />
              <span className="underline">book instantly</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DocAdv;