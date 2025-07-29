import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Space, Spin, Alert } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import LidarDetailComponent from "../components/lidars/LidarDetail";
import SimpleImageViewer from "../components/common/SimpleImageViewer";
import { useLidarsData } from "../hooks/useLidarsData";
import type { LidarScan } from "../types";

const { Title } = Typography;

const LidarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useLidarsData();
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerImage] = useState("");

  const lidar: LidarScan | undefined = useMemo(() => {
    if (!data || !id) return undefined;
    return data.lidars.find((l) => l.id === id);
  }, [data, id]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate("/lidars");
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "24px" }}>
        <Alert
          message="Loading Failed"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!lidar) {
    return (
      <div style={{ padding: "24px" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Space>
            <Button icon={<HomeOutlined />} onClick={() => navigate("/")}>
              Home
            </Button>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
              Back to LiDAR Scans
            </Button>
          </Space>
          <Alert
            message="LiDAR Scan Not Found"
            description={`LiDAR scan with ID "${id}" not found`}
            type="warning"
            showIcon
          />
        </Space>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ padding: "24px" }}>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Space>
                <Button icon={<HomeOutlined />} onClick={() => navigate("/")}>
                  Home
                </Button>
                <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
                  Back
                </Button>
              </Space>
              <Title level={2} style={{ margin: 0 }}>
                {lidar.name}
              </Title>
            </div>
          </div>

          <LidarDetailComponent lidar={lidar} />
        </Space>
      </div>

      <SimpleImageViewer
        visible={viewerVisible}
        imageUrl={viewerImage}
        title="LiDAR Scan"
        onClose={() => setViewerVisible(false)}
      />
    </div>
  );
};

export default LidarDetail;
