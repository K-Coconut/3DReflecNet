import React from "react";
import {
  Row,
  Col,
  Card,
  Descriptions,
  Tag,
} from "antd";
import { type EnvironmentMap } from "../../../types";
import LazyImage from "../../common/Gallery/LazyImage";
import "./EnvMapDetail.css";

interface EnvMapDetailProps {
  environment: EnvironmentMap;
}

const EnvMapDetail: React.FC<EnvMapDetailProps> = ({
  environment,
}) => {
  // For now, we'll use the same placeholder system as the gallery
  const getPlaceholderImage = (envMap: EnvironmentMap) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
      '#48dbfb', '#ff9ff3', '#54a0ff', '#feca57', '#ff6b6b'
    ];
    const colorIndex = envMap.name.charCodeAt(0) % colors.length;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450">
      <rect width="800" height="450" fill="${colors[colorIndex]}"/>
      <text x="50%" y="50%" font-family="Arial" font-size="30" fill="white" text-anchor="middle" dy=".3em">HDR Environment</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  return (
    <div className="envmap-detail">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="image-preview-card">
            <div className="envmap-image-container">
              <LazyImage
                src={environment.thumbnail ? `/environments/${environment.thumbnail}` : getPlaceholderImage(environment)}
                alt={environment.name}
                className="envmap-preview-image"
                objectFit="contain"
              />
            </div>
            <div className="envmap-note">
              <Tag color="blue">EXR Format</Tag>
              <span className="note-text">
                High Dynamic Range environment map for realistic lighting
              </span>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Environment Map Info" className="info-card">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Name">
                {environment.name}
              </Descriptions.Item>
              <Descriptions.Item label="File Name">
                {environment.path}
              </Descriptions.Item>
              <Descriptions.Item label="Format">
                <Tag color="orange">{environment.format.toUpperCase()}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title="Download"
            className="download-card"
            style={{ marginTop: "16px" }}
          >
            <div className="download-info">
              <p>Original EXR file available at:</p>
              <code className="file-path">/environments/{environment.path}</code>
            </div>
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default EnvMapDetail;