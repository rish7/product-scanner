import { Injectable } from '@angular/core';
import { User, ScannedItem } from '../models';

@Injectable()
export class CommonService {
  public BASE_URL = "";
  public currentUser: User;
  private requestItems: Array<{ "requestDate": Date, "scannedItems": Array<ScannedItem> }> = [];

  public currentUserInfo(): User {
    return this.currentUser;
  }

  /**
   * It will return users is logged in or not
   * @memberOf CommonService
   */
  public isLoggedIn(): Boolean {
    return (this.currentUser != null);
  }

  public updateHistoryData(scannedItems: Array<ScannedItem>) {
    this.requestItems.splice(0, 0, {
      "requestDate": new Date(),
      "scannedItems": scannedItems
    });
  }

  public getHistoryData(): Array<{ "requestDate": Date, "scannedItems": Array<ScannedItem> }> {
    return this.requestItems;
  }

  /**
 * getDateFormat
 * @param dateTimestamp 
 * @return // e.g. "24 Jul 1987 12:00 AM";
 */
  public getDateFormat(date: Date): string {
    let month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutesString = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutesString + ampm;
    return (date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear() + " " + strTime);
  }

  public isNullOrEmpty(value: string): Boolean {
    if (value == null) {
      return true;
    }
    else if ((value || '').trim().length == 0) {
      return true;
    }

    return false;
  }


}