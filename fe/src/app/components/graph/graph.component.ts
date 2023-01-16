import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

import zoomPlugin from 'chartjs-plugin-zoom';
import { DiaryService } from 'src/app/services/diary.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
})
export class GraphComponent implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas!: ElementRef;
  lineChart: any;

  fg: FormGroup = this.formBuilder.group({
    from: [undefined, Validators.required],
    to: [undefined, Validators.required],
  });
  dateFromText: string = '';
  dateToText: string = '';

  data: number[] = [];
  labels: string[] = [];

  maxWeight?: number;
  minWeight?: number;

  noEntries: boolean | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly diaryService: DiaryService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
  }

  submit(): void {
    this.fg.markAllAsTouched();
    if (this.fg.invalid) return;

    let from = this.fg.controls['from'].value;
    let to = this.fg.controls['to'].value;

    if (Date.parse(from) > Date.parse(to)) {
      from = this.fg.controls['to'].value;
      to = this.fg.controls['from'].value;
    }

    if (this.lineChart) this.lineChart.destroy();
    this.noEntries = null;
    this.labels = [];
    this.diaryService.fetchEntriesBetween(from, to).subscribe((entries) => {
      if(entries.length === 0) {
        this.noEntries = true;
        return;
      }
      
      entries.sort((a, b) => {
        const dateA = Date.parse(a.date + '');
        const dateB = Date.parse(b.date + '');
        if (dateA < dateB) return -1;
        if (dateB < dateA) return 1;
        return 0;
      });
      entries.forEach((entry) => {
        this.labels?.push(entry.date + '');
        this.data.push(entry.weight);
      });
      this.maxWeight = Math.ceil(Math.max(...this.data) / 5) * 5 + 5;
      this.minWeight = Math.ceil(Math.min(...this.data) / 5) * 5 - 5;
      this.makeGraph();
    });
  }

  makeGraph(): void {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Hmotnost',
            //  lineTension: 0.2,
            fill: true,
            backgroundColor: 'rgba(75,192,120,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.data,
            spanGaps: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: this.minWeight,
            max: this.maxWeight,
            ticks: {
              stepSize: 5
            }
          },
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              mode: 'x',
              pinch: {
                enabled: true,
              },
            },
            pan: {
              enabled: true,
              mode: 'xy',
            },
            limits: {
              y: {
                min: this.minWeight,
                max: this.maxWeight,
              },
            },
          },
        },
      },
    });
  }

  dateFromChange($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.dateFromText = target.value;
  }
  dateFromInputClick($event: Event): void {
    const target = $event.target as any;
    target.showPicker();
  }

  dateToChange($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.dateToText = target.value;
  }
  dateToInputClick($event: Event): void {
    const target = $event.target as any;
    target.showPicker();
  }
}
