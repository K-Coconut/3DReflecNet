import React, { useState } from "react";
import { Modal, Button, Space } from "antd";
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import "./SimpleImageViewer.css";

interface SimpleImageViewerProps {
  visible: boolean;
  imageUrl: string;
  title?: string;
  onClose: () => void;
}

const SimpleImageViewer: React.FC<SimpleImageViewerProps> = ({
  visible,
  imageUrl,
  title = "Image Viewer",
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
  };

  return (
    <Modal
      open={visible}
      title={title}
      footer={null}
      onCancel={onClose}
      width="90%"
      style={{ top: 20 }}
      bodyStyle={{ padding: 0, background: "#000" }}
    >
      <div className="simple-image-viewer">
        <div className="viewer-toolbar">
          <Space>
            <Button
              icon={<ZoomInOutlined />}
              onClick={handleZoomIn}
              type="text"
              style={{ color: "#fff" }}
            />
            <Button
              icon={<ZoomOutOutlined />}
              onClick={handleZoomOut}
              type="text"
              style={{ color: "#fff" }}
            />
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              type="text"
              style={{ color: "#fff" }}
            />
          </Space>
        </div>
        <div className="viewer-content">
          <img
            src={imageUrl}
            alt={title}
            style={{
              transform: `scale(${zoom})`,
              transition: "transform 0.3s ease",
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SimpleImageViewer;