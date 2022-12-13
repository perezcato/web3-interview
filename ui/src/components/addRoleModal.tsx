import React from 'react';

interface Props {
  setAddRoleModal: React.Dispatch<React.SetStateAction<boolean>>
  setRoleInput: React.Dispatch<React.SetStateAction<string | undefined>>
  addRole: () => void
}

const AddRoleModal = (props: Props) => {
  return (
    <div className="w-screen h-screen bg-gray-900/[0.5] absolute top-0 left-0 flex justify-center py-28">
      <div className="relative w-[400px] h-[200px] bg-white rounded-lg overflow-hidden p-6 space-y-3 flex flex-col justify-center">
        <div
          onClick={() => props.setAddRoleModal(false)}
          className="cursor-pointer text-gray-900 rounded-full border border-gray-900 w-fit w-[22px] text-xs h-[22px] flex items-center justify-center font-bold absolute top-2 right-2">
          X
        </div>
        <div className="border border-gray-200 px-3 py-2 rounded-lg bg-gray-200">
          <input
            onChange={(e) => props.setRoleInput(e.target.value)}
            type="text"
            placeholder="Enter role"
            className="text-xs w-full h-full bg-transparent outline-none text-gray-900"/>
        </div>
        <button onClick={props.addRole} className=" text-xs bg-green-600 w-full py-3 text-white rounded-lg ">Add</button>
      </div>
    </div>
  );
};

export default AddRoleModal;