# Studs UI

[![NPM](https://img.shields.io/npm/l/@studs/ui)]()
[![GitHub contributors](https://img.shields.io/github/contributors/studs-ui/studs)]()
[![npm](https://img.shields.io/npm/v/@studs/ui)]()
[![npm](https://img.shields.io/npm/dm/@studs/ui)]()

## Links
- [Documentation](https://studs.strongtie.com)
- [Storybook](https://studs.strongtie.com/storybook)
- [Playroom](https://studs.strongtie.com/playroom)
- [Paka](https://paka.dev/npm/@studs/ui@1.0.0-beta.8/api)
- [Give Feedback]()

## Packages
- `@studs/ui` - Collection of 50+ Web Components
- `@studs/react` - React Version of @studs/ui
- `@studs/styles` - Style library required for use in @studs/ui and @studs/react

## Contributers
<a href="https://github.com/studs-ui/studs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=studs-ui/studs" />
</a>

## Developer Documentation

## Install Requirements
1. If you don't already have PNPM installed, install it via npm `npm i pnpm -g`
2. Install turbo globally `npm i turbo -g` or `pnpm i turbo -g`
   1. If you get an error that pnpm isn't setup yet, run `pnpm setup` and follow the instructions

## Setup

1. Run `pnpm` to install contents
2. Run `pnpm build` to install dependencies

If you are installing new dependencies and receive an error run `pnpm clean` then return to step 1.

## Usage

### Run Packages (React, Styles, UI)

`pnpm dev`

### Run Test Environments

`pnpm dev:tests`

### Run Docs Environment

`pnpm dev:docs`

### Build Packages (React, Styles, UI) & Docs

`pnpm build` or for React alone `pnpm build:react`

### Build Tests Environments

`pnpm build:tests`

### Build Docs

`pnpm build:docs`

### Run Tests

#### Tests CLI
`pnpm test`

#### Tests UI
`pnpm test:ui`

#### Tests Coverage
`pnpm coverage`

## Publish Changes

To stage and publish changes
1. Create a new branch called `release/[major].[minor].[patch]` eg. `1.0.3`
2. Run `pnpm version-library`
3. Provide a detailed changelog in the editor, or save the change and move to the new file generated in .changesets and add the changelog to that file. Review [Changelog](https://studs.strongtie.com/getting-started/Changelog) for past logs.
4. Commit Changes to Branch
5. Run `pnpm publish-packages`. At this point, the packages should be live on npmjs.org. Verify at [@studs/ui](https://www.npmjs.com/package/@studs/ui)
7. Change `version.current` in `docusaurus.config.js` to the incoming version `eg. if version is 1.0.0, version 1.0.1`;
8. Commit Changes to Branch
9. Create a PR to merge into Dev of latest release

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#how-to-document-your-components-using-jsdoc)

## How to document components using JSDoc

In addition to analyzing the code of your components, this library also use JSDoc to construct the documentation. It's especially a good idea to use JSDoc for documenting `slots`, `events`, `css custom properties` and `css shadow parts` as these not analyzed statically by this tool as of now (except when constructing a CustomEvent within your component).

Here's an example including all supported JSDoc tags. All JSDoc tags are on the the form `@tag {type} name - comment` and `@tag {type} [name=default] - comment`.

Properties, States, Methods and Events do not need to be documented if they are typed correctly in the component.

<!-- prettier-ignore -->
```javascript
/**
 * Here is a description of my web component.
 * 
 * @element my-element
 * 
 * @slot - This is an unnamed slot (the default slot)
 * @slot start - This is a slot named "start".
 * @slot end
 * 
 * @cssprop --main-bg-color - This jsdoc tag can be used to document css custom properties.
 * @cssprop [--main-color=red]

 * @csspart container 
 */
class MyElement extends LitElement {
  /**
   * WCA will automatically fill type as 'outlined' | 'solid' with a default of 
   * 'outlined'
   */
  @property({type: String}) type: 'outlined' | 'solid' = 'outlined'

  /**
   * This is a description of a property with an attribute called "my-prop".
   * @type {number}
   * @deprecated
   * @attr my-prop
   */
  @property({type: String}) nolongerused!: string;

}
```

### Overview of supported JSDoc tags

<!-- prettier-ignore -->
| JSDoc Tag                    | Description                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `@element`                   | Gives your component a tag name. This JSDoc tag is useful if your 'customElements.define` is called dynamically eg. using a custom function. |
| `@fires`                     | Documents events.                                                                                                                            |
| `@slot`                      | Documents slots. Using an empty name here documents the unnamed (default) slot.                                                              |
| `@attr` or `@attribute`      | Documents an attribute on your component.                                                                                                    |
| `@prop` or `@property`       | Documents a property on your component.                                                                                                      |
| `@cssprop` or `@cssproperty` | Documents a css custom property on your component.                                                                                           |
| `@csspart`                   | Documents a css shadow part on your component.                                                                                               |

## Components

STUDS Components are single-filed within `/packages/ui/src/components`

#### Component Template Structure

```
import { createComponent } from "@lit-labs/react";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("studs-component")
export class StudsComponent extends StudsElement(LitElement) {
    render() {
        // Element goes here within the HTML tag
        return html`<div>EXAMPLE</div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'studs-component': StudsComponent;
    }
}
```

## Component Properties

- `?` - after the name, means its optional
- `!` - after the name, means a value will be assigned

#### Define Properties

Properties are reactive _attributes_ that can be updated from the component level.

```
@property() name: type = "defaultValue"
@property() name?: type;
@property() name!: type;
```

#### Define States

States are properties that are internal to the component and not able to be accessed outside of the component.
Adding an underscore ensures better readability of what is a state or property.

```
@state() private _name: string = ''
@state() private _name?: string;
@state() private name!: string
```

See [Reactive Properties](https://lit.dev/docs/components/properties/) for more.

#### Access Properties/State

Call the property using `this.property`.

```
${this.icon}
```

#### Using Interpolation

Everything outside of an html``block can be used normally, ei.`this.icon`; If you are using dynamic content within an html block you must _escape_ it using interpolation.

```
html`<div>${this.children}</div>`

or

render() {
    const children = this.children;
    return html`<div>${children}</div>`
}

or

render() {
    const {children} = this;
    return html`<div>${children}</div>`
}
```

#### Effectively using Class

Lit exposes a decorator called `classMap` which allows for easy boolean based implemtation.
Now we can define classes as an object and then use classMap to add it to our elements. Add it as inline classes for better readability and determination of what element those classes are being added to.

```
render() {
    return html`<div class="${classMap({
        base: true,
        <!-- Returns class if true -->
        [`-${this.size}`]: this.size,
        <!-- Returns property class if true -->
        [this.property]: this.property
    })}">Example</div>`
    or 
    return html`<div class=${classMap({
        class: true
    })}></div>`
}
```

### Generating a React Component

Lit has a native function to generate React Components from `@lit/react` called `createComponent`

- Open `packages/react/components/componentName.tsx`
- Import your component, eg. `StudsChip`
- Append the new element to the list of elements

```
const StudsChipComponent = createComponent({
  tagName: "studs-chip",
  elementClass: StudsChip,
  <!-- Ensure you add React -->
  react: React,
  <!-- Add Events that the React component needs to provide functionality for  -->
  events: {
    onclick: "click",
    onactivate: "activate",
    customevent: "customevent"
  },
})
```

### Adding Component to the List of Global Components

- Open `src/index.ts`
- Export the named export

```
export {StudsChip} from "..."
```


### Adding NPM Packages to apps/packages
`pnpm add <package> --filter <package-name>`

Example
`pnpm add @11ty/eleventy --save-dev --filter @studs/docs`
