import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Space, Typography, Tabs, Slider } from "antd";
import {
  CloseOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  RightOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  type Instance,
  type ImageType,
  IMAGE_TYPE_LABELS,
  IMAGE_TYPE_FOLDERS,
} from "../../../types";
import { getAssetPath } from "../../../utils/getAssetPath";
import "./ImageViewer.css";

const { Text } = Typography;

interface ImageViewerProps {
  visible: boolean;
  instance: Instance;
  initialImageType: ImageType;
  initialFrame: number;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  visible,
  instance,
  initialImageType,
  initialFrame,
  onClose,
}) => {
  const [imageType, setImageType] = useState<ImageType>(initialImageType);
  const [frameIndex, setFrameIndex] = useState(initialFrame);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getImageUrl = useCallback(() => {
    const folder = IMAGE_TYPE_FOLDERS[imageType];
    const images = instance.images[imageType];
    if (!images || images.length === 0 || !images[frameIndex]) {
      return '';
    }
    const fileName = images[frameIndex];
    return getAssetPath(`instances/${instance.categoryFolder}/${instance.id}/${folder}/${fileName}`);
  }, [instance, imageType, frameIndex]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handlePrevFrame = () => {
    setFrameIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextFrame = () => {
    setFrameIndex((prev) => Math.min(prev + 1, instance.frameCount - 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.max(0.5, Math.min(5, prev + delta)));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          handlePrevFrame();
          break;
        case "ArrowRight":
          handleNextFrame();
          break;
        case "Escape":
          onClose();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "0":
          handleReset();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [frameIndex]);

  const tabItems = Object.entries(IMAGE_TYPE_LABELS).map(([key, label]) => ({
    key,
    label,
  }));

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="100%"
      style={{ maxWidth: "100vw", top: 0 }}
      bodyStyle={{ height: "100vh", padding: 0 }}
      className="image-viewer-modal"
      closable={false}
    >
      <div className="image-viewer">
        <div className="viewer-header">
          <Space>
            <Text strong>{instance.name}</Text>
            <Text type="secondary">
              Frame {frameIndex + 1} / {instance.frameCount}
            </Text>
          </Space>
          <Space>
            <Button icon={<CloseOutlined />} onClick={onClose}>
              Close
            </Button>
          </Space>
        </div>

        <div className="viewer-toolbar">
          <div className="toolbar-left">
            <Tabs
              activeKey={imageType}
              onChange={(key) => setImageType(key as ImageType)}
              items={tabItems}
              size="small"
            />
          </div>
          <div className="toolbar-center">
            <Space>
              <Button
                icon={<LeftOutlined />}
                onClick={handlePrevFrame}
                disabled={frameIndex === 0}
              />
              <Slider
                value={frameIndex}
                min={0}
                max={instance.frameCount - 1}
                onChange={setFrameIndex}
                style={{ width: 200 }}
              />
              <Button
                icon={<RightOutlined />}
                onClick={handleNextFrame}
                disabled={frameIndex === instance.frameCount - 1}
              />
            </Space>
          </div>
          <div className="toolbar-right">
            <Space>
              <Button icon={<ZoomOutOutlined />} onClick={handleZoomOut} />
              <Text>{Math.round(scale * 100)}%</Text>
              <Button icon={<ZoomInOutlined />} onClick={handleZoomIn} />
              <Button icon={<ReloadOutlined />} onClick={handleReset} />
            </Space>
          </div>
        </div>

        <div
          className="viewer-content"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <img
            src={getImageUrl()}
            alt={`${instance.name} - ${IMAGE_TYPE_LABELS[imageType]} - Frame ${
              frameIndex + 1
            }`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
            draggable={false}
          />
        </div>

        <div className="viewer-footer">
          <Text type="secondary" className="keyboard-hints">
            Keyboard shortcuts: ← → Switch frames | + - Zoom | 0 Reset | ESC Close
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default ImageViewer;
