import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout, Typography, Button, Spin, Alert } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import EnvMapDetail from '../components/environments/EnvMapDetail';
import { useEnvironmentsData } from '../hooks/useEnvironmentsData';

const { Header, Content } = Layout;
const { Title } = Typography;

const EnvMapDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: envData, loading: envLoading, error: envError } = useEnvironmentsData();

  const environment = useMemo(() => {
    if (!envData || !id) return null;
    return envData.environments.find(env => env.id === id);
  }, [envData, id]);

  const loading = envLoading;
  const error = envError;

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <Title level={2} style={{ margin: '16px 0' }}>Loading...</Title>
        </Header>
        <Content style={{ padding: '24px' }}>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" tip="Loading environment details..." />
          </div>
        </Content>
      </Layout>
    );
  }

  if (error || !environment) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <Title level={2} style={{ margin: '16px 0' }}>Environment Map Not Found</Title>
        </Header>
        <Content style={{ padding: '24px' }}>
          <Alert
            message="Error"
            description={error || "Environment map not found"}
            type="error"
            showIcon
          />
          <Link to="/environments">
            <Button style={{ marginTop: 16 }}>Back to Environment Maps</Button>
          </Link>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <Button icon={<HomeOutlined />} style={{ marginRight: 8 }}>
              Home
            </Button>
          </Link>
          <Link to="/environments">
            <Button icon={<ArrowLeftOutlined />} style={{ marginRight: 16 }}>
              Back
            </Button>
          </Link>
          <Title level={2} style={{ margin: '16px 0' }}>
            {environment.name}
          </Title>
        </div>
      </Header>
      <Content style={{ padding: '24px' }}>
        <EnvMapDetail 
          environment={environment} 
        />
      </Content>
    </Layout>
  );
};

export default EnvMapDetailPage;