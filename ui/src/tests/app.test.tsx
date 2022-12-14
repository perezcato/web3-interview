import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorModal from "../components/modals/errorModal";
import SuccessModal from "../components/modals/successModal";
import Roles from "../components/roles";
import {MemberType, RoleType} from "../types";
import Members from "../components/members";


it('Error Modal renders', () => {

  const error = 'Error';
  const setError = jest.fn()
  render(<ErrorModal error={error} setError={setError} />);

  expect(screen.getByText(error)).toBeInTheDocument();
});

it('Success Modal renders', () => {

  const success = 'Error';
  const setSuccess = jest.fn()
  render(<SuccessModal success={success} setSuccess={setSuccess} />);

  expect(screen.getByText(success)).toBeInTheDocument();
});

it('Renders Roles in the document', () => {

  const roles: RoleType[] = [
    {id: 0, role: 'Admin' },
    {id: 1, role: 'User'},
    {id: 2, role: 'Guest'}
  ];
  const setAddRoleModal = jest.fn();
  render(<Roles roles={roles} count={roles.length} setAddRoleModal={setAddRoleModal} />)

  expect(screen.getByText('Roles')).toBeInTheDocument()
  const rolesRendered = screen.getAllByTestId('role')
  expect(rolesRendered.length).toBe(roles.length)
  expect(screen.getByText(roles[0].role)).toBeInTheDocument()
  expect(screen.getByText(roles[1].role)).toBeInTheDocument()
  expect(screen.getByText(roles[2].role)).toBeInTheDocument()
});

it('Renders members in the document', () => {

  const members: MemberType[] = [
    {
    address: '0xdC66cf2C4A72aCE4406098A163dd79cE518F2F33',
    roleType: 'Admin'
  },
    {
      address: '0xdC66cf2C4A72aCE4406098A163dd79cE5aSd2F33',
      roleType: 'Guest'
    }
  ];

  const setAddMemberModal = jest.fn();
  render(<Members members={members} count={members.length} setAddMemberModal={setAddMemberModal} roleCount={2}/>)

  expect(screen.getByText('Members')).toBeInTheDocument()
  const membersRendered = screen.getAllByTestId('member')
  expect(membersRendered.length).toBe(members.length)

  expect(screen.getByText(members[0].address)).toBeInTheDocument()
  expect(screen.getByText(members[1].address)).toBeInTheDocument()

  expect(screen.getByText(members[0].roleType)).toBeInTheDocument()
  expect(screen.getByText(members[1].roleType)).toBeInTheDocument()

})