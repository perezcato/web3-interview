import React from 'react';

interface Props {
  role: string
}

const Role = (props: Props) => {
  return (
    <div data-testid="role" className="cursor-pointer text-xs px-2 py-1 bg-gray-700 w-fit rounded-full italic text-orange-400 uppercase hover:underline">
      {props.role}
    </div>
  );
};

export default Role;