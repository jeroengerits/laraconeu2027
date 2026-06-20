# Radix Primitives Reference

Canonical cross-skill reference for selecting and composing Radix primitives in this repository.

## Table of Contents

- [Source And Freshness](#source-and-freshness)
- [Repository Import Conventions](#repository-import-conventions)
- [Primitive Catalog](#primitive-catalog)
  - [Forms And Input](#forms-and-input)
  - [Overlay And Dialog](#overlay-and-dialog)
  - [Navigation](#navigation)
  - [Layout And Disclosure](#layout-and-disclosure)
  - [Feedback And Status](#feedback-and-status)
  - [Collections And Data Display](#collections-and-data-display)
  - [Advanced Utilities](#advanced-utilities)
- [Choosing The Correct Primitive](#choosing-the-correct-primitive)
- [Radix-First Component Design](#radix-first-component-design)
- [Component Creation Workflow](#component-creation-workflow)
- [Keeping Radix Reference Current](#keeping-radix-reference-current)

## Source And Freshness

- Official docs checked:
  - [Introduction](https://www.radix-ui.com/primitives/docs/overview/introduction)
  - [Components index](https://www.radix-ui.com/primitives/docs/components)
  - Utility docs: `accessible-icon`, `direction-provider`, `portal`, `slot`, `visually-hidden`
  - [Releases](https://www.radix-ui.com/primitives/docs/overview/releases)
- Documentation snapshot date used for this reference: **2026-06-20**.
- Latest release visible at the time of writing: **June 6, 2026**.

## Repository Import Conventions

This project installs Radix using the unified `radix-ui` package and icons via `@radix-ui/react-icons` (verified from `package.json`).

```tsx
import { Dialog, DropdownMenu, Tooltip } from "radix-ui";
import { Cross1Icon, CheckIcon } from "@radix-ui/react-icons";
```

Use this import style in examples unless a task specifically requires a different package strategy.

## Primitive Catalog

### Forms And Input

#### Checkbox

- Purpose: Binary or tri-state selection for independent options.
- Typical use cases: Preference toggles, filter lists, agreement checkboxes.
- Accessibility benefits: Correct checkbox roles/states, keyboard toggle behavior, form participation.
- Common composition patterns: `Label + Checkbox`; checkbox groups in forms; checkbox inside menus/toolbars.
- Related primitives: `Form`, `Label`, `Switch`, `Toggle`, `Toggle Group`.
- When to use: Multiple non-mutually-exclusive choices.
- When NOT to use: Immediate system setting toggles (`Switch`) or single-select options (`Radio Group`).
- Example UI patterns: "Email me updates" checkbox, facet filters, bulk-select rows.

#### Radio Group

- Purpose: Single selection among mutually exclusive options.
- Typical use cases: Payment type, plan tier, sort mode.
- Accessibility benefits: Arrow-key navigation and single-selection semantics.
- Common composition patterns: `Label + Radio Group`; list cards mapped to radio items.
- Related primitives: `Checkbox`, `Select`, `Form`, `Label`.
- When to use: User must pick exactly one option.
- When NOT to use: Multi-select choices (`Checkbox`) or compact closed selector (`Select`).
- Example UI patterns: Shipping method, theme mode (light/dark/system), one default option.

#### Select

- Purpose: Closed trigger that opens an option list.
- Typical use cases: Country selection, assignee picker, enum fields.
- Accessibility benefits: Focus management, listbox-like keyboard interactions, value announcement.
- Common composition patterns: Trigger + Value + Content + Item; grouped options and separators.
- Related primitives: `Label`, `Form`, `Dropdown Menu`, `Combobox`-style custom patterns.
- When to use: Medium/large option lists with a compact trigger.
- When NOT to use: Always-visible segmented options (`Radio Group`) or free-text searchable input (custom combobox pattern).
- Example UI patterns: Language selector, project status selector.

#### Slider

- Purpose: Select numeric value/range by dragging one or more thumbs.
- Typical use cases: Volume, brightness, price range, timeline scrub.
- Accessibility benefits: Keyboard-adjustable value controls with semantic range metadata.
- Common composition patterns: Slider + numeric readout; dual-thumb range filters.
- Related primitives: `Label`, `Progress`, `Form`.
- When to use: Continuous/semi-continuous numeric input.
- When NOT to use: Exact typed values where direct text input is superior.
- Example UI patterns: Price filter with min/max, audio scrubber.

#### Switch

- Purpose: On/off state control representing an immediate boolean setting.
- Typical use cases: Enable notifications, dark mode, privacy toggle.
- Accessibility benefits: Switch semantics, checked state announcements, keyboard operation.
- Common composition patterns: `Label + Switch`; settings rows with helper text.
- Related primitives: `Checkbox`, `Toggle`, `Form`, `Label`.
- When to use: Immediate setting/state change.
- When NOT to use: Form checkbox agreements or multi-select lists.
- Example UI patterns: "Enable auto-save", "Public profile".

#### Toggle

- Purpose: Two-state pressable button.
- Typical use cases: Bold/italic formatting, pin/unpin state.
- Accessibility benefits: Pressed state semantics and keyboard activation.
- Common composition patterns: Standalone icon buttons; included in toolbars.
- Related primitives: `Toggle Group`, `Toolbar`, `Switch`.
- When to use: Button-like on/off actions in command surfaces.
- When NOT to use: Form field semantics where `Checkbox`/`Switch` better matches meaning.
- Example UI patterns: Rich text formatting controls.

#### Toggle Group

- Purpose: Collection of toggles in single or multiple selection mode.
- Typical use cases: Text alignment, multi-filter chips, view-mode selection.
- Accessibility benefits: Group semantics plus roving focus behavior.
- Common composition patterns: Icon toggle bars; segmented controls.
- Related primitives: `Toggle`, `Toolbar`, `Tabs`, `Radio Group`.
- When to use: Compact grouped toggle choices.
- When NOT to use: Full tabbed content regions (`Tabs`) or long option lists (`Select`).
- Example UI patterns: Grid/list view selector, left/center/right alignment.

#### Label

- Purpose: Accessible label association for controls.
- Typical use cases: Form field labels, checkbox/switch labels.
- Accessibility benefits: Click target expansion and explicit control naming.
- Common composition patterns: `Label + input`, `Label + Checkbox`, `Label + Switch`.
- Related primitives: `Form`, all form controls.
- When to use: Any input that needs clear visible/accessible naming.
- When NOT to use: Standalone static text not tied to a control.
- Example UI patterns: Settings labels, form rows.

#### Form

- Purpose: Form primitives with validation message wiring and state.
- Typical use cases: Account forms, checkout forms, profile editors.
- Accessibility benefits: Validation/error association patterns and field messaging semantics.
- Common composition patterns: Field wrappers with `Label`, control, and message.
- Related primitives: `Label`, `Checkbox`, `Radio Group`, `Select`, `Switch`, `One-Time Password Field`, `Password Toggle Field`.
- When to use: Structured form workflows that need built-in validation plumbing.
- When NOT to use: Tiny one-off forms where plain semantic HTML is simpler and sufficient.
- Example UI patterns: Signup form, profile form with inline errors.

#### One-Time Password Field

- Purpose: Multi-cell one-time code entry with coordinated behavior.
- Typical use cases: 2FA verification, password reset confirmation, email verification code.
- Accessibility benefits: Correctly managed input focus, paste behavior, and single logical value handling.
- Common composition patterns: OTP cells + resend action + submit.
- Related primitives: `Form`, `Label`, `Password Toggle Field`.
- When to use: Security code entry split across multiple visual cells.
- When NOT to use: Standard single-field verification codes where segmentation is unnecessary.
- Example UI patterns: "Enter 6-digit code" screen.

#### Password Toggle Field

- Purpose: Password input paired with visibility toggle behavior.
- Typical use cases: Login/register password fields, change-password forms.
- Accessibility benefits: Accessible toggle semantics and focus-preserving interactions.
- Common composition patterns: Password field with icon button toggle and validation text.
- Related primitives: `Form`, `Label`, `One-Time Password Field`.
- When to use: Password entry where reveal/hide improves usability.
- When NOT to use: Non-sensitive fields or custom designs that do not need reveal behavior.
- Example UI patterns: Login form password field with eye icon.

### Overlay And Dialog

#### Dialog

- Purpose: Modal/non-modal layered window for workflows and rich content.
- Typical use cases: Create/edit flows, settings modal, onboarding step modals.
- Accessibility benefits: Focus trapping, inert background handling, keyboard close behavior.
- Common composition patterns: Trigger + Portal + Overlay + Content + Title + Description + Close.
- Related primitives: `Alert Dialog`, `Popover`, `Tooltip`, `Portal`.
- When to use: Multi-step or substantial interaction requiring dedicated layer.
- When NOT to use: Simple confirmations (`Alert Dialog`) or tiny contextual hints (`Tooltip`).
- Example UI patterns: "Create project" modal, profile edit modal.

#### Alert Dialog

- Purpose: Disruptive confirmation dialog for critical actions.
- Typical use cases: Delete confirmations, destructive irreversible decisions.
- Accessibility benefits: Modal semantics with clear action/cancel affordances and focus safety.
- Common composition patterns: Title + Description + Cancel + Action.
- Related primitives: `Dialog`, `Popover`.
- When to use: Destructive, high-risk, or blocking confirmations.
- When NOT to use: Non-critical details or casual user notifications.
- Example UI patterns: "Delete repository?" confirm modal.

#### Popover

- Purpose: Anchored floating panel with richer content than tooltip.
- Typical use cases: Filter panel, quick-edit card, inline settings popout.
- Accessibility benefits: Focus management and dismissal behavior for contextual layers.
- Common composition patterns: Trigger + Portal + Content + Arrow + Close.
- Related primitives: `Hover Card`, `Tooltip`, `Dropdown Menu`, `Dialog`.
- When to use: Contextual panel requiring form fields or richer interactions.
- When NOT to use: Full-screen workflows (`Dialog`) or action menu lists (`Dropdown Menu`).
- Example UI patterns: Date filter popover, "more info" mini panel.

#### Hover Card

- Purpose: Hover/focus preview surface for linked entities.
- Typical use cases: User profile preview, card preview from a link, quick metadata preview.
- Accessibility benefits: Focus-triggered fallback behavior and controlled open delays.
- Common composition patterns: Trigger around link/text + content preview card.
- Related primitives: `Tooltip`, `Popover`, `Avatar`.
- When to use: Rich previews for sighted hover/focus interactions.
- When NOT to use: Primary interactive forms, critical content required for task completion.
- Example UI patterns: Hovering username to preview profile summary.

#### Tooltip

- Purpose: Brief contextual text for an element.
- Typical use cases: Icon-only button labels, shortcut hints.
- Accessibility benefits: Focus and hover support with timing control.
- Common composition patterns: Provider + Trigger + Content + Arrow.
- Related primitives: `Hover Card`, `Popover`, `Accessible Icon`.
- When to use: Concise helper text that supplements visible UI.
- When NOT to use: Essential instructions or rich interactive content.
- Example UI patterns: "Delete", "Open settings", "Cmd+K" hint.

### Navigation

#### Navigation Menu

- Purpose: Structured navigation surface for site/app sections.
- Typical use cases: Header mega-menu, grouped nav links, product nav.
- Accessibility benefits: Keyboard navigation and menu relationships tuned for nav use.
- Common composition patterns: Root + List + Item + Trigger + Content + Link.
- Related primitives: `Menubar`, `Dropdown Menu`, `Tabs`.
- When to use: Complex multi-level navigation clusters.
- When NOT to use: Simple horizontal link lists that do not require dropdown behavior.
- Example UI patterns: Top-nav products/resources/company menu.

#### Menubar

- Purpose: Persistent desktop-style command bar.
- Typical use cases: App-level command menus (File/Edit/View), editor command strips.
- Accessibility benefits: Roving focus and submenu keyboard behavior.
- Common composition patterns: Menubar + nested menu items/submenus/check/radio items.
- Related primitives: `Dropdown Menu`, `Context Menu`, `Toolbar`.
- When to use: Always-visible command menu systems.
- When NOT to use: Single trigger action menus (`Dropdown Menu`).
- Example UI patterns: Rich editor command bar.

#### Context Menu

- Purpose: Pointer/long-press contextual action menu.
- Typical use cases: File row right-click actions, canvas context actions.
- Accessibility benefits: Menu semantics and keyboard-compatible item behavior.
- Common composition patterns: Context trigger region + content + grouped items/submenus.
- Related primitives: `Dropdown Menu`, `Menubar`.
- When to use: Actions tied to an object under cursor/long-press.
- When NOT to use: Primary navigation or discoverability-critical actions only accessible on right click.
- Example UI patterns: Right-click file "Rename / Move / Delete".

#### Dropdown Menu

- Purpose: Triggered action list menu.
- Typical use cases: Kebab menu actions, account menu, row actions.
- Accessibility benefits: Menu roles, keyboard navigation, focus return.
- Common composition patterns: Trigger + Content + Item + Separator + Sub menus.
- Related primitives: `Context Menu`, `Menubar`, `Popover`.
- When to use: Compact action sets associated with one trigger.
- When NOT to use: Multi-step forms or long complex content panels (`Popover`/`Dialog`).
- Example UI patterns: Row actions, profile menu.

#### Tabs

- Purpose: Switch between layered content sections.
- Typical use cases: Settings categories, dashboard views, panel switching.
- Accessibility benefits: Tablist semantics, arrow-key movement, active panel associations.
- Common composition patterns: Root + List + Trigger + Content.
- Related primitives: `Toggle Group`, `Navigation Menu`.
- When to use: Distinct content sections where one panel is visible at a time.
- When NOT to use: Independent navigation routes requiring URL-level navigation (use route-based nav).
- Example UI patterns: Profile tabs: Account / Billing / Security.

#### Toolbar

- Purpose: Container for grouped controls and command clusters.
- Typical use cases: Editor command bars, media controls, annotation tools.
- Accessibility benefits: Roving tabindex and orientation-aware keyboard movement.
- Common composition patterns: Root + Button/Link/ToggleGroup + Separator.
- Related primitives: `Toggle Group`, `Dropdown Menu`, `Menubar`, `Separator`.
- When to use: High-density control rows requiring keyboard-friendly command access.
- When NOT to use: Semantic forms or content-only layout groups.
- Example UI patterns: Text editor toolbar, drawing tools toolbar.

### Layout And Disclosure

#### Accordion

- Purpose: Expand/collapse multiple sections in-place.
- Typical use cases: FAQ, settings groups, disclosure lists.
- Accessibility benefits: Heading/button/region relationships and keyboard semantics.
- Common composition patterns: Root + Item + Header + Trigger + Content.
- Related primitives: `Collapsible`, `Tabs`.
- When to use: Vertically stacked sections requiring progressive disclosure.
- When NOT to use: Single boolean show/hide area (`Collapsible`) or tabbed peer sections (`Tabs`).
- Example UI patterns: FAQ list, advanced settings sections.

#### Collapsible

- Purpose: Toggle a single region open/closed.
- Typical use cases: Expand details row, side panel collapse.
- Accessibility benefits: Proper control relationship and state announcement.
- Common composition patterns: Root + Trigger + Content.
- Related primitives: `Accordion`.
- When to use: Single disclosure block.
- When NOT to use: Multi-item disclosure lists (use `Accordion`).
- Example UI patterns: "Show details" in data rows.

#### Scroll Area

- Purpose: Styled scroll container preserving native scroll behavior.
- Typical use cases: Custom scrollbar regions, code panes, chat sidebars.
- Accessibility benefits: Native scroll semantics retained while allowing custom visuals.
- Common composition patterns: Root + Viewport + Scrollbar + Thumb + Corner.
- Related primitives: `Separator`.
- When to use: Controlled scrolling region with custom scrollbar appearance.
- When NOT to use: Page-level scrolling that should remain browser default.
- Example UI patterns: Chat history pane with custom scrollbar.

#### Separator

- Purpose: Visual/semantic separator line between content groups.
- Typical use cases: Menu section breaks, toolbar dividers, form section boundaries.
- Accessibility benefits: Optional semantic separation role and orientation metadata.
- Common composition patterns: Horizontal/vertical separators in menus and toolbars.
- Related primitives: `Toolbar`, `Dropdown Menu`, `Menubar`.
- When to use: Distinguish grouped content/actions.
- When NOT to use: Pure spacing concerns where margin/padding is enough.
- Example UI patterns: Divider between primary and destructive actions.

#### Aspect Ratio

- Purpose: Preserve fixed ratio for media/container content.
- Typical use cases: Video thumbnails, image cards, embeds.
- Accessibility benefits: Predictable layout avoids content shift during load.
- Common composition patterns: Aspect wrapper + image/video/media child.
- Related primitives: `Avatar`, `Scroll Area`.
- When to use: Ratio-constrained media blocks.
- When NOT to use: Content that should define natural size or variable height text blocks.
- Example UI patterns: 16:9 media cards, square profile photo tiles.

### Feedback And Status

#### Progress

- Purpose: Visual indicator of task completion progress.
- Typical use cases: Upload progress, setup completion, onboarding steps.
- Accessibility benefits: Progress semantics with value state communication.
- Common composition patterns: Track + indicator + optional textual percent.
- Related primitives: `Toast`, `Slider`.
- When to use: Determinate/indeterminate progress reporting.
- When NOT to use: Ephemeral notifications without completion concept.
- Example UI patterns: File upload percentage bar.

#### Toast

- Purpose: Temporary non-blocking status message.
- Typical use cases: Save success, background task updates, undo prompts.
- Accessibility benefits: Announcement region support and keyboard-friendly action patterns.
- Common composition patterns: Provider + Viewport + Toast + Action/Close.
- Related primitives: `Alert Dialog`, `Dialog`, `Progress`.
- When to use: Brief non-modal feedback not requiring full interruption.
- When NOT to use: Critical/blocking errors requiring explicit acknowledgment.
- Example UI patterns: "Changes saved" with Undo action.

### Collections And Data Display

#### Avatar

- Purpose: User/entity image with fallback handling.
- Typical use cases: Profile chips, assignee lists, comment threads.
- Accessibility benefits: Predictable image fallback behavior and non-breaking alt treatment.
- Common composition patterns: Root + Image + Fallback; optional status badges layered externally.
- Related primitives: `Hover Card`, `Tooltip`.
- When to use: Represent people/entities compactly.
- When NOT to use: Content images where `img` alone is enough and no fallback handling is needed.
- Example UI patterns: User circles in nav/header/comments.

### Advanced Utilities

#### Portal

- Purpose: Render subtree outside normal DOM hierarchy.
- Typical use cases: Overlays, floating layers, escaping overflow/stacking contexts.
- Accessibility benefits: Supports layering patterns used by accessible dialogs/popovers.
- Common composition patterns: Dialog/Popover/Tooltip content portaled to `body`.
- Related primitives: `Dialog`, `Popover`, `Tooltip`, `Dropdown Menu`.
- When to use: Floating/layered UI that must escape container clipping.
- When NOT to use: Content that belongs in normal document flow.
- Example UI patterns: Modal content mounted under `document.body`.

#### Slot

- Purpose: Merge props/events onto immediate child (custom `asChild` APIs).
- Typical use cases: Polymorphic buttons/links, composable wrappers.
- Accessibility benefits: Preserves semantics of chosen child element while inheriting behavior.
- Common composition patterns: `asChild ? Slot.Root : "button"`; `Slottable` for multi-child wrappers.
- Related primitives: `Dialog` (and all primitives with `asChild`), `Portal`.
- When to use: Build flexible polymorphic component APIs with predictable prop passing.
- When NOT to use: Simple fixed-element components where polymorphism adds complexity.
- Example UI patterns: Button rendered as `a`, `Link`, or custom component.

#### Direction Provider

- Purpose: Global reading direction (`ltr`/`rtl`) provider for primitives.
- Typical use cases: Localized apps supporting right-to-left languages.
- Accessibility benefits: Correct directional keyboard/focus behavior in RTL contexts.
- Common composition patterns: Wrap app/layout root with `Direction.Provider`.
- Related primitives: `Navigation Menu`, `Menubar`, `Tabs`, all directional overlays.
- When to use: App needs global RTL/LTR support.
- When NOT to use: Single-language LTR-only apps with no RTL requirement.
- Example UI patterns: Arabic/Hebrew localized interfaces.

#### Visually Hidden

- Purpose: Hide content visually while keeping it available to assistive tech.
- Typical use cases: Icon button labels, hidden helper text for screen readers.
- Accessibility benefits: Adds accessible names/descriptions without visual clutter.
- Common composition patterns: Wrap hidden label text inside icon-only controls.
- Related primitives: `Accessible Icon`, `Tooltip`.
- When to use: Hidden semantic labels are needed for non-text UI.
- When NOT to use: Hiding meaningful visible text from users as a layout shortcut.
- Example UI patterns: Icon-only close button with hidden "Close dialog" text.

#### Accessible Icon

- Purpose: Provide explicit accessible label for icons.
- Typical use cases: Icon-only buttons and status icons.
- Accessibility benefits: Guarantees meaningful spoken label for icons.
- Common composition patterns: `AccessibleIcon.Root label="..."` wrapping icon component.
- Related primitives: `Visually Hidden`, `Tooltip`.
- When to use: Icon meaning is not otherwise exposed through visible text.
- When NOT to use: Decorative icons that should be hidden from assistive tech.
- Example UI patterns: Trash icon labeled "Delete", gear icon labeled "Settings".

## Choosing The Correct Primitive

| Requirement | Recommended Primitive |
| --- | --- |
| Open modal workflow | `Dialog` |
| Confirm destructive action | `Alert Dialog` |
| Additional contextual actions from a trigger | `Dropdown Menu` |
| Right-click or long-press context actions | `Context Menu` |
| Complex site/app navigation with nested panels | `Navigation Menu` |
| Persistent command bar (desktop-like menus) | `Menubar` |
| Grouped controls in an editor command strip | `Toolbar` |
| Small contextual info text | `Tooltip` |
| Rich hover/focus preview card | `Hover Card` |
| Expand/collapse multiple content sections | `Accordion` |
| Expand/collapse one content section | `Collapsible` |
| Toggle immediate on/off state | `Switch` |
| Toggle button-style pressed state | `Toggle` |
| Single option selection in visible group | `Radio Group` |
| Multiple option selection | `Checkbox` |
| Compact one-of-many selector | `Select` |
| Numeric range/value adjustment | `Slider` |
| Structured form validation and field messaging | `Form` |
| OTP verification input | `One-Time Password Field` |
| Password visibility toggle field | `Password Toggle Field` |
| Temporary non-blocking feedback | `Toast` |
| Task completion indicator | `Progress` |
| Visually hidden semantic label text | `Visually Hidden` |
| Polymorphic `asChild` API in custom components | `Slot` |

## Radix-First Component Design

1. Always evaluate whether a Radix primitive already solves the interaction before custom logic.
2. Prefer composing primitives over custom interaction logic.
3. Use Radix accessibility behavior before writing custom keyboard or focus management.
4. Follow Radix composition patterns (`Root`, `Trigger`, `Content`, etc.) unless the use case proves otherwise.
5. Prefer primitive-based architecture for reusable interactive components.
6. Separate **Behavior**, **Accessibility**, and **Presentation** concerns.
7. Keep primitives unstyled; layer visual styles separately.
8. Use Tailwind only for visual presentation, spacing, and state styling.
9. Prefer uncontrolled APIs first; switch to controlled APIs only when integration requires it.
10. Use `asChild` where composition/polymorphism is required, not by default everywhere.

## Component Creation Workflow

```mermaid
flowchart LR
    A[Component Request] --> B[Analyse Requirements]
    B --> C[Consult RADIX-PRIMITIVES.md]
    C --> D[Select Appropriate Primitive(s)]
    D --> E[Design Component API]
    E --> F[Design Accessibility Behaviour]
    F --> G[Design Composition Structure]
    G --> H[Implement Component]
    H --> I[Implement Animations]
    I --> J[Implement Styling]
    J --> K[Write Behaviour Tests]
    K --> L[Review Against Radix Patterns]
```

## Keeping Radix Reference Current

- When Radix adds or graduates primitives, update this file first (canonical source).
- Update affected component skills to include new primitive-selection guidance.
- Update architecture recommendations so routing and ownership remain accurate.
- Review existing reusable components for places where new primitives improve accessibility or reduce custom interaction code.
- Keep import guidance aligned with project dependencies (`radix-ui` and `@radix-ui/react-icons`).
