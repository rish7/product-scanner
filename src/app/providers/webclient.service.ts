import { CommonService } from './common.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class WebClientService {

  constructor(private http: Http, private commonService: CommonService) { }

  post(path: string, data: any, isAuthorization?: boolean, options?: any): Observable<any> {

    //return  Observable.throw( 'Internal Server error');
    const requestOptions = new RequestOptions({ headers: this.getCommonHeader() });
    if (options) {
      //TODO: Added them also to requestOptions
    }

    let map = this.http.post(this.commonService.BASE_URL + path, data, requestOptions).map((resp: Response) => {
      console.log('111')
      return this.checkResponseValidation(resp);
    });

    return map;
  }

  get(path: string, isAuthorization?: boolean, options?: any): Observable<any> {

    const requestOptions = new RequestOptions({ headers: this.getCommonHeader() });
    if (options) {
      //TODO: Added them also to requestOptions
    }

    let map = this.http.get(this.commonService.BASE_URL + path, requestOptions).map((resp: Response) => {
      return this.checkResponseValidation(resp);
    });
    return map;
  }

  private getCommonHeader(): Headers {
    const headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    //headers.append('Accept', '*/*');
    //headers.append('Referer', 'http://localhost:3000/');
    /*
    if (isAuthorization) {
      headers.append('Authorization', `Bearer ${this.commonService.currentUser.accessToken}`);
    }
    */

    return headers;
  }

  private checkResponseValidation(resp: Response): any {
    var data = resp.json();
    return data
  }

}