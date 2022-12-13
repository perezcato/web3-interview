import React from 'react';

interface Props {
  success: string | undefined,
  setSuccess: React.Dispatch<React.SetStateAction<string | undefined>>
}

const SuccessModal = (props: Props) => {
  return (
    <div className="w-screen h-screen bg-gray-900/[0.5] absolute top-0 left-0 flex justify-center py-28">
      <div className="relative w-[400px] h-[200px] bg-white rounded-lg overflow-hidden p-6 space-y-3 flex flex-col justify-center items-center">
        <div
          onClick={() => props.setSuccess(undefined)}
          className="cursor-pointer text-gray-900 rounded-full border border-gray-900 w-fit w-[22px] text-xs h-[22px] flex items-center justify-center font-bold absolute top-2 right-2">
          X
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-green-500 text-center">
            {props.success}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;