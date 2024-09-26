document.addEventListener('DOMContentLoaded', () => {
    // Add any JavaScript functionality here, like fetching data via API
    console.log('Page loaded');
});

// public/js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const items = [
        {
            id: 1,
            title: "AI Will Contribute $15.7 Trillion to the Global Economy by 2030",
            description: "Artificial intelligence is expected to be a major driving force...",
            img: "/images/ai.jpg",
            source: "PWC Global Report"
        },
    ];

    const itemId = window.location.pathname.split("/items/")[1];
    const item = items.find(i => i.id == itemId);

    if (item) {
        document.querySelector('h1').textContent = item.title;
        document.querySelector('img').src = item.img;
        document.querySelector('p').textContent = item.description;
        document.querySelector('.source').textContent = `Source: ${item.source}`;
    } else {
        // Handle 404 case
        window.location.href = '/404.html';
    }
});
