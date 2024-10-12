// Import necessary modules from Angular core library
import { Pipe, PipeTransform } from '@angular/core';

// Define a new pipe with the name 'calculateAge'
@Pipe({
  name: 'calculateAge' // This is the pipe name used in templates
})

// The pipe class implements the PipeTransform interface
export class CalculateAgePipe implements PipeTransform {

  /**
   * The transform method calculates the age based on the provided birthdate.
   * It converts the birthdate into milliseconds, computes the difference from the current date, and converts the difference into years.
   * 
   * @param value The input value to be transformed (expected to be a date string)
   * @param args Additional optional arguments (unused in this case)
   * @returns The age in years as a number
   */
  transform(value: string, ...args: unknown[]): number {
    // Convert the input value (birthdate) to a timestamp in milliseconds
    let birthday = +new Date(value);
    // Calculate the age by subtracting the birthdate from the current timestamp, dividing by the length of a year in milliseconds,
    // and rounding down to the nearest whole number.
    return ~~((Date.now() - birthday) / (31557600000)); 
    
    // 31557600000 is the number of milliseconds in a year
    // 24 * 3600 * 365.25 * 1000
    // 365.25 days account for the extra 6 hours of the leap year
  }
}
