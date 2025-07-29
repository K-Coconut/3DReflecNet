import React, { useState, useMemo, useEffect } from "react";
import { Typography, Row, Col, Spin, Alert } from "antd";
import { useLocation } from "react-router-dom";
import Gallery from "../components/common/Gallery";
import FilterPanel from "../components/common/FilterPanel";
import { useInstancesData } from "../hooks/useInstancesData";
import { filterInstances } from "../utils/filterInstances";
import type { FilterState, Category } from "../types";

const { Title } = Typography;

const Instances: React.FC = () => {
  const { data, loading, error } = useInstancesData();
  const location = useLocation();
  
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    imageType: null,
    searchText: "",
    hasGlass: null,
  });

  // Parse URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    console.log('URL params:', location.search);
    console.log('Category param:', categoryParam);
    
    if (categoryParam && ['household', 'industry', 'art', 'nature'].includes(categoryParam)) {
      console.log('Setting category filter to:', categoryParam);
      setFilters(prev => ({
        ...prev,
        category: categoryParam as Category
      }));
    }
  }, [location.search]);

  const filteredInstances = useMemo(() => {
    if (!data) return [];
    return filterInstances(data.instances, filters);
  }, [data, filters]);

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
            Instance Gallery
          </Title>
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
          <Row gutter={24}>
            <Col xs={24} sm={24} md={6} lg={5} xl={4}>
              <FilterPanel
                filters={filters}
                availableCategories={data?.categories || []}
                onFilterChange={setFilters}
              />
            </Col>
            <Col xs={24} sm={24} md={18} lg={19} xl={20}>
              {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                  <Spin size="large" tip="Loading..." />
                </div>
              ) : (
                <Gallery instances={filteredInstances} selectedImageType={filters.imageType} />
              )}
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Instances;