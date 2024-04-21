import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateStatusSeverity',
  standalone: true,
})
export class TranslateStatusSeverityPipe implements PipeTransform {
  transform(status: number): string {
    let statusColor: string = '';
    switch (status) {
      case 1:
        statusColor = 'success';
        break;
      case 2:
        statusColor = 'danger';
        break;
      default:
        break;
    }
    return statusColor;
  }
}
