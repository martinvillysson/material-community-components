import { __decorate, __param } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, QueryList, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EMPTY_COLOR, coerceHexaColor } from './color-picker';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccColorPickerService } from './color-picker.service';
let MccColorPickerComponent = class MccColorPickerComponent {
    constructor(elementRef, changeDetectorRef, colorPickerService, emptyColor) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.colorPickerService = colorPickerService;
        this.emptyColor = emptyColor;
        this._usedColorLabel = 'Used Colors';
        this._reverseUsedColor = false;
        this._hideHexForms = false;
        this._hideEmpty = false;
        this._hideTransparent = false;
        this._hideUsedColors = false;
        this._isOpen = false;
        this._overlay = true;
        this._hideButtons = false;
        this._colorPickerSelectorHeight = 170;
        this._hideColorPickerSelector = false;
        /**
         * Set the size of the used colors
         */
        this.usedSizeColors = 30;
        /**
         * Change btnCancel label
         */
        this.btnCancel = 'Cancel';
        /**
         * Change btnConfirm label
         */
        this.btnConfirm = 'Confirm';
        /**
         * Event emitted when user change the selected color (without confirm)
         */
        this.change = new EventEmitter();
        /**
         * Event emitted when selected color is confirm
         */
        this.selected = new EventEmitter();
        /**
         * Event emitted when is clicked outside of the component
         */
        this.clickOut = new EventEmitter();
        /**
         * Array of subscriptions from the collections
         */
        this._collectionSubs = [];
    }
    /**
     * Change label of the collection UsedColors
     */
    get usedColorLabel() {
        return this._usedColorLabel;
    }
    set usedColorLabel(value) {
        this._usedColorLabel = value;
    }
    /**
     * Set initial value for used color
     */
    set usedColorStart(colors) {
        if (colors && colors.length > 0) {
            for (const color of colors) {
                this.colorPickerService.addColor(color);
            }
        }
    }
    /**
     * Set usedColor to be used in reverse
     */
    set reverseUsedColors(reverse) {
        this._reverseUsedColor = coerceBooleanProperty(reverse);
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
    /**
     * Hide empty slots from the collection UsedColors
     */
    get hideEmpty() {
        return this._hideEmpty;
    }
    set hideEmpty(value) {
        this._hideEmpty = coerceBooleanProperty(value);
    }
    /**
     * Hide transparent option of UsedColors
     */
    get hideTransparent() {
        return this._hideTransparent;
    }
    set hideTransparent(value) {
        this._hideTransparent = coerceBooleanProperty(value);
    }
    /**
     * Hide UsedColors collection
     */
    get hideUsedColors() {
        return this._hideUsedColors;
    }
    set hideUsedColors(value) {
        this._hideUsedColors = coerceBooleanProperty(value);
    }
    /**
     * Start with a color selected
     */
    get selectedColor() {
        return this._selectedColor;
    }
    set selectedColor(value) {
        if (this._selectedColor !== value) {
            this.changeDetectorRef.markForCheck();
        }
        this._selectedColor = coerceHexaColor(value) || this.emptyColor;
    }
    /**
     * Define if the panel will be initiated open
     */
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = coerceBooleanProperty(value);
    }
    /**
     * Define if the panel will show in overlay or not
     */
    get overlay() {
        return this._overlay;
    }
    set overlay(value) {
        this._overlay = coerceBooleanProperty(value);
    }
    /**
     * Hide the action buttons (cancel/confirm)
     */
    get hideButtons() {
        return this._hideButtons;
    }
    set hideButtons(value) {
        this._hideButtons = coerceBooleanProperty(value);
    }
    /**
     * Define new height for the selector
     */
    get colorPickerSelectorHeight() {
        return this._colorPickerSelectorHeight;
    }
    set colorPickerSelectorHeight(height) {
        this._colorPickerSelectorHeight = height;
    }
    /**
     * Hide the color picker selector
     */
    get hideColorPickerSelector() {
        return this._hideColorPickerSelector;
    }
    set hideColorPickerSelector(value) {
        this._hideColorPickerSelector = coerceBooleanProperty(value);
    }
    /**
     * Return a Observable with the color the user is picking
     */
    get tmpSelectedColor$() {
        return this._tmpSelectedColor.asObservable();
    }
    /**
     * Observable with all the colors used by the user
     */
    get usedColors$() {
        return this.colorPickerService
            .getColors()
            .pipe(map(colors => (!this._reverseUsedColor ? colors : [...colors].reverse())));
    }
    ngOnInit() {
        if (!this._selectedColor) {
            this._selectedColor = this.emptyColor;
        }
        this._tmpSelectedColor = new BehaviorSubject(this._selectedColor);
    }
    /**
     * Walk throw all collections and subcribe to changes
     */
    ngAfterContentInit() {
        if (this._collections) {
            this._collections.forEach((collection) => {
                const subscription = collection.changeColor.subscribe(color => {
                    this.updateTmpSelectedColor(color);
                });
                this._collectionSubs.push(subscription);
            });
        }
    }
    /**
     * Destroy all subscriptions
     */
    ngOnDestroy() {
        if (this._collectionSubs) {
            this._collectionSubs.forEach((subscription) => {
                if (subscription && !subscription.closed) {
                    subscription.unsubscribe();
                }
            });
        }
    }
    /**
     * Update selected color and emit the change
     */
    _updateSelectedColor() {
        if (this._isOpen || !this.overlay) {
            const tmpSelectedColor = this._tmpSelectedColor.getValue();
            if (this._selectedColor !== tmpSelectedColor) {
                this._selectedColor = tmpSelectedColor;
                this.selected.next(this._selectedColor);
            }
            else {
                this.selected.emit(this._selectedColor);
            }
        }
    }
    /**
     * Open/close color picker panel
     */
    toggle() {
        this._isOpen = !this._isOpen;
        if (!this._isOpen && this._selectedColor !== this.emptyColor) {
            this.colorPickerService.addColor(this._selectedColor);
        }
    }
    /**
     * Update selected color, close the panel and notify the user
     */
    backdropClick() {
        if (this._hideButtons) {
            this.confirmSelectedColor();
        }
        else {
            this.cancelSelection();
        }
        this.clickOut.emit(null);
    }
    /**
     * Update tmpSelectedColor
     * @param color string
     */
    updateTmpSelectedColor(color) {
        if (color) {
            this._tmpSelectedColor.next(color);
            this.change.next(color);
            if (this._hideButtons) {
                this._updateSelectedColor();
            }
        }
    }
    /**
     * Cancel the selection and close the panel
     */
    cancelSelection() {
        this._tmpSelectedColor.next(this._selectedColor);
        this.toggle();
    }
    /**
     * Update selectedColor and close the panel
     */
    confirmSelectedColor() {
        this._updateSelectedColor();
        this.toggle();
    }
};
MccColorPickerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: MccColorPickerService },
    { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] }
];
__decorate([
    ContentChildren(MccColorPickerCollectionComponent)
], MccColorPickerComponent.prototype, "_collections", void 0);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "usedColorLabel", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "usedColorStart", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "reverseUsedColors", null);
__decorate([
    Input('hideHexForms')
], MccColorPickerComponent.prototype, "hideHexForms", null);
__decorate([
    Input('hideEmptyUsedColors')
], MccColorPickerComponent.prototype, "hideEmpty", null);
__decorate([
    Input('hideTransparentUsedColors')
], MccColorPickerComponent.prototype, "hideTransparent", null);
__decorate([
    Input('hideUsedColors')
], MccColorPickerComponent.prototype, "hideUsedColors", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "selectedColor", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "isOpen", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "overlay", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "hideButtons", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "colorPickerSelectorHeight", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "hideColorPickerSelector", null);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "usedSizeColors", void 0);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "btnCancel", void 0);
__decorate([
    Input()
], MccColorPickerComponent.prototype, "btnConfirm", void 0);
__decorate([
    Output()
], MccColorPickerComponent.prototype, "change", void 0);
__decorate([
    Output()
], MccColorPickerComponent.prototype, "selected", void 0);
__decorate([
    Output()
], MccColorPickerComponent.prototype, "clickOut", void 0);
MccColorPickerComponent = __decorate([
    Component({
        selector: 'mcc-color-picker',
        template: "<!-- color picker overlay -->\r\n<ng-container *ngIf=\"overlay\">\r\n    <button type=\"button\" class=\"btn-picker\" cdkOverlayOrigin #trigger=\"cdkOverlayOrigin\" [ngClass]=\"{ 'empty': selectedColor === emptyColor }\"\r\n        [style.background]=\"selectedColor\" (click)=\"toggle()\">\r\n        <div class=\"transparent\" *ngIf=\"selectedColor === emptyColor\"></div>\r\n    </button>\r\n\r\n    <ng-template cdkConnectedOverlay cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"mcc-color-picker-backdrop\"\r\n        [cdkConnectedOverlayOrigin]=\"trigger\" [cdkConnectedOverlayOpen]=\"isOpen\" (backdropClick)=\"backdropClick()\">\r\n\r\n        <ng-template [cdkPortalOutlet]=\"overlayPanel\"></ng-template>\r\n\r\n    </ng-template>\r\n</ng-container>\r\n\r\n<!-- color picker flat -->\r\n<ng-template *ngIf=\"!overlay\" [cdkPortalOutlet]=\"overlayPanel\"></ng-template>\r\n\r\n<!-- color picker component content -->\r\n<ng-template cdkPortal #overlayPanel=\"cdkPortal\">\r\n\r\n    <div class=\"mcc-color-picker-overlay mat-elevation-z6\" role=\"dialog\" aria-label=\"Color picker\">\r\n\r\n        <mcc-color-picker-selector *ngIf=\"!hideColorPickerSelector\" [selectedColor]=\"tmpSelectedColor$ | async\" [hideHexForms]=\"hideHexForms\"\r\n            [height]=\"colorPickerSelectorHeight\" (changeSelectedColor)=\"updateTmpSelectedColor($event)\">\r\n        </mcc-color-picker-selector>\r\n\r\n        <mcc-color-picker-collection *ngIf=\"!hideUsedColors\" [label]=\"usedColorLabel\" [size]=\"usedSizeColors\" [transparent]=\"!hideTransparent\"\r\n            [hideEmpty]=\"hideEmpty\" [colors]=\"usedColors$ | async\" (changeColor)=\"updateTmpSelectedColor($event)\">\r\n        </mcc-color-picker-collection>\r\n\r\n        <ng-content></ng-content>\r\n\r\n        <div *ngIf=\"!hideButtons\" class=\"mcc-color-picker-actions\">\r\n\r\n            <button mat-button role=\"button\" aria-label=\"Cancel\" (click)=\"cancelSelection()\">\r\n                {{ btnCancel }}\r\n            </button>\r\n\r\n            <button mat-button role=\"button\" aria-label=\"Confirm\" (click)=\"confirmSelectedColor()\">\r\n                {{ btnConfirm }}\r\n            </button>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n</ng-template>",
        preserveWhitespaces: false,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: ["@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);.btn-picker{width:25px;height:25px;cursor:pointer;background:0 0;border:2px solid #ddd}.btn-picker.empty{background:#fff!important}.mcc-color-picker-overlay{display:flex;width:260px;min-height:80px;position:relative;flex-direction:column;padding:0;background:#fff;font-family:'Open Sans',sans-serif}.mcc-color-picker-overlay .mcc-color-picker-preview{width:100%;height:8px}.transparent{width:32px;height:2px;border-bottom:2px solid red;transform:translateY(-3px) translateX(-2px) rotate(45deg);-webkit-transform:translateY(-2px) translateX(-11px) rotate(45deg);position:absolute}.mcc-color-picker-actions{display:flex;padding:4px;border-top:1px solid #ddd}.mcc-color-picker-actions button{color:#100214;text-transform:uppercase;font-family:'Open Sans',sans-serif;font-size:12px;font-weight:400;flex-grow:1}"]
    }),
    __param(3, Inject(EMPTY_COLOR))
], MccColorPickerComponent);
export { MccColorPickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBNEIsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFTL0QsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUF3TmxDLFlBQ1UsVUFBc0IsRUFDdEIsaUJBQW9DLEVBQ3BDLGtCQUF5QyxFQUNyQixVQUFrQjtRQUh0QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtRQUNyQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBM014QyxvQkFBZSxHQUFXLGFBQWEsQ0FBQztRQXFCeEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBWW5DLGtCQUFhLEdBQVks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RTswREFHUDtBQVVEO0lBREMsS0FBSyxFQUFFO3dFQUdQO0FBVUQ7SUFEQyxLQUFLLEVBQUU7c0VBR1A7QUFTUTtJQUFSLEtBQUssRUFBRTsrREFBNkI7QUFLNUI7SUFBUixLQUFLLEVBQUU7MERBQThCO0FBSzdCO0lBQVIsS0FBSyxFQUFFOzJEQUFnQztBQUs5QjtJQUFULE1BQU0sRUFBRTt1REFBNkI7QUFLNUI7SUFBVCxNQUFNLEVBQUU7eURBQStCO0FBSzlCO0lBQVQsTUFBTSxFQUFFO3lEQUErQjtBQWhNN0IsdUJBQXVCO0lBUG5DLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIscXVFQUE0QztRQUU1QyxtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0lBNk5HLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBNU5YLHVCQUF1QixDQXFVbkM7U0FyVVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFF1ZXJ5TGlzdCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBFTVBUWV9DT0xPUiwgY29lcmNlSGV4YUNvbG9yIH0gZnJvbSAnLi9jb2xvci1waWNrZXInO1xyXG5pbXBvcnQgeyBNY2NDb2xvclBpY2tlckNvbGxlY3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbG9yLXBpY2tlci1jb2xsZWN0aW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyU2VydmljZSB9IGZyb20gJy4vY29sb3ItcGlja2VyLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtY2MtY29sb3ItcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb2xvci1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1jY0NvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIEdldCBhbGwgY29sbGVjdGlvbnNcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkcmVuKE1jY0NvbG9yUGlja2VyQ29sbGVjdGlvbkNvbXBvbmVudClcclxuICBfY29sbGVjdGlvbnM6IFF1ZXJ5TGlzdDxNY2NDb2xvclBpY2tlckNvbGxlY3Rpb25Db21wb25lbnQ+O1xyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgbGFiZWwgb2YgdGhlIGNvbGxlY3Rpb24gVXNlZENvbG9yc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHVzZWRDb2xvckxhYmVsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fdXNlZENvbG9yTGFiZWw7XHJcbiAgfVxyXG4gIHNldCB1c2VkQ29sb3JMYWJlbCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl91c2VkQ29sb3JMYWJlbCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF91c2VkQ29sb3JMYWJlbDogc3RyaW5nID0gJ1VzZWQgQ29sb3JzJztcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGluaXRpYWwgdmFsdWUgZm9yIHVzZWQgY29sb3JcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCB1c2VkQ29sb3JTdGFydChjb2xvcnM6IHN0cmluZ1tdKSB7XHJcbiAgICBpZiAoY29sb3JzICYmIGNvbG9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGZvciAoY29uc3QgY29sb3Igb2YgY29sb3JzKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuYWRkQ29sb3IoY29sb3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdXNlZENvbG9yIHRvIGJlIHVzZWQgaW4gcmV2ZXJzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHJldmVyc2VVc2VkQ29sb3JzKHJldmVyc2U6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3JldmVyc2VVc2VkQ29sb3IgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmV2ZXJzZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3JldmVyc2VVc2VkQ29sb3I6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZSB0aGUgaGV4YWRlY2ltYWwgY29sb3IgZm9ybXMuXHJcbiAgICovXHJcbiAgQElucHV0KCdoaWRlSGV4Rm9ybXMnKVxyXG4gIGdldCBoaWRlSGV4Rm9ybXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlkZUhleEZvcm1zO1xyXG4gIH1cclxuICBzZXQgaGlkZUhleEZvcm1zKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oaWRlSGV4Rm9ybXMgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaGlkZUhleEZvcm1zOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUgZW1wdHkgc2xvdHMgZnJvbSB0aGUgY29sbGVjdGlvbiBVc2VkQ29sb3JzXHJcbiAgICovXHJcbiAgQElucHV0KCdoaWRlRW1wdHlVc2VkQ29sb3JzJylcclxuICBnZXQgaGlkZUVtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpZGVFbXB0eTtcclxuICB9XHJcbiAgc2V0IGhpZGVFbXB0eSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faGlkZUVtcHR5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaGlkZUVtcHR5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUgdHJhbnNwYXJlbnQgb3B0aW9uIG9mIFVzZWRDb2xvcnNcclxuICAgKi9cclxuICBASW5wdXQoJ2hpZGVUcmFuc3BhcmVudFVzZWRDb2xvcnMnKVxyXG4gIGdldCBoaWRlVHJhbnNwYXJlbnQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlkZVRyYW5zcGFyZW50O1xyXG4gIH1cclxuICBzZXQgaGlkZVRyYW5zcGFyZW50KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oaWRlVHJhbnNwYXJlbnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9oaWRlVHJhbnNwYXJlbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZSBVc2VkQ29sb3JzIGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBASW5wdXQoJ2hpZGVVc2VkQ29sb3JzJylcclxuICBnZXQgaGlkZVVzZWRDb2xvcnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlkZVVzZWRDb2xvcnM7XHJcbiAgfVxyXG4gIHNldCBoaWRlVXNlZENvbG9ycyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faGlkZVVzZWRDb2xvcnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9oaWRlVXNlZENvbG9yczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBTdGFydCB3aXRoIGEgY29sb3Igc2VsZWN0ZWRcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RlZENvbG9yKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRDb2xvcjtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkQ29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkQ29sb3IgIT09IHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2VsZWN0ZWRDb2xvciA9IGNvZXJjZUhleGFDb2xvcih2YWx1ZSkgfHwgdGhpcy5lbXB0eUNvbG9yO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmluZSBpZiB0aGUgcGFuZWwgd2lsbCBiZSBpbml0aWF0ZWQgb3BlblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc09wZW47XHJcbiAgfVxyXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzT3BlbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmUgaWYgdGhlIHBhbmVsIHdpbGwgc2hvdyBpbiBvdmVybGF5IG9yIG5vdFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG92ZXJsYXkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmxheTtcclxuICB9XHJcbiAgc2V0IG92ZXJsYXkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX292ZXJsYXkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuICBwcml2YXRlIF9vdmVybGF5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZSB0aGUgYWN0aW9uIGJ1dHRvbnMgKGNhbmNlbC9jb25maXJtKVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGhpZGVCdXR0b25zKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpZGVCdXR0b25zO1xyXG4gIH1cclxuICBzZXQgaGlkZUJ1dHRvbnModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2hpZGVCdXR0b25zID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaGlkZUJ1dHRvbnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lIG5ldyBoZWlnaHQgZm9yIHRoZSBzZWxlY3RvclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yUGlja2VyU2VsZWN0b3JIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvclBpY2tlclNlbGVjdG9ySGVpZ2h0O1xyXG4gIH1cclxuICBzZXQgY29sb3JQaWNrZXJTZWxlY3RvckhlaWdodChoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5fY29sb3JQaWNrZXJTZWxlY3RvckhlaWdodCA9IGhlaWdodDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3JQaWNrZXJTZWxlY3RvckhlaWdodDogbnVtYmVyID0gMTcwO1xyXG5cclxuICAvKipcclxuICAgKiBIaWRlIHRoZSBjb2xvciBwaWNrZXIgc2VsZWN0b3JcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBoaWRlQ29sb3JQaWNrZXJTZWxlY3RvcigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9oaWRlQ29sb3JQaWNrZXJTZWxlY3RvcjtcclxuICB9XHJcbiAgc2V0IGhpZGVDb2xvclBpY2tlclNlbGVjdG9yKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oaWRlQ29sb3JQaWNrZXJTZWxlY3RvciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2hpZGVDb2xvclBpY2tlclNlbGVjdG9yOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgc2l6ZSBvZiB0aGUgdXNlZCBjb2xvcnNcclxuICAgKi9cclxuICBASW5wdXQoKSB1c2VkU2l6ZUNvbG9yczogbnVtYmVyID0gMzA7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZSBidG5DYW5jZWwgbGFiZWxcclxuICAgKi9cclxuICBASW5wdXQoKSBidG5DYW5jZWw6IHN0cmluZyA9ICdDYW5jZWwnO1xyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgYnRuQ29uZmlybSBsYWJlbFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGJ0bkNvbmZpcm06IHN0cmluZyA9ICdDb25maXJtJztcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHVzZXIgY2hhbmdlIHRoZSBzZWxlY3RlZCBjb2xvciAod2l0aG91dCBjb25maXJtKVxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBzZWxlY3RlZCBjb2xvciBpcyBjb25maXJtXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gaXMgY2xpY2tlZCBvdXRzaWRlIG9mIHRoZSBjb21wb25lbnRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgY2xpY2tPdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhIE9ic2VydmFibGUgd2l0aCB0aGUgY29sb3IgdGhlIHVzZXIgaXMgcGlja2luZ1xyXG4gICAqL1xyXG4gIGdldCB0bXBTZWxlY3RlZENvbG9yJCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RtcFNlbGVjdGVkQ29sb3IuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3RtcFNlbGVjdGVkQ29sb3I6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+O1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIHdpdGggYWxsIHRoZSBjb2xvcnMgdXNlZCBieSB0aGUgdXNlclxyXG4gICAqL1xyXG4gIGdldCB1c2VkQ29sb3JzJCgpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xvclBpY2tlclNlcnZpY2VcclxuICAgICAgLmdldENvbG9ycygpXHJcbiAgICAgIC5waXBlKG1hcChjb2xvcnMgPT4gKCF0aGlzLl9yZXZlcnNlVXNlZENvbG9yID8gY29sb3JzIDogWy4uLmNvbG9yc10ucmV2ZXJzZSgpKSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXJyYXkgb2Ygc3Vic2NyaXB0aW9ucyBmcm9tIHRoZSBjb2xsZWN0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NvbGxlY3Rpb25TdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBjb2xvclBpY2tlclNlcnZpY2U6IE1jY0NvbG9yUGlja2VyU2VydmljZSxcclxuICAgIEBJbmplY3QoRU1QVFlfQ09MT1IpIHB1YmxpYyBlbXB0eUNvbG9yOiBzdHJpbmdcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLl9zZWxlY3RlZENvbG9yKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkQ29sb3IgPSB0aGlzLmVtcHR5Q29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fdG1wU2VsZWN0ZWRDb2xvciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih0aGlzLl9zZWxlY3RlZENvbG9yKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdhbGsgdGhyb3cgYWxsIGNvbGxlY3Rpb25zIGFuZCBzdWJjcmliZSB0byBjaGFuZ2VzXHJcbiAgICovXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKHRoaXMuX2NvbGxlY3Rpb25zKSB7XHJcbiAgICAgIHRoaXMuX2NvbGxlY3Rpb25zLmZvckVhY2goKGNvbGxlY3Rpb246IE1jY0NvbG9yUGlja2VyQ29sbGVjdGlvbkNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGNvbGxlY3Rpb24uY2hhbmdlQ29sb3Iuc3Vic2NyaWJlKGNvbG9yID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlVG1wU2VsZWN0ZWRDb2xvcihjb2xvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb25TdWJzLnB1c2goc3Vic2NyaXB0aW9uKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IGFsbCBzdWJzY3JpcHRpb25zXHJcbiAgICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fY29sbGVjdGlvblN1YnMpIHtcclxuICAgICAgdGhpcy5fY29sbGVjdGlvblN1YnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pID0+IHtcclxuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uICYmICFzdWJzY3JpcHRpb24uY2xvc2VkKSB7XHJcbiAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHNlbGVjdGVkIGNvbG9yIGFuZCBlbWl0IHRoZSBjaGFuZ2VcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVTZWxlY3RlZENvbG9yKCkge1xyXG4gICAgaWYgKHRoaXMuX2lzT3BlbiB8fCAhdGhpcy5vdmVybGF5KSB7XHJcbiAgICAgIGNvbnN0IHRtcFNlbGVjdGVkQ29sb3IgPSB0aGlzLl90bXBTZWxlY3RlZENvbG9yLmdldFZhbHVlKCk7XHJcbiAgICAgIGlmICh0aGlzLl9zZWxlY3RlZENvbG9yICE9PSB0bXBTZWxlY3RlZENvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRDb2xvciA9IHRtcFNlbGVjdGVkQ29sb3I7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5uZXh0KHRoaXMuX3NlbGVjdGVkQ29sb3IpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdCh0aGlzLl9zZWxlY3RlZENvbG9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3Blbi9jbG9zZSBjb2xvciBwaWNrZXIgcGFuZWxcclxuICAgKi9cclxuICB0b2dnbGUoKSB7XHJcbiAgICB0aGlzLl9pc09wZW4gPSAhdGhpcy5faXNPcGVuO1xyXG4gICAgaWYgKCF0aGlzLl9pc09wZW4gJiYgdGhpcy5fc2VsZWN0ZWRDb2xvciAhPT0gdGhpcy5lbXB0eUNvbG9yKSB7XHJcbiAgICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmFkZENvbG9yKHRoaXMuX3NlbGVjdGVkQ29sb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHNlbGVjdGVkIGNvbG9yLCBjbG9zZSB0aGUgcGFuZWwgYW5kIG5vdGlmeSB0aGUgdXNlclxyXG4gICAqL1xyXG4gIGJhY2tkcm9wQ2xpY2soKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5faGlkZUJ1dHRvbnMpIHtcclxuICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRDb2xvcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYW5jZWxTZWxlY3Rpb24oKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xpY2tPdXQuZW1pdChudWxsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0bXBTZWxlY3RlZENvbG9yXHJcbiAgICogQHBhcmFtIGNvbG9yIHN0cmluZ1xyXG4gICAqL1xyXG4gIHVwZGF0ZVRtcFNlbGVjdGVkQ29sb3IoY29sb3I6IHN0cmluZykge1xyXG4gICAgaWYgKGNvbG9yKSB7XHJcbiAgICAgIHRoaXMuX3RtcFNlbGVjdGVkQ29sb3IubmV4dChjb2xvcik7XHJcbiAgICAgIHRoaXMuY2hhbmdlLm5leHQoY29sb3IpO1xyXG4gICAgICBpZiAodGhpcy5faGlkZUJ1dHRvbnMpIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVTZWxlY3RlZENvbG9yKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbmNlbCB0aGUgc2VsZWN0aW9uIGFuZCBjbG9zZSB0aGUgcGFuZWxcclxuICAgKi9cclxuICBjYW5jZWxTZWxlY3Rpb24oKSB7XHJcbiAgICB0aGlzLl90bXBTZWxlY3RlZENvbG9yLm5leHQodGhpcy5fc2VsZWN0ZWRDb2xvcik7XHJcbiAgICB0aGlzLnRvZ2dsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHNlbGVjdGVkQ29sb3IgYW5kIGNsb3NlIHRoZSBwYW5lbFxyXG4gICAqL1xyXG4gIGNvbmZpcm1TZWxlY3RlZENvbG9yKCkge1xyXG4gICAgdGhpcy5fdXBkYXRlU2VsZWN0ZWRDb2xvcigpO1xyXG4gICAgdGhpcy50b2dnbGUoKTtcclxuICB9XHJcbn1cclxuIl19