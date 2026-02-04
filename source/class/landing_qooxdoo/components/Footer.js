/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("landing_qooxdoo.components.Footer", {
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

    _init() {
      // Main footer container - full width, centered content
      const footerContainer = new qx.ui.container.Composite();
      footerContainer.setLayout(new qx.ui.layout.HBox(40));
      footerContainer.setPadding(20, 60);
      footerContainer.setMaxWidth(1280);
      footerContainer.setAlignX("center");

      // Products column
      const productsColumn = this._createColumn("PRODUCTS", () => {
        return this._products.map(product => ({
          label: product.code,
          href: product.href
        }));
      });
      footerContainer.add(productsColumn, { flex: 1 });

      // Others column
      const othersColumn = this._createColumn("OTHERS", () => {
        return [
          { label: "List of clients", href: "/list-of-clients" },
          { label: "Release Notes", href: "/release-notes" }
        ];
      });
      footerContainer.add(othersColumn, { flex: 1 });

      // Contact column - takes more space
      const contactColumn = this._createContactColumn();
      footerContainer.add(contactColumn, { flex: 2 });

      // Wrapper to center footer content
      const footerWrapper = new qx.ui.container.Composite();
      footerWrapper.setLayout(new qx.ui.layout.VBox());
      footerWrapper.add(footerContainer);

      this.add(footerWrapper);

      // Copyright section - full width, centered text
      const copyrightContainer = new qx.ui.container.Composite();
      copyrightContainer.setLayout(new qx.ui.layout.VBox(2));
      copyrightContainer.setPadding(8, 40);
      copyrightContainer.setAlignX("center");

      const copyright1 = new qx.ui.basic.Label("All Rights Reserved 2003-2019");
      copyright1.setAlignX("center");
      const copyright2 = new qx.ui.basic.Label("Digital Software Corporation © 2003-2019");
      copyright2.setAlignX("center");
      const copyright3 = new qx.ui.basic.Label("Designed by Okonut");
      copyright3.setAlignX("center");

      copyrightContainer.add(copyright1);
      copyrightContainer.add(copyright2);
      copyrightContainer.add(copyright3);

      this.add(copyrightContainer);
    },

    /**
     * Create a column with title and items
     */
    _createColumn(title, getItems) {
      const column = new qx.ui.container.Composite();
      column.setLayout(new qx.ui.layout.VBox(8));

      const titleLabel = new qx.ui.basic.Label(title);
      titleLabel.setFont("bold");
      titleLabel.setPaddingBottom(6);

      column.add(titleLabel);

      const items = getItems();
      items.forEach(item => {
        const itemLabel = new qx.ui.basic.Label(item.label);
        itemLabel.setPaddingBottom(2);
        itemLabel.addListener("tap", () => {
          this.fireDataEvent("navigate", { path: item.href });
        }, this);
        column.add(itemLabel);
      });

      return column;
    },

    /**
     * Create contact information column
     */
    _createContactColumn() {
      const column = new qx.ui.container.Composite();
      column.setLayout(new qx.ui.layout.VBox(8));

      const titleLabel = new qx.ui.basic.Label("FOR MORE INFORMATION CONTACT");
      titleLabel.setFont("bold");
      titleLabel.setPaddingBottom(6);

      column.add(titleLabel);

      const nameLabel = new qx.ui.basic.Label("THOMAS C. SADDUL");
      nameLabel.setFont("bold");
      nameLabel.setPaddingTop(8);

      const titleLabel2 = new qx.ui.basic.Label("President / CEO / Chief Architect");
      titleLabel2.setPaddingBottom(12);

      column.add(nameLabel);
      column.add(titleLabel2);

      // Contact info items
      const contactItems = [
        { icon: "✉", text: "digisoftphofficial@gmail.com" },
        { icon: "📞", text: "Globe: 09278591168 | Smart: 09214524212" },
        { icon: "📍", text: "Paranaque City, Philippines" },
        { icon: "📘", text: "DigiSoftPH", link: "https://www.facebook.com/DigiSoftPH/" }
      ];

      contactItems.forEach(item => {
        const contactItem = new qx.ui.container.Composite();
        contactItem.setLayout(new qx.ui.layout.HBox(8));
        contactItem.setPaddingBottom(2);

        const iconLabel = new qx.ui.basic.Label(item.icon);
        iconLabel.setWidth(20);
        iconLabel.setHeight(20);

        const textLabel = new qx.ui.basic.Label(item.text);
        if (item.link) {
          textLabel.addListener("tap", () => {
            window.open(item.link, "_blank");
          }, this);
        }

        contactItem.add(iconLabel);
        contactItem.add(textLabel, { flex: 1 });
        column.add(contactItem);
      });

      return column;
    },

    /**
     * Load products for footer
     */
    loadProducts() {
      landing_qooxdoo.util.ExcelReader.getAllProducts().then(products => {
        this._products = products;
        this.removeAll();
        this._init();
      }).catch(error => {
        console.error("Failed to load products:", error);
      });
    }
  }
});
