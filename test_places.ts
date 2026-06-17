import dotenv from "dotenv";
dotenv.config();

async function run() {
    const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY;
    if (!API_KEY) {
        console.error("Missing GOOGLE_MAPS_PLATFORM_KEY");
        return;
    }

    try {
        const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "X-Goog-Api-Key": API_KEY,
               "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.primaryTypeDisplayName,places.location"
            },
            body: JSON.stringify({
               textQuery: "Schools in Jaipur",
               pageSize: 10
            })
         });
         console.log(response.status);
         const data = await response.json();
         console.log(data);
    } catch(e) {
        console.error(e);
    }
}
run();
