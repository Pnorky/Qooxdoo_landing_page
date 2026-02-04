/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("landing_qooxdoo.components.Navbar", {
  extend: qx.ui.container.Composite,

  events: {
    /** Fired when a navigation item is clicked */
    navigate: "qx.event.type.Data"
  },

  construct() {
    this.base(arguments);
    this.setLayout(new qx.ui.layout.VBox());
    this._products = [];
    this._init();
  },

  members: {
    _products: null,
    _menuBar: null,
    _logoContainer: null,
    _modeToggle: null,

    _init() {
      // Main container - full width, horizontal layout
      const mainContainer = new qx.ui.container.Composite();
      mainContainer.setLayout(new qx.ui.layout.HBox(20));
      mainContainer.setPadding(16, 24);

      // Logo and title container
      this._logoContainer = new qx.ui.container.Composite();
      this._logoContainer.setLayout(new qx.ui.layout.HBox(12));
      this._logoContainer.setAlignY("middle");
      this._logoContainer.addListener("tap", () => {
        this.fireDataEvent("navigate", { path: "/" });
      }, this);
      
      // Logo image
      const logo = new qx.ui.basic.Image("landing_qooxdoo/logo.png");
      logo.setWidth(40);
      logo.setHeight(40);
      logo.setScale(true);
      
      // Company title
      const title = new qx.ui.basic.Label("Digital Software Corporation");
      title.setFont("bold");
      title.setAlignY("middle");

      this._logoContainer.add(logo);
      this._logoContainer.add(title);
      mainContainer.add(this._logoContainer, { flex: 0 });

      // Spacer to push menu to the right
      const spacer = new qx.ui.core.Spacer();
      mainContainer.add(spacer, { flex: 1 });

      // Menu bar for navigation
      this._menuBar = new qx.ui.menubar.MenuBar();
      
      // Browse Products menu
      const productsMenu = new qx.ui.menubar.Button("Browse Products");
      const productsSubMenu = new qx.ui.menu.Menu();
      productsMenu.setMenu(productsSubMenu);
      
      // Will be populated when products are loaded
      this._productsSubMenu = productsSubMenu;
      
      // Release Notes
      const releaseNotesButton = new qx.ui.menubar.Button("Release Notes");
      releaseNotesButton.addListener("execute", () => {
        this.fireDataEvent("navigate", { path: "/release-notes" });
      }, this);

      // List of Clients
      const clientsButton = new qx.ui.menubar.Button("List of Clients");
      clientsButton.addListener("execute", () => {
        this.fireDataEvent("navigate", { path: "/list-of-clients" });
      }, this);

      this._menuBar.add(productsMenu);
      this._menuBar.add(releaseNotesButton);
      this._menuBar.add(clientsButton);

      mainContainer.add(this._menuBar, { flex: 0 });

      // Dark mode toggle
      const modeToggleContainer = new qx.ui.container.Composite();
      modeToggleContainer.setLayout(new qx.ui.layout.Basic());
      modeToggleContainer.setMarginLeft(16);
      this._modeToggle = new qx.ui.menubar.Button("☀");
      this._modeToggle.setWidth(24);
      this._modeToggle.setHeight(24);
      this._modeToggle.addListener("execute", () => {
        this._toggleDarkMode();
      }, this);
      modeToggleContainer.add(this._modeToggle);
      mainContainer.add(modeToggleContainer, { flex: 0 });

      this.add(mainContainer);
    },

    /**
     * Load products and populate menu
     */
    loadProducts() {
      landing_qooxdoo.util.ExcelReader.getAllProducts().then(products => {
        this._products = products;
        this._productsSubMenu.removeAll();
        
        products.forEach(product => {
          const menuItem = new qx.ui.menu.Button(product.title);
          if (product.short_des) {
            menuItem.setToolTipText(product.short_des);
          }
          menuItem.addListener("execute", () => {
            this.fireDataEvent("navigate", { path: product.href });
          }, this);
          this._productsSubMenu.add(menuItem);
        });
      }).catch(error => {
        console.error("Failed to load products:", error);
      });
    },

    /**
     * Toggle dark mode
     */
    _toggleDarkMode() {
      // Dark mode toggle - can be reimplemented using qooxdoo theme system
    }
  }
});
