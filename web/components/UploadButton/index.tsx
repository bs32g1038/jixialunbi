import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, UploadProps } from 'antd';
import { Upload } from 'antd';
import { noop } from 'lodash';
import React, { useEffect, useState } from 'react';

interface Props {
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export default function UploadButton(props: Props) {
  const { value, onChange = noop, disabled } = props;
  const [fileList, setFileList] = useState<any>([]);
  useEffect(() => {
    if (fileList.length <= 0 && value) {
      setFileList([
        {
          status: 'done',
          url: value,
        },
      ]);
    }
  }, [fileList, value]);
  const [isUploading, setUploading] = useState(false);
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
    }
    if (info.file.status === 'done') {
      setUploading(false);
    }
    let newFileList = [...info.fileList];
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);
    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response?.data?.url;
        onChange(file.response?.data?.url);
      }
      return file;
    });
    setFileList(newFileList);
  };
  const updateLoadProps = {
    action: '/api/files/upload',
    onChange: handleChange,
    multiple: true,
  };
  return (
    <Upload
      {...updateLoadProps}
      listType="picture-card"
      fileList={fileList}
      maxCount={1}
      showUploadList={false}
      disabled={disabled}
    >
      {value ? (
        <Avatar src={value} alt="" />
      ) : (
        <div>
          {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">上传</div>
        </div>
      )}
    </Upload>
  );
}
