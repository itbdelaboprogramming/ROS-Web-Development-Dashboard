import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Jimp from 'jimp';
import * as childProcess from 'child_process';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css']
})
export class MapDisplayComponent implements OnInit {

  public imageUrl: string ='';
  public img: any;
  public convertedImage: any;
  public test = 2;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const id = 'housemap'; // Replace with the ID of the image you want to display
    this.imageUrl = `http://localhost:3000/map/${id}`;

    // Make a GET request to the backend to retrieve the image file
    this.http.get(this.imageUrl, { responseType: 'blob' }).subscribe(
      (data) => {
        // Create a blob URL for the image file
        // this.imageUrl = URL.createObjectURL(blob);
        this.img = URL.createObjectURL(data);
        // const reader = new FileReader();
        // reader.readAsDataURL(blob);
        // reader.onloadend = () => {
        //   this.img = reader.result as string;
        // };
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  convertImage():void {
      // const img = new Image();
      // img.onload = () => {
      //   const canvas = document.createElement('canvas');
      //   canvas.width = img.width;
      //   canvas.height = img.height;
      //   const ctx = canvas.getContext('2d');
      //   ctx.drawImage(img, 0, 0);
      //   const dataUrl = canvas.toDataURL('image/png');
      //   this.convertedImage = dataUrl;
      // };
      // img.src = '../../assets/tb3_house_map.pgm';

      // const convert = childProcess.spawn('convert', ['../../assets/tb3_house_map.pgm', '../../assets/tb3_house_map.png']);
      // convert.on('close', () => {
      //   this.convertedImage = '../../assets/tb3_house_map.png';
      // });
  }


}

