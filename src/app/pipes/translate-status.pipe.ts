import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateStatus',
  standalone: true,
})
export class TranslateStatusPipe implements PipeTransform {
  transform(status: number): string {
    let statusString: string = '';
    switch (status) {
      case 0:
        statusString = 'Absent';
        break;
      case 1:
        statusString = 'Present';
        break;
      case 2:
        statusString = 'Anomaly';
        break;
      default:
        break;
    }
    return statusString;
  }
}
