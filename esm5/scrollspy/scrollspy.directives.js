import { __decorate } from "tslib";
import { AfterContentInit, Input, ContentChildren, Directive, ElementRef, QueryList, Renderer2, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MccScrollspyService } from './scrollspy.service';
var MccScrollspyItemDirective = /** @class */ (function () {
    function MccScrollspyItemDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    Object.defineProperty(MccScrollspyItemDirective.prototype, "id", {
        get: function () {
            return this._id;
        },
        /**
         * Hold the element id, if element doesn't have id
         * the method will create one
         */
        set: function (id) {
            if (!id) {
                id = this._createId();
                this.renderer.setProperty(this.elementRef.nativeElement, 'id', id);
            }
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccScrollspyItemDirective.prototype, "top", {
        /**
         * Element distance of the top
         */
        get: function () {
            return this.elementRef.nativeElement.offsetTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MccScrollspyItemDirective.prototype, "focus", {
        get: function () {
            return this._focused;
        },
        /**
         * Element is focused
         */
        set: function (focused) {
            this._focused = coerceBooleanProperty(focused);
        },
        enumerable: true,
        configurable: true
    });
    MccScrollspyItemDirective.prototype.ngAfterContentInit = function () {
        if (!this.label) {
            this.label = this.elementRef.nativeElement.textContent;
        }
        this.id = this.elementRef.nativeElement.id;
    };
    /**
     * Create an ID for the element
     */
    MccScrollspyItemDirective.prototype._createId = function () {
        var tmpID = this.label.toLowerCase().replace(/[ ]+/gi, '_');
        return "mcc_scrollspy_" + tmpID;
    };
    MccScrollspyItemDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
    return MccScrollspyItemDirective;
}());
export { MccScrollspyItemDirective };
var MccScrollspyGroupDirective = /** @class */ (function () {
    function MccScrollspyGroupDirective(mccScrollspyService) {
        this.mccScrollspyService = mccScrollspyService;
    }
    Object.defineProperty(MccScrollspyGroupDirective.prototype, "name", {
        /**
         * Name of the scrollspy group
         */
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    MccScrollspyGroupDirective.prototype.ngAfterContentInit = function () {
        // add the group items
        var items = this.items.map(function (item) { return item; });
        this.mccScrollspyService.create(this._name, items);
    };
    MccScrollspyGroupDirective.ctorParameters = function () { return [
        { type: MccScrollspyService }
    ]; };
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
    return MccScrollspyGroupDirective;
}());
export { MccScrollspyGroupDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNjcm9sbHNweS9zY3JvbGxzcHkuZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixLQUFLLEVBQ0wsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU0xRDtJQTJDRSxtQ0FBbUIsVUFBc0IsRUFBVSxRQUFtQjtRQUFuRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFHLENBQUM7SUF0QzFFLHNCQUFJLHlDQUFFO2FBUU47WUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbEIsQ0FBQztRQWREOzs7V0FHRzthQUNILFVBQU8sRUFBVTtZQUNmLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ1AsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3BFO1lBRUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDaEIsQ0FBQzs7O09BQUE7SUFTRCxzQkFBSSwwQ0FBRztRQUhQOztXQUVHO2FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQU1ELHNCQUFJLDRDQUFLO2FBR1Q7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQztRQVREOztXQUVHO2FBRUgsVUFBVSxPQUFnQjtZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELENBQUM7OztPQUFBO0lBY0Qsc0RBQWtCLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztTQUN4RDtRQUNELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7T0FFRztJQUNLLDZDQUFTLEdBQWpCO1FBQ0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVELE9BQU8sbUJBQWlCLEtBQU8sQ0FBQztJQUNsQyxDQUFDOztnQkFmOEIsVUFBVTtnQkFBb0IsU0FBUzs7SUFkdEU7UUFEQyxLQUFLLENBQUMsT0FBTyxDQUFDOzBEQUdkO0lBVVE7UUFBUixLQUFLLEVBQUU7NERBQWU7SUF6Q1oseUJBQXlCO1FBSnJDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSwwQ0FBMEM7WUFDcEQsUUFBUSxFQUFFLGtCQUFrQjtTQUM3QixDQUFDO09BQ1cseUJBQXlCLENBMkRyQztJQUFELGdDQUFDO0NBQUEsQUEzREQsSUEyREM7U0EzRFkseUJBQXlCO0FBaUV0QztJQWVFLG9DQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUFHLENBQUM7SUFMaEUsc0JBQUksNENBQUk7UUFKUjs7V0FFRzthQUVILFVBQVMsSUFBWTtZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUtELHVEQUFrQixHQUFsQjtRQUNFLHNCQUFzQjtRQUN0QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Z0JBTndDLG1CQUFtQjs7SUFYaEI7UUFBM0MsZUFBZSxDQUFDLHlCQUF5QixDQUFDOzZEQUE2QztJQU14RjtRQURDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQzswREFHMUI7SUFaVSwwQkFBMEI7UUFKdEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDRDQUE0QztZQUN0RCxRQUFRLEVBQUUsbUJBQW1CO1NBQzlCLENBQUM7T0FDVywwQkFBMEIsQ0FzQnRDO0lBQUQsaUNBQUM7Q0FBQSxBQXRCRCxJQXNCQztTQXRCWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgSW5wdXQsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBSZW5kZXJlcjIsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7IE1jY1Njcm9sbHNweVNlcnZpY2UgfSBmcm9tICcuL3Njcm9sbHNweS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21jY1Njcm9sbHNweUl0ZW1dLCBbbWNjLXNjcm9sbHNweS1pdGVtXScsXHJcbiAgZXhwb3J0QXM6ICdtY2NTY3JvbGxzcHlJdGVtJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcclxuICAvKipcclxuICAgKiBIb2xkIHRoZSBlbGVtZW50IGlkLCBpZiBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBpZFxyXG4gICAqIHRoZSBtZXRob2Qgd2lsbCBjcmVhdGUgb25lXHJcbiAgICovXHJcbiAgc2V0IGlkKGlkOiBzdHJpbmcpIHtcclxuICAgIGlmICghaWQpIHtcclxuICAgICAgaWQgPSB0aGlzLl9jcmVhdGVJZCgpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaWQnLCBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faWQgPSBpZDtcclxuICB9XHJcbiAgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVsZW1lbnQgZGlzdGFuY2Ugb2YgdGhlIHRvcFxyXG4gICAqL1xyXG4gIGdldCB0b3AoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbGVtZW50IGlzIGZvY3VzZWRcclxuICAgKi9cclxuICBASW5wdXQoJ2ZvY3VzJylcclxuICBzZXQgZm9jdXMoZm9jdXNlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZm9jdXNlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShmb2N1c2VkKTtcclxuICB9XHJcbiAgZ2V0IGZvY3VzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2ZvY3VzZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIExhYmVsIHRoYXQgd2lsbCBhcHBlYXIgb24gdGhlIGxpc3Qgb2YgaXRlbXMuXHJcbiAgICogVGhlIGRlZmF1bHQgaXMgdGhlIHRleHQgaW5zaWRlIHRoZSBlbGVtZW50XHJcbiAgICovXHJcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLmxhYmVsKSB7XHJcbiAgICAgIHRoaXMubGFiZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgIH1cclxuICAgIHRoaXMuaWQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhbiBJRCBmb3IgdGhlIGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIF9jcmVhdGVJZCgpOiBzdHJpbmcge1xyXG4gICAgbGV0IHRtcElEID0gdGhpcy5sYWJlbC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1sgXSsvZ2ksICdfJyk7XHJcbiAgICByZXR1cm4gYG1jY19zY3JvbGxzcHlfJHt0bXBJRH1gO1xyXG4gIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWNjU2Nyb2xsc3B5R3JvdXBdLCBbbWNjLXNjcm9sbHNweS1ncm91cF0nLFxyXG4gIGV4cG9ydEFzOiAnbWNjU2Nyb2xsc3B5R3JvdXAnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWNjU2Nyb2xsc3B5R3JvdXBEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcclxuICAvKipcclxuICAgKiBMaXN0IG9mIHNjcm9sbHNweSBpdGVtc1xyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oTWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZSkgaXRlbXM6IFF1ZXJ5TGlzdDxNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlPjtcclxuXHJcbiAgLyoqXHJcbiAgICogTmFtZSBvZiB0aGUgc2Nyb2xsc3B5IGdyb3VwXHJcbiAgICovXHJcbiAgQElucHV0KCdtY2NTY3JvbGxzcHlHcm91cCcpXHJcbiAgc2V0IG5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1jY1Njcm9sbHNweVNlcnZpY2U6IE1jY1Njcm9sbHNweVNlcnZpY2UpIHt9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIC8vIGFkZCB0aGUgZ3JvdXAgaXRlbXNcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtKTtcclxuICAgIHRoaXMubWNjU2Nyb2xsc3B5U2VydmljZS5jcmVhdGUodGhpcy5fbmFtZSwgaXRlbXMpO1xyXG4gIH1cclxufVxyXG4iXX0=