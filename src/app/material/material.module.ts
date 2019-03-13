import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {NgModule} from "@angular/core";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatDialogModule,MatInputModule,MatCardModule,MatListModule,MatIconModule,MatToolbarModule],
  exports: [MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatDialogModule,MatInputModule,MatCardModule,MatListModule,MatIconModule,MatToolbarModule],
})

export class MaterialModule { }
