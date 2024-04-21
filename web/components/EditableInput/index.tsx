import React, { useState, useEffect } from 'react';
import { Input, Form, Button, Space, message } from 'antd';
import { EditOutlined, SendOutlined } from '@ant-design/icons';
import { AutoSizeType } from 'rc-textarea';
import { Rule } from 'antd/lib/form';
import style from './style.module.scss';
import UploadButton from '../UploadButton';
import { useRouter } from 'next/router';
import { useAppStore } from '@/store';
import { useSWRMutation } from '@/hooks';

interface Props {
  label: string;
  placeholder?: string;
  extra?: string;
  name: string;
  value?: any;
  loading: boolean;
  type?: 'input' | 'textarea' | 'upload' | 'password' | 'email' | any;
  autoSize?: AutoSizeType;
  rules?: Rule[];
  onFinish?: (values: any) => void;
}

const EmailActive = () => {
  const { trigger: sendEmail } = useSWRMutation({ url: '/api/v1/send-email' });
  const [emailCode, setEmailCode] = useState<any>('');
  const [active, setActive] = useState(false);
  const { trigger: activeEmail } = useSWRMutation({ url: '/api/v1/active-email/' + emailCode });
  return (
    <Space>
      {!active && (
        <Button
          size="small"
          onClick={() => {
            return sendEmail().then(() => {
              setActive(true);
            });
          }}
        >
          验证
        </Button>
      )}
      {active && (
        <React.Fragment>
          <Input
            size="small"
            placeholder={'请输入邮箱收到的验证码'}
            name="emailCode"
            onChange={(e) => setEmailCode(e.target.value)}
          />
          <Button
            onClick={() => {
              if (emailCode) {
                activeEmail().then((res) => {
                  if (res.data.data) {
                    message.success('验证成功，感谢您的支持。');
                  } else {
                    message.success('验证码不正确！');
                  }
                });
              }
            }}
            size="small"
          >
            <SendOutlined></SendOutlined>提交
          </Button>
        </React.Fragment>
      )}
    </Space>
  );
};

export default function Index(props: Props) {
  const { name, placeholder, value, label, loading, type = 'input', autoSize, rules, extra } = props;
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const user = useAppStore((state) => state.user);

  const onFinish = (values: any) => {
    if (props.onFinish) {
      props.onFinish(values);
    }
  };
  useEffect(() => {
    if (form) {
      form.setFieldsValue({ [name]: value });
    }
  }, [form, name, type, value]);

  const FORM_ITEM = {
    input: <Input placeholder={placeholder} disabled={disabled} />,
    email: <Input placeholder={placeholder} disabled={disabled} />,
    password: <Input placeholder={placeholder} disabled={disabled} type="password" />,
    textarea: <Input.TextArea autoSize={autoSize} placeholder={placeholder} disabled={disabled} />,
    upload: <UploadButton disabled={disabled}></UploadButton>,
  };

  return (
    <Form form={form} className={style.form} layout="vertical" onFinish={onFinish} wrapperCol={{ span: 24 }}>
      <div className="ant-col ant-form-item-label">
        <label htmlFor={name} title={label}>
          {label}
          {disabled && (
            <Space>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setDisabled(!disabled);
                }}
              >
                <EditOutlined></EditOutlined>编辑
              </Button>
              {!user?.actived && value && type === 'email' && <EmailActive></EmailActive>}
            </Space>
          )}
        </label>
      </div>
      <Form.Item extra={extra} rules={rules} name={name}>
        {FORM_ITEM[type]}
      </Form.Item>
      {!disabled && (
        <Form.Item className="footer">
          <Space>
            <Button type="primary" htmlType="submit" loading={loading} size="small">
              <SendOutlined></SendOutlined>保存
            </Button>
            <Button
              type="default"
              danger={true}
              size="small"
              onClick={() => {
                setDisabled(!disabled);
                form.setFieldsValue({ [name]: value });
              }}
            >
              取消
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
}
