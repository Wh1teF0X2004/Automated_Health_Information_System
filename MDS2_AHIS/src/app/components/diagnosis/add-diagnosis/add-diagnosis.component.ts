/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a Add diagnosis component for diagnosis feature
*/ 

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

/**
 * @interface Diagnosis
 * @description Define the Diagnosis interface, which describes the structure of a Diagnosis object
 */
interface Diagnosis {
  physicianId: string;
  diagnosisDescription: string;
  diagnosisAdditional: string;
  patientId: string | null;
  consultationId: string | null;
}

@Component({
  selector: 'app-add-diagnosis',
  templateUrl: './add-diagnosis.component.html',
  styleUrls: ['./add-diagnosis.component.css']
})

export class AddDiagnosisComponent {
  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  // Generate new consultation object
  diagnosis: Diagnosis = {
    physicianId: "",
    patientId: "",
    diagnosisDescription: "",
    diagnosisAdditional: "",
    consultationId: ""
  };

  patientDB: any[] = [];
  aPatient: any = {};
  aConsultation: any = {};
  consultationDB: any[] = [];
  physicianDB: any[] = [];
  aPhysician: any = {};

  /**
   * @function ngOnInit fetches consultation, patient, and physician data, and retrieves records for the selected consultation.
   */
  ngOnInit() {
    this.getConsultationId();
    this.getConsultationRecord();
    this.getPatientRecord();
    this.getPhysicianRecord();
  }

  /**
   * @function getConsultationId function fetch the consultation ID from the route
   * @summary Fetch the consultation ID from the route for it to be access later
   * @description Fetch the consultation ID from the route for it to be access later
   */
  getConsultationId(){
    this.route.paramMap.subscribe(params => {
      this.diagnosis.consultationId = params.get('consultationId');
      console.log("Get consultationId to add diagnosis: ", this.diagnosis.consultationId );
    })
  }

  /**
   * @function getConsultationRecord function fetch the consultation records from the MongoDB database 
   * @summary Fetch the consultation records from the MongoDB database using the consultation ID and store it in a variable to be access later
   * @description Fetch the consultation records from the MongoDB database using the consultation ID and store it in a variable to be access later
   */
  getConsultationRecord(){
    this.dbService.getConsultations().subscribe((consultationDBDB: any) => {
      console.log("Get consultation Id record",this.diagnosis.consultationId)
      for (let consultation of consultationDBDB){
        if (consultation.consultationId === this.diagnosis.consultationId) {
          this.aConsultation = consultation;
          console.log("Consultation Record", this.aConsultation)
        }
      }
    });
  }

  /**
   * @function getPatientRecord function fetch the Patient records from the MongoDB database 
   * @summary Fetch the Patient records from the MongoDB database using the consultation object and store it in a variable to be access later
   * @description Fetch the Patient records from the MongoDB database using the consultation object and store it in a variable to be access later
   */
  getPatientRecord(){
    this.dbService.getPatients().subscribe((patientDB: any) => {
      this.diagnosis.patientId = this.aConsultation.patientId;
      console.log("Get Patient Id record",this.diagnosis.patientId)
      for (let patient of patientDB){
        if (patient.patientId === this.diagnosis.patientId) {
          this.aPatient = patient;
          console.log("Patient Record",this.aPatient)
        }
      }
    });
  }

  /**
   * @function getPhysicianRecord function fetch the Physician records from the MongoDB database 
   * @summary Fetch the Physician records from the MongoDB database using the consultation object and store it in a variable to be access later
   * @description Fetch the Physician records from the MongoDB database using the consultation object and store it in a variable to be access later
   */
  getPhysicianRecord(){
    // Fetch physicians from database and format their names for the dropdown
    this.dbService.getAllPhysician().subscribe((physicianDB: any) => {
      this.diagnosis.physicianId = this.aConsultation.physicianId;
      for (let dr of physicianDB){
        if (dr.physician_id === this.diagnosis.physicianId) {
          this.aPhysician = dr;
          console.log("physician Record",this.aPhysician)
        }
      }
    });
  }

  /** 
   * @function addDiagnosis function passes diagnosis object to the service to be sent to the server via a post request.
   * @summary A diagnosis object is created based on the form inputs and is submitted to be stored in the MongoDB database.
   * @description onSubmit is triggered when the html form is submitted and the diagnosis object is created and sent to the DatabaseService to add it to the MongoDB database.
  */
  addDiagnosis() {
    this.dbService.insertDiagnosis(this.diagnosis).subscribe({
      // uses the router service to redirect the client to another component. 
      // In other words, replace the current component with another one.
      next: (result) => {
        this.router.navigate(['/view-consultation', this.diagnosis.consultationId])},
      error: (error) => { 
        console.log('Error:', error);
        this.router.navigate(["/invalid-data"])}     
     })      
  }
  
}
