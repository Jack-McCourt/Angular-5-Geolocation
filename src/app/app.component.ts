import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  location:string = '';
  locationError:string = '';
  lat:number = 0;
  lng:number = 0;
  
  constructor(private httpClient:HttpClient){  }
  
  getLatLng() {
    var locationString = encodeURI(this.location.replace(/[^\w\s]/gi, '')); //Strips special characters and formats string for URL.
    
    this.httpClient.get('//www.mapquestapi.com/geocoding/v1/address?key=KFvAofpZxBngIkGTMFbntZG51telGnim&location='+locationString)
    .subscribe(
      (data:any) => {
        if (data.results[0].locations[0].geocodeQuality === 'COUNTRY') { 
          this.locationError = 'We couldn\'t find you :O'; 
          this.lat = 0;
          this.lng = 0;
        } else {
          this.locationError = '';
          this.lat = data.results[0].locations[0].latLng.lat;
          this.lng = data.results[0].locations[0].latLng.lng;
        }
        
      }
    )
  }
}
