/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * 
 * Alicia responsible for backend
 * Kai Yan responsible for frontend
 */

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  fb = inject(FormBuilder);
  loginForm !: FormGroup;

  /**
   * @function ngOnInit Initializes the login form when the component is loaded
   * @description The form includes email and password which require the user to fill in
   */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userEmail: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    },
  );
  }

  /** 
   * @function login function passes login object to the service to be sent to the server via a post request.
   * @summary A login object is created based on the form inputs and is submitted to be stored in the MongoDB database.
   * @description onSubmit is triggered when the html form is submitted and the login object is created and sent to the DatabaseService to add it to the MongoDB database.
  */
  login() {
    console.log(this.loginForm.value);
    this.dbService.loginService(this.loginForm.value).subscribe({
      // uses the router service to redirect the client to another component. 
      // In other words, replace the current component with another one.
      next: (res) => {
        alert("Login Success");
        console.log("res.toString()", res.toString());
        localStorage.setItem("user_id", res.toString());
        this.loginForm.reset();
        this.router.navigate(["/home"])},
      error: (error) => { 
        console.log('Error:', error);
        alert("Login Failed! Incorrect password or Invalid email! Try Again!");
        this.router.navigate(["/login"])}     
      })      
  }
  
}
