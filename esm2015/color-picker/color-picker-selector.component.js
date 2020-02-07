import { __decorate, __param } from "tslib";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EMPTY_COLOR, coerceHexaColor, isValidColor } from './color-picker';
let MccColorPickerSelectorComponent = class MccColorPickerSelectorComponent {
    constructor(formBuilder, render, emptyColor) {
        this.formBuilder = formBuilder;
        this.render = render;
        this.emptyColor = emptyColor;
        this._height = 170;
        this._selectedColor = '';
        this._hideHexForms = false;
        /**
         * Emit update when a color is selected
         */
        this.changeSelectedColor = new EventEmitter();
        /**
         * RGBA current color
         */
        this._rgbaColor = 'rgba(255,0,0,1)';
        /**
         * Handle color of the text
         */
        this.textClass = 'black';
        /**
         * Validate if the mouse button is pressed
         */
        this._isPressed = false;
        /**
         * Form and keys of the fields in RGB
         */
        this.rgbKeys = ['R', 'G', 'B'];
    }
    /**
     * Canvas of the block
     */
    set blockCursor(el) {
        this._bc = el;
    }
    /**
     * Container of the strip
     */
    set stripCursor(el) {
        this._sc = el;
    }
    /**
     * Change height base of the selector
     */
    set height(value) {
        this._height = value;
    }
    get selectorHeight() {
        return this._height;
    }
    get stripHeight() {
        return this._height - 10;
    }
    /**
     * Receive selected color from the component
     */
    get selectedColor() {
        return this._selectedColor;
    }
    set selectedColor(value) {
        this._selectedColor = value || this.emptyColor;
    }
    /**
     * Hide the hexadecimal color forms.
     */
    get hideHexForms() {
        return this._hideHexForms;
    }
    set hideHexForms(value) {
        this._hideHexForms = value;
    }
    ngOnInit() {
        this._tmpSelectedColor = new BehaviorSubject(this._selectedColor);
        this._tmpSelectedColorSub = this._tmpSelectedColor.subscribe(color => {
            if (color !== this._selectedColor && isValidColor(color)) {
                if (this.hexForm.get('hexCode').value !== color) {
                    this.hexForm.setValue({ hexCode: color });
                }
                this.changeSelectedColor.emit(coerceHexaColor(color) || this.emptyColor);
            }
        });
        // hex form
        this.hexForm = this.formBuilder.group({
            hexCode: [this.selectedColor, [Validators.minLength(7), Validators.maxLength(7)]],
        });
        // rgb dynamic form
        const rgbGroup = {};
        const rgbValue = this._getRGB();
        this.rgbKeys.forEach((key, index) => (rgbGroup[key] = new FormControl(rgbValue[index], {
            validators: [
                Validators.min(0),
                Validators.max(256),
                Validators.required,
                Validators.maxLength(3),
            ],
            updateOn: 'blur',
        })));
        this.rgbForm = this.formBuilder.group(rgbGroup);
        // watch changes on forms
        this._onChanges();
    }
    /**
     * Update RGB, RGBA and Gradient when selectedColor change and
     * the mouse button is pressed
     * @param changes SimpleChanges
     */
    ngOnChanges(changes) {
        if ('selectedColor' in changes && changes['selectedColor'].currentValue !== this.emptyColor) {
            if (!this._isPressed) {
                this._updateRGB();
                this._updateRGBA();
                if (this._blockContext) {
                    this._fillGradient();
                }
            }
            const rgb = this._getRGB();
            const o = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000);
            this.textClass = o > 125 ? 'black' : 'white';
        }
    }
    /**
     * Destroy all subscriptions
     */
    ngOnDestroy() {
        if (this._tmpSelectedColorSub && !this._tmpSelectedColorSub.closed) {
            this._tmpSelectedColorSub.unsubscribe();
        }
        if (this._hexValuesSub && !this._hexValuesSub.closed) {
            this._hexValuesSub.unsubscribe();
        }
        if (this._rgbValuesSub && !this._rgbValuesSub.closed) {
            this._rgbValuesSub.unsubscribe();
        }
    }
    ngAfterViewInit() {
        this.render.listen(this._block.nativeElement, 'mousedown', e => {
            this._isPressed = true;
            this.changeColor(e);
        });
        this.render.listen(this._block.nativeElement, 'mouseup', () => (this._isPressed = false));
        this.render.listen(this._block.nativeElement, 'mouseout', () => (this._isPressed = false));
        this.render.listen(this._block.nativeElement, 'mousemove', e => this.changeColor(e));
        this._blockContext = this._bc.nativeElement.getContext('2d');
        this._blockContext.rect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
        this.render.listen(this._strip.nativeElement, 'mousedown', e => {
            this._isPressed = true;
            this.changeBaseColor(e);
        });
        this.render.listen(this._strip.nativeElement, 'mouseup', () => (this._isPressed = false));
        this.render.listen(this._strip.nativeElement, 'mouseout', () => (this._isPressed = false));
        this.render.listen(this._strip.nativeElement, 'mousemove', e => this.changeBaseColor(e));
        this._stripContext = this._strip.nativeElement.getContext('2d');
        this._stripContext.rect(0, 0, this._strip.nativeElement.width, this._strip.nativeElement.height);
        const grd1 = this._stripContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
        grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
        grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
        this._stripContext.fillStyle = grd1;
        this._stripContext.fill();
        this._fillGradient();
    }
    /**
     * Generate colors based on the RGBA color
     */
    _fillGradient() {
        this._blockContext.fillStyle = this._rgbaColor;
        this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
        const grdWhite = this._stripContext.createLinearGradient(0, 0, this._bc.nativeElement.width, 0);
        grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
        grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
        this._blockContext.fillStyle = grdWhite;
        this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
        const grdBlack = this._stripContext.createLinearGradient(0, 0, 0, this._bc.nativeElement.height);
        grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
        grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
        this._blockContext.fillStyle = grdBlack;
        this._blockContext.fillRect(0, 0, this._bc.nativeElement.width, this._bc.nativeElement.height);
    }
    /**
     * Watch change on forms
     */
    _onChanges() {
        // validate digited code and update when digitation is finished
        this._hexValuesSub = this.hexForm.get('hexCode').valueChanges
            .pipe(map(color => color !== this.emptyColor ? coerceHexaColor(color) : color))
            .subscribe(value => {
            if (!this._isPressed && isValidColor(value)) {
                this._tmpSelectedColor.next(value || this.emptyColor);
            }
        });
        this._rgbValuesSub = this.rgbForm.valueChanges.subscribe(controls => {
            const data = [];
            for (const key in controls) {
                if (!controls[key] && controls[key] !== 0 || controls[key] > 255) {
                    data.push('');
                    continue;
                }
                data.push(controls[key]);
            }
            const hex = this._getHex(data);
            if (hex !== this._selectedColor && hex.length === 7) {
                this._tmpSelectedColor.next(hex);
            }
        });
    }
    /**
     * Convert HEX/canvas value to rgb
     * @param data any
     * @returns number[]
     */
    _getRGB(data) {
        if (data) {
            return [data[0], data[1], data[2]];
        }
        const hex = this._selectedColor.replace('#', '');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return [r, g, b];
    }
    /**
     * Convert RGB value to HEX
     * @param data any
     * @returns string
     */
    _getHex(data) {
        const hex = new Array(3);
        hex[0] = data[0].toString(16);
        hex[1] = data[1].toString(16);
        hex[2] = data[2].toString(16);
        hex.forEach((val, key) => {
            if (val.length === 1) {
                hex[key] = '0' + hex[key];
            }
        });
        return coerceHexaColor(`${hex[0]}${hex[1]}${hex[2]}`) || this.emptyColor;
    }
    /**
     * Update RGBA color
     * @param data any
     */
    _updateRGBA(data) {
        if (!this._selectedColor && !data) {
            this._rgbaColor = 'rgba(255,0,0,1)';
        }
        const rgb = this._getRGB(data);
        this._rgbaColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
    }
    /**
     * Update RGB form
     * @param data any
     */
    _updateRGB(data) {
        if (!this.rgbForm) {
            return;
        }
        if (!data) {
            data = this._getRGB();
        }
        this.rgbForm.setValue({ R: data[0], G: data[1], B: data[2] });
    }
    /**
     * Get selected base color from the canvas
     * @param e MouseEvent
     */
    changeBaseColor(e) {
        if (this._isPressed) {
            this.render.setStyle(this._sc.nativeElement, 'background-position-y', `${e.offsetY}px`);
            const data = this._stripContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            this._updateRGBA(data);
            this._fillGradient();
            this.updateValues(data);
        }
    }
    /**
     * Get selected color from the canvas
     * @param e MouseEvent
     */
    changeColor(e) {
        if (this._isPressed) {
            this.render.setStyle(this._bp.nativeElement, 'top', `${e.offsetY - 5}px`);
            this.render.setStyle(this._bp.nativeElement, 'left', `${e.offsetX - 5}px`);
            const data = this._blockContext.getImageData(e.offsetX, e.offsetY, 1, 1).data;
            this.updateValues(data);
        }
    }
    /**
     * Emit update from the selected color
     * @param data any
     */
    updateValues(data) {
        if (data) {
            this._updateRGB(data);
            this._tmpSelectedColor.next(this._getHex(data));
        }
    }
};
MccColorPickerSelectorComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: Renderer2 },
    { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
];
__decorate([
    ViewChild('block')
], MccColorPickerSelectorComponent.prototype, "_block", void 0);
__decorate([
    ViewChild('blockPointer')
], MccColorPickerSelectorComponent.prototype, "_bp", void 0);
__decorate([
    ViewChild('blockCanvas')
], MccColorPickerSelectorComponent.prototype, "blockCursor", null);
__decorate([
    ViewChild('strip')
], MccColorPickerSelectorComponent.prototype, "_strip", void 0);
__decorate([
    ViewChild('stripContainer')
], MccColorPickerSelectorComponent.prototype, "stripCursor", null);
__decorate([
    Input('height')
], MccColorPickerSelectorComponent.prototype, "height", null);
__decorate([
    Input()
], MccColorPickerSelectorComponent.prototype, "selectedColor", null);
__decorate([
    Input('hideHexForms')
], MccColorPickerSelectorComponent.prototype, "hideHexForms", null);
__decorate([
    Output()
], MccColorPickerSelectorComponent.prototype, "changeSelectedColor", void 0);
MccColorPickerSelectorComponent = __decorate([
    Component({
        selector: 'mcc-color-picker-selector',
        template: "<div class=\"mcc-color-picker-selector\" [ngStyle]=\"{ 'height.px': selectorHeight }\">\r\n    <div #block class=\"mcc-picker-selector\"></div>\r\n    <canvas #blockCanvas [height]=\"selectorHeight\" width=\"230\" id=\"picker\"></canvas>\r\n    <div #blockPointer class=\"mcc-picker-position\" style=\"top: 0px;left: 220px;\"></div>\r\n\r\n    <div #stripContainer class=\"mcc-colors-position\" style=\"background-position-y: 0px;\">\r\n        <canvas #strip [height]=\"stripHeight\" width=\"20\" id=\"colors\"></canvas>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"mcc-color-picker-selector-preview\" [style.background]=\"selectedColor\">\r\n    <ng-container *ngIf=\"!hideHexForms\">\r\n        <form [formGroup]=\"hexForm\">\r\n            <mat-form-field class=\"hex-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\r\n                <input matInput placeholder=\"HEX\" maxlength=\"7\" formControlName=\"hexCode\" [value]=\"selectedColor\" />\r\n            </mat-form-field>\r\n        </form>\r\n\r\n        <form [formGroup]=\"rgbForm\">\r\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\r\n                <input matInput type=\"number\" placeholder=\"RGB\" maxlength=\"3\" formControlName=\"R\" />\r\n            </mat-form-field>\r\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\r\n                <input matInput type=\"number\" maxlength=\"3\" formControlName=\"G\" />\r\n            </mat-form-field>\r\n            <mat-form-field class=\"rgb-input\" floatLabel=\"always\" [ngClass]=\"textClass\">\r\n                <input matInput type=\"number\" maxlength=\"3\" formControlName=\"B\" />\r\n            </mat-form-field>\r\n        </form>\r\n    </ng-container>\r\n</div>",
        preserveWhitespaces: false,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: ["canvas#colors{margin:5px}canvas:hover{cursor:crosshair}.mcc-picker-selector{position:absolute;width:230px;height:170px;top:0;left:0;z-index:10;cursor:crosshair}.mcc-picker-position{position:absolute;width:10px;height:10px;z-index:1;border:1px solid #ddd;border-radius:50%;background:rgba(0,0,0,.3)}.mcc-colors-position{position:absolute;width:30px;height:160px;top:0;right:0;z-index:1;background:url(data:image/gif;base64,R0lGODdhHgAIALMAAAAAADU1NTk5OUJCQkpKSlZWVltbW2pqaoCAgP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAkAAAoALAAAAAAeAAgAAAQw0BhFq734yjJm/p8xFEVAeGCqGERACmahgkUrvPH81cFdnjoQy8VBBTOiguSokkQAADs=) no-repeat}.mcc-color-picker-selector{height:170px}::ng-deep mat-form-field{font-family:'Open Sans';font-size:11px;font-weight:700}::ng-deep mat-form-field.black{color:#100214}::ng-deep mat-form-field.black label{color:#100214}::ng-deep mat-form-field.black .mat-form-field-underline{background-color:#100214}::ng-deep mat-form-field.white{color:#fff}::ng-deep mat-form-field.white label{color:#fff}::ng-deep mat-form-field.white .mat-form-field-underline{background-color:#fff}.mcc-color-picker-selector-preview{height:40px;padding:15px;border-bottom:1px solid #e1e1e1;box-sizing:content-box}.mcc-color-picker-selector-preview form{display:inline-block;position:relative}.mcc-color-picker-selector-preview .hex-input{width:75px;margin-right:20px}.mcc-color-picker-selector-preview .hex-input input{font-size:16px;font-weight:400}.mcc-color-picker-selector-preview .rgb-input{width:40px;margin-right:5px}.mcc-color-picker-selector-preview .rgb-input input{font-size:16px;font-weight:400}"]
    }),
    __param(2, Inject(EMPTY_COLOR))
], MccColorPickerSelectorComponent);
export { MccColorPickerSelectorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxhQUFhLEVBQ2IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFjNUUsSUFBYSwrQkFBK0IsR0FBNUMsTUFBYSwrQkFBK0I7SUFnSTFDLFlBQ1UsV0FBd0IsRUFDeEIsTUFBaUIsRUFDSSxVQUFrQjtRQUZ2QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ0ksZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQWhGekMsWUFBTyxHQUFXLEdBQUcsQ0FBQztRQVl0QixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQVk1QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUV2Qzs7V0FFRztRQUNPLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkQ7O1dBRUc7UUFDSyxlQUFVLEdBQVcs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RUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQzdELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixJ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QVMsQ0FBQztRQUNULFFBQVEsRUFBRSwyQkFBMkI7UUFDckMsNHdEQUFxRDtRQUVyRCxtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0lBb0lHLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBbklYLCtCQUErQixDQXNaM0M7U0F0WlksK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDaGlsZCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgRU1QVFlfQ09MT1IsIGNvZXJjZUhleGFDb2xvciwgaXNWYWxpZENvbG9yIH0gZnJvbSAnLi9jb2xvci1waWNrZXInO1xyXG5cclxuaW50ZXJmYWNlIENvbG9yT3B0aW9uIHtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgdmFsdWU6IG51bWJlcjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtY2MtY29sb3ItcGlja2VyLXNlbGVjdG9yJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3ItcGlja2VyLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb2xvci1waWNrZXItc2VsZWN0b3IuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1jY0NvbG9yUGlja2VyU2VsZWN0b3JDb21wb25lbnRcclxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIEVsZW1lblJlZiBvZiB0aGUgbWFpbiBjb2xvclxyXG4gICAqL1xyXG4gICBAVmlld0NoaWxkKCdibG9jaycpIF9ibG9jazogRWxlbWVudFJlZjtcclxuXHJcbiAgLyoqXHJcbiAgICogRWxlbWVuUmVmIG9mIHRoZSBwb2ludGVyIG1haW4gY29sb3JcclxuICAgKi9cclxuICBAVmlld0NoaWxkKCdibG9ja1BvaW50ZXInKSBfYnA6IEVsZW1lbnRSZWY7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbnZhcyBvZiB0aGUgYmxvY2tcclxuICAgKi9cclxuICBAVmlld0NoaWxkKCdibG9ja0NhbnZhcycpXHJcbiAgc2V0IGJsb2NrQ3Vyc29yKGVsOiBFbGVtZW50UmVmKSB7XHJcbiAgICB0aGlzLl9iYyA9IGVsO1xyXG4gIH1cclxuICBwcml2YXRlIF9iYzogRWxlbWVudFJlZjtcclxuICBwcml2YXRlIF9ibG9ja0NvbnRleHQ6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogRWxlbWVudFJlZiBvZiB0aGUgY29sb3IgYmFzZVxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoJ3N0cmlwJykgX3N0cmlwOiBFbGVtZW50UmVmO1xyXG4gIC8vIGhvbGQgX3N0cmlwIGNvbnRleHRcclxuICBwcml2YXRlIF9zdHJpcENvbnRleHQ6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29udGFpbmVyIG9mIHRoZSBzdHJpcFxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoJ3N0cmlwQ29udGFpbmVyJylcclxuICBzZXQgc3RyaXBDdXJzb3IoZWw6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuX3NjID0gZWw7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NjOiBFbGVtZW50UmVmO1xyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgaGVpZ2h0IGJhc2Ugb2YgdGhlIHNlbGVjdG9yXHJcbiAgICovXHJcbiAgQElucHV0KCdoZWlnaHQnKVxyXG4gIHNldCBoZWlnaHQodmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBzZWxlY3RvckhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcclxuICB9XHJcbiAgZ2V0IHN0cmlwSGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5faGVpZ2h0IC0gMTA7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyID0gMTcwO1xyXG5cclxuICAvKipcclxuICAgKiBSZWNlaXZlIHNlbGVjdGVkIGNvbG9yIGZyb20gdGhlIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdGVkQ29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZENvbG9yO1xyXG4gIH1cclxuICBzZXQgc2VsZWN0ZWRDb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZENvbG9yID0gdmFsdWUgfHwgdGhpcy5lbXB0eUNvbG9yO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZENvbG9yOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZSB0aGUgaGV4YWRlY2ltYWwgY29sb3IgZm9ybXMuXHJcbiAgICovXHJcbiAgQElucHV0KCdoaWRlSGV4Rm9ybXMnKVxyXG4gIGdldCBoaWRlSGV4Rm9ybXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlkZUhleEZvcm1zO1xyXG4gIH1cclxuICBzZXQgaGlkZUhleEZvcm1zKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oaWRlSGV4Rm9ybXMgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaGlkZUhleEZvcm1zOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgdXBkYXRlIHdoZW4gYSBjb2xvciBpcyBzZWxlY3RlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2VTZWxlY3RlZENvbG9yID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBSR0JBIGN1cnJlbnQgY29sb3JcclxuICAgKi9cclxuICBwcml2YXRlIF9yZ2JhQ29sb3I6IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMSknO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJqZWN0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGVkIGNvbG9yIGJ5IHRoZSB1c2VyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdG1wU2VsZWN0ZWRDb2xvcjogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz47XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmlwdGlvbiBvZiB0aGUgdG1wU2VsZWN0ZWRDb2xvciBPYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdG1wU2VsZWN0ZWRDb2xvclN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gb2YgdGhlIGhleEZvcm0gdmFsdWVzIGNoYW5nZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2hleFZhbHVlc1N1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gb2YgdGhlIHJiZ0Zvcm0gdmFsdWVzIGNoYW5nZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JnYlZhbHVlc1N1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgY29sb3Igb2YgdGhlIHRleHRcclxuICAgKi9cclxuICB0ZXh0Q2xhc3M6IHN0cmluZyA9ICdibGFjayc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRlIGlmIHRoZSBtb3VzZSBidXR0b24gaXMgcHJlc3NlZFxyXG4gICAqL1xyXG4gIF9pc1ByZXNzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybSBvZiB0aGUgY29sb3IgaW4gaGV4YVxyXG4gICAqL1xyXG4gIGhleEZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybSBhbmQga2V5cyBvZiB0aGUgZmllbGRzIGluIFJHQlxyXG4gICAqL1xyXG4gIHJnYktleXMgPSBbJ1InLCAnRycsICdCJ107XHJcbiAgcmdiRm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMixcclxuICAgIEBJbmplY3QoRU1QVFlfQ09MT1IpIHByaXZhdGUgZW1wdHlDb2xvcjogc3RyaW5nXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX3RtcFNlbGVjdGVkQ29sb3IgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4odGhpcy5fc2VsZWN0ZWRDb2xvcik7XHJcbiAgICB0aGlzLl90bXBTZWxlY3RlZENvbG9yU3ViID0gdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5zdWJzY3JpYmUoY29sb3IgPT4ge1xyXG4gICAgICBpZiAoY29sb3IgIT09IHRoaXMuX3NlbGVjdGVkQ29sb3IgJiYgaXNWYWxpZENvbG9yKGNvbG9yKSkge1xyXG4gICAgICAgIGlmICh0aGlzLmhleEZvcm0uZ2V0KCdoZXhDb2RlJykudmFsdWUgIT09IGNvbG9yKSB7XHJcbiAgICAgICAgICB0aGlzLmhleEZvcm0uc2V0VmFsdWUoeyBoZXhDb2RlOiBjb2xvciB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZENvbG9yLmVtaXQoY29lcmNlSGV4YUNvbG9yKGNvbG9yKSB8fCB0aGlzLmVtcHR5Q29sb3IpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBoZXggZm9ybVxyXG4gICAgdGhpcy5oZXhGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIGhleENvZGU6IFt0aGlzLnNlbGVjdGVkQ29sb3IsIFtWYWxpZGF0b3JzLm1pbkxlbmd0aCg3KSwgVmFsaWRhdG9ycy5tYXhMZW5ndGgoNyldXSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHJnYiBkeW5hbWljIGZvcm1cclxuICAgIGNvbnN0IHJnYkdyb3VwOiBhbnkgPSB7fTtcclxuICAgIGNvbnN0IHJnYlZhbHVlOiBudW1iZXJbXSA9IHRoaXMuX2dldFJHQigpO1xyXG4gICAgdGhpcy5yZ2JLZXlzLmZvckVhY2goXHJcbiAgICAgIChrZXksIGluZGV4KSA9PlxyXG4gICAgICAgIChyZ2JHcm91cFtrZXldID0gbmV3IEZvcm1Db250cm9sKHJnYlZhbHVlW2luZGV4XSwge1xyXG4gICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICBWYWxpZGF0b3JzLm1pbigwKSxcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5tYXgoMjU2KSxcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMyksXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgdXBkYXRlT246ICdibHVyJyxcclxuICAgICAgICB9KSlcclxuICAgICk7XHJcbiAgICB0aGlzLnJnYkZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHJnYkdyb3VwKTtcclxuXHJcbiAgICAvLyB3YXRjaCBjaGFuZ2VzIG9uIGZvcm1zXHJcbiAgICB0aGlzLl9vbkNoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBSR0IsIFJHQkEgYW5kIEdyYWRpZW50IHdoZW4gc2VsZWN0ZWRDb2xvciBjaGFuZ2UgYW5kXHJcbiAgICogdGhlIG1vdXNlIGJ1dHRvbiBpcyBwcmVzc2VkXHJcbiAgICogQHBhcmFtIGNoYW5nZXMgU2ltcGxlQ2hhbmdlc1xyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmICgnc2VsZWN0ZWRDb2xvcicgaW4gY2hhbmdlcyAmJiBjaGFuZ2VzWydzZWxlY3RlZENvbG9yJ10uY3VycmVudFZhbHVlICE9PSB0aGlzLmVtcHR5Q29sb3IpIHtcclxuICAgICAgaWYgKCF0aGlzLl9pc1ByZXNzZWQpIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVSR0IoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVSR0JBKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Jsb2NrQ29udGV4dCkge1xyXG4gICAgICAgICAgdGhpcy5fZmlsbEdyYWRpZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZ2IgPSB0aGlzLl9nZXRSR0IoKTtcclxuICAgICAgY29uc3QgbyA9IE1hdGgucm91bmQoKHJnYlswXSAqIDI5OSArIHJnYlsxXSAqIDU4NyArIHJnYlsyXSAqIDExNCkgLyAxMDAwKTtcclxuICAgICAgdGhpcy50ZXh0Q2xhc3MgPSBvID4gMTI1ID8gJ2JsYWNrJyA6ICd3aGl0ZSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IGFsbCBzdWJzY3JpcHRpb25zXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fdG1wU2VsZWN0ZWRDb2xvclN1YiAmJiAhdGhpcy5fdG1wU2VsZWN0ZWRDb2xvclN1Yi5jbG9zZWQpIHtcclxuICAgICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvclN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2hleFZhbHVlc1N1YiAmJiAhdGhpcy5faGV4VmFsdWVzU3ViLmNsb3NlZCkge1xyXG4gICAgICB0aGlzLl9oZXhWYWx1ZXNTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9yZ2JWYWx1ZXNTdWIgJiYgIXRoaXMuX3JnYlZhbHVlc1N1Yi5jbG9zZWQpIHtcclxuICAgICAgdGhpcy5fcmdiVmFsdWVzU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fYmxvY2submF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicsIGUgPT4ge1xyXG4gICAgICB0aGlzLl9pc1ByZXNzZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNoYW5nZUNvbG9yKGUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fYmxvY2submF0aXZlRWxlbWVudCwgJ21vdXNldXAnLCAoKSA9PiAodGhpcy5faXNQcmVzc2VkID0gZmFsc2UpKTtcclxuICAgIHRoaXMucmVuZGVyLmxpc3Rlbih0aGlzLl9ibG9jay5uYXRpdmVFbGVtZW50LCAnbW91c2VvdXQnLCAoKSA9PiAodGhpcy5faXNQcmVzc2VkID0gZmFsc2UpKTtcclxuICAgIHRoaXMucmVuZGVyLmxpc3Rlbih0aGlzLl9ibG9jay5uYXRpdmVFbGVtZW50LCAnbW91c2Vtb3ZlJywgZSA9PiB0aGlzLmNoYW5nZUNvbG9yKGUpKTtcclxuICAgIHRoaXMuX2Jsb2NrQ29udGV4dCA9IHRoaXMuX2JjLm5hdGl2ZUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHRoaXMuX2Jsb2NrQ29udGV4dC5yZWN0KDAsIDAsIHRoaXMuX2JjLm5hdGl2ZUVsZW1lbnQud2lkdGgsIHRoaXMuX2JjLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fc3RyaXAubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicsIGUgPT4ge1xyXG4gICAgICB0aGlzLl9pc1ByZXNzZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNoYW5nZUJhc2VDb2xvcihlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZW5kZXIubGlzdGVuKHRoaXMuX3N0cmlwLm5hdGl2ZUVsZW1lbnQsICdtb3VzZXVwJywgKCkgPT4gKHRoaXMuX2lzUHJlc3NlZCA9IGZhbHNlKSk7XHJcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fc3RyaXAubmF0aXZlRWxlbWVudCwgJ21vdXNlb3V0JywgKCkgPT4gKHRoaXMuX2lzUHJlc3NlZCA9IGZhbHNlKSk7XHJcbiAgICB0aGlzLnJlbmRlci5saXN0ZW4odGhpcy5fc3RyaXAubmF0aXZlRWxlbWVudCwgJ21vdXNlbW92ZScsIGUgPT4gdGhpcy5jaGFuZ2VCYXNlQ29sb3IoZSkpO1xyXG4gICAgdGhpcy5fc3RyaXBDb250ZXh0ID0gdGhpcy5fc3RyaXAubmF0aXZlRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdGhpcy5fc3RyaXBDb250ZXh0LnJlY3QoXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIHRoaXMuX3N0cmlwLm5hdGl2ZUVsZW1lbnQud2lkdGgsXHJcbiAgICAgIHRoaXMuX3N0cmlwLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0XHJcbiAgICApO1xyXG4gICAgY29uc3QgZ3JkMSA9IHRoaXMuX3N0cmlwQ29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LmhlaWdodCk7XHJcbiAgICBncmQxLmFkZENvbG9yU3RvcCgwLCAncmdiYSgyNTUsIDAsIDAsIDEpJyk7XHJcbiAgICBncmQxLmFkZENvbG9yU3RvcCgwLjE3LCAncmdiYSgyNTUsIDI1NSwgMCwgMSknKTtcclxuICAgIGdyZDEuYWRkQ29sb3JTdG9wKDAuMzQsICdyZ2JhKDAsIDI1NSwgMCwgMSknKTtcclxuICAgIGdyZDEuYWRkQ29sb3JTdG9wKDAuNTEsICdyZ2JhKDAsIDI1NSwgMjU1LCAxKScpO1xyXG4gICAgZ3JkMS5hZGRDb2xvclN0b3AoMC42OCwgJ3JnYmEoMCwgMCwgMjU1LCAxKScpO1xyXG4gICAgZ3JkMS5hZGRDb2xvclN0b3AoMC44NSwgJ3JnYmEoMjU1LCAwLCAyNTUsIDEpJyk7XHJcbiAgICBncmQxLmFkZENvbG9yU3RvcCgxLCAncmdiYSgyNTUsIDAsIDAsIDEpJyk7XHJcbiAgICB0aGlzLl9zdHJpcENvbnRleHQuZmlsbFN0eWxlID0gZ3JkMTtcclxuICAgIHRoaXMuX3N0cmlwQ29udGV4dC5maWxsKCk7XHJcblxyXG4gICAgdGhpcy5fZmlsbEdyYWRpZW50KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmF0ZSBjb2xvcnMgYmFzZWQgb24gdGhlIFJHQkEgY29sb3JcclxuICAgKi9cclxuICBwcml2YXRlIF9maWxsR3JhZGllbnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fcmdiYUNvbG9yO1xyXG4gICAgdGhpcy5fYmxvY2tDb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2JjLm5hdGl2ZUVsZW1lbnQud2lkdGgsIHRoaXMuX2JjLm5hdGl2ZUVsZW1lbnQuaGVpZ2h0KTtcclxuXHJcbiAgICBjb25zdCBncmRXaGl0ZSA9IHRoaXMuX3N0cmlwQ29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LndpZHRoLCAwKTtcclxuICAgIGdyZFdoaXRlLmFkZENvbG9yU3RvcCgwLCAncmdiYSgyNTUsMjU1LDI1NSwxKScpO1xyXG4gICAgZ3JkV2hpdGUuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDI1NSwyNTUsMjU1LDApJyk7XHJcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFN0eWxlID0gZ3JkV2hpdGU7XHJcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC53aWR0aCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC5oZWlnaHQpO1xyXG5cclxuICAgIGNvbnN0IGdyZEJsYWNrID0gdGhpcy5fc3RyaXBDb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICB0aGlzLl9iYy5uYXRpdmVFbGVtZW50LmhlaWdodFxyXG4gICAgKTtcclxuICAgIGdyZEJsYWNrLmFkZENvbG9yU3RvcCgwLCAncmdiYSgwLDAsMCwwKScpO1xyXG4gICAgZ3JkQmxhY2suYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDAsMCwwLDEpJyk7XHJcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFN0eWxlID0gZ3JkQmxhY2s7XHJcbiAgICB0aGlzLl9ibG9ja0NvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC53aWR0aCwgdGhpcy5fYmMubmF0aXZlRWxlbWVudC5oZWlnaHQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2F0Y2ggY2hhbmdlIG9uIGZvcm1zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb25DaGFuZ2VzKCkge1xyXG4gICAgLy8gdmFsaWRhdGUgZGlnaXRlZCBjb2RlIGFuZCB1cGRhdGUgd2hlbiBkaWdpdGF0aW9uIGlzIGZpbmlzaGVkXHJcbiAgICB0aGlzLl9oZXhWYWx1ZXNTdWIgPSB0aGlzLmhleEZvcm0uZ2V0KCdoZXhDb2RlJykudmFsdWVDaGFuZ2VzXHJcbiAgICAgIC5waXBlKG1hcChjb2xvciA9PiBjb2xvciAhPT0gdGhpcy5lbXB0eUNvbG9yID8gY29lcmNlSGV4YUNvbG9yKGNvbG9yKSA6IGNvbG9yKSlcclxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc1ByZXNzZWQgJiYgaXNWYWxpZENvbG9yKHZhbHVlKSkge1xyXG4gICAgICAgICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5uZXh0KHZhbHVlIHx8IHRoaXMuZW1wdHlDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9yZ2JWYWx1ZXNTdWIgPSB0aGlzLnJnYkZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZShjb250cm9scyA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGE6IHN0cmluZ1tdID0gW107XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRyb2xzKSB7XHJcbiAgICAgICAgaWYgKCFjb250cm9sc1trZXldICYmIGNvbnRyb2xzW2tleV0gIT09IDAgfHwgY29udHJvbHNba2V5XSA+IDI1NSkge1xyXG4gICAgICAgICAgZGF0YS5wdXNoKCcnKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YS5wdXNoKGNvbnRyb2xzW2tleV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBoZXggPSB0aGlzLl9nZXRIZXgoZGF0YSk7XHJcbiAgICAgIGlmIChoZXggIT09IHRoaXMuX3NlbGVjdGVkQ29sb3IgJiYgaGV4Lmxlbmd0aCA9PT0gNykge1xyXG4gICAgICAgIHRoaXMuX3RtcFNlbGVjdGVkQ29sb3IubmV4dChoZXgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnQgSEVYL2NhbnZhcyB2YWx1ZSB0byByZ2JcclxuICAgKiBAcGFyYW0gZGF0YSBhbnlcclxuICAgKiBAcmV0dXJucyBudW1iZXJbXVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFJHQihkYXRhPzogYW55KTogbnVtYmVyW10ge1xyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIFtkYXRhWzBdLCBkYXRhWzFdLCBkYXRhWzJdXTtcclxuICAgIH1cclxuICAgIGNvbnN0IGhleCA9IHRoaXMuX3NlbGVjdGVkQ29sb3IucmVwbGFjZSgnIycsICcnKTtcclxuICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXguc2xpY2UoMCwgMiksIDE2KTtcclxuICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXguc2xpY2UoMiwgNCksIDE2KTtcclxuICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXguc2xpY2UoNCwgNiksIDE2KTtcclxuXHJcbiAgICByZXR1cm4gW3IsIGcsIGJdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydCBSR0IgdmFsdWUgdG8gSEVYXHJcbiAgICogQHBhcmFtIGRhdGEgYW55XHJcbiAgICogQHJldHVybnMgc3RyaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0SGV4KGRhdGE6IGFueSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBoZXggPSBuZXcgQXJyYXkoMyk7XHJcbiAgICBoZXhbMF0gPSBkYXRhWzBdLnRvU3RyaW5nKDE2KTtcclxuICAgIGhleFsxXSA9IGRhdGFbMV0udG9TdHJpbmcoMTYpO1xyXG4gICAgaGV4WzJdID0gZGF0YVsyXS50b1N0cmluZygxNik7XHJcblxyXG4gICAgaGV4LmZvckVhY2goKHZhbCwga2V5KSA9PiB7XHJcbiAgICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgaGV4W2tleV0gPSAnMCcgKyBoZXhba2V5XTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvZXJjZUhleGFDb2xvcihgJHtoZXhbMF19JHtoZXhbMV19JHtoZXhbMl19YCkgfHwgdGhpcy5lbXB0eUNvbG9yO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIFJHQkEgY29sb3JcclxuICAgKiBAcGFyYW0gZGF0YSBhbnlcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVSR0JBKGRhdGE/OiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5fc2VsZWN0ZWRDb2xvciAmJiAhZGF0YSkge1xyXG4gICAgICB0aGlzLl9yZ2JhQ29sb3IgPSAncmdiYSgyNTUsMCwwLDEpJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZ2IgPSB0aGlzLl9nZXRSR0IoZGF0YSk7XHJcbiAgICB0aGlzLl9yZ2JhQ29sb3IgPSBgcmdiYSgke3JnYlswXX0sICR7cmdiWzFdfSwgJHtyZ2JbMl19LCAxKWA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgUkdCIGZvcm1cclxuICAgKiBAcGFyYW0gZGF0YSBhbnlcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVSR0IoZGF0YT86IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnJnYkZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghZGF0YSkge1xyXG4gICAgICBkYXRhID0gdGhpcy5fZ2V0UkdCKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZ2JGb3JtLnNldFZhbHVlKHsgUjogZGF0YVswXSwgRzogZGF0YVsxXSwgQjogZGF0YVsyXSB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBzZWxlY3RlZCBiYXNlIGNvbG9yIGZyb20gdGhlIGNhbnZhc1xyXG4gICAqIEBwYXJhbSBlIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNoYW5nZUJhc2VDb2xvcihlKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5faXNQcmVzc2VkKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLnNldFN0eWxlKHRoaXMuX3NjLm5hdGl2ZUVsZW1lbnQsICdiYWNrZ3JvdW5kLXBvc2l0aW9uLXknLCBgJHtlLm9mZnNldFl9cHhgKTtcclxuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX3N0cmlwQ29udGV4dC5nZXRJbWFnZURhdGEoZS5vZmZzZXRYLCBlLm9mZnNldFksIDEsIDEpLmRhdGE7XHJcbiAgICAgIHRoaXMuX3VwZGF0ZVJHQkEoZGF0YSk7XHJcbiAgICAgIHRoaXMuX2ZpbGxHcmFkaWVudCgpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlcyhkYXRhKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBzZWxlY3RlZCBjb2xvciBmcm9tIHRoZSBjYW52YXNcclxuICAgKiBAcGFyYW0gZSBNb3VzZUV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjaGFuZ2VDb2xvcihlKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5faXNQcmVzc2VkKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyLnNldFN0eWxlKHRoaXMuX2JwLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCBgJHtlLm9mZnNldFkgLSA1fXB4YCk7XHJcbiAgICAgIHRoaXMucmVuZGVyLnNldFN0eWxlKHRoaXMuX2JwLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgYCR7ZS5vZmZzZXRYIC0gNX1weGApO1xyXG5cclxuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2Jsb2NrQ29udGV4dC5nZXRJbWFnZURhdGEoZS5vZmZzZXRYLCBlLm9mZnNldFksIDEsIDEpLmRhdGE7XHJcbiAgICAgIHRoaXMudXBkYXRlVmFsdWVzKGRhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdCB1cGRhdGUgZnJvbSB0aGUgc2VsZWN0ZWQgY29sb3JcclxuICAgKiBAcGFyYW0gZGF0YSBhbnlcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZVZhbHVlcyhkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChkYXRhKSB7XHJcbiAgICAgIHRoaXMuX3VwZGF0ZVJHQihkYXRhKTtcclxuICAgICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvci5uZXh0KHRoaXMuX2dldEhleChkYXRhKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==