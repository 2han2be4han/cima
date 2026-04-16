/**
 * MicroCMS Integration Script for 株式会社CIMA
 * 
 * This script fetches news and location data from MicroCMS.
 * To enable: 
 * 1. Create a MicroCMS account and project.
 * 2. Create 'news' and 'locations' APIs.
 * 3. Enter your service ID and API key below.
 */

const CMS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID', // Example: 'cima-wedding'
  apiKey: 'YOUR_API_KEY',       // MicroCMS API Key
  isMock: true // Set to false after entering real keys
};

// Mock Data for initial state
const MOCK_DATA = {
  news: [
    { id: '1', date: '2026-04-16', category: 'お知らせ', title: 'ホームページをリニューアルしました' },
    { id: '2', date: '2026-04-10', category: 'イベント', title: '篠島BBQサンセットプラン予約受付中' }
  ],
  locations: [
    { id: 'venue-01', area: '篠島 / 南知多', title: 'BBQ Dieux Terrace', description: '海を一望するパノラマビュー。夕日の美しい特等席です。' },
    { id: 'venue-02', area: '篠島 / 南知多', title: '篠島サンライズビーチ', description: '白い砂浜と透き通る海。ビーチウエディングの聖地です。' }
  ]
};

async function fetchCMS(endpoint) {
  if (CMS_CONFIG.isMock) {
    return MOCK_DATA[endpoint] || [];
  }

  const url = `https://${CMS_CONFIG.serviceId}.microcms.io/api/v1/${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: { 'X-MICROCMS-API-KEY': CMS_CONFIG.apiKey }
    });
    const data = await response.json();
    return data.contents;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

// Initializers for different pages
document.addEventListener('DOMContentLoaded', async () => {
  const newsList = document.getElementById('news-list');
  if (newsList) {
    const news = await fetchCMS('news');
    renderNews(news, newsList);
  }

  const locationGrid = document.getElementById('location-grid');
  if (locationGrid) {
    const locations = await fetchCMS('locations');
    renderLocations(locations, locationGrid);
  }
});

function renderNews(news, container) {
  container.innerHTML = news.map(item => `
    <a href="news.html?id=${item.id}" style="display: flex; align-items: center; gap: 24px; padding: 24px 0; border-bottom: 1px solid var(--border);">
      <span style="font-family: monospace; color: var(--ink-muted);">${item.date}</span>
      <span style="background: var(--main); color: #fff; padding: 2px 12px; border-radius: 20px; font-size: 0.75rem;">${item.category}</span>
      <span style="flex: 1;">${item.title}</span>
    </a>
  `).join('');
}

function renderLocations(locations, container) {
  container.innerHTML = locations.map(item => `
    <a href="wedding-venues/detail.html?id=${item.id}" class="card fade-in" style="display: block;">
      <div style="aspect-ratio: 16/9; background: var(--border);"></div>
      <div style="padding: 32px;">
        <span style="font-size: 0.75rem; color: var(--main); font-weight: 700;">${item.area}</span>
        <h3 style="font-size: 1.5rem; margin-top: 12px; margin-bottom: 12px;">${item.title}</h3>
        <p style="font-size: 0.9375rem; color: var(--ink-light);">${item.description}</p>
      </div>
    </a>
  `).join('');
}
