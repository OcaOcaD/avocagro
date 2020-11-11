import React from 'react';
import { useState } from 'react';
import CoordSelectorMap from '../../MapComponents/CoordSelectorMap'
const NewSpace = () => {
  const [space, setSpace] = useState({
      name: '',
      ubication: {lat: 19.704741568041037, lng: -103.4631610648604},
      size: 100,
      sizeUnit: 'm2',
      circleRadius: 50,
      soilType: "",
      avocadoTypes: [],
      wateringTipe: ""
    //   tipo de suelo,
    //   variedades,
    //   tipos de riego,

    //   plantaPorHectarea,
    //   frecuenciaDeRiego,
    //   sistemaDeRiego,
    //   sociedad
  }) 
  const markerDragged = ( coord ) => {
    console.log({lat: coord.latLng.lat(), lng: coord.latLng.lng()})
    setSpace({...space, 
      ubication: 
      {lat: coord.latLng.lat(), lng: coord.latLng.lng()}
    })
    console.log("new marker pos;", space.ubication)
  }
  //
  const handleInputChange = (e) => {
      //
      let id = e.target.id
      let val = e.target.value
      console.log("input changed", id,":", val)
      switch (id) {
          case "sizeInput":{
              //Just numbers
            let sizeNumber = parseFloat(val);
            console.log("sizeN:", sizeNumber)
            if (
              sizeNumber !== false &&
              sizeNumber !== "undefined" &&
              !isNaN(sizeNumber)
            ) {
                // Set circle size depending on unit
                let newCircleSize = sizeNumber;
                switch (space.sizeUnit) {
                    case 'm2':{
                        setSpace({...space, size: sizeNumber, circleRadius: newCircleSize/2})
                        break;
                    }
                    case 'ha':{
                        newCircleSize *= 100
                        setSpace({...space, size: sizeNumber, circleRadius: newCircleSize/2})
                        break;
                    }
                    default:{
                        console.log("ups. algo salió mal con el radio. size")
                        break;
                    }
                }
            }
            if( isNaN(sizeNumber) ){
                setSpace({...space, size: '', circleRadius: 0})
            }
            break;
          }
          case "sizeUnit":{
            console.log("size unit changing", val)
            let newCircleSize = space.size/2
            switch (val) {
                case 'm2':{
                    newCircleSize /= 2
                    console.log("ncs mopt:", newCircleSize)
                    setSpace({...space, sizeUnit:val, circleRadius: newCircleSize })
                    break;
                }
                case 'ha':{
                    newCircleSize *= 100
                    newCircleSize /= 2
                    console.log("ncs haopt:", newCircleSize)
                    setSpace({...space, sizeUnit:val, circleRadius: newCircleSize })
                    break;
                }
                default:{
                    console.log("ups. algo salió mal con el radio. size unit.")
                    break;
                }
            }
            console.log("so radius is:", space.circleRadius)
              
              break;
          }
              
      
          default:
              break;
      }

  }
  //
  return (
      <div id="newSpace" className="newSpace col-md-6">
          <h1>Registrar nueva parcela</h1>
          <hr/> 
        <div className="form-group">
            <label>Nombre de la parcela</label>
            <input id="nameInput" name="nameInput" className="form-control" type="text"/>
        </div>
        <div className="form-group">
            <h2>Ubicación geográfica</h2>
            <label>Tamaño</label>
            <div className="row">
                <input id="sizeInput" name="sizeInput" className="form-control col-md-8" type="text" onChange={handleInputChange} value={space.size}  />
                <select name="sizeUnit" id="sizeUnit" className="col-md-4" onChange={handleInputChange} value={space.sizeUnit}>
                    <option value="m2">Metros cuadrados</option>
                    <option value="ha">Hectáreas</option>
                </select>
            </div>
            <p>{JSON.stringify(space.ubication)}</p>
            <div loading="lazy" style={{width: "100%", height:"auto", minHeight:"400px", display:"block", position: "relative"}}>
                <CoordSelectorMap markerPosition={space.ubication} size={space.circleRadius} markerDragged={markerDragged} />

            </div>
        </div>
        <div className="form-group">
            <label>Tipo de suelo:</label>
            <input disabled id="nameInput" name="nameInput" className="form-control" type="text"/>
        </div>
        <div className="form-group">
            <label>Variedades de aguacate</label>
            <input id="avoTypes" name="avoTypes" className="form-control" type="text"/>
        </div>

        <div className="form-group">
            <label>Tipo de riego</label>
            <select name="wateringTypeInput" id="wateringTypeInput">
                <option value="">Microasperción</option>
                <option value="">Microasperción</option>
                <option value="">Microasperción</option>

            </select>
        </div>
    </div>
            

  );
}

export default NewSpace;
