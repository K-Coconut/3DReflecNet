import React from "react";
import { Row, Col, Card, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { type LidarScan } from "../../../types";
import { getAssetPath } from "../../../utils/getAssetPath";
import LazyImage from "../../common/Gallery/LazyImage";
import "./LidarGallery.css";

interface LidarGalleryProps {
  lidars: LidarScan[];
  loading?: boolean;
}

const LidarGallery: React.FC<LidarGalleryProps> = ({ lidars, loading = false }) => {
  const navigate = useNavigate();

  const handleLidarClick = (id: string) => {
    navigate(`/lidars/${id}`);
  };

  if (!loading && lidars.length === 0) {
    return (
      <Empty description="No LiDAR scans found" style={{ marginTop: "50px" }} />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {lidars.map((lidar) => (
        <Col key={lidar.id} xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card
            hoverable
            onClick={() => handleLidarClick(lidar.id)}
            cover={
              <LazyImage
                src={getAssetPath(lidar.preview)}
                alt={lidar.name}
                style={{ height: "200px" }}
              />
            }
            className="lidar-card"
          >
            <Card.Meta
              title={<div className="lidar-title">{lidar.name}</div>}
              description={
                <div className="lidar-meta">
                  <span className="lidar-frames">
                    {lidar.frameCount} frames
                  </span>
                  <span className="lidar-range">
                    {lidar.firstFrame} - {lidar.lastFrame}
                  </span>
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default LidarGallery;