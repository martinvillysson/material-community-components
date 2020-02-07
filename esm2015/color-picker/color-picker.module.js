var MccColorPickerModule_1;
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
const ɵ0 = [];
let MccColorPickerModule = MccColorPickerModule_1 = class MccColorPickerModule {
    /**
     *
     */
    static forRoot(config) {
        return {
            ngModule: MccColorPickerModule_1,
            providers: [
                { provide: EMPTY_COLOR, useValue: config.empty_color || 'none' },
                { provide: USED_COLORS, useValue: config.used_colors || [] }
            ],
        };
    }
};
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
export { MccColorPickerModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hdGVyaWFsLWNvbW11bml0eS1jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFxQixNQUFNLGdCQUFnQixDQUFDO0FBRTdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRS9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ25FLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hGLE9BQU8sRUFDTCxnQ0FBZ0MsRUFDaEMsNkJBQTZCLEVBQzdCLDZCQUE2QixHQUM5QixNQUFNLDJCQUEyQixDQUFDO1dBNkJHLEVBQUU7QUFHeEMsSUFBYSxvQkFBb0IsNEJBQWpDLE1BQWEsb0JBQW9CO0lBQy9COztPQUVHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUF5QjtRQUN0QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLHNCQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sRUFBRTtnQkFDaEUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRTthQUM3RDtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWJZLG9CQUFvQjtJQTlCaEMsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLFlBQVk7WUFDWixhQUFhO1lBQ2IsbUJBQW1CO1lBQ25CLGVBQWU7WUFDZixrQkFBa0I7WUFDbEIsY0FBYztTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1osdUJBQXVCO1lBQ3ZCLGdDQUFnQztZQUNoQywrQkFBK0I7WUFDL0IsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3QixpQ0FBaUM7U0FDbEM7UUFDRCxPQUFPLEVBQUU7WUFDUCx1QkFBdUI7WUFDdkIsZ0NBQWdDO1lBQ2hDLDZCQUE2QjtZQUM3QixpQ0FBaUM7U0FDbEM7UUFDRCxTQUFTLEVBQUU7WUFDVCxxQkFBcUI7WUFDckIsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7WUFDMUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsSUFBSSxFQUFFO1NBQ3ZDO0tBQ0YsQ0FBQztHQUNXLG9CQUFvQixDQWFoQztTQWJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcclxuXHJcbmltcG9ydCB7IEVNUFRZX0NPTE9SLCBVU0VEX0NPTE9SUywgQ29sb3JQaWNrZXJDb25maWcgfSBmcm9tICcuL2NvbG9yLXBpY2tlcic7XHJcblxyXG5pbXBvcnQgeyBNY2NDb2xvclBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2NvbG9yLXBpY2tlci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb2xvci1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWNjQ29sb3JQaWNrZXJTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyLXNlbGVjdG9yLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1jY0NvbG9yUGlja2VyQ29sbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29sb3ItcGlja2VyLWNvbGxlY3Rpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICBNY2NDb25uZWN0ZWRDb2xvclBpY2tlckRpcmVjdGl2ZSxcclxuICBNY2NDb2xvclBpY2tlck9yaWdpbkRpcmVjdGl2ZSxcclxuICBNY2NDb2xvclBpY2tlck9wdGlvbkRpcmVjdGl2ZSxcclxufSBmcm9tICcuL2NvbG9yLXBpY2tlci5kaXJlY3RpdmVzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgUG9ydGFsTW9kdWxlLFxyXG4gICAgT3ZlcmxheU1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTWNjQ29sb3JQaWNrZXJDb21wb25lbnQsXHJcbiAgICBNY2NDb25uZWN0ZWRDb2xvclBpY2tlckRpcmVjdGl2ZSxcclxuICAgIE1jY0NvbG9yUGlja2VyU2VsZWN0b3JDb21wb25lbnQsXHJcbiAgICBNY2NDb2xvclBpY2tlck9yaWdpbkRpcmVjdGl2ZSxcclxuICAgIE1jY0NvbG9yUGlja2VyT3B0aW9uRGlyZWN0aXZlLFxyXG4gICAgTWNjQ29sb3JQaWNrZXJDb2xsZWN0aW9uQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTWNjQ29sb3JQaWNrZXJDb21wb25lbnQsXHJcbiAgICBNY2NDb25uZWN0ZWRDb2xvclBpY2tlckRpcmVjdGl2ZSxcclxuICAgIE1jY0NvbG9yUGlja2VyT3JpZ2luRGlyZWN0aXZlLFxyXG4gICAgTWNjQ29sb3JQaWNrZXJDb2xsZWN0aW9uQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBNY2NDb2xvclBpY2tlclNlcnZpY2UsXHJcbiAgICB7IHByb3ZpZGU6IEVNUFRZX0NPTE9SLCB1c2VWYWx1ZTogJ25vbmUnIH0sXHJcbiAgICB7IHByb3ZpZGU6IFVTRURfQ09MT1JTLCB1c2VWYWx1ZTogW10gfVxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNY2NDb2xvclBpY2tlck1vZHVsZSB7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKi9cclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IENvbG9yUGlja2VyQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxNY2NDb2xvclBpY2tlck1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE1jY0NvbG9yUGlja2VyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7IHByb3ZpZGU6IEVNUFRZX0NPTE9SLCB1c2VWYWx1ZTogY29uZmlnLmVtcHR5X2NvbG9yIHx8ICdub25lJyB9LFxyXG4gICAgICAgIHsgcHJvdmlkZTogVVNFRF9DT0xPUlMsIHVzZVZhbHVlOiBjb25maWcudXNlZF9jb2xvcnMgfHwgW10gfVxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19