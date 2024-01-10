import type { FooterSection } from "../../types/Footer";

export const footerSections: FooterSection[] = [
  {
    title: "Products",
    links: [
      {
        name: "Computers",
        link: "/computers",
      },
      {
        name: "Audio & Headphones",
        link: "/audio-and-headphones",
      },
      {
        name: "TV",
        link: "/tv",
      },
      {
        name: "Home Appliances",
        link: "/home-appliances",
      },
      {
        name: "Sport & Travel",
        link: "/sport-and-travel",
      },
    ],
  },
  {
    title: "Discounts",
    links: [
      {
        name: "Autumn Sale",
        link: "/autumn-sale",
      },
      {
        name: "Register and get 15% off",
        link: "/registration-bonus",
      },
    ],
  },
  {
    title: "About",
    links: [
      {
        name: "FAQ",
        link: "/faq",
      },
      {
        name: "Shipment",
        link: "/shipment",
      },
      {
        name: "Terms & Conditions",
        link: "/terms-and-conditions",
      },
      {
        name: "Privacy Policy",
        link: "/privacy-policy",
      },
    ],
  },
];
