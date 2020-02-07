import { __decorate } from "tslib";
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, Output, OnDestroy, Renderer2, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MccTimerPickerComponent } from './timer-picker.component';
import { BehaviorSubject } from 'rxjs';
var MccTimerPickerOriginDirective = /** @class */ (function () {
    /**
     * Reference to the element on which the directive is applied.
     */
    function MccTimerPickerOriginDirective(elementRef, renderer) {
        var _this = this;
        this.elementRef = elementRef;
        this.renderer = renderer;
        /**
         * Emit changes from the origin
         */
        this.change = new BehaviorSubject('');
        /**
         * Emit changes from the origin
         */
        this.hasFocus = new BehaviorSubject(false);
        // listen focus
        renderer.listen(elementRef.nativeElement, 'focus', function () { return _this.hasFocus.next(true); });
    }
    MccTimerPickerOriginDirective_1 = MccTimerPickerOriginDirective;
    /**
     * This method will be called by the forms API to write to the view when
     * programmatic (model -> view) changes are requested.
     */
    MccTimerPickerOriginDirective.prototype.writeValue = function (time) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', time);
        this.change.next(time);
        if (this.propagateChanges) {
            this.propagateChanges(time);
        }
    };
    /**
     * This method will be called by the time picker
     */
    MccTimerPickerOriginDirective.prototype.writeValueFromTimerPicker = function (time) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', time);
        this.propagateChanges(time);
    };
    /**
     * This method will be called from origin whe key is up
     */
    MccTimerPickerOriginDirective.prototype.writeValueFromKeyup = function (time) {
        this.change.next(time);
        this.propagateChanges(time);
    };
    /**
     * This is called by the forms API on initialization so it can update the
     * form model when values propagate from the view (view -> model).
     * @param fn any
     */
    MccTimerPickerOriginDirective.prototype.registerOnChange = function (fn) {
        this.propagateChanges = fn;
    };
    /**
     * This is called by the forms API on initialization so it can update the form model on blur
     * @param fn any
     */
    MccTimerPickerOriginDirective.prototype.registerOnTouched = function (fn) { };
    /**
     * called by the forms API when the control status changes to or from "DISABLED"
     * @param isDisabled boolean
     */
    MccTimerPickerOriginDirective.prototype.setDisabledState = function (isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    var MccTimerPickerOriginDirective_1;
    MccTimerPickerOriginDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Output()
    ], MccTimerPickerOriginDirective.prototype, "change", void 0);
    __decorate([
        Output()
    ], MccTimerPickerOriginDirective.prototype, "hasFocus", void 0);
    MccTimerPickerOriginDirective = MccTimerPickerOriginDirective_1 = __decorate([
        Directive({
            selector: '[mccTimerPickerOrigin], [mcc-timer-picker-origin]',
            exportAs: 'mccTimerPickerOrigin',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return MccTimerPickerOriginDirective_1; }),
                    multi: true,
                },
            ],
        })
    ], MccTimerPickerOriginDirective);
    return MccTimerPickerOriginDirective;
}());
export { MccTimerPickerOriginDirective };
var MccConnectedTimerPickerDirective = /** @class */ (function () {
    function MccConnectedTimerPickerDirective(timerPicker, changeDetectorRef) {
        this.timerPicker = timerPicker;
        this.changeDetectorRef = changeDetectorRef;
        this.timerPicker.connected = true;
    }
    MccConnectedTimerPickerDirective.prototype.ngAfterViewInit = function () {
        if (!this._timerPickerSub) {
            this.timerPicker.trigger = this.origin;
            this._attachTimerPicker();
        }
    };
    MccConnectedTimerPickerDirective.prototype.ngOnDestroy = function () {
        if (this._originFocus && !this._originFocus.closed) {
            this._originFocus.unsubscribe();
        }
        if (this._timerPickerSub && !this._timerPickerSub.closed) {
            this._timerPickerSub.unsubscribe();
        }
    };
    /**
     * Attach the timer picker to origin element (input)
     */
    MccConnectedTimerPickerDirective.prototype._attachTimerPicker = function () {
        var _this = this;
        this._originFocus = this.origin.hasFocus.subscribe(function (focused) {
            _this.timerPicker.focus = 'hour';
            _this.timerPicker.isOpen = focused;
            _this.changeDetectorRef.detectChanges();
        });
        this._timerPickerSub = this.timerPicker.selected.subscribe(function (value) {
            return _this.origin.writeValueFromTimerPicker(value);
        });
    };
    MccConnectedTimerPickerDirective.ctorParameters = function () { return [
        { type: MccTimerPickerComponent },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input('mccConnectedTimerPickerOrigin')
    ], MccConnectedTimerPickerDirective.prototype, "origin", void 0);
    MccConnectedTimerPickerDirective = __decorate([
        Directive({
            selector: '[mccConnectedTimerPicker], [mcc-connected-timer-picker]',
            exportAs: 'mccConnectedTimerPicker',
        })
    ], MccConnectedTimerPickerDirective);
    return MccConnectedTimerPickerDirective;
}());
export { MccConnectedTimerPickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlja2VyLmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInRpbWVyLXBpY2tlci90aW1lci1waWNrZXIuZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBYXJEO0lBZ0JFOztPQUVHO0lBQ0gsdUNBQW1CLFVBQXNCLEVBQVUsUUFBbUI7UUFBdEUsaUJBR0M7UUFIa0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFsQnRFOztXQUVHO1FBQ08sV0FBTSxHQUE0QixJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUU1RTs7V0FFRztRQUNPLGFBQVEsR0FBNkIsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFXakYsZUFBZTtRQUNmLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDckYsQ0FBQztzQ0F0QlUsNkJBQTZCO0lBd0J4Qzs7O09BR0c7SUFDSCxrREFBVSxHQUFWLFVBQVcsSUFBWTtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJ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WSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDeEQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUNsQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDOUQsT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQztRQUE1QyxDQUE0QyxDQUM3QyxDQUFDO0lBQ0osQ0FBQzs7Z0JBbkNzQix1QkFBdUI7Z0JBQ2xCLGlCQUFpQjs7SUFkTDtRQUF2QyxLQUFLLENBQUMsK0JBQStCLENBQUM7b0VBQXVDO0lBSm5FLGdDQUFnQztRQUo1QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUseURBQXlEO1lBQ25FLFFBQVEsRUFBRSx5QkFBeUI7U0FDcEMsQ0FBQztPQUNXLGdDQUFnQyxDQXFENUM7SUFBRCx1Q0FBQztDQUFBLEFBckRELElBcURDO1NBckRZLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBmb3J3YXJkUmVmLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgUmVuZGVyZXIyLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTWNjVGltZXJQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWNjVGltZXJQaWNrZXJPcmlnaW5dLCBbbWNjLXRpbWVyLXBpY2tlci1vcmlnaW5dJyxcclxuICBleHBvcnRBczogJ21jY1RpbWVyUGlja2VyT3JpZ2luJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jY1RpbWVyUGlja2VyT3JpZ2luRGlyZWN0aXZlKSxcclxuICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNY2NUaW1lclBpY2tlck9yaWdpbkRpcmVjdGl2ZSB7XHJcbiAgLyoqXHJcbiAgICogRW1pdCBjaGFuZ2VzIGZyb20gdGhlIG9yaWdpblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBjaGFuZ2VzIGZyb20gdGhlIG9yaWdpblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBoYXNGb2N1czogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb3BhZ2F0ZSBjaGFuZ2VzIHRvIGFuZ3VsYXJcclxuICAgKi9cclxuICBwcm9wYWdhdGVDaGFuZ2VzOiAoXzogYW55KSA9PiB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IG9uIHdoaWNoIHRoZSBkaXJlY3RpdmUgaXMgYXBwbGllZC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XHJcbiAgICAvLyBsaXN0ZW4gZm9jdXNcclxuICAgIHJlbmRlcmVyLmxpc3RlbihlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmb2N1cycsICgpID0+IHRoaXMuaGFzRm9jdXMubmV4dCh0cnVlKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHRvIHdyaXRlIHRvIHRoZSB2aWV3IHdoZW5cclxuICAgKiBwcm9ncmFtbWF0aWMgKG1vZGVsIC0+IHZpZXcpIGNoYW5nZXMgYXJlIHJlcXVlc3RlZC5cclxuICAgKi9cclxuICB3cml0ZVZhbHVlKHRpbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdGltZSk7XHJcbiAgICB0aGlzLmNoYW5nZS5uZXh0KHRpbWUpO1xyXG4gICAgaWYgKHRoaXMucHJvcGFnYXRlQ2hhbmdlcykge1xyXG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXModGltZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgdGltZSBwaWNrZXJcclxuICAgKi9cclxuICB3cml0ZVZhbHVlRnJvbVRpbWVyUGlja2VyKHRpbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdGltZSk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXModGltZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBmcm9tIG9yaWdpbiB3aGUga2V5IGlzIHVwXHJcbiAgICovXHJcbiAgd3JpdGVWYWx1ZUZyb21LZXl1cCh0aW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuY2hhbmdlLm5leHQodGltZSk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXModGltZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGlzIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIG9uIGluaXRpYWxpemF0aW9uIHNvIGl0IGNhbiB1cGRhdGUgdGhlXHJcbiAgICogZm9ybSBtb2RlbCB3aGVuIHZhbHVlcyBwcm9wYWdhdGUgZnJvbSB0aGUgdmlldyAodmlldyAtPiBtb2RlbCkuXHJcbiAgICogQHBhcmFtIGZuIGFueVxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzID0gZm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGlzIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIG9uIGluaXRpYWxpemF0aW9uIHNvIGl0IGNhbiB1cGRhdGUgdGhlIGZvcm0gbW9kZWwgb24gYmx1clxyXG4gICAqIEBwYXJhbSBmbiBhbnlcclxuICAgKi9cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgd2hlbiB0aGUgY29udHJvbCBzdGF0dXMgY2hhbmdlcyB0byBvciBmcm9tIFwiRElTQUJMRURcIlxyXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkIGJvb2xlYW5cclxuICAgKi9cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIGlzRGlzYWJsZWQpO1xyXG4gIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWNjQ29ubmVjdGVkVGltZXJQaWNrZXJdLCBbbWNjLWNvbm5lY3RlZC10aW1lci1waWNrZXJdJyxcclxuICBleHBvcnRBczogJ21jY0Nvbm5lY3RlZFRpbWVyUGlja2VyJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1jY0Nvbm5lY3RlZFRpbWVyUGlja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBvcmlnaW4gb2YgdGhlIGNvbm5lY3RlZCB0aW1lciBwaWNrZXJcclxuICAgKi9cclxuICBASW5wdXQoJ21jY0Nvbm5lY3RlZFRpbWVyUGlja2VyT3JpZ2luJykgb3JpZ2luOiBNY2NUaW1lclBpY2tlck9yaWdpbkRpcmVjdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogc3Vic2NyaXB0aW9uIG9mIHRoZSBvcmlnaW4gZm9jdXMgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29yaWdpbkZvY3VzOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIHN1YnNjcmlwdGlvbiBvZiB0aGUgdGltZXIgcGlja2VyIHNlbGVjdGVkIGNoYW5nZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWVyUGlja2VyU3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0aW1lclBpY2tlcjogTWNjVGltZXJQaWNrZXJDb21wb25lbnQsXHJcbiAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLnRpbWVyUGlja2VyLmNvbm5lY3RlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMuX3RpbWVyUGlja2VyU3ViKSB7XHJcbiAgICAgIHRoaXMudGltZXJQaWNrZXIudHJpZ2dlciA9IHRoaXMub3JpZ2luO1xyXG4gICAgICB0aGlzLl9hdHRhY2hUaW1lclBpY2tlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fb3JpZ2luRm9jdXMgJiYgIXRoaXMuX29yaWdpbkZvY3VzLmNsb3NlZCkge1xyXG4gICAgICB0aGlzLl9vcmlnaW5Gb2N1cy51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3RpbWVyUGlja2VyU3ViICYmICF0aGlzLl90aW1lclBpY2tlclN1Yi5jbG9zZWQpIHtcclxuICAgICAgdGhpcy5fdGltZXJQaWNrZXJTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaCB0aGUgdGltZXIgcGlja2VyIHRvIG9yaWdpbiBlbGVtZW50IChpbnB1dClcclxuICAgKi9cclxuICBwcml2YXRlIF9hdHRhY2hUaW1lclBpY2tlcigpOiB2b2lkIHtcclxuICAgIHRoaXMuX29yaWdpbkZvY3VzID0gdGhpcy5vcmlnaW4uaGFzRm9jdXMuc3Vic2NyaWJlKGZvY3VzZWQgPT4ge1xyXG4gICAgICB0aGlzLnRpbWVyUGlja2VyLmZvY3VzID0gJ2hvdXInO1xyXG4gICAgICB0aGlzLnRpbWVyUGlja2VyLmlzT3BlbiA9IGZvY3VzZWQ7XHJcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fdGltZXJQaWNrZXJTdWIgPSB0aGlzLnRpbWVyUGlja2VyLnNlbGVjdGVkLnN1YnNjcmliZSh2YWx1ZSA9PlxyXG4gICAgICB0aGlzLm9yaWdpbi53cml0ZVZhbHVlRnJvbVRpbWVyUGlja2VyKHZhbHVlKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19