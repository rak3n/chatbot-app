import React from 'react';
import ImageMap from '../../assets/icons/image-map';

const Image = ({ image = ""  }) => {
    const path = ImageMap[image];
    return (<img src={path} alt={image} />);
}

export default Image;
