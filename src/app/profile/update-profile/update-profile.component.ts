import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '@app/shared/profileService/profile.service';
import { ExperienceInformationComponent } from '../experience-information/experience-information.component';
import { EducationalInformationComponent } from '../educational-information/educational-information.component';
import { UserInformationComponent } from '../user-information/user-information.component';
import { SkillInformationComponent } from '../skill-information/skill-information.component';
import { InterestsInformationComponent } from '../interests-information/interests-information.component';
import { ContactInformationComponent } from '../contact-information/contact-information.component';
import { GuildInformationComponent } from '../guild-information/guild-information.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [GuildInformationComponent,
    ContactInformationComponent,
    InterestsInformationComponent,
    SkillInformationComponent,
    UserInformationComponent,
    EducationalInformationComponent,
    ExperienceInformationComponent,
    CommonModule
    
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {



  profileInformation: any = {}
  updateProfileInformation: any ={}
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  async ngOnInit() {
    const User = localStorage.getItem("user")
    if(User){
      this.profileService.getByUsername(User).subscribe(response => {
        const data  = response.map((item: any) => ({
          ...item,
          startDate: item?.startDate?.split("T")[0]
        }));
        this.profileInformation = data[0]
        this.updateProfileInformation = data[0]
      });
      
    }else{
      alert("No username information")
    }
  }



  onContactInformationChange(data:any){
    this.updateProfileInformation = {
      ...this.updateProfileInformation,
      ...data
    }
  }
  onUserInformationChange(data:any){
    this.updateProfileInformation = {
      ...this.updateProfileInformation,
      ...data
    }
  }

  onEducationalInformationChange(data:any){
    this.updateProfileInformation = {
      ...this.updateProfileInformation,
      ...data
    }
  }

  onExperienceInformationChange(data:any){
    this.updateProfileInformation = {
      ...this.updateProfileInformation,
      ...data
    }
  }

  onSkillInformationChange(data:any){
    this.updateProfileInformation = {
      ...this.updateProfileInformation,
      ...data
    }
  }

  onInterestsInformationChange(data:any){
    this.updateProfileInformation = {
      ...this.updateProfileInformation,
      ...data
    }
  }

  onGuildInformationChange(data:any){
    this.updateProfileInformation = {
      ...this.updateProfileInformation,
      ...data
    }
  }

  updateProfile(){
    this.profileService.updataProfile(this.updateProfileInformation._id,this.updateProfileInformation).subscribe({
      next:((res) => {
        alert('Update Profile success');
        // this.router.navigate(['/profile/e']);
      }),
      error(e){
        alert(e.error.message)
      }
    })
  }

  loginOutProfile(){
      this.router.navigate(['/login']);
      localStorage.clear()
  }

}
