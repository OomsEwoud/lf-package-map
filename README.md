# LF Package Map 🌍

Een herbruikbare React Leaflet component voor het visualiseren van geografische data (GeoJSON) met geïntegreerde statistieken, legenda's en fullscreen functionaliteit.

## Installatie

Installeer de package en zijn peer-dependencies via npm:

```bash
npm install lf-package-map leaflet react-leaflet geojson lucide-react
```

### Belangrijk: Leaflet CSS

Vergeet niet de Leaflet CSS-bestanden te importeren in de root van je project (bijv. in `main.tsx` of `App.tsx`), anders zal de kaart niet correct worden weergegeven:

```typescript
import 'leaflet/dist/leaflet.css';
```

---

## Gebruik

### 1. Belangrijk: Hoogte van de container

De kaart vult 100% van de hoogte van zijn ouder-container. Zorg ervoor dat de container waarin de `<Maps />` component staat een expliciete hoogte heeft (bijv. `h-screen` of `h-[600px]`), anders zal de kaart niet zichtbaar zijn.

### 2. Implementatie voorbeeld

```tsx
import { Maps } from 'lf-package-map';
import 'leaflet/dist/leaflet.css';

const mockBoundaries = [
  { 
    id: 1, 
    name: "Antwerpen", 
    boundary: { 
      type: "Polygon", 
      coordinates: [[[4.4, 51.2], [4.5, 51.2], [4.5, 51.3], [4.4, 51.2]]] 
    } as any 
  },
];

const mockStats = [
  { id: 1, name: "Antwerpen", rate: 5.2 },
];

const myColors = [
  { min: 5, color: '#ef4444' }, 
  { min: 0, color: '#3b82f6' }, 
];

export default function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Maps 
        mapData={mockBoundaries}
        stats={mockStats}
        areaType="gemeente"
        activeYear="2024"
        activeMonth="Maart"
        colorThresholds={myColors}
        legendTitle="Werkloosheidsgraad"
        legendStages={["Laag", "Gemiddeld", "Hoog"]}
        valueSuffix="%"
        renderModalContent={(selected: any) => (
          <div className="p-4">
            <h3 className="text-xl font-bold">Details voor {selected?.name}</h3>
            <p>Huidige score: {selected?.rate}%</p>
          </div>
        )}
      />
    </div>
  );
}
```

---

## Styling (Tailwind CSS)

Deze component gebruikt Tailwind CSS voor de styling van de UI-elementen. Om de stijlen correct te laden, moet je jouw `tailwind.config.js` aanpassen zodat deze ook de bestanden in de `node_modules` scant:

```javascript
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

## Props

De `Maps` component accepteert de volgende props:

| Prop | Type | Beschrijving |
| :--- | :--- | :--- |
| `mapData` | `Boundary[]` | Array met GeoJSON boundaries en metadata. |
| `stats` | `RateData[]` | De statistische data die gekoppeld wordt aan de kaartvlakken. |
| `colorThresholds` | `ColorThreshold[]` | Bepaalt welke kleuren worden getoond bij welke waardes. |
| `areaType` | `string` | Label voor de regio (bijv. 'gemeente' of 'provincie'). |
| `activeYear` | `string` | Het jaar dat wordt weergegeven in de UI. |
| `activeMonth` | `string` | De maand die wordt weergegeven in de UI. |
| `legendTitle` | `string` | De titel die boven de legenda verschijnt. |
| `legendStages` | `string[]` | De labels voor de verschillende stappen in de legenda. |
| `valueSuffix` | `string` | Suffix achter de waardes (bijv. '%' of ' p.p.'). |
| `renderModalContent` | `(selected: any) => ReactNode` | Functie die de inhoud van de modal bepaalt. |

---

## Vereisten (Peer Dependencies)

Zorg dat deze dependencies aanwezig zijn in je project:

* `react` (>= 18.0.0 || ^19.0.0)
* `react-dom` (>= 18.0.0 || ^19.0.0)
* `leaflet` (^1.9.0)
* `react-leaflet` (^4.0.0)
* `lucide-react` (voor de iconen)

## Licentie

MIT Licentie