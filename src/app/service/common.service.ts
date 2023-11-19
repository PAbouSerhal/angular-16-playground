import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  apiUrl: string = environment.apiUrl;
  currentUser: string = "current user";
  constructor() {}
}
