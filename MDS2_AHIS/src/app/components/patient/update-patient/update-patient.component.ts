/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a update patient component for patient feature
*/ 

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

/**
 * @interface Patient
 * @description Define the Patient interface, which describes the structure of a patient object
 * Optional fields such as identificationNum are marked with a '?'.
 */
interface Patient {
  patientId: string | null;
  maritalStatus: string;
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
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})

export class UpdatePatientComponent {
  // Database
  patientDB: any[] = [];
  aPatient: any = {};
  
  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  // Generate new patient object
  patient: Patient = {
    patientId: "",
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

  /**
   * @function ngOnInit runs when the component is initiated
   * @description calls various methods to fetch patient records
   */
  ngOnInit() {
    this.getUpdateIdPatient();
    this.getUpdatePatientRecord();
  }

  /**
   * @function getUpdateIdPatient Retrieves the patientId from the URL route parameters and assigns it to the patient object
   * @description Retrieves the patientId from the URL route parameters and assigns it to the patient object
   */
  getUpdateIdPatient(){
    this.route.paramMap.subscribe(params => {
      this.patient.patientId = params.get('patientId');
      console.log("Get Patient ID to update: ", this.patient.patientId );
    })
  }

  /**
   * @function getUpdatePatientRecord Fetches all patients from the database and finds the patient that matches the patientId
   * @description Fetches all patients from the database and finds the patient that matches the patientId.
   * @summary It assigns the retrieved patient data to the form fields for updating
   */
  getUpdatePatientRecord(){
    this.dbService.getPatients().subscribe((patientDB: any) => {
      console.log("Patient ID to update: ", this.patient.patientId );
      for (let patient of patientDB){
        if (patient.patientId === this.patient.patientId) {
          this.aPatient = patient;
          console.log("Update this patient",this.aPatient)
          // Updates the component’s patient fields with the corresponding values from this.aPatient to have it appear 
          //  automatically in the form.
          this.patient.maritalStatus = this.aPatient.maritalStatus;
          this.patient.streetAddress = this.aPatient.streetAddress;
          this.patient.city = this.aPatient.city;
          this.patient.state = this.aPatient.state;
          this.patient.postalCode = this.aPatient.postalCode;
          this.patient.email = this.aPatient.email;
          this.patient.tel = this.aPatient.tel;
          this.patient.emgcyFName = this.aPatient.emgcyFName;
          this.patient.emgcyLName = this.aPatient.emgcyLName;
          this.patient.emgcyRelationship = this.aPatient.emgcyRelationship;
          this.patient.emgcyTel = this.aPatient.emgcyTel;
          console.log("Assigning stuff", this.patient)
        }
      }
    });
  }
  
  /**
   * @function sendUpdatePatient
   * @description Sends the updated patient data to the DatabaseService for saving
   * If successful, navigates to the updated patient's detail page
   * If unsuccessful, redirects to the '/invalid-data' page
   */
  sendUpdatePatient(){
    console.log("Send patient object for update",this.patient)
    this.dbService.updatePatient(this.patient).subscribe({
      next: (result) => {this.router.navigate(["/view-patient",  this.patient.patientId])},
      error: (error) => { this.router.navigate(["/invalid-data"])}     
     })
  }

}
  