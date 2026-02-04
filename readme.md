# Qooxdoo Landing Page

A modern, responsive landing page for Digital Software Corporation built with pure Qooxdoo framework.

## 📋 Description

This is a single-page application showcasing Digital Software Corporation's products and services. The application features a clean, minimalist design with client-side routing, product carousel, and dynamic content loading from Excel files.

## ✨ Features

- **Product Carousel**: Auto-playing hero section showcasing products with navigation dots
- **Dynamic Product Loading**: Products loaded from Excel files
- **Client-Side Routing**: Seamless navigation without page reloads
- **Responsive Layout**: Clean layout using Qooxdoo's native layout system
- **Product Preview Pages**: Individual pages for each product
- **List of Clients**: Table view of clients loaded from Excel
- **Release Notes**: Dedicated page for release notes

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Pnorky/Qooxdoo_landingpage.git
cd landing_qooxdoo
```

2. Install dependencies:
```bash
npm install
```

### Development

Compile the application:
```bash
npm run compile
```

Start the development server:
```bash
npm run serve
# or
npm run dev
```

The application will be available at `http://localhost:8080`

### Watch Mode

For automatic recompilation during development:
```bash
npm run watch
```

## 📁 Project Structure

```
landing_qooxdoo/
├── source/
│   ├── boot/              # HTML entry points
│   ├── class/             # Application classes
│   │   └── landing_qooxdoo/
│   │       ├── Application.js
│   │       ├── components/    # Reusable components
│   │       │   ├── Navbar.js
│   │       │   ├── HeroSection.js
│   │       │   ├── FeaturesSection.js
│   │       │   └── Footer.js
│   │       ├── pages/          # Page components
│   │       │   ├── HomePage.js
│   │       │   ├── ProductPreviewPage.js
│   │       │   ├── ListOfClientsPage.js
│   │       │   └── ReleaseNotesPage.js
│   │       └── util/          # Utility classes
│   │           └── ExcelReader.js
│   └── resource/          # Static resources (images, data)
├── public/                # Public assets
│   ├── data/             # Excel data files
│   └── images/           # Image assets
├── compiled/             # Compiled output (gitignored)
├── Manifest.json         # Qooxdoo manifest
├── compile.json          # Compiler configuration
└── package.json          # npm dependencies
```

## 🛠️ Technologies

- **Qooxdoo Framework** (v6.0.4): JavaScript framework for rich web applications
- **Qooxdoo Compiler** (v1.0.5): Build tool for Qooxdoo applications
- **XLSX**: Excel file reading library for dynamic content loading

## 📄 Data Files

The application reads product and client data from Excel files located in:
- `public/data/products.xlsx` - Product information
- `public/data/list-of-clients.xlsx` - Client list

## 🎨 Components

### Navbar
- Logo and company name
- Navigation menu with product dropdown
- Links to Release Notes and List of Clients

### HeroSection
- Product carousel with auto-play
- Navigation dots
- "VIEW MORE" button for product details

### FeaturesSection
- Grid layout showcasing key features
- Product images and descriptions

### Footer
- Product links
- Contact information
- Copyright information

## 📝 Scripts

- `npm run compile` - Compile the application
- `npm run serve` - Start development server
- `npm run watch` - Watch mode for automatic recompilation
- `npm run dev` - Alias for `serve`

## 🔗 Repository

GitHub: [https://github.com/Pnorky/Qooxdoo_landingpage](https://github.com/Pnorky/Qooxdoo_landingpage)

## 📄 License

MIT License

## 👤 Author

Digital Software Corporation

---

Built with ❤️ using Qooxdoo Framework