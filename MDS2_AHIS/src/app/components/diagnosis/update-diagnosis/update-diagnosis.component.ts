/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * Represents a update diagnosis component for diagnosis feature
*/ 

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

/**
 * @interface Diagnosis
 * @description Define the Diagnosis interface, which describes the structure of a diagnosis object
 */
interface Diagnosis {
  physicianId: string;
  consultationId: string | null;
  diagnosisDescription: string;
  diagnosisAdditional: string;
  patientId: string | null;
  diagnosisId: string | null;
}

@Component({
  selector: 'app-update-diagnosis',
  templateUrl: './update-diagnosis.component.html',
  styleUrls: ['./update-diagnosis.component.css']
})

export class UpdateDiagnosisComponent {

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
    consultationId: "",
    diagnosisDescription: "",
    diagnosisAdditional: "",
    diagnosisId: ""
  };

  id: string | null = "";
  patientDB: any[] = [];
  aPatient: any = {};
  consultationDB: any[] = [];
  physicianDB: any[] = [];
  aPhysician: any = {};
  aDiagnosis: any = {};

  /**
   * @function ngOnInit runs when the component is initiated
   * @description calls various methods to fetch and set the diagnosis, patient, and physician records
   */
  ngOnInit() {
    this.getDiagnosisId();
    this.getDiagnosisRecord();
    this.getPatientRecord();
    this.getPhysicianRecord();
  }

  /**
   * @function getDiagnosisId Retrieves the diagnosis ID from the URL parameters and stores it in the component
   * @description Retrieves the diagnosis ID from the URL parameters and stores it in the component
   */
  getDiagnosisId(){
    this.route.paramMap.subscribe(params => {
      this.diagnosis.diagnosisId = params.get('diagnosisId');
      console.log("Get diagnosis Id to update diagnosis: ", this.diagnosis.diagnosisId  );
    })
  }

  /**
   * @function getDiagnosisRecord Fetches all diagnosis records from the database and matches the current diagnosis ID to extract the specific diagnosis
   * @description Fetches all diagnosis records from the database and matches the current diagnosis ID to extract the specific diagnosis
   */
  getDiagnosisRecord(){
    this.dbService.getDiagnosis().subscribe((consultationDB: any) => {
      console.log("Get diagnosis Id record", this.diagnosis.diagnosisId )
      for (let diagnosis of consultationDB){
        if (diagnosis.diagnosisId === this.diagnosis.diagnosisId ) {
          this.aDiagnosis = diagnosis;
          console.log("aDiagnosis Record", this.aDiagnosis)
          // Updates the component’s Diagnosis fields with the corresponding values from this.aDiagnosis to have it appear 
          //  automatically in the form.
          this.diagnosis.diagnosisDescription = this.aDiagnosis.diagnosisDescription;
          this.diagnosis.diagnosisAdditional = this.aDiagnosis.diagnosisAdditional;
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
      this.diagnosis.patientId = this.aDiagnosis.patientId;
      console.log("Get Patient Id record", this.diagnosis.patientId)
      for (let patient of patientDB){
        if (patient.patientId === this.diagnosis.patientId) {
          this.aPatient = patient;
          console.log("Patient Record", this.aPatient)
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
      this.diagnosis.physicianId = this.aDiagnosis.physicianId;
      for (let dr of physicianDB){
        if (dr.physician_id === this.diagnosis.physicianId) {
          this.aPhysician = dr;
          console.log("physician Record", this.aPhysician)
        }
      }
    });
  }

  /**
   * @function sendUpdateDiagnosis Sends the updated diagnosis object to the backend via the DatabaseService, and navigates to the view-diagnosis page
   * @description Sends the updated diagnosis object to the backend via the DatabaseService, and navigates to the view-diagnosis page
   */
  sendUpdateDiagnosis(){
    console.log("Send diagnosis object for update",this.diagnosis)
    this.dbService.updateDiagnosis(this.diagnosis).subscribe({
      next: (result) => {this.router.navigate(["/view-diagnosis", this.diagnosis.diagnosisId])},
      error: (error) => { this.router.navigate(["/invalid-data"])}     
     })
  }

}
