import { __decorate } from "tslib";
import { AfterContentInit, Component, ContentChildren, Input, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { Z_INDEX } from './animations';
let MccSpeedDialActionsComponent = class MccSpeedDialActionsComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this._animation = new BehaviorSubject('scale');
    }
    /**
     * Set type of animation will be executed on open/close
     * Type available are: scale | fling
     */
    set animation(animation) {
        this._animation.next(animation);
    }
    /**
     * The z-index style and animation class are handle separate because
     * z-index will be set only one time, and the animation class will be set
     * every time the animation change
     */
    ngAfterContentInit() {
        // set z-index style to each button action
        this._buttons.forEach((button, index) => {
            this.renderer.setStyle(button._elementRef.nativeElement, 'z-index', (Z_INDEX - index));
        });
        // set the animation class to each button action
        this._animation.subscribe(animation => {
            const nextAnimationClass = `speed-dial-item-animation-${animation}`;
            this._buttons.forEach(button => {
                if (this._lastAnimationClass) {
                    this.renderer.removeClass(button._elementRef.nativeElement, this._lastAnimationClass);
                }
                this.renderer.addClass(button._elementRef.nativeElement, nextAnimationClass);
            });
            this._lastAnimationClass = nextAnimationClass;
        });
    }
    /**
     * Responsible for change the state of the action buttons to visible
     *
     * @param direction DIRECTION
     */
    show(direction) {
        switch (this._animation.value) {
            case 'scale': {
                this._buttons.forEach((button, index) => {
                    const transition = 3 + (65 * index);
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', `${transition}ms`);
                    this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(1)');
                });
                break;
            }
            case 'fling': {
                const translateFn = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
                const sign = (direction == 'down' || direction == 'right') ? '-' : '';
                this._buttons.forEach(button => {
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transform', `${translateFn}(${sign}0)`);
                });
            }
        }
    }
    /**
     * Hide all the buttons action
     *
     * @param direction DIRECTION
     */
    hide(direction) {
        switch (this._animation.value) {
            case 'scale': {
                this._buttons.forEach((button, index) => {
                    const transition = 3 - (65 * index);
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', `${transition}ms`);
                    this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '0');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transform', 'scale(0)');
                });
                break;
            }
            case 'fling': {
                const translateFn = (direction == 'up' || direction == 'down') ? 'translateY' : 'translateX';
                const sign = (direction == 'down' || direction == 'right') ? '-' : '';
                this._buttons.forEach((button, index) => {
                    const transform = (55 * (index + 1) - (index * 5));
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transition-delay', '0ms');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'opacity', '1');
                    this.renderer.setStyle(button._elementRef.nativeElement, 'transform', `${translateFn}(${sign}${transform}px)`);
                });
            }
        }
    }
};
MccSpeedDialActionsComponent.ctorParameters = () => [
    { type: Renderer2 }
];
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
export { MccSpeedDialActionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlZWQtZGlhbC1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3BlZWQtZGlhbC9zcGVlZC1kaWFsLWFjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3SCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQWEsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBU2xELElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBb0J2QyxZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUC9CLGVBQVUsR0FBK0IsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFPbkMsQ0FBQztJQWQ1Qzs7O09BR0c7SUFDTSxJQUFJLFNBQVMsQ0FBQyxTQUFvQjtRQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBVUQ7Ozs7T0FJRztJQUNILGtCQUFrQjtRQUNoQiwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekYsQ0FBQyxDQUFDLENBQUM7UUFFSCxnREFB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RUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDcEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsR0FBRyxXQUFXLElBQUksSUFBSSxHQUFHLFNBQVMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pILENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBOztZQTFGK0IsU0FBUzs7QUFoQlg7SUFBM0IsZUFBZSxDQUFDLFNBQVMsQ0FBQzs4REFBZ0M7QUFNbEQ7SUFBUixLQUFLLEVBQUU7NkRBRVA7QUFaVSw0QkFBNEI7SUFOeEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyx1REFBa0Q7UUFFbEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O0tBQ3RDLENBQUM7R0FDVyw0QkFBNEIsQ0E4R3hDO1NBOUdZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBTklNQVRJT04sIFpfSU5ERVggfSBmcm9tICcuL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBESVJFQ1RJT04gfSBmcm9tICcuL2RpcmVjdGlvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtY2Mtc3BlZWQtZGlhbC1hY3Rpb25zJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3BlZWQtZGlhbC1hY3Rpb25zLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zcGVlZC1kaWFsLWFjdGlvbnMuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNY2NTcGVlZERpYWxBY3Rpb25zQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcbiAgLyoqXHJcbiAgICogSG9sZCBhbGwgdGhlIGFjdGlvbnMgYnV0dG9uIGluc2lkZSBmYWIgc3BlZWQgZGlhbFxyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oTWF0QnV0dG9uKSBfYnV0dG9uczogUXVlcnlMaXN0PE1hdEJ1dHRvbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0eXBlIG9mIGFuaW1hdGlvbiB3aWxsIGJlIGV4ZWN1dGVkIG9uIG9wZW4vY2xvc2VcclxuICAgKiBUeXBlIGF2YWlsYWJsZSBhcmU6IHNjYWxlIHwgZmxpbmdcclxuICAgKi9cclxuICBASW5wdXQoKSBzZXQgYW5pbWF0aW9uKGFuaW1hdGlvbjogQU5JTUFUSU9OKSB7XHJcbiAgICB0aGlzLl9hbmltYXRpb24ubmV4dChhbmltYXRpb24pO1xyXG4gIH1cclxuICBwcml2YXRlIF9hbmltYXRpb246IEJlaGF2aW9yU3ViamVjdDxBTklNQVRJT04+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgnc2NhbGUnKTtcclxuXHJcbiAgLyoqXHJcbiAgICogTGFzdCBhbmltYXRpb24gdGhlIHdhcyB1c2VkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbGFzdEFuaW1hdGlvbkNsYXNzOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB6LWluZGV4IHN0eWxlIGFuZCBhbmltYXRpb24gY2xhc3MgYXJlIGhhbmRsZSBzZXBhcmF0ZSBiZWNhdXNlXHJcbiAgICogei1pbmRleCB3aWxsIGJlIHNldCBvbmx5IG9uZSB0aW1lLCBhbmQgdGhlIGFuaW1hdGlvbiBjbGFzcyB3aWxsIGJlIHNldFxyXG4gICAqIGV2ZXJ5IHRpbWUgdGhlIGFuaW1hdGlvbiBjaGFuZ2VcclxuICAgKi9cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAvLyBzZXQgei1pbmRleCBzdHlsZSB0byBlYWNoIGJ1dHRvbiBhY3Rpb25cclxuICAgIHRoaXMuX2J1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcsIChaX0lOREVYIC0gaW5kZXgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHNldCB0aGUgYW5pbWF0aW9uIGNsYXNzIHRvIGVhY2ggYnV0dG9uIGFjdGlvblxyXG4gICAgdGhpcy5fYW5pbWF0aW9uLnN1YnNjcmliZShhbmltYXRpb24gPT4ge1xyXG4gICAgICBjb25zdCBuZXh0QW5pbWF0aW9uQ2xhc3MgPSBgc3BlZWQtZGlhbC1pdGVtLWFuaW1hdGlvbi0ke2FuaW1hdGlvbn1gO1xyXG4gICAgICB0aGlzLl9idXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBpZiAodGhpcy5fbGFzdEFuaW1hdGlvbkNsYXNzKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9sYXN0QW5pbWF0aW9uQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBuZXh0QW5pbWF0aW9uQ2xhc3MpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuX2xhc3RBbmltYXRpb25DbGFzcyA9IG5leHRBbmltYXRpb25DbGFzcztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzcG9uc2libGUgZm9yIGNoYW5nZSB0aGUgc3RhdGUgb2YgdGhlIGFjdGlvbiBidXR0b25zIHRvIHZpc2libGVcclxuICAgKiBcclxuICAgKiBAcGFyYW0gZGlyZWN0aW9uIERJUkVDVElPTlxyXG4gICAqL1xyXG4gIHNob3coZGlyZWN0aW9uOiBESVJFQ1RJT04pIHtcclxuICAgIHN3aXRjaCAodGhpcy5fYW5pbWF0aW9uLnZhbHVlKSB7XHJcbiAgICAgIGNhc2UgJ3NjYWxlJzoge1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IDMgKyAoNjUgKiBpbmRleCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24tZGVsYXknLCBgJHt0cmFuc2l0aW9ufW1zYCk7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcxJyk7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3NjYWxlKDEpJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhc2UgJ2ZsaW5nJzoge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZUZuID0gKGRpcmVjdGlvbiA9PSAndXAnIHx8IGRpcmVjdGlvbiA9PSAnZG93bicpID8gJ3RyYW5zbGF0ZVknIDogJ3RyYW5zbGF0ZVgnO1xyXG4gICAgICAgIGNvbnN0IHNpZ24gPSAoZGlyZWN0aW9uID09ICdkb3duJyB8fCBkaXJlY3Rpb24gPT0gJ3JpZ2h0JykgPyAnLScgOiAnJztcclxuXHJcbiAgICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbi1kZWxheScsICcwbXMnKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzEnKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCBgJHt0cmFuc2xhdGVGbn0oJHtzaWdufTApYCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUgYWxsIHRoZSBidXR0b25zIGFjdGlvblxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb24gRElSRUNUSU9OXHJcbiAgICovXHJcbiAgaGlkZShkaXJlY3Rpb246IERJUkVDVElPTikge1xyXG4gICAgc3dpdGNoICh0aGlzLl9hbmltYXRpb24udmFsdWUpIHtcclxuICAgICAgY2FzZSAnc2NhbGUnOiB7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0cmFuc2l0aW9uID0gMyAtICg2NSAqIGluZGV4KTtcclxuXHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGJ1dHRvbi5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbi1kZWxheScsIGAke3RyYW5zaXRpb259bXNgKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzAnKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAnc2NhbGUoMCknKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FzZSAnZmxpbmcnOiB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlRm4gPSAoZGlyZWN0aW9uID09ICd1cCcgfHwgZGlyZWN0aW9uID09ICdkb3duJykgPyAndHJhbnNsYXRlWScgOiAndHJhbnNsYXRlWCc7XHJcbiAgICAgICAgY29uc3Qgc2lnbiA9IChkaXJlY3Rpb24gPT0gJ2Rvd24nIHx8IGRpcmVjdGlvbiA9PSAncmlnaHQnKSA/ICctJyA6ICcnO1xyXG5cclxuICAgICAgICB0aGlzLl9idXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9ICg1NSAqIChpbmRleCArIDEpIC0gKGluZGV4ICogNSkpO1xyXG5cclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoYnV0dG9uLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uLWRlbGF5JywgJzBtcycpO1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMScpO1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShidXR0b24uX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsIGAke3RyYW5zbGF0ZUZufSgke3NpZ259JHt0cmFuc2Zvcm19cHgpYCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19