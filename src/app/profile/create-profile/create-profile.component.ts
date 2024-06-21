import { Component } from '@angular/core';
import { GuildInformationComponent } from '../guild-information/guild-information.component';
import { ContactInformationComponent } from '../contact-information/contact-information.component';
import { InterestsInformationComponent } from '../interests-information/interests-information.component';
import { SkillInformationComponent } from '../skill-information/skill-information.component';
import { UserInformationComponent } from '../user-information/user-information.component';
import { EducationalInformationComponent } from '../educational-information/educational-information.component';
import { ExperienceInformationComponent } from '../experience-information/experience-information.component';
import { ProfileService } from '@app/shared/profileService/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [GuildInformationComponent,
    ContactInformationComponent,
    InterestsInformationComponent,
    SkillInformationComponent,
    UserInformationComponent,
    EducationalInformationComponent,
    ExperienceInformationComponent
  ],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss'
})
export class CreateProfileComponent {

  profileInformation: any = {}

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  onContactInformationChange(data:any){
    this.profileInformation = {
      ...this.profileInformation,
      ...data
    }
  }
  onUserInformationChange(data:any){
    this.profileInformation = {
      ...this.profileInformation,
      ...data
    }
  }

  onEducationalInformationChange(data:any){
    this.profileInformation = {
      ...this.profileInformation,
      ...data
    }
  }

  onExperienceInformationChange(data:any){
    this.profileInformation = {
      ...this.profileInformation,
      ...data
    }
  }

  onSkillInformationChange(data:any){
    this.profileInformation = {
      ...this.profileInformation,
      ...data
    }
  }

  onInterestsInformationChange(data:any){
    this.profileInformation = {
      ...this.profileInformation,
      ...data
    }
  }

  onGuildInformationChange(data:any){
    this.profileInformation = {
      ...this.profileInformation,
      ...data
    }
  }

  createProfile(){
    this.profileService.createProfile(this.profileInformation).subscribe({
      next:((res) => {
        alert('Create Profile success');
        this.router.navigate(['/profile']);
      }),
      error(e){
        alert(e.error.message)
      }
    })
  }

  loginProfile(){
      this.router.navigate(['/login']);
  }


}
