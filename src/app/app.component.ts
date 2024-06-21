import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ProfileService } from './shared/profileService/profile.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule,HttpClientModule, FormsModule],
  providers: [ProfileService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test';

  constructor(
    private router: Router
  ){}
  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if(!user){
      this.router.navigate(['/login']);
    }
  }

}
