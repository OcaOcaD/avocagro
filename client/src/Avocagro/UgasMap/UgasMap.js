import React from 'react';
import { useState } from 'react';
import MapItself from './MapItself'
const UgasMap = () => {
  const [values, setValues] = useState({
      maps_credential: "hola",
      poligonos: [],
      markerPosition: {lat: 19.702747416624746, lng: -103.45999999999998},
      coord: null,
      inside: "nope",
      test: "",
      dots: [],
      info: 3,
      ugas_info: [
        {
            "code": "uga023_03",
            "uso": "Agricultura",
            "d_fragilidad": "Alta. Inestable. Desequilibrio, detrimento formación de suelo.",
            "no_uga": "023-03",
            "p_ambiental": "Aprovechamiento",
            "compatible": "Conservación y áreas naturles. Pecuario.",
            "condicionado": "Asentamientos humanos y vivienda. Infraestructura.",
            "incompatible": "Mineria",
            "criterios_ag": [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31],
            "criterios_fo": [2, 5, 6, 9, 12, 13, 14]       
        },
        {
            "code": "uga023_04",
            "uso": "Agricultura",
            "d_fragilidad": "Alta. Inestable. Desequilibrio, detrimento formación de suelo.",
            "no_uga": "023-04",
            "p_ambiental": "Aprovechamiento",
            "compatible": "Conservación y áreas naturles, Turismo",
            "condicionado": "Asentamientos humanos y vivienda, Pesca, Pecuario",
            "incompatible": "Mineria",
            "criterios_ag": [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31],
            "criterios_fo": [2, 5, 6, 9, 12, 13, 14]
        },
        {
            "code": "uga023_18",
            "uso": "Agricultura",
            "d_fragilidad": "Alta. Inestable. Desequilibrio, detrimento formación de suelo.",
            "no_uga": "023-18",
            "p_ambiental": "Aprovechamiento",
            "compatible": "Conservación y áreas naturles, Turismo",
            "condicionado": "Forestal, Asentamientos humanos y vivienda, Industria",
            "incompatible": "Pecuario",
            "criterios_ag": [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31],
            "criterios_fo": [2, 5, 6, 9, 12, 13, 14]
        },
        {
            "code": "Desconocido",
            "msg":"Información aún no disponible"
        }
      ],
      criterios_ag: [
        "No definido",
        "Fomentar rotación de cultivos, uso preferente de leguminosas",
        "Favorecer establecieminto de cultivos con tecnificación de riego",
        "Favorecer establecimiento de cercos vivos entre parcelas",
        "Limitación y condicionamiento de apoyos y subsidios a actividades con sistema de riego de agua rodada",
        "Favorecer establecimiento de invernaderos tecnificados",
        "Uso de agroquímicos avalados por CICOPLAFEST",
        "Fomentar capacitación en el uso apropiado y seguro de agroquímicos",
        "Incentivos y apoyos oficiales a productores que eviten o minimicen el uso de agroquímicos",
        "Cumplimiento obligatorio de disposiciones de la Ley General de Desarrollo Forestal Sustentable ",
        "El establecimeinto de huertas frutícolas requiere estudio técnico justificativo para autorización de cambio de uso de suelo y manifestación de impacto ambiental",
        "Promover Planes de Manejo Forestal conforme a la NOM-152-Semarnat-2006",
        "Cambio de uso de suelo condicionado a Manifestación de Impacto Ambiental federal, estatal o municipal y al Estudio Técnico Justificativo Federal para cambio de uso de suelo",
        "Seguir lineamientos de la NOM-062-Semarnat-1994 para mitigar efectos adversos sobre la biodiversidad",
        "Cultivos de maíz y sorgo aledaños a causes de agua deberán preveer zonas de amortiguamiento de al menos 5 metros",
        "Observación de la NOM-015-Semarnat/Sagarpa-1997 que regula el uso de fuego en terrenos forestales y agropecuarios",
        "Promover opciones de cultivos semiperennes o perennes en suelos con pendientes mayores al 15% y evitar siembra de cultivos anuales",
        "Realizar prácticas agrícolas (barbacheo, surcado y terraceo) en sentido perpendicular a la pendiente",
        "Mantener franja mínima de vegetación de 20 metros de ancho sobre perímetro de los predios agrosilvopastories",
        "Áreas agrícolas de alta fertilidad no podrán ser sustituidas por desarrollos urbanos u otros usos distintos al agrícola",
        "Promover fertilización de cultivos con fuentes orgánicas",
        "Incorporar abonos orgánicos en áreas sometidas a monocultivos",
        "Incorporar coberturas orgánicas sobre suelo para evitar erosión",
        "Evitar aplicación de agroquímicos en áreas agrícolas cercanas a centros de población y/o hábitats de fauna silvestre",
        "Uso de plaguicias vigilado y sancionado por SEMADET, Procuraduría Estatal de Protección al Ambiente y autoridades municipales",
        "Vigilancia en el cumplimiento de la normativiad de aguas residuales empleadas para el riego agrícola",
        "Ampliación y apertura de zonas de riego en función de excedentes disponibles a partir del balance hídrico de cuenca.",
        "Para áreas frutales, promover establecieminto de cultivos de cobertera de ciclo largo entre las hilaeras de árboles",
        "Promover captación de agua de lluvia in situ para cultivos perennes",
        "No se autoriza ningún fomento gubernamental para aumento de superficie de cultivo sobre terrenos con suelo delgado, pendientes mayores al 15% y de alta susceptibilidad a la erosión",
        "Retener sedimentos preferentemente con represamientos escalonados en pendientes mayores al 15%",
        "Asignación de parcelas ejidales de acuerdo al Art. 59 de la Ley Agraria",
        "En centros de población definidos, las activiades agrícolas deberán seguir disposisicones y restricciones de acuerdo al Programa de Desarrollo Urbano o Progrma Parcial de Desarrollo Urbano"
      ],
      criterios_fo: [
        "No definido",
        "Requerimientos para la explotación forestal: sustentabilidad productiva a largo plazo, microcuencas como unidad de manejo espacial, concepto de uso múltiple de ecosistemas  ",
        "Reforestación con especias nativas  y las densidades naturales, fomentando viveros locales",
        "Rehabilitación de terracerias existentes",
        "Preveer incendios forestales mediante la apertura de guardarrayas entre predios colindantes, limpieza y control de material combustible e integración de brigadas preventivas",
        "Cumplimiento de la NOM-012-Semarnat-1996 para el uso y aprovechamiento de leña",
        "Cumplimeinto de la NOM-015-SEMARNAT/SAGARPA-1997 que regula el uso de fuego en terreneos forestales",
        "Fomentar la conservación y restauración de la vegetación del sotobosque en área con pendientes mayores al 8%",
        "Uso de maquinaria forestal condicionado por auotoridades forestales",
        "Promover cultura forestal a través de programas educativos, de capacitación, desarrollo tecnológico e investigación",
        "Aplicar esquemas de aeguren la conservación y el aprovechamiento sustentalbe de recursos forestales",
        "Seguir lineamientos de la NOM-061-Semarnat-1994 para mitigar efectos adversos sobre la biodiversidad por el aprovechamento forestal",
        "Establecer áreas de exclusión temporal de ganadería y uso público ",
        "Garantizar continuidad de los patrones naturales de los flujos hídricos",
        "Incentivar programas de sanidad forestal en zonas degradadas o con presencia de plagas y enfermedades",
        "Promover establecimiento de reverva forestal",
        "Seguir criterios de manejo del área natural protegida",
      ]
  })
			
  // console.log("UGAS___________", UGAS_INFO)

  const markerDragged = (coord, result, index) => {

    console.log("marker sssss:", coord, result, index )
    console.log("Inside:", index)
    console.log({lat: coord.latLng.lat(), lng: coord.latLng.lng()})
    let dots = values.dots
    dots.push( {lat: coord.latLng.lat(), lng: coord.latLng.lng()} )
    setValues({...values, 
      markerPosition: 
      {lat: coord.latLng.lat(), lng: coord.latLng.lng()},
      dots: dots,
      // inside: result.toString(),
      inside: values.ugas_info[index].code,
      info: index
    })
    console.log("new marker pos;", values.markerPosition)
    // Is th marker inside a polygon?
    
  }
  
  //onclick print
  const _onClick = (event, {lat, lng}) => {
    // console.log("e:", event)
    // console.log({lat, lng})
  } 
  return (
    <div style={{ "display": "flex", "flexDirection":"column", "alignItems": "center", "width": "100%" }} >
        <br/>
        <h1>Criterios ecológicos según tu ubicación</h1>
        <br />
        <div id="Prototype"
        style = {{width: "90%"}}
        >
            <h3>Arrastra el marcador y consulta los criterios ecológicos que rigen el lugar</h3>
            <p>Marker position: {values.markerPosition.lat}, {values.markerPosition.lng} </p>
            <h2>Se encuentra dentro del UGA: {values.inside}</h2>
            {/* {JSON.stringify(values.dots)} */}
            <div className="mapContainer"
              style={{position: "relative", width: "80%", height: "700px", maxHeight: "60vh", background: "red"}} >
              <MapItself _onClick={_onClick} markerPosition={values.markerPosition} markerDragged={markerDragged}></MapItself>
            </div>
              <h3>Información de UGA</h3>
              <strong>Fragilidad ecológica</strong>
              <p>{ JSON.stringify(values.ugas_info[values.info].d_fragilidad)}</p>
              <strong>Uso compatible</strong>
              <p>{ JSON.stringify(values.ugas_info[values.info].compatible)}</p>
              <strong>Fragilidad condicionado</strong>
              <p>{ JSON.stringify(values.ugas_info[values.info].condicionado)}</p>
              <strong>Uso incompatible</strong>
              <p>{ JSON.stringify(values.ugas_info[values.info].incompatible)}</p>

            <div className="info" style={{display: "flex"}}>
              <div className="ag" style={{width:"50%"}}>
                <h3>Criterios Agricultura</h3>
                {
                  ( values.ugas_info[values.info].code !== "Desconocido" ) ? 
                    values.ugas_info[values.info].criterios_ag.map( (c, index) => (
                      <p key={index}> - {values.criterios_ag[c]} </p>
                    ) )
                  : null
                }
              </div>
              <div className="fo" style={{width:"50%"}}>
                <h3>Criterios Forestales</h3>
                {
                  ( values.ugas_info[values.info].code !== "Desconocido" ) ? 
                    values.ugas_info[values.info].criterios_fo.map( (c, index) => (
                      <p key={index}> - {values.criterios_fo[c]} </p>
                    ) )
                  : null
                }
              </div>
            </div>
        </div>
    </div>
    
  );
}

export default UgasMap;
