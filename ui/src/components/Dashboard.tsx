import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers'

import MemberRole from '../artifacts/contracts/MemberRole.sol/MemberRole.json'
import Button from "./button";
import Role from "./role";
import {MemberType, RoleType} from "../types";
import Roles from "./roles";
import Members from "./members";
import AddRoleModal from "./addRoleModal";
import AddMemberModal from "./addMemberModal";


const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

interface Props {
  signer: ethers.Signer ,
  account: string
}

const Dashboard = (props: Props) => {

  const contract = new ethers.Contract(CONTRACT_ADDRESS, MemberRole.abi, props.signer)

  const [rolesCount, setRolesCount] = useState<number>(0)
  const [addRoleModel, setAddRoleModal] = useState<boolean>(false)
  const [addMemberModel, setAddMemberModal] = useState<boolean>(false)
  const [roleInput, setRoleInput] = useState<string>()
  const [rolesOnBlock, setRolesOnBlock] = useState<RoleType[]>([])

  const [membersCount, setMembersCount] = useState<number>(0)
  const [members, setMembers] = useState<MemberType[]>([])

  const [address, setAddress] = useState<string>()
  const [selectedRole, setSelectedRole] = useState<string>()



  useEffect(() => {
    (async () => {
      const memberRolesCount = await contract.roleTypesCount()
      setRolesCount(+memberRolesCount.toString())

      const memberCount = await contract.membersCount()
      setMembersCount(+memberCount.toString())
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if(rolesCount > 0 && contract && rolesCount !== rolesOnBlock.length){
        const tempRoles = []
        for(let i = 0; i < rolesCount; i ++){
          const roleOnBlock = await contract.roleTypes(i)
          tempRoles.push({id: i, role: roleOnBlock})
        }

        setRolesOnBlock(tempRoles)
      }
    }) ()

  }, [rolesCount])

  useEffect(() => {

    (async () => {
      const tempMembers = []
      const tempMembersWithRoles: MemberType[] = []
      if(membersCount > 0 && membersCount !== members.length ){
        for(let i = 0; i < membersCount; i ++){
          const address = await contract.addresses(i)
          tempMembers.push(address)
        }

        for(let i of tempMembers){
          const addressRole = await contract.userRole(i);
          tempMembersWithRoles.push({
            address: i,
            roleType: addressRole.roleType
          })
        }
        setMembers(tempMembersWithRoles)
      }
    })()

  }, [membersCount])

  const addRole = async () => {
    if(roleInput && roleInput.length > 0 && props.signer && contract){
      try{
        await contract.addRoleType(roleInput)
        setRolesOnBlock([...rolesOnBlock, {id: rolesOnBlock.length, role: roleInput}])
        setRolesCount(rolesCount + 1)
        setAddRoleModal(false)
      } catch (e) {
        console.error('Error adding roles:', e)
      }
    }
  }

  const addMemberWithRole = async () => {

    try {

      let findRole;
      if(selectedRole && selectedRole.length > 0)
        findRole = rolesOnBlock.find((roleFind) => +roleFind.id === +selectedRole )

      if(address && address.length > 0 && ethers.utils.isAddress(address) && findRole && props.signer && contract){
        await contract.addRole(address, selectedRole)
        setMembers([...members, {address: address, roleType: findRole.role}])
        setMembersCount(membersCount + 1)
        setAddMemberModal(false)
      }

    } catch (e) {
      console.log('Error adding members:', e)
    }
  }


  return (
    <>
      {
        addRoleModel && (
          <AddRoleModal
            setAddRoleModal={setAddRoleModal}
            setRoleInput={setRoleInput}
            addRole={addRole} />
        )
      }

      {
        addMemberModel && (
          <AddMemberModal
            setAddMemberModal={setAddMemberModal}
            setAddress={setAddress}
            setSelectedRole={setSelectedRole}
            roles={rolesOnBlock}
            addMemberWithRole={addMemberWithRole}
            />
        )
      }

      <div className="w-full h-full flex flex-col justify-start items-center space-y-7 py-10">
        <div>
          {props.account}
        </div>

        <Roles roles={rolesOnBlock} count={rolesCount} setAddRoleModal={setAddRoleModal} />
        <Members members={members} count={membersCount} roleCount={rolesCount} setAddMemberModal={setAddMemberModal} />
      </div>
    </>

  );
};

export default Dashboard;