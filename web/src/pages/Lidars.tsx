import React, { useState, useMemo } from "react";
import { Typography, Row, Col, Spin, Alert, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import LidarGallery from "../components/lidars/LidarGallery";
import { useLidarsData } from "../hooks/useLidarsData";

const { Title } = Typography;
const { Search } = Input;

const Lidars: React.FC = () => {
  const { data, loading, error } = useLidarsData();
  const [searchText, setSearchText] = useState("");

  const filteredLidars = useMemo(() => {
    if (!data) return [];
    
    if (!searchText) return data.lidars;
    
    return data.lidars.filter(lidar =>
      lidar.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ padding: "24px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px"
        }}>
          <Title level={2} style={{ margin: 0 }}>
            LiDAR Scans
          </Title>
          {data && (
            <span style={{ color: "#666" }}>
              {data.totalLidars} LiDAR scans
            </span>
          )}
        </div>
        {error ? (
          <Alert
            message="Loading Failed"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: "24px" }}
          />
        ) : (
          <>
            <Row style={{ marginBottom: 24 }}>
              <Col span={24} md={12} lg={8}>
                <Search
                  placeholder="Search LiDAR scans..."
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="large"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                />
              </Col>
            </Row>
            {loading ? (
              <div style={{ textAlign: "center", padding: "50px" }}>
                <Spin size="large" tip="Loading..." />
              </div>
            ) : (
              <LidarGallery lidars={filteredLidars} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Lidars;