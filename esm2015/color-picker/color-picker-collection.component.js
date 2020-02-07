import { __decorate, __param } from "tslib";
import { AfterContentChecked, Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Input, Inject, Output, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { EMPTY_COLOR } from './color-picker';
let MccColorPickerCollectionComponent = class MccColorPickerCollectionComponent {
    constructor(changeDetectorRef, emptyColor) {
        this.changeDetectorRef = changeDetectorRef;
        this.emptyColor = emptyColor;
        this._hideEmpty = false;
        /**
         * Size limit of the collection
         */
        this.size = 30;
        /**
         * Show transparent option
         */
        this.transparent = false;
        /**
         * Emit selected color value
         */
        this.changeColor = new EventEmitter();
    }
    /**
     * Hide empty slots
     * Empty slots are the difference between the collection size and limit
     */
    set hideEmpty(value) {
        this._hideEmpty = coerceBooleanProperty(value);
    }
    /**
     * Name of the collection
     */
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    /**
     * Array of colors to be displayed
     */
    get colors() {
        return this._colors;
    }
    set colors(values) {
        this._colors = values;
    }
    ngAfterContentChecked() {
        if (this._colors && this._colors.length !== this.size) {
            this._colors = this._colors
                .slice(0, this.size)
                .concat(new Array(this._getCollectionDiffSize()));
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * Return the difference between the limit and the collection size.
     * Always return 0 when hideEmpty is true
     * @returns number
     */
    _getCollectionDiffSize() {
        if (this._colors.length > this.size || this._hideEmpty) {
            return 0;
        }
        return this.size - this._colors.length;
    }
    /**
     * Remove color
     */
    setTransparent() {
        this.changeColor.emit(this.emptyColor);
    }
    /**
     * Emit selected color value
     * @param option MccColorPickerOption
     */
    setColor(option) {
        const color = typeof option === 'string' ? option : option.value;
        this.changeColor.emit(color);
    }
};
MccColorPickerCollectionComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
];
__decorate([
    Input()
], MccColorPickerCollectionComponent.prototype, "hideEmpty", null);
__decorate([
    Input()
], MccColorPickerCollectionComponent.prototype, "label", null);
__decorate([
    Input()
], MccColorPickerCollectionComponent.prototype, "colors", null);
__decorate([
    Input()
], MccColorPickerCollectionComponent.prototype, "size", void 0);
__decorate([
    Input()
], MccColorPickerCollectionComponent.prototype, "transparent", void 0);
__decorate([
    Output()
], MccColorPickerCollectionComponent.prototype, "changeColor", void 0);
MccColorPickerCollectionComponent = __decorate([
    Component({
        selector: 'mcc-color-picker-collection',
        template: "<div class=\"mcc-color-picker-collection\" role=\"listbox\" aria-label=\"Select a color\">\r\n        <h3>{{ label }}</h3>\r\n\r\n        <button mat-mini-fab *ngIf=\"transparent\" class=\"mcc-color-picker-remove-color mat-elevation-z0\" role=\"option\" aria-label=\"transparent\"\r\n                (click)=\"setTransparent()\">\r\n                <div class=\"mcc-color-picker-transparent\"></div>\r\n        </button>\r\n\r\n        <button *ngFor=\"let color of colors\" mat-mini-fab class=\"mat-elevation-z0\" role=\"option\" [disabled]=\"!color || color === emptyColor\"\r\n                [mccColorPickerOption]=\"color\" (click)=\"setColor(color)\">\r\n        </button>\r\n</div>",
        preserveWhitespaces: false,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".mcc-color-picker-collection{min-height:50px;padding:10px 18px}.mcc-color-picker-collection h3{color:#100214;text-transform:uppercase;font-family:'Open Sans',sans-serif;font-size:12px;font-weight:700;margin:0 0 10px}.mcc-color-picker-remove-color{background-color:#fff;border:1px solid #e1e1e1}.mcc-color-picker-remove-color .mcc-color-picker-transparent{width:20px;height:1px;border-bottom:1px solid red;transform:translateY(-4px) translateX(0) rotate(45deg);-webkit-transform:translateY(-4px) translateX(0) rotate(45deg)}button{width:22px;height:22px;cursor:pointer;margin:3px}"]
    }),
    __param(1, Inject(EMPTY_COLOR))
], MccColorPickerCollectionComponent);
export { MccColorPickerCollectionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLWNvbGxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWF0ZXJpYWwtY29tbXVuaXR5LWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb2xvci1waWNrZXIvY29sb3ItcGlja2VyLWNvbGxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBU25FLElBQWEsaUNBQWlDLEdBQTlDLE1BQWEsaUNBQWlDO0lBa0Q1QyxZQUNVLGlCQUFvQyxFQUNoQixVQUFrQjtRQUR0QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ2hCLGVBQVUsR0FBVixVQUFVLENBQVE7UUEzQ3hDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUEwQnBDOztXQUVHO1FBQ00sU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUUzQjs7V0FFRztRQUNNLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRXRDOztXQUVHO1FBQ08sZ0JBQVcsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUt0RSxDQUFDO0lBcERKOzs7T0FHRztJQUVILElBQUksU0FBUyxDQUFDLEtBQWM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBR0Q7O09BRUc7SUFFSCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUdEOztPQUVHO0lBRUgsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUE4QjtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBdUJELHFCQUFxQjtRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtZQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPO2lCQUN4QixLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ25CLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxzQkFBc0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdEQsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRLENBQUMsTUFBNEI7UUFDbkMsTUFBTSxLQUFLLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGLENBQUE7O1lBekM4QixpQkFBaUI7eUNBQzNDLE1BQU0sU0FBQyxXQUFXOztBQTlDckI7SUFEQyxLQUFLLEVBQUU7a0VBR1A7QUFPRDtJQURDLEtBQUssRUFBRTs4REFHUDtBQVVEO0lBREMsS0FBSyxFQUFFOytEQUdQO0FBU1E7SUFBUixLQUFLLEVBQUU7K0RBQW1CO0FBS2xCO0lBQVIsS0FBSyxFQUFFO3NFQUE4QjtBQUs1QjtJQUFULE1BQU0sRUFBRTtzRUFBZ0U7QUFoRDlELGlDQUFpQztJQVA3QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNkJBQTZCO1FBQ3ZDLDRyQkFBdUQ7UUFFdkQsbUJBQW1CLEVBQUUsS0FBSztRQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7S0FDaEQsQ0FBQztJQXFERyxXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQXBEWCxpQ0FBaUMsQ0E0RjdDO1NBNUZZLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcclxuICBDb21wb25lbnQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIEluamVjdCxcclxuICBPdXRwdXQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7IEVNUFRZX0NPTE9SLCBNY2NDb2xvclBpY2tlck9wdGlvbiB9IGZyb20gJy4vY29sb3ItcGlja2VyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWNjLWNvbG9yLXBpY2tlci1jb2xsZWN0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3ItcGlja2VyLWNvbGxlY3Rpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvbG9yLXBpY2tlci1jb2xsZWN0aW9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNY2NDb2xvclBpY2tlckNvbGxlY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcclxuICAvKipcclxuICAgKiBIaWRlIGVtcHR5IHNsb3RzXHJcbiAgICogRW1wdHkgc2xvdHMgYXJlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGNvbGxlY3Rpb24gc2l6ZSBhbmQgbGltaXRcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBoaWRlRW1wdHkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2hpZGVFbXB0eSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2hpZGVFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBOYW1lIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbGFiZWwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9sYWJlbDtcclxuICB9XHJcbiAgc2V0IGxhYmVsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2xhYmVsID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2xhYmVsOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFycmF5IG9mIGNvbG9ycyB0byBiZSBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb2xvcnMoKTogTWNjQ29sb3JQaWNrZXJPcHRpb25bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3JzO1xyXG4gIH1cclxuICBzZXQgY29sb3JzKHZhbHVlczogTWNjQ29sb3JQaWNrZXJPcHRpb25bXSkge1xyXG4gICAgdGhpcy5fY29sb3JzID0gdmFsdWVzO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvcnM6IE1jY0NvbG9yUGlja2VyT3B0aW9uW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFNpemUgbGltaXQgb2YgdGhlIGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBASW5wdXQoKSBzaXplOiBudW1iZXIgPSAzMDtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyB0cmFuc3BhcmVudCBvcHRpb25cclxuICAgKi9cclxuICBASW5wdXQoKSB0cmFuc3BhcmVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0IHNlbGVjdGVkIGNvbG9yIHZhbHVlXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGNoYW5nZUNvbG9yOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQEluamVjdChFTVBUWV9DT0xPUikgcHVibGljIGVtcHR5Q29sb3I6IHN0cmluZ1xyXG4gICkge31cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xyXG4gICAgaWYgKHRoaXMuX2NvbG9ycyAmJiB0aGlzLl9jb2xvcnMubGVuZ3RoICE9PSB0aGlzLnNpemUpIHtcclxuICAgICAgdGhpcy5fY29sb3JzID0gdGhpcy5fY29sb3JzXHJcbiAgICAgICAgLnNsaWNlKDAsIHRoaXMuc2l6ZSlcclxuICAgICAgICAuY29uY2F0KG5ldyBBcnJheSh0aGlzLl9nZXRDb2xsZWN0aW9uRGlmZlNpemUoKSkpO1xyXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGxpbWl0IGFuZCB0aGUgY29sbGVjdGlvbiBzaXplLlxyXG4gICAqIEFsd2F5cyByZXR1cm4gMCB3aGVuIGhpZGVFbXB0eSBpcyB0cnVlXHJcbiAgICogQHJldHVybnMgbnVtYmVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0Q29sbGVjdGlvbkRpZmZTaXplKCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5fY29sb3JzLmxlbmd0aCA+IHRoaXMuc2l6ZSB8fCB0aGlzLl9oaWRlRW1wdHkpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2l6ZSAtIHRoaXMuX2NvbG9ycy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgY29sb3JcclxuICAgKi9cclxuICBzZXRUcmFuc3BhcmVudCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hhbmdlQ29sb3IuZW1pdCh0aGlzLmVtcHR5Q29sb3IpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCBzZWxlY3RlZCBjb2xvciB2YWx1ZVxyXG4gICAqIEBwYXJhbSBvcHRpb24gTWNjQ29sb3JQaWNrZXJPcHRpb25cclxuICAgKi9cclxuICBzZXRDb2xvcihvcHRpb246IE1jY0NvbG9yUGlja2VyT3B0aW9uKSB7XHJcbiAgICBjb25zdCBjb2xvciA9IHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnID8gb3B0aW9uIDogb3B0aW9uLnZhbHVlO1xyXG4gICAgdGhpcy5jaGFuZ2VDb2xvci5lbWl0KGNvbG9yKTtcclxuICB9XHJcbn1cclxuIl19