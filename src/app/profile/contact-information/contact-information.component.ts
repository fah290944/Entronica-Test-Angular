import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@app/shared/profileService/profile.service';
// const _ = require("lodash");

@Component({
  selector: 'app-contact-information',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact-information.component.html',
  styleUrl: './contact-information.component.scss'
})
export class ContactInformationComponent implements OnChanges {

  @Input() contactInfo?:any = []

  @Output() onContactInformationChange = new EventEmitter()

  formData!: FormGroup;
  subDistrictsLists:any = []
  districtsLists:any = []
  provincesLists:any = []
  postalCodesLists:any = []

  constructor(
    public fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.formData = this.fb.group({
      address: ['', Validators.required],
      subDistrict: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      province_code: ['', Validators.required],
      facebook: [''],
      lineId: [''],
      instagram: ['']
    })
  }

  checkRequired (name: any){
    return this.formData.get(name)?.touched && this.formData.get(name)?.getError('required')
  }

  displayZipCode(){
    const data = new Set(this.postalCodesLists?.map((name:any) => (name.zip_code))?.sort())
    return data || []
  }

  displayDistrict(){
    const data = new Set(this.districtsLists?.map((name:any) => (name.name_en))?.sort())
    return data || []
  }

  displaySubDistricts(){
    const data = new Set(this.subDistrictsLists?.map((name:any) => (name.name_en))?.sort())
    return data || []
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['contactInfo']){
      this.contactInfo = changes['contactInfo'].currentValue
      this.patchContact(this.contactInfo)
    }
  }

  async ngOnInit() {
    this.subDistrictsLists = await this.getsSubDistrictLists()
    this.districtsLists = await this.getDistrictLists()
    this.provincesLists = await this.getsProvinceLists()
    this.postalCodesLists = await this.getsPostalCodeLists()
    this.formData.valueChanges.subscribe(val=>{
      this.onContactInformationChange.emit(val)
    })
  }

  patchContact(data:any){
      this.formData.patchValue(data)
  }


  getsSubDistrictLists(): Promise<any> {
    return new Promise( (resolve,reject) => {
      try {
        this.profileService.getSubDistricts().subscribe({
          next(response){
            resolve(response)
          },
          error(){
            resolve([])
          }
        })
      } catch (error) {
        reject(error)
      }

    }) 
    
  }

  getDistrictLists(): Promise<any> {
    return new Promise( (resolve,reject) => {
      try {
        this.profileService.getDistricts().subscribe({
          next(response){
            resolve(response)
          },
          error(){
            resolve([])
          }
        })
      } catch (error) {
        reject(error)
      }

    }) 
    
  }

  getsProvinceLists(): Promise<any> {
    return new Promise( (resolve,reject) => {
      try {
        this.profileService.getProvinces().subscribe({
          next(response){
            resolve(response)
          },
          error(){
            resolve([])
          }
        })
      } catch (error) {
        reject(error)
      }

    }) 
    
  }

  getsPostalCodeLists(): Promise<any> {
    return new Promise( (resolve,reject) => {
      try {
        this.profileService.getPostalCode().subscribe({
          next(response){
            resolve(response)
          },
          error(){
            resolve([])
          }
        })
      } catch (error) {
        reject(error)
      }

    }) 
    
  }






  

}
