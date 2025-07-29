import React from "react";
import { Card, Radio, Button, Space, Collapse, Input } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import {
  type Category,
  type ImageType,
  type FilterState,
  CATEGORY_LABELS,
  IMAGE_TYPE_LABELS,
} from "../../../types";
import "./FilterPanel.css";

const { Panel } = Collapse;
const { Search } = Input;

interface FilterPanelProps {
  filters: FilterState;
  availableCategories: Category[];
  onFilterChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  availableCategories,
  onFilterChange,
}) => {
  const handleCategoryChange = (value: Category | null) => {
    onFilterChange({
      ...filters,
      category: value,
    });
  };

  const handleImageTypeChange = (value: ImageType | null) => {
    onFilterChange({
      ...filters,
      imageType: value,
    });
  };

  const handleSearchChange = (value: string) => {
    onFilterChange({
      ...filters,
      searchText: value,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      category: null,
      imageType: null,
      searchText: "",
      hasGlass: null,
    });
  };

  const handleHasGlassChange = (value: boolean | null) => {
    onFilterChange({
      ...filters,
      hasGlass: value,
    });
  };

  const categoryOptions = availableCategories.map((cat) => ({
    label: CATEGORY_LABELS[cat],
    value: cat,
  }));

  const imageTypeOptions = Object.entries(IMAGE_TYPE_LABELS).map(
    ([value, label]) => ({
      label,
      value,
    })
  );

  const hasActiveFilters =
    filters.category !== null ||
    filters.imageType !== null ||
    filters.searchText.length > 0 ||
    filters.hasGlass !== null;

  return (
    <Card className="filter-panel">
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <div>
          <h3>Search</h3>
          <Search
            placeholder="Search instance names..."
            value={filters.searchText}
            onChange={(e) => handleSearchChange(e.target.value)}
            onSearch={handleSearchChange}
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>

        <Collapse defaultActiveKey={["categories", "imageTypes", "hasGlass"]} ghost>
          <Panel header="Category Filter" key="categories">
            <Radio.Group
              value={filters.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" className="filter-radio-group" style={{ width: '100%' }}>
                {categoryOptions.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
            {filters.category && (
              <Button
                type="link"
                size="small"
                onClick={() => handleCategoryChange(null)}
                style={{ marginTop: 8 }}
              >
                Clear category filter
              </Button>
            )}
          </Panel>

          <Panel header="Image Type" key="imageTypes">
            <Radio.Group
              value={filters.imageType}
              onChange={(e) => handleImageTypeChange(e.target.value)}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" className="filter-radio-group" style={{ width: '100%' }}>
                {imageTypeOptions.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
            {filters.imageType && (
              <Button
                type="link"
                size="small"
                onClick={() => handleImageTypeChange(null)}
                style={{ marginTop: 8 }}
              >
                Clear image type filter
              </Button>
            )}
          </Panel>

          <Panel header="Has Glass" key="hasGlass">
            <Radio.Group
              value={filters.hasGlass}
              onChange={(e) => handleHasGlassChange(e.target.value)}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" className="filter-radio-group" style={{ width: '100%' }}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Space>
            </Radio.Group>
            {filters.hasGlass !== null && (
              <Button
                type="link"
                size="small"
                onClick={() => handleHasGlassChange(null)}
                style={{ marginTop: 8 }}
              >
                Clear glass filter
              </Button>
            )}
          </Panel>
        </Collapse>

        {hasActiveFilters && (
          <Button
            type="default"
            icon={<ClearOutlined />}
            onClick={handleClearFilters}
            block
          >
            Clear All Filters
          </Button>
        )}
      </Space>
    </Card>
  );
};

export default FilterPanel;
