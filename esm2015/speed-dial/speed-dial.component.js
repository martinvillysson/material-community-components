import { __decorate } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { SPIN_ANIMATION } from './animations';
import { MccSpeedDialActionsComponent } from './speed-dial-actions.component';
let MccSpeedDialComponent = class MccSpeedDialComponent {
    constructor() {
        this._isOpen = false;
        this._hover = false;
        this._spin = true;
        this._direction = 'up';
        /**
         * Event emitted when open state change
         */
        this.openStateChange = new EventEmitter();
    }
    /**
     * Set initial 'open' state
     */
    set isOpen(open) {
        this._isOpen = coerceBooleanProperty(open);
    }
    get isOpen() {
        return this._isOpen;
    }
    /**
     * When enabled, handle open/close state on mouse hover
     */
    set hover(hover) {
        this._hover = coerceBooleanProperty(hover);
    }
    /**
     * Enable/disable spin animation when button is clicked or hovered
     */
    set spin(spin) {
        this._spin = spin;
    }
    get spin() {
        return this._spin;
    }
    /**
     * Define the direction of the actions button
     * Directions available are: up | down | left | right
     */
    set direction(direction) {
        this._direction = direction;
    }
    get direction() {
        return this._direction;
    }
    /**
     * Call fab speed dial actions functions to change the
     * visibility of the buttons
     */
    _setActionsState() {
        if (this._isOpen) {
            this.actions.show(this._direction);
        }
        else {
            this.actions.hide(this._direction);
        }
    }
    /**
     * Set initial state to the action buttons inside speed-dial-actions
     */
    ngAfterViewInit() {
        this._setActionsState();
    }
    /**
     *
     */
    ngOnChanges(changes) {
        if ('isOpen' in changes && changes['isOpen'].previousValue !== undefined) {
            this._setActionsState();
        }
    }
    /**
     * When mouseHover is enabled and state is closed
     * calls toggle to open the actions
     */
    hoverStart() {
        if (this._hover && !this._isOpen) {
            this.toggle();
        }
    }
    /**
     * When mouseHover is enabled and state is open
     * calls toggle to close the actions
     */
    hoverStop() {
        if (this._hover && this._isOpen) {
            this.toggle();
        }
    }
    /**
     * Change the open state
     */
    toggle() {
        this._isOpen = !this._isOpen;
        this._setActionsState();
        this.openStateChange.emit(this._isOpen);
    }
};
__decorate([
    ContentChild(MccSpeedDialActionsComponent)
], MccSpeedDialComponent.prototype, "actions", void 0);
__decorate([
    Input('open')
], MccSpeedDialComponent.prototype, "isOpen", null);
__decorate([
    Input('mouseHover')
], MccSpeedDialComponent.prototype, "hover", null);
__decorate([
    Input()
], MccSpeedDialComponent.prototype, "spin", null);
__decorate([
    Input()
], MccSpeedDialComponent.prototype, "direction", null);
__decorate([
    Output()
], MccSpeedDialComponent.prototype, "openStateChange", void 0);
MccSpeedDialComponent = __decorate([
    Component({
        selector: 'mcc-speed-dial',
        template: "<div class=\"mcc-speed-dial-container\" [ngClass]=\"'mcc-speed-dial-direction-' + direction\">\r\n  <button mat-fab [@spin]=\"spin && isOpen ? 'open' : 'closed'\" class=\"mat-elevation-z1\" (mouseenter)=\"hoverStart()\"\r\n    (mouseleave)=\"hoverStop()\" (click)=\"toggle()\">\r\n    <ng-content></ng-content>\r\n  </button>\r\n\r\n  <ng-content select=\"mcc-speed-dial-actions\"></ng-content>\r\n</div>",
        animations: [SPIN_ANIMATION],
        styles: [".mcc-speed-dial-container{position:relative;display:flex;align-items:center;z-index:20}.mcc-speed-dial-container button{pointer-events:auto;z-index:24}.mcc-speed-dial-container ::ng-deep mcc-speed-dial-actions{display:flex;height:auto}.mcc-speed-dial-container.mcc-speed-dial-direction-up{flex-direction:column}.mcc-speed-dial-container.mcc-speed-dial-direction-up button{order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-up ::ng-deep mcc-speed-dial-actions{flex-direction:column-reverse;order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-up ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-bottom:10px}.mcc-speed-dial-container.mcc-speed-dial-direction-down{flex-direction:column}.mcc-speed-dial-container.mcc-speed-dial-direction-down button{order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-down ::ng-deep mcc-speed-dial-actions{flex-direction:column;order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-down ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-top:10px}.mcc-speed-dial-container.mcc-speed-dial-direction-left{flex-direction:row}.mcc-speed-dial-container.mcc-speed-dial-direction-left button{order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-left ::ng-deep mcc-speed-dial-actions{flex-direction:row-reverse;order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-left ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-right:10px}.mcc-speed-dial-container.mcc-speed-dial-direction-right{flex-direction:row}.mcc-speed-dial-container.mcc-speed-dial-direction-right button{order:1}.mcc-speed-dial-container.mcc-speed-dial-direction-right ::ng-deep mcc-speed-dial-actions{flex-direction:row;order:2}.mcc-speed-dial-container.mcc-speed-dial-direction-right ::ng-deep mcc-speed-dial-actions .mat-mini-fab{margin-left:10px}"]
    })
], MccSpeedDialComponent);
export { MccSpeedDialComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWQtZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNwZWVkLWRpYWwvc3BlZWQtZGlhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU5QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVE5RSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQXFEaEM7UUF0Q1EsWUFBTyxHQUFZLEtBQUssQ0FBQztRQVF6QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBV3hCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFZdEIsZUFBVSxHQUFjLElBQUksQ0FBQztRQUVyQzs7V0FFRztRQUNPLG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7SUFFL0QsQ0FBQztJQS9DakI7O09BRUc7SUFDWSxJQUFJLE1BQU0sQ0FBQyxJQUFhO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBR0Q7O09BRUc7SUFDa0IsSUFBSSxLQUFLLENBQUMsS0FBYztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFHRDs7T0FFRztJQUNNLElBQUksSUFBSSxDQUFDLElBQWE7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBR0Q7OztPQUdHO0lBQ00sSUFBSSxTQUFTLENBQUMsU0FBb0I7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQztJQUNELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBVUQ7OztPQUdHO0lBQ0ssZ0JBQWdCO1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxRQUFRLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU3QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGLENBQUE7QUE3RzZDO0lBQTNDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQztzREFBdUM7QUFLbkU7SUFBZCxLQUFLLENBQUMsTUFBTSxDQUFDO21EQUViO0FBU29CO0lBQXBCLEtBQUssQ0FBQyxZQUFZLENBQUM7a0RBRW5CO0FBTVE7SUFBUixLQUFLLEVBQUU7aURBRVA7QUFVUTtJQUFSLEtBQUssRUFBRTtzREFFUDtBQVNTO0lBQVQsTUFBTSxFQUFFOzhEQUFzRTtBQW5EcEUscUJBQXFCO0lBTmpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsZ2FBQTBDO1FBRTFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQzs7S0FDN0IsQ0FBQztHQUNXLHFCQUFxQixDQWlIakM7U0FqSFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNQSU5fQU5JTUFUSU9OIH0gZnJvbSAnLi9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgRElSRUNUSU9OIH0gZnJvbSAnLi9kaXJlY3Rpb25zJztcclxuaW1wb3J0IHsgTWNjU3BlZWREaWFsQWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vc3BlZWQtZGlhbC1hY3Rpb25zLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21jYy1zcGVlZC1kaWFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3BlZWQtZGlhbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3BlZWQtZGlhbC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGFuaW1hdGlvbnM6IFtTUElOX0FOSU1BVElPTl0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNY2NTcGVlZERpYWxDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xyXG4gIC8qKlxyXG4gICAqIEhvbGQgc3BlZWQtZGlhbC1hY3Rpb25zIGNvbXBvbmVudCBpbnNpZGUgdGhpcyBjb21wb25lbnRcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkKE1jY1NwZWVkRGlhbEFjdGlvbnNDb21wb25lbnQpIGFjdGlvbnM6IE1jY1NwZWVkRGlhbEFjdGlvbnNDb21wb25lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBpbml0aWFsICdvcGVuJyBzdGF0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgnb3BlbicpIHNldCBpc09wZW4ob3BlbjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faXNPcGVuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KG9wZW4pO1xyXG4gIH1cclxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZW5hYmxlZCwgaGFuZGxlIG9wZW4vY2xvc2Ugc3RhdGUgb24gbW91c2UgaG92ZXJcclxuICAgKi9cclxuICBASW5wdXQoJ21vdXNlSG92ZXInKSBzZXQgaG92ZXIoaG92ZXI6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2hvdmVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhvdmVyKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfaG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlL2Rpc2FibGUgc3BpbiBhbmltYXRpb24gd2hlbiBidXR0b24gaXMgY2xpY2tlZCBvciBob3ZlcmVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IHNwaW4oc3BpbjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc3BpbiA9IHNwaW47XHJcbiAgfVxyXG4gIGdldCBzcGluKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NwaW47XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NwaW46IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgYWN0aW9ucyBidXR0b25cclxuICAgKiBEaXJlY3Rpb25zIGF2YWlsYWJsZSBhcmU6IHVwIHwgZG93biB8IGxlZnQgfCByaWdodFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCBkaXJlY3Rpb24oZGlyZWN0aW9uOiBESVJFQ1RJT04pIHtcclxuICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICB9XHJcbiAgZ2V0IGRpcmVjdGlvbigpOiBESVJFQ1RJT04ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlyZWN0aW9uOiBESVJFQ1RJT04gPSAndXAnO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gb3BlbiBzdGF0ZSBjaGFuZ2VcclxuICAgKi9cclxuICBAT3V0cHV0KCkgb3BlblN0YXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGwgZmFiIHNwZWVkIGRpYWwgYWN0aW9ucyBmdW5jdGlvbnMgdG8gY2hhbmdlIHRoZVxyXG4gICAqIHZpc2liaWxpdHkgb2YgdGhlIGJ1dHRvbnNcclxuICAgKi9cclxuICBwcml2YXRlIF9zZXRBY3Rpb25zU3RhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5faXNPcGVuKSB7XHJcbiAgICAgIHRoaXMuYWN0aW9ucy5zaG93KHRoaXMuX2RpcmVjdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGlvbnMuaGlkZSh0aGlzLl9kaXJlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGluaXRpYWwgc3RhdGUgdG8gdGhlIGFjdGlvbiBidXR0b25zIGluc2lkZSBzcGVlZC1kaWFsLWFjdGlvbnNcclxuICAgKi9cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLl9zZXRBY3Rpb25zU3RhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmICgnaXNPcGVuJyBpbiBjaGFuZ2VzICYmIGNoYW5nZXNbJ2lzT3BlbiddLnByZXZpb3VzVmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLl9zZXRBY3Rpb25zU3RhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gbW91c2VIb3ZlciBpcyBlbmFibGVkIGFuZCBzdGF0ZSBpcyBjbG9zZWRcclxuICAgKiBjYWxscyB0b2dnbGUgdG8gb3BlbiB0aGUgYWN0aW9uc1xyXG4gICAqL1xyXG4gIGhvdmVyU3RhcnQoKSB7XHJcbiAgICBpZiAodGhpcy5faG92ZXIgJiYgIXRoaXMuX2lzT3Blbikge1xyXG4gICAgICB0aGlzLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBtb3VzZUhvdmVyIGlzIGVuYWJsZWQgYW5kIHN0YXRlIGlzIG9wZW5cclxuICAgKiBjYWxscyB0b2dnbGUgdG8gY2xvc2UgdGhlIGFjdGlvbnNcclxuICAgKi9cclxuICBob3ZlclN0b3AoKSB7XHJcbiAgICBpZiAodGhpcy5faG92ZXIgJiYgdGhpcy5faXNPcGVuKSB7XHJcbiAgICAgIHRoaXMudG9nZ2xlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgdGhlIG9wZW4gc3RhdGVcclxuICAgKi9cclxuICB0b2dnbGUoKSB7XHJcbiAgICB0aGlzLl9pc09wZW4gPSAhdGhpcy5faXNPcGVuO1xyXG5cclxuICAgIHRoaXMuX3NldEFjdGlvbnNTdGF0ZSgpO1xyXG5cclxuICAgIHRoaXMub3BlblN0YXRlQ2hhbmdlLmVtaXQodGhpcy5faXNPcGVuKTtcclxuICB9XHJcbn1cclxuIl19