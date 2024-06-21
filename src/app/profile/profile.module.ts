import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import { ProfileService } from '../shared/profileService/profile.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule { }
