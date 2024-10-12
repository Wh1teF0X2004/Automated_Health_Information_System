/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Add appointment component for appointment feature
*/ 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})

export class AddAppointmentComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  defaultAppointmentDuration: number = 60;
  patientDB: any[] = [];
  physicianDB: any[] = [];

  /**
   * @constructor The constructor of this component has two dependencies: the DatabaseService and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   */
  constructor(private dbService: DatabaseService, private router: Router){}

  /**
   * @function ngOnInit fetches patient data, and retrieves records for the selected patient.
   */
  ngOnInit() {
    // Fetch patients from database and format their names for the dropdown
    this.dbService.getPatients().subscribe((data: any) => {
      this.patientDB = data.map((patient: any) => ({
        patientId: patient.patientId,
        name: `${patient.patientId} - ${patient.firstName} ${patient.lastName}`
      }));
    });

    // Fetch physicians from database and format their names for the dropdown
    this.dbService.getAllPhysician().subscribe((data: any) => {
      this.physicianDB = data.map((doctor: any) => ({
        physician_id: doctor.physician_id,
        name: `${doctor.physician_id} - ${doctor.physician_firstName} ${doctor.physician_lastName}`
      }));
    });
  }

  /** 
   * @summary A appointment object is created based on the form inputs and is submitted to be stored in the MongoDB database.
   * @description onSubmit is triggered when the html form is submitted and the appointment object is created and sent to the DatabaseService to add it to the MongoDB database.
  */
  onSubmit = async(form: any) => {
    let obj = {
      "physician_id": form.value.physician_id,
      "patient_id": form.value.patient_id,
      "appointment_venue": form.value.appointment_venue,
      "appointment_time": form.value.appointment_time,
      "appointment_duration": form.value.appointment_duration
    }

    console.log("prescription obj:", obj)

    this.dbService.addAppointment(obj).subscribe({
      next: (result) => {
        // Successful response
        this.router.navigate(['/list-appointment']);
      },
      error: (error) => {
        // Error handling
        console.error('Error:', error);
        this.router.navigate(['/invalid-data']);
      }
    })
  }
}
