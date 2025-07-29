import React from "react";
import { Row, Col, Card, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { type EnvironmentMap } from "../../../types";
import LazyImage from "../../common/Gallery/LazyImage";
import "./EnvMapGallery.css";

interface EnvMapGalleryProps {
  environments: EnvironmentMap[];
  loading?: boolean;
}

const EnvMapGallery: React.FC<EnvMapGalleryProps> = ({ environments, loading = false }) => {
  const navigate = useNavigate();

  const handleEnvMapClick = (id: string) => {
    navigate(`/environments/${id}`);
  };

  // For now, we'll use a placeholder image for EXR files
  // In production, you'd want to generate thumbnails server-side
  const getPlaceholderImage = (envMap: EnvironmentMap) => {
    // Create a simple gradient placeholder based on the name
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
      '#48dbfb', '#ff9ff3', '#54a0ff', '#feca57', '#ff6b6b'
    ];
    const colorIndex = envMap.name.charCodeAt(0) % colors.length;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225">
      <rect width="400" height="225" fill="${colors[colorIndex]}"/>
      <text x="50%" y="50%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dy=".3em">HDR Environment</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  if (!loading && environments.length === 0) {
    return (
      <Empty description="No environment maps found" style={{ marginTop: "50px" }} />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {environments.map((envMap) => (
        <Col key={envMap.id} xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card
            hoverable
            onClick={() => handleEnvMapClick(envMap.id)}
            cover={
              <LazyImage
                src={envMap.thumbnail ? `/environments/${envMap.thumbnail}` : getPlaceholderImage(envMap)}
                alt={envMap.name}
                style={{ height: "200px" }}
              />
            }
            className="envmap-card"
          >
            <Card.Meta
              title={<div className="envmap-title">{envMap.name}</div>}
              description={
                <div className="envmap-meta">
                  <span className="envmap-format">Format: {envMap.format.toUpperCase()}</span>
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default EnvMapGallery;