import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@app/shared/profileService/profile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-interests-information',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule, ReactiveFormsModule,FormsModule],
  templateUrl: './interests-information.component.html',
  styleUrl: './interests-information.component.scss'
})
export class InterestsInformationComponent implements OnChanges{

  @Input() interestsInfo?:any = []

  @Output() onInterestsInformationChange = new EventEmitter()

  formData!: FormGroup;
  faTimesCircle = faTimesCircle

  valueInput = ""

  constructor(
    public fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.formData = this.fb.group({
      interests:this.fb.array([])
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['interestsInfo']){
      this.interestsInfo = changes['interestsInfo'].currentValue
      if(this.interestsInfo?.length){
        this.patchInterests(this.interestsInfo)
      }
    }
    
  }

  get interests() {
    return this.formData.get('interests') as FormArray;
  }


  async ngOnInit() {
    this.formData.valueChanges.subscribe(val=>{
      this.onInterestsInformationChange.emit(val)
    })
  }

  patchInterests(data:any){
    if(data?.length){
      data?.forEach( (e:any) => {
        this.interests.push(this.fb.control(e))
      });
    }
  }

  validatGuild(){
    return this.interests.value.some( (item:any) => item == this.valueInput)
  }

  clearInput(){
     this.valueInput = ""
  }

  addInterests() {
    if(!this.validatGuild()){
      const data = this.fb.control(this.valueInput)
      this.interests.push(data);
      this.clearInput()
    }else{
      alert("duplicate Interests")
    }
  }

  
  clickDeleteInterests(index: number) {
    this.interests.removeAt(index)
  }

}
