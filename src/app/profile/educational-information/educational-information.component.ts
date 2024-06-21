import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NumberDirective } from '@app/shared/numbers-only.directive';
import { ProfileService } from '@app/shared/profileService/profile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-educational-information',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,ReactiveFormsModule,FormsModule,NumberDirective],
  templateUrl: './educational-information.component.html',
  styleUrl: './educational-information.component.scss'
})
export class EducationalInformationComponent implements OnChanges {

  @Input() educationalInfo?:any = []

  @Output() onEducationalInformationChange = new EventEmitter()

  formData!: FormGroup;

  valueInputUnivercity = ""
  valueInputYear = ""
  
  faTimesCircle = faTimesCircle

  value: string = '';
  counter: number = 0;


  constructor(
    public fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.formData = this.fb.group({
      education: this.fb.array([]),
    })
  }


  onChange(event:any) {
    this.counter = this.counter + 1; 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['educationalInfo']){
      this.educationalInfo = changes['educationalInfo'].currentValue
      this.patchEducation(this.educationalInfo)
    }
  }

  get educations() {
    return this.formData.get('education') as FormArray;
  }

  async ngOnInit() {
    this.formData.valueChanges.subscribe(val=>{
      this.onEducationalInformationChange.emit(val)
    })
  }



  patchEducation(data:any){
    data?.forEach( (e:any) => {
      const enducation = this.fb.group(
        {
          univercityName: "",
          year: ""
        }
      )
      enducation.patchValue(e)
      this.educations.push(enducation)
    });
  }


  clearInput(){
     this.valueInputUnivercity = ""
     this.valueInputYear = ""
  }

  sortEducation(){
   return this.educations?.value?.sort((a:any, b:any) => b.year - a.year)
  }



  addEducation() {
      const data = this.fb.group(
        {
          univercityName: this.valueInputUnivercity,
          year: this.valueInputYear
        }
      )
      this.educations.push(data);
      this.clearInput()

  }


  clickDeleteEducation(index: number) {
    this.educations.removeAt(index)
  }

  

}
