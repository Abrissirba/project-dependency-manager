import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyComponent } from '../base-components';

@Component({
  selector: 'app-table-search-header',
  templateUrl: './table-search-header.component.html',
  styleUrls: ['./table-search-header.component.scss']
})
export class TableSearchHeaderComponent extends OnDestroyComponent implements OnInit {

  @Output() search = new EventEmitter();

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
      this.formGroup = this.formBuilder.group({
        search: []
      });
  
      this.formGroup.get('search').valueChanges.pipe(takeUntil(this.destroy)).subscribe(val => this.search.next(val));
  }
}
