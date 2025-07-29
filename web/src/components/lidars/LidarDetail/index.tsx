import React, { useState } from "react";
import { Slider, Row, Col, Card, Descriptions, Space, Button } from "antd";
import { type LidarScan } from "../../../types";
import { getAssetPath } from "../../../utils/getAssetPath";
import LazyImage from "../../common/Gallery/LazyImage";
import "./LidarDetail.css";

interface LidarDetailProps {
  lidar: LidarScan;
}

const LidarDetail: React.FC<LidarDetailProps> = ({ lidar }) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  const getCurrentImageUrl = () => {
    const fileName = lidar.frames[currentFrame];
    return getAssetPath(`lidars/${lidar.id}/${fileName}`);
  };

  const handleFrameChange = (value: number) => {
    setCurrentFrame(value);
  };

  // Generate quick jump frames based on total frame count
  const quickJumpFrames = [0];
  if (lidar.frameCount > 50) {
    quickJumpFrames.push(Math.floor(lidar.frameCount / 4));
    quickJumpFrames.push(Math.floor(lidar.frameCount / 2));
    quickJumpFrames.push(Math.floor((lidar.frameCount * 3) / 4));
  }
  quickJumpFrames.push(lidar.frameCount - 1);

  return (
    <div className="lidar-detail">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="image-preview-card">
            <div className="image-container">
              <LazyImage
                src={getCurrentImageUrl()}
                alt={`${lidar.name} - Frame ${currentFrame + 1}`}
                className="preview-image"
                objectFit="contain"
              />
            </div>

            <div className="frame-control">
              <Space direction="vertical" style={{ width: "100%" }}>
                <div className="frame-info">
                  Frame {currentFrame + 1} / {lidar.frameCount}
                  <span className="frame-name">
                    ({lidar.frames[currentFrame]})
                  </span>
                </div>
                <Slider
                  min={0}
                  max={lidar.frameCount - 1}
                  value={currentFrame}
                  onChange={handleFrameChange}
                  marks={{
                    0: "1",
                    [lidar.frameCount - 1]: String(lidar.frameCount),
                  }}
                />
              </Space>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="LiDAR Scan Info" className="info-card">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Name">{lidar.name}</Descriptions.Item>
              <Descriptions.Item label="Total Frames">
                {lidar.frameCount}
              </Descriptions.Item>
              <Descriptions.Item label="First Frame">
                {lidar.firstFrame}
              </Descriptions.Item>
              <Descriptions.Item label="Last Frame">
                {lidar.lastFrame}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title="Quick Jump"
            className="quick-jump-card"
            style={{ marginTop: "16px" }}
          >
            <Space wrap>
              {quickJumpFrames.map((frame) => (
                <Button
                  key={frame}
                  size="small"
                  onClick={() => setCurrentFrame(frame)}
                  type={currentFrame === frame ? "primary" : "default"}
                >
                  Frame {frame + 1}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LidarDetail;
