import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@app/shared/profileService/profile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-guild-information',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,ReactiveFormsModule, FormsModule],
  templateUrl: './guild-information.component.html',
  styleUrl: './guild-information.component.scss'
})
export class GuildInformationComponent implements OnChanges {

  @Input() guildInfo?:any = []

  @Output() onGuildInformationChange = new EventEmitter()

  faTimesCircle = faTimesCircle
  formData!: FormGroup;

  valueInput = ""

  constructor(
    public fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.formData = this.fb.group({
      guild: this.fb.array([])
    })

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['guildInfo']){
      this.guildInfo = changes['guildInfo'].currentValue
      if(this.guildInfo?.length){
        this.patchGuild(this.guildInfo)
      }
    }
  }

  get guild() {
    return this.formData.get('guild') as FormArray;
  }


  ngOnInit(): void {
    this.formData.valueChanges.subscribe(val=>{
      this.onGuildInformationChange.emit(val)
    })
  }



  patchGuild(data:any){
    if(data?.length){
      data?.forEach( (e:any) => {
        this.guild.push(this.fb.control(e))
      });
    }
  }

  validatGuild(){
    return this.guild.value.some( (item:any) => item == this.valueInput)
  }

  clearInput(){
     this.valueInput = ""
  }

  addGuild() {
    if(!this.validatGuild()){
      const data = this.fb.control(this.valueInput)
      this.guild.push(data);
      this.clearInput()
    }else{
      alert("duplicate guild")
    }
  }


  clickDeleteGuild(index: number) {
    this.guild.removeAt(index);
  }

}
