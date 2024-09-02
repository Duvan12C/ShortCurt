# React + TypeScript + Vite + Tailwind CSS

Este proyecto proporciona una configuración mínima para trabajar con React en Vite, incluyendo soporte para TypeScript, Tailwind CSS y una configuración básica de ESLint.

## Plugins Disponibles

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)**: Utiliza [Babel](https://babeljs.io/) para Fast Refresh.
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**: Utiliza [SWC](https://swc.rs/) para Fast Refresh.

## Configuración de Tailwind CSS

1. **Instalar Tailwind CSS y sus dependencias:**

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init
    ```

2. **Configurar Tailwind en `tailwind.config.js`:**

    ```js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Incluye todos los archivos relevantes en tu directorio src
        "./public/index.html", // Incluye el archivo HTML principal
        "node_modules/flowbite-react/lib/esm/**/*.js",
        "node_modules/flowbite-react/lib/esm/**/*.jsx",
        "node_modules/flowbite-react/lib/esm/**/*.ts",
        "node_modules/flowbite-react/lib/esm/**/*.tsx",
      ],
      theme: {
        extend: {},
      },
      plugins: [
        require('flowbite/plugin') // Incluye el plugin Flowbite si lo estás usando
      ],
    };
    ```

3. **Añadir las directivas de Tailwind en tu archivo CSS principal:**

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

## Configuración de ESLint

Para desarrollar una aplicación en producción, se recomienda actualizar la configuración de ESLint para habilitar reglas de linting conscientes del tipo:

1. **Configurar la propiedad `parserOptions` en el archivo de configuración de ESLint:**

    ```js
    // eslint.config.js
    import react from 'eslint-plugin-react';
    import tseslint from 'typescript-eslint';

    export default tseslint.config({
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.url,
        },
      },
      settings: {
        react: { version: '18.3' },
      },
      plugins: {
        react,
      },
      rules: {
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
      },
    });
    ```

2. **Instalar `eslint-plugin-react` y actualizar la configuración:**

    ```bash
    npm install eslint-plugin-react --save-dev
    ```

    ```js
    // eslint.config.js
    import react from 'eslint-plugin-react';

    export default tseslint.config({
      settings: { react: { version: '18.3' } },
      plugins: {
        react,
      },
      rules: {
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
      },
    });
    ```

## Ejemplo de Configuración de Vista con Tailwind CSS

Aquí tienes un ejemplo de cómo configurar una vista simple usando Tailwind CSS:

```tsx
// ShortenUrlView.tsx
import React, { useState } from 'react';
import axios from 'axios';

const ShortenUrlView: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleShortenUrl = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/create', { original_url: originalUrl });
      setShortenedUrl(response.data.data.shortened_url);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Acortar URL</h1>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Ingresa la URL original"
        className="border border-gray-300 rounded-lg p-4 w-full max-w-md mb-4"
      />
      <button
        onClick={handleShortenUrl}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Acortar
      </button>
      {shortenedUrl && (
        <p className="mt-4 text-lg">
          URL Acortada: <a href={`http://localhost:8000/${shortenedUrl}`} className="text-blue-500">{shortenedUrl}</a>
        </p>
      )}
    </div>
  );
};

export default ShortenUrlView;
