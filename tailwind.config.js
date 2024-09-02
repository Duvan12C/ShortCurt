/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de que esto incluya todos los archivos relevantes en tu directorio src
        "./public/index.html", // Incluye el archivo HTML principal si estás usando Tailwind allí
        "node_modules/flowbite-react/lib/esm/**/*.js", // Asegúrate de que estos paths apunten a los archivos JS de Flowbite
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
