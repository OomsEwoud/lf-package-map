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

Hier is een basisvoorbeeld van hoe je de component implementeert in een React applicatie:

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
    <div style={{ height: '600px', width: '100%' }}>
      <Maps 
        mapData={mockBoundaries}
        stats={mockStats}
        areaType="gemeente"
        activeYear="2024"
        activeMonth="Maart"
        colorThresholds={myColors}
        legendTitle="Werkloosheidsgraad"
        valueSuffix="%"
        renderModalContent={(selected) => (
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
| `valueSuffix` | `string` | Suffix achter de waardes (bijv. '%' of ' p.p.'). |
| `renderModalContent` | `(selected: any) => ReactNode` | Functie die bepaalt wat er in de modal getoond wordt bij een klik. |

---

## Vereisten

Deze package maakt gebruik van de volgende **peer-dependencies**. Zorg dat deze in je project aanwezig zijn:

* `react` (>= 18.0.0)
* `react-dom` (>= 18.0.0)
* `leaflet` (^1.9.0)
* `react-leaflet` (^4.0.0)
* `lucide-react` (voor de iconen)

## Licentie

MIT
```