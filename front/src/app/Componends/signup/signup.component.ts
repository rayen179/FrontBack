import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IEmployee } from '../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { error } from 'console';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css',
    '/src/assets/css/style.css', ],
})
export class signupComponent {
  error=false;
  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toaster.success('Record added sucessfully.');
  }



  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster=inject(ToastrService);

  //employer form
  employeeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],

  });
  employeeId!: number;
  isEdit = false;
  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEdit = true;
      this.httpService.getEmployee(this.employeeId).subscribe((result) => {
        console.log(result);
        this.employeeForm.patchValue(result);
        this.employeeForm.controls.email.disable();

      });
    }
  }
  onSubmit() {
    console.log(this.employeeForm.value);
    const employee: IEmployee = {
      id: 0,
      name: this.employeeForm.value.name!,
      email: this.employeeForm.value.email!,
      password: this.employeeForm.value.password!,
    };

    if (this.employeeForm.valid) {
      this.httpService.createEmployee(employee).subscribe(
        () => {
          console.log('success');
          this.toaster.success('Record add sucessfully');
          this.router.navigateByUrl('/feedback');
          // Uncomment the line below if you want to show a success message

        },
        (error)=>{
            console.log(error)
            this.error=true;
        }


      );
    }
  }



  }

