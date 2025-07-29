import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout, Typography, Button, Spin, Alert } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import InstanceDetail from "../components/instances/InstanceDetail";
import { useInstancesData } from "../hooks/useInstancesData";
import ImageViewer from "../components/common/ImageViewer";

const { Header, Content } = Layout;
const { Title } = Typography;

const InstanceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useInstancesData();
  const [viewerVisible, setViewerVisible] = React.useState(false);
  const [viewerImage] = React.useState<{
    url: string;
    type: string;
    frameIndex: number;
  }>({ url: "", type: "", frameIndex: 0 });

  const instance = useMemo(() => {
    if (!data || !id) return null;
    return data.instances.find((inst) => inst.id === id);
  }, [data, id]);

  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ background: "#fff", padding: "0 24px" }}>
          <Title level={2} style={{ margin: "16px 0" }}>
            Loading...
          </Title>
        </Header>
        <Content style={{ padding: "24px" }}>
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spin size="large" tip="Loading instance details..." />
          </div>
        </Content>
      </Layout>
    );
  }

  if (error || !instance) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ background: "#fff", padding: "0 24px" }}>
          <Title level={2} style={{ margin: "16px 0" }}>
            Instance Not Found
          </Title>
        </Header>
        <Content style={{ padding: "24px" }}>
          <Alert
            message="Error"
            description={error || "Instance not found"}
            type="error"
            showIcon
          />
          <Link to="/instances">
            <Button style={{ marginTop: 16 }}>Back to Instances</Button>
          </Link>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <Button icon={<HomeOutlined />} style={{ marginRight: 8 }}>
              Home
            </Button>
          </Link>
          <Link to="/instances">
            <Button icon={<ArrowLeftOutlined />} style={{ marginRight: 16 }}>
              Back
            </Button>
          </Link>
          <Title level={2} style={{ margin: "16px 0" }}>
            {instance.name}
          </Title>
        </div>
      </Header>
      <Content style={{ padding: "24px" }}>
        <InstanceDetail instance={instance} />
      </Content>

      <ImageViewer
        visible={viewerVisible}
        onClose={() => setViewerVisible(false)}
        instance={instance}
        initialImageType={viewerImage.type as any}
        initialFrame={viewerImage.frameIndex}
      />
    </Layout>
  );
};

export default InstanceDetailPage;
