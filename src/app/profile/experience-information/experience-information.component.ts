import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NumberDirective } from '@app/shared/numbers-only.directive';
import { ProfileService } from '@app/shared/profileService/profile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-experience-information',
  standalone: true,
  imports: [CommonModule,
            FontAwesomeModule,
            ReactiveFormsModule,
            FormsModule,
            NumberDirective],
  templateUrl: './experience-information.component.html',
  styleUrl: './experience-information.component.scss'
})
export class ExperienceInformationComponent implements OnChanges{

  @Input() experienceInfo?:any = []

  @Output() onExperienceInformationChange = new EventEmitter()

  formData!: FormGroup;

  faTimesCircle = faTimesCircle

  valueInputConpanyName = ""
  valueInputYearStart = ""
  valueInputYearEnd = ""
  valueInputpositionName = ""

  value: string = '';
  counter: number = 0;

  constructor(
    public fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.formData = this.fb.group({
      experience: this.fb.array([]),
    })
  }

  onChange(event:any) {
    this.counter = this.counter + 1; 
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['experienceInfo']){
      this.experienceInfo = changes['experienceInfo'].currentValue
      this.patchExperience(this.experienceInfo)
    }
  }

  get experiences() {
    return this.formData.get('experience') as FormArray;
  }

  async ngOnInit() {
    this.formData.valueChanges.subscribe(val=>{
      this.onExperienceInformationChange.emit(val)
    })
  }

  patchExperience(data:any){
    data?.forEach( (e:any) => {
      let experienceData = this.fb.group(
        {
          conpanyName: "",
          yearStart: "",
          yearEnd: "",
          positionName: ""
        }
      )
      experienceData.patchValue(e)
      this.experiences.push(experienceData)
    });
  }

  clearInput(){
    this.valueInputConpanyName = ""
    this.valueInputYearStart = ""
    this.valueInputYearEnd = ""
    this.valueInputpositionName = ""
  }

  addExperience() {
    const data = this.fb.group(
      {
        conpanyName: this.valueInputConpanyName,
        yearStart: this.valueInputYearStart,
        yearEnd: this.valueInputYearEnd,
        positionName: this.valueInputpositionName
      }
    )
    this.experiences.push(data);
    this.clearInput()
  }

  clickDeleteExperience(index: number) {
    this.experiences.removeAt(index)
  }


}
