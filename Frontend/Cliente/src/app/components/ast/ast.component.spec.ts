import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASTComponent } from './ast.component';

describe('ASTComponent', () => {
  let component: ASTComponent;
  let fixture: ComponentFixture<ASTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ASTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ASTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
