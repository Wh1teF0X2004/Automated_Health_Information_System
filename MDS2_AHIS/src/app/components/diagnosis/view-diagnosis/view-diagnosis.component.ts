/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a view diagnosis detail component for diagnosis feature
*/ 

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-view-diagnosis',
  templateUrl: './view-diagnosis.component.html',
  styleUrls: ['./view-diagnosis.component.css']
})

export class ViewDiagnosisComponent {
  consultationDB: any[] = [];
  diagnosisDB: any[] = [];
  diagnosisId: string | null = "";
  aDiagnosis: any = {};
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
   * @function ngOnInit runs when the component is initiated
   * @description calls various methods to fetch and set the diagnosis, patient, consultation, and physician records
   */
  ngOnInit() {
    this.getDiagnosisId();
    this.getDiagnosisRecord();
    this.getPatientRecord();
    this.getPhysicianRecord();
    this.getConsultationRecord();
  }

  /**
   * @function getDiagnosisId Retrieves the diagnosis ID from the URL parameters and stores it in the component
   * @description Retrieves the diagnosis ID from the URL parameters and stores it in the component
   */
  getDiagnosisId(){
    this.route.paramMap.subscribe(params => {
      this.diagnosisId = params.get('diagnosisId');
      console.log("Get diagnosis ID: ", this.diagnosisId );
    })
  }

  /**
   * @function getDiagnosisRecord Fetches all diagnosis records from the database and matches the current diagnosis ID to extract the specific diagnosis
   * @description Fetches all diagnosis records from the database and matches the current diagnosis ID to extract the specific diagnosis
   */
  getDiagnosisRecord(){
    this.dbService.getDiagnosis().subscribe((diagnosisDB: any) => {
      console.log("Get diagnosis Id record",this.diagnosisId)
      for (let diagnosis of diagnosisDB){
        if (diagnosis.diagnosisId === this.diagnosisId) {
          this.aDiagnosis = diagnosis;
          console.log("consultation Record",this.aDiagnosis)
        }
      }
    });
  }

  /**
   * @function getConsultationRecord Fetches all consultation records from the database and matches the consultation ID from the diagnosis record
   * @description Fetches all consultation records from the database and matches the consultation ID from the diagnosis record
   */
  getConsultationRecord(){
    this.dbService.getConsultations().subscribe((consultationDB: any) => {
      console.log("Get consultation Id record",this.aDiagnosis.consultationId)
      for (let consultation of consultationDB){
        if (consultation.consultationId === this.aDiagnosis.consultationId) {
          this.aConsultation = consultation;
          console.log("consultation Record",this.aConsultation)
        }
      }
    });
  }

  /**
   * @function getPatientRecord Fetches all patient records from the database and matches the patient ID from the diagnosis record
   * @description Fetches all patient records from the database and matches the patient ID from the diagnosis record
   */
  getPatientRecord(){
    this.dbService.getPatients().subscribe((patientDB: any) => {
      console.log("Get Patient Id record",this.aDiagnosis.patientId)
      for (let patient of patientDB){
        if (patient.patientId === this.aDiagnosis.patientId) {
          this.aPatient = patient;
          console.log("Patient Record",this.aPatient)
        }
      }
    });
  }

  /**
   * @function getPhysicianRecord Fetches all physician records from the database and matches the physician ID from the diagnosis record
   * @description Fetches all physician records from the database and matches the physician ID from the diagnosis record
   */
  getPhysicianRecord(){
    this.dbService.getAllPhysician().subscribe((physicianDB: any) => {
      for (let dr of physicianDB){
        if (dr.physician_id === this.aDiagnosis.physicianId) {
          this.aPhysician = dr;
          console.log("physician Record",this.aPhysician)
        }
      }
    });
  }

  /**
   * @function AddPrescription Navigates the user to the Add Prescription page, passing the diagnosis ID as a parameter
   * @description Navigates the user to the Add Prescription page, passing the diagnosis ID as a parameter
   * @param diagnosisId The ID of the diagnosis for which the prescription will be added
   */
  AddPrescription(diagnosisId: string) {
    this.router.navigate(['/add-prescription', diagnosisId]);
  }
  
  /**
   * @function viewSelectedPrescription Navigates the user to the Display Prescription page, passing the prescription ID as a parameter
   * @description Navigates the user to the Display Prescription page, passing the prescription ID as a parameter
   * @param prescription_id The ID of the prescription to be viewed
   */
  viewSelectedPrescription(prescription_id: string) {
    this.router.navigate(['/display-prescription', prescription_id]);
  }

  /**
   * @function updateDiagnosis Navigates the user to the Update Diagnosis page, passing the diagnosis ID as a parameter
   * @description Navigates the user to the Update Diagnosis page, passing the diagnosis ID as a parameter
   * @param diagnosisId The ID of the diagnosis to be updated
   */
  updateDiagnosis(diagnosisId: string){
    console.log("Update button submit")
    this.router.navigate(['/update-diagnosis', diagnosisId])
  }

}
