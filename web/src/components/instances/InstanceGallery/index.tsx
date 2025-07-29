import React from 'react';
import Gallery from '../../common/Gallery';
import type { Instance } from '../../../types';

interface InstanceGalleryProps {
  instances: Instance[];
  onInstanceClick: (instance: Instance) => void;
}

const InstanceGallery: React.FC<InstanceGalleryProps> = ({ instances }) => {
  return <Gallery instances={instances} />;
};

export default InstanceGallery;