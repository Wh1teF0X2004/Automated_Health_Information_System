/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a list all prescription component for prescription feature
*/ 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToUpperCasePipe } from 'src/app/pipes/to-upper-case.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-prescription',
  templateUrl: './list-prescription.component.html',
  styleUrls: ['./list-prescription.component.css'],
  providers: [ToUpperCasePipe, DateFormatPipe]
})

export class ListPrescriptionComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  prescriptionDB: any[] = [];
  patientDB: any[] = [];
  medicationDB: any[] = [];
  patientNames: { [key: string]: string } = {}; // Store patient names by ID

  /**
   * @constructor The constructor of this component has two dependencies: the DatabaseService and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   */
  constructor(private dbService: DatabaseService, private router: Router) {}

  /**
   * @function onClick Logs the current prescriptionDB to the console
   * @summary Logs the current prescriptionDB to the console
   * @description This is mainly for debugging purposes to verify that the database has been populated
   */
  onClick() {
    console.log(this.prescriptionDB);
  }

  /**
   * @function onDelete deletes a prescription record from the database based on the prescription ID
   * @param id The ID of the prescription to be deleted/removed from database
   * @description After successful deletion, it re-fetches the updated list of prescription from the database so the update/action is shown immediately
   */
  onDelete(id: string) {
    this.dbService.deletePrescriptionById(id).subscribe(() => {
      this.dbService.getAllPrescription().subscribe((data: any) => {
        this.prescriptionDB = data;
        this.assignPatientNames(); // Re-assign patient names after deletion
      });
    });
  }

  /**
   * @function ngOnInit fetches both the patient and prescription data simultaneously
   * @summary This function fetches both the patient and prescription data simultaneously
   * @description Use forkJoin to wait for both patients and prescriptions to load before proceeding and store the fetched data in the respective variables. Assign patient names after both datasets are loaded completedly.
   */
  ngOnInit() {
    // Wait for both patient data and prescription data to be loaded
    forkJoin({
      patients: this.dbService.getPatients() as unknown as any[], 
      prescriptions: this.dbService.getAllPrescription() as unknown as any[], 
    }).subscribe(({ patients, prescriptions }) => {
      this.patientDB = patients;
      this.prescriptionDB = prescriptions;
      this.assignPatientNames(); // Assign patient names after both datasets are loaded
      console.log("Patient names: ", this.patientNames);
    });

    // Load medication database 
    this.getMedicationDatabase();
  }

  /**
   * @function getMedicationDatabase function fetch the medication records from the MongoDB database
   * @summary Fetch the medication records from the MongoDB database and store it in a variable to be access later
   * @description Fetch the medication records from the MongoDB database and store it in a variable to be access later
   */
  getMedicationDatabase() {
    this.dbService.getAllMedication().subscribe((data: any) => {
      this.medicationDB = data;
    });
  }

  /**
   * @function getPatientName finds the patient's name based on the provided patient ID by searching through the patient database
   * @description This function finds the patient's name based on the provided patient ID by searching through the patient database
   * @param patientId The ID of the patient whose name is being retrieved
   * @returns The full name of the patient as a string, or `null` if the patient is not found
   */
  getPatientName(patientId: string): string | null {
    const matchingPatient = this.patientDB.find((patient: any) => patient.patientId === patientId);

    if (matchingPatient) {
      const patientFName = matchingPatient.firstName;
      const patientLName = matchingPatient.lastName;
      return `${patientFName} ${patientLName}`;
    } else {
      return null;
    }
  }

  /**
   * @function assignPatientNames loops through each prescription and assigns the corresponding patient's full name
   * @description This function loops through each prescription and assigns the corresponding patient's full name 
   * @returns null
   */
  assignPatientNames() {
    this.prescriptionDB.forEach((prescription: any) => {
      const patientId = prescription.patient_id;
      const patientName = this.getPatientName(patientId);
      if (patientName) {
        this.patientNames[patientId] = patientName;
      }
    });
    console.log(this.patientNames); 
  }
}
