import { Modal, ModalProps } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { ReactNode } from 'react';
import styles from './index.module.scss';

export default function M(props: JSX.IntrinsicAttributes & ModalProps & { children?: ReactNode }) {
  return <Modal {...props} className={classNames(styles.default, props.className)}></Modal>;
}
