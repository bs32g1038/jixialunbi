import { Button, ButtonProps } from 'antd';
import React from 'react';
import { useAppStore } from '@/store';

export default function AuthButton(props: ButtonProps) {
  const { user, showLoginModal } = useAppStore();
  return (
    <Button
      {...props}
      onClick={(e) => {
        if (!user) {
          return showLoginModal(true);
        }
        return props?.onClick?.(e);
      }}
    ></Button>
  );
}
