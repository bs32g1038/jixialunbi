'use client';

import TagGroup from '@/components/TagGroup';
import { Form } from 'antd';
import Layout from '../Layout';

export default function Setting() {
  return (
    <Layout>
      <Form.Item>
        <TagGroup></TagGroup>
      </Form.Item>
    </Layout>
  );
}
