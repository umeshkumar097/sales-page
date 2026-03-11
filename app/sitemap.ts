import { MetadataRoute } from 'next';

const baseUrl = 'https://m.aiclex.in'; // Replace with actual domain

// Top 30 tech hubs and metropolitan cities in India for targeted keyword landing pages
const targetCities = [
    "mumbai", "delhi", "bangalore", "hyderabad", "chennai", "kolkata", 
    "pune", "ahmedabad", "noida", "gurgaon", "chandigarh", "jaipur", 
    "surat", "lucknow", "kanpur", "nagpur", "indore", "thane", "bhopal",
    "visakhapatnam", "kochi", "patna", "vadodara", "ludhiana", "agra",
    "nashik", "faridabad", "meerut", "rajkot", "kalyan-dombivli"
];

// Target countries for Zoom Reseller
const targetCountries = [
    "india", "usa", "uk", "canada", "australia", "uae", "singapore", 
    "germany", "france", "south-africa", "new-zealand"
];

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Generate dynamic URLs for Mobile App Development
    targetCities.forEach(city => {
        sitemapEntries.push({
            url: `${baseUrl}/mobile-app-development-company-in-${city}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        });
    });

    // Generate dynamic URLs for Web Development
    targetCities.forEach(city => {
        sitemapEntries.push({
            url: `${baseUrl}/web-development-agency-in-${city}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        });
    });

    // Generate dynamic URLs for Zoom Reseller
    targetCountries.forEach(country => {
        sitemapEntries.push({
            url: `${baseUrl}/zoom-reseller-in-${country}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        });
    });

    return sitemapEntries;
}
