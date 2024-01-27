import type { FooterSection } from "../../types/Footer";

export const footerSections: FooterSection[] = [
  {
    title: "Prodotti",
    links: [
      {
        name: "Computer",
        link: "/computers",
      },
      {
        name: "Audio e Cuffie",
        link: "/audio-and-headphones",
      },
      {
        name: "TV",
        link: "/tv",
      },
      {
        name: "Elettrodomestici",
        link: "/home-appliances",
      },
      {
        name: "Sport e Viaggi",
        link: "/sport-and-travel",
      },
    ],
  },
  {
    title: "Sconti",
    links: [
      {
        name: "Saldi Autunnali",
        link: "/autumn-sale",
      },
      {
        name: "Registrati e ottieni il 15% di sconto",
        link: "/registration-bonus",
      },
    ],
  },
  {
    title: "Informazioni",
    links: [
      {
        name: "Domande frequenti",
        link: "/faq",
      },
      {
        name: "Spedizione",
        link: "/shipment",
      },
      {
        name: "Termini e Condizioni",
        link: "/terms-and-conditions",
      },
      {
        name: "Privacy Policy",
        link: "/privacy-policy",
      },
    ],
  },
];
