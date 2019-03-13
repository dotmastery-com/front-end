import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from "./service/socket.service";
import {MatDialog, MatDialogRef} from "@angular/material";
import {DialogUserComponent} from "./dialog-user/dialog-user.component";
import {User} from "./model/user";
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit, OnDestroy {

  public messages: Array<any>;
  public chatBox: string;
  dialogRef: MatDialogRef<DialogUserComponent> | null;
  user: User;


  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Welcome'
    }
  };

  public constructor(private socket: SocketService, public dialog: MatDialog,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.messages = [];
    this.chatBox = "";


    iconRegistry.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('assets/images/DotMastery.svg'));

  }

  public ngOnInit() {

    this.initModel();


    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);


  }

  public ngOnDestroy() {
    this.socket.close();
  }

  public send() {
    if(this.chatBox) {
      this.socket.send(this.user.username, this.chatBox);
      this.chatBox = "";
    }
  }

  public isSystemMessage(message: string) {
    return message.startsWith("/") ? "<strong>" + message.substring(1) + "</strong>" : message;
  }


  private openUserPopup(params): void {
    this.dialogRef = this.dialog.open(DialogUserComponent, params);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }

      this.user.username = paramsDialog.username;
      this.initIoConnection();

    });
  }


  private initIoConnection() {
    this.socket.getEventListener().subscribe(event => {

      if(event.type == "message") {
        let data = event.data.content;
        if(event.data.sender) {
          data = event.data.sender + ": " + data;
        }


        if (this.messages.length > 15) {
          this.messages = this.messages.slice(1,this.messages.length);
        }
        this.messages.push(data);

      }
      if(event.type == "close") {
        this.messages.push("/The socket connection has been closed");
      }
      if(event.type == "open") {
        this.messages.push("/The socket connection has been established");
      }
    });
  }

  private initModel(): void {
    const randomId = this.getRandomId();
    this.user = {
      id: randomId

    };
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

}
