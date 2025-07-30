import React, { useState } from "react";
import { Typography, Button, Row, Col, Modal, Card } from "antd";
import {
  DatabaseOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  BgColorsOutlined,
  DownloadOutlined,
  HomeOutlined,
  ExperimentOutlined,
  PictureOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  RightOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useInstancesData } from "../hooks/useInstancesData";
import { useEnvironmentsData } from "../hooks/useEnvironmentsData";
import { useLidarsData } from "../hooks/useLidarsData";
import { getPublicAssetPath } from "../utils/getPublicAssetPath";
import teaserImage from "../assets/teaser.png";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const { data: instancesData } = useInstancesData();
  const { data: environmentsData } = useEnvironmentsData();
  const { data: lidarsData } = useLidarsData();
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);

  // Calculate statistics
  const totalInstances = instancesData?.instances.length || 0;
  const totalEnvironments = environmentsData?.environments.length || 0;
  const totalLidars = lidarsData?.totalLidars || 0;
  const uniqueModels = instancesData
    ? new Set(instancesData.instances.map((inst) => inst.model || "")).size
    : 0;
  const uniqueMaterials = instancesData
    ? new Set(instancesData.instances.map((inst) => inst.category || "")).size
    : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${teaserImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
          position: "relative",
          padding: "40px 20px 60px",
          textAlign: "center",
          minHeight: "550px",
        }}
      >
        {/* Position buttons below the image */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            position: "absolute",
            bottom: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Link to="/instances">
            <Button
              size="large"
              icon={<DatabaseOutlined />}
              style={{
                padding: "0 25px",
                height: "48px",
                fontSize: "16px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
            >
              Explore Instances
            </Button>
          </Link>
          <Link to="/environments">
            <Button
              size="large"
              icon={<GlobalOutlined />}
              style={{
                padding: "0 25px",
                height: "48px",
                fontSize: "16px",
                background: "linear-gradient(135deg, #52c41a 0%, #8bc34a 100%)",
                border: "none",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(82, 196, 26, 0.4)",
              }}
            >
              Environment Maps
            </Button>
          </Link>
          <Link to="/lidars">
            <Button
              size="large"
              icon={<ScanOutlined />}
              style={{
                padding: "0 25px",
                height: "48px",
                fontSize: "16px",
                background: "linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)",
                border: "none",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(24, 144, 255, 0.4)",
              }}
            >
              LiDAR Scans
            </Button>
          </Link>
          <Button
            size="large"
            icon={<DownloadOutlined />}
            style={{
              padding: "0 20px",
              height: "48px",
              fontSize: "16px",
              background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
              border: "none",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(255, 152, 0, 0.4)",
            }}
            onClick={() => setDownloadModalVisible(true)}
          >
            Dataset (22T)
          </Button>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ padding: "60px 24px", background: "white" }}>
        <Row gutter={[48, 48]} style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Col xs={12} sm={12} md={8} lg={4}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  color: "#8884d8",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                Total Instances
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <DatabaseOutlined
                  style={{ fontSize: "24px", color: "#8884d8" }}
                />
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#8884d8",
                  }}
                >
                  {totalInstances}
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={8} lg={4}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  color: "#52c41a",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                Environment Maps
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <GlobalOutlined
                  style={{ fontSize: "24px", color: "#52c41a" }}
                />
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#52c41a",
                  }}
                >
                  {totalEnvironments}
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={8} lg={4}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  color: "#1890ff",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                LiDAR Scans
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <ScanOutlined
                  style={{ fontSize: "24px", color: "#1890ff" }}
                />
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  {totalLidars}
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={8} lg={4}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  color: "#ff9800",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                3D Models
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <AppstoreOutlined
                  style={{ fontSize: "24px", color: "#ff9800" }}
                />
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#ff9800",
                  }}
                >
                  {uniqueModels}
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={8} lg={4}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  color: "#ff4081",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                Materials
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <BgColorsOutlined
                  style={{ fontSize: "24px", color: "#ff4081" }}
                />
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#ff4081",
                  }}
                >
                  {uniqueMaterials}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Materials Resources Section */}
      <div style={{ padding: "40px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <Title level={3} style={{ marginBottom: "30px" }}>
            Materials Resources
          </Title>
          <div>
            <p style={{ fontSize: "1.1em" }}>
              For material details, please refer to our{" "}
              <a
                href={getPublicAssetPath("static/pdfs/material.pdf")}
                style={{ color: "#3273dc" }}
              >
                material specifications
              </a>{" "}
              📄
            </p>
            <p style={{ fontSize: "1.1em" }}>
              You can download the{" "}
              <code
                style={{
                  backgroundColor: "#f1f1f1",
                  padding: "0.2em 0.4em",
                  margin: 0,
                  fontSize: "95%",
                  borderRadius: "6px",
                  color: "#e83e8c",
                }}
              >
                .blend
              </code>{" "}
              file containing all materials{" "}
              <a
                href="https://gofile.me/7IL4k/ORMCynUxL"
                style={{ color: "#3273dc" }}
              >
                here
              </a>{" "}
              📦
            </p>
          </div>
        </div>
      </div>

      {/* Dataset Features Section */}
      <div style={{ padding: "80px 24px", background: "#f0f2f5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            Dataset Features
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card
                style={{
                  height: "100%",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <PictureOutlined
                  style={{ fontSize: "48px", marginBottom: "20px" }}
                />
                <Title level={4} style={{ color: "white" }}>
                  Multi-View Rendering
                </Title>
                <Paragraph style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  Each instance includes RGB, depth, normal, and mask images
                  from multiple viewpoints
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{
                  height: "100%",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
                }}
              >
                <GlobalOutlined
                  style={{ fontSize: "48px", marginBottom: "20px" }}
                />
                <Title level={4} style={{ color: "white" }}>
                  HDR Environment Maps
                </Title>
                <Paragraph style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  High-quality EXR format environment maps for realistic
                  lighting and reflections
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                style={{
                  height: "100%",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  color: "white",
                }}
              >
                <ThunderboltOutlined
                  style={{ fontSize: "48px", marginBottom: "20px" }}
                />
                <Title level={4} style={{ color: "white" }}>
                  Production Ready
                </Title>
                <Paragraph style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  Camera parameters and metadata included for immediate use in
                  ML pipelines
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Categories Section */}
      <div style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            Instance Categories
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{ textAlign: "center" }}
                onClick={() =>
                  (window.location.href = "/instances?category=household")
                }
              >
                <HomeOutlined
                  style={{
                    fontSize: "48px",
                    color: "#722ed1",
                    marginBottom: "16px",
                  }}
                />
                <Title level={4}>Household</Title>
                <Paragraph type="secondary">
                  Furniture, beds, chairs, tables, and everyday objects
                </Paragraph>
                <div style={{ color: "#722ed1", fontWeight: "bold" }}>
                  Explore <RightOutlined />
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{ textAlign: "center" }}
                onClick={() =>
                  (window.location.href = "/instances?category=art")
                }
              >
                <PictureOutlined
                  style={{
                    fontSize: "48px",
                    color: "#eb2f96",
                    marginBottom: "16px",
                  }}
                />
                <Title level={4}>Art</Title>
                <Paragraph type="secondary">
                  Statues, crystals, and artistic objects
                </Paragraph>
                <div style={{ color: "#eb2f96", fontWeight: "bold" }}>
                  Explore <RightOutlined />
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{ textAlign: "center" }}
                onClick={() =>
                  (window.location.href = "/instances?category=industry")
                }
              >
                <ExperimentOutlined
                  style={{
                    fontSize: "48px",
                    color: "#1890ff",
                    marginBottom: "16px",
                  }}
                />
                <Title level={4}>Industry</Title>
                <Paragraph type="secondary">
                  Electronic devices and industrial equipment
                </Paragraph>
                <div style={{ color: "#1890ff", fontWeight: "bold" }}>
                  Explore <RightOutlined />
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{ textAlign: "center" }}
                onClick={() =>
                  (window.location.href = "/instances?category=nature")
                }
              >
                <CheckCircleOutlined
                  style={{
                    fontSize: "48px",
                    color: "#52c41a",
                    marginBottom: "16px",
                  }}
                />
                <Title level={4}>Nature</Title>
                <Paragraph type="secondary">
                  Plants and natural objects
                </Paragraph>
                <div style={{ color: "#52c41a", fontWeight: "bold" }}>
                  Explore <RightOutlined />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Quick Links Section */}
      <div style={{ padding: "80px 24px", background: "#f0f2f5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            Quick Access
          </Title>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Link to="/instances">
                <Card
                  hoverable
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                  }}
                >
                  <div style={{ textAlign: "center", color: "white" }}>
                    <DatabaseOutlined
                      style={{ fontSize: "36px", marginBottom: "16px" }}
                    />
                    <Title level={4} style={{ color: "white", margin: 0 }}>
                      Browse All Instances
                    </Title>
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Link to="/environments">
                <Card
                  hoverable
                  style={{
                    background:
                      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                    border: "none",
                  }}
                >
                  <div style={{ textAlign: "center", color: "white" }}>
                    <GlobalOutlined
                      style={{ fontSize: "36px", marginBottom: "16px" }}
                    />
                    <Title level={4} style={{ color: "white", margin: 0 }}>
                      View Environment Maps
                    </Title>
                  </div>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Link to="/lidars">
                <Card
                  hoverable
                  style={{
                    background:
                      "linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)",
                    border: "none",
                  }}
                >
                  <div style={{ textAlign: "center", color: "white" }}>
                    <ScanOutlined
                      style={{ fontSize: "36px", marginBottom: "16px" }}
                    />
                    <Title level={4} style={{ color: "white", margin: 0 }}>
                      Browse LiDAR Scans
                    </Title>
                  </div>
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </div>

      {/* Download Modal */}
      <Modal
        title="Download 3DReflectNet Dataset"
        open={downloadModalVisible}
        onCancel={() => setDownloadModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDownloadModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 20 }}>
          <h4>2T Demo Dataset</h4>
          <p>
            Download link:{" "}
            <a
              href="https://cuhko365.sharepoint.com/sites/CUHKSZ-SSE-INML/SitePages/Home.aspx?e=1:aab1118873e1469f8e893dd8205a3a99"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here to download
            </a>
          </p>
        </div>
        <div>
          <h4>Full Dataset (22T)</h4>
          <p>
            To request access to the full dataset, please send an email to:{" "}
            <a href="mailto:zhichengliang1@link.cuhk.edu.cn">
              zhichengliang1@link.cuhk.edu.cn
            </a>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
