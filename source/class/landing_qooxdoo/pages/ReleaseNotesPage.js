/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("landing_qooxdoo.pages.ReleaseNotesPage", {
  extend: qx.ui.container.Composite,

  construct() {
    this.base(arguments);
    this.setLayout(new qx.ui.layout.VBox(20));
    this.setPadding(40, 60);
    this.setMaxWidth(1200);
    this.setAlignX("center");
    this._init();
  },

  members: {
    _init() {
      // Title
      const title = new qx.ui.basic.Label("Release Notes");
      title.setFont("bold");
      this.add(title);

      // Content container
      const contentContainer = new qx.ui.container.Composite();
      contentContainer.setLayout(new qx.ui.layout.VBox(16));
      this._contentContainer = contentContainer;
      this.add(contentContainer, { flex: 1 });

      // Load release notes
      this._loadReleaseNotes();
    },

    /**
     * Load release notes
     */
    _loadReleaseNotes() {
      // Try to load from Excel file if available
      // For now, show placeholder
      const placeholder = new qx.ui.basic.Label("Release notes will be displayed here.");
      this._contentContainer.add(placeholder);
    }
  }
});
