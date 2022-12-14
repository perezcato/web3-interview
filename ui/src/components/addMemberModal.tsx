import React, {useEffect} from 'react';
import {RoleType} from "../types";

interface Props {
  setAddMemberModal: React.Dispatch<React.SetStateAction<boolean>>
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>
  setSelectedRole: React.Dispatch<React.SetStateAction<string | undefined>>
  roles: RoleType[]
  addMemberWithRole: () => void
}

const AddMemberModal = (props: Props) => {

  useEffect(() => {
    if(props.roles && props.roles.length > 0) props.setSelectedRole(props.roles[0].id.toString())
  }, [])


  return (
    <div className="w-screen h-screen bg-gray-900/[0.5] absolute top-0 left-0 flex justify-center py-28">
      <div className="relative w-[400px] h-[200px] bg-white rounded-lg overflow-hidden p-6 space-y-3 flex flex-col justify-center">
        <div
          onClick={() => props.setAddMemberModal(false)}
          className="cursor-pointer text-gray-900 rounded-full border border-gray-900 w-fit w-[22px] text-xs h-[22px] flex items-center justify-center font-bold absolute top-2 right-2">
          X
        </div>
        <div className="border border-gray-200 px-3 py-2 rounded-lg bg-gray-200">
          <input
            onChange={(e) => props.setAddress(e.target.value)}
            type="text"
            placeholder="Enter Address"
            className="text-xs w-full h-full bg-transparent outline-none text-gray-900"/>
        </div>
        <div className="border border-gray-200 px-3 py-2 rounded-lg bg-gray-200">
          <select
            onChange={(e) => props.setSelectedRole(e.target.value) }
            className="text-xs w-full h-full bg-transparent outline-none text-gray-900 cursor-pointer">
            {
              props.roles.map(({id, role}: {id: number, role: string}) => <option key={id} value={id}>{role.toUpperCase()}</option>)
            }
          </select>
        </div>
        <button onClick={props.addMemberWithRole} className=" text-xs bg-green-600 w-full py-3 text-white rounded-lg ">Add</button>
      </div>
    </div>
  );
};

export default AddMemberModal;