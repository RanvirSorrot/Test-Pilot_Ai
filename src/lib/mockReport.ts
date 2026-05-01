export type Severity = "Critical" | "High" | "Medium" | "Low";
export type LogType = "info" | "pass" | "error" | "warning" | "agent";

export interface Bug {
  id: string;
  title: string;
  severity: Severity;
  url: string;
  action: string;
  result: string;
  recommendation: string;
}

export interface Warning {
  id: string;
  title: string;
  url: string;
  detail: string;
  recommendation: string;
}

export interface Passed {
  id: string;
  title: string;
}

export interface LogEntry {
  id: string;
  ts: string;
  type: LogType;
  text: string;
}

export const mockSummary = {
  url: "https://example-ecommerce.com",
  testedAt: new Date().toISOString(),
  durationSec: 134,
  actions: 47,
  score: 64,
  description:
    "The agent autonomously explored 14 pages on example-ecommerce.com, focusing on the primary purchase funnel, account flows, and responsive layouts. It triggered 47 interactions including form submissions, navigation, and viewport changes. Several critical regressions were detected in the checkout and password reset flows that should be addressed before the next release.",
};

export const mockBugs: Bug[] = [
  {
    id: "b1",
    title: "Checkout button unresponsive when cart is empty",
    severity: "Critical",
    url: "/cart",
    action: "Clicked the primary 'Checkout' button while the cart contained 0 items.",
    result:
      "No visible response. No toast, no navigation, no console output. Users with empty carts have no feedback explaining the disabled state.",
    recommendation:
      "Disable the button when cart.items.length === 0 and surface an inline message. Consider routing to /shop with a hint.",
  },
  {
    id: "b2",
    title: "Password reset form throws 404 on submit",
    severity: "High",
    url: "/account/forgot-password",
    action: "Filled the email field with a valid address and submitted the form.",
    result:
      "POST /api/auth/reset returned 404 Not Found. The UI showed a generic spinner indefinitely.",
    recommendation:
      "Verify the endpoint is deployed in production and add a fallback error toast on non-2xx responses.",
  },
  {
    id: "b3",
    title: "Mobile hamburger menu doesn't close after navigation",
    severity: "Medium",
    url: "/ (mobile viewport 375×812)",
    action: "Opened the hamburger menu and tapped a navigation link.",
    result:
      "The menu remained open over the destination page, blocking the hero content until manually dismissed.",
    recommendation:
      "Close the drawer in a route-change effect (useEffect on location.pathname).",
  },
  {
    id: "b4",
    title: "Product image broken on /sale page",
    severity: "Medium",
    url: "/sale",
    action: "Loaded the sale listing and observed image grid.",
    result:
      "3 of 12 product cards returned 404 for their hero images. Network tab shows /img/products/sale-{04,07,11}.jpg missing.",
    recommendation:
      "Re-upload missing assets or fall back to a placeholder via onError.",
  },
];

export const mockWarnings: Warning[] = [
  {
    id: "w1",
    title: "No 404 page configured",
    url: "/this-route-does-not-exist",
    detail: "Server returned a generic browser error page instead of a branded 404.",
    recommendation: "Add a custom 404 route in your router and SSR fallback.",
  },
  {
    id: "w2",
    title: "Login button has low contrast ratio",
    url: "/login",
    detail: "Measured contrast 2.1:1 between #8a8a8a text and #f4f4f4 background. WCAG AA requires 4.5:1.",
    recommendation: "Darken the label or use the brand primary as the button background.",
  },
  {
    id: "w3",
    title: "Contact form missing required field indicators",
    url: "/contact",
    detail: "Required inputs had no asterisk or aria-required attribute.",
    recommendation: "Add visible required markers and aria-required='true'.",
  },
  {
    id: "w4",
    title: "Footer external links open in same tab",
    url: "/",
    detail: "5 external links missing target='_blank' and rel='noopener'.",
    recommendation: "Open external destinations in a new tab to preserve user session.",
  },
  {
    id: "w5",
    title: "No loading state shown during form submission",
    url: "/contact",
    detail: "Submit button stayed identical during the 1.4s request, allowing double submits.",
    recommendation: "Add a disabled + spinner state while the request is in flight.",
  },
  {
    id: "w6",
    title: "Image missing alt text on /about",
    url: "/about",
    detail: "2 hero images had empty alt attributes.",
    recommendation: "Provide descriptive alt text for screen readers.",
  },
  {
    id: "w7",
    title: "Mobile viewport: navigation menu overlaps hero text",
    url: "/ (mobile)",
    detail: "At 375px width the sticky nav covered the H1 by 14px.",
    recommendation: "Add scroll-padding-top equal to the navbar height.",
  },
];

export const mockPassed: Passed[] = [
  { id: "p1", title: "All navigation links return 200 status" },
  { id: "p2", title: "Login form accepts valid credentials" },
  { id: "p3", title: "Images load correctly on homepage" },
  { id: "p4", title: "Search functionality returns relevant results" },
  { id: "p5", title: "Product listing pagination works" },
  { id: "p6", title: "Add-to-cart updates badge count" },
  { id: "p7", title: "Cart persists across page reloads" },
  { id: "p8", title: "Newsletter signup confirms successfully" },
  { id: "p9", title: "Account creation flow completes end-to-end" },
  { id: "p10", title: "Password validation enforces minimum strength" },
  { id: "p11", title: "Logout clears the session cookie" },
  { id: "p12", title: "Product detail pages render structured data" },
  { id: "p13", title: "Breadcrumbs update with route changes" },
  { id: "p14", title: "Filters apply without page reload" },
  { id: "p15", title: "Sort dropdown updates listing order" },
  { id: "p16", title: "Wishlist add/remove toggles correctly" },
  { id: "p17", title: "Checkout form validates required fields" },
  { id: "p18", title: "Discount code field accepts input" },
  { id: "p19", title: "Order confirmation page renders" },
  { id: "p20", title: "Email subscription unsubscribe link works" },
  { id: "p21", title: "Search bar focuses on '/' shortcut" },
  { id: "p22", title: "Modal traps focus correctly" },
  { id: "p23", title: "Skip-to-content link is keyboard reachable" },
];

export const mockLogs: LogEntry[] = [
  { id: "l1", ts: "00:00", type: "info", text: "Navigating to homepage..." },
  { id: "l2", ts: "00:02", type: "pass", text: "Homepage loaded in 412ms" },
  { id: "l3", ts: "00:03", type: "agent", text: "Agent decided to test primary navigation next" },
  { id: "l4", ts: "00:04", type: "pass", text: "All 8 nav links return 200" },
  { id: "l5", ts: "00:07", type: "info", text: "Navigating to /shop" },
  { id: "l6", ts: "00:09", type: "pass", text: "Product grid rendered with 24 items" },
  { id: "l7", ts: "00:12", type: "agent", text: "Agent will exercise the cart flow" },
  { id: "l8", ts: "00:14", type: "pass", text: "Add-to-cart updated badge to 1" },
  { id: "l9", ts: "00:18", type: "info", text: "Navigating to /cart" },
  { id: "l10", ts: "00:21", type: "error", text: "✗ Checkout button unresponsive when cart is empty" },
  { id: "l11", ts: "00:24", type: "info", text: "Returning to /shop, adding 2 products" },
  { id: "l12", ts: "00:30", type: "pass", text: "Cart updated with 2 items" },
  { id: "l13", ts: "00:34", type: "warning", text: "⚠ No loading state shown during checkout submit" },
  { id: "l14", ts: "00:38", type: "agent", text: "Agent decided to test the contact form next" },
  { id: "l15", ts: "00:42", type: "warning", text: "⚠ Contact form missing required field indicators" },
  { id: "l16", ts: "00:48", type: "info", text: "Switching to mobile viewport (375×812)" },
  { id: "l17", ts: "00:52", type: "error", text: "✗ Mobile hamburger menu doesn't close after navigation" },
  { id: "l18", ts: "00:58", type: "info", text: "Navigating to /sale" },
  { id: "l19", ts: "01:02", type: "error", text: "✗ Product image broken on /sale page (3 assets 404)" },
  { id: "l20", ts: "01:08", type: "info", text: "Navigating to /account/forgot-password" },
  { id: "l21", ts: "01:14", type: "error", text: "✗ Password reset form returned 404 on submit" },
  { id: "l22", ts: "01:20", type: "warning", text: "⚠ Login button has low contrast (2.1:1)" },
  { id: "l23", ts: "01:28", type: "pass", text: "✓ Login form accepts valid credentials" },
  { id: "l24", ts: "01:36", type: "pass", text: "✓ Logout clears session cookie" },
  { id: "l25", ts: "01:44", type: "agent", text: "Agent finalizing accessibility scan" },
  { id: "l26", ts: "01:52", type: "warning", text: "⚠ Image missing alt text on /about (2 occurrences)" },
  { id: "l27", ts: "02:00", type: "warning", text: "⚠ Footer external links open in same tab" },
  { id: "l28", ts: "02:08", type: "info", text: "Compiling report..." },
  { id: "l29", ts: "02:14", type: "pass", text: "✓ Test run complete — 47 actions executed" },
];
