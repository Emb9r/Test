const functions = {
  createMarker : function(markerSource, data) {
    const { coordinates, name, address, vkLink, district, type} = data;
    let anchor = [0.5, 0.8]
    let logo = ''
    let iconScale = 0.1;
    if(type == 0){
      logo = 'icons/basic_marker_logo.png'
    }
    else if(type == 1){
      logo = 'icons/additional_marker_logo.png'
    }
    
    let socialLink = vkLink == "-"? 
    '<span>-</span>':
    `<a href=${vkLink} target="_blank">
        <div class="v-icon" style="height: 24px; width: 24px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4301 5.95043C23.5959 5.40303 23.4301 5 22.6357 5H20.013C19.3455 5 
                19.0378 5.34789 18.8709 5.73187C18.8709 5.73187 17.5371 8.93605 15.6477 11.0174C15.0362 11.6209 14.7584 11.8124 14.4247 
                11.8124C14.2579 11.8124 14.0071 11.6209 14.0071 11.0725V5.95043C14.0071 5.29275 13.8232 5 13.2677 5H9.14322C8.72658 5 
                8.47579 5.30478 8.47579 5.59452C8.47579 6.21711 9.42099 6.36148 9.5179 8.11395V11.9217C9.5179 12.7568 9.36503 12.9082 
                9.03132 12.9082C8.14207 12.9082 5.97891 9.68897 4.69501 6.00557C4.44622 5.28874 4.19443 5 3.524 5H0.899235C0.149872 5 
                0 5.34789 0 5.73187C0 6.41561 0.889243 9.81229 4.14148 14.3048C6.30963 17.3726 9.36204 19.0358 12.1427 19.0358C13.8103 
                19.0358 14.0161 18.6669 14.0161 18.0303V15.7114C14.0161 14.9725 14.1739 14.8251 14.7025 14.8251C15.0922 14.8251 15.7586 
                15.0176 17.3153 16.4964C19.0938 18.2498 19.3865 19.0358 20.3877 19.0358H23.0104C23.7598 19.0358 24.1355 18.6669 23.9197 
                17.937C23.6819 17.2112 22.8326 16.1575 21.7065 14.9073C21.0951 14.1955 20.1778 13.4285 19.8991 13.0445C19.5104 12.5523 
                19.6213 12.3327 19.8991 11.8946C19.8991 11.8946 23.0974 7.45727 23.4301 5.95043Z" fill="currentColor"></path>
            </svg>
        </div>
    </a>`;

    const marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(coordinates.reverse())),
      description: `<b style="color:#4a4a84">${name}</b>
                    <br/><br/><div style="color:#7e7ea7">Адрес</div>
                    <p style="color:#4a4a84">${address}</p>
                    <div style="color:#7e7ea7">Социальные сети</div>
                    <div class="regional-item-info__block-value _list">${socialLink}</div>`,
      name: district,
    });
    
    const markerStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: anchor,
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: logo,
        scale: iconScale
      })
    });

    marker.setStyle(markerStyle);
    markerSource.addFeature(marker);
},

  createPolygon : function(polygonSource, data) {
    const {coordinates, name, color, borderColor} = data;
    const newPolygon = new ol.geom.Polygon([coordinates]).transform('EPSG:4326', 'EPSG:3857');
    const polygon = new ol.Feature({
          geometry: newPolygon,
          name: name
    }); 
    const polygonStyle = new ol.style.Style({
      fill: new ol.style.Fill({
        color: color
      }),
      stroke: new ol.style.Stroke({
        color: borderColor, 
        width: 3 
      })
    });

    polygon.saveStyle = polygonStyle;
    polygon.setStyle(polygonStyle);
    polygonSource.addFeature(polygon);
  },

  createDistrict : function(departments, polygonSource, district) {
    const markerSource = new ol.source.Vector();
    
    departments.forEach((department) =>{
      createMarker(markerSource, {
        coordinates: department.coordinates,
        name: department.name,
        chairman: department.chairman,
        address: department.address,
        vkLink: department.vkLink,
        district: department.district,
        type: department.type}
      )
    })

    createPolygon(polygonSource, {
      coordinates: district.coordinates,
      name: district.name,
      color: district.color,
      borderColor: district.borderColor
    })

    const newCluster =  new ol.source.Cluster({
      distance: 700,
      source: markerSource,
    });
    newCluster.set('district', district.name);
    return newCluster;

  },

  getClusterRadius: function(zoom) {
    if (zoom < 10) {
      return 1000; 
    } else if (zoom < 11) {
      return 700; 
    } else if (zoom < 13) {
      return 450; 
    } else if (zoom < 16) {
      return 200; 
    } else {
      return 120; 
    }
  },
}

export const createMarker = functions.createMarker;
export const createPolygon = functions.createPolygon;
export const createDistrict = functions.createDistrict;
export const getClusterRadius = functions.getClusterRadius;
