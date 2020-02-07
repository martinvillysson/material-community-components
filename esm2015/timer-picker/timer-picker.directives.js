var MccTimerPickerOriginDirective_1;
import { __decorate } from "tslib";
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, Output, OnDestroy, Renderer2, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MccTimerPickerComponent } from './timer-picker.component';
import { BehaviorSubject } from 'rxjs';
let MccTimerPickerOriginDirective = MccTimerPickerOriginDirective_1 = class MccTimerPickerOriginDirective {
    /**
     * Reference to the element on which the directive is applied.
     */
    constructor(elementRef, renderer) {
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
        renderer.listen(elementRef.nativeElement, 'focus', () => this.hasFocus.next(true));
    }
    /**
     * This method will be called by the forms API to write to the view when
     * programmatic (model -> view) changes are requested.
     */
    writeValue(time) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', time);
        this.change.next(time);
        if (this.propagateChanges) {
            this.propagateChanges(time);
        }
    }
    /**
     * This method will be called by the time picker
     */
    writeValueFromTimerPicker(time) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', time);
        this.propagateChanges(time);
    }
    /**
     * This method will be called from origin whe key is up
     */
    writeValueFromKeyup(time) {
        this.change.next(time);
        this.propagateChanges(time);
    }
    /**
     * This is called by the forms API on initialization so it can update the
     * form model when values propagate from the view (view -> model).
     * @param fn any
     */
    registerOnChange(fn) {
        this.propagateChanges = fn;
    }
    /**
     * This is called by the forms API on initialization so it can update the form model on blur
     * @param fn any
     */
    registerOnTouched(fn) { }
    /**
     * called by the forms API when the control status changes to or from "DISABLED"
     * @param isDisabled boolean
     */
    setDisabledState(isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    }
};
MccTimerPickerOriginDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
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
                useExisting: forwardRef(() => MccTimerPickerOriginDirective_1),
                multi: true,
            },
        ],
    })
], MccTimerPickerOriginDirective);
export { MccTimerPickerOriginDirective };
let MccConnectedTimerPickerDirective = class MccConnectedTimerPickerDirective {
    constructor(timerPicker, changeDetectorRef) {
        this.timerPicker = timerPicker;
        this.changeDetectorRef = changeDetectorRef;
        this.timerPicker.connected = true;
    }
    ngAfterViewInit() {
        if (!this._timerPickerSub) {
            this.timerPicker.trigger = this.origin;
            this._attachTimerPicker();
        }
    }
    ngOnDestroy() {
        if (this._originFocus && !this._originFocus.closed) {
            this._originFocus.unsubscribe();
        }
        if (this._timerPickerSub && !this._timerPickerSub.closed) {
            this._timerPickerSub.unsubscribe();
        }
    }
    /**
     * Attach the timer picker to origin element (input)
     */
    _attachTimerPicker() {
        this._originFocus = this.origin.hasFocus.subscribe(focused => {
            this.timerPicker.focus = 'hour';
            this.timerPicker.isOpen = focused;
            this.changeDetectorRef.detectChanges();
        });
        this._timerPickerSub = this.timerPicker.selected.subscribe(value => this.origin.writeValueFromTimerPicker(value));
    }
};
MccConnectedTimerPickerDirective.ctorParameters = () => [
    { type: MccTimerPickerComponent },
    { type: ChangeDetectorRef }
];
__decorate([
    Input('mccConnectedTimerPickerOrigin')
], MccConnectedTimerPickerDirective.prototype, "origin", void 0);
MccConnectedTimerPickerDirective = __decorate([
    Directive({
        selector: '[mccConnectedTimerPicker], [mcc-connected-timer-picker]',
        exportAs: 'mccConnectedTimerPicker',
    })
], MccConnectedTimerPickerDirective);
export { MccConnectedTimerPickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlja2VyLmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInRpbWVyLXBpY2tlci90aW1lci1waWNrZXIuZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQWFyRCxJQUFhLDZCQUE2QixxQ0FBMUMsTUFBYSw2QkFBNkI7SUFnQnhDOztPQUVHO0lBQ0gsWUFBbUIsVUFBc0IsRUFBVSxRQUFtQjtRQUFuRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWxCdEU7O1dBRUc7UUFDTyxXQUFNLEdBQTRCLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRTVFOztXQUVHO1FBQ08sYUFBUSxHQUE2QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQVdqRixlQUFlO1FBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVLENBQUMsSUFBWTtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMs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LENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQzdDLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTs7WUFwQ3dCLHVCQUF1QjtZQUNsQixpQkFBaUI7O0FBZEw7SUFBdkMsS0FBSyxDQUFDLCtCQUErQixDQUFDO2dFQUF1QztBQUpuRSxnQ0FBZ0M7SUFKNUMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHlEQUF5RDtRQUNuRSxRQUFRLEVBQUUseUJBQXlCO0tBQ3BDLENBQUM7R0FDVyxnQ0FBZ0MsQ0FxRDVDO1NBckRZLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBmb3J3YXJkUmVmLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgUmVuZGVyZXIyLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTWNjVGltZXJQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWVyLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWNjVGltZXJQaWNrZXJPcmlnaW5dLCBbbWNjLXRpbWVyLXBpY2tlci1vcmlnaW5dJyxcclxuICBleHBvcnRBczogJ21jY1RpbWVyUGlja2VyT3JpZ2luJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1jY1RpbWVyUGlja2VyT3JpZ2luRGlyZWN0aXZlKSxcclxuICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNY2NUaW1lclBpY2tlck9yaWdpbkRpcmVjdGl2ZSB7XHJcbiAgLyoqXHJcbiAgICogRW1pdCBjaGFuZ2VzIGZyb20gdGhlIG9yaWdpblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBjaGFuZ2VzIGZyb20gdGhlIG9yaWdpblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBoYXNGb2N1czogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb3BhZ2F0ZSBjaGFuZ2VzIHRvIGFuZ3VsYXJcclxuICAgKi9cclxuICBwcm9wYWdhdGVDaGFuZ2VzOiAoXzogYW55KSA9PiB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IG9uIHdoaWNoIHRoZSBkaXJlY3RpdmUgaXMgYXBwbGllZC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XHJcbiAgICAvLyBsaXN0ZW4gZm9jdXNcclxuICAgIHJlbmRlcmVyLmxpc3RlbihlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmb2N1cycsICgpID0+IHRoaXMuaGFzRm9jdXMubmV4dCh0cnVlKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHRvIHdyaXRlIHRvIHRoZSB2aWV3IHdoZW5cclxuICAgKiBwcm9ncmFtbWF0aWMgKG1vZGVsIC0+IHZpZXcpIGNoYW5nZXMgYXJlIHJlcXVlc3RlZC5cclxuICAgKi9cclxuICB3cml0ZVZhbHVlKHRpbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdGltZSk7XHJcbiAgICB0aGlzLmNoYW5nZS5uZXh0KHRpbWUpO1xyXG4gICAgaWYgKHRoaXMucHJvcGFnYXRlQ2hhbmdlcykge1xyXG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXModGltZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgdGltZSBwaWNrZXJcclxuICAgKi9cclxuICB3cml0ZVZhbHVlRnJvbVRpbWVyUGlja2VyKHRpbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdGltZSk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXModGltZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBmcm9tIG9yaWdpbiB3aGUga2V5IGlzIHVwXHJcbiAgICovXHJcbiAgd3JpdGVWYWx1ZUZyb21LZXl1cCh0aW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuY2hhbmdlLm5leHQodGltZSk7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXModGltZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGlzIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIG9uIGluaXRpYWxpemF0aW9uIHNvIGl0IGNhbiB1cGRhdGUgdGhlXHJcbiAgICogZm9ybSBtb2RlbCB3aGVuIHZhbHVlcyBwcm9wYWdhdGUgZnJvbSB0aGUgdmlldyAodmlldyAtPiBtb2RlbCkuXHJcbiAgICogQHBhcmFtIGZuIGFueVxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzID0gZm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGlzIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIG9uIGluaXRpYWxpemF0aW9uIHNvIGl0IGNhbiB1cGRhdGUgdGhlIGZvcm0gbW9kZWwgb24gYmx1clxyXG4gICAqIEBwYXJhbSBmbiBhbnlcclxuICAgKi9cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgd2hlbiB0aGUgY29udHJvbCBzdGF0dXMgY2hhbmdlcyB0byBvciBmcm9tIFwiRElTQUJMRURcIlxyXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkIGJvb2xlYW5cclxuICAgKi9cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIGlzRGlzYWJsZWQpO1xyXG4gIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWNjQ29ubmVjdGVkVGltZXJQaWNrZXJdLCBbbWNjLWNvbm5lY3RlZC10aW1lci1waWNrZXJdJyxcclxuICBleHBvcnRBczogJ21jY0Nvbm5lY3RlZFRpbWVyUGlja2VyJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1jY0Nvbm5lY3RlZFRpbWVyUGlja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBvcmlnaW4gb2YgdGhlIGNvbm5lY3RlZCB0aW1lciBwaWNrZXJcclxuICAgKi9cclxuICBASW5wdXQoJ21jY0Nvbm5lY3RlZFRpbWVyUGlja2VyT3JpZ2luJykgb3JpZ2luOiBNY2NUaW1lclBpY2tlck9yaWdpbkRpcmVjdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogc3Vic2NyaXB0aW9uIG9mIHRoZSBvcmlnaW4gZm9jdXMgb2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29yaWdpbkZvY3VzOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIHN1YnNjcmlwdGlvbiBvZiB0aGUgdGltZXIgcGlja2VyIHNlbGVjdGVkIGNoYW5nZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3RpbWVyUGlja2VyU3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0aW1lclBpY2tlcjogTWNjVGltZXJQaWNrZXJDb21wb25lbnQsXHJcbiAgICBwdWJsaWMgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLnRpbWVyUGlja2VyLmNvbm5lY3RlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMuX3RpbWVyUGlja2VyU3ViKSB7XHJcbiAgICAgIHRoaXMudGltZXJQaWNrZXIudHJpZ2dlciA9IHRoaXMub3JpZ2luO1xyXG4gICAgICB0aGlzLl9hdHRhY2hUaW1lclBpY2tlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fb3JpZ2luRm9jdXMgJiYgIXRoaXMuX29yaWdpbkZvY3VzLmNsb3NlZCkge1xyXG4gICAgICB0aGlzLl9vcmlnaW5Gb2N1cy51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3RpbWVyUGlja2VyU3ViICYmICF0aGlzLl90aW1lclBpY2tlclN1Yi5jbG9zZWQpIHtcclxuICAgICAgdGhpcy5fdGltZXJQaWNrZXJTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaCB0aGUgdGltZXIgcGlja2VyIHRvIG9yaWdpbiBlbGVtZW50IChpbnB1dClcclxuICAgKi9cclxuICBwcml2YXRlIF9hdHRhY2hUaW1lclBpY2tlcigpOiB2b2lkIHtcclxuICAgIHRoaXMuX29yaWdpbkZvY3VzID0gdGhpcy5vcmlnaW4uaGFzRm9jdXMuc3Vic2NyaWJlKGZvY3VzZWQgPT4ge1xyXG4gICAgICB0aGlzLnRpbWVyUGlja2VyLmZvY3VzID0gJ2hvdXInO1xyXG4gICAgICB0aGlzLnRpbWVyUGlja2VyLmlzT3BlbiA9IGZvY3VzZWQ7XHJcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fdGltZXJQaWNrZXJTdWIgPSB0aGlzLnRpbWVyUGlja2VyLnNlbGVjdGVkLnN1YnNjcmliZSh2YWx1ZSA9PlxyXG4gICAgICB0aGlzLm9yaWdpbi53cml0ZVZhbHVlRnJvbVRpbWVyUGlja2VyKHZhbHVlKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19