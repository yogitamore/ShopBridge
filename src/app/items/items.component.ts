import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { APIService } from '../api.service';
import { ItemDetails } from '../Constants/ItemDetails';
//import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']//
})
export class ItemsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: APIService) { }
  submitted: boolean;
  addForm: FormGroup;
  items: any;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      itemname: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      file: [''],
      filePath: [''],

    });


    debugger;
    this.getData();

  }
  getData() {
    this.apiService.getItems().subscribe((result: ItemDetails[]) => {
      debugger;
      if (result != null) {
        this.items = result;
      }
    });



  }

  public uploadFile = (files) => {
    debugger;
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];

    this.addForm.get('file').setValue(fileToUpload);

    // file stream into base64
    // this.candidateService.FileToBase64(fileReader, file)
    //   .subscribe(base64string => {
    //     const Finalresult = base64string.split('base64,')[1];
    //   });

    const formData = new FormData();
    formData.append('file', this.addForm.get('file').value);
    this.apiService.uploadFile(formData).subscribe(data => {
      debugger;
      if (data != null) {
        debugger;
        console.log(data);

        this.addForm.get('filePath').setValue(data);
      }
    });

  }
  public createImgPath = (serverPath: string) => {
    this.apiService.createImage(serverPath).subscribe((Data: any) => {
      if (Data !== -1) {
        debugger;
        //this.notifyService.success('pdf created'); 
        var filename = new Date() + "Shares";
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(Data);
      }
      });
  }
  onSubmit() {
    debugger;

    this.submitted = true;
    if (!this.addForm.invalid) {

      this.apiService.addItems(this.addForm.value).subscribe((Data: any) => {
        if (Data !== -1) {
          debugger
          // this.notifyService.success("Items saved successfully!!");
          this.addForm.reset();
          alert('Items added successfully !!');
          this.getData();
        }

        this.submitted = false;
      });
    }


  }
  deleteItem(Id: number) {
    debugger;
    this.apiService.removeItems(Id).subscribe((Data: any) => {
      debugger;
      if (Data !== null) {
        this.getData()
        debugger
      }
    });

  }

}
