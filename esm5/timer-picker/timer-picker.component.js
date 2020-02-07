import { __decorate, __read } from "tslib";
import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs';
import { HOURS, MINUTES, } from './timer-picker';
var MccTimerPickerComponent = /** @class */ (function () {
    function MccTimerPickerComponent() {
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
    Object.defineProperty(MccTimerPickerComponent.prototype, "clock$", {
        /**
         * Current value (hour/minute) to create the clock
         */
        get: function () {
            return this._clock.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccTimerPickerComponent.prototype, "focus", {
        /**
         * Type there is in focus (hour/minute)
         */
        get: function () {
            return this._focus;
        },
        set: function (value) {
            if (value !== this._focus) {
                this._focus = value;
                this._clock.next(this._focus === 'hour' ? HOURS : MINUTES);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccTimerPickerComponent.prototype, "isOpen", {
        /**
         * State of the overlay
         */
        get: function () {
            return this._isOpen;
        },
        set: function (value) {
            this._isOpen = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccTimerPickerComponent.prototype, "hour", {
        /**
         * Return temporary selected hour (const HOURS)
         */
        get: function () {
            return this._hour;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccTimerPickerComponent.prototype, "minute", {
        /**
         * Return temporary selected minute (const MINUTES)
         */
        get: function () {
            return this._minute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccTimerPickerComponent.prototype, "period", {
        /**
         * Return temporary selected period (am/pm)
         */
        get: function () {
            return this._period;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccTimerPickerComponent.prototype, "hideButtons", {
        /**
         * Hide Confirm and Cancel buttons
         */
        get: function () {
            return this._hideButtons;
        },
        set: function (value) {
            this._hideButtons = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Return timer option class to create line between the middle of the clock and
     * the option
     */
    MccTimerPickerComponent.prototype.getSelectedClass = function () {
        var _this = this;
        var name = 'selected-index-';
        if (this.focus === 'hour') {
            name += HOURS.findIndex(function (h) { return h === _this.hour; });
        }
        else {
            name += MINUTES.findIndex(function (m) { return m === _this.minute; });
        }
        return name;
    };
    /**
     * Select option from the clock.
     * @param value MccTimerPickerHour | MccTimerPickerMinute
     */
    MccTimerPickerComponent.prototype.select = function (value) {
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
    };
    /**
     * Returns array containing time, hour and period fragments from time string
     * @param time string
     */
    MccTimerPickerComponent.prototype.parseTimeInput = function (time) {
        var parsed = time.split(/\s|:/).map(function (fragment, index) {
            return index === 2 ? fragment : parseInt(fragment, 10);
        });
        if (parsed.length === 2) {
            // assume we are using 24 hour time format
            var hours = parsed[0];
            if (hours > 11) {
                parsed[0] = hours - 12;
                parsed.push('pm');
            }
            else {
                parsed.push('am');
            }
        }
        return parsed;
    };
    /**
     * Returns true if option value is not valid
     * @param value MccTimerPickerHour | MccTimerPickerMinute
     */
    MccTimerPickerComponent.prototype.isOptionDisabled = function (value) {
        var _a = __read(this.parseTimeInput(this.min), 3), minHour = _a[0], minMinutes = _a[1], minPeriod = _a[2];
        var _b = __read(this.parseTimeInput(this.max), 3), maxHour = _b[0], maxMinutes = _b[1], maxPeriod = _b[2];
        var optionValue = parseInt(value, 10);
        var selectedHour = parseInt(this._hour, 10);
        var selectedPeriod = this._period;
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
    };
    /**
     * Change period of the clock
     * @param period MccTimerPickerPeriod
     */
    MccTimerPickerComponent.prototype.changePeriod = function (period) {
        this._period = period;
        // if buttons are hidden, emit new event when value is changed
        if (this._hideButtons) {
            this.confirmSelectedTime();
        }
    };
    /**
     * Update selected color, close the panel and notify the user
     */
    MccTimerPickerComponent.prototype.backdropClick = function () {
        this.confirmSelectedTime();
        this._isOpen = false;
    };
    /**
     * Change values to last confirm select time
     */
    MccTimerPickerComponent.prototype.cancelSelection = function () {
        this._hour = this._selectedHour;
        this._minute = this._selectedMinute;
        this._period = this._selectedPeriod;
        this._isOpen = false;
    };
    /**
     * Set new values of time and emit new event with the formated timer
     */
    MccTimerPickerComponent.prototype.confirmSelectedTime = function () {
        this._selectedHour = this.hour;
        this._selectedMinute = this.minute;
        this._selectedPeriod = this.period;
        // format string to emit selected time
        var formated;
        if (this.format === '12') {
            formated = this.hour + ":" + this.minute + " " + this.period;
        }
        else {
            var hour = this.hour;
            if (this.period === 'pm') {
                hour = "" + (parseInt(hour) + 12);
            }
            formated = hour + ":" + this.minute;
        }
        this.selected.emit(formated);
        // only close automatically if button aren't hidden
        if (!this._hideButtons) {
            this._isOpen = false;
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
    return MccTimerPickerComponent;
}());
export { MccTimerPickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsidGltZXItcGlja2VyL3RpbWVyLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQU1MLEtBQUssRUFDTCxPQUFPLEdBQ1IsTUFBTSxnQkFBZ0IsQ0FBQztBQVN4QjtJQXdIRTtRQXZIQTs7V0FFRztRQUNLLGtCQUFhLEdBQXVCLElBQUksQ0FBQztRQUVqRDs7V0FFRztRQUNLLG9CQUFlLEdBQXlCLElBQUksQ0FBQztRQUVyRDs7V0FFRztRQUNLLG9CQUFlLEdBQXlCLElBQUksQ0FBQztRQVE3QyxXQUFNLEdBQThCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBYy9ELFdBQU0sR0FBMkIsTUFBTSxDQUFDO1FBbUJ4QyxVQUFLLEdBQXVCLElBQUksQ0FBQztRQVFqQyxZQUFPLEdBQXlCLElBQUksQ0FBQztRQVFyQyxZQUFPLEdBQXlCLElBQUksQ0FBQztRQVlyQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUV0Qzs7V0FFRztRQUM0QixXQUFNLEdBQXlCLElBQUksQ0FBQztRQUV2QyxRQUFHLEdBQVcsVUFBVSxDQUFDO1FBRXpCLFFBQUcsR0FBVyxVQUFVLENBQUM7UUFFckQ7O1dBRUc7UUFDTSxjQUFTLEdBQVcsUUFBUSxDQUFDO1FBRXRDOztXQUVHO1FBQ00sZUFBVSxHQUFXLElBQUksQ0FBQztRQUVuQzs7O1dBR0c7UUFDTyxhQUFRLEdB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QUs7WUFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7T0FDVyx1QkFBdUIsQ0EwUW5DO0lBQUQsOEJBQUM7Q0FBQSxBQTFRRCxJQTBRQztTQTFRWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDZGtPdmVybGF5T3JpZ2luIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtcclxuICBNY2NUaW1lclBpY2tlclRpbWVUeXBlLFxyXG4gIE1jY1RpbWVyUGlja2VyRm9ybWF0LFxyXG4gIE1jY1RpbWVyUGlja2VySG91cixcclxuICBNY2NUaW1lclBpY2tlck1pbnV0ZSxcclxuICBNY2NUaW1lclBpY2tlclBlcmlvZCxcclxuICBIT1VSUyxcclxuICBNSU5VVEVTLFxyXG59IGZyb20gJy4vdGltZXItcGlja2VyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWNjLXRpbWVyLXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVyLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGltZXItcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNY2NUaW1lclBpY2tlckNvbXBvbmVudCB7XHJcbiAgLyoqXHJcbiAgICogUmVjZWl2ZSBzZWxlY3RlZCBfaG91ciBhZnRlciBjb25maXJtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRIb3VyOiBNY2NUaW1lclBpY2tlckhvdXIgPSAnMTInO1xyXG5cclxuICAvKipcclxuICAgKiBSZWNlaXZlIHNlbGVjdGVkIF9taW51dGUgYWZ0ZXIgY29uZmlybVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3NlbGVjdGVkTWludXRlOiBNY2NUaW1lclBpY2tlck1pbnV0ZSA9ICcwMCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlY2VpdmUgc2VsZWN0ZWQgX3BlcmlvZCBhZnRlciBjb25maXJtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRQZXJpb2Q6IE1jY1RpbWVyUGlja2VyUGVyaW9kID0gJ2FtJztcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCB2YWx1ZSAoaG91ci9taW51dGUpIHRvIGNyZWF0ZSB0aGUgY2xvY2tcclxuICAgKi9cclxuICBnZXQgY2xvY2skKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcclxuICAgIHJldHVybiB0aGlzLl9jbG9jay5hc09ic2VydmFibGUoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY2xvY2s6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KEhPVVJTKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVHlwZSB0aGVyZSBpcyBpbiBmb2N1cyAoaG91ci9taW51dGUpXHJcbiAgICovXHJcbiAgZ2V0IGZvY3VzKCk6IE1jY1RpbWVyUGlja2VyVGltZVR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzO1xyXG4gIH1cclxuICBzZXQgZm9jdXModmFsdWU6IE1jY1RpbWVyUGlja2VyVGltZVR5cGUpIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fZm9jdXMpIHtcclxuICAgICAgdGhpcy5fZm9jdXMgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5fY2xvY2submV4dCh0aGlzLl9mb2N1cyA9PT0gJ2hvdXInID8gSE9VUlMgOiBNSU5VVEVTKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfZm9jdXM6IE1jY1RpbWVyUGlja2VyVGltZVR5cGUgPSAnaG91cic7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXRlIG9mIHRoZSBvdmVybGF5XHJcbiAgICovXHJcbiAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc09wZW47XHJcbiAgfVxyXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzT3BlbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRlbXBvcmFyeSBzZWxlY3RlZCBob3VyIChjb25zdCBIT1VSUylcclxuICAgKi9cclxuICBnZXQgaG91cigpOiBNY2NUaW1lclBpY2tlckhvdXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hvdXI7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2hvdXI6IE1jY1RpbWVyUGlja2VySG91ciA9ICcxMic7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0ZW1wb3Jhcnkgc2VsZWN0ZWQgbWludXRlIChjb25zdCBNSU5VVEVTKVxyXG4gICAqL1xyXG4gIGdldCBtaW51dGUoKTogTWNjVGltZXJQaWNrZXJNaW51dGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX21pbnV0ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWludXRlOiBNY2NUaW1lclBpY2tlck1pbnV0ZSA9ICcwMCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0ZW1wb3Jhcnkgc2VsZWN0ZWQgcGVyaW9kIChhbS9wbSlcclxuICAgKi9cclxuICBnZXQgcGVyaW9kKCk6IE1jY1RpbWVyUGlja2VyUGVyaW9kIHtcclxuICAgIHJldHVybiB0aGlzLl9wZXJpb2Q7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3BlcmlvZDogTWNjVGltZXJQaWNrZXJQZXJpb2QgPSAnYW0nO1xyXG5cclxuICAvKipcclxuICAgKiBIaWRlIENvbmZpcm0gYW5kIENhbmNlbCBidXR0b25zXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgaGlkZUJ1dHRvbnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlkZUJ1dHRvbnM7XHJcbiAgfVxyXG4gIHNldCBoaWRlQnV0dG9ucyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faGlkZUJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9oaWRlQnV0dG9uczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBGb3JtYXQgb2YgdGhlIGhvdXIgdG8gYmUgZW1pdGVkIG9uIGNvbmZpcm1cclxuICAgKi9cclxuICBASW5wdXQoJ21jY1RpbWVyUGlja2VyRm9ybWF0JykgZm9ybWF0OiBNY2NUaW1lclBpY2tlckZvcm1hdCA9ICcxMic7XHJcblxyXG4gIEBJbnB1dCgnbWNjVGltZXJQaWNrZXJNaW4nKSBtaW46IHN0cmluZyA9ICcwMDowMCBhbSc7XHJcblxyXG4gIEBJbnB1dCgnbWNjVGltZXJQaWNrZXJNYXgnKSBtYXg6IHN0cmluZyA9ICcxMjowMCBwbSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZSBidG5DYW5jZWwgbGFiZWxcclxuICAgKi9cclxuICBASW5wdXQoKSBidG5DYW5jZWw6IHN0cmluZyA9ICdDYW5jZWwnO1xyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgYnRuQ29uZmlybSBsYWJlbFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGJ0bkNvbmZpcm06IHN0cmluZyA9ICdPayc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXRlZCB3aGVuIGNvbmZpcm0gYnV0dG9uIGlzIHByZXNzZWQuXHJcbiAgICogSWYgYnV0dG9ucyBhcmUgaGlkZGVuLCB0aGUgZXZlbnQgaXMgZW1pdGVkIHdoZW4gdmFsdWUgaXMgY2hhbmdlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9yaWdpbiByZWZlcmVuY2Ugb2YgY29ubmVjdGVkIHRpbWVyIHBpY2tlclxyXG4gICAqL1xyXG4gIHRyaWdnZXI6IENka092ZXJsYXlPcmlnaW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0byB0cnVlIHdoZW4gdGltZXIgcGlja2VyIGhhdmUgYmVlbiBjb25uZWN0ZWQgd2l0aCBhbm90aGVyIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIGNvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGltZXIgb3B0aW9uIGNsYXNzIHRvIGNyZWF0ZSBsaW5lIGJldHdlZW4gdGhlIG1pZGRsZSBvZiB0aGUgY2xvY2sgYW5kXHJcbiAgICogdGhlIG9wdGlvblxyXG4gICAqL1xyXG4gIGdldFNlbGVjdGVkQ2xhc3MoKTogc3RyaW5nIHtcclxuICAgIGxldCBuYW1lID0gJ3NlbGVjdGVkLWluZGV4LSc7XHJcbiAgICBpZiAodGhpcy5mb2N1cyA9PT0gJ2hvdXInKSB7XHJcbiAgICAgIG5hbWUgKz0gSE9VUlMuZmluZEluZGV4KGggPT4gaCA9PT0gdGhpcy5ob3VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5hbWUgKz0gTUlOVVRFUy5maW5kSW5kZXgobSA9PiBtID09PSB0aGlzLm1pbnV0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZWxlY3Qgb3B0aW9uIGZyb20gdGhlIGNsb2NrLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSBNY2NUaW1lclBpY2tlckhvdXIgfCBNY2NUaW1lclBpY2tlck1pbnV0ZVxyXG4gICAqL1xyXG4gIHNlbGVjdCh2YWx1ZTogTWNjVGltZXJQaWNrZXJIb3VyIHwgTWNjVGltZXJQaWNrZXJNaW51dGUpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmZvY3VzID09PSAnaG91cicpIHtcclxuICAgICAgdGhpcy5faG91ciA9IDxNY2NUaW1lclBpY2tlckhvdXI+dmFsdWU7XHJcbiAgICAgIHRoaXMuZm9jdXMgPSAnbWluJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX21pbnV0ZSA9IDxNY2NUaW1lclBpY2tlck1pbnV0ZT52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiBidXR0b25zIGFyZSBoaWRkZW4sIGVtaXQgbmV3IGV2ZW50IHdoZW4gdmFsdWUgaXMgY2hhbmdlZFxyXG4gICAgaWYgKHRoaXMuX2hpZGVCdXR0b25zKSB7XHJcbiAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkVGltZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhcnJheSBjb250YWluaW5nIHRpbWUsIGhvdXIgYW5kIHBlcmlvZCBmcmFnbWVudHMgZnJvbSB0aW1lIHN0cmluZ1xyXG4gICAqIEBwYXJhbSB0aW1lIHN0cmluZ1xyXG4gICAqL1xyXG4gIHBhcnNlVGltZUlucHV0KHRpbWU6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlciwgc3RyaW5nXSB7XHJcbiAgICBjb25zdCBwYXJzZWQgPSB0aW1lLnNwbGl0KC9cXHN8Oi8pLm1hcCgoZnJhZ21lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgIHJldHVybiBpbmRleCA9PT0gMiA/IGZyYWdtZW50IDogcGFyc2VJbnQoZnJhZ21lbnQsIDEwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChwYXJzZWQubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgIC8vIGFzc3VtZSB3ZSBhcmUgdXNpbmcgMjQgaG91ciB0aW1lIGZvcm1hdFxyXG4gICAgICBjb25zdCBob3VycyA9IHBhcnNlZFswXSBhcyBudW1iZXI7XHJcbiAgICAgIGlmIChob3VycyA+IDExKSB7XHJcbiAgICAgICAgcGFyc2VkWzBdID0gaG91cnMgLSAxMjtcclxuICAgICAgICBwYXJzZWQucHVzaCgncG0nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJzZWQucHVzaCgnYW0nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXJzZWQgYXMgW251bWJlciwgbnVtYmVyLCBzdHJpbmddO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIG9wdGlvbiB2YWx1ZSBpcyBub3QgdmFsaWRcclxuICAgKiBAcGFyYW0gdmFsdWUgTWNjVGltZXJQaWNrZXJIb3VyIHwgTWNjVGltZXJQaWNrZXJNaW51dGVcclxuICAgKi9cclxuICBpc09wdGlvbkRpc2FibGVkKHZhbHVlOiBNY2NUaW1lclBpY2tlckhvdXIgfCBNY2NUaW1lclBpY2tlck1pbnV0ZSk6IGJvb2xlYW4ge1xyXG5cclxuICAgIGNvbnN0IFttaW5Ib3VyLCBtaW5NaW51dGVzLCBtaW5QZXJpb2RdID0gdGhpcy5wYXJzZVRpbWVJbnB1dCh0aGlzLm1pbik7XHJcbiAgICBjb25zdCBbbWF4SG91ciwgbWF4TWludXRlcywgbWF4UGVyaW9kXSA9IHRoaXMucGFyc2VUaW1lSW5wdXQodGhpcy5tYXgpO1xyXG5cclxuICAgIGNvbnN0IG9wdGlvblZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkSG91ciA9IHBhcnNlSW50KHRoaXMuX2hvdXIsIDEwKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkUGVyaW9kID0gdGhpcy5fcGVyaW9kO1xyXG5cclxuICAgIGlmICh0aGlzLmZvY3VzID09PSAnaG91cicpIHtcclxuICAgICAgaWYgKG9wdGlvblZhbHVlIDwgbWluSG91ciAmJiBzZWxlY3RlZFBlcmlvZCA9PT0gbWluUGVyaW9kKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9uVmFsdWUgPiBtYXhIb3VyICYmIHNlbGVjdGVkUGVyaW9kID09PSBtYXhQZXJpb2QpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHNlbGVjdGVkSG91ciA9PT0gbWluSG91ciAmJiBzZWxlY3RlZFBlcmlvZCA9PT0gbWluUGVyaW9kICYmIG9wdGlvblZhbHVlIDwgbWluTWludXRlcykge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkSG91ciA9PT0gbWF4SG91ciAmJiBzZWxlY3RlZFBlcmlvZCA9PT0gbWF4UGVyaW9kICYmIG9wdGlvblZhbHVlID4gbWF4TWludXRlcykge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIHBlcmlvZCBvZiB0aGUgY2xvY2tcclxuICAgKiBAcGFyYW0gcGVyaW9kIE1jY1RpbWVyUGlja2VyUGVyaW9kXHJcbiAgICovXHJcbiAgY2hhbmdlUGVyaW9kKHBlcmlvZDogTWNjVGltZXJQaWNrZXJQZXJpb2QpOiB2b2lkIHtcclxuICAgIHRoaXMuX3BlcmlvZCA9IHBlcmlvZDtcclxuICAgIC8vIGlmIGJ1dHRvbnMgYXJlIGhpZGRlbiwgZW1pdCBuZXcgZXZlbnQgd2hlbiB2YWx1ZSBpcyBjaGFuZ2VkXHJcbiAgICBpZiAodGhpcy5faGlkZUJ1dHRvbnMpIHtcclxuICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRUaW1lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgc2VsZWN0ZWQgY29sb3IsIGNsb3NlIHRoZSBwYW5lbCBhbmQgbm90aWZ5IHRoZSB1c2VyXHJcbiAgICovXHJcbiAgYmFja2Ryb3BDbGljaygpOiB2b2lkIHtcclxuICAgIHRoaXMuY29uZmlybVNlbGVjdGVkVGltZSgpO1xyXG4gICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgdmFsdWVzIHRvIGxhc3QgY29uZmlybSBzZWxlY3QgdGltZVxyXG4gICAqL1xyXG4gIGNhbmNlbFNlbGVjdGlvbigpOiB2b2lkIHtcclxuICAgIHRoaXMuX2hvdXIgPSB0aGlzLl9zZWxlY3RlZEhvdXI7XHJcbiAgICB0aGlzLl9taW51dGUgPSB0aGlzLl9zZWxlY3RlZE1pbnV0ZTtcclxuICAgIHRoaXMuX3BlcmlvZCA9IHRoaXMuX3NlbGVjdGVkUGVyaW9kO1xyXG4gICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgbmV3IHZhbHVlcyBvZiB0aW1lIGFuZCBlbWl0IG5ldyBldmVudCB3aXRoIHRoZSBmb3JtYXRlZCB0aW1lclxyXG4gICAqL1xyXG4gIGNvbmZpcm1TZWxlY3RlZFRpbWUoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZEhvdXIgPSB0aGlzLmhvdXI7XHJcbiAgICB0aGlzLl9zZWxlY3RlZE1pbnV0ZSA9IHRoaXMubWludXRlO1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRQZXJpb2QgPSB0aGlzLnBlcmlvZDtcclxuXHJcbiAgICAvLyBmb3JtYXQgc3RyaW5nIHRvIGVtaXQgc2VsZWN0ZWQgdGltZVxyXG4gICAgbGV0IGZvcm1hdGVkOiBzdHJpbmc7XHJcbiAgICBpZiAodGhpcy5mb3JtYXQgPT09ICcxMicpIHtcclxuICAgICAgZm9ybWF0ZWQgPSBgJHt0aGlzLmhvdXJ9OiR7dGhpcy5taW51dGV9ICR7dGhpcy5wZXJpb2R9YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBob3VyOiBzdHJpbmcgPSB0aGlzLmhvdXI7XHJcbiAgICAgIGlmICh0aGlzLnBlcmlvZCA9PT0gJ3BtJykge1xyXG4gICAgICAgIGhvdXIgPSBgJHtwYXJzZUludChob3VyKSArIDEyfWA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvcm1hdGVkID0gYCR7aG91cn06JHt0aGlzLm1pbnV0ZX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChmb3JtYXRlZCk7XHJcblxyXG4gICAgLy8gb25seSBjbG9zZSBhdXRvbWF0aWNhbGx5IGlmIGJ1dHRvbiBhcmVuJ3QgaGlkZGVuXHJcbiAgICBpZiAoIXRoaXMuX2hpZGVCdXR0b25zKSB7XHJcbiAgICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=