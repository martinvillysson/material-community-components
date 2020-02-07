import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MccScrollspyService } from './scrollspy.service';
import { MccScrollspyGroupDirective, MccScrollspyItemDirective } from './scrollspy.directives';
var ɵ0 = window;
var MccScrollspyModule = /** @class */ (function () {
    function MccScrollspyModule() {
    }
    MccScrollspyModule = __decorate([
        NgModule({
            imports: [CommonModule, ScrollingModule],
            providers: [MccScrollspyService, { provide: 'Window', useValue: ɵ0 }],
            declarations: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
            exports: [MccScrollspyGroupDirective, MccScrollspyItemDirective],
        })
    ], MccScrollspyModule);
    return MccScrollspyModule;
}());
export { MccScrollspyModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic2Nyb2xsc3B5L3Njcm9sbHNweS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztTQUk3QixNQUFNO0FBSXhFO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixrQkFBa0I7UUFOOUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQztZQUN4QyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxJQUFRLEVBQUUsQ0FBQztZQUN6RSxZQUFZLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSx5QkFBeUIsQ0FBQztZQUNyRSxPQUFPLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSx5QkFBeUIsQ0FBQztTQUNqRSxDQUFDO09BQ1csa0JBQWtCLENBQUc7SUFBRCx5QkFBQztDQUFBLEFBQWxDLElBQWtDO1NBQXJCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xyXG5cclxuaW1wb3J0IHsgTWNjU2Nyb2xsc3B5U2VydmljZSB9IGZyb20gJy4vc2Nyb2xsc3B5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNY2NTY3JvbGxzcHlHcm91cERpcmVjdGl2ZSwgTWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsc3B5LmRpcmVjdGl2ZXMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTY3JvbGxpbmdNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW01jY1Njcm9sbHNweVNlcnZpY2UsIHsgcHJvdmlkZTogJ1dpbmRvdycsIHVzZVZhbHVlOiB3aW5kb3cgfV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTWNjU2Nyb2xsc3B5R3JvdXBEaXJlY3RpdmUsIE1jY1Njcm9sbHNweUl0ZW1EaXJlY3RpdmVdLFxyXG4gIGV4cG9ydHM6IFtNY2NTY3JvbGxzcHlHcm91cERpcmVjdGl2ZSwgTWNjU2Nyb2xsc3B5SXRlbURpcmVjdGl2ZV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNY2NTY3JvbGxzcHlNb2R1bGUge31cclxuIl19