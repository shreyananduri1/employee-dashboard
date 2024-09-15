import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit{
  empForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    jobTitle: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),
    email: new FormControl(''),
    experience: new FormControl(''),
    package: new FormControl('')
  })

  constructor(private empService: EmployeesService, private formBuilder:FormBuilder, private dialogRef: MatDialogRef<EmpAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {}

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.data){
      this.empService.updateEmp(this.data.id, this.empForm.value).subscribe(() => {
      this.dialogRef.close(true)
    })
    }
    else {
      this.empService.addEmp(this.empForm.value).subscribe(() => {
        this.dialogRef.close(true)
      })
    }
  }
}
