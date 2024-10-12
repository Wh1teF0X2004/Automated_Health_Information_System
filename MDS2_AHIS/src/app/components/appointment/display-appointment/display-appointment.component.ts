/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Display appointment detail component for appointment feature
*/ 

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToUpperCasePipe } from 'src/app/pipes/to-upper-case.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@Component({
  selector: 'app-display-appointment',
  templateUrl: './display-appointment.component.html',
  styleUrls: ['./display-appointment.component.css'],
  providers: [ToUpperCasePipe, DateFormatPipe]
})

export class DisplayAppointmentComponent {
  imageUrl: string = '../assets/images/banner-sample.png';

  // Appointment ID
  appointment_id: string | null = ""; 
  objectId: string | null = ""; 

  // Appointment Details
  physician_id: string = ""
  physician_name: string = ""
  patient_id: string = ""
  patient_name: string = ""
  appointment_venue: string = ""
  appointment_time: Date = new Date();
  appointment_duration = 0

  // Database
  medicationDB: any[] = [];
  consultationDB: any[] = [];
  patientDB: any[] = [];
  physicianDB: any[] = [];
  appointmentDB: any[] = [];

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) {
    this.appointment_id = this.route.snapshot.paramMap.get('appointment_id');
    console.log("Appointment ID: ", this.appointment_id)
  }

  /**
   * @function ngOnInit Fetches necessary data from the database, including patient, physician, and appointment information
   * @description This function is called when the component is initialized
   */
  ngOnInit(){
    // Load patient database 
    this.getPatientDatabase();

    // Load physician database 
    this.getPhysicianDatabase();

    // Load Appointment database
    this.dbService.getAllAppointment().subscribe((data: any) => {
      if (data && data.length > 0) {
        const matchingAppointment = data.find((pre: any) => pre.appointment_id === this.appointment_id);
        if (matchingAppointment) {
          this.objectId = matchingAppointment._id
          this.appointment_id = matchingAppointment.appointment_id
          this.patient_id = matchingAppointment.patient_id
          this.physician_id = matchingAppointment.physician_id
          this.appointment_venue = matchingAppointment.appointment_venue
          this.appointment_time = matchingAppointment.appointment_time
          this.appointment_duration = matchingAppointment.appointment_duration

          // Get patient and physician names after data has been set
          this.getPatientName(this.patient_id);
          console.log("patient name: ", this.patient_name)
          this.getPhysicianName(this.physician_id);
          console.log("physician name: ", this.physician_name)
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
   * @function getPatientName Fetches the patient's name by their ID from the patient database
   * @description It looks for a match and concatenates the first and last names
   * @param patientId The ID of the patient to retrieve the name for
   * @returns The patient's full name or `null` if not found
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
   * @function getPhysicianName Fetches the physician's name by their ID from the physician database
   * @description It concatenates the first and last names of the physician
   * @param physician_id The ID of the physician to retrieve the name for
   * @returns The physician's full name or `null` if not found
   */
  getPhysicianName(physician_id: string) {
    const matchingPhysician = this.physicianDB.find((doctor: any) => doctor.physician_id === physician_id);
    if (matchingPhysician) {
      const physicianFName = matchingPhysician.physician_firstName;
      const physicianLName = matchingPhysician.physician_lastName;
      this.physician_name = `${physicianFName} ${physicianLName}`;
      return this.physician_name;
    } else {
      return null;
    }
  }

  /**
   * @function getPatientDatabase function fetch the patient records from the MongoDB database
   * @summary Fetch the patient records from the MongoDB database and store it in a variable to be access later
   * @description Fetch the patient records from the MongoDB database and store it in a variable to be access later
   */
  getPatientDatabase() {
    this.dbService.getPatients().subscribe((data: any) => {
      this.patientDB = data;
      // Now that the data is loaded, we can safely retrieve the patient name
      this.getPatientName(this.patient_id);
    });
  }

  /**
   * @function getPhysicianDatabase function fetch the physician records from the MongoDB database
   * @summary Fetch the physician records from the MongoDB database and store it in a variable to be access later
   * @description Fetch the physician records from the MongoDB database and store it in a variable to be access later
   */
  getPhysicianDatabase() {
    this.dbService.getAllPhysician().subscribe((data: any) => {
      this.physicianDB = data;
      // Now that the data is loaded, we can safely retrieve the physician name
      this.getPhysicianName(this.physician_id);
    });
  }
}
