import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit{
  empForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl(''),
    jobTitle: new FormControl(''),
    city: new FormControl(''),
    contact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    experience: new FormControl(''),
    package: new FormControl('')
  })

  jobs: string[] = [
    'Jr. Developer',
    'Sr. Developer',
    'Manager'
  ]

  constructor(private empService: EmployeesService, private formBuilder:FormBuilder, private dialogRef: MatDialogRef<EmpAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {}

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit(){
    if (this.empForm.invalid) {
      return;
      }
    if(this.data){
      this.empService.updateEmp(this.data._id, this.empForm.value).subscribe(() => {
      this.dialogRef.close(true)
    })
    }
    else {
      this.empService.addEmp(this.empForm.value).subscribe(() => {
        this.dialogRef.close(true)
      })
    }
  }

  onCancel() {
    this.dialogRef.close(true)
  }
}
