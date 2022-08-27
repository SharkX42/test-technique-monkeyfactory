import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../services/user-info.service";
import {UserInfo} from "../models/user-info.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  userInfo!: UserInfo;
  ipAdress$!: Observable<{ ip: string }>;
  daysLeftBeforeBirthday!: number;
  dayInCurrentYear!: number;

  constructor(private userInfoService: UserInfoService, private router: Router) { }

  ngOnInit(): void {
    //Récupération des informations du formulaire complété par l'utilisateur
    this.userInfo = this.userInfoService.getUserInfo();
    // Si l'utilisateur accède à la page 'informationsUser' manuellement, il est redirigé vers la page d'accueil
    if(this.userInfo.lastName === undefined || this.userInfo.firstName === undefined || this.userInfo.dateOfBirth === undefined)
    {
      this.router.navigateByUrl('/');
    }

    //Récupération de l'adresse IP de l'utilisateur
    this.ipAdress$ = this.userInfoService.getIpAdressUserInfo();

    this.dayInCurrentYear = this.daysInYear(new Date().getFullYear());

    this.daysLeftBeforeBirthday = this.getNumberOfDaysLeftBeforeBirthday(this.userInfo.dateOfBirth)
  }

  getNumberOfDaysLeftBeforeBirthday(dateOfBirth: Date): number {
    const today: Date = new Date();
    const oneDayInMillisecond = 24 * 60 * 60 * 1000;

    const birthDayActualYear: Date = new Date(dateOfBirth);
    birthDayActualYear.setFullYear(today.getFullYear());

    const birthDayYearPlusOne: Date = new Date(dateOfBirth);
    birthDayYearPlusOne.setFullYear(today.getFullYear() + 1);

    return Math.ceil((birthDayActualYear.getTime() - today.getTime() >= 0) ?
      (birthDayActualYear.getTime() - today.getTime())/oneDayInMillisecond :
      (birthDayYearPlusOne.getTime() - today.getTime())/ oneDayInMillisecond);
  }

  daysInYear(year: number) : number {
    return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
  }

}
