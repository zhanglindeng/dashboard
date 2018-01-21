import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LogComponent } from './log.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LogRoutingModule
  ],
  declarations: [LogComponent]
})
export class LogModule { }
