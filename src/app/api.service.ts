import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemDetails } from './Constants/ItemDetails';
import { ShopsAPI } from './Constants/Shops.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private _httpClient: HttpClient) { }

  getItems(): Observable<ItemDetails[]> {
    debugger;
    return this._httpClient.get<ItemDetails[]>(ShopsAPI.GetItems );
  }


addItems(items: ItemDetails){
  debugger;

  return this._httpClient.post(ShopsAPI.AddItems, items);
}

removeItems(Id:number) {
  debugger;
  return this._httpClient.delete(ShopsAPI.RemoveItems+ '?Id=' + Id);
}

uploadFile(file:any){
  debugger;
  return this._httpClient.post(ShopsAPI.UploadFile, file);
}

createImage(filePath: string){
    debugger;

    return this._httpClient.get(ShopsAPI.CreateImage+ '?FilePath='+filePath, {responseType: 'blob'});
  }
}