import { Meta, Story } from '@storybook/react';
import { InputField, InputFieldProps } from '@/components/Form';
import { Button } from '@/components/Elements/Button';
import React from 'react';
import ModalWrapper from '@/components/Modal/Modal';

const meta: Meta = {
  title: 'User Settings',
};

const ModalContent = ({ onClose }: { onClose: () => void }) => {
  return(<div className='flex justify-evenly mt-6'>
    <Button onClick={onClose} variant='danger'>Yes</Button>
    <Button onClick={onClose} variant='primary'>No</Button>
  </div>)
}

export default meta;

export const Template: Story<InputFieldProps> = (args) => {
  const [isOpen, toggle] = React.useState(false);

  const passwordInputProps: Omit<InputFieldProps, 'registration'> = {
    className: "my-2",
    type: "password"
  }
  const props: InputFieldProps = { ...args, ...passwordInputProps };

  return (
    <div className="flex-col items-center">
      <p className="my-3"> Change password </p>
      <InputField label="Input Old Password" {...props} />
      <InputField label="Input New Password" {...props} />
      <InputField label="Confirm New Password" {...props} />
      <Button variant="primary" size="sm" >Change Password</Button>
      <p className="my-3"> Delete Account? <span className="text-red-500">(This action is irreversible!)</span></p>
      <Button onClick={() => toggle(true)} variant="danger" size="sm" >Delete Account</Button>
      <ModalWrapper header='Are you sure you want to delete your Account?' isOpen={isOpen} toggle={toggle} Body={ModalContent} />
    </div>
  )
};