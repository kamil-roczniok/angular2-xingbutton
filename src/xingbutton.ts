/**
 * Created by sialcasa on 17.02.16.
 /*
 * (C) Copyright 2016 Alexander Casall and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {ElementRef} from "angular2/core";
import {HostBinding} from "angular2/core";
import {HostListener} from "angular2/core";
import {Directive} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {Output} from "angular2/core";

@Directive({
    selector: 'xing-login'
})

export class XingLogin implements AfterViewInit {

    //TODO rerender component, when input changes
    @Input() consumerKey:string;
    @Input() language:string = "en";
    @Input() size:string = "medium";
    @Input() color:string = "green";

    @Output() onLoginSucceded:EventEmitter<any> = new EventEmitter();
    @Output() onLoginFailed:EventEmitter<any> = new EventEmitter();

    constructor(private el:ElementRef) {
    }

    ngAfterViewInit():any {
        this.renderXingConfigParams();
        this.renderXingCallbackHandler();
        this.renderXingLoginButton();
    }

    @HostListener('xing-login-event', ['$event.detail'])
    onXingAuth(response:any) {
        //TODO Transform error and response to DTO
        if(response.user){
            this.onLoginSucceded.emit(response.user);
        }
        if(response.error){
            this.onLoginFailed.emit(response.error);
        }
    }

    private renderXingLoginButton() {
        let activationScript = document.createElement('script');
        activationScript.text = `
      (function(d) {
        var js, id='lwx';
        if (d.getElementById(id)) return;
        js = d.createElement('script'); js.id = id; js.src = "https://www.xing-share.com/plugins/login.js";
        d.getElementsByTagName('xing-login')[0].appendChild(js)
       }(document));
    `
        this.el.nativeElement.appendChild(activationScript);
    };

    private renderXingCallbackHandler() {
        let callbackScript = document.createElement('script');
        callbackScript.text = `function onXingAuthLogin(response) {
        var output;
        var event = new CustomEvent("xing-login-event", {
            detail: {
                error: response.error,
                user: response.user
            }
        });
        document.getElementsByTagName('xing-login')[0].dispatchEvent(event);
      }`;
        this.el.nativeElement.appendChild(callbackScript);
    };

    private renderXingConfigParams() {
        let consumerKey = document.createElement('script');
        consumerKey.setAttribute('type', 'xing/login');
        consumerKey.text = `
      {
        "consumer_key": "` + this.consumerKey + `",
        "language": "` + this.language + `",
        "size": "` + this.size + `",
        "color": "` + this.color + `"
      }
    `;
        this.el.nativeElement.appendChild(consumerKey);
    };
}
