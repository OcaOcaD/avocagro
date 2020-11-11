import React from 'react';
import { useState } from 'react';
import Layout from './Layout';

// import ugaPolygons ;

const ProductionSpace = () => {
  const [space, setSpace] = useState({
      name: 'sex'
  })
  return (
    <div className="productionSpace">
        <h1>{space.name}</h1>
        <hr/>
        {/* <MapWithPolygons */}

    </div>
  );
}

export default ProductionSpace;
