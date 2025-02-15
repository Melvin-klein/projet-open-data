/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Assure un export statique pour GitHub Pages
    basePath: "/projet-open-data", // Définit le bon chemin de base
    assetPrefix: "/projet-open-data/", // Définit le bon préfixe pour les assets
    images: {
        unoptimized: true, // Évite les erreurs liées aux optimisations d'images
    },
};

export default nextConfig;
