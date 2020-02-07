import { __decorate } from "tslib";
import { AfterContentInit, Input, ContentChildren, Directive, ElementRef, QueryList, Renderer2, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MccScrollspyService } from './scrollspy.service';
let MccScrollspyItemDirective = class MccScrollspyItemDirective {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    /**
     * Hold the element id, if element doesn't have id
     * the method will create one
     */
    set id(id) {
        if (!id) {
            id = this._createId();
            this.renderer.setProperty(this.elementRef.nativeElement, 'id', id);
        }
        this._id = id;
    }
    get id() {
        return this._id;
    }
    /**
     * Element distance of the top
     */
    get top() {
        return this.elementRef.nativeElement.offsetTop;
    }
    /**
     * Element is focused
     */
    set focus(focused) {
        this._focused = coerceBooleanProperty(focused);
    }
    get focus() {
        return this._focused;
    }
    ngAfterContentInit() {
        if (!this.label) {
            this.label = this.elementRef.nativeElement.textContent;
        }
        this.id = this.elementRef.nativeElement.id;
    }
    /**
     * Create an ID for the element
     */
    _createId() {
        let tmpID = this.label.toLowerCase().replace(/[ ]+/gi, '_');
        return `mcc_scrollspy_${tmpID}`;
    }
};
MccScrollspyItemDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input('focus')
], MccScrollspyItemDirective.prototype, "focus", null);
__decorate([
    Input()
], MccScrollspyItemDirective.prototype, "label", void 0);
MccScrollspyItemDirective = __decorate([
    Directive({
        selector: '[mccScrollspyItem], [mcc-scrollspy-item]',
        exportAs: 'mccScrollspyItem',
    })
], MccScrollspyItemDirective);
export { MccScrollspyItemDirective };
let MccScrollspyGroupDirective = class MccScrollspyGroupDirective {
    constructor(mccScrollspyService) {
        this.mccScrollspyService = mccScrollspyService;
    }
    /**
     * Name of the scrollspy group
     */
    set name(name) {
        this._name = name;
    }
    ngAfterContentInit() {
        // add the group items
        const items = this.items.map(item => item);
        this.mccScrollspyService.create(this._name, items);
    }
};
MccScrollspyGroupDirective.ctorParameters = () => [
    { type: MccScrollspyService }
];
__decorate([
    ContentChildren(MccScrollspyItemDirective)
], MccScrollspyGroupDirective.prototype, "items", void 0);
__decorate([
    Input('mccScrollspyGroup')
], MccScrollspyGroupDirective.prototype, "name", null);
MccScrollspyGroupDirective = __decorate([
    Directive({
        selector: '[mccScrollspyGroup], [mcc-scrollspy-group]',
        exportAs: 'mccScrollspyGroup',
    })
], MccScrollspyGroupDirective);
export { MccScrollspyGroupDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNjcm9sbHNweS9zY3JvbGxzcHkuZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixLQUFLLEVBQ0wsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU0xRCxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQTJDcEMsWUFBbUIsVUFBc0IsRUFBVSxRQUFtQjtRQUFuRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFHLENBQUM7SUExQzFFOzs7T0FHRztJQUNILElBQUksRUFBRSxDQUFDLEVBQVU7UUFDZixJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDcEU7UUFFRCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFHRDs7T0FFRztJQUNILElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7T0FFRztJQUVILElBQUksS0FBSyxDQUFDLE9BQWdCO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBV0Qsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7U0FDeEQ7UUFDRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxTQUFTO1FBQ2YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVELE9BQU8saUJBQWlCLEtBQUssRUFBRSxDQUFDO0lBQ2xDLENBQUM7Q0FDRixDQUFBOztZQWhCZ0MsVUFBVTtZQUFvQixTQUFTOztBQWR0RTtJQURDLEtBQUssQ0FBQyxPQUFPLENBQUM7c0RBR2Q7QUFVUTtJQUFSLEtBQUssRUFBRTt3REFBZTtBQXpDWix5QkFBeUI7SUFKckMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDBDQUEwQztRQUNwRCxRQUFRLEVBQUUsa0JBQWtCO0tBQzdCLENBQUM7R0FDVyx5QkFBeUIsQ0EyRHJDO1NBM0RZLHlCQUF5QjtBQWlFdEMsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFlckMsWUFBb0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFBRyxDQUFDO0lBVGhFOztPQUVHO0lBRUgsSUFBSSxJQUFJLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBS0Qsa0JBQWtCO1FBQ2hCLHNCQUFzQjtRQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0YsQ0FBQTs7WUFQMEMsbUJBQW1COztBQVhoQjtJQUEzQyxlQUFlLENBQUMseUJBQXlCLENBQUM7eURBQTZDO0FBTXhGO0lBREMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO3NEQUcxQjtBQVpVLDBCQUEwQjtJQUp0QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNENBQTRDO1FBQ3RELFFBQVEsRUFBRSxtQkFBbUI7S0FDOUIsQ0FBQztHQUNXLDBCQUEwQixDQXNCdEM7U0F0QlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIElucHV0LFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBRdWVyeUxpc3QsXHJcbiAgUmVuZGVyZXIyLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5pbXBvcnQgeyBNY2NTY3JvbGxzcHlTZXJ2aWNlIH0gZnJvbSAnLi9zY3JvbGxzcHkuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttY2NTY3JvbGxzcHlJdGVtXSwgW21jYy1zY3JvbGxzcHktaXRlbV0nLFxyXG4gIGV4cG9ydEFzOiAnbWNjU2Nyb2xsc3B5SXRlbScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcbiAgLyoqXHJcbiAgICogSG9sZCB0aGUgZWxlbWVudCBpZCwgaWYgZWxlbWVudCBkb2Vzbid0IGhhdmUgaWRcclxuICAgKiB0aGUgbWV0aG9kIHdpbGwgY3JlYXRlIG9uZVxyXG4gICAqL1xyXG4gIHNldCBpZChpZDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIWlkKSB7XHJcbiAgICAgIGlkID0gdGhpcy5fY3JlYXRlSWQoKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lkJywgaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgfVxyXG4gIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gIH1cclxuICBwcml2YXRlIF9pZDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBFbGVtZW50IGRpc3RhbmNlIG9mIHRoZSB0b3BcclxuICAgKi9cclxuICBnZXQgdG9wKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRWxlbWVudCBpcyBmb2N1c2VkXHJcbiAgICovXHJcbiAgQElucHV0KCdmb2N1cycpXHJcbiAgc2V0IGZvY3VzKGZvY3VzZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2ZvY3VzZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZm9jdXNlZCk7XHJcbiAgfVxyXG4gIGdldCBmb2N1cygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9mb2N1c2VkO1xyXG4gIH1cclxuICBwcml2YXRlIF9mb2N1c2VkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBMYWJlbCB0aGF0IHdpbGwgYXBwZWFyIG9uIHRoZSBsaXN0IG9mIGl0ZW1zLlxyXG4gICAqIFRoZSBkZWZhdWx0IGlzIHRoZSB0ZXh0IGluc2lkZSB0aGUgZWxlbWVudFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5sYWJlbCkge1xyXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlkID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gSUQgZm9yIHRoZSBlbGVtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY3JlYXRlSWQoKTogc3RyaW5nIHtcclxuICAgIGxldCB0bXBJRCA9IHRoaXMubGFiZWwudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bIF0rL2dpLCAnXycpO1xyXG4gICAgcmV0dXJuIGBtY2Nfc2Nyb2xsc3B5XyR7dG1wSUR9YDtcclxuICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21jY1Njcm9sbHNweUdyb3VwXSwgW21jYy1zY3JvbGxzcHktZ3JvdXBdJyxcclxuICBleHBvcnRBczogJ21jY1Njcm9sbHNweUdyb3VwJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1jY1Njcm9sbHNweUdyb3VwRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcbiAgLyoqXHJcbiAgICogTGlzdCBvZiBzY3JvbGxzcHkgaXRlbXNcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkcmVuKE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmUpIGl0ZW1zOiBRdWVyeUxpc3Q8TWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIE5hbWUgb2YgdGhlIHNjcm9sbHNweSBncm91cFxyXG4gICAqL1xyXG4gIEBJbnB1dCgnbWNjU2Nyb2xsc3B5R3JvdXAnKVxyXG4gIHNldCBuYW1lKG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtY2NTY3JvbGxzcHlTZXJ2aWNlOiBNY2NTY3JvbGxzcHlTZXJ2aWNlKSB7fVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAvLyBhZGQgdGhlIGdyb3VwIGl0ZW1zXHJcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbSk7XHJcbiAgICB0aGlzLm1jY1Njcm9sbHNweVNlcnZpY2UuY3JlYXRlKHRoaXMuX25hbWUsIGl0ZW1zKTtcclxuICB9XHJcbn1cclxuIl19