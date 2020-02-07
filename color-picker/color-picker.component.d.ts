import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccColorPickerService } from './color-picker.service';
export declare class MccColorPickerComponent implements AfterContentInit, OnInit, OnDestroy {
    private elementRef;
    private changeDetectorRef;
    private colorPickerService;
    emptyColor: string;
    /**
     * Get all collections
     */
    _collections: QueryList<MccColorPickerCollectionComponent>;
    /**
     * Change label of the collection UsedColors
     */
    get usedColorLabel(): string;
    set usedColorLabel(value: string);
    private _usedColorLabel;
    /**
     * Set initial value for used color
     */
    set usedColorStart(colors: string[]);
    /**
     * Set usedColor to be used in reverse
     */
    set reverseUsedColors(reverse: boolean);
    private _reverseUsedColor;
    /**
     * Hide the hexadecimal color forms.
     */
    get hideHexForms(): boolean;
    set hideHexForms(value: boolean);
    private _hideHexForms;
    /**
     * Hide empty slots from the collection UsedColors
     */
    get hideEmpty(): boolean;
    set hideEmpty(value: boolean);
    private _hideEmpty;
    /**
     * Hide transparent option of UsedColors
     */
    get hideTransparent(): boolean;
    set hideTransparent(value: boolean);
    private _hideTransparent;
    /**
     * Hide UsedColors collection
     */
    get hideUsedColors(): boolean;
    set hideUsedColors(value: boolean);
    private _hideUsedColors;
    /**
     * Start with a color selected
     */
    get selectedColor(): string;
    set selectedColor(value: string);
    private _selectedColor;
    /**
     * Define if the panel will be initiated open
     */
    get isOpen(): boolean;
    set isOpen(value: boolean);
    private _isOpen;
    /**
     * Define if the panel will show in overlay or not
     */
    get overlay(): boolean;
    set overlay(value: boolean);
    private _overlay;
    /**
     * Hide the action buttons (cancel/confirm)
     */
    get hideButtons(): boolean;
    set hideButtons(value: boolean);
    private _hideButtons;
    /**
     * Define new height for the selector
     */
    get colorPickerSelectorHeight(): number;
    set colorPickerSelectorHeight(height: number);
    private _colorPickerSelectorHeight;
    /**
     * Hide the color picker selector
     */
    get hideColorPickerSelector(): boolean;
    set hideColorPickerSelector(value: boolean);
    private _hideColorPickerSelector;
    /**
     * Set the size of the used colors
     */
    usedSizeColors: number;
    /**
     * Change btnCancel label
     */
    btnCancel: string;
    /**
     * Change btnConfirm label
     */
    btnConfirm: string;
    /**
     * Event emitted when user change the selected color (without confirm)
     */
    change: EventEmitter<any>;
    /**
     * Event emitted when selected color is confirm
     */
    selected: EventEmitter<any>;
    /**
     * Event emitted when is clicked outside of the component
     */
    clickOut: EventEmitter<any>;
    /**
     * Return a Observable with the color the user is picking
     */
    get tmpSelectedColor$(): Observable<string>;
    private _tmpSelectedColor;
    /**
     * Observable with all the colors used by the user
     */
    get usedColors$(): Observable<string[]>;
    /**
     * Array of subscriptions from the collections
     */
    private _collectionSubs;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, colorPickerService: MccColorPickerService, emptyColor: string);
    ngOnInit(): void;
    /**
     * Walk throw all collections and subcribe to changes
     */
    ngAfterContentInit(): void;
    /**
     * Destroy all subscriptions
     */
    ngOnDestroy(): void;
    /**
     * Update selected color and emit the change
     */
    private _updateSelectedColor;
    /**
     * Open/close color picker panel
     */
    toggle(): void;
    /**
     * Update selected color, close the panel and notify the user
     */
    backdropClick(): void;
    /**
     * Update tmpSelectedColor
     * @param color string
     */
    updateTmpSelectedColor(color: string): void;
    /**
     * Cancel the selection and close the panel
     */
    cancelSelection(): void;
    /**
     * Update selectedColor and close the panel
     */
    confirmSelectedColor(): void;
}
