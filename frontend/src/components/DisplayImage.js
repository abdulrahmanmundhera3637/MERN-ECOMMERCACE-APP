import React from 'react';
import { IoMdClose } from 'react-icons/io';

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50'>
      <div className='bg-white shadow-lg rounded relative p-4 
        max-w-[90vw] max-h-[90vh] 
        sm:max-w-[80vw] sm:max-h-[80vh] 
        md:max-w-[70vw] md:max-h-[70vh] 
        lg:max-w-[50vw] lg:max-h-[50vh] 
        xl:max-w-[40vw] xl:max-h-[60vh]'>
        <div
          className="absolute top-2 right-2 cursor-pointer text-2xl hover:text-red-600"
          onClick={onClose}
        >
          <IoMdClose />
        </div>
        <div className='flex justify-center items-center h-full'>
          <img
            src={imgUrl}
            className='max-w-full max-h-full object-contain'
            alt='Enlarged view'
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
