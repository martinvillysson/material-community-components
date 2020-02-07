import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EMPTY_COLOR, USED_COLORS } from './color-picker';
import { MccColorPickerService } from './color-picker.service';
import { MccColorPickerComponent } from './color-picker.component';
import { MccColorPickerSelectorComponent } from './color-picker-selector.component';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccConnectedColorPickerDirective, MccColorPickerOriginDirective, MccColorPickerOptionDirective, } from './color-picker.directives';
var ɵ0 = [];
var MccColorPickerModule = /** @class */ (function () {
    function MccColorPickerModule() {
    }
    MccColorPickerModule_1 = MccColorPickerModule;
    /**
     *
     */
    MccColorPickerModule.forRoot = function (config) {
        return {
            ngModule: MccColorPickerModule_1,
            providers: [
                { provide: EMPTY_COLOR, useValue: config.empty_color || 'none' },
                { provide: USED_COLORS, useValue: config.used_colors || [] }
            ],
        };
    };
    var MccColorPickerModule_1;
    MccColorPickerModule = MccColorPickerModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
                PortalModule,
                OverlayModule,
                ReactiveFormsModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            declarations: [
                MccColorPickerComponent,
                MccConnectedColorPickerDirective,
                MccColorPickerSelectorComponent,
                MccColorPickerOriginDirective,
                MccColorPickerOptionDirective,
                MccColorPickerCollectionComponent,
            ],
            exports: [
                MccColorPickerComponent,
                MccConnectedColorPickerDirective,
                MccColorPickerOriginDirective,
                MccColorPickerCollectionComponent,
            ],
            providers: [
                MccColorPickerService,
                { provide: EMPTY_COLOR, useValue: 'none' },
                { provide: USED_COLORS, useValue: ɵ0 }
            ],
        })
    ], MccColorPickerModule);
    return MccColorPickerModule;
}());
export { MccColorPickerModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQXFCLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFL0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEYsT0FBTyxFQUNMLGdDQUFnQyxFQUNoQyw2QkFBNkIsRUFDN0IsNkJBQTZCLEdBQzlCLE1BQU0sMkJBQTJCLENBQUM7U0E2QkcsRUFBRTtBQUd4QztJQUFBO0lBYUEsQ0FBQzs2QkFiWSxvQkFBb0I7SUFDL0I7O09BRUc7SUFDSSw0QkFBTyxHQUFkLFVBQWUsTUFBeUI7UUFDdEMsT0FBTztZQUNMLFFBQVEsRUFBRSxzQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLEVBQUU7Z0JBQ2hFLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUU7YUFDN0Q7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFaVSxvQkFBb0I7UUE5QmhDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixtQkFBbUI7Z0JBQ25CLGVBQWU7Z0JBQ2Ysa0JBQWtCO2dCQUNsQixjQUFjO2FBQ2Y7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osdUJBQXVCO2dCQUN2QixnQ0FBZ0M7Z0JBQ2hDLCtCQUErQjtnQkFDL0IsNkJBQTZCO2dCQUM3Qiw2QkFBNkI7Z0JBQzdCLGlDQUFpQzthQUNsQztZQUNELE9BQU8sRUFBRTtnQkFDUCx1QkFBdUI7Z0JBQ3ZCLGdDQUFnQztnQkFDaEMsNkJBQTZCO2dCQUM3QixpQ0FBaUM7YUFDbEM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QscUJBQXFCO2dCQUNyQixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDMUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsSUFBSSxFQUFFO2FBQ3ZDO1NBQ0YsQ0FBQztPQUNXLG9CQUFvQixDQWFoQztJQUFELDJCQUFDO0NBQUEsQUFiRCxJQWFDO1NBYlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xyXG5cclxuaW1wb3J0IHsgRU1QVFlfQ09MT1IsIFVTRURfQ09MT1JTLCBDb2xvclBpY2tlckNvbmZpZyB9IGZyb20gJy4vY29sb3ItcGlja2VyJztcclxuXHJcbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyU2VydmljZSB9IGZyb20gJy4vY29sb3ItcGlja2VyLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgTWNjQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbG9yLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNY2NDb2xvclBpY2tlclNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXItc2VsZWN0b3IuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWNjQ29sb3JQaWNrZXJDb2xsZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXItY29sbGVjdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQge1xyXG4gIE1jY0Nvbm5lY3RlZENvbG9yUGlja2VyRGlyZWN0aXZlLFxyXG4gIE1jY0NvbG9yUGlja2VyT3JpZ2luRGlyZWN0aXZlLFxyXG4gIE1jY0NvbG9yUGlja2VyT3B0aW9uRGlyZWN0aXZlLFxyXG59IGZyb20gJy4vY29sb3ItcGlja2VyLmRpcmVjdGl2ZXMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBQb3J0YWxNb2R1bGUsXHJcbiAgICBPdmVybGF5TW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNY2NDb2xvclBpY2tlckNvbXBvbmVudCxcclxuICAgIE1jY0Nvbm5lY3RlZENvbG9yUGlja2VyRGlyZWN0aXZlLFxyXG4gICAgTWNjQ29sb3JQaWNrZXJTZWxlY3RvckNvbXBvbmVudCxcclxuICAgIE1jY0NvbG9yUGlja2VyT3JpZ2luRGlyZWN0aXZlLFxyXG4gICAgTWNjQ29sb3JQaWNrZXJPcHRpb25EaXJlY3RpdmUsXHJcbiAgICBNY2NDb2xvclBpY2tlckNvbGxlY3Rpb25Db21wb25lbnQsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBNY2NDb2xvclBpY2tlckNvbXBvbmVudCxcclxuICAgIE1jY0Nvbm5lY3RlZENvbG9yUGlja2VyRGlyZWN0aXZlLFxyXG4gICAgTWNjQ29sb3JQaWNrZXJPcmlnaW5EaXJlY3RpdmUsXHJcbiAgICBNY2NDb2xvclBpY2tlckNvbGxlY3Rpb25Db21wb25lbnQsXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIE1jY0NvbG9yUGlja2VyU2VydmljZSxcclxuICAgIHsgcHJvdmlkZTogRU1QVFlfQ09MT1IsIHVzZVZhbHVlOiAnbm9uZScgfSxcclxuICAgIHsgcHJvdmlkZTogVVNFRF9DT0xPUlMsIHVzZVZhbHVlOiBbXSB9XHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1jY0NvbG9yUGlja2VyTW9kdWxlIHtcclxuICAvKipcclxuICAgKlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogQ29sb3JQaWNrZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1jY0NvbG9yUGlja2VyTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogTWNjQ29sb3JQaWNrZXJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHsgcHJvdmlkZTogRU1QVFlfQ09MT1IsIHVzZVZhbHVlOiBjb25maWcuZW1wdHlfY29sb3IgfHwgJ25vbmUnIH0sXHJcbiAgICAgICAgeyBwcm92aWRlOiBVU0VEX0NPTE9SUywgdXNlVmFsdWU6IGNvbmZpZy51c2VkX2NvbG9ycyB8fCBbXSB9XHJcbiAgICAgIF0sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=