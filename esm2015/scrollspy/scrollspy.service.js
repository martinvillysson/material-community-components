import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { SCROLLSPY_ANIMATION_SMOOTH } from './scrollspy';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, withLatestFrom } from 'rxjs/operators';
let MccScrollspyService = class MccScrollspyService {
    constructor(window) {
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
            .pipe(debounceTime(50), withLatestFrom(() => window.scrollY))
            .subscribe(position => {
            if (!this._fromClick) {
                this._updateFocused(position);
            }
            this._fromClick = false;
        });
    }
    ngOnDestroy() {
        if (this._scrollSub && !this._scrollSub.closed) {
            this._scrollSub.unsubscribe();
        }
    }
    /**
     * Update information about wich element is on focus
     * @param position number
     */
    _updateFocused(position) {
        this.data.forEach(group => {
            const items = [];
            group.items.getValue().forEach((item, index) => {
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
    }
    /**
     * Create new group of items
     * @param name string
     * @param items MccScrollspyItemDirective[]
     * @param animation ScrollBehavior
     */
    create(name, items, animation) {
        let group = this.data.find(group => group.name === name);
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
    }
    /**
     * Return observable of the group
     * @param name string
     */
    group(name) {
        let group = this.data.find(g => g.name === name);
        if (!group) {
            group = this.create(name);
        }
        return group.items.asObservable();
    }
    /**
     * Scroll to one of the items
     * @param name string
     * @param id string
     */
    scrollTo(name, id) {
        const group = this.data.find(group => group.name === name);
        group.items.getValue().forEach(item => {
            item.focus = false;
            if (item.id === id) {
                this._fromClick = true;
                this._updateFocused(item.top);
                window.scrollTo({ top: item.top, behavior: group.animation });
            }
        });
    }
};
MccScrollspyService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['Window',] }] }
];
MccScrollspyService = __decorate([
    Injectable(),
    __param(0, Inject('Window'))
], MccScrollspyService);
export { MccScrollspyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNjcm9sbHNweS9zY3JvbGxzcHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFxQiwwQkFBMEIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1RSxPQUFPLEVBQTRCLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc5RCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQWlCOUIsWUFBc0MsTUFBVztRQUFYLFdBQU0sR0FBTixNQUFNLENBQUs7UUFoQmpEOzs7V0FHRztRQUNLLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFcEM7O1dBRUc7UUFDSyxTQUFJLEdBQXdCLEVBQUUsQ0FBQztRQVFyQyx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQzthQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQy9CO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxD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QyxDQUFDO2dCQUM5QixNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQy9EO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTs7NENBbkdjLE1BQU0sU0FBQyxRQUFROztBQWpCakIsbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTtJQWtCRSxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtHQWpCbEIsbUJBQW1CLENBb0gvQjtTQXBIWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9zY3JvbGxzcHkuZGlyZWN0aXZlcyc7XHJcbmltcG9ydCB7IE1jY1Njcm9sbHNweUdyb3VwLCBTQ1JPTExTUFlfQU5JTUFUSU9OX1NNT09USCB9IGZyb20gJy4vc2Nyb2xsc3B5JztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTWNjU2Nyb2xsc3B5U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgLyoqXHJcbiAgICogV2hlbiBzY3JvbGwgaXMgZnJvbSBjbGljayBldmVudCwgY2hhbmdlIHRoaXMgYXR0ciB0byB0cnVlXHJcbiAgICogU28gc2Nyb2xsIGV2ZW50IG9iZXNlcnZhYmxlIGRvZXNuJ3QgZW1pdCBhbnkgdXBkYXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZnJvbUNsaWNrOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3Qgb2Ygc2Nyb2xsc3B5IGdyb3VwXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkYXRhOiBNY2NTY3JvbGxzcHlHcm91cFtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjcm9sbCBldmVudCBzdWJzY3JpcHRpb25cclxuICAgKi9cclxuICBwcml2YXRlIF9zY3JvbGxTdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdCgnV2luZG93JykgcHJpdmF0ZSB3aW5kb3c6IGFueSkge1xyXG4gICAgLy8gbGlzdGVuIHRvIHNjcm9sbCBldmVudFxyXG4gICAgdGhpcy5fc2Nyb2xsU3ViID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Njcm9sbCcpXHJcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCksIHdpdGhMYXRlc3RGcm9tKCgpID0+IHdpbmRvdy5zY3JvbGxZKSlcclxuICAgICAgLnN1YnNjcmliZShwb3NpdGlvbiA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9mcm9tQ2xpY2spIHtcclxuICAgICAgICAgIHRoaXMuX3VwZGF0ZUZvY3VzZWQocG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9mcm9tQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9zY3JvbGxTdWIgJiYgIXRoaXMuX3Njcm9sbFN1Yi5jbG9zZWQpIHtcclxuICAgICAgdGhpcy5fc2Nyb2xsU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgaW5mb3JtYXRpb24gYWJvdXQgd2ljaCBlbGVtZW50IGlzIG9uIGZvY3VzXHJcbiAgICogQHBhcmFtIHBvc2l0aW9uIG51bWJlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZUZvY3VzZWQocG9zaXRpb246IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhLmZvckVhY2goZ3JvdXAgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtcyA9IFtdO1xyXG4gICAgICBncm91cC5pdGVtcy5nZXRWYWx1ZSgpLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaXRlbS5mb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChpdGVtLnRvcCA8PSBwb3NpdGlvbikge1xyXG4gICAgICAgICAgaWYgKGl0ZW1zW2luZGV4IC0gMV0pIHtcclxuICAgICAgICAgICAgaXRlbXNbaW5kZXggLSAxXS5mb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGl0ZW0uZm9jdXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBncm91cC5pdGVtcy5uZXh0KGl0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIG5ldyBncm91cCBvZiBpdGVtc1xyXG4gICAqIEBwYXJhbSBuYW1lIHN0cmluZ1xyXG4gICAqIEBwYXJhbSBpdGVtcyBNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlW11cclxuICAgKiBAcGFyYW0gYW5pbWF0aW9uIFNjcm9sbEJlaGF2aW9yXHJcbiAgICovXHJcbiAgY3JlYXRlKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgaXRlbXM/OiBNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlW10sXHJcbiAgICBhbmltYXRpb24/OiBTY3JvbGxCZWhhdmlvclxyXG4gICk6IE1jY1Njcm9sbHNweUdyb3VwIHtcclxuICAgIGxldCBncm91cDogTWNjU2Nyb2xsc3B5R3JvdXAgPSB0aGlzLmRhdGEuZmluZChncm91cCA9PiBncm91cC5uYW1lID09PSBuYW1lKTtcclxuICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgZ3JvdXAgPSB7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbiB8fCBTQ1JPTExTUFlfQU5JTUFUSU9OX1NNT09USCxcclxuICAgICAgICBpdGVtczogbmV3IEJlaGF2aW9yU3ViamVjdDxNY2NTY3JvbGxzcHlJdGVtRGlyZWN0aXZlW10+KGl0ZW1zIHx8IFtdKSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuZGF0YS5wdXNoKGdyb3VwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdyb3VwLml0ZW1zLm5leHQoaXRlbXMgfHwgW10pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBncm91cDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBvYnNlcnZhYmxlIG9mIHRoZSBncm91cFxyXG4gICAqIEBwYXJhbSBuYW1lIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdyb3VwKG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8TWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZVtdPiB7XHJcbiAgICBsZXQgZ3JvdXA6IE1jY1Njcm9sbHNweUdyb3VwID0gdGhpcy5kYXRhLmZpbmQoZyA9PiBnLm5hbWUgPT09IG5hbWUpO1xyXG4gICAgaWYgKCFncm91cCkge1xyXG4gICAgICBncm91cCA9IHRoaXMuY3JlYXRlKG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBncm91cC5pdGVtcy5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjcm9sbCB0byBvbmUgb2YgdGhlIGl0ZW1zXHJcbiAgICogQHBhcmFtIG5hbWUgc3RyaW5nXHJcbiAgICogQHBhcmFtIGlkIHN0cmluZ1xyXG4gICAqL1xyXG4gIHNjcm9sbFRvKG5hbWU6IHN0cmluZywgaWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgZ3JvdXA6IE1jY1Njcm9sbHNweUdyb3VwID0gdGhpcy5kYXRhLmZpbmQoZ3JvdXAgPT4gZ3JvdXAubmFtZSA9PT0gbmFtZSk7XHJcblxyXG4gICAgZ3JvdXAuaXRlbXMuZ2V0VmFsdWUoKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBpdGVtLmZvY3VzID0gZmFsc2U7XHJcbiAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xyXG4gICAgICAgIHRoaXMuX2Zyb21DbGljayA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRm9jdXNlZChpdGVtLnRvcCk7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHsgdG9wOiBpdGVtLnRvcCwgYmVoYXZpb3I6IGdyb3VwLmFuaW1hdGlvbiB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==