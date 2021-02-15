import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { Course } from '../model/course';
import { LessonsDataSource } from '../services/lessons.datasource';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import {PageQuery} from '../course.actions';
import {selectLessonsLoading} from '../course.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;
  dataSource: LessonsDataSource;
  displayedColumns = ["seqNo","description","duration"];
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {

  }

  ngOnInit() {

      this.course = this.route.snapshot.data["course"];
      this.loading$ = this.store.pipe(select(selectLessonsLoading));
      this.dataSource = new LessonsDataSource(this.store);

      const initialPage: PageQuery = {
        pageIndex: 0,
        pageSize: 3
      };

      this.dataSource.loadLessons(this.course.id,initialPage);
  }

  ngAfterViewInit() {

    this.paginator.page
       .pipe(
         tap(() => this.loadLessonsPage())
       )
       .subscribe();
  }

  loadLessonsPage() {

    const newPage: PageQuery = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };

    this.dataSource.loadLessons(this.course.id, newPage);
  }

}
