import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { SCROLLSPY_ANIMATION_SMOOTH } from './scrollspy';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, withLatestFrom } from 'rxjs/operators';
var MccScrollspyService = /** @class */ (function () {
    function MccScrollspyService(window) {
        var _this = this;
        this.window = window;
        /**
         * When scroll is from click event, change this attr to true
         * So scroll event obeservable doesn't emit any update
         */
        this._fromClick = false;
        /**
         * List of scrollspy group
         */
        this.data = [];
        // listen to scroll event
        this._scrollSub = fromEvent(window, 'scroll')
            .pipe(debounceTime(50), withLatestFrom(function () { return window.scrollY; }))
            .subscribe(function (position) {
            if (!_this._fromClick) {
                _this._updateFocused(position);
            }
            _this._fromClick = false;
        });
    }
    MccScrollspyService.prototype.ngOnDestroy = function () {
        if (this._scrollSub && !this._scrollSub.closed) {
            this._scrollSub.unsubscribe();
        }
    };
    /**
     * Update information about wich element is on focus
     * @param position number
     */
    MccScrollspyService.prototype._updateFocused = function (position) {
        this.data.forEach(function (group) {
            var items = [];
            group.items.getValue().forEach(function (item, index) {
                item.focus = false;
                if (item.top <= position) {
                    if (items[index - 1]) {
                        items[index - 1].focus = false;
                    }
                    item.focus = true;
                }
                items.push(item);
            });
            group.items.next(items);
        });
    };
    /**
     * Create new group of items
     * @param name string
     * @param items MccScrollspyItemDirective[]
     * @param animation ScrollBehavior
     */
    MccScrollspyService.prototype.create = function (name, items, animation) {
        var group = this.data.find(function (group) { return group.name === name; });
        if (!group) {
            group = {
                name: name,
                animation: animation || SCROLLSPY_ANIMATION_SMOOTH,
                items: new BehaviorSubject(items || []),
            };
            this.data.push(group);
        }
        else {
            group.items.next(items || []);
        }
        return group;
    };
    /**
     * Return observable of the group
     * @param name string
     */
    MccScrollspyService.prototype.group = function (name) {
        var group = this.data.find(function (g) { return g.name === name; });
        if (!group) {
            group = this.create(name);
        }
        return group.items.asObservable();
    };
    /**
     * Scroll to one of the items
     * @param name string
     * @param id string
     */
    MccScrollspyService.prototype.scrollTo = function (name, id) {
        var _this = this;
        var group = this.data.find(function (group) { return group.name === name; });
        group.items.getValue().forEach(function (item) {
            item.focus = false;
            if (item.id === id) {
                _this._fromClick = true;
                _this._updateFocused(item.top);
                window.scrollTo({ top: item.top, behavior: group.animation });
            }
        });
    };
    MccScrollspyService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['Window',] }] }
    ]; };
    MccScrollspyService = __decorate([
        Injectable(),
        __param(0, Inject('Window'))
    ], MccScrollspyService);
    return MccScrollspyService;
}());
export { MccScrollspyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNjcm9sbHNweS9zY3JvbGxzcHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFxQiwwQkFBMEIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1RSxPQUFPLEVBQTRCLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc5RDtJQWlCRSw2QkFBc0MsTUFBVztRQUFqRCxpQkFVQztRQVZxQyxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBaEJqRDs7O1dBR0c7UUFDSyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBRXBDOztXQUVHO1FBQ0ssU0FBSSxHQUF3QixFQUFFLENBQUM7UUFRckMseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7YUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxjQUFjLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxPQUFPLEVBQWQsQ0FBYyxDQUFDLENBQUM7YUFDNUQsU0FBUyxDQUFDLFVBQUEsUUFBUTtZQUNqQixJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMvQjtZQUNELEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENB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QixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUMvRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0RBbEdZLE1BQU0sU0FBQyxRQUFROztJQWpCakIsbUJBQW1CO1FBRC9CLFVBQVUsRUFBRTtRQWtCRSxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtPQWpCbEIsbUJBQW1CLENBb0gvQjtJQUFELDBCQUFDO0NBQUEsQUFwSEQsSUFvSEM7U0FwSFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsc3B5LmRpcmVjdGl2ZXMnO1xyXG5pbXBvcnQgeyBNY2NTY3JvbGxzcHlHcm91cCwgU0NST0xMU1BZX0FOSU1BVElPTl9TTU9PVEggfSBmcm9tICcuL3Njcm9sbHNweSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE1jY1Njcm9sbHNweVNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFdoZW4gc2Nyb2xsIGlzIGZyb20gY2xpY2sgZXZlbnQsIGNoYW5nZSB0aGlzIGF0dHIgdG8gdHJ1ZVxyXG4gICAqIFNvIHNjcm9sbCBldmVudCBvYmVzZXJ2YWJsZSBkb2Vzbid0IGVtaXQgYW55IHVwZGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2Zyb21DbGljazogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBMaXN0IG9mIHNjcm9sbHNweSBncm91cFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGF0YTogTWNjU2Nyb2xsc3B5R3JvdXBbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBTY3JvbGwgZXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc2Nyb2xsU3ViOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoJ1dpbmRvdycpIHByaXZhdGUgd2luZG93OiBhbnkpIHtcclxuICAgIC8vIGxpc3RlbiB0byBzY3JvbGwgZXZlbnRcclxuICAgIHRoaXMuX3Njcm9sbFN1YiA9IGZyb21FdmVudCh3aW5kb3csICdzY3JvbGwnKVxyXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApLCB3aXRoTGF0ZXN0RnJvbSgoKSA9PiB3aW5kb3cuc2Nyb2xsWSkpXHJcbiAgICAgIC5zdWJzY3JpYmUocG9zaXRpb24gPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5fZnJvbUNsaWNrKSB7XHJcbiAgICAgICAgICB0aGlzLl91cGRhdGVGb2N1c2VkKHBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZnJvbUNsaWNrID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fc2Nyb2xsU3ViICYmICF0aGlzLl9zY3JvbGxTdWIuY2xvc2VkKSB7XHJcbiAgICAgIHRoaXMuX3Njcm9sbFN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGluZm9ybWF0aW9uIGFib3V0IHdpY2ggZWxlbWVudCBpcyBvbiBmb2N1c1xyXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBudW1iZXJcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVGb2N1c2VkKHBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuZGF0YS5mb3JFYWNoKGdyb3VwID0+IHtcclxuICAgICAgY29uc3QgaXRlbXMgPSBbXTtcclxuICAgICAgZ3JvdXAuaXRlbXMuZ2V0VmFsdWUoKS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGl0ZW0uZm9jdXMgPSBmYWxzZTtcclxuICAgICAgICBpZiAoaXRlbS50b3AgPD0gcG9zaXRpb24pIHtcclxuICAgICAgICAgIGlmIChpdGVtc1tpbmRleCAtIDFdKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zW2luZGV4IC0gMV0uZm9jdXMgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpdGVtLmZvY3VzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZ3JvdXAuaXRlbXMubmV4dChpdGVtcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBuZXcgZ3JvdXAgb2YgaXRlbXNcclxuICAgKiBAcGFyYW0gbmFtZSBzdHJpbmdcclxuICAgKiBAcGFyYW0gaXRlbXMgTWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZVtdXHJcbiAgICogQHBhcmFtIGFuaW1hdGlvbiBTY3JvbGxCZWhhdmlvclxyXG4gICAqL1xyXG4gIGNyZWF0ZShcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIGl0ZW1zPzogTWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZVtdLFxyXG4gICAgYW5pbWF0aW9uPzogU2Nyb2xsQmVoYXZpb3JcclxuICApOiBNY2NTY3JvbGxzcHlHcm91cCB7XHJcbiAgICBsZXQgZ3JvdXA6IE1jY1Njcm9sbHNweUdyb3VwID0gdGhpcy5kYXRhLmZpbmQoZ3JvdXAgPT4gZ3JvdXAubmFtZSA9PT0gbmFtZSk7XHJcbiAgICBpZiAoIWdyb3VwKSB7XHJcbiAgICAgIGdyb3VwID0ge1xyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24gfHwgU0NST0xMU1BZX0FOSU1BVElPTl9TTU9PVEgsXHJcbiAgICAgICAgaXRlbXM6IG5ldyBCZWhhdmlvclN1YmplY3Q8TWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZVtdPihpdGVtcyB8fCBbXSksXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLmRhdGEucHVzaChncm91cCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBncm91cC5pdGVtcy5uZXh0KGl0ZW1zIHx8IFtdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ3JvdXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gb2JzZXJ2YWJsZSBvZiB0aGUgZ3JvdXBcclxuICAgKiBAcGFyYW0gbmFtZSBzdHJpbmdcclxuICAgKi9cclxuICBncm91cChuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmVbXT4ge1xyXG4gICAgbGV0IGdyb3VwOiBNY2NTY3JvbGxzcHlHcm91cCA9IHRoaXMuZGF0YS5maW5kKGcgPT4gZy5uYW1lID09PSBuYW1lKTtcclxuICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgZ3JvdXAgPSB0aGlzLmNyZWF0ZShuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ3JvdXAuaXRlbXMuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTY3JvbGwgdG8gb25lIG9mIHRoZSBpdGVtc1xyXG4gICAqIEBwYXJhbSBuYW1lIHN0cmluZ1xyXG4gICAqIEBwYXJhbSBpZCBzdHJpbmdcclxuICAgKi9cclxuICBzY3JvbGxUbyhuYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IGdyb3VwOiBNY2NTY3JvbGxzcHlHcm91cCA9IHRoaXMuZGF0YS5maW5kKGdyb3VwID0+IGdyb3VwLm5hbWUgPT09IG5hbWUpO1xyXG5cclxuICAgIGdyb3VwLml0ZW1zLmdldFZhbHVlKCkuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaXRlbS5mb2N1cyA9IGZhbHNlO1xyXG4gICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcclxuICAgICAgICB0aGlzLl9mcm9tQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUZvY3VzZWQoaXRlbS50b3ApO1xyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogaXRlbS50b3AsIGJlaGF2aW9yOiBncm91cC5hbmltYXRpb24gfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=