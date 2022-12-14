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
import ErrorModal from "./modals/errorModal";
import SuccessModal from "./modals/successModal";


// const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

interface Props {
  signer: ethers.Signer ,
  account: string
}

const Dashboard = (props: Props) => {

  const contract = new ethers.Contract(CONTRACT_ADDRESS as string, MemberRole.abi, props.signer)

  const [rolesCount, setRolesCount] = useState<number>(0)
  const [addRoleModel, setAddRoleModal] = useState<boolean>(false)
  const [addMemberModel, setAddMemberModal] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()
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
  const addRole = async (role: string) => {

    const checkRole = rolesOnBlock.find((roleOnBlock) => roleOnBlock.role.toLowerCase() === role?.toLowerCase() )

    if(checkRole){
      setAddRoleModal(false)
      setError('Role already exists')
    }else {
      if(role && role.length > 0 && props.signer && contract){
        try{
          await contract.addRoleType(role)
          setRolesOnBlock([...rolesOnBlock, {id: rolesOnBlock.length, role: role}])
          setRolesCount(rolesCount + 1)
          setAddRoleModal(false)
          setSuccess('Adding Role was successful')
        } catch (e) {
          console.error('Error adding roles:', e)
          setAddRoleModal(false)
          setError('Error adding role, please try again later')
        }
      }
    }


  }

  const addMemberWithRole = async () => {

    try {


      let findRole: RoleType | undefined;
      if(selectedRole && selectedRole.length > 0)
        findRole = rolesOnBlock.find((roleFind) => +roleFind.id === +selectedRole )

      const checkAddressAndRole = members.find((member) => member.address === address && member.roleType.toLowerCase() === findRole?.role.toLowerCase())

      if(!findRole){
        setAddMemberModal(false)
        setError("Invalid role selected")
      }
      else if(checkAddressAndRole) {
        setAddMemberModal(false)
        setError('Address with role already exists')
      } else {
        if(address && address.length > 0 && ethers.utils.isAddress(address) && props.signer && contract){
          await contract.addRole(address, selectedRole)
          setMembers([...members, {address: address, roleType: findRole.role}])
          setMembersCount(membersCount + 1)
          setAddMemberModal(false)
          setSuccess('Adding Role to Address was successful')
        } else {
          setAddMemberModal(false)
          setError('Error adding role to address, please check and try again')
        }
      }

    } catch (e) {
      console.log('Error adding members:', e)
      setAddMemberModal(false)
      setError('Error adding role to address, please check and try again')
    }
  }


  return (
    <>
      { error && <ErrorModal error={error} setError={setError} /> }
      { success && <SuccessModal success={success} setSuccess={setSuccess} /> }

      {
        addRoleModel && (
          <AddRoleModal
            setAddRoleModal={setAddRoleModal}
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