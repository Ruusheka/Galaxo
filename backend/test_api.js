
// Using global fetch (Node 18+)

const BASE = 'http://localhost:4000';

async function check(url) {
    try {
        console.log(`Checking ${url}...`);
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
        console.log(`Content-Type: ${res.headers.get('content-type')}`);
        const text = await res.text();
        // console.log(`Body:\n${text}`); 
        try {
            JSON.parse(text);
            console.log("Valid JSON");
        } catch (e) {
            console.log("Invalid JSON");
        }
    } catch (e) {
        console.log(`Error fetching ${url}:`, e.message);
    }
}

(async () => {
    await check(`${BASE}/`);
    await check(`${BASE}/api/booking/stats`);
    await check(`${BASE}/api/courses`);
})();
