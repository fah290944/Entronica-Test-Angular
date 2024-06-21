import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '@app/shared/profileService/profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  usernameFormInput: string = '';
  errorMessage = 'Invalid username';

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {

  }
  onSubmittest(): void {
    this.profileService.getByUsername(this.usernameFormInput).subscribe(
      {
        next: (res) => {
          if (res.length) {  
            localStorage.setItem("user", res[0].userName)
            this.router.navigate(['/profile/edit']);
          } else {
            this.errorMessage = 'Username is incorrect ';
          }
        },
        error: (e) => {
          this.errorMessage = 'An error occurred. Please try again.';
          console.error('Login failed', e);
        }
      }
    )

  }

  onLinkCreateProfile(): void {
    this.router.navigate(['/profile/create']);
  }


}
