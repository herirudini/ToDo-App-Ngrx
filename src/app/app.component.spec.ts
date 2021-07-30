import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
// import * as MaterialModule from '@angular/material'
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoComponent } from './components/todo/todo.component';

describe('AppComponent', () => {
  const storeMock = jasmine.createSpyObj('Store', ['select']);
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    storeMock.select.and.returnValue(
      of({
        structure: [],
        buttons: [45, 23, -8, -12],
        bars: [15, 34, 7, 87],
        limit: 150,
        isLoading: false,
        error: '',
      })
    );
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}, {})
      ],
      declarations: [
        AppComponent,
        TodoComponent,
        TodoFormComponent,
        TodoListComponent
      ],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('todo-app');
    // const compiled = fixture.nativeElement;
    // expect(compiled.querySelector('title').textContent).toEqual('Todo App');
  });

  it('should render notification as "todo-app is running!" ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toEqual('todo-app app is running!');
  });

  it(`should render completeDos`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    console.log(app.completeToDos)
    expect(app.completeToDos).toContain({ task: 'Use NgRx in my to-do app' });
    // const compiled = fixture.nativeElement;
    // expect(compiled.querySelector('completed-list').getText)
    //   .toContain('Use NgRx in my to-do app');
  });

  it(`should render incompleteDos`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('incomplete-list'))
      .toContain('Watch Ozark Season 2');
  });

  it('should call function addToDo', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(app, 'addToDo');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(app.addToDo).toHaveBeenCalled(

    );

  }));

});

