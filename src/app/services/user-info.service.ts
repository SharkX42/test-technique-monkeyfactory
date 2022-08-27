import {Injectable} from "@angular/core";
import {UserInfo} from "../models/user-info.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Moment} from "moment";

@Injectable({
  providedIn: 'root'
})

export class UserInfoService{

  userInfo: UserInfo = new UserInfo();

  constructor(private httpClient: HttpClient) {
  }

  getUserInfo(): UserInfo{
    console.log(this.userInfo);
    return this.userInfo;
  }

  getIpAdressUserInfo(): Observable<{ ip: string }>{
    return this.httpClient.get<{ip: string}>('https://api.ipify.org?format=json');
  }

  setUserInfo(formValue: {firstName: string, lastName: string, dateOfBirth: Moment}){
    this.userInfo = {
      id: 1,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      dateOfBirth: formValue.dateOfBirth.toDate()
    }
  }
}
