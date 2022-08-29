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

  /**
   * @returns Informations concernant l'utilisateur
   */
  getUserInfo(): UserInfo{
    console.log(this.userInfo);
    return this.userInfo;
  }

  /**
   * @returns Observable de la réponse à la requête HTTP
   */
  getIpAdressUserInfo(): Observable<{ ip: string }>{
    return this.httpClient.get<{ip: string}>('https://api.ipify.org?format=json');
  }

  /**
   * @param {firstName: string, lastName: string, dateOfBirth: Moment}} formValue  Informations rentrées par
   * l'utilisateur
   */
  setUserInfo(formValue: {firstName: string, lastName: string, dateOfBirth: Moment}): void{
    this.userInfo = {
      id: 1,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      dateOfBirth: formValue.dateOfBirth.toDate()
    }
  }
}
