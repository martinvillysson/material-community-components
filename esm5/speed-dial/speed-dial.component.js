import { __decorate } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { SPIN_ANIMATION } from './animations';
import { MccSpeedDialActionsComponent } from './speed-dial-actions.component';
var MccSpeedDialComponent = /** @class */ (function () {
    function MccSpeedDialComponent() {
        this._isOpen = false;
        this._hover = false;
        this._spin = true;
        this._direction = 'up';
        /**
         * Event emitted when open state change
         */
        this.openStateChange = new EventEmitter();
    }
    Object.defineProperty(MccSpeedDialComponent.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        /**
         * Set initial 'open' state
         */
        set: function (open) {
            this._isOpen = coerceBooleanProperty(open);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccSpeedDialComponent.prototype, "hover", {
        /**
         * When enabled, handle open/close state on mouse hover
         */
        set: function (hover) {
            this._hover = coerceBooleanProperty(hover);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccSpeedDialComponent.prototype, "spin", {
        get: function () {
            return this._spin;
        },
        /**
         * Enable/disable spin animation when button is clicked or hovered
         */
        set: function (spin) {
            this._spin = spin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccSpeedDialComponent.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        /**
         * Define the direction of the actions button
         * Directions available are: up | down | left | right
         */
        set: function (direction) {
            this._direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Call fab speed dial actions functions to change the
     * visibility of the buttons
     */
    MccSpeedDialComponent.prototype._setActionsState = function () {
        if (this._isOpen) {
            this.actions.show(this._direction);
        }
        else {
            this.actions.hide(this._direction);
        }
    };
    /**
     * Set initial state to the action buttons inside speed-dial-actions
     */
    MccSpeedDialComponent.prototype.ngAfterViewInit = function () {
        this._setActionsState();
    };
    /**
     *
     */
    MccSpeedDialComponent.prototype.ngOnChanges = function (changes) {
        if ('isOpen' in changes && changes['isOpen'].previousValue !== undefined) {
            this._setActionsState();
        }
    };
    /**
     * When mouseHover is enabled and state is closed
     * calls toggle to open the actions
     */
    MccSpeedDialComponent.prototype.hoverStart = function () {
        if (this._hover && !this._isOpen) {
            this.toggle();
        }
    };
    /**
     * When mouseHover is enabled and state is open
     * calls toggle to close the actions
     */
    MccSpeedDialComponent.prototype.hoverStop = function () {
        if (this._hover && this._isOpen) {
            this.toggle();
        }
    };
    /**
     * Change the open state
     */
    MccSpeedDialComponent.prototype.toggle = function () {
        this._isOpen = !this._isOpen;
        this._setActionsState();
        this.openStateChange.emit(this._isOpen);
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
    return MccSpeedDialComponent;
}());
export { MccSpeedDialComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWQtZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNwZWVkLWRpYWwvc3BlZWQtZGlhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU5QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVE5RTtJQXFERTtRQXRDUSxZQUFPLEdBQVksS0FBSyxDQUFDO1FBUXpCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFXeEIsVUFBSyxHQUFZLElBQUksQ0FBQztRQVl0QixlQUFVLEdBQWMsSUFBSSxDQUFDO1FBRXJDOztXQUVHO1FBQ08sb0JBQWUsR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUUvRCxDQUFDO0lBNUNGLHNCQUFJLHlDQUFNO2FBR3pCO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7UUFSRDs7V0FFRzthQUNZLFVBQVcsSUFBYTtZQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBU29CLHNCQUFJLHdDQUFLO1FBSDlCOztXQUVHO2FBQ2tCLFVBQVUsS0FBYztZQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBTVEsc0JBQUksdUNBQUk7YUFHakI7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQztRQVJEOztXQUVHO2FBQ00sVUFBUyxJQUFhO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBVVEsc0JBQUksNENBQVM7YUFHdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQztRQVREOzs7V0FHRzthQUNNLFVBQWMsU0FBb0I7WUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFhRDs7O09BR0c7SUFDSyxnREFBZ0IsR0FBeEI7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwrQ0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMkNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUN4RSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCwwQ0FBVSxHQUFWO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCx5Q0FBUyxHQUFUO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQ0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFN0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUE1RzJDO1FBQTNDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQzswREFBdUM7SUFLbkU7UUFBZCxLQUFLLENBQUMsTUFBTSxDQUFDO3VEQUViO0lBU29CO1FBQXBCLEtBQUssQ0FBQyxZQUFZLENBQUM7c0RBRW5CO0lBTVE7UUFBUixLQUFLLEVBQUU7cURBRVA7SUFVUTtRQUFSLEtBQUssRUFBRTswREFFUDtJQVNTO1FBQVQsTUFBTSxFQUFFO2tFQUFzRTtJQW5EcEUscUJBQXFCO1FBTmpDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsZ2FBQTBDO1lBRTFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQzs7U0FDN0IsQ0FBQztPQUNXLHFCQUFxQixDQWlIakM7SUFBRCw0QkFBQztDQUFBLEFBakhELElBaUhDO1NBakhZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTUElOX0FOSU1BVElPTiB9IGZyb20gJy4vYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IERJUkVDVElPTiB9IGZyb20gJy4vZGlyZWN0aW9ucyc7XHJcbmltcG9ydCB7IE1jY1NwZWVkRGlhbEFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL3NwZWVkLWRpYWwtYWN0aW9ucy5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtY2Mtc3BlZWQtZGlhbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NwZWVkLWRpYWwuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NwZWVkLWRpYWwuY29tcG9uZW50LnNjc3MnXSxcclxuICBhbmltYXRpb25zOiBbU1BJTl9BTklNQVRJT05dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWNjU3BlZWREaWFsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcclxuICAvKipcclxuICAgKiBIb2xkIHNwZWVkLWRpYWwtYWN0aW9ucyBjb21wb25lbnQgaW5zaWRlIHRoaXMgY29tcG9uZW50XHJcbiAgICovXHJcbiAgQENvbnRlbnRDaGlsZChNY2NTcGVlZERpYWxBY3Rpb25zQ29tcG9uZW50KSBhY3Rpb25zOiBNY2NTcGVlZERpYWxBY3Rpb25zQ29tcG9uZW50O1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgaW5pdGlhbCAnb3Blbicgc3RhdGVcclxuICAgKi9cclxuICBASW5wdXQoJ29wZW4nKSBzZXQgaXNPcGVuKG9wZW46IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzT3BlbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShvcGVuKTtcclxuICB9XHJcbiAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc09wZW47XHJcbiAgfVxyXG4gIHByaXZhdGUgX2lzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGVuYWJsZWQsIGhhbmRsZSBvcGVuL2Nsb3NlIHN0YXRlIG9uIG1vdXNlIGhvdmVyXHJcbiAgICovXHJcbiAgQElucHV0KCdtb3VzZUhvdmVyJykgc2V0IGhvdmVyKGhvdmVyOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9ob3ZlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShob3Zlcik7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2hvdmVyOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZS9kaXNhYmxlIHNwaW4gYW5pbWF0aW9uIHdoZW4gYnV0dG9uIGlzIGNsaWNrZWQgb3IgaG92ZXJlZFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNldCBzcGluKHNwaW46IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3NwaW4gPSBzcGluO1xyXG4gIH1cclxuICBnZXQgc3BpbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9zcGluO1xyXG4gIH1cclxuICBwcml2YXRlIF9zcGluOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGFjdGlvbnMgYnV0dG9uXHJcbiAgICogRGlyZWN0aW9ucyBhdmFpbGFibGUgYXJlOiB1cCB8IGRvd24gfCBsZWZ0IHwgcmlnaHRcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogRElSRUNUSU9OKSB7XHJcbiAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgfVxyXG4gIGdldCBkaXJlY3Rpb24oKTogRElSRUNUSU9OIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XHJcbiAgfVxyXG4gIHByaXZhdGUgX2RpcmVjdGlvbjogRElSRUNUSU9OID0gJ3VwJztcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIG9wZW4gc3RhdGUgY2hhbmdlXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG9wZW5TdGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsIGZhYiBzcGVlZCBkaWFsIGFjdGlvbnMgZnVuY3Rpb25zIHRvIGNoYW5nZSB0aGVcclxuICAgKiB2aXNpYmlsaXR5IG9mIHRoZSBidXR0b25zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc2V0QWN0aW9uc1N0YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuX2lzT3Blbikge1xyXG4gICAgICB0aGlzLmFjdGlvbnMuc2hvdyh0aGlzLl9kaXJlY3Rpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hY3Rpb25zLmhpZGUodGhpcy5fZGlyZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBpbml0aWFsIHN0YXRlIHRvIHRoZSBhY3Rpb24gYnV0dG9ucyBpbnNpZGUgc3BlZWQtZGlhbC1hY3Rpb25zXHJcbiAgICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5fc2V0QWN0aW9uc1N0YXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoJ2lzT3BlbicgaW4gY2hhbmdlcyAmJiBjaGFuZ2VzWydpc09wZW4nXS5wcmV2aW91c1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5fc2V0QWN0aW9uc1N0YXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIG1vdXNlSG92ZXIgaXMgZW5hYmxlZCBhbmQgc3RhdGUgaXMgY2xvc2VkXHJcbiAgICogY2FsbHMgdG9nZ2xlIHRvIG9wZW4gdGhlIGFjdGlvbnNcclxuICAgKi9cclxuICBob3ZlclN0YXJ0KCkge1xyXG4gICAgaWYgKHRoaXMuX2hvdmVyICYmICF0aGlzLl9pc09wZW4pIHtcclxuICAgICAgdGhpcy50b2dnbGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gbW91c2VIb3ZlciBpcyBlbmFibGVkIGFuZCBzdGF0ZSBpcyBvcGVuXHJcbiAgICogY2FsbHMgdG9nZ2xlIHRvIGNsb3NlIHRoZSBhY3Rpb25zXHJcbiAgICovXHJcbiAgaG92ZXJTdG9wKCkge1xyXG4gICAgaWYgKHRoaXMuX2hvdmVyICYmIHRoaXMuX2lzT3Blbikge1xyXG4gICAgICB0aGlzLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIHRoZSBvcGVuIHN0YXRlXHJcbiAgICovXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgdGhpcy5faXNPcGVuID0gIXRoaXMuX2lzT3BlbjtcclxuXHJcbiAgICB0aGlzLl9zZXRBY3Rpb25zU3RhdGUoKTtcclxuXHJcbiAgICB0aGlzLm9wZW5TdGF0ZUNoYW5nZS5lbWl0KHRoaXMuX2lzT3Blbik7XHJcbiAgfVxyXG59XHJcbiJdfQ==