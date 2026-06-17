/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Core types for our Business Intelligence & Lead Generation Platform

export interface Business {
  id: string; // unique UUID or ID
  business_name: string;
  category_id?: string;
  category: string;
  sub_category?: string;
  description: string;
  establishment_year?: string;
  industry_type?: string;
  services: string[]; // string array
  products?: string[];
  certifications?: string[];
  rating: number; // Google Business rating
  total_reviews: number;
  maps_url?: string;
  latitude?: string;
  longitude?: string;
  logo_url?: string;
  opening_hours?: string;
  closed_hours?: string;
  business_status: "Active" | "Temporarily Closed" | "Permanently Closed";
  has_website: boolean;
  has_email: boolean;
  created_at: string;
}

export interface BusinessAddress {
  id: string;
  business_id: string;
  full_address: string;
  area?: string;
  landmark?: string;
  city: string;
  district?: string;
  state?: string;
  country: string;
  postal_code?: string;
}

export interface BusinessPhone {
  id: string;
  business_id: string;
  type: "Primary" | "Secondary" | "Mobile" | "WhatsApp" | "Toll Free";
  phone_number: string;
}

export interface BusinessEmail {
  id: string;
  business_id: string;
  type: "Primary" | "Inquiry" | "Sales" | "Support" | "Alternate";
  email_address: string;
}

export interface BusinessWebsite {
  id: string;
  business_id: string;
  website_url: string;
  title?: string;
  description?: string;
  ssl_status: boolean;
  tech_stack: string[];
}

export interface BusinessImage {
  id: string;
  business_id: string;
  type: "logo" | "featured" | "cover" | "gallery" | "maps_photo";
  image_url: string;
}

export interface BusinessSocialLink {
  id: string;
  business_id: string;
  platform: "facebook" | "instagram" | "linkedin" | "twitter" | "youtube" | "tiktok";
  profile_url: string;
}

export interface BusinessReview {
  id: string;
  business_id: string;
  author: string;
  rating: number;
  review_text: string;
  review_date?: string;
}

export interface BusinessContact {
  id: string;
  business_id: string;
  name: string;
  designation: string; // e.g., Owner, Manager, Principal
  email?: string;
  phone?: string;
}

// Aggregated shape for lead viewing and API endpoints
export interface EnrichedBusinessLead {
  id: string;
  business_name: string;
  category: string;
  sub_category?: string;
  description: string;
  establishment_year?: string;
  industry_type?: string;
  services: string[];
  products: string[];
  certifications: string[];
  business_status: string;
  
  // Location
  full_address: string;
  area?: string;
  landmark?: string;
  city: string;
  district?: string;
  state?: string;
  country: string;
  postal_code?: string;
  latitude?: string;
  longitude?: string;
  maps_url?: string;

  // Contact
  primary_phone?: string;
  secondary_phone?: string;
  whatsapp_number?: string;
  toll_free?: string;
  email_address?: string;
  alternate_email?: string;
  website_url?: string;

  // Google profile details
  rating: number;
  reviews_count: number;
  opening_hours?: string;
  closing_hours?: string;

  // Asset links
  logo_url?: string;
  featured_image?: string;
  cover_image?: string;
  image_urls: string[]; // gallery images

  // Socials
  facebook_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  youtube_url?: string;
  tiktok_url?: string;

  // Web properties
  website_title?: string;
  website_description?: string;
  ssl_status?: boolean;
  technology_stack: string[];

  // Lead Generation details
  contact_person_name?: string;
  owner_name?: string;
  manager_name?: string;
  designation?: string;
  inquiry_email?: string;
  sales_email?: string;
  support_email?: string;

  created_at: string;
}

// Scaffold for search configurations
export interface SearchFilters {
  keyword: string;
  city: string;
  limit: number;
  district?: string;
  state?: string;
  country?: string;
  category?: string;
  minRating?: number;
  hasWebsite?: boolean;
  hasEmail?: boolean;
}

// Background Scraping Job representation
export interface ScrapingJob {
  id: string;
  keyword: string;
  city: string;
  limit: number;
  status: "idle" | "running" | "completed" | "failed" | "cancelled";
  progress: number; // records found so far
  totalRequested: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
  filters: Partial<SearchFilters>;
}
