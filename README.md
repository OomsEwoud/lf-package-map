# LF Package Map 🌍

A reusable React Leaflet component designed for visualizing geographic data (GeoJSON) with integrated statistics, dynamic legends, and fullscreen functionality.

---

## Installation

Install the package along with its required peer dependencies via npm:

```bash
npm install lf-package-map leaflet react-leaflet geojson lucide-react
```

---

## Critical: Leaflet CSS

To ensure the map renders correctly, you must import the Leaflet CSS files in your project's entry point (e.g., `main.tsx` or `App.tsx` or `App.css`):

```ts
import 'leaflet/dist/leaflet.css';
```

---

## Styling Configuration

### Using with Laravel & Tailwind CSS v4

If you are using modern Laravel with Tailwind v4, update your `resources/css/app.css`:

```css
@import 'tailwindcss';
@import 'leaflet/dist/leaflet.css';

/* Scan the package for Tailwind utility classes */
@source '../../node_modules/lf-package-map/**/*.js';
```

---

### Using with Tailwind CSS v3

Add the package path to your `content` array in `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/lf-package-map/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## Usage

### 1. Container Height

The map component fills 100% of the height of its parent container.

Ensure the parent element has an explicit height (e.g., `h-screen` or `h-[600px]`), otherwise the map will not be visible.

---

### 2. Implementation Example

```ts
import { Maps } from 'lf-package-map';
import 'leaflet/dist/leaflet.css';

const boundaries = [
  { 
    id: 1, 
    name: "Antwerp", 
    boundary: { 
      type: "Polygon", 
      coordinates: [[[4.4, 51.2], [4.5, 51.2], [4.5, 51.3], [4.4, 51.2]]] 
    } 
  },
];

const stats = [{ id: 1, name: "Antwerp", rate: 5.2 }];

const colors = [
  { min: 5, color: '#ef4444' }, 
  { min: 0, color: '#3b82f6' }, 
];

const legend = [
  { label: "High", color: "#ef4444", text: "> 5%" },
  { label: "Low", color: "#3b82f6", text: "< 5%" }
];

export default function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Maps 
        mapData={boundaries}
        stats={stats}
        areaType="municipality"
        activeYear="2024"
        activeMonth="March"
        colorThresholds={colors}
        legendTitle="Unemployment Rate"
        legendStages={legend}
        valueSuffix="%"
        renderModalContent={(selected) => (
          <div className="p-4">
            <h3 className="text-xl font-bold">
              Details for {selected?.name}
            </h3>
            <p>Current score: {selected?.rate}%</p>
          </div>
        )}
      />
    </div>
  );
}
```

---

## Props

The `Maps` component accepts the following props:

| Prop | Type | Description |
|------|------|-------------|
| `mapData` | `Boundary[]` | Array containing GeoJSON boundaries and metadata |
| `stats` | `RateData[]` | Statistical data linked to map features by name |
| `colorThresholds` | `ColorThreshold[]` | Logic for thematic coloring based on numerical values |
| `areaType` | `string` | Label for the region type (e.g., `'municipality'`) |
| `activeYear` | `string` | The year displayed in the UI components |
| `activeMonth` | `string` | The month displayed in the UI components |
| `legendTitle` | `string` | Title shown at the top of the expandable legend |
| `legendStages` | `LegendStage[]` | Array of `{ label, color, text }` for legend items |
| `valueSuffix` | `string` | Suffix for values (e.g., `'%'`, `' p.p.'`) |
| `renderModalContent` | `(selected) => ReactNode` | Custom renderer function for the details modal |

---

## Peer Dependencies

Ensure these dependencies are installed in your project:

- `react (>= 18.0.0 || ^19.0.0)`
- `react-dom (>= 18.0.0 || ^19.0.0)`
- `leaflet (^1.9.0)`
- `react-leaflet (^4.0.0)`
- `lucide-react` (for UI icons)

---

## License

MIT License