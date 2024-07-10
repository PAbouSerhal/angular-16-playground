import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  bufferCount,
  concatMap,
  forkJoin,
  from,
  mergeMap,
  Observable,
  of,
  Subscription,
  tap,
  toArray,
} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  todoValue: string = '';
  comment: any;
  firstApiResult: any;
  secondApiResult: any;
  testApiReq: TestApiReq = new TestApiReq();
  APIURL: string = 'http://localhost:5105/VanguardEdge/TestApi';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  retrieveDefaultDataAsync(): void {
    this.testApiReq.Id = 1;
    this.testApiReq.Name = 'Pierre';

    const apiCalls: Array<Observable<TestApiRes>> = [];

    for (let i = 0; i < 50; i++) {
      apiCalls.push(this.http.post<TestApiRes>(this.APIURL, this.testApiReq));
    }

    forkJoin(apiCalls).subscribe((results) => {
      console.log('All API calls are done');
      results.forEach((res, index) => {
        console.log(`API: ${index} response: ` + JSON.stringify(res));
      });
    });
  }

  retrieveDefaultDataSync(): void {
    this.testApiReq.Id = 1;
    this.testApiReq.Name = 'Pierre';

    const apiCalls: Array<Observable<TestApiRes>> = [];

    for (let i = 0; i < 50; i++) {
      apiCalls.push(this.http.post<TestApiRes>(this.APIURL, this.testApiReq));
    }

    from(apiCalls)
      .pipe(concatMap((apiCall) => apiCall))
      .subscribe({
        next: (res) => {
          console.log('API response: ' + JSON.stringify(res));
        },
        complete: () => {
          console.log('All API calls are done');
        },
      });
  }

  retrieveDefaultDataAsyncWithBatch(): void {
    this.testApiReq.Id = 1;
    this.testApiReq.Name = 'Pierre';

    const apiCalls: Array<Observable<TestApiRes>> = [];

    for (let i = 0; i < 50; i++) {
      apiCalls.push(this.http.post<TestApiRes>(this.APIURL, this.testApiReq));
    }

    // Helper function to process a batch of API calls
    const processBatch = (
      batch: Observable<TestApiRes>[],
      batchIndex: number
    ) =>
      forkJoin(batch).pipe(
        tap((results) => {
          console.log(`Batch ${batchIndex + 1} completed:`);
          results.forEach((res, apiIndex) => {
            console.log(
              `API: ${batchIndex * 10 + apiIndex} response: ${JSON.stringify(
                res
              )}`
            );
          });
        })
      );

    from(apiCalls)
      .pipe(
        bufferCount(10), // Group the API calls into batches of 10
        mergeMap((batch, index) => processBatch(batch, index), 1) // Process one batch at a time
      )
      .subscribe({
        complete: () => {
          console.log('All API calls are done');
        },
      });
  }

  testRxjsCallAsyncWithBatch() {
    this.retrieveDefaultDataAsyncWithBatch();
  }

  testRxjsCallSync() {
    this.retrieveDefaultDataSync();
  }

  testRxjsCallAsync() {
    this.retrieveDefaultDataSync();
  }
}

class TestApiRes {
  ReturnCode: string = '';
  ReturnDescription: string = '';
}

class TestApiReq {
  Id: number = 0;
  Name: string = '';
}
