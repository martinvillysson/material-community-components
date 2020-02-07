import { __decorate, __param } from "tslib";
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, Inject, OnDestroy, Output, Renderer2, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MccColorPickerComponent } from './color-picker.component';
import { EMPTY_COLOR, coerceHexaColor, isValidColor } from './color-picker';
import { BehaviorSubject } from 'rxjs';
/**
 * This directive change the background of the button
 */
var MccColorPickerOptionDirective = /** @class */ (function () {
    function MccColorPickerOptionDirective(elementRef, render, emptyColor) {
        this.elementRef = elementRef;
        this.render = render;
        this.emptyColor = emptyColor;
        this._color = emptyColor;
    }
    Object.defineProperty(MccColorPickerOptionDirective.prototype, "color", {
        /**
         * Receive the color
         */
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    MccColorPickerOptionDirective.prototype.ngAfterViewInit = function () {
        if (this.color) {
            var color = void 0;
            if (typeof this.color === 'string') {
                color = this.color;
            }
            else {
                color = this.color.value;
                this.render.setAttribute(this.elementRef.nativeElement, 'aria-label', this.color.text);
            }
            if (isValidColor(color)) {
                // apply the color
                this.render.setStyle(this.elementRef.nativeElement, 'background', coerceHexaColor(color) || this.emptyColor);
            }
        }
    };
    MccColorPickerOptionDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
    ]; };
    __decorate([
        Input('mccColorPickerOption')
    ], MccColorPickerOptionDirective.prototype, "color", null);
    MccColorPickerOptionDirective = __decorate([
        Directive({
            selector: '[mccColorPickerOption], [mcc-color-picker-option]',
            exportAs: 'mccColorPickerOption',
        }),
        __param(2, Inject(EMPTY_COLOR))
    ], MccColorPickerOptionDirective);
    return MccColorPickerOptionDirective;
}());
export { MccColorPickerOptionDirective };
/**
 * Directive applied to an element to make it usable as an origin for an ColorPicker.
 */
var MccColorPickerOriginDirective = /** @class */ (function () {
    /**
     * Reference to the element on which the directive is applied.
     */
    function MccColorPickerOriginDirective(elementRef, renderer, emptyColor) {
        var _this = this;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.emptyColor = emptyColor;
        /**
         * Emit changes from the origin
         */
        this.change = new BehaviorSubject('');
        // listen changes onkeyup and update color picker
        renderer.listen(elementRef.nativeElement, 'keyup', function (event) {
            var value = event.currentTarget['value'];
            if (event.isTrusted && isValidColor(value)) {
                _this.writeValueFromKeyup(coerceHexaColor(value) || _this.emptyColor);
            }
        });
    }
    MccColorPickerOriginDirective_1 = MccColorPickerOriginDirective;
    /**
     * This method will be called by the forms API to write to the view when
     * programmatic (model -> view) changes are requested.
     */
    MccColorPickerOriginDirective.prototype.writeValue = function (color) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', color);
        this.change.next(color);
        if (this.propagateChanges) {
            this.propagateChanges(color);
        }
    };
    /**
     * This method will be called by the color picker
     */
    MccColorPickerOriginDirective.prototype.writeValueFromColorPicker = function (color) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', color);
        this.propagateChanges(color);
    };
    /**
     * This method will be called from origin whe key is up
     */
    MccColorPickerOriginDirective.prototype.writeValueFromKeyup = function (color) {
        this.change.next(color);
        this.propagateChanges(color);
    };
    /**
     * This is called by the forms API on initialization so it can update the
     * form model when values propagate from the view (view -> model).
     * @param fn any
     */
    MccColorPickerOriginDirective.prototype.registerOnChange = function (fn) {
        this.propagateChanges = fn;
    };
    /**
     * This is called by the forms API on initialization so it can update the form model on blur
     * @param fn any
     */
    MccColorPickerOriginDirective.prototype.registerOnTouched = function (fn) { };
    /**
     * called by the forms API when the control status changes to or from "DISABLED"
     * @param isDisabled boolean
     */
    MccColorPickerOriginDirective.prototype.setDisabledState = function (isDisabled) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    };
    var MccColorPickerOriginDirective_1;
    MccColorPickerOriginDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
    ]; };
    __decorate([
        Output()
    ], MccColorPickerOriginDirective.prototype, "change", void 0);
    MccColorPickerOriginDirective = MccColorPickerOriginDirective_1 = __decorate([
        Directive({
            selector: '[mcc-color-picker-origin], [mccColorPickerOrigin]',
            exportAs: 'mccColorPickerOrigin',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return MccColorPickerOriginDirective_1; }),
                    multi: true,
                },
            ],
        }),
        __param(2, Inject(EMPTY_COLOR))
    ], MccColorPickerOriginDirective);
    return MccColorPickerOriginDirective;
}());
export { MccColorPickerOriginDirective };
/**
 * Directive connect an color picker with any input, select or textarea.
 * The color picker will be automatically updated when the value of the origin is
 * changed.
 */
var MccConnectedColorPickerDirective = /** @class */ (function () {
    function MccConnectedColorPickerDirective(colorPicker, changeDetectorRef, emptyColor) {
        this.colorPicker = colorPicker;
        this.changeDetectorRef = changeDetectorRef;
        this.emptyColor = emptyColor;
    }
    MccConnectedColorPickerDirective.prototype.ngAfterViewInit = function () {
        if (!this._colorPickerSub) {
            this._attachColorPicker();
        }
    };
    MccConnectedColorPickerDirective.prototype.ngOnDestroy = function () {
        if (this._colorPickerSub && !this._colorPickerSub.closed) {
            this._colorPickerSub.unsubscribe();
        }
        if (this._originSub && !this._originSub.closed) {
            this._originSub.unsubscribe();
        }
    };
    /**
     * Attach color picker and origin
     */
    MccConnectedColorPickerDirective.prototype._attachColorPicker = function () {
        var _this = this;
        // subscribe to origin change to update color picker
        this._originSub = this.origin.change.subscribe(function (value) {
            if (isValidColor(value) ||
                (value === _this.emptyColor && _this.colorPicker.selectedColor !== _this.emptyColor)) {
                _this.colorPicker.updateTmpSelectedColor(value);
            }
            _this.colorPicker.selectedColor = value;
            _this.changeDetectorRef.detectChanges();
        });
        // subscribe to color picker changes and set on origin element
        this._colorPickerSub = this.colorPicker.change.subscribe(function (value) {
            return _this.origin.writeValueFromColorPicker(value);
        });
    };
    MccConnectedColorPickerDirective.ctorParameters = function () { return [
        { type: MccColorPickerComponent },
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
    ]; };
    __decorate([
        Input('mccConnectedColorPickerOrigin')
    ], MccConnectedColorPickerDirective.prototype, "origin", void 0);
    MccConnectedColorPickerDirective = __decorate([
        Directive({
            selector: '[mcc-connected-color-picker], [mccConnectedColorPicker]',
            exportAs: 'mccConnectedColorPicker',
        }),
        __param(2, Inject(EMPTY_COLOR))
    ], MccConnectedColorPickerDirective);
    return MccConnectedColorPickerDirective;
}());
export { MccConnectedColorPickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ2xHLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJEOztHQUVHO0FBS0g7SUFhRSx1Q0FDVSxVQUFzQixFQUN0QixNQUFpQixFQUNJLFVBQWtCO1FBRnZDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNJLGVBQVUsR0FBVixVQUFVLENBQVE7UUFFL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQWRELHNCQUFJLGdEQUFLO1FBSlQ7O1dBRUc7YUFFSDtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDO2FBQ0QsVUFBVSxLQUEyQjtZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTtJQWNELHVEQUFlLEdBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLEtBQUssU0FBUSxD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QUFNLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDO1FBQTVDLENBQTRDLENBQzdDLENBQUM7SUFDSixDQUFDOztnQkF4Q3NCLHVCQUF1QjtnQkFDbEIsaUJBQWlCOzZDQUMxQyxNQUFNLFNBQUMsV0FBVzs7SUFmbUI7UUFBdkMsS0FBSyxDQUFDLCtCQUErQixDQUFDO29FQUF1QztJQUpuRSxnQ0FBZ0M7UUFKNUMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHlEQUF5RDtZQUNuRSxRQUFRLEVBQUUseUJBQXlCO1NBQ3BDLENBQUM7UUFvQkcsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FuQlgsZ0NBQWdDLENBMEQ1QztJQUFELHVDQUFDO0NBQUEsQUExREQsSUEwREM7U0ExRFksZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgSW5qZWN0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRU1QVFlfQ09MT1IsIGNvZXJjZUhleGFDb2xvciwgaXNWYWxpZENvbG9yLCBNY2NDb2xvclBpY2tlck9wdGlvbiB9IGZyb20gJy4vY29sb3ItcGlja2VyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBjaGFuZ2UgdGhlIGJhY2tncm91bmQgb2YgdGhlIGJ1dHRvblxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWNjQ29sb3JQaWNrZXJPcHRpb25dLCBbbWNjLWNvbG9yLXBpY2tlci1vcHRpb25dJyxcclxuICBleHBvcnRBczogJ21jY0NvbG9yUGlja2VyT3B0aW9uJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1jY0NvbG9yUGlja2VyT3B0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgLyoqXHJcbiAgICogUmVjZWl2ZSB0aGUgY29sb3JcclxuICAgKi9cclxuICBASW5wdXQoJ21jY0NvbG9yUGlja2VyT3B0aW9uJylcclxuICBnZXQgY29sb3IoKTogTWNjQ29sb3JQaWNrZXJPcHRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IE1jY0NvbG9yUGlja2VyT3B0aW9uKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvcjogTWNjQ29sb3JQaWNrZXJPcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMixcclxuICAgIEBJbmplY3QoRU1QVFlfQ09MT1IpIHByaXZhdGUgZW1wdHlDb2xvcjogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IGVtcHR5Q29sb3I7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jb2xvcikge1xyXG4gICAgICBsZXQgY29sb3I6IHN0cmluZztcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbG9yID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb2xvciA9IHRoaXMuY29sb3IudmFsdWU7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1sYWJlbCcsIHRoaXMuY29sb3IudGV4dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc1ZhbGlkQ29sb3IoY29sb3IpKSB7XHJcbiAgICAgICAgLy8gYXBwbHkgdGhlIGNvbG9yXHJcbiAgICAgICAgdGhpcy5yZW5kZXIuc2V0U3R5bGUoXHJcbiAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICdiYWNrZ3JvdW5kJyxcclxuICAgICAgICAgIGNvZXJjZUhleGFDb2xvcihjb2xvcikgfHwgdGhpcy5lbXB0eUNvbG9yXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERpcmVjdGl2ZSBhcHBsaWVkIHRvIGFuIGVsZW1lbnQgdG8gbWFrZSBpdCB1c2FibGUgYXMgYW4gb3JpZ2luIGZvciBhbiBDb2xvclBpY2tlci5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21jYy1jb2xvci1waWNrZXItb3JpZ2luXSwgW21jY0NvbG9yUGlja2VyT3JpZ2luXScsXHJcbiAgZXhwb3J0QXM6ICdtY2NDb2xvclBpY2tlck9yaWdpbicsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNY2NDb2xvclBpY2tlck9yaWdpbkRpcmVjdGl2ZSksXHJcbiAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWNjQ29sb3JQaWNrZXJPcmlnaW5EaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgLyoqXHJcbiAgICogRW1pdCBjaGFuZ2VzIGZyb20gdGhlIG9yaWdpblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KCcnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogUHJvcGFnYXRlIGNoYW5nZXMgdG8gYW5ndWxhclxyXG4gICAqL1xyXG4gIHByb3BhZ2F0ZUNoYW5nZXM6IChfOiBhbnkpID0+IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGVsZW1lbnQgb24gd2hpY2ggdGhlIGRpcmVjdGl2ZSBpcyBhcHBsaWVkLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgQEluamVjdChFTVBUWV9DT0xPUikgcHJpdmF0ZSBlbXB0eUNvbG9yOiBzdHJpbmdcclxuICApIHtcclxuICAgIC8vIGxpc3RlbiBjaGFuZ2VzIG9ua2V5dXAgYW5kIHVwZGF0ZSBjb2xvciBwaWNrZXJcclxuICAgIHJlbmRlcmVyLmxpc3RlbihlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdrZXl1cCcsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gZXZlbnQuY3VycmVudFRhcmdldFsndmFsdWUnXTtcclxuICAgICAgaWYgKGV2ZW50LmlzVHJ1c3RlZCAmJiBpc1ZhbGlkQ29sb3IodmFsdWUpKSB7XHJcbiAgICAgICAgdGhpcy53cml0ZVZhbHVlRnJvbUtleXVwKGNvZXJjZUhleGFDb2xvcih2YWx1ZSkgfHwgdGhpcy5lbXB0eUNvbG9yKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHRvIHdyaXRlIHRvIHRoZSB2aWV3IHdoZW5cclxuICAgKiBwcm9ncmFtbWF0aWMgKG1vZGVsIC0+IHZpZXcpIGNoYW5nZXMgYXJlIHJlcXVlc3RlZC5cclxuICAgKi9cclxuICB3cml0ZVZhbHVlKGNvbG9yOiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIGNvbG9yKTtcclxuICAgIHRoaXMuY2hhbmdlLm5leHQoY29sb3IpO1xyXG4gICAgaWYgKHRoaXMucHJvcGFnYXRlQ2hhbmdlcykge1xyXG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMoY29sb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYnkgdGhlIGNvbG9yIHBpY2tlclxyXG4gICAqL1xyXG4gIHdyaXRlVmFsdWVGcm9tQ29sb3JQaWNrZXIoY29sb3I6IHN0cmluZykge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgY29sb3IpO1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKGNvbG9yKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGZyb20gb3JpZ2luIHdoZSBrZXkgaXMgdXBcclxuICAgKi9cclxuICB3cml0ZVZhbHVlRnJvbUtleXVwKGNvbG9yOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuY2hhbmdlLm5leHQoY29sb3IpO1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2VzKGNvbG9yKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgb24gaW5pdGlhbGl6YXRpb24gc28gaXQgY2FuIHVwZGF0ZSB0aGVcclxuICAgKiBmb3JtIG1vZGVsIHdoZW4gdmFsdWVzIHByb3BhZ2F0ZSBmcm9tIHRoZSB2aWV3ICh2aWV3IC0+IG1vZGVsKS5cclxuICAgKiBAcGFyYW0gZm4gYW55XHJcbiAgICovXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZXMgPSBmbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgb24gaW5pdGlhbGl6YXRpb24gc28gaXQgY2FuIHVwZGF0ZSB0aGUgZm9ybSBtb2RlbCBvbiBibHVyXHJcbiAgICogQHBhcmFtIGZuIGFueVxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIHdoZW4gdGhlIGNvbnRyb2wgc3RhdHVzIGNoYW5nZXMgdG8gb3IgZnJvbSBcIkRJU0FCTEVEXCJcclxuICAgKiBAcGFyYW0gaXNEaXNhYmxlZCBib29sZWFuXHJcbiAgICovXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaXJlY3RpdmUgY29ubmVjdCBhbiBjb2xvciBwaWNrZXIgd2l0aCBhbnkgaW5wdXQsIHNlbGVjdCBvciB0ZXh0YXJlYS5cclxuICogVGhlIGNvbG9yIHBpY2tlciB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgdXBkYXRlZCB3aGVuIHRoZSB2YWx1ZSBvZiB0aGUgb3JpZ2luIGlzXHJcbiAqIGNoYW5nZWQuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttY2MtY29ubmVjdGVkLWNvbG9yLXBpY2tlcl0sIFttY2NDb25uZWN0ZWRDb2xvclBpY2tlcl0nLFxyXG4gIGV4cG9ydEFzOiAnbWNjQ29ubmVjdGVkQ29sb3JQaWNrZXInLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWNjQ29ubmVjdGVkQ29sb3JQaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIE9yaWdpbiBvZiB0aGUgY29ubmVjdGVkIGNvbG9yIHBpY2tlclxyXG4gICAqL1xyXG4gIEBJbnB1dCgnbWNjQ29ubmVjdGVkQ29sb3JQaWNrZXJPcmlnaW4nKSBvcmlnaW46IE1jY0NvbG9yUGlja2VyT3JpZ2luRGlyZWN0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBDb2xvciBwaWNrZXIgc3Vic2NyaXB0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY29sb3JQaWNrZXJTdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogT3JpZ2luIHN1YnNjcmlwdGlvblxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29yaWdpblN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29sb3JQaWNrZXI6IE1jY0NvbG9yUGlja2VyQ29tcG9uZW50LFxyXG4gICAgcHVibGljIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIEBJbmplY3QoRU1QVFlfQ09MT1IpIHByaXZhdGUgZW1wdHlDb2xvcjogc3RyaW5nXHJcbiAgKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbG9yUGlja2VyU3ViKSB7XHJcbiAgICAgIHRoaXMuX2F0dGFjaENvbG9yUGlja2VyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9jb2xvclBpY2tlclN1YiAmJiAhdGhpcy5fY29sb3JQaWNrZXJTdWIuY2xvc2VkKSB7XHJcbiAgICAgIHRoaXMuX2NvbG9yUGlja2VyU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fb3JpZ2luU3ViICYmICF0aGlzLl9vcmlnaW5TdWIuY2xvc2VkKSB7XHJcbiAgICAgIHRoaXMuX29yaWdpblN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoIGNvbG9yIHBpY2tlciBhbmQgb3JpZ2luXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXR0YWNoQ29sb3JQaWNrZXIoKTogdm9pZCB7XHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gb3JpZ2luIGNoYW5nZSB0byB1cGRhdGUgY29sb3IgcGlja2VyXHJcbiAgICB0aGlzLl9vcmlnaW5TdWIgPSB0aGlzLm9yaWdpbi5jaGFuZ2Uuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGlzVmFsaWRDb2xvcih2YWx1ZSkgfHxcclxuICAgICAgICAodmFsdWUgPT09IHRoaXMuZW1wdHlDb2xvciAmJiB0aGlzLmNvbG9yUGlja2VyLnNlbGVjdGVkQ29sb3IgIT09IHRoaXMuZW1wdHlDb2xvcilcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvclBpY2tlci51cGRhdGVUbXBTZWxlY3RlZENvbG9yKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNvbG9yUGlja2VyLnNlbGVjdGVkQ29sb3IgPSB2YWx1ZTtcclxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gY29sb3IgcGlja2VyIGNoYW5nZXMgYW5kIHNldCBvbiBvcmlnaW4gZWxlbWVudFxyXG4gICAgdGhpcy5fY29sb3JQaWNrZXJTdWIgPSB0aGlzLmNvbG9yUGlja2VyLmNoYW5nZS5zdWJzY3JpYmUodmFsdWUgPT5cclxuICAgICAgdGhpcy5vcmlnaW4ud3JpdGVWYWx1ZUZyb21Db2xvclBpY2tlcih2YWx1ZSlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==