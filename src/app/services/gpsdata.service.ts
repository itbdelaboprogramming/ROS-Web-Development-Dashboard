import { Injectable, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class GpsdataService {

  public parsedData:any
  public long:any
  public lat:any
  public head:any
  public satelite:any
  constructor(private webSoc:WebsocketService) { }

// Function to start receiving data from websocket
  Init() {
    this.webSoc.listen("gps-next").subscribe((data:any) => {
      // The data from raspberry pi client needs to be converted from string to json format
      this.parsedData=JSON.parse(data)

      this.long=this.parsedData.longitude
      this.lat=this.parsedData.latitude
      this.head=this.parsedData.heading
      this.satelite=this.parsedData.satelite
      // console.log(this.lat)
      // console.log(this.long)

    })
  }

// Function to get heading data
  heading(){
    // console.log(this.head)
    return(this.head)
  }

  // Function to get number of satelite
  sateliteCount(){
    
    console.log(this.satelite)

    return(this.satelite)
  }

  // Function to get coordinate data
  coordinate(){
    console.log(this.lat)
    console.log(this.long)
    return [this.lat,this.long]
  }


}
