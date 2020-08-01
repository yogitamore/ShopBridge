import { environment } from 'src/environments/environment';

const apiURL = environment.shopsBaseURL;

export const ShopsAPI = {

    AddItems: apiURL + 'Product/SaveItems',
    GetItems: apiURL + 'Product/GetItems',
    RemoveItems: apiURL + 'Product/RemoveItem',
    UploadFile: apiURL + 'Product/UploadFile',
    CreateImage: apiURL + 'Product/GetImage'
    // RemoveTearsheetDetailsFromFolder: apiURL + 'tearsheet/RemoveTearsheetDetails'
}