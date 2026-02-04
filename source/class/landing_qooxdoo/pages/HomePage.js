/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("landing_qooxdoo.pages.HomePage", {
  extend: qx.ui.container.Composite,

  events: {
    /** Fired when navigation is requested */
    navigate: "qx.event.type.Data"
  },

  construct() {
    this.base(arguments);
    this.setLayout(new qx.ui.layout.VBox());
    this._init();
  },

  members: {
    _init() {
      // Hero section
      const heroSection = new landing_qooxdoo.components.HeroSection();
      heroSection.addListener("productClick", (e) => {
        const product = e.getData();
        this.fireDataEvent("navigate", { path: product.href });
      }, this);
      heroSection.loadProducts();
      this.add(heroSection);

      // Features section - make it take more space
      const featuresSection = new landing_qooxdoo.components.FeaturesSection();
      this.add(featuresSection, { flex: 1 });
    }
  }
});
