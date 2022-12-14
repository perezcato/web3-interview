import React from 'react';
import Button from "./button";
import {MemberType} from "../types";

interface Props {
  members: MemberType []
  count: number
  roleCount: number
  setAddMemberModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Members = (props: Props) => {
  return (
    <div className="w-3/4 border border-gray-800 rounded-lg overflow-hidden h-fit min-h-[400px] flex flex-col">
      <div className="flex justify-between px-3 py-4 bg-gray-800 items-center">
        <div className="text-xs">Members</div>
        {
          props.roleCount > 0 && (
            <div className="space-x-3">
              <Button onClick={() => props.setAddMemberModal(true)} label={"Add Member"} />
            </div>
          )
        }

      </div>

      <div className="flex-1 p-3 flex flex-col items-start justify-start wrap space-y-3">

        {
          props.count > 0 && props.members.length > 0 && props.members.map((member, key) => {
            return (
              <div data-testid="member" key={key} className="bg-gray-800 w-full text-xs py-3 px-4 rounded-md flex justify-between">
                <div>
                  {member.address}
                </div>
                <div className="uppercase text-orange-400">
                  {member.roleType}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Members;