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

  getItems() {
    return this._httpClient.get<ItemDetails[]>(ShopsAPI.GetItems);
  }


  addItems(items: ItemDetails) {

    return this._httpClient.post(ShopsAPI.AddItems, items);
  }

  removeItems(Id: number) {

    return this._httpClient.delete(ShopsAPI.RemoveItems + '?Id=' + Id);
  }

  getItem(Id: number) {

    return this._httpClient.get<ItemDetails>(ShopsAPI.GetItem + '?Id=' + Id);
  }

  uploadFile(file: any) {

    return this._httpClient.post(ShopsAPI.UploadFile, file);
  }

  createImage(filePath: string) {
    return this._httpClient.get(ShopsAPI.CreateImage + '?FilePath=' + filePath, { responseType: 'blob' });
  }
}