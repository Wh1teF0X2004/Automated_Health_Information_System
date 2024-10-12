/**
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents a Update appointment component for appointment feature
*/ 

import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})

export class UpdateAppointmentComponent {
  imageUrl: string = '../assets/images/banner-sample.png';
  appointment_id: string | null = ""; 

  // Database
  appointmentDB: any[] = [];
  patientDB: any[] = [];
  medicationDB: any[] = [];

  // Details that can be updated
  newAppointment_venue: string | null = ""; 
  newAppointment_time: Date = new Date();

  /**
   * @constructor The constructor of this component has three dependencies: the DatabaseService, the ActivatedRoute, and the Router
   * @param dbService Service used to fetch and manage data from the database
   * @param router Service used for navigation between components/pages
   * @param route Provides information about the current route in the application
   */
  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router){
    this.appointment_id = this.route.snapshot.paramMap.get('appointment_id');
    console.log("appointment id: ", this.appointment_id)
  }

  /**
   * @function ngOnInit fetches the list of all appointments and stores them in a variable to be accessed later
   * @description This function is called when the component is initialized
   */
  ngOnInit() {
    this.dbService.getAllAppointment().subscribe((data: any) => {
      this.appointmentDB = data;
    });
    console.log(this.appointmentDB)
  }

  /**
   * @function selectAppointmentButton fetches the selected appointment's ID
   * @description When the user selects an appointment, this function is called to set the selected appointment's ID
   * @param appointment_id The ID of the selected appointment
   */
  selectAppointmentButton(appointment_id: string){
    this.appointment_id = appointment_id
  }

  /**
   * @function updateButton is called when the user clicks the update button
   * @description It constructs an object containing the updated details (venue and time), then sends this to the database via the `updateAppointment` method in `DatabaseService`. Upon success or failure, it logs the result and handles errors
   */
  updateButton(){
    const obj = {
      appointment_id: this.appointment_id,
      appointment_venue: this.newAppointment_venue,
      appointment_time: this.newAppointment_time,
    }

    this.dbService.updateAppointment(obj).subscribe({
      next: (result) => {
        // Successful response
        console.log(obj)
        this.dbService.getAllAppointment().subscribe((data: any) => {
          this.appointmentDB = data
        })
      },
      error: (error) => {
        // Error handling
        console.log(obj)
        console.error('Error:', error);
        this.router.navigate(['/invalid-data']);
      }
    })
  }
}
