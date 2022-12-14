import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserProfileService} from 'src/app/services/api/user-profile.service';
import {UserRegistrationService} from 'src/app/services/api/user-registration.service';

@Component({
  selector: 'app-about-work',
  templateUrl: './about-work.component.html',
  styleUrls: ['./about-work.component.scss']
})
export class AboutWorkComponent implements OnInit {


  public entryForm: FormGroup;
  public  form: FormGroup;
  aboutdata;
  id: number;
  checknumberId: number;
  data1: boolean;
  name:string;
  email: string;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userRegistration: UserRegistrationService,
    private _fb: FormBuilder,
    private userprofile: UserProfileService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.checknumberId = this.route.snapshot.params['checknumberId'];
    this.name = this.userRegistration.getStoredName();
    console.log(this.id, "id in com2");
    console.log(this.checknumberId);
    this.userRegistration.removeStoredName();

    // this.data1 = this.route.snapshot.data['data1'];
    // if (this.id >= 0) {
    //   this.onCheck();

    // }
    // else {
    //   this.router.navigate(['../about-work']);
    // }


    this.onCheck();
    this.email = this.userRegistration.getStoredEmail();
    this.entryForm = this._fb.group({
      name: [null],
      password: [null],
      email: [null],
      mobile: [null],
    });
    //form validation
    this.form = this._fb.group(
      {
        name: ['', Validators.required],
        password: ['',[ Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        email: ['', [Validators.required, Validators.email]],
        confirmPassword: ['', Validators.required],
        mobile: ['', Validators.required,Validators.minLength(10)]
      }, );
  }

  onContinue() {
    console.log(this.entryForm.value.mobile);

    this.userprofile.updateUser(this.id, this.entryForm.value).subscribe((data => {
      console.log(data.userId, "User id");
      console.log("Roles", data.role);
      console.log(data.checknumberId, "checknumber");
      this.aboutdata = data;
      if (data.role == "USER") {
        this.router.navigate(["../login/"]);
      } else {
        this.router.navigate(["../comp4/" + data.userId]);
      }

    }))
  }


  onCheck() {

    this.userprofile.getUser(this.id, this.checknumberId).subscribe((data => {
      // console.log(data.userId, "User id");
      console.log("ganesh bute", data.email);
      console.log(data);
      this.data1 = data;
      this.email = data.email;
      this.name=data.fullName;
      (<FormControl>this.entryForm.controls['email']).setValue(data.email);
      (<FormControl>this.entryForm.controls['name']).setValue(data.fullName);
      console.log(this.name)

    }))


  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  onCountryChange(event) {
    console.log(event.dialCode);
    console.log(event.name);
    console.log(event.iso2);
  }

  back() {
    this.router.navigate(["../../all"], {relativeTo: this.route});
  }

}
