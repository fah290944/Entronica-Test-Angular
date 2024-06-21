import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumberDirective } from '@app/shared/numbers-tel-only.directive';
import { ProfileService } from '@app/shared/profileService/profile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 


@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,ReactiveFormsModule,NumberDirective],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss'
})
export class UserInformationComponent implements OnChanges {

  @Input() userlInfo?:any = []

  @Output() onUserInformationChange = new EventEmitter()

  positionLists:any = []

  formData!: FormGroup;

  fileup: any = null
  outPutImage: any = ""
  value: string = '';
  counter: number = 0;

  constructor(
    public fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.formData = this.fb.group({
      userName : ['', Validators.required],
      nickName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      nationality: ['', Validators.required],
      telephon: ['', Validators.required],
      startDate: ['', Validators.required],
      image: this.fb.group({
        name: [''],
        contentType: ['']
      }),
      imageCover: this.fb.group({
        name: [''],
        contentType: ['']
      })
    })

  }


  onChange(event:any) {
    this.counter = this.counter + 1; 
  }

  checkRequired (name: any){
    return this.formData.get(name)?.touched && this.formData.get(name)?.getError('required')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['userlInfo']){
      this.userlInfo = changes['userlInfo'].currentValue
      this.patchUser(this.userlInfo)
    }
  }

  async ngOnInit() {
    this.positionLists = await this.getPositionList()
    this.formData.valueChanges.subscribe(val=>{
      this.onUserInformationChange.emit(val)
    })

    
  }

  patchUser(data:any){
    this.formData.patchValue(data)
}

  getPositionList(): Promise<any> {
    return new Promise( (resolve,reject) => {
      try {
        this.profileService.getPosition().subscribe({
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


  async onFileSelect(event: any){
    if(event?.target?.files?.length){
      let file = event?.target?.files[0] as File
      this.outPutImage = await this.resizeAndSend(file)
      if (file) {
          this.formData.patchValue({
            image: {
              name: this.outPutImage,
              contentType: file.type
            }
          });
      }
    }
  }

  async onFileSelectCover(event: any){
    if(event?.target?.files?.length){
      let file = event?.target?.files[0] as File
      this.outPutImage = await this.resizeAndSend(file)
      if (file) {
          this.formData.patchValue({
            imageCover: {
              name: this.outPutImage,
              contentType: file.type
            }
          });
      }
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  resizeAndSend(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          if (ctx) {
            // New dimensions
            const maxWidth = 300; // example width
            const maxHeight = 300; // example height
            let newWidth = img.width;
            let newHeight = img.height;
  
            if (img.width > maxWidth) {
              newWidth = maxWidth;
              newHeight = (img.height * maxWidth) / img.width;
            }
            if (newHeight > maxHeight) {
              newWidth = (img.width * maxHeight) / img.height;
              newHeight = maxHeight;
            }
  
            canvas.width = newWidth;
            canvas.height = newHeight;
  
            // Draw image on canvas
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
            // Convert canvas content to base64
            const resizedBase64 = canvas.toDataURL('image/jpeg');
  
            // Now you can send 'resizedBase64' to your server
            resolve(resizedBase64);
          } else {
            reject(new Error("Could not get 2d context from canvas."));
          }
        };
      };
      reader.readAsDataURL(file);
    });
  }



}


