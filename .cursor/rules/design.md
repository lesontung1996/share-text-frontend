# Design System: The Verdant Minimalist

## 1. Overview & Creative North Star

**Creative North Star: "The Digital Atrium"**
This design system is conceptualized as a "Digital Atrium"—a space of immense clarity, breathing room, and organic vitality. Moving beyond the "generic SaaS" look, we leverage a high-contrast, editorial approach to typography paired with a lush, emerald-focused palette.

The goal is to transform a simple text-sharing and chat utility into a premium, intentional experience. We achieve this by rejecting traditional "box-and-border" layouts in favor of **Tonal Layering**. The interface should feel like high-end stationery: tactile, clean, and physically layered. We use intentional asymmetry in the hero area and high-impact typography scales to guide the user’s eye toward the central creative act: inputting text.

---

## 2. Colors: Depth Through Tone

Our palette moves away from sterile grays into a "warm-neutral" base, punctuated by a deep, authoritative Emerald green.

### Palette Strategy
* **Primary (`#006948`):** Our Forest/Emerald core. Used for critical actions and brand presence.
* **Tonal Surfaces:** We utilize `surface` (`#f7f9fb`) as our primary canvas. To create structure without lines, we use `surface-container-low` (`#f2f4f6`) for secondary sections and `surface-container-highest` (`#e0e3e5`) for active interactive elements.

### The "No-Line" Rule
**Borders are strictly prohibited for sectioning.** To separate the navigation from the body, or the chat input from the message stream, use a background shift. For example, a chat message area using `surface` should sit adjacent to a sidebar or header using `surface-container-low`.

### The "Glass & Gradient" Rule
To add "soul" to the minimalist aesthetic:
* **CTAs:** Use a subtle linear gradient from `primary` (`#006948`) to `primary_container` (`#00855d`) at a 135-degree angle.
* **Floating Navigation:** Apply `backdrop-blur: 12px` to headers using a semi-transparent `surface` color (e.g., `#f7f9fbCC`) to allow content to bleed through softly as the user scrolls.

---

## 3. Typography: Editorial Authority

We use a dual-font system to balance "Modern Tech" with "Premium Editorial."

* **Display & Headlines (Plus Jakarta Sans):** Chosen for its geometric precision and unique apertures.
* *Usage:* `display-lg` (3.5rem) should be used for hero moments with tight letter-spacing (-0.02em).
* **Body & Labels (Inter):** The industry standard for legibility.
* *Usage:* `body-lg` (1rem) for text input and messages to ensure maximum readability during long-form consumption.

**Hierarchy Tip:** Contrast a `display-md` headline in `on_surface` with a `label-md` uppercase sub-header in `on_secondary_container` to create a sophisticated, high-end magazine feel.

---

## 4. Elevation & Depth: The Layering Principle

Shadows and lines are "crutches." This system relies on **Tonal Layering** to convey hierarchy.

* **The Stack:**
1. **Background:** `surface` (Base layer)
2. **Structural Regions:** `surface-container-low` (Subtle inset)
3. **Interactive Cards/Bubbles:** `surface-container-lowest` (The "raised" paper effect)
* **Ambient Shadows:** For floating elements (like a link-share popover), use a highly diffused shadow: `0 20px 40px rgba(0, 105, 72, 0.06)`. Note the use of a primary-tinted shadow instead of gray.
* **The Ghost Border:** If accessibility requires a stroke (e.g., in high-contrast modes), use `outline_variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Text Input Area (The Hero)
The centerpiece of the application.
* **Styling:** No border. Use `surface_container_lowest` for the background.
* **Corner Radius:** `xl` (0.75rem).
* **Focus State:** A soft 2px outer glow using `primary_fixed` at 50% opacity.
* **Padding:** Scale `8` (2.75rem) to provide immense breathing room around the cursor.

### Message Bubbles
* **Outgoing:** `primary` background with `on_primary` text. Use `xl` radius, but `sm` on the bottom-right corner to point toward the sender.
* **Incoming:** `secondary_container` background with `on_secondary_container` text.
* **Spacing:** Use scale `3` (1rem) for internal padding.

### Shared Links (Rich Cards)
* **Container:** `surface_container_low`.
* **Interaction:** On hover, shift to `surface_container_high`. No border transitions.
* **Typography:** Title in `title-sm`, URL in `label-sm` using `on_surface_variant`.

### Buttons
* **Primary:** Gradient (`primary` to `primary_container`). Radius `full`.
* **Secondary:** `secondary_container` with `on_secondary_container` text.
* **Navigation Links:** `label-md` with `on_surface`. On hover, use a `primary` color shift and a subtle 4px green dot below the text rather than an underline.

### Lists & Activity
* **Prohibition:** Never use divider lines.
* **Solution:** Use spacing scale `4` (1.4rem) between items. Use a `surface_container_low` background on every second item if a visual distinction is mandatory.

---

## 6. Do’s and Don’ts

### Do:
* **Do** use extreme whitespace. If a layout feels "full," add one step from the Spacing Scale (e.g., move from `6` to `8`).
* **Do** use `primary_fixed` for subtle highlight backgrounds behind important text.
* **Do** treat the "Create Share" action as the visual anchor of the page using the signature gradient.

### Don’t:
* **Don't** use black (`#000000`) for text. Use `on_surface` (`#191c1e`) to maintain a soft, premium feel.
* **Don't** use 1px solid borders. It breaks the "Digital Atrium" aesthetic and makes the app look like a standard template.
* **Don't** crowd the navigation header. Use the `24` (8.5rem) spacing scale for side margins on desktop to keep the center-focus clear.