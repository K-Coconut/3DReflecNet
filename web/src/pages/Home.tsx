import React, { useState } from "react";
import { Typography, Button, Row, Col, Modal, Card } from "antd";
import {
  DatabaseOutlined,
  GlobalOutlined,
  BgColorsOutlined,
  DownloadOutlined,
  PictureOutlined,
  ThunderboltOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getPublicAssetPath } from "../utils/getPublicAssetPath";
import teaserImage from "../assets/teaser.png";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);

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
            position: "absolute",
            bottom: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <Row gutter={[48, 24]}>
            <Col xs={12} sm={12} md={12} lg={6}>
              <Link to="/instances" style={{ display: "block" }}>
                <Button
                  size="large"
                  icon={<DatabaseOutlined />}
                  style={{
                    width: "100%",
                    height: "48px",
                    fontSize: "16px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  }}
                >
                  Explore Instances
                </Button>
              </Link>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <Link to="/environments" style={{ display: "block" }}>
                <Button
                  size="large"
                  icon={<GlobalOutlined />}
                  style={{
                    width: "100%",
                    height: "48px",
                    fontSize: "16px",
                    background:
                      "linear-gradient(135deg, #52c41a 0%, #8bc34a 100%)",
                    border: "none",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "0 4px 15px rgba(82, 196, 26, 0.4)",
                  }}
                >
                  Environment Maps
                </Button>
              </Link>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <Link to="/lidars" style={{ display: "block" }}>
                <Button
                  size="large"
                  icon={<ScanOutlined />}
                  style={{
                    width: "100%",
                    height: "48px",
                    fontSize: "16px",
                    background:
                      "linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)",
                    border: "none",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "0 4px 15px rgba(24, 144, 255, 0.4)",
                  }}
                >
                  LiDAR Scans
                </Button>
              </Link>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <Button
                size="large"
                icon={<DownloadOutlined />}
                style={{
                  width: "100%",
                  height: "48px",
                  fontSize: "16px",
                  background:
                    "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                  border: "none",
                  color: "white",
                  fontWeight: "bold",
                  boxShadow: "0 4px 15px rgba(255, 152, 0, 0.4)",
                }}
                onClick={() => setDownloadModalVisible(true)}
              >
                Dataset (22T)
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ padding: "60px 24px", background: "white" }}>
        <Row gutter={[48, 48]} style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Col xs={12} sm={12} md={12} lg={6}>
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
                  {100000}
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
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
                  {300}
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
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
                <ScanOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  {1000}
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
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
                  {22}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Materials Resources Section */}
      <div style={{ padding: "40px 24px", background: "#fafafa" }}>
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <Title level={3} style={{ marginBottom: "30px" }}>
            Materials Resources
          </Title>
          <div>
            <p
              style={{
                fontSize: "1.1em",
                color: "#ff4d4f",
                marginBottom: "20px",
              }}
            >
              Due to website storage limitations, only a small portion of
              instances are displayed here. For the complete dataset (22T),
              please click the Dataset button to download.
            </p>
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

      {/* Quick Links Section */}
      <div style={{ padding: "80px 24px", background: "white" }}>
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
