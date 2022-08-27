import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInfoService} from "../services/user-info.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers:[]
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  today: Date = new Date();

  constructor(private formBuilder: FormBuilder, private userInfoService: UserInfoService, private router: Router) { }

  ngOnInit(): void {
    this.today.setDate(this.today.getDate() - 1);
    this.userForm = this.formBuilder.group({
      //Expressions régulières qui n'acceptent que les lettres, accents et les tirets
      firstName: [null, [Validators.required, Validators.pattern('[A-Za-zÀ-ÖØ-öø-ÿ-]*')]],
      lastName: [null, [Validators.required, Validators.pattern('[A-Za-zÀ-ÖØ-öø-ÿ-]*')]],
      dateOfBirth: [null, Validators.required]
    },
    {
      updateOn: "blur"
      }
    );
  }

  onSubmitForm(): void {
    console.log(this.userForm.value);
    this.userInfoService.setUserInfo(this.userForm.value);
    this.router.navigateByUrl('/informationsUser');
  }
}
