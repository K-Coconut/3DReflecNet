import React, { useState } from "react";
import {
  Tabs,
  Slider,
  Row,
  Col,
  Card,
  Descriptions,
  Tag,
  Space,
  Button,
} from "antd";
import {
  type Instance,
  type ImageType,
  IMAGE_TYPE_LABELS,
  IMAGE_TYPE_FOLDERS,
  CATEGORY_LABELS,
} from "../../../types";
import { getAssetPath } from "../../../utils/getAssetPath";
import LazyImage from "../../common/Gallery/LazyImage";
import "./InstanceDetail.css";

interface InstanceDetailProps {
  instance: Instance;
}

const InstanceDetail: React.FC<InstanceDetailProps> = ({ instance }) => {
  const [activeImageType, setActiveImageType] = useState<ImageType>("rgb");
  const [currentFrame, setCurrentFrame] = useState(0);

  const getCurrentImageUrl = () => {
    const folder = IMAGE_TYPE_FOLDERS[activeImageType];
    const fileName = instance.images[activeImageType][currentFrame];
    return getAssetPath(
      `instances/${instance.categoryFolder}/${instance.id}/${folder}/${fileName}`
    );
  };

  const handleFrameChange = (value: number) => {
    setCurrentFrame(value);
  };

  const handleTabChange = (key: string) => {
    setActiveImageType(key as ImageType);
  };

  const tabItems = Object.entries(IMAGE_TYPE_LABELS).map(([key, label]) => ({
    key,
    label: label as string,
  }));

  return (
    <div className="instance-detail">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="image-preview-card">
            <Tabs
              activeKey={activeImageType}
              onChange={handleTabChange}
              items={tabItems}
            />

            <div className="image-container">
              <LazyImage
                src={getCurrentImageUrl()}
                alt={`${instance.name} - ${
                  IMAGE_TYPE_LABELS[activeImageType]
                } - Frame ${currentFrame + 1}`}
                className="preview-image"
                objectFit="contain"
              />
            </div>

            <div className="frame-control">
              <Space direction="vertical" style={{ width: "100%" }}>
                <div className="frame-info">
                  Frame {currentFrame + 1} / {instance.frameCount}
                </div>
                <Slider
                  min={0}
                  max={instance.frameCount - 1}
                  value={currentFrame}
                  onChange={handleFrameChange}
                  marks={{
                    0: "1",
                    [instance.frameCount - 1]: String(instance.frameCount),
                  }}
                />
              </Space>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Instance Info" className="info-card">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Name">
                {instance.name}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                <Tag color="blue">{CATEGORY_LABELS[instance.category]}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Material">
                {instance.material}
              </Descriptions.Item>
              <Descriptions.Item label="Model">
                {instance.model}
              </Descriptions.Item>
              <Descriptions.Item label="Environment">
                {instance.environment}
              </Descriptions.Item>
              <Descriptions.Item label="Total Frames">
                {instance.frameCount}
              </Descriptions.Item>
              <Descriptions.Item label="Has Glass">
                <Tag color={instance.metadata.hasGlass ? "green" : "default"}>
                  {instance.metadata.hasGlass ? "Yes" : "No"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title="Quick Jump"
            className="quick-jump-card"
            style={{ marginTop: "16px" }}
          >
            <Space wrap>
              {[0, 10, 40].map((frame) => (
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

export default InstanceDetail;
