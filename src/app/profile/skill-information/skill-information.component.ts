import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NumberDirective } from '@app/shared/numbers-skill-only.directive';
import { ProfileService } from '@app/shared/profileService/profile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-skill-information',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,ReactiveFormsModule,FormsModule,NumberDirective],
  templateUrl: './skill-information.component.html',
  styleUrl: './skill-information.component.scss'
})
export class SkillInformationComponent implements OnChanges{
  
  @Input() skillInfo?:any = []

  @Output() onSkillInformationChange = new EventEmitter()

  formData!: FormGroup;

   valueInputName = ""
   
   valueInputPoint = ""

   faTimesCircle = faTimesCircle

   value: string = '';
   counter: number = 0;
 

  constructor(
    public fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.formData = this.fb.group({
      skill: this.fb.array([])

    })
  }

  onChange(event:any) {
    this.counter = this.counter + 1; 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['skillInfo']){
      this.skillInfo = changes['skillInfo'].currentValue
      this.patchSkill(this.skillInfo)
    }
  }

  get skills() {
    return this.formData.get('skill') as FormArray;
  }

  async ngOnInit() {
    this.formData.valueChanges.subscribe(val=>{
      this.onSkillInformationChange.emit(val)
    })
  }

  patchSkill(data:any){
    const skill = this.fb.group(
      {
        name: "",
        pointSkill: ""
      }
    )
    data?.forEach( (e:any) => {
      skill.patchValue(e)
      this.skills.push(skill)
    });
  }

  validatSkill(){
    return this.skills.value.some( (item:any) => item.name == this.valueInputName)
  }

  clearInput(){
     this.valueInputName = ""
     this.valueInputPoint = ""
  }

  addSkill() {
    if(!this.validatSkill()){

      const data = this.fb.group(
        {
          name: this.valueInputName,
          pointSkill:  this.valueInputPoint
        }
      )
      this.skills.push(data);
      this.clearInput()
    }else{
      alert("duplicate Skill")
    }

  }

  clickDeleteSkill(index: number) {
    this.skills.removeAt(index)
  }


}
