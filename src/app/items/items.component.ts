import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { APIService } from '../api.service';
import { ItemDetails } from '../Constants/ItemDetails';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']//
})
export class ItemsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: APIService){ }
  submitted: boolean;
  addForm: FormGroup;
  items: any;
  a: any;
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      itemname: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      file: [''],
      filePath: [''],
      fileid: ['']

    });

    this.getData();

  }
  // Load all items on page load
  getData() {
    this.apiService.getItems().subscribe((result: ItemDetails[]) => {
      if (result != null) {
        this.items = result;

      }
    });



  }
  // upload file and save on serverside path
  uploadFile(event) {
      if (event.target.files.length > 0) {
      const fileReader = new FileReader();
      const file = event.target.files[0];

      this.addForm.get('file').setValue(file);
      const formData = new FormData();
      formData.append('file', this.addForm.get('file').value);
      this.apiService.uploadFile(formData).subscribe(data => {

        if (data != null) {
          this.addForm.get('filePath').setValue(data);
        }
      });

    }
  }
  // public createImgPath = (serverPath: string) => {
  //   debugger;
  //   this.a = 'https://localhost:44379/api/Product/GetImage?FilePath=';
  //   // var bikeImage = document.getElementById("img_item") as HTMLImageElement;
  //   // bikeImage.src 
  //   this.a = this.a + serverPath;
  // }

  navigateToDetails(id) {

    this.router.navigate(['/itemsDetails/' + id]);

  }

  onSubmit() {
    this.submitted = true;
    if (!this.addForm.invalid) {

      this.apiService.addItems(this.addForm.value).subscribe((Data: any) => {
        if (Data !== -1) {
          // this.notifyService.success("Items saved successfully!!");
          this.addForm.reset();
        //  document.getElementById('fileid').se = ""
          alert('Items added successfully !!');
          this.getData();
        }

        this.submitted = false;
      });
    }

  }
  // Remove the items
  deleteItem(Id: number) {
    this.apiService.removeItems(Id).subscribe((Data: any) => {

      if (Data !== null) {
        this.getData();

      }
    });

  }

}
