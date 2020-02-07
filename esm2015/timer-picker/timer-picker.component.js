import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs';
import { HOURS, MINUTES, } from './timer-picker';
let MccTimerPickerComponent = class MccTimerPickerComponent {
    constructor() {
        /**
         * Receive selected _hour after confirm
         */
        this._selectedHour = '12';
        /**
         * Receive selected _minute after confirm
         */
        this._selectedMinute = '00';
        /**
         * Receive selected _period after confirm
         */
        this._selectedPeriod = 'am';
        this._clock = new BehaviorSubject(HOURS);
        this._focus = 'hour';
        this._hour = '12';
        this._minute = '00';
        this._period = 'am';
        this._hideButtons = false;
        /**
         * Format of the hour to be emited on confirm
         */
        this.format = '12';
        this.min = '00:00 am';
        this.max = '12:00 pm';
        /**
         * Change btnCancel label
         */
        this.btnCancel = 'Cancel';
        /**
         * Change btnConfirm label
         */
        this.btnConfirm = 'Ok';
        /**
         * Event emited when confirm button is pressed.
         * If buttons are hidden, the event is emited when value is changed
         */
        this.selected = new EventEmitter();
        /**
         * Set to true when timer picker have been connected with another component
         */
        this.connected = false;
    }
    /**
     * Current value (hour/minute) to create the clock
     */
    get clock$() {
        return this._clock.asObservable();
    }
    /**
     * Type there is in focus (hour/minute)
     */
    get focus() {
        return this._focus;
    }
    set focus(value) {
        if (value !== this._focus) {
            this._focus = value;
            this._clock.next(this._focus === 'hour' ? HOURS : MINUTES);
        }
    }
    /**
     * State of the overlay
     */
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = coerceBooleanProperty(value);
    }
    /**
     * Return temporary selected hour (const HOURS)
     */
    get hour() {
        return this._hour;
    }
    /**
     * Return temporary selected minute (const MINUTES)
     */
    get minute() {
        return this._minute;
    }
    /**
     * Return temporary selected period (am/pm)
     */
    get period() {
        return this._period;
    }
    /**
     * Hide Confirm and Cancel buttons
     */
    get hideButtons() {
        return this._hideButtons;
    }
    set hideButtons(value) {
        this._hideButtons = coerceBooleanProperty(value);
    }
    /**
     * Return timer option class to create line between the middle of the clock and
     * the option
     */
    getSelectedClass() {
        let name = 'selected-index-';
        if (this.focus === 'hour') {
            name += HOURS.findIndex(h => h === this.hour);
        }
        else {
            name += MINUTES.findIndex(m => m === this.minute);
        }
        return name;
    }
    /**
     * Select option from the clock.
     * @param value MccTimerPickerHour | MccTimerPickerMinute
     */
    select(value) {
        if (this.focus === 'hour') {
            this._hour = value;
            this.focus = 'min';
        }
        else {
            this._minute = value;
        }
        // if buttons are hidden, emit new event when value is changed
        if (this._hideButtons) {
            this.confirmSelectedTime();
        }
    }
    /**
     * Returns array containing time, hour and period fragments from time string
     * @param time string
     */
    parseTimeInput(time) {
        const parsed = time.split(/\s|:/).map((fragment, index) => {
            return index === 2 ? fragment : parseInt(fragment, 10);
        });
        if (parsed.length === 2) {
            // assume we are using 24 hour time format
            const hours = parsed[0];
            if (hours > 11) {
                parsed[0] = hours - 12;
                parsed.push('pm');
            }
            else {
                parsed.push('am');
            }
        }
        return parsed;
    }
    /**
     * Returns true if option value is not valid
     * @param value MccTimerPickerHour | MccTimerPickerMinute
     */
    isOptionDisabled(value) {
        const [minHour, minMinutes, minPeriod] = this.parseTimeInput(this.min);
        const [maxHour, maxMinutes, maxPeriod] = this.parseTimeInput(this.max);
        const optionValue = parseInt(value, 10);
        const selectedHour = parseInt(this._hour, 10);
        const selectedPeriod = this._period;
        if (this.focus === 'hour') {
            if (optionValue < minHour && selectedPeriod === minPeriod) {
                return true;
            }
            else if (optionValue > maxHour && selectedPeriod === maxPeriod) {
                return true;
            }
        }
        else {
            if (selectedHour === minHour && selectedPeriod === minPeriod && optionValue < minMinutes) {
                return true;
            }
            else if (selectedHour === maxHour && selectedPeriod === maxPeriod && optionValue > maxMinutes) {
                return true;
            }
        }
        return false;
    }
    /**
     * Change period of the clock
     * @param period MccTimerPickerPeriod
     */
    changePeriod(period) {
        this._period = period;
        // if buttons are hidden, emit new event when value is changed
        if (this._hideButtons) {
            this.confirmSelectedTime();
        }
    }
    /**
     * Update selected color, close the panel and notify the user
     */
    backdropClick() {
        this.confirmSelectedTime();
        this._isOpen = false;
    }
    /**
     * Change values to last confirm select time
     */
    cancelSelection() {
        this._hour = this._selectedHour;
        this._minute = this._selectedMinute;
        this._period = this._selectedPeriod;
        this._isOpen = false;
    }
    /**
     * Set new values of time and emit new event with the formated timer
     */
    confirmSelectedTime() {
        this._selectedHour = this.hour;
        this._selectedMinute = this.minute;
        this._selectedPeriod = this.period;
        // format string to emit selected time
        let formated;
        if (this.format === '12') {
            formated = `${this.hour}:${this.minute} ${this.period}`;
        }
        else {
            let hour = this.hour;
            if (this.period === 'pm') {
                hour = `${parseInt(hour) + 12}`;
            }
            formated = `${hour}:${this.minute}`;
        }
        this.selected.emit(formated);
        // only close automatically if button aren't hidden
        if (!this._hideButtons) {
            this._isOpen = false;
        }
    }
};
__decorate([
    Input()
], MccTimerPickerComponent.prototype, "hideButtons", null);
__decorate([
    Input('mccTimerPickerFormat')
], MccTimerPickerComponent.prototype, "format", void 0);
__decorate([
    Input('mccTimerPickerMin')
], MccTimerPickerComponent.prototype, "min", void 0);
__decorate([
    Input('mccTimerPickerMax')
], MccTimerPickerComponent.prototype, "max", void 0);
__decorate([
    Input()
], MccTimerPickerComponent.prototype, "btnCancel", void 0);
__decorate([
    Input()
], MccTimerPickerComponent.prototype, "btnConfirm", void 0);
__decorate([
    Output()
], MccTimerPickerComponent.prototype, "selected", void 0);
MccTimerPickerComponent = __decorate([
    Component({
        selector: 'mcc-timer-picker',
        template: "<!-- show component inside overlay -->\r\n<ng-container *ngIf=\"connected\">\r\n  <ng-template cdkConnectedOverlay cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"mcc-timer-picker-backdrop\" [cdkConnectedOverlayOrigin]=\"trigger\"\r\n    [cdkConnectedOverlayOpen]=\"isOpen\" (backdropClick)=\"backdropClick()\">\r\n\r\n    <ng-template [cdkPortalOutlet]=\"panelComponent\"></ng-template>\r\n\r\n  </ng-template>\r\n</ng-container>\r\n\r\n<ng-template *ngIf=\"!connected\" [cdkPortalOutlet]=\"panelComponent\"></ng-template>\r\n\r\n<ng-template cdkPortal #panelComponent=\"cdkPortal\">\r\n  <div class=\"mcc-timer-picker-overlay mat-elevation-z6\" role=\"dialog\" aria-label=\"Timer picker\">\r\n\r\n    <div class=\"mcc-timer-picker-header mat-primary\">\r\n      <button mat-icon-button class=\"mcc-timer-picker-hours\" [ngClass]=\"{ 'mcc-active': focus === 'hour' }\" (click)=\"focus = 'hour'\">\r\n        {{ hour }}\r\n      </button>\r\n      <span class=\"mcc-timer-picker-separator\"></span>\r\n      <button mat-icon-button class=\"mcc-timer-picker-minutes\" [ngClass]=\"{ 'mcc-active': focus === 'min' }\" (click)=\"focus = 'min'\">\r\n        {{ minute }}\r\n      </button>\r\n\r\n      <div class=\"mcc-timer-picker-am-pm\">\r\n        <button mat-icon-button [ngClass]=\"{ 'mcc-active': period === 'am' }\" (click)=\"changePeriod('am')\">\r\n          AM\r\n        </button>\r\n        <button mat-icon-button [ngClass]=\"{ 'mcc-active': period === 'pm' }\" (click)=\"changePeriod('pm')\">\r\n          PM\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mcc-timer-picker-content\">\r\n\r\n      <div class=\"mcc-timer-picker-clock\">\r\n        <div class=\"mcc-timer-picker-dot\"></div>\r\n        <div class=\"mcc-timer-picker-line\" [ngClass]=\"getSelectedClass()\"></div>\r\n        <ng-container *ngFor=\"let option of clock$ | async;let i = index;\">\r\n          <button mat-icon-button class=\"mcc-timer-picker-option\" [ngClass]=\"{ 'mcc-timer-picker-option-selected': focus === 'hour' && hour == option || focus === 'min' && minute === option }\"\r\n            [id]=\"'option-'+i\" (click)=\"select(option)\" [disabled]=\"isOptionDisabled(option)\">\r\n            {{ option }}\r\n          </button>\r\n        </ng-container>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div *ngIf=\"!hideButtons\" class=\"mcc-timer-picker-actions\" dir=\"rtl\">\r\n\r\n      <button mat-button role=\"button\" aria-label=\"Confirm\" (click)=\"confirmSelectedTime()\">\r\n        {{ btnConfirm }}\r\n      </button>\r\n\r\n      <button mat-button role=\"button\" aria-label=\"Cancel\" (click)=\"cancelSelection()\">\r\n        {{ btnCancel }}\r\n      </button>\r\n\r\n    </div>\r\n\r\n  </div>\r\n</ng-template>",
        preserveWhitespaces: false,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: ["@import url(https://fonts.googleapis.com/css?family=Roboto);.mcc-timer-picker-overlay{width:290px;height:400px}.mcc-timer-picker-header{display:flex;width:220px;height:65px;padding:10px 0 5px 70px;background:#00796b}.mcc-timer-picker-hours,.mcc-timer-picker-minutes{width:63px;height:63px;font-family:Roboto,sans-serif;font-size:50px;font-weight:400;color:rgba(255,255,255,.3)}.mcc-timer-picker-hours.mcc-standalone,.mcc-timer-picker-minutes.mcc-standalone{text-align:right}.mcc-timer-picker-hours.mcc-active,.mcc-timer-picker-minutes.mcc-active{color:#fff}.mcc-timer-picker-separator{font-family:Roboto,sans-serif;font-size:43px;font-weight:400;color:rgba(255,255,255,.3);margin:5px 5px 0 0}.mcc-timer-picker-separator::after{content:':'}.mcc-timer-picker-am-pm{display:flex;flex-direction:column;margin:10px}.mcc-timer-picker-am-pm button{width:25px;height:25px;line-height:25px;font-family:Roboto,sans-serif;font-size:12px;font-weight:400;color:rgba(255,255,255,.3)}.mcc-timer-picker-am-pm button.mcc-active{color:#fff}.mcc-timer-picker-content{width:inherit;height:260px;padding:15px 0 5px;background-color:#fff}.mcc-timer-picker-clock{position:relative;width:250px;height:250px;margin:0 auto;background-color:#eee;border-radius:50%;text-align:center}.mcc-timer-picker-clock .mcc-timer-picker-dot{position:absolute;width:8px;height:8px;border-radius:50%;background-color:#00796b;top:125px;left:125px}.mcc-timer-picker-clock .mcc-timer-picker-line{position:absolute;width:2px;height:100px;top:11.5%;left:51%;transform-origin:50% 100%;background-color:#00796b}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-0{transform:rotateZ(0);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-1{transform:rotateZ(327deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-2{transform:rotateZ(30deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-3{transform:rotateZ(300deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-4{transform:rotateZ(60deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-5{transform:rotateZ(270deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-6{transform:rotateZ(90deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-7{transform:rotateZ(240deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-8{transform:rotateZ(120deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-9{transform:rotateZ(210deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-10{transform:rotateZ(150deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-line.selected-index-11{transform:rotateZ(180deg);transition:240ms}.mcc-timer-picker-clock .mcc-timer-picker-option{position:absolute}.mcc-timer-picker-clock .mcc-timer-picker-option.mcc-timer-picker-option-selected{color:#fff;background-color:#00796b}.mcc-timer-picker-clock .mcc-timer-picker-option#option-0{top:0;left:113px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-1{top:25px;left:55px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-2{top:25px;right:55px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-3{top:63px;left:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-4{top:63px;right:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-5{top:113px;left:0}.mcc-timer-picker-clock .mcc-timer-picker-option#option-6{top:113px;right:0}.mcc-timer-picker-clock .mcc-timer-picker-option#option-7{bottom:55px;left:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-8{bottom:55px;right:20px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-9{bottom:20px;left:63px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-10{bottom:20px;right:55px}.mcc-timer-picker-clock .mcc-timer-picker-option#option-11{bottom:0;left:113px}.mcc-timer-picker-actions{display:flex;padding:4px;background-color:#fff}.mcc-timer-picker-actions button{color:#100214;text-transform:uppercase;font-family:Roboto,sans-serif;font-size:14px;font-weight:400}::ng-deep .mat-icon-button{width:30px;height:30px;line-height:30px}"]
    })
], MccTimerPickerComponent);
export { MccTimerPickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsidGltZXItcGlja2VyL3RpbWVyLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQU1MLEtBQUssRUFDTCxPQUFPLEdBQ1IsTUFBTSxnQkFBZ0IsQ0FBQztBQVN4QixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQXdIbEM7UUF2SEE7O1dBRUc7UUFDSyxrQkFBYSxHQUF1QixJQUFJLENBQUM7UUFFakQ7O1dBRUc7UUFDSyxvQkFBZSxHQUF5QixJQUFJLENBQUM7UUFFckQ7O1dBRUc7UUFDSyxvQkFBZSxHQUF5QixJQUFJLENBQUM7UUFRN0MsV0FBTSxHQUE4QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQWMvRCxXQUFNLEdBQTJCLE1BQU0sQ0FBQztRQW1CeEMsVUFBSyxHQUF1QixJQUFJLENBQUM7UUFRakMsWUFBTyxHQUF5QixJQUFJLENBQUM7UUFRckMsWUFBTyxHQUF5QixJQUFJLENBQUM7UUFZckMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFFdEM7O1dBRUc7UUFDNEIsV0FBTSxHQUF5QixJQUFJLENBQUM7UUFFdkMsUUFBRyxHQUFXLFVBQVUsQ0FBQztRQUV6QixRQUFHLEdBQVcsVUFBVSxDQUFDO1FBRXJEOztXQUVHO1FBQ00sY0FBUyxHQUFXLFFBQVEsQ0FBQztRQUV0Qzs7V0FFRztRQUNNLGVBQVUsR0FBVyxJQUFJ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UUFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O0tBQ2hELENBQUM7R0FDVyx1QkFBdUIsQ0EwUW5DO1NBMVFZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENka092ZXJsYXlPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1xyXG4gIE1jY1RpbWVyUGlja2VyVGltZVR5cGUsXHJcbiAgTWNjVGltZXJQaWNrZXJGb3JtYXQsXHJcbiAgTWNjVGltZXJQaWNrZXJIb3VyLFxyXG4gIE1jY1RpbWVyUGlja2VyTWludXRlLFxyXG4gIE1jY1RpbWVyUGlja2VyUGVyaW9kLFxyXG4gIEhPVVJTLFxyXG4gIE1JTlVURVMsXHJcbn0gZnJvbSAnLi90aW1lci1waWNrZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtY2MtdGltZXItcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGltZXItcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lci1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1jY1RpbWVyUGlja2VyQ29tcG9uZW50IHtcclxuICAvKipcclxuICAgKiBSZWNlaXZlIHNlbGVjdGVkIF9ob3VyIGFmdGVyIGNvbmZpcm1cclxuICAgKi9cclxuICBwcml2YXRlIF9zZWxlY3RlZEhvdXI6IE1jY1RpbWVyUGlja2VySG91ciA9ICcxMic7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY2VpdmUgc2VsZWN0ZWQgX21pbnV0ZSBhZnRlciBjb25maXJtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRNaW51dGU6IE1jY1RpbWVyUGlja2VyTWludXRlID0gJzAwJztcclxuXHJcbiAgLyoqXHJcbiAgICogUmVjZWl2ZSBzZWxlY3RlZCBfcGVyaW9kIGFmdGVyIGNvbmZpcm1cclxuICAgKi9cclxuICBwcml2YXRlIF9zZWxlY3RlZFBlcmlvZDogTWNjVGltZXJQaWNrZXJQZXJpb2QgPSAnYW0nO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHZhbHVlIChob3VyL21pbnV0ZSkgdG8gY3JlYXRlIHRoZSBjbG9ja1xyXG4gICAqL1xyXG4gIGdldCBjbG9jayQoKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Nsb2NrLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9jbG9jazogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoSE9VUlMpO1xyXG5cclxuICAvKipcclxuICAgKiBUeXBlIHRoZXJlIGlzIGluIGZvY3VzIChob3VyL21pbnV0ZSlcclxuICAgKi9cclxuICBnZXQgZm9jdXMoKTogTWNjVGltZXJQaWNrZXJUaW1lVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZm9jdXM7XHJcbiAgfVxyXG4gIHNldCBmb2N1cyh2YWx1ZTogTWNjVGltZXJQaWNrZXJUaW1lVHlwZSkge1xyXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9mb2N1cykge1xyXG4gICAgICB0aGlzLl9mb2N1cyA9IHZhbHVlO1xyXG4gICAgICB0aGlzLl9jbG9jay5uZXh0KHRoaXMuX2ZvY3VzID09PSAnaG91cicgPyBIT1VSUyA6IE1JTlVURVMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9mb2N1czogTWNjVGltZXJQaWNrZXJUaW1lVHlwZSA9ICdob3VyJztcclxuXHJcbiAgLyoqXHJcbiAgICogU3RhdGUgb2YgdGhlIG92ZXJsYXlcclxuICAgKi9cclxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcclxuICB9XHJcbiAgc2V0IGlzT3Blbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faXNPcGVuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGVtcG9yYXJ5IHNlbGVjdGVkIGhvdXIgKGNvbnN0IEhPVVJTKVxyXG4gICAqL1xyXG4gIGdldCBob3VyKCk6IE1jY1RpbWVyUGlja2VySG91ciB7XHJcbiAgICByZXR1cm4gdGhpcy5faG91cjtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaG91cjogTWNjVGltZXJQaWNrZXJIb3VyID0gJzEyJztcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRlbXBvcmFyeSBzZWxlY3RlZCBtaW51dGUgKGNvbnN0IE1JTlVURVMpXHJcbiAgICovXHJcbiAgZ2V0IG1pbnV0ZSgpOiBNY2NUaW1lclBpY2tlck1pbnV0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWludXRlO1xyXG4gIH1cclxuICBwcml2YXRlIF9taW51dGU6IE1jY1RpbWVyUGlja2VyTWludXRlID0gJzAwJztcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRlbXBvcmFyeSBzZWxlY3RlZCBwZXJpb2QgKGFtL3BtKVxyXG4gICAqL1xyXG4gIGdldCBwZXJpb2QoKTogTWNjVGltZXJQaWNrZXJQZXJpb2Qge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BlcmlvZDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfcGVyaW9kOiBNY2NUaW1lclBpY2tlclBlcmlvZCA9ICdhbSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUgQ29uZmlybSBhbmQgQ2FuY2VsIGJ1dHRvbnNcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBoaWRlQnV0dG9ucygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9oaWRlQnV0dG9ucztcclxuICB9XHJcbiAgc2V0IGhpZGVCdXR0b25zKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oaWRlQnV0dG9ucyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2hpZGVCdXR0b25zOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm1hdCBvZiB0aGUgaG91ciB0byBiZSBlbWl0ZWQgb24gY29uZmlybVxyXG4gICAqL1xyXG4gIEBJbnB1dCgnbWNjVGltZXJQaWNrZXJGb3JtYXQnKSBmb3JtYXQ6IE1jY1RpbWVyUGlja2VyRm9ybWF0ID0gJzEyJztcclxuXHJcbiAgQElucHV0KCdtY2NUaW1lclBpY2tlck1pbicpIG1pbjogc3RyaW5nID0gJzAwOjAwIGFtJztcclxuXHJcbiAgQElucHV0KCdtY2NUaW1lclBpY2tlck1heCcpIG1heDogc3RyaW5nID0gJzEyOjAwIHBtJztcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIGJ0bkNhbmNlbCBsYWJlbFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGJ0bkNhbmNlbDogc3RyaW5nID0gJ0NhbmNlbCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZSBidG5Db25maXJtIGxhYmVsXHJcbiAgICovXHJcbiAgQElucHV0KCkgYnRuQ29uZmlybTogc3RyaW5nID0gJ09rJztcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdGVkIHdoZW4gY29uZmlybSBidXR0b24gaXMgcHJlc3NlZC5cclxuICAgKiBJZiBidXR0b25zIGFyZSBoaWRkZW4sIHRoZSBldmVudCBpcyBlbWl0ZWQgd2hlbiB2YWx1ZSBpcyBjaGFuZ2VkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT3JpZ2luIHJlZmVyZW5jZSBvZiBjb25uZWN0ZWQgdGltZXIgcGlja2VyXHJcbiAgICovXHJcbiAgdHJpZ2dlcjogQ2RrT3ZlcmxheU9yaWdpbjtcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRvIHRydWUgd2hlbiB0aW1lciBwaWNrZXIgaGF2ZSBiZWVuIGNvbm5lY3RlZCB3aXRoIGFub3RoZXIgY29tcG9uZW50XHJcbiAgICovXHJcbiAgY29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aW1lciBvcHRpb24gY2xhc3MgdG8gY3JlYXRlIGxpbmUgYmV0d2VlbiB0aGUgbWlkZGxlIG9mIHRoZSBjbG9jayBhbmRcclxuICAgKiB0aGUgb3B0aW9uXHJcbiAgICovXHJcbiAgZ2V0U2VsZWN0ZWRDbGFzcygpOiBzdHJpbmcge1xyXG4gICAgbGV0IG5hbWUgPSAnc2VsZWN0ZWQtaW5kZXgtJztcclxuICAgIGlmICh0aGlzLmZvY3VzID09PSAnaG91cicpIHtcclxuICAgICAgbmFtZSArPSBIT1VSUy5maW5kSW5kZXgoaCA9PiBoID09PSB0aGlzLmhvdXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmFtZSArPSBNSU5VVEVTLmZpbmRJbmRleChtID0+IG0gPT09IHRoaXMubWludXRlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbGVjdCBvcHRpb24gZnJvbSB0aGUgY2xvY2suXHJcbiAgICogQHBhcmFtIHZhbHVlIE1jY1RpbWVyUGlja2VySG91ciB8IE1jY1RpbWVyUGlja2VyTWludXRlXHJcbiAgICovXHJcbiAgc2VsZWN0KHZhbHVlOiBNY2NUaW1lclBpY2tlckhvdXIgfCBNY2NUaW1lclBpY2tlck1pbnV0ZSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZm9jdXMgPT09ICdob3VyJykge1xyXG4gICAgICB0aGlzLl9ob3VyID0gPE1jY1RpbWVyUGlja2VySG91cj52YWx1ZTtcclxuICAgICAgdGhpcy5mb2N1cyA9ICdtaW4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fbWludXRlID0gPE1jY1RpbWVyUGlja2VyTWludXRlPnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGJ1dHRvbnMgYXJlIGhpZGRlbiwgZW1pdCBuZXcgZXZlbnQgd2hlbiB2YWx1ZSBpcyBjaGFuZ2VkXHJcbiAgICBpZiAodGhpcy5faGlkZUJ1dHRvbnMpIHtcclxuICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRUaW1lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFycmF5IGNvbnRhaW5pbmcgdGltZSwgaG91ciBhbmQgcGVyaW9kIGZyYWdtZW50cyBmcm9tIHRpbWUgc3RyaW5nXHJcbiAgICogQHBhcmFtIHRpbWUgc3RyaW5nXHJcbiAgICovXHJcbiAgcGFyc2VUaW1lSW5wdXQodGltZTogc3RyaW5nKTogW251bWJlciwgbnVtYmVyLCBzdHJpbmddIHtcclxuICAgIGNvbnN0IHBhcnNlZCA9IHRpbWUuc3BsaXQoL1xcc3w6LykubWFwKChmcmFnbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgcmV0dXJuIGluZGV4ID09PSAyID8gZnJhZ21lbnQgOiBwYXJzZUludChmcmFnbWVudCwgMTApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHBhcnNlZC5sZW5ndGggPT09IDIpIHtcclxuICAgICAgLy8gYXNzdW1lIHdlIGFyZSB1c2luZyAyNCBob3VyIHRpbWUgZm9ybWF0XHJcbiAgICAgIGNvbnN0IGhvdXJzID0gcGFyc2VkWzBdIGFzIG51bWJlcjtcclxuICAgICAgaWYgKGhvdXJzID4gMTEpIHtcclxuICAgICAgICBwYXJzZWRbMF0gPSBob3VycyAtIDEyO1xyXG4gICAgICAgIHBhcnNlZC5wdXNoKCdwbScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhcnNlZC5wdXNoKCdhbScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhcnNlZCBhcyBbbnVtYmVyLCBudW1iZXIsIHN0cmluZ107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgaWYgb3B0aW9uIHZhbHVlIGlzIG5vdCB2YWxpZFxyXG4gICAqIEBwYXJhbSB2YWx1ZSBNY2NUaW1lclBpY2tlckhvdXIgfCBNY2NUaW1lclBpY2tlck1pbnV0ZVxyXG4gICAqL1xyXG4gIGlzT3B0aW9uRGlzYWJsZWQodmFsdWU6IE1jY1RpbWVyUGlja2VySG91ciB8IE1jY1RpbWVyUGlja2VyTWludXRlKTogYm9vbGVhbiB7XHJcblxyXG4gICAgY29uc3QgW21pbkhvdXIsIG1pbk1pbnV0ZXMsIG1pblBlcmlvZF0gPSB0aGlzLnBhcnNlVGltZUlucHV0KHRoaXMubWluKTtcclxuICAgIGNvbnN0IFttYXhIb3VyLCBtYXhNaW51dGVzLCBtYXhQZXJpb2RdID0gdGhpcy5wYXJzZVRpbWVJbnB1dCh0aGlzLm1heCk7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRIb3VyID0gcGFyc2VJbnQodGhpcy5faG91ciwgMTApO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRQZXJpb2QgPSB0aGlzLl9wZXJpb2Q7XHJcblxyXG4gICAgaWYgKHRoaXMuZm9jdXMgPT09ICdob3VyJykge1xyXG4gICAgICBpZiAob3B0aW9uVmFsdWUgPCBtaW5Ib3VyICYmIHNlbGVjdGVkUGVyaW9kID09PSBtaW5QZXJpb2QpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmIChvcHRpb25WYWx1ZSA+IG1heEhvdXIgJiYgc2VsZWN0ZWRQZXJpb2QgPT09IG1heFBlcmlvZCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoc2VsZWN0ZWRIb3VyID09PSBtaW5Ib3VyICYmIHNlbGVjdGVkUGVyaW9kID09PSBtaW5QZXJpb2QgJiYgb3B0aW9uVmFsdWUgPCBtaW5NaW51dGVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRIb3VyID09PSBtYXhIb3VyICYmIHNlbGVjdGVkUGVyaW9kID09PSBtYXhQZXJpb2QgJiYgb3B0aW9uVmFsdWUgPiBtYXhNaW51dGVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgcGVyaW9kIG9mIHRoZSBjbG9ja1xyXG4gICAqIEBwYXJhbSBwZXJpb2QgTWNjVGltZXJQaWNrZXJQZXJpb2RcclxuICAgKi9cclxuICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBNY2NUaW1lclBpY2tlclBlcmlvZCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcGVyaW9kID0gcGVyaW9kO1xyXG4gICAgLy8gaWYgYnV0dG9ucyBhcmUgaGlkZGVuLCBlbWl0IG5ldyBldmVudCB3aGVuIHZhbHVlIGlzIGNoYW5nZWRcclxuICAgIGlmICh0aGlzLl9oaWRlQnV0dG9ucykge1xyXG4gICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFRpbWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBzZWxlY3RlZCBjb2xvciwgY2xvc2UgdGhlIHBhbmVsIGFuZCBub3RpZnkgdGhlIHVzZXJcclxuICAgKi9cclxuICBiYWNrZHJvcENsaWNrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb25maXJtU2VsZWN0ZWRUaW1lKCk7XHJcbiAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZSB2YWx1ZXMgdG8gbGFzdCBjb25maXJtIHNlbGVjdCB0aW1lXHJcbiAgICovXHJcbiAgY2FuY2VsU2VsZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5faG91ciA9IHRoaXMuX3NlbGVjdGVkSG91cjtcclxuICAgIHRoaXMuX21pbnV0ZSA9IHRoaXMuX3NlbGVjdGVkTWludXRlO1xyXG4gICAgdGhpcy5fcGVyaW9kID0gdGhpcy5fc2VsZWN0ZWRQZXJpb2Q7XHJcbiAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBuZXcgdmFsdWVzIG9mIHRpbWUgYW5kIGVtaXQgbmV3IGV2ZW50IHdpdGggdGhlIGZvcm1hdGVkIHRpbWVyXHJcbiAgICovXHJcbiAgY29uZmlybVNlbGVjdGVkVGltZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkSG91ciA9IHRoaXMuaG91cjtcclxuICAgIHRoaXMuX3NlbGVjdGVkTWludXRlID0gdGhpcy5taW51dGU7XHJcbiAgICB0aGlzLl9zZWxlY3RlZFBlcmlvZCA9IHRoaXMucGVyaW9kO1xyXG5cclxuICAgIC8vIGZvcm1hdCBzdHJpbmcgdG8gZW1pdCBzZWxlY3RlZCB0aW1lXHJcbiAgICBsZXQgZm9ybWF0ZWQ6IHN0cmluZztcclxuICAgIGlmICh0aGlzLmZvcm1hdCA9PT0gJzEyJykge1xyXG4gICAgICBmb3JtYXRlZCA9IGAke3RoaXMuaG91cn06JHt0aGlzLm1pbnV0ZX0gJHt0aGlzLnBlcmlvZH1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGhvdXI6IHN0cmluZyA9IHRoaXMuaG91cjtcclxuICAgICAgaWYgKHRoaXMucGVyaW9kID09PSAncG0nKSB7XHJcbiAgICAgICAgaG91ciA9IGAke3BhcnNlSW50KGhvdXIpICsgMTJ9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9ybWF0ZWQgPSBgJHtob3VyfToke3RoaXMubWludXRlfWA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZC5lbWl0KGZvcm1hdGVkKTtcclxuXHJcbiAgICAvLyBvbmx5IGNsb3NlIGF1dG9tYXRpY2FsbHkgaWYgYnV0dG9uIGFyZW4ndCBoaWRkZW5cclxuICAgIGlmICghdGhpcy5faGlkZUJ1dHRvbnMpIHtcclxuICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==