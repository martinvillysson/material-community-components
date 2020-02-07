import { __decorate } from "tslib";
import { AfterContentInit, Component, ContentChildren, Input, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { Z_INDEX } from './animations';
var MccSpeedDialActionsComponent = /** @class */ (function () {
    function MccSpeedDialActionsComponent(renderer) {
        this.renderer = renderer;
        this._animation = new BehaviorSubject('scale');
    }
    Object.defineProperty(MccSpeedDialActionsComponent.prototype, "animation", {
        /**
         * Set type of animation will be executed on open/close
         * Type available are: scale | fling
         */
        set: function (animation) {
            this._animation.next(animation);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The z-index style and animation class are handle separate because
     * z-index will be set only one time, and the animation class will be set
     * every time the animation change
     */
    MccSpeedDialActionsComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // set z-index style to each button action
        this._buttons.forEach(function (button, index) {
            _this.renderer.setStyle(button._elementRef.nativeElement, 'z-index', (Z_INDEX - index));
        });
        // set the animation class to each button action
        this._animation.subscribe(function (animation) {
            var nextAnimationClass = "speed-dial-item-animation-" + animation;
            _this._buttons.forEach(function (button) {
                if (_this._lastAnimationClass) {
                    _this.renderer.removeClass(button._elementRef.nativeElement, _this._lastAnimationClass);
                }
                _this.renderer.addClass(button._elementRef.nativeElement, nextAnimationClass);
            });
            _this._lastAnimationClass = nextAnimationClass;
        });
    };
    /**
     * Responsible for change the state of the action buttons to visible
     *
     * @param direction DIRECTION
     */
    MccSpeedDialActionsComponent.prototype.show = function (direction) {
        var _this = this;
        switch (this._animation.value) {
            case 'scale': {
                this._buttons.forEach(function (button, index) {
                    var transition = 3 + (65 * index);
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', transition + "ms");
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(1)');
                });
                break;
            }
            case 'fling': {
                var translateFn_1 = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
                var sign_1 = (direction == 'down' || direction == 'right') ? '-' : '';
                this._buttons.forEach(function (button) {
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', translateFn_1 + "(" + sign_1 + "0)");
                });
            }
        }
    };
    /**
     * Hide all the buttons action
     *
     * @param direction DIRECTION
     */
    MccSpeedDialActionsComponent.prototype.hide = function (direction) {
        var _this = this;
        switch (this._animation.value) {
            case 'scale': {
                this._buttons.forEach(function (button, index) {
                    var transition = 3 - (65 * index);
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', transition + "ms");
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '0');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(0)');
                });
                break;
            }
            case 'fling': {
                var translateFn_2 = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
                var sign_2 = (direction == 'down' || direction == 'right') ? '-' : '';
                this._buttons.forEach(function (button, index) {
                    var transform = (55 * (index + 1) - (index * 5));
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    _this.renderer.setStyle(button._elementRef.nativeElement, 'transform', translateFn_2 + "(" + sign_2 + transform + "px)");
                });
            }
        }
    };
    MccSpeedDialActionsComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    __decorate([
        ContentChildren(MatButton)
    ], MccSpeedDialActionsComponent.prototype, "_buttons", void 0);
    __decorate([
        Input()
    ], MccSpeedDialActionsComponent.prototype, "animation", null);
    MccSpeedDialActionsComponent = __decorate([
        Component({
            selector: 'mcc-speed-dial-actions',
            template: "<ng-content select=\"button\"></ng-content>",
            encapsulation: ViewEncapsulation.None,
            styles: ["mcc-speed-dial-actions .speed-dial-item-animation-scale{transform:scale(0);transition:.3s cubic-bezier(.55,0,.55,.2);transition-duration:.14286s}mcc-speed-dial-actions .speed-dial-item-animation-fling{display:block;opacity:1;transition:.3s cubic-bezier(.55,0,.55,.2)}"]
        })
    ], MccSpeedDialActionsComponent);
    return MccSpeedDialActionsComponent;
}());
export { MccSpeedDialActionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWQtZGlhbC1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3BlZWQtZGlhbC9zcGVlZC1kaWFsLWFjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3SCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQWEsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBU2xEO0lBb0JFLHNDQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUC9CLGVBQVUsR0FBK0IsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFPbkMsQ0FBQztJQVZuQyxzQkFBSSxtREFBUztRQUp0Qjs7O1dBR0c7YUFDTSxVQUFjLFNBQW9CO1lBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBVUQ7Ozs7T0FJRztJQUNILHlEQUFrQixHQUFsQjtRQUFBLGlCQWtCQztRQWpCQywwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLEVBQUUsS0FBSztZQUNsQyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDLENBQUMsQ0FBQztRQUVILGdEQUFnRDtRQUNo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QUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3pFLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBSyxhQUFXLFNBQUksTUFBSSxHQUFHLFNBQVMsUUFBSyxDQUFDLENBQUM7Z0JBQ2pILENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7O2dCQXpGNkIsU0FBUzs7SUFoQlg7UUFBM0IsZUFBZSxDQUFDLFNBQVMsQ0FBQztrRUFBZ0M7SUFNbEQ7UUFBUixLQUFLLEVBQUU7aUVBRVA7SUFaVSw0QkFBNEI7UUFOeEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyx1REFBa0Q7WUFFbEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3RDLENBQUM7T0FDVyw0QkFBNEIsQ0E4R3hDO0lBQUQsbUNBQUM7Q0FBQSxBQTlHRCxJQThHQztTQTlHWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRCdXR0b24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQU5JTUFUSU9OLCBaX0lOREVYIH0gZnJvbSAnLi9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgRElSRUNUSU9OIH0gZnJvbSAnLi9kaXJlY3Rpb25zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWNjLXNwZWVkLWRpYWwtYWN0aW9ucycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NwZWVkLWRpYWwtYWN0aW9ucy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3BlZWQtZGlhbC1hY3Rpb25zLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWNjU3BlZWREaWFsQWN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xyXG4gIC8qKlxyXG4gICAqIEhvbGQgYWxsIHRoZSBhY3Rpb25zIGJ1dHRvbiBpbnNpZGUgZmFiIHNwZWVkIGRpYWxcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkcmVuKE1hdEJ1dHRvbikgX2J1dHRvbnM6IFF1ZXJ5TGlzdDxNYXRCdXR0b24+O1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgdHlwZSBvZiBhbmltYXRpb24gd2lsbCBiZSBleGVjdXRlZCBvbiBvcGVuL2Nsb3NlXHJcbiAgICogVHlwZSBhdmFpbGFibGUgYXJlOiBzY2FsZSB8IGZsaW5nXHJcbiAgICovXHJcbiAgQElucHV0KCkgc2V0IGFuaW1hdGlvbihhbmltYXRpb246IEFOSU1BVElPTikge1xyXG4gICAgdGhpcy5fYW5pbWF0aW9uLm5leHQoYW5pbWF0aW9uKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfYW5pbWF0aW9uOiBCZWhhdmlvclN1YmplY3Q8QU5JTUFUSU9OPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoJ3NjYWxlJyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIExhc3QgYW5pbWF0aW9uIHRoZSB3YXMgdXNlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2xhc3RBbmltYXRpb25DbGFzczogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgei1pbmRleCBzdHlsZSBhbmQgYW5pbWF0aW9uIGNsYXNzIGFyZSBoYW5kbGUgc2VwYXJhdGUgYmVjYXVzZVxyXG4gICAqIHotaW5kZXggd2lsbCBiZSBzZXQgb25seSBvbmUgdGltZSwgYW5kIHRoZSBhbmltYXRpb24gY2xhc3Mgd2lsbCBiZSBzZXRcclxuICAgKiBldmVyeSB0aW1lIHRoZSBhbmltYXRpb24gY2hhbmdlXHJcbiAgICovXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgLy8gc2V0IHotaW5kZXggc3R5bGUgdG8gZWFjaCBidXR0b24gYWN0aW9uXHJcbiAgICB0aGlzLl9idXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCAoWl9JTkRFWCAtIGluZGV4KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzZXQgdGhlIGFuaW1hdGlvbiBjbGFzcyB0byBlYWNoIGJ1dHRvbiBhY3Rpb25cclxuICAgIHRoaXMuX2FuaW1hdGlvbi5zdWJzY3JpYmUoYW5pbWF0aW9uID0+IHtcclxuICAgICAgY29uc3QgbmV4dEFuaW1hdGlvbkNsYXNzID0gYHNwZWVkLWRpYWwtaXRlbS1hbmltYXRpb24tJHthbmltYXRpb259YDtcclxuICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhc3RBbmltYXRpb25DbGFzcykge1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fbGFzdEFuaW1hdGlvbkNsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgbmV4dEFuaW1hdGlvbkNsYXNzKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLl9sYXN0QW5pbWF0aW9uQ2xhc3MgPSBuZXh0QW5pbWF0aW9uQ2xhc3M7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc3BvbnNpYmxlIGZvciBjaGFuZ2UgdGhlIHN0YXRlIG9mIHRoZSBhY3Rpb24gYnV0dG9ucyB0byB2aXNpYmxlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvbiBESVJFQ1RJT05cclxuICAgKi9cclxuICBzaG93KGRpcmVjdGlvbjogRElSRUNUSU9OKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMuX2FuaW1hdGlvbi52YWx1ZSkge1xyXG4gICAgICBjYXNlICdzY2FsZSc6IHtcclxuICAgICAgICB0aGlzLl9idXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRyYW5zaXRpb24gPSAzICsgKDY1ICogaW5kZXgpO1xyXG5cclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uLWRlbGF5JywgYCR7dHJhbnNpdGlvbn1tc2ApO1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMScpO1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICdzY2FsZSgxKScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjYXNlICdmbGluZyc6IHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGVGbiA9IChkaXJlY3Rpb24gPT0gJ3VwJyB8fCBkaXJlY3Rpb24gPT0gJ2Rvd24nKSA/ICd0cmFuc2xhdGVZJyA6ICd0cmFuc2xhdGVYJztcclxuICAgICAgICBjb25zdCBzaWduID0gKGRpcmVjdGlvbiA9PSAnZG93bicgfHwgZGlyZWN0aW9uID09ICdyaWdodCcpID8gJy0nIDogJyc7XHJcblxyXG4gICAgICAgIHRoaXMuX2J1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24tZGVsYXknLCAnMG1zJyk7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcxJyk7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgYCR7dHJhbnNsYXRlRm59KCR7c2lnbn0wKWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIGFsbCB0aGUgYnV0dG9ucyBhY3Rpb25cclxuICAgKiBcclxuICAgKiBAcGFyYW0gZGlyZWN0aW9uIERJUkVDVElPTlxyXG4gICAqL1xyXG4gIGhpZGUoZGlyZWN0aW9uOiBESVJFQ1RJT04pIHtcclxuICAgIHN3aXRjaCAodGhpcy5fYW5pbWF0aW9uLnZhbHVlKSB7XHJcbiAgICAgIGNhc2UgJ3NjYWxlJzoge1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IDMgLSAoNjUgKiBpbmRleCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24tZGVsYXknLCBgJHt0cmFuc2l0aW9ufW1zYCk7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcwJyk7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3NjYWxlKDApJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhc2UgJ2ZsaW5nJzoge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZUZuID0gKGRpcmVjdGlvbiA9PSAndXAnIHx8IGRpcmVjdGlvbiA9PSAnZG93bicpID8gJ3RyYW5zbGF0ZVknIDogJ3RyYW5zbGF0ZVgnO1xyXG4gICAgICAgIGNvbnN0IHNpZ24gPSAoZGlyZWN0aW9uID09ICdkb3duJyB8fCBkaXJlY3Rpb24gPT0gJ3JpZ2h0JykgPyAnLScgOiAnJztcclxuXHJcbiAgICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSAoNTUgKiAoaW5kZXggKyAxKSAtIChpbmRleCAqIDUpKTtcclxuXHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbi1kZWxheScsICcwbXMnKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzEnKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCBgJHt0cmFuc2xhdGVGbn0oJHtzaWdufSR7dHJhbnNmb3JtfXB4KWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==