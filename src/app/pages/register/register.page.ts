import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userRegister: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder, private router: Router,
    private userService: UserService) {
    this.userRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.loading = false;
  }

  onRegister() {
    this.loading = true;
    this.userService.registerUser(this.userRegister.value).subscribe(
      response => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }

}
