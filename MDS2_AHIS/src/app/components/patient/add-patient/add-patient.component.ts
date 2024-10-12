/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a Add patient component for patient feature
*/ 

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';

/**
 * @interface Patient
 * @description Define the Patient interface, which describes the structure of a patient object
 * Optional fields such as identificationNum are marked with a '?'.
 */
interface Patient {
  firstName: string;
  lastName: string;
  birthDate: any;
  gender: string;
  nationality: string;
  maritalStatus: string;
  identificationNum?: number;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  tel: string;
  emgcyFName: string;
  emgcyLName: string;
  emgcyRelationship: string;
  emgcyTel: string;
}

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})

export class AddPatientComponent {
  
  /**
   * @constructor The constructor of this component has two dependencies: the DatabaseService and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   */
  constructor(private dbService: DatabaseService, private router: Router, private http: HttpClient){
    this.socket = io();
  }
  // fb = inject(FormBuilder);
  // patientForm : FormGroup = this.fb.group({
  //   firstName: ['', Validators.required],
  //   lastName: ['', Validators.required],
  //   birthDate: ['', Validators.required],
  //   gender: ['default', Validators.required],
  //   nationality: ['', Validators.required],
  //   maritalStatus: ['default', Validators.required],
  //   identificationNum: ['', Validators.required],
  //   streetAddress: ['', Validators.required],
  //   city: ['', Validators.required],
  //   state: ['', Validators.required],
  //   postalCode: ['', Validators.required],
  //   email: ['', Validators.compose([Validators.required, Validators.email])],
  //   tel: ['', Validators.required],
  //   emgcyFName: ['', Validators.required],
  //   emgcyLName: ['',Validators.required],
  //   emgcyRelationship: ['', Validators.required],
  //   emgcyTel: ['',Validators.required]
  // });

  /**
   * @function ngOnInit
   * @description Initializes the registration form when the component is loaded. The form includes fields listed below from line 43 to 49
   * @summary This function applies a custom password confirmation validator to ensure that the password and confirm password fields match
   */
  ngOnInit() {
    this.listen2event();
  }
  
  // Generate new patient object
  patient: Patient = {
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    nationality: "",
    maritalStatus: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
    tel: "",
    emgcyFName: "",
    emgcyLName: "",
    emgcyRelationship: "",
    emgcyTel: "",
  };

  selectedFile = null;
  uploadStatus: boolean = true;
  isConverted: boolean = false;
  socket:any;
  extracted: boolean = false;
  isDisabled: boolean = true;
  uploading: boolean = false;
  extracting: boolean = false;
  //processedObject: JSON | null = null;


  /** 
   * @function addPatient function passes patient object to the service to be sent to the server via a post request.
   * @summary A patient object is created based on the form inputs and is submitted to be stored in the MongoDB database.
   * @description onSubmit is triggered when the html form is submitted and the patient object is created and sent to the DatabaseService to add it to the MongoDB database.
  */
  addPatient() {
    console.log("In add function:", this.patient)
    this.dbService.insertPatient(this.patient).subscribe({
      // uses the router service to redirect the client to another component. 
      // In other words, replace the current component with another one.
      next: (result) => {
        this.router.navigate(["/list-patients"])},
      error: (error) => { 
        console.log('Error:', error);
        this.router.navigate(["/invalid-data"])}     
     })      
  }

  onFileSelected(event: any){
    console.log(event);
    this.selectedFile = event.target.files[0];
    console.log("selectedFile", this.selectedFile);
    
  }


  listen2event(){
    this.socket.on("cropped", (data:string)=> {
      this.isConverted = true;
      this.uploadStatus = false;
      this.uploading = false;
      //this.processedObject = data;
      console.log(data)
    });

    this.socket.on("processed", (data:any)=> {
      //this.processedObject = data;
      console.log(data)

      this.http.get<any>('http://localhost:8080/patientData').subscribe({
        next: (result) => {
          console.log('result:', result);
          this.patient.firstName = result.firstName;
          this.patient.lastName = result.lastName;
          // change date format!!
          // Split the date string into day, month, and year
          const [day, month, year] = result.birthDate.split("-");
          // Rearrange to the yyyy-MM-dd format
          let formatedDate = `${year}-${month}-${day}`;
          let date = new Date(formatedDate);
          this.patient.birthDate = formatedDate;
          this.patient.gender = result.gender;
          this.patient.nationality = result.nationality;
          this.patient.identificationNum = result.ICPassport;
          this.patient.maritalStatus = result.maritalStatus;
          this.patient.streetAddress = result.streetAddress;
          this.patient.city = result.city;
          this.patient.state = result.state;
          this.patient.postalCode = result.postalCode;
          this.patient.email = result.email;
          this.patient.tel = result.tel;
          this.patient.emgcyFName = result.emgcyFname;
          this.patient.emgcyLName = result.emgcyLname;
          this.patient.emgcyRelationship = result.emgcyRelationship;
          this.patient.emgcyTel = result.emgcyTel;

          // this.patientForm.value.firstName = result.firstName;
          // this.patientForm.value.lastName = result.lastName;
          // this.patientForm.value.birthDate = "";
          // this.patientForm.value.gender = result.gender;
          // this.patientForm.value.nationality = result.nationality;
          // this.patientForm.value.identificationNum = result.ICPassport;
          // this.patientForm.value.maritalStatus = result.maritalStatus;
          // this.patientForm.value.streetAddress = result.streetAddress;
          // this.patientForm.value.city = result.city;
          // this.patientForm.value.state = result.state;
          // this.patientForm.value.postalCode = result.postalCode;
          // this.patientForm.value.email = result.email;
          // this.patientForm.value.tel = result.tel;
          // this.patientForm.value.emgcyFName = result.emgcyFname;
          // this.patientForm.value.emgcyLName = result.emgcyLname;
          // this.patientForm.value.emgcyRelationship = result.emgcyRelationship;
          // this.patientForm.value.emgcyTel = result.emgcyTel;

          this.extracted = true;
          this.isDisabled = false;
          this.extracting = false;
          console.log("Assigning stuff patient", this.patient)
          // console.log("Assigning stuff", this.patientForm.value)
        },
        error: (error) => { 
          console.log('Error:', error);
        }
      })
    });
  }

  extract(){
    console.log("Extract function called")
    this.extracting = true;
    this.isConverted = false
    this.socket.emit("htr");

  }
  
  onUpload(){
    // Check if a file is selected
    if(this.selectedFile){
      this.uploading = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      console.log(formData);
      this.http.post<any>('http://localhost:8080/file', formData).subscribe({
        next: (result) => {
          console.log('result:', result);
          this.socket.emit("cropping");
        },
        error: (error) => { 
          console.log('Error:', error);
        }
      })
    }else{
      console.error("No file selected");
    }
  }

}
