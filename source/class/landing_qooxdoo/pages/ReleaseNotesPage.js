/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("landing_qooxdoo.pages.ReleaseNotesPage", {
  extend: qx.ui.container.Composite,

  construct() {
    this.base(arguments);
    this.setLayout(new qx.ui.layout.VBox(16));
    this.setPadding(24, 24);
    this.setAllowGrowX(true);
    this.setAllowGrowY(true);
    this._init();
  },

  members: {
    _init() {
      const pageContentEl = this.getContentElement();
      if (pageContentEl && pageContentEl.addClass) pageContentEl.addClass("release-notes-page");

      // Header: title + subtitle (like reference)
      const headerBlock = new qx.ui.container.Composite(new qx.ui.layout.VBox(4));
      const title = new landing_qooxdoo.ui.Label("RELEASE NOTES");
      title.setFont("bold");
      if (title.getContentElement()) title.getContentElement().addClass("release-notes-page-title");
      headerBlock.add(title);
      const subtitle = new landing_qooxdoo.ui.Label("List of release notes for all products");
      if (subtitle.getContentElement()) subtitle.getContentElement().addClass("release-notes-page-subtitle");
      headerBlock.add(subtitle);
      this.add(headerBlock);

      // Accordion container (scrollable)
      const accordionContainer = new qx.ui.container.Composite();
      accordionContainer.setLayout(new qx.ui.layout.VBox());
      accordionContainer.setAllowGrowX(true);
      if (accordionContainer.getContentElement()) {
        accordionContainer.getContentElement().addClass("release-notes-accordion-wrap");
      }
      this._accordionContainer = accordionContainer;
      this._scroll = new qx.ui.container.Scroll();
      this._scroll.setScrollbarY("auto");
      this._scroll.setScrollbarX("off");
      accordionContainer.add(this._scroll, { flex: 1 });
      this.add(accordionContainer, { flex: 1 });

      this._loadingLabel = new landing_qooxdoo.ui.Label("Loading release notes...");
      this._scroll.add(this._loadingLabel);

      this._loadReleaseNotes();
    },

    /**
     * Load release notes and fill accordion (one item per product)
     */
    _loadReleaseNotes() {
      const excelReader = landing_qooxdoo.util.ExcelReader;

      excelReader.getReleaseNotesFromChangelogs()
        .then((changelogItems) => {
          this._scroll.remove(this._loadingLabel);

          if (changelogItems && changelogItems.length > 0) {
            this._buildAccordionFromChangelogs(changelogItems);
            return;
          }

          return excelReader.getReleaseNotes().then((items) => {
            if (!items || items.length === 0) {
              const empty = new landing_qooxdoo.ui.Label(
                "No release notes available. Add changelog files to public/downloads (e.g. sias-changelog.txt) or a \"ReleaseNotes\" sheet in products.xlsx."
              );
              empty.setWrap(true);
              this._scroll.add(empty);
              return;
            }
            this._buildAccordionFromExcel(items);
          });
        })
        .catch((err) => {
          if (this._loadingLabel && this._scroll.getChildren().indexOf(this._loadingLabel) >= 0) {
            this._scroll.remove(this._loadingLabel);
          }
          const errorLabel = new landing_qooxdoo.ui.Label(
            "Unable to load release notes: " + (err && err.message ? err.message : "Unknown error")
          );
          errorLabel.setWrap(true);
          this._scroll.add(errorLabel);
        });
    },

    _buildAccordionFromChangelogs(changelogItems) {
      const accordion = new landing_qooxdoo.ui.Accordion();
      accordion.setAllowGrowX(true);
      accordion.setAllowGrowY(false);
      accordion.setRichContent(false);

      changelogItems.forEach((item) => {
        const summary = item.title || item.code || "Changelog";
        const content = (item.content || "").trim();
        accordion.addItem(summary, content);
      });

      this._scroll.add(accordion);
    },

    _buildAccordionFromExcel(items) {
      const accordion = new landing_qooxdoo.ui.Accordion();
      accordion.setAllowGrowX(true);
      accordion.setAllowGrowY(false);
      accordion.setRichContent(false);

      const byCode = {};
      items.forEach((item) => {
        const code = (item.code || "").trim() || "Other";
        if (!byCode[code]) byCode[code] = [];
        byCode[code].push(item);
      });

      Object.keys(byCode).forEach((code) => {
        const rows = byCode[code];
        const summary = code + " (" + code + ")";
        const content = rows
          .map((r) => {
            const parts = [];
            if (r.version) parts.push("Version " + r.version);
            if (r.date) parts.push(r.date);
            const header = parts.length > 0 ? parts.join(" · ") + "\n" : "";
            return header + (r.notes || "").trim();
          })
          .join("\n\n");
        accordion.addItem(summary, content);
      });

      this._scroll.add(accordion);
    }
  }
});
