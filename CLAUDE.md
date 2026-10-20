# House Price Prediction System — Project Instructions

## 1. Project Overview

Build a complete, modern, responsive web application for a House Price Prediction System using the existing project.

The application should allow users to:

* Understand the purpose of the house price prediction system.
* Learn how the machine learning model works.
* Enter property details through an interactive form.
* Submit the details to the prediction backend.
* View the estimated house price in a polished results interface.
* Navigate between Home, About, How It Works, and Predict pages.
* Use the application comfortably on desktop, tablet, and mobile devices.

This should look and behave like a professionally designed real estate technology product, not a basic student project template.

## 2. First Rule: Inspect the Existing Project

Before modifying any files:

1. Inspect the complete existing project structure.
2. Read `package.json` and identify the installed framework, dependencies, scripts, and versions.
3. Inspect the existing `app/`, `components/`, `public/`, `lib/`, and other relevant directories.
4. Identify the current machine learning model, dataset, preprocessing pipeline, and backend, if present.
5. Inspect existing styles, fonts, images, and reusable components.
6. Determine which features already work and which need implementation.

Do not immediately replace the existing application with a new template.

Preserve existing working functionality, dependencies, configurations, and project conventions whenever possible.

If the project already has a different folder structure, adapt to it instead of creating unnecessary duplicate directories.

Do not delete existing files or rewrite large parts of the application without a clear reason.

## 3. Technology Requirements

Use the existing stack wherever practical.

Preferred technologies:

* Next.js App Router.
* React.
* TypeScript.
* Tailwind CSS, if already installed or appropriate for the existing project.
* Framer Motion for meaningful UI animations, if compatible with the project.
* Lucide React for icons, if available.
* Python with the existing Flask or FastAPI backend, if applicable.
* Scikit-learn or the actual machine learning framework used by the project.

Do not migrate to another framework without a compelling technical reason.

Do not install unnecessary dependencies.

Before adding a dependency, check whether an existing package or native browser API can accomplish the same task.

## 4. Design Direction

Create a premium, modern real estate website with a subtle AI and technology aesthetic.

The visual design should feel elegant, trustworthy, spacious, and professional.

### Color palette

Use a consistent design system based on:

* Primary background: warm off-white, approximately `#F7F7F2`.
* Primary text: deep charcoal, approximately `#171917`.
* Secondary text: muted gray, approximately `#737873`.
* Accent: emerald green, approximately `#18794E`.
* Secondary surfaces: white.
* Borders: subtle light gray.
* Dark sections: deep charcoal or dark green when appropriate.

Use CSS variables or the project's existing design-token system to manage colors consistently.

Do not introduce random accent colors throughout the application.

Keep gradients subtle and purposeful.

### Typography

Use a modern, readable sans-serif typeface.

Use:

* Large, confident hero headings.
* Clear section headings.
* Comfortable paragraph line heights.
* Consistent font weights.
* Responsive typography using CSS or Tailwind breakpoints.

Use the existing font configuration if one is already established.

Avoid loading unnecessary fonts or introducing layout shifts.

### Layout and spacing

* Use a consistent content width.
* Maintain generous whitespace.
* Align content to a coherent grid.
* Use consistent vertical spacing between sections.
* Avoid excessively rounded cards and excessive shadows.
* Keep forms readable and easy to operate.
* Ensure the visual hierarchy remains clear on mobile.

The design must be cohesive across every route.

## 5. Global Website Layout

Use the Next.js App Router and the existing root layout.

The root layout should provide:

* HTML document structure.
* Global styles.
* Font configuration.
* Metadata defaults.
* Shared navigation.
* Shared footer, if appropriate.

Avoid rendering duplicate navigation bars or footers on individual pages when they are already provided by the root layout.

Use appropriate metadata for each route.

### Main navigation

Create a responsive navbar containing:

* Brand: HomeValue AI.
* Home.
* About.
* How It Works.
* Predict Price.

The brand name can be changed easily from one central location.

Requirements:

* Use Next.js `Link` for internal navigation.
* Highlight the active route.
* Add a polished hover state.
* Keep the navigation accessible.
* Implement a working mobile menu.
* Close the mobile menu after navigation.
* Avoid layout shifts during scrolling.
* Use a sticky navbar only if it improves the design.

The Predict Price action should be visually prominent.

Do not use ordinary anchor tags for internal page navigation unless there is a specific reason.

## 6. Home Page

Implement the main landing page at `/`.

Build it using reusable components rather than placing the entire website inside a single large JSX file.

### Section A: Hero

Create a visually striking hero section.

Suggested headline:

"Find the True Value of Your Future Home."

Suggested description:

"Discover estimated property values using machine learning. Enter your property details and receive a data-driven price estimate in seconds."

Include:

* Primary CTA: Predict Price.
* Secondary CTA: Explore How It Works.
* A high-quality modern residential property image.
* A small AI-powered estimation badge.
* A floating property estimate card if it fits the design.
* Subtle entrance animations.
* Responsive image sizing and cropping.

Use a real project image from `public/` if one exists.

If no suitable image exists, prepare the component to use a clearly named asset such as `/images/hero-house.jpg`. Do not create broken image references.

Do not invent claims about prediction accuracy, number of users, or model performance.

### Section B: Highlights

Create three or four feature cards.

Possible features:

* Machine Learning Powered.
* Simple Property Inputs.
* Fast Price Estimates.
* Responsive and Accessible Experience.

Each card should have a concise description and an appropriate icon.

Use consistent card dimensions, spacing, and hover interactions.

### Section C: About Preview

Introduce the House Price Prediction System.

Explain that it uses a trained machine learning model to estimate property prices from supported property features.

Include a CTA linking to `/about`.

### Section D: How It Works Preview

Present the prediction process as four steps:

1. Enter Property Details.
2. Validate and Process Inputs.
3. Generate a Model Prediction.
4. View the Estimated Price.

Use a responsive grid or horizontal stepper.

Include a CTA linking to `/how-it-works`.

### Section E: Prediction CTA

Create a strong call-to-action encouraging users to estimate a property's value.

The CTA must navigate to `/predict`.

### Section F: Footer

Build a polished footer containing:

* Brand name and short description.
* Links to Home, About, How It Works, and Predict.
* GitHub or contact links only when valid project details are available.
* Current copyright year generated dynamically or maintained appropriately.
* A short informational disclaimer.

Avoid placeholder social links and dead links.

## 7. About Page

Implement `/about`.

Include:

1. Page introduction.
2. Project overview.
3. Problem statement.
4. Project objectives.
5. Machine learning workflow.
6. Technology stack based on the actual project.
7. Limitations and intended use.
8. CTA to the prediction page.

Explain that the system estimates house prices based on the data and features available to the model.

Do not claim that the system produces guaranteed market values.

Do not invent a dataset, algorithm, accuracy score, training size, or performance metric.

Read the existing project to determine which technical details are accurate.

If a detail is unknown, omit it or describe it generically.

## 8. How It Works Page

Implement `/how-it-works`.

Explain the entire prediction process in understandable language.

### Step 1: Property information

The user supplies the required property details.

### Step 2: Input validation

The application validates required fields, types, ranges, and supported values.

### Step 3: Preprocessing

The backend transforms the inputs using the same preprocessing logic used during model training.

### Step 4: Prediction

The trained model processes the prepared features.

### Step 5: Result

The application displays the estimated price and a summary of the submitted property details.

Include:

* A clear visual workflow.
* Feature explanations based on the actual model.
* A simple architecture illustration implemented with HTML/CSS/SVG if useful.
* A CTA to `/predict`.

Do not imply that an illustrative diagram represents an actual implementation unless it matches the real architecture.

## 9. Prediction Page

Implement `/predict`.

This is the application's most important functional feature.

Build a dedicated prediction interface with a property form and a clear results panel.

### Form requirements

Inspect the actual trained model and identify its expected input features before designing the form.

Use only supported features.

Examples may include:

* Property location.
* Area or square footage.
* Bedrooms.
* Bathrooms.
* Property age.
* Number of floors.
* Lot size.
* Other features required by the model.

These are examples, not mandatory fields.

Do not add unsupported fields just to make the form look comprehensive.

### Input controls

Use appropriate controls:

* Number inputs for numeric features.
* Select inputs for categorical features with known valid values.
* Clear labels and helpful descriptions.
* Required-field indicators.
* Appropriate minimum and maximum values when justified by the model or dataset.
* Inline validation messages.

Do not silently change invalid user input.

Do not use fake dropdown options when the model requires a specific category or encoding.

### Prediction button

The main action should be labeled "Predict Price" or a similarly clear phrase.

During submission:

* Prevent duplicate submissions.
* Display a loading indicator.
* Disable the submit button when appropriate.
* Keep the user informed about the current operation.

### Results interface

After a successful prediction, display:

* Estimated property price.
* Property summary.
* Relevant input values.
* Price per square foot only when the required units and area are available and valid.
* A button to make another prediction.

Format currency and numbers appropriately for the project's intended market.

For an Indian property dataset, use Indian Rupee formatting where appropriate.

Never display a fabricated prediction as if it came from the actual model.

Use demo data only when explicitly identified as demonstration data.

### Error handling

Handle:

* Missing fields.
* Invalid numeric values.
* Unsupported categories.
* Backend unavailable.
* Request timeout.
* Invalid API response.
* Model inference errors.

Display understandable messages rather than raw stack traces.

Preserve the user's form values when a request fails.

## 10. Machine Learning Backend Integration

First determine whether the project already contains a Python backend and trained model.

Do not retrain or replace an existing model unnecessarily.

If a working prediction endpoint already exists, use it.

If the model exists but has no API, implement an appropriate API using the existing backend framework where practical.

### Integration requirements

* Validate request payloads on the server.
* Validate required features and data types.
* Use the original preprocessing pipeline.
* Preserve the expected feature order.
* Load the model safely and efficiently.
* Avoid reloading the model for every request when the framework supports application-level initialization.
* Return structured JSON responses.
* Return suitable HTTP status codes.
* Log server errors without exposing sensitive implementation details to users.
* Configure CORS only when a separate frontend/backend origin requires it.
* Keep backend secrets and internal paths out of client-side code.

Example success response:

{
"success": true,
"predicted_price": 7500000,
"currency": "INR"
}

This is only a response-format example. Use the real model output and actual API contract.

Example error response:

{
"success": false,
"error": "Invalid property details."
}

Adapt the response shape to the existing API if one is already established.

### Important architectural rule

Next.js does not natively execute a Python machine learning model simply because the model file exists in the project.

If the model uses Python libraries, run it in a compatible Python backend or another appropriate Python execution environment.

A Next.js Route Handler may act as a proxy if necessary, but it must not pretend to run a Python model directly.

If the model or backend is missing, build the frontend and a clearly documented integration boundary. Explain what is required to complete real predictions.

Never fabricate a working backend or return hardcoded prices as real predictions.

## 11. Animations and Interactions

Use animations to improve the experience without making the site distracting.

Appropriate effects include:

* Hero text entrance.
* Image fade or slide.
* Staggered feature-card reveals.
* Subtle card hover transitions.
* Button hover and press feedback.
* Prediction loading animation.
* Smooth result appearance.
* Scroll-triggered section reveals.

Requirements:

* Respect `prefers-reduced-motion`.
* Avoid unnecessary continuous animations.
* Avoid animating large layouts in ways that cause visible shifts.
* Do not add heavy animation dependencies unless needed.
* Ensure animations do not block interactions.
* Prefer transform and opacity animations for smooth rendering.

## 12. Responsive Design

Implement and verify layouts for:

* Mobile phones.
* Tablets.
* Laptops.
* Large desktop displays.

Requirements:

* No horizontal overflow.
* No clipped headings.
* Readable text at every viewport.
* Appropriate image aspect ratios.
* Mobile-friendly forms.
* Comfortable touch targets.
* Functional mobile navigation.
* Responsive card grids.
* Proper spacing between sections.

On small screens, stack the hero content and image naturally.

The prediction form should use one column on narrow screens and may use multiple columns on larger screens.

Do not simply shrink the desktop layout.

## 13. Accessibility

Follow good accessibility practices.

* Use semantic HTML.
* Use a logical heading hierarchy.
* Provide labels for every form control.
* Provide meaningful alt text for informative images.
* Maintain adequate color contrast.
* Support keyboard navigation.
* Add visible focus states.
* Use buttons for actions and links for navigation.
* Avoid using color alone to communicate errors or status.
* Announce important prediction status updates accessibly.
* Respect reduced-motion preferences.

## 14. SEO and Metadata

Configure meaningful metadata for:

* Home.
* About.
* How It Works.
* Predict.

Use descriptive titles and descriptions.

Ensure that each page has an appropriate primary heading.

Use optimized images and avoid unnecessarily large assets.

Add Open Graph metadata if appropriate.

Do not claim that the application provides official valuations or guaranteed market prices.

## 15. Code Quality

Follow these rules:

* Use TypeScript types for component props and API responses.
* Avoid unnecessary use of `any`.
* Keep components focused and reusable.
* Keep business logic separate from presentation.
* Avoid duplicating the same navigation, footer, or UI elements.
* Use server components by default.
* Add `"use client"` only when client-side interaction or browser APIs require it.
* Avoid accessing browser-only APIs during server rendering.
* Use Next.js conventions for routing, metadata, and images.
* Keep environment variables server-side unless a variable is intentionally public.
* Avoid unnecessary state and effects.
* Remove unused imports and dead code.
* Do not suppress TypeScript errors to make a build pass.
* Do not use fake API results to hide integration problems.

Follow the project's existing linting and formatting conventions.

## 16. Performance

* Optimize images.
* Use `next/image` where appropriate.
* Avoid unnecessary client-side JavaScript.
* Lazy-load noncritical content when useful.
* Avoid layout shifts.
* Keep animations lightweight.
* Prevent unnecessary component rerenders.
* Avoid importing large libraries for trivial effects.
* Keep the initial page load fast.

## 17. Testing and Verification

After implementation:

1. Run the existing lint command if available.
2. Run the TypeScript check if available.
3. Run the production build.
4. Fix errors introduced by the changes.
5. Test all internal navigation links.
6. Test the mobile menu.
7. Test form validation.
8. Test loading, success, and failure states.
9. Verify backend integration when the backend is available.
10. Check for broken images and missing assets.
11. Review mobile and desktop layouts.

Do not claim that a test passed unless it was actually run successfully.

Do not remove useful project checks or weaken TypeScript settings to conceal errors.

If an existing unrelated issue prevents verification, report it clearly.

## 18. Implementation Workflow

Work in these phases.

### Phase 1: Audit

Inspect the current project and report:

* Existing architecture.
* Existing model and backend.
* Existing dependencies.
* Reusable components.
* Missing functionality.
* Potential integration issues.

### Phase 2: Foundation

Establish or improve:

* Global design tokens.
* Typography.
* Root layout.
* Navigation.
* Footer.
* Responsive conventions.

### Phase 3: Pages

Implement:

* Home.
* About.
* How It Works.
* Predict.

Reuse shared components and keep the visual design consistent.

### Phase 4: Functional prediction

Integrate the actual trained model through the appropriate backend.

If required assets or backend functionality are missing, clearly identify the missing pieces rather than inventing them.

### Phase 5: Polish

Improve:

* Animations.
* Responsive layouts.
* Accessibility.
* Error handling.
* Metadata.
* Performance.

### Phase 6: Verification

Run available checks and fix implementation errors.

Summarize the completed work and identify anything that still requires configuration.

## 19. Final Acceptance Criteria

The project is ready when:

* The homepage is complete and visually polished.
* The navbar works on desktop and mobile.
* The About page is accessible.
* The How It Works page explains the actual prediction workflow.
* The prediction page has a form based on the real model features.
* The frontend communicates with the actual backend when available.
* Successful predictions are displayed clearly.
* Loading and error states work correctly.
* The footer is consistent across pages.
* All pages are responsive.
* No known broken navigation or image references remain.
* TypeScript and production build checks pass, subject to documented pre-existing issues.
* No fabricated predictions or unsupported model claims are presented as real.

## 20. How to Execute These Instructions

Begin by auditing the existing project.

Do not generate every file blindly in a single pass.

First provide a concise summary of the current architecture and the implementation plan.

Then implement the website in logical phases, preserving existing functionality.

After each major phase, verify the changed files and resolve errors before proceeding.

When finished, report:

* Pages created or updated.
* Components created or updated.
* Backend integration status.
* Dependencies added, if any.
* Checks actually performed.
* Commands needed to run the application.
* Any remaining configuration or model integration work.

Prioritize a complete, functional, maintainable application over decorative features that do not work.
