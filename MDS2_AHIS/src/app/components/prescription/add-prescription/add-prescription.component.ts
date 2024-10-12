/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Add presciption component for prescription feature
*/ 

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})

export class AddPrescriptionComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  // Database
  patientDB: any[] = [];
  physicianDB: any[] = [];
  medicationDB: any[] = [];
  diagnosisDB: any[] = [];
  // Diagnosis ID
  diagnosisId: string | null = ""; 
  // Target Diagnosis
  targetDiagnosis: any = {};
  // Target Patient
  targetPatient: any = {};
  // Target Physician
  targetPhysician: any = {};

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) {
    this.diagnosisId = this.route.snapshot.paramMap.get('diagnosisId');
    console.log("Diagnosis ID: ", this.diagnosisId)
  }

  /**
   * @function ngOnInit fetches diagnosis, patient, and physician data, and retrieves records for the selected diagnosis.
   */
  ngOnInit() {
    // Get all Diagnosis, Patient, and Physician
    this.getDiagnosisDatabase();
    this.getPatientDatabase();
    this.getDoctorDatabase();

    // Find the Diagnosis
    this.dbService.getDiagnosis().subscribe((diagnosisDB_param: any) => {
      console.log("Get Diagnosis Record to be obtained: ", this.diagnosisId)
      for (let allDiagnosis of diagnosisDB_param){
        if (allDiagnosis.diagnosisId === this.diagnosisId) {
          this.targetDiagnosis = allDiagnosis;
          console.log("Diagnosis Record: ", this.targetDiagnosis)
        }
      }
    });

    // From Diagnosis, get the patient ID (patientId) and physician ID (physicianId)
    // Target Patient
    this.dbService.getPatients().subscribe((patientDB_param: any) => {
      console.log("Get Patient Record to be obtained: ", this.targetDiagnosis.patientId)
      for (let allPatient of patientDB_param){
        if (allPatient.patientId === this.targetDiagnosis.patientId) {
          this.targetPatient = allPatient;
          console.log("Patient Record: ", this.targetPatient)
        }
      }
    });
    // Target Physician
    this.dbService.getAllPhysician().subscribe((physicianDB_param: any) => {
      console.log("Get Physician Record to be obtained: ", this.targetDiagnosis.physicianId)
      for (let allDoctor of physicianDB_param){
        if (allDoctor.physician_id === this.targetDiagnosis.physicianId) {
          this.targetPhysician = allDoctor;
          console.log("Physician Record: ", this.targetPhysician)
        }
      }
    });

    // Fetch medication from database and format their names for the dropdown
    this.dbService.getAllMedication().subscribe((data: any) => {
      this.medicationDB = data.map((med: any) => ({
        medication_id: med.medication_id,
        name: `${med.medication_id} - ${med.medicine_name}`
      }));
    });
  }

  /** 
   * @summary A prescription object is created based on the form inputs and is submitted to be stored in the MongoDB database.
   * @description onSubmit is triggered when the html form is submitted and the prescription object is created and sent to the DatabaseService to add it to the MongoDB database.
  */
  onSubmit = async(form: any) => {
    let obj = {
      "prescription_name": form.value.prescription_name,
      "patient_id": this.targetDiagnosis.patientId,
      "physician_id": this.targetDiagnosis.physicianId,
      "medication_id": form.value.medication_id,
      "diagnosisId": this.diagnosisId,
      "prescription_dosage": form.value.prescription_dosage,
      "prescription_startdate": form.value.prescription_startdate,
      "prescription_enddate": form.value.prescription_enddate,
      "prescription_freqency": form.value.prescription_freqency,
      "prescription_specialinstructions": form.value.prescription_specialinstructions
    }

    console.log("prescription obj:", obj)

    this.dbService.addPrescription(obj).subscribe({
      next: (result) => {
        // Successful response
        this.router.navigate(['/view-diagnosis', this.diagnosisId]);
      },
      error: (error) => {
        // Error handling
        console.error('Error:', error);
        this.router.navigate(['/invalid-data']);
      }
    })
  }

  /**
   * @function getDiagnosisDatabase function fetch the diagnosis records from the MongoDB database
   * @summary Fetch the diagnosis records from the MongoDB database and store it in a variable to be access later
   * @description Fetch the diagnosis records from the MongoDB database and store it in a variable to be access later
   */
  getDiagnosisDatabase() {
    this.dbService.getDiagnosis().subscribe((data: any) => {
      this.diagnosisDB = data;
    });
  }

  /**
   * @function getPatientDatabase function fetch the patient records from the MongoDB database
   * @summary Fetch the patient records from the MongoDB database and store it in a variable to be access later
   * @description Fetch the patient records from the MongoDB database and store it in a variable to be access later
   */
  getPatientDatabase() {
    this.dbService.getPatients().subscribe((data: any) => {
      this.patientDB = data;
    });
  }

  /**
   * @function getDoctorDatabase function fetch the physician records from the MongoDB database
   * @summary Fetch the physician records from the MongoDB database and store it in a variable to be access later
   * @description Fetch the physician records from the MongoDB database and store it in a variable to be access later
   */
  getDoctorDatabase() {
    this.dbService.getAllPhysician().subscribe((data: any) => {
      this.physicianDB = data;
    });
  }
}
