# 📊 Temps de Parole Analysis - React TypeScript

Application React TypeScript reprenant l'analyse du temps de parole des candidats aux présidentielles 2017 et 2022.

## 🚀 Installation

```bash
cd website
npm install
```

## 💻 Développement

```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## 🏗️ Build

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`.

## 📦 Technologies

- **React 18** - Interface utilisateur
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne
- **Recharts** - Graphiques interactifs (à intégrer)
- **CSS-in-JS** - Styling inline

## 📂 Structure

```
website/
├── src/
│   ├── components/
│   │   ├── Header.tsx       # En-tête
│   │   ├── YearSelector.tsx # Sélecteur d'année
│   │   └── ChartCard.tsx    # Carte conteneur
│   ├── types.ts             # Types TypeScript
│   ├── data.ts              # Données 2017 & 2022
│   ├── App.tsx              # Composant principal
│   └── main.tsx             # Point d'entrée
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Features

✅ Sélection 2017 / 2022 / Comparaison  
✅ Design responsive  
✅ TypeScript strict mode  
✅ Build optimisé avec Vite  
🚧 Graphiques Recharts (à venir)  
🚧 Section recherches académiques (à venir)

## 📝 Prochaines étapes

Pour ajouter les graphiques Recharts, vous devrez créer les composants suivants dans `src/components/charts/`:
- `TimeByGroup.tsx`
- `RatioChart.tsx`
- `BubbleChart.tsx`
- `Top3VsOthers.tsx`
- `DistributionChart.tsx`
- `ThresholdChart.tsx`
- `EvolutionChart.tsx`

## 🔗 Liens utiles

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Recharts Documentation](https://recharts.org/)
