import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandListComponent } from './command-list.component';
import { CommandService } from './command.service';
import { CmdDetailService } from './cmd-detail.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CommandListComponent
  ],
  exports : [
    CommandListComponent
  ],
  providers : [
    CommandService,
    CmdDetailService

  ]
})
export class CommandListModule { }
