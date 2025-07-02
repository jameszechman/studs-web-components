# @studs/ui

## 1.0.1

### Patch Changes

- Resolved an issue with data grid that resulted in users being unable to import @studs/ui
- Updated dependencies
  - @studs/styles@1.0.1

## 1.0.0

### Major Changes

- 06a6521: Alpha Release
- STUDS 1.0.0 Initial Release

### Patch Changes

- 5666b40: #### @studs/ui

  - Removed `src` folder for distributed package
  - Added further instructions on studs documentation for installation
  - Added changelog to studs documentation
  - Optimization of mixins

  ##### Checkbox Group

  - Component Introduced

  ##### Toggle Button

  - Component Introduced

  ##### Toggle Button Group

  - Component Introduced

  ##### Floating Elements

  - Removed redundant autoUpdate calls for popper to resolve Dropdown performance issue
  - Added `focusout` even that, when the floating element is shown via toggleor click, will allow for the floating element to close on click out.
  - Added close on `esc` keyboard click

  ##### Dropdown

  - Removed `position:relative` from wrapper
  - Enabled keyboard functionality for dropdown navigation
  - Added a `value` prop to internally used `studs-checkboxes` for `type="multi"` dropdowns

  ##### Radio Group

  - Enabled keyboard functionality for Radio Group navigation

  ##### Radio

  - Moved Radio from Light DOM to Shadow DOM
  - Removed duplicate onChange events from firing

  ##### Button Group

  - Removed individual listeners on `studs-buttons` and added an event to `studs-button-group`
  - Removed ability for `selected` state
  - Added `role='group'` children parent

  ##### Slider

  - Fixed slider issue when a parent element had `text-align:center`

  ##### Input

  - Removed properties `adornment`, `adornmentType`, and `adornmentPosition`
  - Added property `adornments` which takes an object of adornments with support for type, and position
  - Added the ability to set the input state to `infinite` via the `infinite` property

  ##### Button

  - Added Full Width Property
  - Restyled `studs-button` with `type="image"` to better match design
  - Added code to ensure disabled state does not allow for interaction

  ##### Grid

  - Improved performance of column resizing
  - Added row selection
  - Moved the table header filters to a popover that show on button click

  #### @studs/react

  - Downgraded react to 17.0.2
  - Set `react` and `react-dom` as peer dependencies
  - Implemented better React types

- 0da0d56: Upgrade build setup and target browsers down to es2015
- d660f9f: #### @studs/ui

  - Documentation for `studs-label` added to docs site
  - Styles updated on multible components to match current design
  - Added Default states to all storybook stories
  - Added CDN links for all components version beta.8 and above

  ##### File Upload

  - Component Introduced

  ##### Data Grid

  - Resolved an issue with new Data Grid causing virtualizer not to work properly.
  - Resolved an issue causing filter to disappear.
  - Added additional check to ensure data updates when changed externally

  ##### Avatar

  - Component Introduced

  ##### Avatar Group

  - Component Introduced

  ##### Skeleton

  - - Styles updated to match design

  ##### Range Slider

  - Resolved an issue causing value to not be obtainable from outside of the component

  ##### Divider

  - Added new property `variant` to set the divider style from solid to dashed

  ##### Date Picker

  - Resolved an issue where the date picker was not adhering to a disabled state

  ##### Tabs

  - Added `variant` property to set the style of the tabs

  ##### Modal

  - Switch to using HTML5 `dialog` component
  - Enabled controllability via the `open` property
  - Added `scrollBlocking`, `focusLocking` and `closeOnOverlayClick` functionality

  ##### Toggle Button

  - Resolved an issue causing the component to not render in the docs site

  ##### Toggle Button Group

  - Resolved an issue causing the component to not render in the docs site

  ##### Collapse

  - Component Introduced

  ##### Menu

  - Added additional menu property `type` to set the type of menu.
  - Added additional recipes in Storybook and docs for how to use the menu

- 570d040: Migrate Alpha to Beta
- 7f114fe: #### @studs/ui

  - Fixed a bug that caused Sentry to load multiple times

  ##### Resizer

  - Reworked Resizer so manage multiple panels at once

  ##### List

  - Component Introduced

  ##### List Item

  - Component Introduced

  ##### Tables

  - Added nested table functionality

  ##### Popover

  - Removed Header slot if no header is added
  - Removed Footer slot if no footer is added
  - Added property to show or hide the close button `showCloseButton`

- 7260f29: #### @studs/ui

  ##### Datepicker

  - Component Introduced

  ##### Divider

  - Component Introduced

  ##### Popover

  - Added new property `close-on-click-outside` that enables closing the popover when focus is left

  ##### List Item

  - Fixed an issue where the cursor wasn't switching to `not-allowed` on disabled state

  ##### Grid

  - Added the ability to choose whether column `searchable` is enabled via boolean, or via a specific datasource
  - Added additional types `'checkbox' | 'switch' | 'dropdown' | 'template'` to column type options
  - Added new column property `dropdownOptions` to render options if type is equal to `dropdown`
  - Added a new column property `render` to allow for rendering custom HTML content within column
  - Added the ability to have editable columns
  - Implemented a new solution for infinite scroll

  ##### Stepper

  - Updated styles

  ##### Resizer

  - Fixed a height issue for safari

  ##### Dropdown

  - Fixed a sizing issue on listbox

- ccdf49d: #### @studs/ui

  ##### Dropdown

  - Added type `Option | Option[]` to selected property
  - Simplified `getSelected()` method
  - Added a check for differing value types if `getSelected()` option value is of type `num`
  - Select All Checkbox now shows `indeterminate` if some options are selected but not all
  - Added keyboard functionality with `tab`, `shift+tab` and arrow presses
  - Added an additional check for property `type` when updating component to ensure auto conversion from default to search remains consistent
  - Switch to showing all options when `type` is `search` and an option is selected
  - Added helper text and status text / messages

  ##### Fieldset

  - Made the size of the label/legend the standard size (1em)
  - Added `display` property to ensure both directional display and type of display for the label `block | inline`

  ##### Radio Group & Checkbox Group

  - Added property `direction` for internal fieldset
  - Added support for `aria-checked="mixed"` if `indeterminate` is used.
  - Fixed value prop change, so that only one value stays selected

  ##### Menu

  - Fixed menu styles causing menu to show up as flex instead of waiting for floating element to open
  - Fixed an issue where Menu wouldn't go past the size of the container

  ##### Toggle Button Group

  - Fixed how buttons are selected in a group

  ##### Toggle Button

  - Added listener to set toggled state if selected is true

  ##### Accordion

  - Resolved an issue with overflow and padding causing parts of an element to not be shown
  - Added keyboard interactivity to accordion
  - Added default navigation and startEnd functionality to shared onKeyDown functionality
  - Added @search event that returns index and query
  - Added @change event that returns index and open state
  - Added onSearch event to StudsAccordion
  - Added aria attributes to accordion-item for accessability and functionality

  ##### Accordion Item

  - Added event that detects click of `Enter`` to open the accordion
  - Split Accordion and Accordion Item CSS

  ##### Floating Elements

  - Enabled `ElementResize` watcher

  ##### Tabs

  - Reworked Tabs to utilize aria-attributes
  - Added controllability to Tabs
  - Removed Dependency on 'section' tag and switched to using `slot="panel"` for styling
  - Switched from custom attribute selected to `aria-selected` and `aria-expanded`
  - Added keyboard interactivity to tabs
  - Added focus state to buttons slotted into tabs
  - Added default navigation and startEnd functionality to shared onKeyDown functionality

  ##### Resizer

  - Added Icons temporarily as internal base64 strings until we can resolve issue with assets not loading
  - Added backup `max-widths` on host element
  - Removed `display:content` on Resizer Pane
  - Added `overflow-y:scroll` to pane wrapper to ensure scrollability

  ##### Checkbox

  - Fixed an issue when state of `indeterminate` is set, the checkbox doesn't allow to switch to unchecked or checked

  ##### Input

  - Removed unusued properties
  - Removed `not-allowed` on disabled input

  ##### Textarea

  - Removed `not-allowed` on disabled input

  ##### Switch

  - Removed hardcoded 'value' from Switch
  - Fixed `label-position` so that it accurately reflects position the label is moved too
  - Removed `justify-content: center` and added `align` property with options `start | center | end`
  - Added new property `show-value` to enable value visiblity

  ##### Tooltip

  - Set slot to `display: inline` to allow for better styling

- f07e98f: #### @studs/ui

  ##### Floating Elements

  -Added new property `strategy`

  ##### Tooltip

  - Switched position to fixed - Switched floating element `strategy` to fixed
  - Adjust styles to use width: `fit-content` and width: `-moz-fit-content`

  ##### Slider

  - Changed event dispatch to only return value if slider is not a range

  ##### Radio Group

  - Resolved an issue where radio group was causing customElements.define errors in @studs/react

  ##### @studs/react

  - Removed all dependencies
  - Resolved an issue where @studs/react needed to be bundled further within a node 12 environment

- ef3a4d2: #### @studs/ui

  - Reworked the initialization of Studs from imported styles directly to running the function `Studs.init()` to add styles and implement other logic related to the development and usage of Studs
  - Implemented Code Splitting and Tree Shaking to @studs/ui and @studs/react

  ##### Toaster

  - Fixed an issue where Toaster wasn't always showing up above other elements

  ##### Dropdown

  - Fixed an issue that caused `type='multi'` to not register changes when adding or removing items
  - Minor design update to grouped options

  ##### Datepicker

  - Migrated Datepicker to utilize pre-existing floating shared functionality
  - Changed input to `type='date'` for accessability and localization

  ##### Waffle Menu

  - Added a max-height to Waffle Menu

  ##### Coachmark

  - Component Removed

  ##### App Shell

  - Component Introduced

  ##### Menu

  - Added the ability to add menu-item's, menu-label's, and menu-title's

  ##### Menu Item

  - Component Introduced

  ##### Menu Label

  - Component Introduced

  ##### Menu Title

  - Component Introduced

  ##### Data Grid

  - Updated the method in which data is filtered
  - Fixed an issue where multiple items could not be selected
  - Switched Grid to utilize CSS Grid
  - Switched Grid to utilize CSS Grid

## 1.0.0-beta.8

### Patch Changes

#### @studs/ui

- Documentation for `studs-label` added to docs site
- Styles updated on multible components to match current design
- Added Default states to all storybook stories
- Added CDN links for all components version beta.8 and above

##### File Upload

- Component Introduced

##### Data Grid

- Resolved an issue with new Data Grid causing virtualizer not to work properly.
- Resolved an issue causing filter to disappear.
- Added additional check to ensure data updates when changed externally

##### Avatar

- Component Introduced

##### Avatar Group

- Component Introduced

##### Skeleton

- - Styles updated to match design

##### Range Slider

- Resolved an issue causing value to not be obtainable from outside of the component

##### Divider

- Added new property `variant` to set the divider style from solid to dashed

##### Date Picker

- Resolved an issue where the date picker was not adhering to a disabled state

##### Tabs

- Added `variant` property to set the style of the tabs

##### Modal

- Switch to using HTML5 `dialog` component
- Enabled controllability via the `open` property
- Added `scrollBlocking`, `focusLocking` and `closeOnOverlayClick` functionality

##### Toggle Button

- Resolved an issue causing the component to not render in the docs site

##### Toggle Button Group

- Resolved an issue causing the component to not render in the docs site

##### Collapse

- Component Introduced

##### Menu

- Added additional menu property `type` to set the type of menu.
- Added additional recipes in Storybook and docs for how to use the menu

## 1.0.0-beta.7

### Patch Changes

#### @studs/ui

- Reworked the initialization of Studs from imported styles directly to running the function `Studs.init()` to add styles and implement other logic related to the development and usage of Studs
- Implemented Code Splitting and Tree Shaking to @studs/ui and @studs/react

##### Toaster

- Fixed an issue where Toaster wasn't always showing up above other elements

##### Dropdown

- Fixed an issue that caused `type='multi'` to not register changes when adding or removing items
- Minor design update to grouped options

##### Datepicker

- Migrated Datepicker to utilize pre-existing floating shared functionality
- Changed input to `type='date'` for accessability and localization

##### Waffle Menu

- Added a max-height to Waffle Menu

##### Coachmark

- Component Removed

##### App Shell

- Component Introduced

##### Menu

- Added the ability to add menu-item's, menu-label's, and menu-title's

##### Menu Item

- Component Introduced

##### Menu Label

- Component Introduced

##### Menu Title

- Component Introduced

##### Data Grid

- Updated the method in which data is filtered
- Fixed an issue where multiple items could not be selected
- Switched Grid to utilize CSS Grid

## 1.0.0-beta.6

### Patch Changes

- ### @studs/react

  - Added a new component `StudsDatePicker`
  - Added a new component `StudsDivider`

  ### @studs/ui

  - Added a new component `studs-date-picker`
  - Added a new component `studs-divider`

  #### Popover

  - Added new property `close-on-click-outside` that enables closing the popover when focus is left

  #### List Item

  - Fixed an issue where the cursor wasn't switching to `not-allowed` on disabled state

  #### Grid

  - Added the ability to choose whether column `searchable` is enabled via boolean, or via a specific datasource
  - Added additional types `'checkbox' | 'switch' | 'dropdown' | 'template'` to column type options
  - Added new column property `dropdownOptions` to render options if type is equal to `dropdown`
  - Added a new column property `render` to allow for rendering custom HTML content within column
  - Added the ability to have editable columns
  - Implemented a new solution for infinite scroll

  #### Stepper

  - Updated styles

  #### Resizer

  - Fixed an height issue for safari

  #### Dropdown

  - Fixed a sizing issue on listbox

## 1.0.0-beta.5

### Patch Changes

- 7f114fee: ### @studs/react

  ### @studs/ui

  - Fixed a bug that caused Sentry to load multible times

  #### Resizer

  - Reworked Resizer so manage multible panels at once

  #### List

  - Added new component Studs List

  #### List Item

  - Added new component Studs List Item, a dependency of Studs List

  #### Tables

  - Added nested table functionality

  #### Popover

  - Removed Header slot if no header is added
  - Removed Footer slot if no footer is added
  - Added property to show or hide the close button `showCloseButton`

## 1.0.0-beta.4

### Patch Changes

- ccdf49da: ### @studs/react

  - Added new component `StudsBreadcrumbs`

  ### @studs/ui

  #### Dropdown

  - Added type `Option | Option[]` to selected property
  - Simplified `getSelected()` method
  - Added a check for differing value types if `getSelected()` option value is of type `num`
  - Select All Checkbox now shows `indeterminate` if some options are selected but not all
  - Added keyboard functionality with `tab`, `shift+tab` and arrow presses
  - Added an additional check for property `type` when updating component to ensure auto conversion from default to search remains consistent
  - Switch to showing all options when `type` is `search` and an option is selected
  - Added helper text and status text / messages

  #### Fieldset

  - Made the size of the label/legend the standard size (1em)
  - Added `display` property to ensure both directional display and type of display for the label `block | inline`

  #### Radio Group & Checkbox Group

  - Added property `direction` for internal fieldset
  - Added support for `aria-checked="mixed"` if `indeterminate` is used.
  - Fixed value prop change, so that only one value stays selected

  #### Menu

  - Fixed menu styles causing menu to show up as flex instead of waiting for floating element to open
  - Fixed an issue where Menu wouldn't go past the size of the container

  #### Toggle Button Group

  - Fixed how buttons are selected in a group

  #### Toggle Button

  - Added listener to set toggled state if selected is true

  #### Accordion

  - Resolved an issue with overflow and padding causing parts of an element to not be shown
  - Added keyboard interactivity to accordion
  - Added default navigation and startEnd functionality to shared onKeyDown functionality
  - Added @search event that returns index and query
  - Added @change event that returns index and open state
  - Added onSearch event to StudsAccordion
  - Added aria attributes to accordion-item for accessability and functionality

  #### Accordion Item

  - Added event that detects click of `Enter`` to open the accordion
  - Split Accordion and Accordion Item CSS

  #### Floating Elements

  - Enabled `ElementResize` watcher

  #### Tabs

  - Reworked Tabs to utilize aria-attributes
  - Added controllability to Tabs
  - Removed Dependency on 'section' tag and switched to using `slot="panel"` for styling
  - Switched from custom attribute selected to `aria-selected` and `aria-expanded`
  - Added keyboard interactivity to tabs
  - Added focus state to buttons slotted into tabs
  - Added default navigation and startEnd functionality to shared onKeyDown functionality

  #### Resizer

  - Added Icons temporarily as internal base64 strings until we can resolve issue with assets not loading
  - Added backup `max-widths` on host element
  - Removed `display:content` on Resizer Pane
  - Added `overflow-y:scroll` to pane wrapper to ensure scrollability

  #### Checkbox

  - Fixed an issue when state of `indeterminate` is set, the checkbox doesn't allow to switch to unchecked or checked

  #### Input

  - Removed unusued properties
  - Removed `not-allowed` on disabled input

  #### Textarea

  - Removed `not-allowed` on disabled input

  #### Switch

  - Removed hardcoded 'value' from Switch
  - Fixed `label-position` so that it accurately reflects position the label is moved too
  - Removed `justify-content: center` and added `align` property with options `start | center | end`
  - Added new property `show-value` to enable value visiblity

  #### Tooltip

  - Set slot to `display: inline` to allow for better styling

## 1.0.0-beta.3

### Patch Changes

- @studs/ui

  Floating Elements

  -Added new property strategy

  Tooltip

  - Switched position to fixed - Switched floating element stategy to fixed - Adjust styles to use width: fit-content and width: -moz-fit-content

  Slider

  - Changed event dispatch to only return value if slider is not a range

  Radio Group

  - Resolved an issue where radio group was causing customElements.define errors in @studs/react

  @studs/react

  - Removed all dependencies
  - Resolved an issue where @studs/react needed to be bundled further within a node 12 environment

- Updated dependencies
  - @studs/styles@1.0.0-beta.3

## 1.0.0-beta.2

### Patch Changes

- - Removed `src` folder for distributed package

  ### @studs/ui

  - Added a new component `studs-checkbox-group`
  - Added further instructions on studs documentation for installation
  - Added changelog to studs documenation
  - Added a new component `studs-toggle-button`
  - Added a new component `studs-toggle-button-group`
  - Optimization of mixins

  Floating Elements

  - Removed redundant autoUpdate calls for popper to resolve Dropdown performance issue
  - Added `focusout` even that, when the floating element is shown via toggleor click, will allow for the floating element to close on click out.
  - Added close on `esc` keyboard click

  Dropdown

  - Removed `position:relative` from wrapper
  - Enabled keyboard functionality for dropdown navigation
  - Added a `value` prop to internally used `studs-checkboxes` for `type="multi"` dropdowns

  Radio Group

  - Enabled keyboard functionality for Radio Group navigation

  Radio

  - Moved Radio from Light DOM to Shadow DOM
  - Removed duplicate onChange events from firing

  Button Group

  - Removed individual listeners on `studs-buttons` and added an event to `studs-button-group`
  - Removed ability for `selected` state
  - Added `role='group'` children parent

  Slider

  - Fixed slider issue when a parent element had `text-align:center`

  Input

  - Removed properties `adornment`, `adornmentType`, and `adornmentPosition`
  - Added property `adornments` which takes an object of adornments with support for type, and position
  - Added the ability to set the input state to `infinite` via the `infinite` property

  Button

  - Added Full Width Property
  - Restyled `studs-button` with `type="image"` to better match design
  - Added code to ensure disabled state does not allow for interaction

  Grid

  - Improved performance of column resizing
  - Added row selection
  - Moved the table header filters to a popover that show on button click

  ### @studs/react

  - Downgraded react to 17.0.2
  - Set `react` and `react-dom` as peer dependencies
  - Implemented better React types

- Updated dependencies
  - @studs/styles@1.0.0-beta.2

## 1.0.0-beta.1

### Patch Changes

- Migrate Alpha to Beta
- Updated dependencies
  - @studs/styles@1.0.0-beta.2

## 1.0.0-alpha.1

### Patch Changes

- Upgade build setup and target browsers down to es2015
- Updated dependencies
  - @studs/styles@1.0.0-alpha.1

## 1.0.0-alpha.0

### Major Changes

- 06a65218: Alpha Release

### Patch Changes

- Updated dependencies [06a65218]
  - @studs/styles@1.0.0-alpha.0

## 0.1.7

### Patch Changes

- Resolve Sass issue + Link Packages

## 0.1.6

### Patch Changes

- 679503b2: Additional Styles and Component Cleanup

## 0.1.5

### Patch Changes

- Implementation of React Library and additional components
- Updated dependencies
  - @studs/styles@0.1.4

## 0.1.5

### Patch Changes

- Continued Testing
- Updated dependencies
  - @studs/styles@0.1.3

## 0.1.4

### Patch Changes

- Bundle Styles into UI
- Updated dependencies
  - @studs/styles@0.1.3

## 0.1.3

### Patch Changes

- Updated dependencies
  - @studs/styles@0.1.3

## 0.1.2

### Patch Changes

- Updated dependencies
  - @studs/styles@0.1.2

## 0.1.1

### Patch Changes

- 968450c3: Initial Commit of @studs packages, includes the latest changes for component refinements, updates for the documents sites and tests to ensure smooth usage of @studs/ui, @studs/react and @studs/styles for use by multible teams.
- Updated dependencies [968450c3]
  - @studs/styles@0.1.1

## 0.1.0

### Minor Changes

- c51ea4da: Version Changeset 1 Test

### Patch Changes

- Updated dependencies [c51ea4da]
  - @studs/styles@0.1.0
