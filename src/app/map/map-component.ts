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
    ) {this.gpsData.Init() }

  async ngOnInit() {


    // this.webSoc.listen("gps-next");
    // console.log(this.webSoc.gpsdata)

    this.initmap(this.gpsData);
    this.satelitecnt=this.gpsData.sateliteCount()

    // this.webSoc.openWebSocket()

  }

  initmap(gpsdataservice:any) {
    console.log("calling initmap");


    var gpsFeature = new Feature({
      geometry : new Point(fromLonLat([-6.5360378062373,63.65079914412625]))
      // geometry : new Point(fromLonLat([this.lat,this.long]))
    });

    gpsFeature.setStyle(new Style({
      image : new Icon(({
        src: 'assets/arrow.svg',
        imgSize: [600, 600],
        scale: 0.1,
        color: '#00FF2B'
      }))
    }));

    var gpsSource = new VectorSource({
      features: [gpsFeature]
    });

    var gpsLayer = new VectorLayer({
      source : gpsSource
    });

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
        center:fromLonLat([-6.5360378062373,63.65079914412625]),
        zoom: 15,
        enableRotation: false
      })

    });
    setInterval(function refreshIcon() {
      //console.log("getmission : ",flightDataService.getMission())
      // gpsdataservice.gpess()

      gpsSource.clear()
      var temp_gpsFeature = new Feature({
        // geometry : new Point(fromLonLat(MavlinkService.getCoordinate()))//masi pake data dummy
        geometry : new Point(fromLonLat(gpsdataservice.coordinate()))//masi pake data dummy
      });

      temp_gpsFeature.setStyle(new Style({
          image : new Icon(({
          src: 'assets/arrow.svg',
          imgSize: [600, 600],
          scale: 0.1,
          // rotation : flightDataService.getFlightRecords().yaw
          rotation: gpsdataservice.heading()
        }))
      }));
      gpsSource.addFeature(temp_gpsFeature)

    },100)
  }


}
