/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * 
 * Alicia responsible for backend
 * Kai Yan responsible for frontend
 * 
 * This component handles the user registration process, including form validation and submission to the backend
 */

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { comfirmPasswordValidator } from '../../../app/validators/comfirm.password.validator'
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  fb = inject(FormBuilder);
  registerForm !: FormGroup;

  /**
   * @function ngOnInit
   * @description Initializes the registration form when the component is loaded. The form includes fields listed below from line 43 to 49
   * @summary This function applies a custom password confirmation validator to ensure that the password and confirm password fields match
   */
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      username: ['', Validators.required],
      userEmail: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      comfirmPassword: ['', Validators.required],
      role: ['',Validators.required],
    },
    {
      validator: comfirmPasswordValidator('password', 'comfirmPassword')
    }
  );
  }

  /** 
   * @function register function passes register object to the service to be sent to the server via a post request.
   * @summary A register object is created based on the form inputs and is submitted to be stored in the MongoDB database.
   * @description onSubmit is triggered when the html form is submitted and the register object is created and sent to the DatabaseService to add it to the MongoDB database.
  */
  register(){
    console.log(this.registerForm.value);
    this.dbService.registerService(this.registerForm.value).subscribe({
      // uses the router service to redirect the client to another component. 
      // In other words, replace the current component with another one.
      next: (result) => {
        alert("User Created!")
        this.registerForm.reset();
        this.router.navigate(["/login"])},
      error: (error) => { 
        console.log('Error:', error);
        alert("Register Failed! Try again!")
        this.router.navigate(["/register"])}     
      })  
  }


}
