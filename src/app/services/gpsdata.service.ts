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
  constructor(private webSoc:WebsocketService) { }

  Init() {
    this.webSoc.listen("gps-next").subscribe((data:any) => {
      this.parsedData=JSON.parse(data)
      this.long=this.parsedData.longitude
      this.lat=this.parsedData.latitude
      this.head=this.parsedData.heading
      // console.log(this.lat)
      // console.log(this.long)

    })
  }

  heading(){
    // console.log(this.head)
    return(this.head)
  }

  coordinate(){
    console.log(this.lat)
    console.log(this.long)
    return [this.lat,this.long]
  }


}
