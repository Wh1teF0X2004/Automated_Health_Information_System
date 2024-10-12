/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a view consultation component details for consultation feature
*/ 

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-view-consultation',
  templateUrl: './view-consultation.component.html',
  styleUrls: ['./view-consultation.component.css']
})

export class ViewConsultationComponent {
  consultationDB: any[] = [];
  consultationId: string | null = "";
  aConsultation: any = {};
  physicianDB: any[] = [];
  aPhysician: any = {};
  patientDB: any[] = [];
  aPatient: any = {};

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { }
  
  /**
   * @function ngOnInit fetches consultation, patient, and physician data, and retrieves records for the selected consultation
   * @summary Fetches consultation, patient, and physician data, and retrieves records for the selected consultation
   * @description Fetches consultation, patient, and physician data, and retrieves records for the selected consultation
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
      this.consultationId = params.get('consultationId');
      console.log("Get consultation ID: ", this.consultationId );
    })
  }

  /**
   * @function getConsultationRecord function fetch the consultation records from the MongoDB database 
   * @summary Fetch the consultation records from the MongoDB database using the consultation ID and store it in a variable to be access later
   * @description Fetch the consultation records from the MongoDB database using the consultation ID and store it in a variable to be access later
   */
  getConsultationRecord(){
    this.dbService.getConsultations().subscribe((consultationDB: any) => {
      console.log("Get consultation Id record",this.consultationId)
      for (let consultation of consultationDB){
        if (consultation.consultationId === this.consultationId) {
          this.aConsultation = consultation;
          console.log("consultation Record",this.aConsultation)
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
      console.log("Get Patient Id record",this.aConsultation.patientId)
      for (let patient of patientDB){
        if (patient.patientId === this.aConsultation.patientId) {
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
      for (let dr of physicianDB){
        if (dr.physician_id === this.aConsultation.physicianId) {
          this.aPhysician = dr;
          console.log("physician Record",this.aPhysician)
        }
      }
    });
  }

  /**
   * @function AddDiagnosis Navigates the user to the Add diagnosis page, passing the consultation ID as a parameter
   * @description Navigates the user to the Add diagnosis page, passing the consultation ID as a parameter
   * @param diagnosisId The ID of the diagnosis for which the diagnosis will be added
   */
  AddDiagnosis(consultationId: string) {
    this.router.navigate(['/add-diagnosis', consultationId]);
  }
  
  /**
   * @function viewSelectedDiagnosis Navigates the user to the view diagnosis page, passing the diagnosis ID as a parameter
   * @description Navigates the user to the view diagnosis page, passing the diagnosis ID as a parameter
   * @param diagnosisId The ID of the diagnosis for which the diagnosis detail will be viewed
   */
  viewSelectedDiagnosis(diagnosisId: string) {
    this.router.navigate(['/view-diagnosis', diagnosisId]);
  }

  /**
   * @function updateDiagnosis Navigates the user to the update diagnosis page, passing the diagnosis ID as a parameter
   * @description Navigates the user to the update diagnosis page, passing the diagnosis ID as a parameter
   * @param diagnosisId The ID of the diagnosis for which the diagnosis will be updated
   */
  updateDiagnosis(diagnosisId: string){
    console.log("Update button submit")
    this.router.navigate(['/update-diagnosis', diagnosisId])
  }

  /**
   * @function sendDiagnosisId
   * @description Deletes a diagnosis from the database by passing the diagnosis ID. After deletion, it fetches the updated consultation data.
   * @param diagnosisId The ID of the diagnosis to be deleted
   */
  sendDiagnosisId(diagnosisId: string){
    this.dbService.deleteDiagnosis(diagnosisId).subscribe({
      next: (result) => {
        this.dbService.getConsultations().subscribe((data:any) => {
          this.consultationDB = data;
      });},
      error: (error) => { this.router.navigate(["/invalid-data"])}     
     })
  }

}
