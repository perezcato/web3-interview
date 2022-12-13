import React from 'react';
import {RoleType} from "../types";
import Button from "./button";
import Role from "./role";

interface Props {
  roles: RoleType[]
  count: number,
  setAddRoleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Roles = (props: Props) => {
  return (
    <div className="w-3/4 border border-gray-800 rounded-lg overflow-hidden h-fit min-h-[400px] flex flex-col">
      <div className="flex justify-between px-3 py-4 bg-gray-800 items-center">
        <div className="text-xs">Roles</div>
        <div className="space-x-3">
          <Button onClick={() => props.setAddRoleModal(true)} label={"Add Role"} />
        </div>
      </div>

      <div className="flex-1 p-3 flex items-start justify-start wrap space-x-3">
        { props.count > 0 && props.roles.map((role, id) => <Role key={id} role={role.role} />) }
      </div>
    </div>
  );
};

export default Roles;