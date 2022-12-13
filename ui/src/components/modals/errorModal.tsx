import React from 'react';

interface Props {
  error: string | undefined,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ErrorModal = (props: Props) => {
  return (
    <div className="w-screen h-screen bg-gray-900/[0.5] absolute top-0 left-0 flex justify-center py-28">
      <div className="relative w-[400px] h-[200px] bg-white rounded-lg overflow-hidden p-6 space-y-3 flex flex-col justify-center items-center">
        <div
          onClick={() => props.setError(undefined)}
          className="cursor-pointer text-gray-900 rounded-full border border-gray-900 w-fit w-[22px] text-xs h-[22px] flex items-center justify-center font-bold absolute top-2 right-2">
          X
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div className="text-red-500 text-center">
            {props.error}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;