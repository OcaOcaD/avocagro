import React from 'react';
import './LandDetail.css'

import MapItself from '../UgasMap/MapItself'

const LandDetail = (props) => {
  
  return (
    <div className="landDetail">
        <div className="landContainer">
            <h1>UGA</h1>
            <p className="uga_text">{ props.uga }</p>
            <div className="ugasMap">
                <MapItself></MapItself>
            </div>
            <h2> Características generales de la UGA </h2>
            <div className="infoGroup">
                <h3>Fragilidad Ambiental</h3>
                <p>[{props.fragilidad}] {props.d_fragilidad}</p>
            </div>
            <div className="infoGroup">
                <h3> Uso Compatible </h3>
                <p>{props.compatible}</p>
            </div>
            <div className="infoGroup">
                <h3> Uso Condicionado </h3>
                <p>{props.condicionado}</p>
            </div>
            <div className="infoGroup">
                <h3> Uso Incompatible </h3>
                <p>{props.incompatible}</p>
            </div>
             
            

        </div>
    </div>
    
  );
}

export default LandDetail;
