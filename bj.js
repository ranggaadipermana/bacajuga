const rssFeedURL = 'https://www.pecinta.games/feeds/posts/default?alt=rss';

async function fetchPosts() {
    const response = await fetch(rssFeedURL);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');
    const items = Array.from(xml.querySelectorAll("item")).map(item => ({
        title: item.querySelector("title").textContent,
        link: item.querySelector("link").textContent
    }));
    return items;
}

function getRandomPosts(posts) {
    const shuffled = posts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
}

async function displayRecommendedPosts() {
    const posts = await fetchPosts();
    const recommendedPosts = getRandomPosts(posts);
    const container = document.createElement('div');
    container.innerHTML = `
        <h3>Baca Juga</h3>
        <ul>
            ${recommendedPosts.map(post => `
                <li><a href="${post.link}" target="_blank">${post.title}</a></li>
            `).join('')}
        </ul>
    `;
    const placeholder = document.getElementById('recommended-posts-placeholder');
    if (placeholder) {
        placeholder.appendChild(container);
    }
}

window.onload = displayRecommendedPosts;
