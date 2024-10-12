// Import necessary modules from Angular core library
import { Pipe, PipeTransform } from '@angular/core';

// Define a new pipe with the name 'dateTimeFormat'
@Pipe({
  name: 'dateTimeFormat' // This is the pipe name used in templates
})

// The pipe class implements the PipeTransform interface
export class DateTimeFormatPipe implements PipeTransform {

  /**
   * The transform method receives a date value, processes it, and returns the date formatted as a locale-specific date and time string.
   * 
   * @param value The input value to be transformed (expected to be a date or timestamp)
   * @param args Additional optional arguments (unused in this case)
   * @returns The date and time in a localized string format
   */
  transform(value: any, ...args: unknown[]): string {
    // Convert the input value to a Date object
    let date = new Date(value);
    // Return the localized date and time string using toLocaleString method
    return date.toLocaleString();
  }
}
