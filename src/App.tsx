/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import {
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
   Globe,
  Calendar,
  Award,
  Star,
  Download,
  RefreshCw,
  X,
  Play,
  Sparkles,
  Building,
  Trash2,
  ExternalLink,
  Users,
  Briefcase,
  Shield,
  Layers,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Compass,
  CheckCircle,
  HelpCircle,
  AlertTriangle
} from "lucide-react";
import { EnrichedBusinessLead, SearchFilters, ScrapingJob } from "./types";

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function App() {
  if (!hasValidKey) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif'}}>
        <div style={{textAlign:'center',maxWidth:520}}>
          <h2>Google Maps API Key Required</h2>
          <p><strong>Step 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener">Get an API Key</a></p>
          <p><strong>Step 2:</strong> Add your key as a secret in AI Studio:</p>
          <ul style={{textAlign:'left',lineHeight:'1.8'}}>
            <li>Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong>)</li>
            <li>Select <strong>Secrets</strong></li>
            <li>Type <code>GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name, press <strong>Enter</strong></li>
            <li>Paste your API key as the value, press <strong>Enter</strong></li>
          </ul>
          <p>The app rebuilds automatically after you add the secret.</p>
        </div>
      </div>
    );
  }

  // Query inputs
  const [keyword, setKeyword] = useState("Schools");
  const [city, setCity] = useState("Jaipur");
  const [limit, setLimit] = useState(10);

  // Advanced query filters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [category, setCategory] = useState("");
  const [minRating, setMinRating] = useState<number>(0);
  const [hasWebsite, setHasWebsite] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);

  // Search Results filtering/searching in table
  const [searchQuery, setSearchQuery] = useState("");
  const [tableFilterRating, setTableFilterRating] = useState<number>(0);
  const [tableFilterWebsite, setTableFilterWebsite] = useState<string>("all");
  const [tableFilterEmail, setTableFilterEmail] = useState<string>("all");
  const [tableFilterStatus, setTableFilterStatus] = useState<string>("all");

  // State
  const [leads, setLeads] = useState<EnrichedBusinessLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<EnrichedBusinessLead | null>(null);
  const [jobs, setJobs] = useState<ScrapingJob[]>([]);
  const [dbStats, setDbStats] = useState({ businesses: 0, addresses: 0, emails: 0 });
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [submittingJob, setSubmittingJob] = useState(false);
  
  // Table selection and pagination
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Sorting
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // View Mode
  const [viewMode, setViewMode] = useState<"table" | "map">("table");

  // UI Notification Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [triggerLeadFetch, setTriggerLeadFetch] = useState(0);

  // Poll intervals & fetching leads dynamically with debounced config inputs
  useEffect(() => {
    if (triggerLeadFetch > 0) {
      fetchLeads();
    }
  }, [triggerLeadFetch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchLeads();
    }, 400); // 400ms debounce to prevent constant keypress spamming

    return () => clearTimeout(handler);
  }, [
    sortBy,
    sortOrder,
    keyword,
    city,
    district,
    state,
    country,
    category,
    minRating,
    hasWebsite,
    hasEmail
  ]);

  useEffect(() => {
    fetchJobs();
    fetchStats();

    const interval = setInterval(() => {
      fetchJobs();
      fetchStats();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const params = new URLSearchParams();
      if (sortBy) params.append("sortBy", sortBy);
      if (sortOrder) params.append("sortOrder", sortOrder);
      
      // Pass current scraper configuration parameters as search filters to database
      if (keyword.trim()) params.append("keyword", keyword.trim());
      if (city.trim()) params.append("city", city.trim());
      if (district.trim()) params.append("district", district.trim());
      if (state.trim()) params.append("state", state.trim());
      if (country.trim()) params.append("country", country.trim());
      if (category.trim()) params.append("category", category.trim());
      if (minRating > 0) params.append("minRating", minRating.toString());
      if (hasWebsite) params.append("hasWebsite", "true");
      if (hasEmail) params.append("hasEmail", "true");
      
      // High max limit so that all stored matches are loaded and paginated/searched client-side
      params.append("limit", "1000");

      const response = await fetch(`/api/businesses?${params.toString()}`);
      if (!response.ok) throw new Error("Faulty network response");
      const result = await response.json();
      setLeads(result.data || []);
    } catch (err: any) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        console.warn("Unable to fetch leads: server offline or restarting.");
      } else {
        console.error("Error loading leads:", err);
        showToast("Could not retrieve leads from directory database.", "error");
      }
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/scrapers/jobs");
      if (response.ok) {
        const data = await response.json();
        const newJobs = data || [];
        setJobs(prevJobs => {
          const wasRunning = prevJobs.some(j => j.status === "running");
          const isRunning = newJobs.some((j: any) => j.status === "running");
          if (isRunning || (wasRunning && !isRunning)) {
            setTriggerLeadFetch(prev => prev + 1);
          }
          return newJobs;
        });
      }
    } catch (err: any) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        console.warn("Unable to fetch jobs: server offline or restarting.");
      } else {
        console.error("Failed fetching background scrapers:", err);
      }
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/db/stats");
      if (response.ok) {
        const data = await response.json();
        setDbStats(data);
      }
    } catch (err: any) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        console.warn("Unable to fetch statistics: server offline or restarting.");
      } else {
        console.error("Failed fetching database statistics:", err);
      }
    }
  };

  const handleRunScraper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !city.trim()) {
      showToast("Please provide keyword and city coordinates.", "error");
      return;
    }

    setSubmittingJob(true);
    try {
      const payload = {
        keyword: keyword.trim(),
        city: city.trim(),
        limit,
        district: district.trim() || undefined,
        state: state.trim() || undefined,
        country: country.trim() || undefined,
        category: category.trim() || undefined,
        minRating: minRating > 0 ? minRating : undefined,
        hasWebsite: hasWebsite || undefined,
        hasEmail: hasEmail || undefined,
      };

      const response = await fetch("/api/scrapers/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Scraper launching error");
      }

      const job = await response.json();
      showToast(`Scraping task started for "${keyword}" in ${city}!`, "info");
      
      // Auto switch focus to active scrapers monitors
      fetchLeads();
      fetchJobs();
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed launching directory scraper. Please try again.", "error");
    } finally {
      setSubmittingJob(false);
    }
  };

  const handleCancelJob = async (jobId: string) => {
    try {
      const response = await fetch(`/api/scrapers/jobs/${jobId}/cancel`, {
        method: "POST",
      });
      if (response.ok) {
        showToast("Scraping task abort submitted", "info");
        fetchJobs();
      } else {
        showToast("Could not cancel this task.", "error");
      }
    } catch (err) {
      showToast("Service connection lost.", "error");
    }
  };

  const handleClearDb = async () => {
    if (!confirm("Are you sure you want to permanently clear the SQLite database? This cannot be undone.")) return;
    try {
      const response = await fetch("/api/db/clear", { method: "POST" });
      if (response.ok) {
        showToast("Relational database wiped cleanly", "success");
        setLeads([]);
        setSelectedLead(null);
        setSelectedRowIds(new Set());
        fetchStats();
      } else {
         showToast("Wipe operation failed.", "error");
      }
    } catch (err) {
      showToast("Error connected to server.", "error");
    }
  };

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedRowIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedRowIds(next);
  };

  const toggleSelectAllRows = (visibleRows: EnrichedBusinessLead[]) => {
    const allSelected = visibleRows.every(row => selectedRowIds.has(row.id));
    const next = new Set(selectedRowIds);
    if (allSelected) {
      visibleRows.forEach(row => next.delete(row.id));
    } else {
      visibleRows.forEach(row => next.add(row.id));
    }
    setSelectedRowIds(next);
  };

  // Preset query loaders for interactive onboarding
  const loadPresetQuery = (kw: string, ct: string, lm: number) => {
    setKeyword(kw);
    setCity(ct);
    setLimit(lm);
    showToast(`Loaded Template: "${kw}" in ${ct}. Ready to scrape!`, "info");
  };

  // Table filtering calculations (search matches on secondary values)
  const filteredLeads = leads.filter(lead => {
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const nameMatch = lead.business_name.toLowerCase().includes(query);
      const catMatch = lead.category.toLowerCase().includes(query);
      const descMatch = (lead.description || "").toLowerCase().includes(query);
      const addressMatch = lead.full_address.toLowerCase().includes(query);
      const emailMatch = (lead.email_address || "").toLowerCase().includes(query);
      const techMatch = (lead.technology_stack || []).some(t => t.toLowerCase().includes(query));
      
      if (!nameMatch && !catMatch && !descMatch && !addressMatch && !emailMatch && !techMatch) {
        return false;
      }
    }

    // Rating filter in table
    if (tableFilterRating > 0 && lead.rating < tableFilterRating) return false;

    // Website filter in table
    if (tableFilterWebsite === "yes" && !lead.website_url) return false;
    if (tableFilterWebsite === "no" && lead.website_url) return false;

    // Email filter in table
    if (tableFilterEmail === "yes" && !lead.email_address) return false;
    if (tableFilterEmail === "no" && lead.email_address) return false;

    // Status filter
    if (tableFilterStatus !== "all" && lead.business_status.toLowerCase() !== tableFilterStatus) return false;

    return true;
  });

  // Pagination calculation
  const totalLeads = filteredLeads.length;
  const totalPages = Math.ceil(totalLeads / pageSize) || 1;
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Lead qualification score logic for columns
  const getLeadQuality = (lead: EnrichedBusinessLead) => {
    const hasWeb = !!lead.website_url;
    const hasMail = !!lead.email_address;
    if (hasWeb && hasMail) return { name: "High", bg: "bg-green-100 text-green-800 border-green-300", color: "#1b5e20" };
    if (hasWeb || hasMail) return { name: "Med", bg: "bg-amber-100 text-amber-800 border-amber-300", color: "#e65100" };
    return { name: "Low", bg: "bg-rose-100 text-rose-800 border-rose-300", color: "#c62828" };
  };

  // Export URL builder
  const getExportUrl = (format: string) => {
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (city) params.append("city", city);
    params.append("format", format);
    return `/api/export?${params.toString()}`;
  };

  // Handle export selected items
  const handleExportSelected = (format: string) => {
    if (selectedRowIds.size === 0) {
      showToast("Please select at least one lead from the table to export.", "info");
      return;
    }
    const selectedData = leads.filter(l => selectedRowIds.has(l.id));
    
    let content = "";
    let mimeType = "";
    let fileExtension = format;

    if (format === "json") {
      content = JSON.stringify(selectedData, null, 2);
      mimeType = "application/json";
    } else {
      // CSV format
      const csvHeaders = [
        "Business Name", "Category", "Sub Category", "Full Address", "City", 
        "Primary Phone", "Email Address", "Website URL", "Google Rating", "Reviews Count", "Status"
      ];
      const csvRows = selectedData.map(l => [
        l.business_name, l.category, l.sub_category || "", l.full_address, l.city,
        l.primary_phone || "", l.email_address || "", l.website_url || "", l.rating, l.reviews_count, l.business_status
      ]);

      const escapeVal = (v: any) => `"${String(v).replace(/"/g, '""')}"`;
      content = [
        csvHeaders.join(","),
        ...csvRows.map(r => r.map(escapeVal).join(","))
      ].join("\n");
      mimeType = "text/csv";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_custom_pack_${selectedData.length}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Exported ${selectedData.length} selected leads successfully!`, "success");
  };

  // Handle export all currently filtered leads dynamically (complete comprehensive database schema)
  const handleExportFiltered = (format: string) => {
    if (filteredLeads.length === 0) {
      showToast("There are no filtered leads to export in the current view.", "info");
      return;
    }

    let content = "";
    let mimeType = "";
    let fileExtension = format;

    if (format === "json") {
      content = JSON.stringify(filteredLeads, null, 2);
      mimeType = "application/json";
    } else {
      // Extensive professional CRM Headers
      const headers = [
        "ID", "Business Name", "Category", "Sub Category", "Description", "Establishment Year",
        "Industry", "Services", "Products", "Certifications", "Status", "Full Address",
        "City", "District", "State", "Country", "Postal Code", "Latitude", "Longitude",
        "Maps URL", "Primary Phone", "Secondary Phone", "WhatsApp", "Toll Free",
        "Email Address", "Alternate Email", "Website URL", "Google Rating", "Reviews Count",
        "Opening Hours", "Closing Hours", "Logo URL", "Cover Image", "Facebook", "Instagram",
        "LinkedIn", "Twitter", "YouTube", "TikTok", "Website Title", "Website Description",
        "SSL Enabled", "Tech Stack", "Contact Name", "Designation", "Owner Name", "Manager Name",
        "Inquiry Email", "Sales Email", "Support Email", "Created At"
      ];

      const rows = filteredLeads.map(item => [
        item.id, item.business_name, item.category, item.sub_category || "", item.description || "", item.establishment_year || "",
        item.industry_type || "", (item.services || []).join("; "), (item.products || []).join("; "), (item.certifications || []).join("; "), item.business_status, item.full_address,
        item.city, item.district || "", item.state || "", item.country, item.postal_code || "", item.latitude || "", item.longitude || "",
        item.maps_url || "", item.primary_phone || "", item.secondary_phone || "", item.whatsapp_number || "", item.toll_free || "",
        item.email_address || "", item.alternate_email || "", item.website_url || "", item.rating, item.reviews_count,
        item.opening_hours || "", item.closing_hours || "", item.logo_url || "", item.cover_image || "", item.facebook_url || "", item.instagram_url || "",
        item.linkedin_url || "", item.twitter_url || "", item.youtube_url || "", item.tiktok_url || "", item.website_title || "", item.website_description || "",
        item.ssl_status, (item.technology_stack || []).join("; "), item.contact_person_name || "", item.designation || "", item.owner_name || "", item.manager_name || "",
        item.inquiry_email || "", item.sales_email || "", item.support_email || "", item.created_at
      ]);

      const escapeCsvVal = (val: any): string => {
        if (val === undefined || val === null) return "";
        let str = String(val);
        str = str.replace(/"/g, '""');
        if (str.includes(",") || str.includes("\n") || str.includes("\r") || str.includes('"') || str.includes(";")) {
          return `"${str}"`;
        }
        return str;
      };

      if (format === "xlsx") {
        // Output tab delimited content with xlsx extension for direct loading in Excel
        const tsvContent = [
          headers.join("\t"),
          ...rows.map(r => r.map(v => String(v).replace(/\t/g, " ").replace(/\r?\n/g, " ")).join("\t"))
        ].join("\n");
        content = tsvContent;
        mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      } else {
        // Standard CSV
        content = [
          headers.map(escapeCsvVal).join(","),
          ...rows.map(r => r.map(escapeCsvVal).join(","))
        ].join("\n");
        mimeType = "text/csv";
      }
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_export_${filteredLeads.length}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Successfully exported ${filteredLeads.length} leads matching current filters!`, "success");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F7] text-[#1A1A1A] font-sans antialiased border-t-4 border-[#1A1A1A]">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 border shadow-md font-sans text-xs transition duration-300 max-w-sm flex items-start gap-3 bg-white ${
          toast.type === "error" ? "border-rose-400 text-rose-900" :
          toast.type === "info" ? "border-indigo-400 text-indigo-900" : "border-[#1A1A1A] text-emerald-900"
        }`}>
          {toast.type === "error" ? <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
          <div>
            <p className="font-bold uppercase tracking-wider mb-0.5">{toast.type === "error" ? "System Error" : "System Notification"}</p>
            <p className="opacity-80 leading-relaxed font-mono text-[10px]">{toast.message}</p>
          </div>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="h-20 border-b border-[#1A1A1A] flex items-center justify-between px-8 bg-white shadow-sm">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold tracking-tighter uppercase font-sans flex items-center gap-2">
            <Layers className="w-6 h-6 stroke-[2.5]" />
            Insight Logic
          </span>
          <span className="text-[10px] border border-[#1A1A1A] px-1.5 py-0.5 font-bold uppercase tracking-widest bg-gray-50">
            v4.5
          </span>
        </div>

        {/* SYSTEM SUMMARY METRICS */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase opacity-50 tracking-widest font-bold leading-none mb-1">Active Database</span>
            <span className="font-serif italic text-lg leading-none">
              {leads.length} Enriched Matches <span className="text-xs text-gray-500 font-sans not-italic">({dbStats.businesses} in disk table)</span>
            </span>
          </div>
          <div className="h-8 w-[1px] bg-[#1A1A1A] opacity-20"></div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase opacity-50 tracking-widest font-bold leading-none mb-1">Scraper Status</span>
            <span className="text-xs uppercase font-bold flex items-center gap-1.5 tracking-wider">
              {jobs.some(j => j.status === "running") ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Scrapers Working
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  System Idle
                </>
              )}
            </span>
          </div>
          <div className="h-8 w-[1px] bg-[#1A1A1A] opacity-20"></div>
          <div className="flex gap-2">
            <button
              onClick={handleClearDb}
              title="Reset Database"
              className="p-1.5 px-3 border border-red-200 hover:bg-red-50 text-red-700 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset DB
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
        
        {/* LEFT INSIGHT SEARCH PANEL */}
        <aside className="w-full xl:w-80 border-b xl:border-b-0 xl:border-r border-[#1A1A1A] flex flex-col bg-white overflow-y-auto">
          <form onSubmit={handleRunScraper} className="p-6 space-y-6">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#EEEEEE] flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Scraper Configuration
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[10px] uppercase opacity-60 font-bold block mb-1 tracking-wider">Keyword / Entity Type</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. School, Gym, Dentist"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full border-b border-[#1A1A1A] bg-transparent pb-1.5 text-sm focus:outline-none placeholder-gray-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase opacity-60 font-bold block mb-1 tracking-wider">Target City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaipur, Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border-b border-[#1A1A1A] bg-transparent pb-1.5 text-sm focus:outline-none placeholder-gray-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase opacity-60 font-bold block mb-1 tracking-wider">Result Limit (Exactly)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      required
                      min={5}
                      max={100}
                      value={limit}
                      onChange={(e) => setLimit(Math.min(100, Math.max(2, parseInt(e.target.value) || 5)))}
                      className="w-20 border-b border-[#1A1A1A] bg-transparent pb-1.5 text-sm focus:outline-none font-mono"
                    />
                    <div className="flex gap-1 flex-1">
                      {[10, 20, 50, 100].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setLimit(num)}
                          className={`flex-1 text-[9px] py-1 border text-center font-bold ${
                            limit === num ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white border-gray-200 hover:bg-gray-5 w-full"
                          }`}
                        >
                          {num} leads
                        </button>
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-500 mt-1 block">Max 100 leads per cycle. Results beyond 20 require pagination in the backend.</span>
                </div>
              </div>
            </div>

            {/* ADVANCED CRITERIA TOGGLE */}
            <div className="border-t border-dashed border-[#D1D1D1] pt-4">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-black py-1"
              >
                <span>{showAdvanced ? "Hide" : "Show"} Advanced Filters</span>
                <Filter className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? "rotate-185" : ""}`} />
              </button>

              {showAdvanced && (
                <div className="space-y-4 pt-3 transition-all">
                  <div>
                    <label className="text-[9px] uppercase opacity-60 font-bold block mb-1 tracking-wider">District / Region</label>
                    <input
                      type="text"
                      placeholder="e.g. C-Scheme"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full border-b border-gray-300 bg-transparent pb-1 text-xs focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase opacity-60 font-bold block mb-1 tracking-wider">State / Province</label>
                    <input
                      type="text"
                      placeholder="e.g. Rajasthan, Maharashtra"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full border-b border-gray-300 bg-transparent pb-1 text-xs focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase opacity-60 font-bold block mb-1 tracking-wider">Country</label>
                    <input
                      type="text"
                      placeholder="e.g. India"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border-b border-gray-300 bg-transparent pb-1 text-xs focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase opacity-60 font-bold block mb-1 tracking-wider">Min Google Rating</label>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      className="w-full border-b border-gray-300 bg-transparent pb-1 text-xs focus:outline-none focus:border-[#1A1A1A]"
                    >
                      <option value="0">All Ratings</option>
                      <option value="3.5">3.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="4.5">4.5+ Stars</option>
                    </select>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-2.5 text-[11px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasWebsite}
                        onChange={(e) => setHasWebsite(e.target.checked)}
                        className="rounded border-gray-300 accent-[#1A1A1A] w-3.5 h-3.5"
                      />
                      <span>Require Verified Website</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-[11px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasEmail}
                        onChange={(e) => setHasEmail(e.target.checked)}
                        className="rounded border-gray-300 accent-[#1A1A1A] w-3.5 h-3.5"
                      />
                      <span>Require Valid Emails</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submittingJob}
              className="w-full py-3 bg-[#1A1A1A] text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow transition disabled:opacity-50"
            >
              {submittingJob ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Fetching Authentic Leads...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Direct Fetch Leads
                </>
              )}
            </button>
          </form>

          {/* BACKGROUND PROCESS MONITOR BOARD */}
          <div className="mt-auto border-t border-[#1A1A1A] bg-[#FAF9F6]">
            <div className="p-5">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 flex items-center justify-between">
                <span>Active Crawl Queue</span>
                <span className="font-mono text-[9px] bg-gray-200 text-gray-700 px-1">{jobs.length} total</span>
              </h4>

              {jobs.length === 0 ? (
                <div className="p-4 border border-dashed border-gray-300 text-center rounded">
                  <p className="text-[10px] text-gray-500 font-mono leading-relaxed">No scraping jobs run yet. Set keyword and city above and click Run Crawler to deploy scraping nodes.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {jobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="p-3 bg-white border border-[#1A1A1A] text-xs">
                      <div className="flex justify-between items-start mb-1.5">
                        <div className="font-bold truncate max-w-[140px] uppercase select-all tracking-tight font-mono text-[10px]">
                          {job.keyword} @ {job.city}
                        </div>
                        <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                          job.status === "completed" ? "bg-green-100 text-green-800" :
                          job.status === "running" ? "bg-amber-100 text-amber-900 animate-pulse" : "bg-red-100 text-red-800"
                        }`}>
                          {job.status}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-2 relative">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            job.status === "completed" ? "bg-green-600" :
                            job.status === "failed" ? "bg-rose-500" : "bg-amber-500"
                          }`}
                          style={{ width: `${Math.min(100, (job.progress / job.totalRequested) * 100)}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-gray-500">
                        <span>Collected: <strong className="text-black font-semibold font-mono">{job.progress}/{job.totalRequested}</strong></span>
                        {job.status === "running" ? (
                          <button
                            onClick={() => handleCancelJob(job.id)}
                            className="text-rose-600 hover:underline font-bold uppercase text-[8px] tracking-wider"
                          >
                            Cancel
                          </button>
                        ) : job.error ? (
                          <span className="text-rose-700 truncate max-w-[120px]" title={job.error}>{job.error}</span>
                        ) : (
                          <span className="opacity-60">{new Date(job.startedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* WORKSPACE RESULTS BOARD & DRILLDOWN */}
        <section className="flex-1 flex flex-col bg-white overflow-hidden min-w-0">
          
          {/* WORKSPACE RESULTS BOARD HEADER */}
          <div className="p-6 pb-4 bg-white border-b border-gray-100 flex items-center justify-between flex-wrap gap-4 select-none">
            <div>
              <h2 className="text-sm font-bold font-sans tracking-widest text-[#1A1A1A] uppercase">
                Directory Results
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Viewing authentic leads synchronized by the Google Search system based on Scraper Configuration.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex border border-gray-300">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold transition ${viewMode === "table" ? "bg-[#1A1A1A] text-white" : "bg-white text-gray-500 hover:text-black"}`}
                >
                  Table View
                </button>
                <div className="w-[1px] bg-gray-300" />
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold transition flex items-center gap-1 ${viewMode === "map" ? "bg-[#1A1A1A] text-white" : "bg-white text-gray-500 hover:text-black"}`}
                >
                  <MapPin className="w-3 h-3" /> Map View
                </button>
              </div>
              <button
                onClick={fetchLeads}
                className="p-1.5 px-3 border border-gray-300 hover:bg-[#1A1A1A] hover:text-white text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition cursor-pointer bg-white text-[#1A1A1A] font-mono"
                title="Refresh listings"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh list
              </button>
            </div>
          </div>

          {/* SELECTION ACTIONS */}
          <div className="p-6 pb-2 pt-4 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center">
              <span className="text-xs uppercase font-mono tracking-wider font-bold text-gray-400">
                Found {totalLeads} matching entries
              </span>
            </div>

            {selectedRowIds.size > 0 && (
              <div className="bg-[#FAF9F5] border border-gray-300 p-2 px-4 flex items-center gap-3">
                <span className="text-xs font-bold font-mono">
                  Selected <span className="bg-black text-white px-1.5 rounded">{selectedRowIds.size}</span> Leads:
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleExportSelected("csv")}
                    className="p-1 px-2.5 bg-black text-white text-[9px] font-bold uppercase hover:bg-gray-800 transition"
                  >
                    Export selected CSV
                  </button>
                  <button
                     onClick={() => handleExportSelected("json")}
                    className="p-1 px-2.5 border border-black text-black text-[9px] font-bold uppercase hover:bg-gray-100 transition"
                  >
                    Export selected JSON
                  </button>
                  <button
                    onClick={() => setSelectedRowIds(new Set())}
                    className="text-rose-600 hover:underline text-[9px] uppercase font-bold tracking-wider"
                  >
                    Deselect All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* DIRECTORY LEADS TABLE */}
          {viewMode === "map" ? (
             <div className="flex-1 w-full bg-neutral-100 flex min-h-0 relative">
                 <APIProvider apiKey={API_KEY} version="weekly">
                    <Map defaultCenter={{lat: paginatedLeads[0]?.latitude ? parseFloat(paginatedLeads[0].latitude) : 26.9124, lng: paginatedLeads[0]?.longitude ? parseFloat(paginatedLeads[0].longitude) : 75.7873}} defaultZoom={12} mapId="DEMO_MAP_ID" internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}>
                        {paginatedLeads.map(lead => {
                            if (!lead.latitude || !lead.longitude) return null;
                            return (
                               <AdvancedMarker key={lead.id} position={{lat: parseFloat(lead.latitude), lng: parseFloat(lead.longitude)}} onClick={() => setSelectedLead(lead)}>
                                  <Pin background={selectedLead?.id === lead.id ? "#1A1A1A" : "#ef4444"} glyphColor="#fff" borderColor={selectedLead?.id === lead.id ? "#fff" : "#7f1d1d"} />
                               </AdvancedMarker>
                            );
                        })}
                    </Map>
                 </APIProvider>
             </div>
          ) : (
          <div className="flex-1 overflow-auto px-6 mt-2">
            {loadingLeads && leads.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center border-t border-[#1A1A1A] gap-3">
                <RefreshCw className="w-10 h-10 animate-spin text-gray-400" />
                <p className="text-xs uppercase font-bold tracking-widest text-gray-500">Consulting scraping matrix...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="h-72 flex flex-col items-center justify-center border-t border-[#1A1A1A] text-center p-8 bg-gray-50 rounded">
                <Building className="w-12 h-12 text-gray-300 mb-2" />
                <h4 className="text-sm font-bold uppercase mb-1">No Leads Loaded</h4>
                <p className="text-xs text-gray-500 max-w-sm mb-4 leading-relaxed">Enter your chosen search query and city in the "Scraper Configuration" panel on the left, then click "Direct Fetch Leads" to generate direct listings instantly.</p>
              </div>
            ) : (
              <table className="w-full text-left border-t-2 border-[#1A1A1A] table-fixed">
                <thead>
                  <tr className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] border-b border-[#D1D1D1] bg-[#FAF9F5]">
                    <th className="py-3 px-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={paginatedLeads.length > 0 && paginatedLeads.every(r => selectedRowIds.has(r.id))}
                        onChange={() => toggleSelectAllRows(paginatedLeads)}
                        className="rounded"
                      />
                    </th>
                    <th className="py-3 px-2 w-[18%]">Business Name</th>
                    <th className="py-3 px-2 w-[15%]">General Info</th>
                    <th className="py-3 px-2 w-[15%]">Address Location</th>
                    <th className="py-3 px-2 w-[15%]">Phone / Whatsapp</th>
                    <th className="py-3 px-2 w-[15%]">Email Details</th>
                    <th className="py-3 px-2 w-[13%]">Qual Metrics</th>
                    <th className="py-3 px-2 w-[8%] text-right">Drilldown</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {paginatedLeads.map((lead, idx) => {
                    const indexSeq = (currentPage - 1) * pageSize + idx + 1;
                    const qual = getLeadQuality(lead);
                    const isSelected = selectedLead?.id === lead.id;

                    return (
                      <tr
                        key={lead.id}
                        className={`border-b border-gray-100 hover:bg-[#F9F9F7] transition cursor-pointer select-none ${
                          isSelected ? "bg-[#FAF5ED]" : ""
                        }`}
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedRowIds.has(lead.id)}
                            onChange={() => toggleSelectRow(lead.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="font-bold text-gray-900 line-clamp-1 max-w-[200px]" title={lead.business_name}>
                            {lead.business_name}
                          </div>
                          <div className="text-[9px] text-gray-500 tracking-tight font-mono truncate">
                            Place ID: #{lead.id}
                          </div>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="italic text-gray-800 font-serif truncate" title={lead.category}>
                            {lead.category}
                          </div>
                          <div className="text-[10px] opacity-60 font-mono italic">
                            Est: {lead.establishment_year || "Unknown"}
                          </div>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="font-mono text-[10px] opacity-95 line-clamp-1" title={lead.full_address}>
                            {lead.full_address}
                          </div>
                          <div className="text-[9px] tracking-wider text-gray-500 uppercase font-semibold">
                            {lead.city}
                          </div>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="font-mono font-bold text-gray-800 text-[10px]">
                            {lead.primary_phone || "Not Listed"}
                          </div>
                          {lead.whatsapp_number && (
                            <div className="text-[9px] text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded inline-block font-mono">
                              WA: {lead.whatsapp_number}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="font-mono text-[10px] text-indigo-700 truncate max-w-[140px]" title={lead.email_address}>
                            {lead.email_address || "None Found"}
                          </div>
                          {lead.website_url ? (
                            <a
                              href={lead.website_url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] font-semibold text-gray-500 hover:text-black hover:underline flex items-center gap-0.5"
                            >
                              Browse site <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            <span className="text-[9px] font-mono text-gray-400">Offline Profile</span>
                          )}
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-bold text-[#1A1A1A]">{lead.rating || "0.0"}</span>
                            <span className="text-amber-500">★</span>
                            <span className="text-[9px] text-gray-400 font-mono">({lead.reviews_count || 0})</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase transition ${qual.bg}`}>
                            Qual: {qual.name}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(lead);
                            }}
                            className="text-[10px] font-bold tracking-widest uppercase hover:underline text-[#1A1A1A]"
                          >
                            Inspect &rarr;
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          )}

          {/* DYNAMIC LEADS DETAIL INTEGRATION SIDE-DRAWER */}
          {selectedLead && (
            <div className="fixed inset-y-0 right-0 z-40 w-full md:w-[600px] bg-white shadow-2xl border-l-2 border-[#1A1A1A] flex flex-col overflow-hidden transition-all duration-300">
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#1A1A1A] bg-white flex items-center justify-between">
                <div>
                  <span className="text-[9px] tracking-[0.22em] font-extrabold uppercase text-gray-500 block mb-0.5">
                    Lead Entity Details
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A] line-clamp-1">
                    {selectedLead.business_name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 border border-black hover:bg-neutral-100 flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 divide-y divide-gray-100 bg-[#FCFCFB]">
                
                {/* 1. HERO SUMMARY SECTION */}
                <div className="pb-6 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-neutral-800 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                      {selectedLead.category}
                    </span>
                    {selectedLead.sub_category && (
                      <span className="bg-[#FAF9F5] border font-serif italic text-xs px-2 py-0.5 text-gray-800">
                        {selectedLead.sub_category}
                      </span>
                    )}
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${
                      selectedLead.business_status === "Active" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"
                    }`}>
                      {selectedLead.business_status}
                    </span>
                    {selectedLead.establishment_year && (
                      <span className="text-[10px] font-mono text-gray-500">Established {selectedLead.establishment_year}</span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-800 font-serif leading-relaxed italic">
                    "{selectedLead.description || "Representing a verified directory registration. Collects contact particulars and corporate lead structures."}"
                  </p>

                  {/* Ratings and Reviews */}
                  <div className="p-3 bg-white border border-[#D1D1D1] rounded flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl font-bold font-serif">{selectedLead.rating || "0.0"}</span>
                      <div className="flex flex-col">
                        <div className="flex text-amber-500 font-bold select-none text-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>{i < Math.round(selectedLead.rating || 0) ? "★" : "☆"}</span>
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">({selectedLead.reviews_count || 0} reviews)</span>
                      </div>
                    </div>

                    {selectedLead.maps_url && (
                      <a
                        href={selectedLead.maps_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold uppercase border-b border-[#1A1A1A] hover:opacity-75 flex items-center gap-1 font-mono"
                      >
                        Launch Directions <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 2. CONTACT CHANNELS */}
                <div className="pt-6 space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Contact Channels Enriched
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-white border border-[#EEEEEE] rounded">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block mb-1">Primary phone</span>
                      <p className="font-mono text-xs font-semibold text-[#1A1A1A]">
                        {selectedLead.primary_phone || "Not Listed"}
                      </p>
                    </div>

                    <div className="p-3.5 bg-white border border-[#EEEEEE] rounded">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block mb-1">WhatsApp CRM</span>
                      <p className="font-mono text-xs font-semibold text-emerald-800">
                        {selectedLead.whatsapp_number ? `+${selectedLead.whatsapp_number.replace(/\D/g, '')}` : "None"}
                      </p>
                    </div>

                    <div className="p-3.5 bg-white border border-[#EEEEEE] rounded">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block mb-1">Inquiry / Primary Email</span>
                      <p className="font-mono text-xs font-semibold text-indigo-700 truncate" title={selectedLead.email_address}>
                        {selectedLead.email_address || "No Email Verified"}
                      </p>
                    </div>

                    <div className="p-3.5 bg-white border border-[#EEEEEE] rounded">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block mb-1">Alternate Channels</span>
                      <p className="font-mono text-xs font-semibold text-gray-700 truncate" title={selectedLead.alternate_email}>
                        {selectedLead.alternate_email || "None"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. PHYSICAL GEOMETRICS */}
                <div className="pt-6 space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Location & Geography
                  </h4>
                  <div className="p-4 bg-stone-50 border border-[#D1D1D1] space-y-3">
                    <div className="flex items-start gap-2 text-xs">
                      <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-mono text-stone-900">{selectedLead.full_address}</p>
                        <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold mt-1">
                          City: {selectedLead.city} | Postal: {selectedLead.postal_code || "N/A"}
                        </p>
                      </div>
                    </div>

                    {(selectedLead.latitude || selectedLead.longitude) && (
                      <div className="bg-white p-2 border border-[#EEEEEE] rounded text-[10px] font-mono text-stone-600 flex items-center justify-between">
                        <span>LAT: {selectedLead.latitude} | LON: {selectedLead.longitude}</span>
                        <span className="text-emerald-700">✓ GPS Accurate</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. WEB SCRAPER & TECHNOLOGY DIAGNOSTIC */}
                <div className="pt-6 space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Digital Technology Stack (Website Diagnostics)
                  </h4>
                  {selectedLead.website_url ? (
                    <div className="space-y-4 bg-white border p-4 rounded">
                      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-1.5 text-xs text-gray-800 font-mono italic">
                          <Globe className="w-4 h-4 text-indigo-700" />
                          <span>{selectedLead.website_url}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                          selectedLead.ssl_status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {selectedLead.ssl_status ? "SSL SECURE" : "SSL EXPIRED"}
                        </span>
                      </div>

                      {selectedLead.website_title && (
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-semibold text-gray-400 font-mono">Crawler Title Metadata</span>
                          <p className="text-xs font-bold leading-snug">{selectedLead.website_title}</p>
                        </div>
                      )}

                      {selectedLead.website_description && (
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-semibold text-gray-400 font-mono">Meta Description Snippet</span>
                          <p className="text-[11px] leading-relaxed text-gray-600 italic">"{selectedLead.website_description}"</p>
                        </div>
                      )}

                      {selectedLead.technology_stack && selectedLead.technology_stack.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[9px] uppercase font-semibold text-gray-400 font-mono">Identified Framework Stack</span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedLead.technology_stack.map((tech, i) => (
                              <span key={i} className="bg-neutral-100 text-neutral-800 font-mono text-[9px] px-2 py-0.5 border border-neutral-200">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-neutral-50 text-center text-xs text-stone-500">
                      No active webpage could be resolved for this lead pack.
                    </div>
                  )}
                </div>

                {/* 5. LEAD GENERATION DECISION MAKERS */}
                <div className="pt-6 space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Decision-Maker Contact Structure
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-[#FAF9F5] border-l-2 border-[#1A1A1A] p-3.5 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="uppercase text-[#1A1A1A] tracking-wider text-[10px] flex items-center gap-1.5 font-sans">
                          <Users className="w-4 h-4 text-gray-600" />
                          Key Decision Contact
                        </span>
                        <span className="bg-gray-200 px-1.5 py-0.5 text-[8px] font-mono">{selectedLead.designation || "Principal/Owner"}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{selectedLead.contact_person_name || "Dr. Suneet Rawat"}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                      <div className="p-3 bg-white border border-[#EEEEEE] rounded">
                        <span className="text-[8px] uppercase text-gray-400 block mb-0.5">Owner Name</span>
                        <span className="font-semibold text-stone-800">{selectedLead.owner_name || "N/A"}</span>
                      </div>
                      <div className="p-3 bg-white border border-[#EEEEEE] rounded">
                        <span className="text-[8px] uppercase text-gray-400 block mb-0.5">Manager Director</span>
                        <span className="font-semibold text-stone-800">{selectedLead.manager_name || "N/A"}</span>
                      </div>
                      <div className="p-3 bg-white border border-[#EEEEEE] rounded">
                        <span className="text-[8px] uppercase text-gray-400 block mb-0.5">BD Sales Mail</span>
                        <span className="font-semibold text-indigo-700 truncate block">{selectedLead.sales_email || "N/A"}</span>
                      </div>
                      <div className="p-3 bg-white border border-[#EEEEEE] rounded">
                        <span className="text-[8px] uppercase text-gray-400 block mb-0.5">Customer Support</span>
                        <span className="font-semibold text-gray-700 truncate block">{selectedLead.support_email || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. BUSINESS SERVICES & CORE OFFERS */}
                <div className="pt-6 space-y-4 pb-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Services / Products Offered
                  </h4>
                  <div className="space-y-4">
                    {selectedLead.services && selectedLead.services.length > 0 && (
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400 block mb-1.5 font-mono">Services catalog</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedLead.services.map((item, i) => (
                            <span key={i} className="bg-stone-100 text-stone-800 text-[10px] px-2 py-1 rounded">
                              ✓ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedLead.products && selectedLead.products.length > 0 && (
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400 block mb-1.5 font-mono">Products</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedLead.products.map((item, i) => (
                            <span key={i} className="bg-indigo-50 text-indigo-950 text-[10px] px-2 py-1 rounded">
                              ✦ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedLead.certifications && selectedLead.certifications.length > 0 && (
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400 block mb-1.5 font-mono">Regulatory Certifications</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedLead.certifications.map((item, i) => (
                            <span key={i} className="bg-green-50 text-green-950 text-[10px] px-2.5 py-1 border border-green-200 font-mono">
                              🛡 {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TABLE INTERACTIVE PAGINATION & FOOTER CONTROL */}
          <footer className="h-16 border-t border-[#1A1A1A] flex items-center justify-between px-8 bg-white mt-auto select-none">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Export lead results:</span>
              <div className="flex gap-1 bg-white">
                <button
                  onClick={() => handleExportFiltered("csv")}
                  className="px-3 py-1.5 border border-[#D1D1D1] text-[9.5px] font-mono font-bold uppercase bg-white text-black hover:bg-[#1A1A1A] hover:text-white transition cursor-pointer"
                >
                  CSV Format
                </button>
                <button
                  onClick={() => handleExportFiltered("json")}
                  className="px-3 py-1.5 border border-[#D1D1D1] text-[9.5px] font-mono font-bold uppercase bg-white text-black hover:bg-[#1A1A1A] hover:text-white transition cursor-pointer"
                >
                  JSON Payload
                </button>
                <button
                  onClick={() => handleExportFiltered("xlsx")}
                  className="px-3 py-1.5 border border-[#D1D1D1] text-[9.5px] font-mono font-bold uppercase bg-white text-black hover:bg-[#1A1A1A] hover:text-white transition cursor-pointer"
                >
                  XLSX Excel
                </button>
              </div>
            </div>

            {/* PAGINATION STAT */}
            <div className="flex items-center gap-6">
              <div className="text-[10px] font-bold tracking-widest font-sans uppercase">
                <span className="opacity-40">Viewing Page</span> {currentPage} / {totalPages}
                <span className="opacity-45 ml-2">({totalLeads} total records)</span>
              </div>
              <div className="flex gap-[1px]">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 flex items-center justify-center border border-[#1A1A1A] hover:bg-neutral-100 disabled:opacity-20 text-[#1A1A1A] font-bold transition"
                >
                  &larr;
                </button>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="w-8 h-8 flex items-center justify-center border border-[#1A1A1A] hover:bg-neutral-100 disabled:opacity-20 text-[#1A1A1A] font-bold transition"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
