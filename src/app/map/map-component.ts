import 'ol/ol.css';
import Tile from 'ol/layer/Tile';
import Map from 'ol/Map' ;
import Overlay from 'ol/Overlay';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { toLonLat } from 'ol/proj.js';
import { fromLonLat } from 'ol/proj.js';
import View from 'ol/View';
import OSM from 'ol/source/OSM.js';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {Icon,Style} from 'ol/style';

import { Title } from '@angular/platform-browser';
import { WebsocketService } from '../services/websocket.service';
import { GpsdataService } from '../services/gpsdata.service';

@Component ({
  selector: 'app-map',
  templateUrl: './map-component.html',
  styleUrls: ['./map-component.css']
})
export class MapComponent implements OnInit {
  public map: Map | undefined;
  public satelitecnt:any

  constructor(private webSoc:WebsocketService, private gpsData:GpsdataService
    ) {
      // Start Socket IO connection and receive data
      this.gpsData.Init()

    }

  async ngOnInit() {


    // Start map initiation function and pass gps data
    this.initmap(this.gpsData);
    this.satelitecnt=this.gpsData.sateliteCount()


  }

  // Function to initiate gps data visualization in map
  initmap(gpsdataservice:any) {
    console.log("calling initmap");

    // Create a new feature for gps icon
    var gpsFeature = new Feature({
      // geometry : new Point(fromLonLat([-6.5360378062373,63.65079914412625]))
      geometry : new Point(fromLonLat([gpsdataservice.coordinate()]))
    });

     // Set the style for gps icon
    gpsFeature.setStyle(new Style({
      image : new Icon(({
        src: 'assets/arrow.svg',
        imgSize: [600, 600],
        scale: 0.1,
        color: '#00FF2B'
      }))
    }));

    // Make a vector source for new gps layer from gps feature
    var gpsSource = new VectorSource({
      features: [gpsFeature]
    });

    // Make a new vector layer from gps source
    var gpsLayer = new VectorLayer({
      source : gpsSource
    });

    // Make a map and setup the map source, layer, and view
    this.map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()

        }),
        gpsLayer
        //MapLayer
      ],
      view: new View({
        center:fromLonLat([gpsdataservice.coordinate()]),
        zoom: 10,
        enableRotation: false
      })

    });

    // Make an interval function that will update position and heading of gps icon every 0.1 second
    setInterval(function refreshIcon() {
      //console.log("getmission : ",flightDataService.getMission())
      // gpsdataservice.gpess()

      gpsSource.clear()
      var temp_gpsFeature = new Feature({
        // geometry : new Point(fromLonLat(MavlinkService.getCoordinate()))
        geometry : new Point(fromLonLat(gpsdataservice.coordinate()))
      });

      temp_gpsFeature.setStyle(new Style({
          image : new Icon(({
          src: 'assets/arrow.svg',
          imgSize: [600, 600],
          scale: 0.1,
          rotation: gpsdataservice.heading()
        }))
      }));
      gpsSource.addFeature(temp_gpsFeature)

    },100)
  }


}
