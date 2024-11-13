import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-ngx-indexed-db';

  people: any[] = [];
  peoples = signal<any[]>([]);
  constructor(private dbService: NgxIndexedDBService) {
    this.dbService.clear('people').subscribe((successDeleted) => {
      console.log('success? ', successDeleted);
    });

    this.dbService
      .bulkAdd('people', [
        {
          name: `charles number ${Math.random() * 10}`,
          email: `email number ${Math.random() * 10}`,
        },
        {
          name: `charles number ${Math.random() * 10}`,
          email: `email number ${Math.random() * 10}`,
        },
      ])
      .subscribe((result) => {
        console.log('result: ', result);
      });
  }

  ngOnInit() {
    this.dbService.getAll('people')
      .pipe(tap((result) => this.peoples.set(result)))
      .subscribe( );
  }
}
