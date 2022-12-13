import React, {useEffect, useState} from 'react';
import Button from "./button";
import Role from "./role";
import {ethers} from "ethers";
import MemberRole from '../artifacts/contracts/MemberRole.sol/MemberRole.json'
import {Simulate} from "react-dom/test-utils";
import seeked = Simulate.seeked;


const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// const ROLES = ['admin', 'guest', 'user']
// const MEMBERS = [
//   '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
//   '0x5fbdb2315678afecb367f032d93f642f64180aa3'
// ]

interface Props{
  account: string;
  signer: ethers.Signer
}

const Roles = (props: Props) => {

  const contract = new ethers.Contract(CONTRACT_ADDRESS, MemberRole.abi, props.signer);
  const [rolesCount, setRolesCount] = useState<number>(0)
  const [addRoleModel, setAddRoleModal] = useState<boolean>(false)
  const [addMemberModel, setAddMemberModal] = useState<boolean>(false)
  const [roleInput, setRoleInput] = useState<string>()
  const [rolesOnBlock, setRolesOnBlock] = useState<{id: number, role: string}[]>([])

  const [membersCount, setMembersCount] = useState<number>(0)
  const [members, setMembers] = useState<{address: string, roleType: string}[]>([])

  const [address, setAddress] = useState<string>()
  const [selectedRole, setSelectedRole] = useState<string>()



  useEffect(() => {
    (async () => {
      const memberRolesCount = await contract.roleTypesCount()
      setRolesCount(+memberRolesCount.toString())

      const memberCount = await contract.membersCount()
      setMembersCount(+memberCount.toString())

      console.log({memberCount: memberCount.toString()})
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if(rolesCount > 0 && contract && rolesCount !== rolesOnBlock.length){
        console.log('............. Getting roles .................')
        const tempRoles = []
        for(let i = 0; i < rolesCount; i ++){
          const roleOnBlock = await contract.roleTypes(i)
          console.log('Role on block:', roleOnBlock)
          tempRoles.push({id: i, role: roleOnBlock})
        }

        setRolesOnBlock(tempRoles)
      }
    }) ()

  }, [rolesCount])

  useEffect(() => {

    (async () => {
      const tempMembers = []
      const tempMembersWithRoles: {address: string, roleType: string}[] = []
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
        console.log('adding Role', roleInput)
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

      if(address && address.length > 0 && findRole && props.signer && contract){
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
          <div className="w-screen h-screen bg-gray-900/[0.5] absolute top-0 left-0 flex justify-center py-28">
            <div className="relative w-[400px] h-[200px] bg-white rounded-lg overflow-hidden p-6 space-y-3 flex flex-col justify-center">
              <div
                onClick={() => setAddRoleModal(false)}
                className="cursor-pointer text-gray-900 rounded-full border border-gray-900 w-fit w-[22px] text-xs h-[22px] flex items-center justify-center font-bold absolute top-2 right-2">
                X
              </div>
              <div className="border border-gray-200 px-3 py-2 rounded-lg bg-gray-200">
                <input
                  onChange={(e) => setRoleInput(e.target.value)}
                  type="text"
                  placeholder="Enter role"
                  className="text-xs w-full h-full bg-transparent outline-none text-gray-900"/>
              </div>
              <button onClick={addRole} className=" text-xs bg-green-600 w-full py-3 text-white rounded-lg ">Add</button>
            </div>
          </div>
        )
      }

      {
        addMemberModel && (
          <div className="w-screen h-screen bg-gray-900/[0.5] absolute top-0 left-0 flex justify-center py-28">
            <div className="relative w-[400px] h-[200px] bg-white rounded-lg overflow-hidden p-6 space-y-3 flex flex-col justify-center">
              <div
                onClick={() => setAddMemberModal(false)}
                className="cursor-pointer text-gray-900 rounded-full border border-gray-900 w-fit w-[22px] text-xs h-[22px] flex items-center justify-center font-bold absolute top-2 right-2">
                X
              </div>
              <div className="border border-gray-200 px-3 py-2 rounded-lg bg-gray-200">
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Enter Address"
                  className="text-xs w-full h-full bg-transparent outline-none text-gray-900"/>
              </div>
              <div className="border border-gray-200 px-3 py-2 rounded-lg bg-gray-200">
                <select
                  onChange={(e) => setSelectedRole(e.target.value) }
                  className="text-xs w-full h-full bg-transparent outline-none text-gray-900 cursor-pointer">
                  {
                    rolesOnBlock.map(({id, role}: {id: number, role: string}) => <option key={id} value={id}>{role.toUpperCase()}</option>)
                  }
                </select>
              </div>
              <button onClick={addMemberWithRole} className=" text-xs bg-green-600 w-full py-3 text-white rounded-lg ">Add</button>
            </div>
          </div>
        )
      }

      <div className="w-full h-full flex flex-col justify-start items-center space-y-7 py-10">
        <div>
          {props.account}
        </div>
        <div className="w-3/4 border border-gray-800 rounded-lg overflow-hidden h-fit min-h-[400px] flex flex-col">
          <div className="flex justify-between px-3 py-4 bg-gray-800 items-center">
            <div className="text-xs">Roles</div>
            <div className="space-x-3">
              <Button onClick={() => setAddRoleModal(true)} label={"Add Role"} />
            </div>
          </div>

          <div className="flex-1 p-3 flex items-start justify-start wrap space-x-3">
            { rolesCount > 0 && rolesOnBlock.map((role, id) => <Role key={id} role={role.role} />) }
          </div>
        </div>

        <div className="w-3/4 border border-gray-800 rounded-lg overflow-hidden h-fit min-h-[400px] flex flex-col">
          <div className="flex justify-between px-3 py-4 bg-gray-800 items-center">
            <div className="text-xs">Members</div>
            <div className="space-x-3">
              <Button onClick={() => setAddMemberModal(true)} label={"Add Member"} />
            </div>
          </div>

          <div className="flex-1 p-3 flex flex-col items-start justify-start wrap space-y-3">

              {
                membersCount > 0 && members.length > 0 && members.map((member, key) => {
                  return (
                    <div key={key} className="bg-gray-800 w-full text-xs py-3 px-4 rounded-md flex justify-between">
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
      </div>
    </>

  );
};

export default Roles;