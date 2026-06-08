import type { GridItem, User, Workspace, OnboardingTask } from "@/types";

export const CURRENT_USER: User = {
  id: "usr_tim",
  name: "Tim Martin",
  email: "tim@company.com",
  initials: "TM",
  color: "#f5a623",
};

export const WORKSPACE: Workspace = {
  id: "ws_gtm",
  name: "GTM Spaces",
  plan: "Booster",
  creditsUsed: 450000,
  creditsTotal: 5500000,
};

export const ONBOARDING_TASKS: OnboardingTask[] = [
  { id: "data-list", label: "Create your data list", completed: true },
  { id: "bitagent", label: "Learn about BitAgent", completed: true },
  { id: "integration", label: "Connect an integration", completed: true },
  {
    id: "waterfall",
    label: "Customise waterfall providers",
    completed: false,
  },
];

export const GRIDS: GridItem[] = [
  {
    id: "wbk",
    name: "Workbook — Testing design ideas for grid and workbook",
    icon: "📊",
    tags: ["wbk", "li", "g"],
    user: "Sam Taylor",
    date: "06 Aug, 2025",
    starred: false,
    expanded: true,
    children: [
      {
        id: "wbk-1",
        name: "LinkedIn enrichment sheet",
        icon: "🔵",
        tags: ["li"],
        user: "Sam Taylor",
        date: "06 Aug, 2025",
        starred: false,
      },
    ],
  },
  {
    id: "li",
    name: "LinkedIn",
    icon: "🔵",
    tags: ["li"],
    user: "Chris Parker",
    date: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "sn",
    name: "Sales nav",
    icon: "🟣",
    tags: ["sn"],
    user: "Jone Doe",
    date: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "fc",
    name: "find company",
    icon: "🟢",
    tags: ["fc"],
    user: "Alex Morgan",
    date: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "ic",
    name: "import csv",
    icon: "🟠",
    tags: ["ic"],
    user: "Drew Wilson",
    date: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "fp",
    name: "Find people",
    icon: "👤",
    tags: ["fp"],
    user: "Jone Doe",
    date: "06 Aug, 2025",
    starred: true,
  },
  {
    id: "gm",
    name: "Google maps",
    icon: "📍",
    tags: ["gm"],
    user: "Jone Doe",
    date: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "gs",
    name: "google search results",
    icon: "🔍",
    tags: ["gs"],
    user: "Jone Doe",
    date: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "fa",
    name: "factors",
    icon: "📈",
    tags: ["fa"],
    user: "Jone Doe",
    date: "06 Aug, 2025",
    starred: false,
  },
  {
    id: "hs",
    name: "Hubspot List — 10 (05 Aug 25)",
    icon: "🟥",
    tags: ["hs"],
    user: "Jone Doe",
    date: "06 Aug, 2025",
    starred: false,
  },
];

import { 
  Home, LayoutDashboard, BookOpen, Plug, FileText, Settings,
  Briefcase, Globe, MapPin, Hash, UserCheck, Building2, Zap
} from "lucide-react";

export type SortKey = "name" | "by" | "date";
export type SortDir = "asc" | "desc";

export const INITIAL_GRIDS = [
  { id:1,  name:"Workbook - Testing design Ideas for grid and workbook", sym:"WB",  color:"#6366F1", by:"Sam Taylor",   ini:"ST", ac:"#6366F1", date:"2025-08-06", dateStr:"06 Aug, 2025", starred:false, parent:true  },
  { id:2,  name:"LinkedIn",                                              sym:"in",  color:"#0077B5", by:"Chris Parker", ini:"CP", ac:"#059669", date:"2025-08-06", dateStr:"06 Aug, 2025", starred:false },
  { id:3,  name:"Sales nav",                                             sym:"▶",   color:"#F59E0B", by:"Jone Doe",     ini:"JD", ac:"#EC4899", date:"2025-08-05", dateStr:"05 Aug, 2025", starred:false },
  { id:4,  name:"find company",                                          sym:"CO",  color:"#10B981", by:"Alex Morgan",  ini:"AM", ac:"#8B5CF6", date:"2025-08-05", dateStr:"05 Aug, 2025", starred:true  },
  { id:5,  name:"import csv",                                            sym:"CSV", color:"#EF4444", by:"Drew Wilson",  ini:"DW", ac:"#EF4444", date:"2025-08-04", dateStr:"04 Aug, 2025", starred:true  },
  { id:6,  name:"Find people",                                           sym:"PP",  color:"#EC4899", by:"Jone Doe",     ini:"JD", ac:"#EC4899", date:"2025-08-04", dateStr:"04 Aug, 2025", starred:true  },
  { id:7,  name:"Google maps",                                           sym:"GM",  color:"#3B82F6", by:"Jone Doe",     ini:"JD", ac:"#3B82F6", date:"2025-08-03", dateStr:"03 Aug, 2025", starred:false },
  { id:8,  name:"google search results",                                 sym:"G",   color:"#4285F4", by:"Jone Doe",     ini:"JD", ac:"#4285F4", date:"2025-08-03", dateStr:"03 Aug, 2025", starred:false },
  { id:9,  name:"factors",                                               sym:"FA",  color:"#F97316", by:"Jone Doe",     ini:"JD", ac:"#F97316", date:"2025-08-02", dateStr:"02 Aug, 2025", starred:true  },
  { id:10, name:"Hubspot List - 10 (05 Aug 25)",                         sym:"HS",  color:"#FF7A59", by:"Jone Doe",     ini:"JD", ac:"#FF7A59", date:"2025-08-01", dateStr:"01 Aug, 2025", starred:true  },
  { id:11, name:"Apollo.io leads export",                                sym:"AP",  color:"#7C3AED", by:"Sam Taylor",   ini:"ST", ac:"#7C3AED", date:"2025-07-30", dateStr:"30 Jul, 2025", starred:false },
  { id:12, name:"Clearbit enrichment batch",                             sym:"CB",  color:"#0EA5E9", by:"Chris Parker", ini:"CP", ac:"#0EA5E9", date:"2025-07-28", dateStr:"28 Jul, 2025", starred:false },
];

export const FAKE_PEOPLE = [
  { name:"Sarah Chen",     title:"VP of Sales",           company:"Stripe",     loc:"San Francisco, CA", linkedin:"linkedin.com/in/sarahchen",     email:"sarah@stripe.com"     },
  { name:"Marcus Williams",title:"Head of Growth",        company:"Linear",     loc:"New York, NY",      linkedin:"linkedin.com/in/marcusw",       email:"marcus@linear.app"    },
  { name:"Priya Sharma",   title:"CTO",                   company:"Razorpay",   loc:"Bangalore, India",  linkedin:"linkedin.com/in/priyasharma",   email:"priya@razorpay.com"   },
  { name:"James O'Brien",  title:"Founder & CEO",         company:"Notion",     loc:"San Francisco, CA", linkedin:"linkedin.com/in/jamesobrien",   email:"james@notion.so"      },
  { name:"Fatima Al-Amin", title:"Director of Marketing", company:"HubSpot",    loc:"Boston, MA",        linkedin:"linkedin.com/in/fatimaalamin",  email:"fatima@hubspot.com"   },
  { name:"Tobias Müller",  title:"Engineering Manager",   company:"Vercel",     loc:"Berlin, Germany",   linkedin:"linkedin.com/in/tobiasmuller",  email:"tobias@vercel.com"    },
  { name:"Aiko Tanaka",    title:"Chief Revenue Officer", company:"Figma",      loc:"San Francisco, CA", linkedin:"linkedin.com/in/aikotanaka",    email:"aiko@figma.com"       },
  { name:"Daniel Park",    title:"VP Product",            company:"Segment",    loc:"San Francisco, CA", linkedin:"linkedin.com/in/danielpark",    email:"daniel@segment.com"   },
  { name:"Layla Hassan",   title:"Sales Manager",         company:"Salesforce", loc:"Chicago, IL",       linkedin:"linkedin.com/in/laylahassan",   email:"layla@salesforce.com" },
  { name:"Carlos Vega",    title:"Growth Lead",           company:"Intercom",   loc:"Dublin, Ireland",   linkedin:"linkedin.com/in/carlosvega",    email:"carlos@intercom.com"  },
];

export const FAKE_COMPANIES = [
  { name:"Stripe",      domain:"stripe.com",      hc:"1000-5000",  loc:"San Francisco, CA", ind:"Fintech",   rev:"$1B+",   founded:2010 },
  { name:"Linear",      domain:"linear.app",       hc:"51-200",     loc:"San Francisco, CA", ind:"SaaS",      rev:"$50M",   founded:2019 },
  { name:"Vercel",      domain:"vercel.com",       hc:"201-500",    loc:"San Francisco, CA", ind:"DevTools",  rev:"$150M",  founded:2015 },
  { name:"Notion",      domain:"notion.so",        hc:"500-1000",   loc:"San Francisco, CA", ind:"Productivity",rev:"$300M",founded:2016 },
  { name:"HubSpot",     domain:"hubspot.com",      hc:"5000-10000", loc:"Boston, MA",        ind:"CRM",       rev:"$2B+",   founded:2006 },
  { name:"Intercom",    domain:"intercom.com",     hc:"1000-5000",  loc:"Dublin, Ireland",   ind:"CX/Support",rev:"$500M",  founded:2011 },
  { name:"Salesforce",  domain:"salesforce.com",   hc:"10000+",     loc:"San Francisco, CA", ind:"CRM",       rev:"$30B+",  founded:1999 },
  { name:"Figma",       domain:"figma.com",        hc:"1000-5000",  loc:"San Francisco, CA", ind:"Design",    rev:"$400M",  founded:2012 },
  { name:"Segment",     domain:"segment.com",      hc:"501-1000",   loc:"San Francisco, CA", ind:"Data",      rev:"$200M",  founded:2011 },
  { name:"Razorpay",    domain:"razorpay.com",     hc:"1000-5000",  loc:"Bangalore, India",  ind:"Fintech",   rev:"$100M",  founded:2014 },
];

export const PEOPLE_FILTERS = [
  { id:"title",     label:"Job Title",         Icon:Briefcase, hint:"E.g: Manager, Software Engineer", tags:["CEO","CTO","VP Sales","VP Marketing","Head of Growth","Engineering Manager","Founder","Director","Account Executive","Sales Manager"] },
  { id:"website",   label:"Company Website",   Icon:Globe,     hint:"Eg: Google.com, LinkedIn.com",    tags:[] },
  { id:"ploc",      label:"Person Location",   Icon:MapPin,    hint:"Eg: London, New York City",       tags:["United States","United Kingdom","India","Germany","Canada","Australia","Singapore","Ireland"] },
  { id:"cloc",      label:"Company Location",  Icon:MapPin,    hint:"E.g: United States, UAE",         tags:["United States","UAE","India","UK","Singapore","Germany","Ireland"] },
  { id:"headcount", label:"Company Headcount", Icon:Hash,      hint:"E.g: 11-50, 10000+",              tags:["1-10","11-50","51-200","201-500","501-1000","1000-5000","5000-10000","10000+"] },
  { id:"level",     label:"Management Level",  Icon:UserCheck, hint:"E.g: Owner, Founder",             tags:["Owner","Founder","C-Level","VP","Director","Manager","Individual Contributor"] },
];

export const COMPANY_FILTERS = [
  { id:"industry",  label:"Industry",          Icon:Building2, hint:"E.g: SaaS, Fintech, Healthcare", tags:["SaaS","Fintech","Healthcare","E-commerce","EdTech","DevTools","Marketing","CRM","Data","Design"] },
  { id:"cloc",      label:"Location",          Icon:MapPin,    hint:"E.g: United States, UAE",        tags:["United States","India","UK","Germany","Singapore","Canada","Ireland","Australia"] },
  { id:"headcount", label:"Headcount",         Icon:Hash,      hint:"E.g: 11-50, 10000+",             tags:["1-10","11-50","51-200","201-500","501-1000","1000-5000","5000-10000","10000+"] },
  { id:"revenue",   label:"Revenue",           Icon:Zap,       hint:"E.g: $1M-$10M, $100M+",          tags:["<$1M","$1M-$10M","$10M-$50M","$50M-$100M","$100M-$500M","$500M-$1B","$1B+"] },
  { id:"founded",   label:"Founded Year",      Icon:UserCheck, hint:"E.g: 2015-2020",                 tags:["Before 2000","2000-2010","2010-2015","2015-2018","2018-2020","2020-2023","2023+"] },
];

export const SIDENAV = [
  { id:"home",         label:"Home",         Icon:Home },
  { id:"dashboard",    label:"My Dashboard", Icon:LayoutDashboard },
  { id:"playbooks",    label:"Playbooks",    Icon:BookOpen, badge:"new" },
  { id:"integrations", label:"Integrations", Icon:Plug },
];

export const OTHERNAV = [
  { id:"docs",     label:"Documentation", Icon:FileText },
  { id:"settings", label:"Settings",      Icon:Settings },
];

export const CHECKS = [
  { label:"Create your data list",         done:true  },
  { label:"Learn about BitAgent",          done:true  },
  { label:"Connect an integration",        done:true  },
  { label:"Customise waterfall providers", done:false },
];