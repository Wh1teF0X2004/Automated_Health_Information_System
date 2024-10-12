/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Display prescription detail component for prescription feature
*/ 

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToUpperCasePipe } from 'src/app/pipes/to-upper-case.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@Component({
  selector: 'app-display-prescription',
  templateUrl: './display-prescription.component.html',
  styleUrls: ['./display-prescription.component.css'],
  providers: [ToUpperCasePipe, DateFormatPipe]
})

export class DisplayPrescriptionComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  // Prescription ID
  prescription_id: string | null = ""; 
  objectId: string | null = ""; 
  // Prescription Details
  prescription_name: string = ""
  patient_id: string = ""
  patient_name: string = ""
  physician_id: string = ""
  medication_id: string = ""
  medicine_name: string = ""
  prescription_startdate: Date = new Date();
  prescription_enddate: Date = new Date();
  prescription_freqency = 0
  prescription_dosage = 0
  prescription_specialinstructions: string | null = ""; 
  // Database
  medicationDB: any[] = [];
  patientDB: any[] = [];
  prescriptionDB: any[] = [];

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) {
    this.prescription_id = this.route.snapshot.paramMap.get('prescription_id');
    console.log("Prescription ID: ", this.prescription_id)
  }

  /**
   * @function ngOnInit runs when the component is initiated
   * @description Loads patient, medication, and prescription databases, and retrieves the relevant prescription details
   */
  ngOnInit(){
    // Load patient database 
    this.getPatientDatabase();

    // Load medication database 
    this.getMedicationDatabase();

    // Load prescription database
    this.dbService.getAllPrescription().subscribe((data: any) => {
      if (data && data.length > 0) {
        const matchingPrescription = data.find((pre: any) => pre.prescription_id === this.prescription_id);
        if (matchingPrescription) {
          this.objectId = matchingPrescription._id
          this.prescription_id = matchingPrescription.prescription_id
          this.prescription_name = matchingPrescription.prescription_name
          this.patient_id = matchingPrescription.patient_id
          this.physician_id = matchingPrescription.physician_id
          this.medication_id = matchingPrescription.medication_id
          this.prescription_startdate = matchingPrescription.prescription_startdate
          this.prescription_enddate = matchingPrescription.prescription_enddate
          this.prescription_freqency = matchingPrescription.prescription_freqency
          this.prescription_dosage = matchingPrescription.prescription_dosage
          this.prescription_specialinstructions = matchingPrescription.prescription_specialinstructions

          // Get patient and medication names after data has been set
          this.getPatientName(this.patient_id);
          this.getMedicationName(this.medication_id);
        } else {
          this.router.navigate(['/invalid-data']);
        }
      }
      else {
        this.router.navigate(['/invalid-data']);
      }
    });
  }

  /**
   * @function getPatientDatabase function fetches the patient records from the MongoDB Database
   * @summary Fetches the patient records from the MongoDB Database then retrieves the patient's name for the current prescription
   * @description Fetches the patient records from the MongoDB Database then retrieves the patient's name for the current prescription
   */
  getPatientDatabase() {
    this.dbService.getPatients().subscribe((data: any) => {
      this.patientDB = data;
      // Retrieve the patient name
      this.getPatientName(this.patient_id);
    });
  }

  /**
   * @function getMedicationDatabase function fetches the medication records from the MongoDB Database
   * @summary Fetches the medication records from the MongoDB Database then retrieves the medication's name for the current prescription
   * @description Fetches the medication records from the MongoDB Database then retrieves the medication's name for the current prescription
   */
  getMedicationDatabase() {
    this.dbService.getAllMedication().subscribe((data: any) => {
      this.medicationDB = data;
      // Retrieve the medication name
      this.getMedicationName(this.medication_id);
    });
  }

  /**
   * @function getPatientName function searches the patientDB for a matching patient ID and obtain the patient name that is saved to a variable to be used later
   * @param patientId The ID of the patient to find
   * @summary Searches the patientDB for a matching patient ID and obtain the patient name that is saved to a variable to be used later
   * @description Searches the patientDB for a matching patient ID and obtain the patient name that is saved to a variable to be used later
   */
  getPatientName(patientId: string) {
    const matchingPatient = this.patientDB.find((patient: any) => patient.patientId === patientId);
    if (matchingPatient) {
      const patientFName = matchingPatient.firstName;
      const patientLName = matchingPatient.lastName;
      this.patient_name = `${patientFName} ${patientLName}`;
      return this.patient_name;
    } else {
      return null;
    }
  }

  /**
   * @function getMedicationName function searches the medicationDB for a matching medication ID and obtain the medication name that is saved to a variable to be used later
   * @param medication_id The ID of the medication to find
   * @description Searches the medicationDB for a matching medication ID and obtain the medication name that is saved to a variable to be used later
   */
  getMedicationName(medication_id: string) {
    const matchingMedication = this.medicationDB.find((med: any) => med.medication_id === medication_id);
    if (matchingMedication) {
      this.medicine_name = matchingMedication.medicine_name;
      return this.medicine_name;
    } else {
      return this.medicine_name = "";
    }
  }
}
