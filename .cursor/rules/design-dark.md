# Design System Specification: The Nocturnal Atrium

## 1. Overview & Creative North Star
**Creative North Star: "The Obsidian Conservatory"**
This design system moves away from the flat, clinical nature of standard dark modes. Instead, it treats the interface as a high-end architectural space—a "Digital Atrium" at midnight. The goal is to create a sense of vast, quiet luxury through expansive negative space, intentional asymmetry, and the elimination of traditional UI "fences" (borders).

By leveraging deep slate-inspired foundations and vibrant emerald accents, we evoke the feeling of bioluminescent life within a dark, structured environment. We break the "template" look by using exaggerated typography scales and "floating" content blocks that rely on light and depth rather than lines to define their existence.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a midnight navy-slate (`#0b1326`), providing a more sophisticated, "inkier" depth than pure black or neutral grey.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Boundaries must be defined solely through background color shifts or subtle tonal transitions.
* **Surface:** `#0b1326` (The base floor)
* **Surface-Container-Low:** `#131b2e` (Secondary grounding)
* **Surface-Container-High:** `#222a3d` (Elevated interaction zones)

### The Glass & Gradient Rule
To provide "visual soul," use the **Emerald Gradient** for primary actions and hero moments:
* **Signature Gradient:** Linear 135° from `primary` (`#68dba9`) to `primary_container` (`#25a475`).
* **Glassmorphism:** For floating navigation or modal overlays, use `surface_container_highest` (`#2d3449`) at 60% opacity with a `24px` backdrop-blur. This creates a "frosted obsidian" effect that feels integrated into the environment.

---

## 3. Typography: Editorial Authority
We utilize **Plus Jakarta Sans** not as a utility font, but as a brand voice. The hierarchy uses dramatic scale shifts to create a rhythmic, editorial flow.

* **Display (lg/md):** Use for "Hero Statements." Set with tight letter-spacing (`-0.02em`) to feel authoritative.
* **Headline (lg/md):** The primary storyteller. Use these to introduce sections without needing dividers.
* **Body (lg/md):** Set at `body-lg` (`1rem`) for high-readability long-form content. Ensure a generous line-height (1.6) to maintain the "Atrium" spaciousness.
* **Label (sm):** Used sparingly for metadata. Always uppercase with `0.05em` letter-spacing to distinguish from body copy.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are forbidden. We define hierarchy through "The Layering Principle."

* **The Layering Principle:** Depth is achieved by stacking. A `surface_container_lowest` card (`#060e20`) placed on a `surface_container_low` (`#131b2e`) section creates a "recessed" look, while a `surface_container_highest` (`#2d3449`) card creates a "raised" look.
* **Ambient Glow:** When an element must "float" (e.g., a FAB or Popover), use an extra-diffused shadow.
* *Shadow Specs:* `0 24px 48px -12px rgba(0, 0, 0, 0.5)`.
* **The Ghost Border Fallback:** If a container sits on an identical background color, use a `1px` stroke of `outline_variant` (`#3d4a42`) at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Primitives

### Buttons
* **Primary:** Emerald Gradient background, `on_primary` text. No border. `md` (0.375rem) corners.
* **Secondary:** Ghost style. `outline_variant` at 20% opacity for the container, `primary` color for text.
* **Tertiary:** Plain text in `primary` with no container, used for low-emphasis utility.

### Cards & Lists
* **No Dividers:** Use `spacing-6` (2rem) or `spacing-8` (2.75rem) to separate list items.
* **Interactive Cards:** Use `surface_container` as the base. On hover, shift to `surface_container_high` and add a subtle `primary` glow (2px outer blur).

### Input Fields
* **Style:** Minimalist underline or soft-filled. Use `surface_container_highest` as the fill.
* **Focus State:** Transition the bottom border to `primary` (`#68dba9`) and add a 10% emerald tint to the background fill.

### Signage (Additional Component)
* **The "Atrium Breadcrumb":** Oversized, low-opacity `display-sm` text used as a background element to indicate the current section, reinforcing the architectural feel.

---

## 6. Do’s and Don’ts

### Do:
* **Do** use asymmetrical margins (e.g., a wider left gutter) to break the "grid" feel.
* **Do** lean into the `primary_fixed` (`#85f8c4`) for high-contrast small text or icons.
* **Do** use `surface_bright` (`#31394d`) sparingly to highlight the most critical "Read Me" areas.

### Don’t:
* **Don't** use 100% white text. Always use `on_surface` (`#dae2fd`) to prevent eye strain.
* **Don't** use standard `1px` dividers. If a visual break is needed, use a `spacing-px` height box with a subtle gradient fade.
* **Don't** use sharp corners. Stick strictly to the `sm` (2px) for tight elements and `md` (6px) for cards to maintain the "soft nocturnal" aesthetic.

---

## 7. Spacing & Rhythm
The system thrives on **Macro-Spacing**.
* Use `spacing-16` (5.5rem) and `spacing-24` (8.5rem) between major sections to let the content breathe.
* Smaller components (Chips, Labels) should use `spacing-1.5` (0.5rem) to maintain a tight, functional "nucleus."