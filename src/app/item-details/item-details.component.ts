import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../api.service';
import { ItemDetails } from '../Constants/ItemDetails';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  Id:any;
  items: any;
  constructor( private router: Router,private route: ActivatedRoute, private apiService : APIService
    ) {
      debugger;
      this.route.params.subscribe(params => {
        this.Id = params.id;
      });
     }

  ngOnInit() {
    this.apiService.getItem(this.Id).subscribe((result: any) => {
      debugger;
      if (result != null) {
        this.items = result;
      }
    });

    debugger;
  }

}
