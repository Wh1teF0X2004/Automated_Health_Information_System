// Import necessary modules from Angular core library
import { Pipe, PipeTransform } from '@angular/core';

// Define a new pipe with the name 'dateFormat'
@Pipe({
  name: 'dateFormat' // This is the pipe name used in templates
})

// The pipe class implements the PipeTransform interface
export class DateFormatPipe implements PipeTransform {

  /**
   * The transform method receives a date value, processes it, and returns the date formatted as a string in the format "day-month-year".
   * 
   * @param value The input value to be transformed (expected to be a date or timestamp)
   * @param args Additional optional arguments 
   * @returns The date formatted as "day-month-year"
   */
  transform(value: any, ...args: unknown[]): string {
    // Convert the input value to a Date object
    let date = new Date(value);
    // Format the date as "day-month-year"
    let formatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    // Return the formatted date string
    return formatedDate;
  }
}
