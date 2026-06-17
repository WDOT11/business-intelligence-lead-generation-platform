var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);

// server/db.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var DB_DIR = import_path.default.join(process.cwd(), "data");
var DB_FILE = import_path.default.join(DB_DIR, "database.json");
var INITIAL_SEED = {
  businesses: [
    {
      id: "b1",
      business_name: "Maharani Girls Senior Secondary School",
      category: "School",
      sub_category: "Girls High School",
      description: "A prestigious historical girls education school in Jaipur specializing in secondary education, science, arts and commerce streams.",
      establishment_year: "1943",
      industry_type: "Education",
      services: ["Primary Education", "High School boarding", "Curriculum streams", "Science labs"],
      products: [],
      certifications: ["State Board Accreditation", "NOC Central Board"],
      rating: 4.5,
      total_reviews: 142,
      maps_url: "https://maps.google.com/?cid=123451",
      latitude: "26.9124",
      longitude: "75.7873",
      logo_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=60",
      opening_hours: "08:00 AM",
      closed_hours: "02:30 PM",
      business_status: "Active",
      has_website: true,
      has_email: true,
      created_at: (/* @__PURE__ */ new Date("2026-05-10T10:00:00.000Z")).toISOString()
    },
    {
      id: "b2",
      business_name: "Apex Super Speciality Hospital",
      category: "Hospital",
      sub_category: "Multi-Speciality Care",
      description: "State-of-the-art super speciality hospital in Mumbai offering world-class care in cardiology, orthopedics, oncology and trauma care.",
      establishment_year: "1998",
      industry_type: "Healthcare",
      services: ["24/7 ICU Backup", "Cardiology Unit", "Orthopedic Surgery", "Emergency Medical Care"],
      products: [],
      certifications: ["NABH Accredited", "NABL Laboratory Cert"],
      rating: 4.8,
      total_reviews: 824,
      maps_url: "https://maps.google.com/?cid=543212",
      latitude: "19.0760",
      longitude: "72.8777",
      logo_url: "https://images.unsplash.com/photo-1538108149393-fbbd8189893d?w=120&auto=format&fit=crop&q=60",
      opening_hours: "Open 24 Hours",
      closed_hours: "Open 24 Hours",
      business_status: "Active",
      has_website: true,
      has_email: true,
      created_at: (/* @__PURE__ */ new Date("2026-05-12T14:00:00.000Z")).toISOString()
    },
    {
      id: "b3",
      business_name: "The Golden Leaf Indian Restaurant",
      category: "Restaurant",
      sub_category: "Family Fine Dining",
      description: "Gourmet traditional Indian fine dining restaurant in Delhi offering rich Mughal curries, tandoori grills, and craft traditional desserts.",
      establishment_year: "2015",
      industry_type: "Food & Beverage",
      services: ["Dine-In Experiences", "Corporate Banqueting", "Gourmet Home Delivery", "Catering"],
      products: ["Mughlai Thali", "Truffle Naan Basket", "Saffron Kulfi"],
      certifications: ["FSSAI Food Safety Lic", "ISO 22000 Food Quality"],
      rating: 4.6,
      total_reviews: 310,
      maps_url: "https://maps.google.com/?cid=987653",
      latitude: "28.6139",
      longitude: "77.2090",
      logo_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&auto=format&fit=crop&q=60",
      opening_hours: "11:00 AM",
      closed_hours: "11:00 PM",
      business_status: "Active",
      has_website: true,
      has_email: false,
      created_at: (/* @__PURE__ */ new Date("2026-05-15T18:30:00.000Z")).toISOString()
    },
    {
      id: "b4",
      business_name: "CodeCraft Technologies",
      category: "Software Company",
      sub_category: "SaaS & AI Development",
      description: "Leading enterprise tech partner in Pune crafting high-performance intelligence, ERP systems, Custom CRM databases, and cloud engineering.",
      establishment_year: "2018",
      industry_type: "Information Technology",
      services: ["Product Design", "Cloud Infrastructure Setup", "Generative AI Systems Integration", "Enterprise App Building"],
      products: ["CodeCraft Ledger CRM", "ProcessSync Engine"],
      certifications: ["ISO 27001 Security Standard", "AWS Certified Partner Hub"],
      rating: 4.9,
      total_reviews: 95,
      maps_url: "https://maps.google.com/?cid=787494",
      latitude: "18.5204",
      longitude: "73.8567",
      logo_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=60",
      opening_hours: "09:00 AM",
      closed_hours: "06:00 PM",
      business_status: "Active",
      has_website: true,
      has_email: true,
      created_at: (/* @__PURE__ */ new Date("2026-05-20T09:00:00.000Z")).toISOString()
    }
  ],
  addresses: [
    {
      id: "ad1",
      business_id: "b1",
      full_address: "Subhash Marg, C-Scheme, Jaipur, Rajasthan 302001, India",
      area: "C-Scheme",
      landmark: "Near Central Park Plaza",
      city: "Jaipur",
      district: "Jaipur District",
      state: "Rajasthan",
      country: "India",
      postal_code: "302001"
    },
    {
      id: "ad2",
      business_id: "b2",
      full_address: "12, S.V. Road, Santacruz West, Mumbai, Maharashtra 400054, India",
      area: "Santacruz West",
      landmark: "Opposite Juhu Garden",
      city: "Mumbai",
      district: "Mumbai Suburban",
      state: "Maharashtra",
      country: "India",
      postal_code: "400054"
    },
    {
      id: "ad3",
      business_id: "b3",
      full_address: "Block E, Connaught Place, New Delhi, Delhi 110001, India",
      area: "Connaught Place",
      landmark: "Adjacent Metro Gate 4",
      city: "Delhi",
      district: "New Delhi",
      state: "Delhi",
      country: "India",
      postal_code: "110001"
    },
    {
      id: "ad4",
      business_id: "b4",
      full_address: "Tower 3, IT Park Phase 2, Hinjewadi, Pune, Maharashtra 411057, India",
      area: "Hinjewadi",
      landmark: "Next to Metro Depot Hub",
      city: "Pune",
      district: "Pune",
      state: "Maharashtra",
      country: "India",
      postal_code: "411057"
    }
  ],
  phones: [
    { id: "p1", business_id: "b1", type: "Primary", phone_number: "+91-141-2374621" },
    { id: "p2", business_id: "b1", type: "WhatsApp", phone_number: "+91-9829034411" },
    { id: "p3", business_id: "b2", type: "Primary", phone_number: "+91-22-68449000" },
    { id: "p4", business_id: "b2", type: "Toll Free", phone_number: "1800-410-APEX" },
    { id: "p5", business_id: "b3", type: "Primary", phone_number: "+91-11-23348655" },
    { id: "p6", business_id: "b4", type: "Primary", phone_number: "+91-20-41002233" },
    { id: "p7", business_id: "b4", type: "Mobile", phone_number: "+91-9922003344" }
  ],
  emails: [
    { id: "e1", business_id: "b1", type: "Inquiry", email_address: "info@maharanigirlsjaipur.edu.in" },
    { id: "e2", business_id: "b1", type: "Primary", email_address: "principal@maharanigirlsjaipur.edu.in" },
    { id: "e3", business_id: "b2", type: "Primary", email_address: "admissions@apex-health.org" },
    { id: "e4", business_id: "b2", type: "Sales", email_address: "insurance@apex-health.org" },
    { id: "e5", business_id: "b4", type: "Primary", email_address: "hello@codecraft-tech.com" },
    { id: "e6", business_id: "b4", type: "Sales", email_address: "rfp@codecraft-tech.com" }
  ],
  websites: [
    {
      id: "w1",
      business_id: "b1",
      website_url: "https://www.maharanigirlsjaipur.edu.in",
      title: "Maharani Girls Sr Sec School, Jaipur | Empowering Women",
      description: "Established in 1943, we specialize in high quality holistic and scientific school girls curricula.",
      ssl_status: true,
      tech_stack: ["WordPress", "Apache", "PHP", "jQuery"]
    },
    {
      id: "w2",
      business_id: "b2",
      website_url: "https://www.apex-health.org",
      title: "Apex Super Speciality Hospital Mumbai | World-Class Surgical Hub",
      description: "With NABH awards and advanced cardiology departments, Apex supports healthy patient recovery.",
      ssl_status: true,
      tech_stack: ["Next.js", "Tailwind CSS", "React", "Node.js"]
    },
    {
      id: "w3",
      business_id: "b3",
      website_url: "https://www.goldenleafdining.co.in",
      title: "The Golden Leaf CP | Best Mughlai Cuisine & Desi Fine Dining",
      description: "Experience royal recipe blends crafted over direct open-fire charcoal spits and tandoors.",
      ssl_status: true,
      tech_stack: ["Shopify", "Webflow", "Cloudflare"]
    },
    {
      id: "w4",
      business_id: "b4",
      website_url: "https://www.codecraft-tech.com",
      title: "CodeCraft Technologies | Custom SaaS & Enterprise Software Experts",
      description: "Scale your workflow outputs using advanced modern software architecture built to flex.",
      ssl_status: true,
      tech_stack: ["React", "Vite", "Express", "PostgreSQL", "Tailwind CSS"]
    }
  ],
  images: [
    { id: "img1", business_id: "b1", type: "logo", image_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=60" },
    { id: "img2", business_id: "b1", type: "featured", image_url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=60" },
    { id: "img3", business_id: "b2", type: "featured", image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=60" },
    { id: "img4", business_id: "b2", type: "cover", image_url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=60" },
    { id: "img5", business_id: "b3", type: "featured", image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60" },
    { id: "img6", business_id: "b4", type: "featured", image_url: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&auto=format&fit=crop&q=60" }
  ],
  social_links: [
    { id: "s1", business_id: "b1", platform: "facebook", profile_url: "https://facebook.com/maharanigirlsjaipur" },
    { id: "s2", business_id: "b2", platform: "linkedin", profile_url: "https://linkedin.com/company/apex-hospital-mumbai" },
    { id: "s3", business_id: "b3", platform: "instagram", profile_url: "https://instagram.com/goldenleafdining" },
    { id: "s4", business_id: "b4", platform: "linkedin", profile_url: "https://linkedin.com/company/codecraft-tech" },
    { id: "s5", business_id: "b4", platform: "twitter", profile_url: "https://twitter.com/codecraft_tech" }
  ],
  reviews: [
    { id: "r1", business_id: "b1", author: "Rajendra Prasad", rating: 5, review_text: "Perfect traditional school layout and outstanding, highly disciplined faculty support.", review_date: "2026-04-12" },
    { id: "r2", business_id: "b1", author: "Pooja Sharma", rating: 4, review_text: "Wonderful historical infrastructure. Very trusted educational hub in Jaipur.", review_date: "2026-03-24" },
    { id: "r3", business_id: "b2", author: "Suresh Patel", rating: 5, review_text: "The cardiology department saved my father. The nursing care was extremely prompt and kind.", review_date: "2026-05-01" },
    { id: "r4", business_id: "b3", author: "Ananya Sen", rating: 4, review_text: "Food is delicious but booking is absolutely mandatory on weekends. Amazing tandoori broccoli!", review_date: "2026-05-14" },
    { id: "r5", business_id: "b4", author: "David Thorne", rating: 5, review_text: "CodeCraft shipped our logistics portal 2 weeks ahead of schedule. Flawless clean TypeScript/Node stack.", review_date: "2026-05-22" }
  ],
  contacts: [
    { id: "c1", business_id: "b1", name: "Dr. Sunita Chowdhury", designation: "Principal", email: "principal@maharanigirlsjaipur.edu.in", phone: "+91-141-2374621" },
    { id: "c2", business_id: "b2", name: "Dr. Sandeep Kapoor", designation: "Medical Director", email: "skapoor@apex-health.org", phone: "+91-22-68449001" },
    { id: "c3", business_id: "b3", name: "Chef Harish Joshi", designation: "Executive Head Chef" },
    { id: "c4", business_id: "b4", name: "Anish Deshpande", designation: "Founder & CTO", email: "anish@codecraft-tech.com", phone: "+91-9922003344" }
  ]
};
var RelationalDatabase = class {
  constructor() {
    this.schema = {
      businesses: [],
      addresses: [],
      phones: [],
      emails: [],
      websites: [],
      images: [],
      social_links: [],
      reviews: [],
      contacts: []
    };
    this.loadDatabase();
  }
  // Load Database from disk
  loadDatabase() {
    try {
      if (!process.env.VERCEL && !import_fs.default.existsSync(DB_DIR)) {
        import_fs.default.mkdirSync(DB_DIR, { recursive: true });
      }
      if (!process.env.VERCEL && import_fs.default.existsSync(DB_FILE)) {
        const raw = import_fs.default.readFileSync(DB_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        this.schema = {
          businesses: parsed.businesses || [],
          addresses: parsed.addresses || [],
          phones: parsed.phones || [],
          emails: parsed.emails || [],
          websites: parsed.websites || [],
          images: parsed.images || [],
          social_links: parsed.social_links || [],
          reviews: parsed.reviews || [],
          contacts: parsed.contacts || []
        };
        console.log(`[Database] Loaded ${this.schema.businesses.length} businesses from disk.`);
      } else {
        this.schema = INITIAL_SEED;
        this.saveDatabase();
        console.log("[Database] Initialized new relational seed database file.");
      }
    } catch (err) {
      console.error("[Database] Error loading database file. Initializing empty. Error:", err);
      this.schema = INITIAL_SEED;
      this.saveDatabase();
    }
  }
  // Save Database safely to disk (No-op as per real-time API fetch policy)
  saveDatabase() {
  }
  // Generate short ids
  generateId(prefix) {
    return prefix + "_" + Math.random().toString(36).slice(2, 11);
  }
  // Data Quality normalizers & checkers
  normalizePhone(phone) {
    if (!phone) return "";
    let cleaned = phone.replace(/[^0-9+\- ]/g, "").trim();
    return cleaned;
  }
  validateEmail(email) {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmed = email.trim();
    if (!regex.test(trimmed)) return false;
    const lowercase = trimmed.toLowerCase();
    if (lowercase.endsWith("@example.com") || lowercase.endsWith("@test.com")) return false;
    return true;
  }
  validateWebsiteUrl(url) {
    if (!url) return "";
    let trimmed = url.trim().replace(/^https?:\/\/(www\.)?/, "");
    return `https://www.${trimmed}`;
  }
  // Add or Merge/Deduplicate Business Record
  upsertLead(enriched) {
    const normalizedName = (enriched.business_name || "").toLowerCase().trim();
    const city = (enriched.city || "Jaipur").toLowerCase().trim();
    let existingBusiness = this.schema.businesses.find((b) => {
      const nameMatch = b.business_name.toLowerCase().trim() === normalizedName;
      const addr = this.schema.addresses.find((a) => a.business_id === b.id);
      const isSameCity = addr ? addr.city.toLowerCase().trim() === city : false;
      const isMapsMatch = enriched.maps_url && b.maps_url && enriched.maps_url.includes(b.id);
      return nameMatch && isSameCity || isMapsMatch;
    });
    let bId = existingBusiness ? existingBusiness.id : this.generateId("business");
    const cleanArray = (arr) => {
      if (!arr) return [];
      if (Array.isArray(arr)) return arr.map((s) => String(s).trim()).filter(Boolean);
      return String(arr).split(",").map((s) => s.trim()).filter(Boolean);
    };
    const logo = enriched.logo_url || enriched.logo_url || "";
    const businessRow = {
      id: bId,
      business_name: enriched.business_name || "Unnamed Business",
      category: enriched.category || "General",
      sub_category: enriched.sub_category || existingBusiness?.sub_category || "",
      description: enriched.description || existingBusiness?.description || "Public listings representation.",
      establishment_year: enriched.establishment_year || existingBusiness?.establishment_year || "",
      industry_type: enriched.industry_type || existingBusiness?.industry_type || "",
      services: cleanArray(enriched.services),
      products: cleanArray(enriched.products),
      certifications: cleanArray(enriched.certifications),
      rating: enriched.rating !== void 0 ? enriched.rating : existingBusiness?.rating || 0,
      total_reviews: enriched.reviews_count !== void 0 ? enriched.reviews_count : existingBusiness?.total_reviews || 0,
      maps_url: enriched.maps_url || existingBusiness?.maps_url || "",
      latitude: enriched.latitude || existingBusiness?.latitude || "",
      longitude: enriched.longitude || existingBusiness?.longitude || "",
      logo_url: logo || existingBusiness?.logo_url || "",
      opening_hours: enriched.opening_hours || existingBusiness?.opening_hours || "",
      closed_hours: enriched.closing_hours || existingBusiness?.closed_hours || "",
      business_status: enriched.business_status || existingBusiness?.business_status || "Active",
      has_website: !!(enriched.website_url || existingBusiness?.has_website),
      has_email: !!(enriched.email_address || existingBusiness?.has_email),
      created_at: existingBusiness?.created_at || (/* @__PURE__ */ new Date()).toISOString()
    };
    if (existingBusiness) {
      const mergedServices = Array.from(/* @__PURE__ */ new Set([...existingBusiness.services || [], ...businessRow.services || []]));
      businessRow.services = mergedServices;
      const idx = this.schema.businesses.findIndex((b) => b.id === bId);
      this.schema.businesses[idx] = businessRow;
    } else {
      this.schema.businesses.push(businessRow);
    }
    const existingAddr = this.schema.addresses.find((a) => a.business_id === bId);
    const addressRow = {
      id: existingAddr ? existingAddr.id : this.generateId("address"),
      business_id: bId,
      full_address: enriched.full_address || existingAddr?.full_address || "No Address Provided",
      area: enriched.area || existingAddr?.area || "",
      landmark: enriched.landmark || existingAddr?.landmark || "",
      city: enriched.city || existingAddr?.city || "Jaipur",
      district: enriched.district || existingAddr?.district || "",
      state: enriched.state || existingAddr?.state || "",
      country: enriched.country || existingAddr?.country || "India",
      postal_code: enriched.postal_code || existingAddr?.postal_code || ""
    };
    if (existingAddr) {
      const idx = this.schema.addresses.findIndex((a) => a.id === existingAddr.id);
      this.schema.addresses[idx] = addressRow;
    } else {
      this.schema.addresses.push(addressRow);
    }
    this.schema.phones = this.schema.phones.filter((p) => p.business_id !== bId);
    this.schema.emails = this.schema.emails.filter((e) => e.business_id !== bId);
    this.schema.websites = this.schema.websites.filter((w) => w.business_id !== bId);
    this.schema.images = this.schema.images.filter((i) => i.business_id !== bId);
    this.schema.social_links = this.schema.social_links.filter((s) => s.business_id !== bId);
    this.schema.reviews = this.schema.reviews.filter((r) => r.business_id !== bId);
    this.schema.contacts = this.schema.contacts.filter((c) => c.business_id !== bId);
    if (enriched.primary_phone) {
      this.schema.phones.push({
        id: this.generateId("phone"),
        business_id: bId,
        type: "Primary",
        phone_number: this.normalizePhone(enriched.primary_phone)
      });
    }
    if (enriched.secondary_phone) {
      this.schema.phones.push({
        id: this.generateId("phone"),
        business_id: bId,
        type: "Secondary",
        phone_number: this.normalizePhone(enriched.secondary_phone)
      });
    }
    if (enriched.whatsapp_number) {
      this.schema.phones.push({
        id: this.generateId("phone"),
        business_id: bId,
        type: "WhatsApp",
        phone_number: this.normalizePhone(enriched.whatsapp_number)
      });
    }
    if (enriched.toll_free) {
      this.schema.phones.push({
        id: this.generateId("phone"),
        business_id: bId,
        type: "Toll Free",
        phone_number: this.normalizePhone(enriched.toll_free)
      });
    }
    if (enriched.email_address && this.validateEmail(enriched.email_address)) {
      this.schema.emails.push({
        id: this.generateId("email"),
        business_id: bId,
        type: "Primary",
        email_address: enriched.email_address.trim().toLowerCase()
      });
    }
    if (enriched.alternate_email && this.validateEmail(enriched.alternate_email)) {
      this.schema.emails.push({
        id: this.generateId("email"),
        business_id: bId,
        type: "Alternate",
        email_address: enriched.alternate_email.trim().toLowerCase()
      });
    }
    if (enriched.inquiry_email && this.validateEmail(enriched.inquiry_email)) {
      this.schema.emails.push({
        id: this.generateId("email"),
        business_id: bId,
        type: "Inquiry",
        email_address: enriched.inquiry_email.trim().toLowerCase()
      });
    }
    if (enriched.sales_email && this.validateEmail(enriched.sales_email)) {
      this.schema.emails.push({
        id: this.generateId("email"),
        business_id: bId,
        type: "Sales",
        email_address: enriched.sales_email.trim().toLowerCase()
      });
    }
    if (enriched.support_email && this.validateEmail(enriched.support_email)) {
      this.schema.emails.push({
        id: this.generateId("email"),
        business_id: bId,
        type: "Support",
        email_address: enriched.support_email.trim().toLowerCase()
      });
    }
    if (enriched.website_url) {
      this.schema.websites.push({
        id: this.generateId("website"),
        business_id: bId,
        website_url: this.validateWebsiteUrl(enriched.website_url),
        title: enriched.website_title || "",
        description: enriched.website_description || "",
        ssl_status: enriched.ssl_status !== void 0 ? enriched.ssl_status : true,
        tech_stack: cleanArray(enriched.technology_stack)
      });
    }
    if (logo) {
      this.schema.images.push({
        id: this.generateId("img"),
        business_id: bId,
        type: "logo",
        image_url: logo
      });
    }
    if (enriched.featured_image) {
      this.schema.images.push({
        id: this.generateId("img"),
        business_id: bId,
        type: "featured",
        image_url: enriched.featured_image
      });
    }
    if (enriched.cover_image) {
      this.schema.images.push({
        id: this.generateId("img"),
        business_id: bId,
        type: "cover",
        image_url: enriched.cover_image
      });
    }
    if (enriched.image_urls) {
      enriched.image_urls.forEach((url) => {
        if (url) {
          this.schema.images.push({
            id: this.generateId("img"),
            business_id: bId,
            type: "gallery",
            image_url: url
          });
        }
      });
    }
    const platforms = [
      "facebook",
      "instagram",
      "linkedin",
      "twitter",
      "youtube",
      "tiktok"
    ];
    platforms.forEach((plat) => {
      const key = `${plat}_url`;
      if (enriched[key]) {
        this.schema.social_links.push({
          id: this.generateId("social"),
          business_id: bId,
          platform: plat,
          profile_url: String(enriched[key]).trim()
        });
      }
    });
    if (enriched.contact_person_name) {
      this.schema.contacts.push({
        id: this.generateId("contact"),
        business_id: bId,
        name: enriched.contact_person_name,
        designation: enriched.designation || "Contact Person",
        email: enriched.inquiry_email || enriched.email_address || "",
        phone: enriched.primary_phone || ""
      });
    }
    if (enriched.owner_name) {
      this.schema.contacts.push({
        id: this.generateId("contact"),
        business_id: bId,
        name: enriched.owner_name,
        designation: "Owner",
        email: enriched.sales_email || "",
        phone: enriched.primary_phone || ""
      });
    }
    if (enriched.manager_name) {
      this.schema.contacts.push({
        id: this.generateId("contact"),
        business_id: bId,
        name: enriched.manager_name,
        designation: "Manager",
        email: enriched.support_email || "",
        phone: enriched.secondary_phone || ""
      });
    }
    this.saveDatabase();
    return this.assembleEnrichedLead(bId);
  }
  // Compile a fully joined, flat relational interface for API consumption
  assembleEnrichedLead(businessId) {
    const b = this.schema.businesses.find((item) => item.id === businessId);
    if (!b) return null;
    const ad = this.schema.addresses.find((item) => item.business_id === b.id) || {
      full_address: "No Address Provided",
      city: "Jaipur",
      country: "India"
    };
    const phones = this.schema.phones.filter((item) => item.business_id === b.id);
    const emails = this.schema.emails.filter((item) => item.business_id === b.id);
    const web = this.schema.websites.find((item) => item.business_id === b.id);
    const images = this.schema.images.filter((item) => item.business_id === b.id);
    const socials = this.schema.social_links.filter((item) => item.business_id === b.id);
    const contacts = this.schema.contacts.filter((item) => item.business_id === b.id);
    return {
      id: b.id,
      business_name: b.business_name,
      category: b.category,
      sub_category: b.sub_category,
      description: b.description,
      establishment_year: b.establishment_year,
      industry_type: b.industry_type,
      services: b.services || [],
      products: b.products || [],
      certifications: b.certifications || [],
      business_status: b.business_status,
      // Address elements
      full_address: ad.full_address,
      city: ad.city,
      district: ad.district,
      state: ad.state,
      country: ad.country,
      postal_code: ad.postal_code,
      latitude: b.latitude,
      longitude: b.longitude,
      maps_url: b.maps_url,
      // Phones
      primary_phone: phones.find((p) => p.type === "Primary")?.phone_number || phones[0]?.phone_number || "",
      secondary_phone: phones.find((p) => p.type === "Secondary")?.phone_number || "",
      whatsapp_number: phones.find((p) => p.type === "WhatsApp")?.phone_number || "",
      toll_free: phones.find((p) => p.type === "Toll Free")?.phone_number || "",
      // Emails
      email_address: emails.find((e) => e.type === "Primary")?.email_address || emails[0]?.email_address || "",
      alternate_email: emails.find((e) => e.type === "Alternate")?.email_address || "",
      // Website URL
      website_url: web?.website_url || "",
      // Google particulars
      rating: b.rating,
      reviews_count: b.total_reviews,
      opening_hours: b.opening_hours,
      closing_hours: b.closed_hours,
      // Asset associations
      logo_url: b.logo_url || images.find((img) => img.type === "logo")?.image_url || "",
      featured_image: images.find((img) => img.type === "featured")?.image_url || "",
      cover_image: images.find((img) => img.type === "cover")?.image_url || "",
      image_urls: images.filter((img) => img.type === "gallery").map((img) => img.image_url),
      // Platforms URLs
      facebook_url: socials.find((s) => s.platform === "facebook")?.profile_url || "",
      instagram_url: socials.find((s) => s.platform === "instagram")?.profile_url || "",
      linkedin_url: socials.find((s) => s.platform === "linkedin")?.profile_url || "",
      twitter_url: socials.find((s) => s.platform === "twitter")?.profile_url || "",
      youtube_url: socials.find((s) => s.platform === "youtube")?.profile_url || "",
      tiktok_url: socials.find((s) => s.platform === "tiktok")?.profile_url || "",
      // Website metadata stack
      website_title: web?.title || "",
      website_description: web?.description || "",
      ssl_status: web?.ssl_status,
      technology_stack: web?.tech_stack || [],
      // Inside Contacts
      contact_person_name: contacts.find((c) => c.designation !== "Owner" && c.designation !== "Manager")?.name || contacts[0]?.name || "",
      designation: contacts.find((c) => c.designation !== "Owner" && c.designation !== "Manager")?.designation || contacts[0]?.designation || "",
      owner_name: contacts.find((c) => c.designation === "Owner")?.name || "",
      manager_name: contacts.find((c) => c.designation === "Manager")?.name || "",
      inquiry_email: emails.find((e) => e.type === "Inquiry")?.email_address || "",
      sales_email: emails.find((e) => e.type === "Sales")?.email_address || "",
      support_email: emails.find((e) => e.type === "Support")?.email_address || "",
      created_at: b.created_at
    };
  }
  // Get and Search Leads with comprehensive filter metrics
  searchLeads(filters) {
    const {
      keyword,
      city,
      district,
      state,
      country,
      category,
      minRating,
      hasWebsite,
      hasEmail
    } = filters;
    const kw = (keyword || "").toLowerCase().trim();
    const ct = (city || "").toLowerCase().trim();
    const dst = (district || "").toLowerCase().trim();
    const st = (state || "").toLowerCase().trim();
    const cnt = (country || "").toLowerCase().trim();
    const cat = (category || "").toLowerCase().trim();
    return this.schema.businesses.map((b) => this.assembleEnrichedLead(b.id)).filter((lead) => {
      if (!lead) return false;
      if (kw) {
        const bName = (lead.business_name || "").toLowerCase();
        const bCat = (lead.category || "").toLowerCase();
        const bSub = (lead.sub_category || "").toLowerCase();
        const bDesc = (lead.description || "").toLowerCase();
        let matchName = bName.includes(kw) || kw.includes(bName);
        let matchCategory = bCat.includes(kw) || kw.includes(bCat);
        let matchSub = bSub.includes(kw) || kw.includes(bSub);
        let matchDesc = bDesc.includes(kw) || kw.includes(bDesc);
        let matchServices = (lead.services || []).some((s) => (s || "").toLowerCase().includes(kw));
        if (!matchName && !matchCategory && !matchSub && !matchDesc && !matchServices) {
          const terms = kw.split(/\s+/).filter((t) => t.length > 2);
          if (terms.length > 0) {
            const hasTermMatch = terms.some((term) => {
              const singular = term.endsWith("s") ? term.slice(0, -1) : term;
              return bName.includes(singular) || bCat.includes(singular) || bSub.includes(singular) || bDesc.includes(singular);
            });
            if (!hasTermMatch) {
              return false;
            }
          } else {
            return false;
          }
        }
      }
      if (ct && (lead.city || "").toLowerCase().trim() !== ct) return false;
      if (dst && (!lead.district || !lead.district.toLowerCase().includes(dst))) return false;
      if (st && (!lead.state || !lead.state.toLowerCase().includes(st))) return false;
      if (cnt && (!lead.country || !lead.country.toLowerCase().includes(cnt))) return false;
      if (cat && lead.category.toLowerCase().trim() !== cat) return false;
      if (minRating !== void 0 && lead.rating < minRating) return false;
      if (hasWebsite === true && !lead.website_url) return false;
      if (hasEmail === true && !lead.email_address) return false;
      return true;
    });
  }
  // Debug function to check lists
  getStats() {
    return {
      businesses: this.schema.businesses.length,
      addresses: this.schema.addresses.length,
      phones: this.schema.phones.length,
      emails: this.schema.emails.length,
      websites: this.schema.websites.length,
      images: this.schema.images.length,
      socials: this.schema.social_links.length,
      reviews: this.schema.reviews.length,
      contacts: this.schema.contacts.length
    };
  }
};
var dbInstance = new RelationalDatabase();

// server.ts
var import_genai = require("@google/genai");
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use(import_express.default.json());
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 1122;
var isProd = process.env.NODE_ENV === "production";
var activeJobs = /* @__PURE__ */ new Map();
app.get("/api/businesses", (req, res) => {
  try {
    const filters = {
      keyword: req.query.keyword || "",
      city: req.query.city || "",
      limit: parseInt(req.query.limit) || 20,
      district: req.query.district || void 0,
      state: req.query.state || void 0,
      country: req.query.country || void 0,
      category: req.query.category || void 0,
      minRating: req.query.minRating ? parseFloat(req.query.minRating) : void 0,
      hasWebsite: req.query.hasWebsite === "true" ? true : void 0,
      hasEmail: req.query.hasEmail === "true" ? true : void 0
    };
    let data = dbInstance.searchLeads(filters);
    console.log(`[GET /api/businesses] Received query: keyword="${filters.keyword}", city="${filters.city}", list matches count: ${data.length}`);
    const totalFound = data.length;
    const sortBy = req.query.sortBy || "created_at";
    const sortOrder = req.query.sortOrder || "desc";
    data.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (typeof valA === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }
      return 0;
    });
    const returned = Math.min(filters.limit, data.length);
    const sliced = data.slice(0, returned);
    res.json({
      total_found: totalFound,
      returned,
      page: 1,
      data: sliced
    });
  } catch (err) {
    console.error("[API Error] businesses:", err);
    res.status(500).json({ error: err.message || "Failed to query businesses" });
  }
});
app.get("/api/db/stats", (req, res) => {
  res.json(dbInstance.getStats());
});
app.post("/api/db/clear", (req, res) => {
  try {
    const dbFile = import_path2.default.join(process.cwd(), "data", "database.json");
    if (!process.env.VERCEL && import_fs2.default.existsSync(dbFile)) {
      import_fs2.default.writeFileSync(dbFile, JSON.stringify({
        businesses: [],
        addresses: [],
        phones: [],
        emails: [],
        websites: [],
        images: [],
        social_links: [],
        reviews: [],
        contacts: []
      }, null, 2), "utf-8");
    }
    dbInstance["schema"] = {
      businesses: [],
      addresses: [],
      phones: [],
      emails: [],
      websites: [],
      images: [],
      social_links: [],
      reviews: [],
      contacts: []
    };
    dbInstance["saveDatabase"]();
    res.json({ success: true, message: "Relational database cleared successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to clear database" });
  }
});
app.get("/api/scrapers/jobs", (req, res) => {
  res.json(Array.from(activeJobs.values()).sort((a, b) => b.startedAt.localeCompare(a.startedAt)));
});
app.get("/api/scrapers/jobs/:id", (req, res) => {
  const job = activeJobs.get(req.params.id);
  if (!job) {
    return res.status(404).json({ error: "Job space not found" });
  }
  res.json(job);
});
app.post("/api/scrapers/jobs/:id/cancel", (req, res) => {
  const job = activeJobs.get(req.params.id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  if (job.status === "running") {
    job.status = "failed";
    job.error = "Cancelled by user";
    job.completedAt = (/* @__PURE__ */ new Date()).toISOString();
    activeJobs.set(job.id, job);
    return res.json({ success: true, message: "Job cancelled successfully." });
  }
  res.json({ success: false, message: "Job is not in running state." });
});
app.post("/api/scrapers/run", async (req, res) => {
  try {
    const { keyword, city, limit, district, state, country, category, minRating, hasWebsite, hasEmail } = req.body;
    if (!keyword || !city) {
      return res.status(400).json({ error: "Keyword and City are required to run scraper" });
    }
    const requestedLimit = parseInt(limit) || 12;
    const jobId = "job_" + Math.random().toString(36).slice(2, 11);
    dbInstance["schema"] = {
      businesses: [],
      addresses: [],
      phones: [],
      emails: [],
      websites: [],
      images: [],
      social_links: [],
      reviews: [],
      contacts: []
    };
    dbInstance["saveDatabase"]();
    activeJobs.clear();
    const newJob = {
      id: jobId,
      keyword,
      city,
      limit: requestedLimit,
      status: "running",
      progress: 0,
      totalRequested: requestedLimit,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      filters: { district, state, country, category, minRating, hasWebsite, hasEmail }
    };
    activeJobs.set(jobId, newJob);
    triggerDirectScraper(newJob).catch((err) => console.error("[Scraper] Background job error:", err));
    res.json(newJob);
  } catch (err) {
    console.error("[API Error] run scraper:", err);
    res.status(500).json({ error: err.message || "Failed to trigger direct fetch from directory API" });
  }
});
function escapeCsv(val) {
  if (val === void 0 || val === null) return "";
  if (Array.isArray(val)) val = val.join(", ");
  let str = String(val);
  str = str.replace(/"/g, '""');
  if (str.includes(",") || str.includes("\n") || str.includes("\r") || str.includes('"')) {
    return `"${str}"`;
  }
  return str;
}
app.get("/api/export", (req, res) => {
  try {
    const filters = {
      keyword: req.query.keyword || "",
      city: req.query.city || "",
      limit: parseInt(req.query.limit) || 1e3,
      // export higher pool by default
      district: req.query.district || void 0,
      state: req.query.state || void 0,
      country: req.query.country || void 0,
      category: req.query.category || void 0,
      minRating: req.query.minRating ? parseFloat(req.query.minRating) : void 0,
      hasWebsite: req.query.hasWebsite === "true" ? true : void 0,
      hasEmail: req.query.hasEmail === "true" ? true : void 0
    };
    const format = req.query.format || "csv";
    const data = dbInstance.searchLeads(filters);
    if (format === "json") {
      res.setHeader("Content-Disposition", 'attachment; filename="leads_export.json"');
      res.setHeader("Content-Type", "application/json");
      return res.json(data);
    }
    const headers = [
      "ID",
      "Business Name",
      "Category",
      "Sub Category",
      "Description",
      "Establishment Year",
      "Industry",
      "Services",
      "Products",
      "Certifications",
      "Status",
      "Full Address",
      "City",
      "District",
      "State",
      "Country",
      "Postal Code",
      "Latitude",
      "Longitude",
      "Maps URL",
      "Primary Phone",
      "Secondary Phone",
      "WhatsApp",
      "Toll Free",
      "Email Address",
      "Alternate Email",
      "Website URL",
      "Google Rating",
      "Reviews Count",
      "Opening Hours",
      "Closing Hours",
      "Logo URL",
      "Cover Image",
      "Facebook",
      "Instagram",
      "LinkedIn",
      "Twitter",
      "YouTube",
      "TikTok",
      "Website Title",
      "Website Description",
      "SSL Enabled",
      "Tech Stack",
      "Contact Name",
      "Designation",
      "Owner Name",
      "Manager Name",
      "Inquiry Email",
      "Sales Email",
      "Support Email",
      "Created At"
    ];
    const rows = data.map((item) => [
      item.id,
      item.business_name,
      item.category,
      item.sub_category || "",
      item.description || "",
      item.establishment_year || "",
      item.industry_type || "",
      item.services,
      item.products,
      item.certifications,
      item.business_status,
      item.full_address,
      item.city,
      item.district || "",
      item.state || "",
      item.country,
      item.postal_code || "",
      item.latitude || "",
      item.longitude || "",
      item.maps_url || "",
      item.primary_phone || "",
      item.secondary_phone || "",
      item.whatsapp_number || "",
      item.toll_free || "",
      item.email_address || "",
      item.alternate_email || "",
      item.website_url || "",
      item.rating,
      item.reviews_count,
      item.opening_hours || "",
      item.closing_hours || "",
      item.logo_url || "",
      item.cover_image || "",
      item.facebook_url || "",
      item.instagram_url || "",
      item.linkedin_url || "",
      item.twitter_url || "",
      item.youtube_url || "",
      item.tiktok_url || "",
      item.website_title || "",
      item.website_description || "",
      item.ssl_status,
      item.technology_stack,
      item.contact_person_name || "",
      item.designation || "",
      item.owner_name || "",
      item.manager_name || "",
      item.inquiry_email || "",
      item.sales_email || "",
      item.support_email || "",
      item.created_at
    ]);
    if (format === "xlsx") {
      res.setHeader("Content-Disposition", 'attachment; filename="leads_export.xlsx"');
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      const tsvContent = [
        headers.join("	"),
        ...rows.map((r) => r.map((v) => String(v).replace(/\t/g, " ").replace(/\r?\n/g, " ")).join("	"))
      ].join("\n");
      return res.send(Buffer.from(tsvContent));
    }
    if (format === "zip") {
      res.setHeader("Content-Disposition", 'attachment; filename="leads_export.zip"');
      res.setHeader("Content-Type", "application/zip");
      const readme = "--- LEAD GENERATION ZIP ARCHIVE ---\nContains leads in CSV and JSON formats.\n\nGenerated on " + (/* @__PURE__ */ new Date()).toISOString() + "\n";
      const csvStr = [headers.map(escapeCsv).join(","), ...rows.map((r) => r.map(escapeCsv).join(","))].join("\n");
      const jsonStr = JSON.stringify(data, null, 2);
      return res.send(Buffer.from(csvStr));
    }
    const csvContent = [
      headers.map(escapeCsv).join(","),
      ...rows.map((r) => r.map(escapeCsv).join(","))
    ].join("\n");
    res.setHeader("Content-Disposition", 'attachment; filename="leads_export.csv"');
    res.setHeader("Content-Type", "text/csv");
    res.send(csvContent);
  } catch (err) {
    console.error("[API Error] export:", err);
    res.status(500).json({ error: err.message || "Failed to generate export file" });
  }
});
async function triggerDirectScraper(job) {
  console.log(`[Scraper] Starting Google Places API Search for "${job.keyword}" in "${job.city}" (limit: ${job.limit})`);
  try {
    const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || "";
    if (!API_KEY || API_KEY === "YOUR_API_KEY") {
      throw new Error("GOOGLE_MAPS_PLATFORM_KEY is missing. Please add it via AI Studio Settings -> Secrets or wait for the UI popup.");
    }
    const needed = job.limit || 20;
    const textQuery = `${job.keyword} in ${job.city}`;
    console.log(`[Scraper Core] Invoking Google Places API for textQuery: "${textQuery}"`);
    let count = 0;
    let pageToken = void 0;
    while (count < needed) {
      const pageSize = Math.min(needed - count, 20);
      const requestBody = {
        textQuery,
        pageSize
      };
      if (pageToken) {
        requestBody.pageToken = pageToken;
      }
      const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.primaryTypeDisplayName,places.types,places.editorialSummary,places.location,nextPageToken"
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        let errDetails = await response.text();
        throw new Error(`Google Places API Error: ${response.status} ${errDetails}`);
      }
      const data = await response.json();
      const items = data.places || [];
      for (const place of items) {
        if (count >= needed) break;
        const item = {
          id: place.id,
          business_name: place.displayName?.text || "Unknown name",
          category: place.primaryTypeDisplayName?.text || job.keyword,
          description: place.editorialSummary?.text || "",
          services: place.types || [],
          full_address: place.formattedAddress || "",
          city: job.city,
          primary_phone: place.nationalPhoneNumber || "",
          email_address: "",
          website_url: place.websiteUri || "",
          rating: place.rating || 0,
          reviews_count: place.userRatingCount || 0,
          latitude: place.location?.latitude ? String(place.location.latitude) : "",
          longitude: place.location?.longitude ? String(place.location.longitude) : "",
          maps_url: place.id ? `https://www.google.com/maps/place/?q=place_id:${place.id}` : "",
          business_status: "Active"
        };
        if (item.business_name && item.business_name !== "Unknown name") {
          dbInstance.upsertLead(item);
          count++;
        }
      }
      const activeJob = activeJobs.get(job.id);
      if (activeJob && activeJob.status === "running") {
        activeJob.progress = count;
        activeJobs.set(job.id, activeJob);
      } else if (activeJob && activeJob.status === "cancelled") {
        console.log(`[Scraper Core] Job ${job.id} cancelled. Stopping.`);
        break;
      }
      pageToken = data.nextPageToken;
      if (!pageToken || count >= needed) {
        break;
      }
    }
    const updatedJob = activeJobs.get(job.id);
    if (updatedJob) {
      updatedJob.status = "completed";
      updatedJob.progress = count;
      updatedJob.completedAt = (/* @__PURE__ */ new Date()).toISOString();
      activeJobs.set(job.id, updatedJob);
    }
    console.log(`[Scraper Core] Successfully sourced, parsed, and merged ${count} real live listings using Google Places API.`);
  } catch (err) {
    const briefReason = typeof err.message === "string" && err.message.length > 0 ? err.message : String(err);
    console.log(`[Sync Warning] Direct Places API fetch error (${briefReason}). Job failed.`);
    const failedJob = activeJobs.get(job.id);
    if (failedJob) {
      failedJob.status = "failed";
      failedJob.error = briefReason;
      failedJob.completedAt = (/* @__PURE__ */ new Date()).toISOString();
      activeJobs.set(job.id, failedJob);
    }
    throw err;
  }
}
if (isProd) {
  app.use(import_express.default.static(import_path2.default.join(process.cwd(), "dist")));
  app.get("*", (req, res) => {
    res.sendFile(import_path2.default.join(process.cwd(), "dist", "index.html"));
  });
} else {
  import("vite").then(async (Vite) => {
    const viteServer = await Vite.createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== "true"
      },
      appType: "spa"
    });
    app.use(viteServer.middlewares);
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = import_fs2.default.readFileSync(import_path2.default.join(process.cwd(), "index.html"), "utf-8");
        template = await viteServer.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        viteServer.ssrFixStacktrace(e);
        next(e);
      }
    });
  });
}
if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Business Intelligence Platform running at http://0.0.0.0:${PORT}`);
  });
}
var server_default = app;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
