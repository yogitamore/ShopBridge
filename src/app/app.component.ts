import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShopBridgeUI';
  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location) { }

addInventory(){
  this.router.navigate(['/items']);


}

onBackClick() {
  this.location.back();
}

}
