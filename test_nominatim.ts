async function run() {
    const query = encodeURIComponent("Schools in Jaipur");
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&extratags=1&limit=5`, {
        headers: {
            "User-Agent": "AIStudio-LeadScraper/1.0"
        }
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
}
run();
