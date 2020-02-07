import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MccTimerPickerComponent } from './timer-picker.component';
import { MccTimerPickerOriginDirective, MccConnectedTimerPickerDirective, } from './timer-picker.directives';
var MccTimerPickerModule = /** @class */ (function () {
    function MccTimerPickerModule() {
    }
    MccTimerPickerModule = __decorate([
        NgModule({
            imports: [CommonModule, PortalModule, OverlayModule, MatButtonModule],
            declarations: [
                MccTimerPickerComponent,
                MccTimerPickerOriginDirective,
                MccConnectedTimerPickerDirective,
            ],
            exports: [
                MccTimerPickerComponent,
                MccTimerPickerOriginDirective,
                MccConnectedTimerPickerDirective,
            ],
        })
    ], MccTimerPickerModule);
    return MccTimerPickerModule;
}());
export { MccTimerPickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsidGltZXItcGlja2VyL3RpbWVyLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTNELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFDTCw2QkFBNkIsRUFDN0IsZ0NBQWdDLEdBQ2pDLE1BQU0sMkJBQTJCLENBQUM7QUFlbkM7SUFBQTtJQUFvQyxDQUFDO0lBQXhCLG9CQUFvQjtRQWJoQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUM7WUFDckUsWUFBWSxFQUFFO2dCQUNaLHVCQUF1QjtnQkFDdkIsNkJBQTZCO2dCQUM3QixnQ0FBZ0M7YUFDakM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsdUJBQXVCO2dCQUN2Qiw2QkFBNkI7Z0JBQzdCLGdDQUFnQzthQUNqQztTQUNGLENBQUM7T0FDVyxvQkFBb0IsQ0FBSTtJQUFELDJCQUFDO0NBQUEsQUFBckMsSUFBcUM7U0FBeEIsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcblxyXG5pbXBvcnQgeyBNY2NUaW1lclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vdGltZXItcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7XHJcbiAgTWNjVGltZXJQaWNrZXJPcmlnaW5EaXJlY3RpdmUsXHJcbiAgTWNjQ29ubmVjdGVkVGltZXJQaWNrZXJEaXJlY3RpdmUsXHJcbn0gZnJvbSAnLi90aW1lci1waWNrZXIuZGlyZWN0aXZlcyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFBvcnRhbE1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE1jY1RpbWVyUGlja2VyQ29tcG9uZW50LFxyXG4gICAgTWNjVGltZXJQaWNrZXJPcmlnaW5EaXJlY3RpdmUsXHJcbiAgICBNY2NDb25uZWN0ZWRUaW1lclBpY2tlckRpcmVjdGl2ZSxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE1jY1RpbWVyUGlja2VyQ29tcG9uZW50LFxyXG4gICAgTWNjVGltZXJQaWNrZXJPcmlnaW5EaXJlY3RpdmUsXHJcbiAgICBNY2NDb25uZWN0ZWRUaW1lclBpY2tlckRpcmVjdGl2ZSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWNjVGltZXJQaWNrZXJNb2R1bGUgeyB9XHJcbiJdfQ==