    import {createDistrict, getClusterRadius} from './modules/functions.js'
    import {admiralteyskyDistrict, admiralteyskyDepartments} from './districts/admiralteysky.js'
    import {centralnyDistrict, centralnyDepartments} from './districts/centralny.js'
    import {frunzenskyDistrict, frunzenskyDepartments} from './districts/frunzensky.js'
    import {kalininskyDistrict, kalininskyDepartments} from './districts/kalininsky.js'
    import {kirovskyDistrict, kirovskyDepartments} from './districts/kirovsky.js'
    import {kolpinskyDistrict, kolpinskyDepartments} from './districts/kolpinsky.js'
    import {krasnogvardeiskyDistrict, krasnogvardeiskyDepartments} from './districts/krasnogvardeisky.js'
    import {krasnoselskyDistrict, krasnoselskyDepartments} from './districts/krasnoselsky.js'
    import {kronstadtskyDistrict, kronstadtskyDepartments} from './districts/kronstadtsky.js'
    import {kurortnyDistrict, kurortnyDepartments} from './districts/kurortny.js'
    import {moskovskyDistrict, moskovskyDepartments} from './districts/moskovsky.js'
    import {nevskyDistrict, nevskyDepartments} from './districts/nevsky.js'
    import {petrodvorcovyDistrict, petrodvorcovyDepartments} from './districts/petrodvorcovy.js'
    import {petrogradskyDistrict, petrogradskyDepartments} from './districts/petrogradsky.js'
    import {primorskyDistrict, primorskyDepartments} from './districts/primorsky.js'
    import {pushkinskyDistrict, pushkinskyDepartments} from './districts/pushkinsky.js'
    import {vasileostrovskyDistrict, vasileostrovskyDepartments} from './districts/vasileostrovsky.js'
    import {vyborgskyDistrict, vyborgskyDepartments} from './districts/vyborgsky.js'
    
    const polygonSource = new ol.source.Vector();
    const clusterSources = {};

    clusterSources[admiralteyskyDistrict.name] = createDistrict(admiralteyskyDepartments, polygonSource, admiralteyskyDistrict);
    clusterSources[centralnyDistrict.name] = createDistrict(centralnyDepartments, polygonSource, centralnyDistrict);
    clusterSources[frunzenskyDistrict.name] = createDistrict(frunzenskyDepartments, polygonSource, frunzenskyDistrict);
    clusterSources[kalininskyDistrict.name] = createDistrict(kalininskyDepartments, polygonSource, kalininskyDistrict);
    clusterSources[kirovskyDistrict.name] = createDistrict(kirovskyDepartments, polygonSource, kirovskyDistrict);
    clusterSources[kolpinskyDistrict.name] = createDistrict(kolpinskyDepartments, polygonSource, kolpinskyDistrict);
    clusterSources[krasnogvardeiskyDistrict.name] = createDistrict(krasnogvardeiskyDepartments, polygonSource, krasnogvardeiskyDistrict);
    clusterSources[krasnoselskyDistrict.name] = createDistrict(krasnoselskyDepartments, polygonSource, krasnoselskyDistrict);
    clusterSources[kronstadtskyDistrict.name] = createDistrict(kronstadtskyDepartments, polygonSource, kronstadtskyDistrict);
    clusterSources[kurortnyDistrict.name] = createDistrict(kurortnyDepartments, polygonSource, kurortnyDistrict);
    clusterSources[moskovskyDistrict.name] = createDistrict(moskovskyDepartments, polygonSource, moskovskyDistrict);
    clusterSources[nevskyDistrict.name] = createDistrict(nevskyDepartments, polygonSource, nevskyDistrict);
    clusterSources[petrodvorcovyDistrict.name] = createDistrict(petrodvorcovyDepartments, polygonSource, petrodvorcovyDistrict);
    clusterSources[petrogradskyDistrict.name] = createDistrict(petrogradskyDepartments, polygonSource, petrogradskyDistrict);
    clusterSources[primorskyDistrict.name] = createDistrict(primorskyDepartments, polygonSource, primorskyDistrict);
    clusterSources[pushkinskyDistrict.name] = createDistrict(pushkinskyDepartments, polygonSource, pushkinskyDistrict);
    clusterSources[vasileostrovskyDistrict.name] = createDistrict(vasileostrovskyDepartments, polygonSource, vasileostrovskyDistrict);
    clusterSources[vyborgskyDistrict.name] = createDistrict(vyborgskyDepartments, polygonSource, vyborgskyDistrict);



    const clusterStyle = feature => {
      const size = feature.get('features').length;
      if (size > 1) {
        return new ol.style.Style({
          image: new ol.style.Icon({
            src: 'icons/cluster-icon.png',
            scale: 0.45, 
            anchor: [0.5, 0.8], 
          }),
          text: new ol.style.Text({
            text: size.toString(),
            fill: new ol.style.Fill({ color: '#ffffff' }),
            offsetY: -28, 
            font: 'bold 14px Arial'
          })
        });
      }
      return feature.get('features')[0].getStyle();
    };
    
    const mapLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
    const boundaryLayer = new ol.layer.Vector({ source: polygonSource });
    const admClusterLayer = new ol.layer.Vector({ source: clusterSources[admiralteyskyDistrict.name], style: clusterStyle });
    const centClusterLayer = new ol.layer.Vector({ source: clusterSources[centralnyDistrict.name], style: clusterStyle });
    const frunClusterLayer = new ol.layer.Vector({ source: clusterSources[frunzenskyDistrict.name], style: clusterStyle });
    const kaliClusterLayer = new ol.layer.Vector({ source: clusterSources[kalininskyDistrict.name], style: clusterStyle });
    const kirClusterLayer = new ol.layer.Vector({ source: clusterSources[kirovskyDistrict.name], style: clusterStyle });
    const kolClusterLayer = new ol.layer.Vector({ source: clusterSources[kolpinskyDistrict.name], style: clusterStyle });
    const kragClusterLayer = new ol.layer.Vector({ source: clusterSources[krasnogvardeiskyDistrict.name], style: clusterStyle });
    const krasClusterLayer = new ol.layer.Vector({ source: clusterSources[krasnoselskyDistrict.name], style: clusterStyle });
    const kronClusterLayer = new ol.layer.Vector({ source: clusterSources[kronstadtskyDistrict.name], style: clusterStyle });
    const kurClusterLayer = new ol.layer.Vector({ source: clusterSources[kurortnyDistrict.name], style: clusterStyle });
    const moslusterLayer = new ol.layer.Vector({ source: clusterSources[moskovskyDistrict.name], style: clusterStyle });
    const nevClusterLayer = new ol.layer.Vector({ source: clusterSources[nevskyDistrict.name], style: clusterStyle });
    const petdClusterLayer = new ol.layer.Vector({ source: clusterSources[petrodvorcovyDistrict.name], style: clusterStyle });
    const petgClusterLayer = new ol.layer.Vector({ source: clusterSources[petrogradskyDistrict.name], style: clusterStyle });
    const primClusterLayer = new ol.layer.Vector({ source: clusterSources[primorskyDistrict.name], style: clusterStyle });
    const pushClusterLayer = new ol.layer.Vector({ source: clusterSources[pushkinskyDistrict.name], style: clusterStyle });
    const vasClusterLayer = new ol.layer.Vector({ source: clusterSources[vasileostrovskyDistrict.name], style: clusterStyle });
    const vybClusterLayer = new ol.layer.Vector({ source: clusterSources[vyborgskyDistrict.name], style: clusterStyle });

    const map = new ol.Map({
      target: 'map',
      layers: [mapLayer, 
               boundaryLayer, 
               admClusterLayer,
               centClusterLayer,
               frunClusterLayer,
               kaliClusterLayer,
               kirClusterLayer,
               kolClusterLayer,
               kragClusterLayer,
               krasClusterLayer,
               kronClusterLayer,
               kurClusterLayer,
               moslusterLayer,
               nevClusterLayer,
               petdClusterLayer,
               petgClusterLayer,
               primClusterLayer,
               pushClusterLayer,
               vasClusterLayer,
               vybClusterLayer
              ],
      view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat([30.3350986, 59.9342802], 'EPSG:3857'), 
        zoom: 10,
        minZoom: 9.5,
        maxZoom: 20.5,
        extent: ol.proj.transformExtent([29.3, 59.6, 30.8, 60.3], 'EPSG:4326', 'EPSG:3857')
      })
    });

    map.on('click', evt => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, feature => feature);
      if (feature) {
        const isCluster = feature.get('features') && feature.get('features').length > 1;
        if (!isCluster && feature.getGeometry() instanceof ol.geom.Point) {
          const markerFeature = feature.get('features')[0];
          const description = markerFeature.get('description');
          const infoPanel = document.getElementById('info');
          infoPanel.innerHTML = description;
          infoPanel.classList.replace('hide', 'show');
        }
      }
    });

    map.on('pointermove', evt => {
      const pixel = map.getEventPixel(evt.originalEvent);
      const hitMarker = map.forEachFeatureAtPixel(pixel, function (feature) {
        const isCluster = feature.get('features') && feature.get('features').length > 1;
        return !isCluster && feature.getGeometry() instanceof ol.geom.Point; 
      });
      
      map.getTargetElement().style.cursor = hitMarker ? 'pointer' : '';
    });


    map.on('movestart', () => {
      const infoPanel = document.getElementById('info');
      infoPanel.classList.remove('show');
      infoPanel.classList.add('hide');
    });

    map.getView().on('change:resolution', () => {
      const THRESHOLD_ZOOM = 15;
      const  currentZoom = map.getView().getZoom();
      boundaryLayer.setVisible(currentZoom < THRESHOLD_ZOOM);
    });

    map.getView().on('change:resolution', () => {
      const currentZoom = map.getView().getZoom();
      const clusterLayers = map.getLayers().getArray().slice(2);
      clusterLayers.forEach(layer => {
        const source = layer.getSource();
        source.setDistance(getClusterRadius(currentZoom));
        });
      }
    );


    kurClusterLayer.getSource().on('addfeature', function(evt) {
      const regionPolygon = new ol.geom.Polygon([kurortnyDistrict.coordinates]).transform('EPSG:4326', 'EPSG:3857');
      const clusterGeometry = evt.feature.getGeometry();
      const clusterCoordinates = clusterGeometry.getCoordinates();  

      if (!regionPolygon.intersectsCoordinate(clusterCoordinates)) {
        const polygonCentr = ol.proj.transform([29.864878, 60.181222], 'EPSG:4326', 'EPSG:3857');
        clusterGeometry.setCoordinates(polygonCentr);
      }
    });
    
    function updateDistrictVisibility(selectedDistrict) {
      const features = boundaryLayer.getSource().getFeatures();
      const clusterLayers = map.getLayers().getArray().slice(2);
    
      if (selectedDistrict === 'all') {
        features.forEach(feature => {
          feature.setStyle(feature.saveStyle);
        });
    
        clusterLayers.forEach(layer => {
          layer.setVisible(true);
        });
    
      } else {
        features.forEach(feature => {
          const featureName = feature.get('name');
          if (featureName === selectedDistrict) {
            feature.setStyle(feature.saveStyle);
          } else {
            feature.setStyle(new ol.style.Style({}));
          }
        });
    
        clusterLayers.forEach(layer => {
          layer.setVisible(false);
        });

        const selectedLayer = clusterLayers.find(layer => layer.getSource().get('district') === selectedDistrict);
        if (selectedLayer) {
          selectedLayer.setVisible(true);
        }
      }
    }
    
    document.getElementById('district-select').addEventListener('change', e => {
      updateDistrictVisibility(e.target.value);
    });

    document.addEventListener('DOMContentLoaded', (event) => {
      const selectElement = document.getElementById('district-select');
      selectElement.addEventListener('change', () => {
          selectElement.blur();  
      });
    });
