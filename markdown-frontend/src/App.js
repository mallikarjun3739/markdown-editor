import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Input, Typography, Divider } from 'antd';
import axios from 'axios';
import 'antd/dist/reset.css';
import './App.css';

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

function App() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      try {
        const response = await axios.post('http://localhost:5000/convert', {
          markdown: markdown,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        setHtml(response.data.html);
      } catch (error) {
        console.error('Error converting markdown:', error);
      }
    };

    if (markdown.trim()) {
      convertMarkdownToHtml();
    }
  }, [markdown]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <Layout>
      <Header style={{ textAlign: 'center', color: '#fff', fontSize: '24px' }}>
        Real-Time Markdown Editor
      </Header>

      <Content style={{ padding: '0 50px', marginTop: '30px' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Title level={4}>Markdown Editor</Title>
            <TextArea
              value={markdown}
              onChange={handleChange}
              placeholder="Enter Markdown text..."
              autoSize={{ minRows: 10, maxRows: 20 }}
              style={{ backgroundColor: '#f0f2f5', border: '1px solid #d9d9d9', padding: '10px' }}
            />
          </Col>
          <Col span={12}>
            <Title level={4}>Live HTML Preview</Title>
            <div
              className="preview-pane"
              style={{
                padding: '10px',
                backgroundColor: '#fff',
                border: '1px solid #d9d9d9',
                minHeight: '240px',
                overflowY: 'auto',
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Col>
        </Row>
      </Content>

      <Divider />

      <Footer style={{ textAlign: 'center' }}>
        Markdown Editor ©2024 Created using Ant Design
      </Footer>
    </Layout>
  );
}

export default App;
