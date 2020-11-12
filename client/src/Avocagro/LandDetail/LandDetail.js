import React from 'react';
import MapItself from '../UgasMap/MapItself'

import './LandDetail.css'

const LandDetail = (props) => {
  
    
    
    //
  return (
    <div className="landDetail">
        <div className="landContainer">
            <h1>UGA</h1>
            <p className="uga_text">{ props.detail.inside }</p>
            <div className="ugasMap">
                <MapItself
                    markerDragged={props.markerDragged}
                />
            </div>
            <div className="optionSelector">
              <button id="show_c" onClick={props.changeShowData} >Características</button>
              <button id="show_ca" onClick={props.changeShowData} >Criterios Ambientales</button>
            </div>
            {
                ( props.detail.showing === "show_c" ) ? 
                    <>
                        <h2> Características generales de la UGA </h2>
                        <div className="infoGroup">
                            <h3>Fragilidad Ambiental</h3>
                            <p>[{props.fragilidad}] {props.detail.ugas_info[ props.detail.info ].d_fragilidad  } </p>
                        </div>
                        <div className="infoGroup">
                            <h3> Uso predominante </h3>
                            <p>{props.detail.ugas_info[ props.detail.info ].uso  }</p>
                        </div>
                        <div className="infoGroup">
                            <h3> Uso Compatible </h3>
                            <p>{props.detail.ugas_info[ props.detail.info ].compatible  }</p>
                        </div>
                        <div className="infoGroup">
                            <h3> Uso Condicionado </h3>
                            <p>{props.detail.ugas_info[ props.detail.info ].condicionado  }</p>
                        </div>
                        <div className="infoGroup">
                            <h3> Uso Incompatible </h3>
                            <p>{props.detail.ugas_info[ props.detail.info ].incompatible  }</p>
                        </div>
                    </>
                 : 
                 <div className="criteriosContainer">
                    <h2> Criterios ambientales de la UGA </h2>
                    <div className="info">
                        <div className="ag">
                            <h3>Criterios Agricultura</h3>
                            <ul>
                            {
                            ( props.detail.ugas_info[props.detail.info].code !== "Desconocido" ) ? 
                                props.detail.ugas_info[props.detail.info].criterios_ag.map( (c, index) => (
                                <li key={index}> {props.detail.criterios_ag[c]} </li>
                                ) )
                            : null
                            }
                            </ul>
                        </div>
                        <div className="fo">
                            <h3>Criterios Forestales</h3>
                            <ul>
                            {
                            ( props.detail.ugas_info[props.detail.info].code !== "Desconocido" ) ? 
                                props.detail.ugas_info[props.detail.info].criterios_fo.map( (c, index) => (
                                <li key={index}> {props.detail.criterios_fo[c]} </li>
                                ) )
                            : null
                            }
                            </ul>
                        </div>
                    </div>
                 </div>
                
            }
            
             
            

        </div>
    </div>
    
  );
}

export default LandDetail;
