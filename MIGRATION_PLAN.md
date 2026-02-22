# Migration Plan: Create React App to Vite

## Current Issues
- Create React App is deprecated (React team announced sunsetting in Feb 2025)
- 60 security vulnerabilities in frontend dependencies
- react-scripts hasn't been updated in 2+ years
- Many dependencies are outdated and vulnerable

## Migration Steps

### 1. Install Vite and React Plugin
```bash
npm install --save-dev vite @vitejs/plugin-react
```

### 2. Update package.json Scripts
Replace react-scripts scripts with Vite equivalents:
- `"start"` → `"vite"`
- `"build"` → `"vite build"`
- `"test"` → `"vitest"` (if needed)
- Remove `"eject"` script

### 3. Create Vite Config
Create `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

### 4. Update HTML File
Move `public/index.html` to `index.html` in root and update:
- Remove `%PUBLIC_URL%` references
- Add module script entry point: `<script type="module" src="/src/index.js"></script>`

### 5. Update Environment Variables
- Change `REACT_APP_` prefix to `VITE_`
- Update code to use `import.meta.env.VITE_` instead of `process.env.REACT_APP_`

### 6. Remove Unnecessary Dependencies
```bash
npm uninstall react-scripts @testing-library/jest-dom @testing-library/react @testing-library/user-event web-vitals
```

### 7. Install Testing Framework (Optional)
```bash
npm install --save-dev vitest @testing-library/jest-dom jsdom
```

### 8. Update Import Paths
- Remove `.js` extensions from imports if not needed
- Update any absolute imports to relative imports

### 9. Update ESLint Config
Create `.eslintrc.cjs` for Vite compatibility.

### 10. Test and Verify
- Run `npm run dev` to start development server
- Run `npm run build` to test production build
- Test all functionality works as expected

## Benefits of Migration
- ⚡ Faster development server and builds
- 🔧 Modern build tool with active maintenance
- 🛡️ Better security posture
- 📦 Smaller bundle sizes
- 🔄 Hot Module Replacement (HMR) out of the box

## Timeline
Estimated completion: 2-3 hours
Risk: Low (Vite has excellent CRA migration support)
