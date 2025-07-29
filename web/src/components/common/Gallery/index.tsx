import React from "react";
import { Row, Col, Card, Tag, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { type Instance, type ImageType, CATEGORY_LABELS, IMAGE_TYPE_FOLDERS } from "../../../types";
import { getAssetPath } from "../../../utils/getAssetPath";
import LazyImage from "./LazyImage";
import "./Gallery.css";

interface GalleryProps {
  instances: Instance[];
  loading?: boolean;
  selectedImageType?: ImageType | null;
}

const Gallery: React.FC<GalleryProps> = ({ instances, loading = false, selectedImageType = null }) => {
  const navigate = useNavigate();

  const handleInstanceClick = (id: string) => {
    navigate(`/instances/${id}`);
  };

  // Determine which image to show based on selected image type
  const getDisplayImage = (instance: Instance): { url: string; type: ImageType } => {
    // If no image type is selected or RGB is selected, show the default preview
    if (!selectedImageType || selectedImageType === 'rgb') {
      return { url: instance.preview, type: 'rgb' };
    }
    
    // Otherwise, show the first frame of the selected image type
    const images = instance.images[selectedImageType];
    
    if (images && images.length > 0) {
      // Construct the full path for the image
      const folder = IMAGE_TYPE_FOLDERS[selectedImageType];
      const imagePath = `/instances/${instance.categoryFolder}/${instance.id}/${folder}/${images[0]}`;
      return { url: imagePath, type: selectedImageType };
    }
    
    // Fallback to preview if no images found
    return { url: instance.preview || '', type: 'rgb' };
  };

  if (!loading && instances.length === 0) {
    return (
      <Empty description="No matching instances found" style={{ marginTop: "50px" }} />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {instances.map((instance) => {
        const displayImage = getDisplayImage(instance);
        return (
          <Col key={instance.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
              hoverable
              onClick={() => handleInstanceClick(instance.id)}
              cover={
                displayImage.url ? (
                  <LazyImage
                    src={getAssetPath(displayImage.url)}
                    alt={instance.name}
                    style={{ height: "200px" }}
                  />
                ) : (
                  <div style={{ 
                    height: "200px", 
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999"
                  }}>
                    No preview available
                  </div>
                )
              }
              className="instance-card"
            >
              <Card.Meta
                title={<div className="instance-title">{instance.name}</div>}
                description={
                  <div className="instance-meta">
                    <Tag color="blue">{CATEGORY_LABELS[instance.category]}</Tag>
                    <div className="instance-info">
                      <span>Material: {instance.material}</span>
                      <span>Frames: {instance.frameCount}</span>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Gallery;
