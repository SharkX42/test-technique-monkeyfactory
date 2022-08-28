import {InfoUserComponent} from "./info-user.component";
import {TestBed} from "@angular/core/testing";
import {UserInfoService} from "../services/user-info.service";

describe('InfoUserComponent', () => {

  let infoUser: InfoUserComponent;

  class MockUserInfo {
    userInfo = {
      id: 1,
      firstName: 'Prénom Tests',
      lastName: 'Nom Tests',
      dateOfBirth: new Date(1999, 12, 28)
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InfoUserComponent,
        {
          provide: UserInfoService, useClass: MockUserInfo
        }
      ]
    }).compileComponents();

    infoUser = TestBed.inject(InfoUserComponent);
  });

  it('Doit renvoyer le nombre de jours dans l annee 2022', () => {
      expect(infoUser.getDaysInYear(2022)).toBe(365);
  });

  it('Doit renvoyer le nombre de jours dans l annee 2024', () => {
    expect(infoUser.getDaysInYear(2024)).toBe(366);
  });

})
