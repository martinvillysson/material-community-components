import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { coerceHexaColor, isValidColor, EMPTY_COLOR, USED_COLORS } from './color-picker';
import { BehaviorSubject } from 'rxjs';
var MccColorPickerService = /** @class */ (function () {
    function MccColorPickerService(emptyColor, usedColors) {
        this.emptyColor = emptyColor;
        this.usedColors = usedColors;
        /**
         * Array of all used colors
         */
        this._colors = new BehaviorSubject([]);
        this._colors.next(usedColors);
    }
    /**
     * Add new color to used colors
     * @param color string
     */
    MccColorPickerService.prototype.addColor = function (color) {
        if (!color || !isValidColor(color)) {
            return;
        }
        color = coerceHexaColor(color) || this.emptyColor;
        var colors = this._colors.getValue();
        if (!colors.find(function (_color) { return _color === color; })) {
            colors.push(color);
            this._colors.next(colors);
        }
    };
    /**
     * Return Observable of colors
     */
    MccColorPickerService.prototype.getColors = function () {
        return this._colors.asObservable();
    };
    /**
     * Reset the array of used colors
     */
    MccColorPickerService.prototype.resetUseColors = function () {
        this._colors.next([]);
    };
    MccColorPickerService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [EMPTY_COLOR,] }] },
        { type: Array, decorators: [{ type: Inject, args: [USED_COLORS,] }] }
    ]; };
    MccColorPickerService = __decorate([
        Injectable(),
        __param(0, Inject(EMPTY_COLOR)),
        __param(1, Inject(USED_COLORS))
    ], MccColorPickerService);
    return MccColorPickerService;
}());
export { MccColorPickerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbC1jb21tdW5pdHktY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pGLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHbkQ7SUFNRSwrQkFDK0IsVUFBa0IsRUFDbEIsVUFBb0I7UUFEcEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFVO1FBUG5EOztXQUVHO1FBQ0ssWUFBTyxHQUE4QixJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztRQU03RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsd0NBQVEsR0FBUixVQUFTLEtBQWE7UUFDcEIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQyxPQUFPO1NBQ1I7UUFFRCxLQUFLLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFbEQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sS0FBSyxLQUFLLEVBQWhCLENBQWdCLENBQUMsRUFBRTtZQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUNBQVMsR0FBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCw4Q0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7NkNBcENFLE1BQU0sU0FBQyxXQUFXOzRDQUNsQixNQUFNLFNBQUMsV0FBVzs7SUFSVixxQkFBcUI7UUFEakMsVUFBVSxFQUFFO1FBUVIsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkIsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FSWCxxQkFBcUIsQ0E0Q2pDO0lBQUQsNEJBQUM7Q0FBQSxBQTVDRCxJQTRDQztTQTVDWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgY29lcmNlSGV4YUNvbG9yLCBpc1ZhbGlkQ29sb3IsIEVNUFRZX0NPTE9SLCBVU0VEX0NPTE9SUyB9IGZyb20gJy4vY29sb3ItcGlja2VyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNY2NDb2xvclBpY2tlclNlcnZpY2Uge1xyXG4gIC8qKlxyXG4gICAqIEFycmF5IG9mIGFsbCB1c2VkIGNvbG9yc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NvbG9yczogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KEVNUFRZX0NPTE9SKSBwcml2YXRlIGVtcHR5Q29sb3I6IHN0cmluZyxcclxuICAgIEBJbmplY3QoVVNFRF9DT0xPUlMpIHByaXZhdGUgdXNlZENvbG9yczogc3RyaW5nW11cclxuICApIHtcclxuICAgIHRoaXMuX2NvbG9ycy5uZXh0KHVzZWRDb2xvcnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG5ldyBjb2xvciB0byB1c2VkIGNvbG9yc1xyXG4gICAqIEBwYXJhbSBjb2xvciBzdHJpbmdcclxuICAgKi9cclxuICBhZGRDb2xvcihjb2xvcjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoIWNvbG9yIHx8ICFpc1ZhbGlkQ29sb3IoY29sb3IpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb2xvciA9IGNvZXJjZUhleGFDb2xvcihjb2xvcikgfHwgdGhpcy5lbXB0eUNvbG9yO1xyXG5cclxuICAgIGNvbnN0IGNvbG9ycyA9IHRoaXMuX2NvbG9ycy5nZXRWYWx1ZSgpO1xyXG4gICAgaWYgKCFjb2xvcnMuZmluZChfY29sb3IgPT4gX2NvbG9yID09PSBjb2xvcikpIHtcclxuICAgICAgY29sb3JzLnB1c2goY29sb3IpO1xyXG4gICAgICB0aGlzLl9jb2xvcnMubmV4dChjb2xvcnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIE9ic2VydmFibGUgb2YgY29sb3JzXHJcbiAgICovXHJcbiAgZ2V0Q29sb3JzKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvcnMuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCB0aGUgYXJyYXkgb2YgdXNlZCBjb2xvcnNcclxuICAgKi9cclxuICByZXNldFVzZUNvbG9ycygpOiB2b2lkIHtcclxuICAgIHRoaXMuX2NvbG9ycy5uZXh0KFtdKTtcclxuICB9XHJcbn1cclxuIl19