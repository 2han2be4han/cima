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
    { id: 'venue-01', area: '篠島 / 南知多', title: 'BBQ Dieux Terrace', description: '海を一望するパノラマビュー。夕日の美しい特等席で、オープンエアのウエディングパーティを。' },
    { id: 'venue-02', area: '篠島 / 南知多', title: '篠島サンライズビーチ', description: '白い砂浜と透き通る海。ビーチウエディングの聖地で、朝日と共に誓いの瞬間を迎える。' },
    { id: 'venue-03', area: '篠島 / 南知多', title: '神明神社', description: '島の鎮守の森に佇む静謐な社殿。厳かな神前式を、島の伝統と共にお迎えします。' },
    { id: 'venue-04', area: '南知多', title: '羽豆岬灯台', description: '岬の先端に立つ白亜の灯台。太平洋を背景にした、映画のようなロケーション。' },
    { id: 'venue-05', area: '日間賀島 / 南知多', title: '日間賀島 サンセットテラス', description: '三河湾に沈む夕日を独り占め。離島だけが叶える贅沢な時間を。' },
    { id: 'venue-06', area: '知多半島', title: '内海プライベートヴィラ', description: '海辺の一棟貸しヴィラで、ゲストと過ごす週末型ウエディング。' }
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
    <a href="wedding-venues/detail.html?id=${item.id}" class="location-card">
      <div class="location-thumb">
        ${item.image
          ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
          : `<div class="location-thumb-placeholder">${item.title}</div>`}
      </div>
      <span class="location-area">${item.area}</span>
      <h3 class="location-title">${item.title}</h3>
      <p class="location-desc">${item.description}</p>
    </a>
  `).join('');
}
