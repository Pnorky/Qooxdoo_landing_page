/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("landing_qooxdoo.pages.ListOfClientsPage", {
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
      const title = new qx.ui.basic.Label("List of Clients");
      title.setFont("bold");
      this.add(title);

      // Table container
      const tableContainer = new qx.ui.container.Composite();
      tableContainer.setLayout(new qx.ui.layout.VBox());
      this._tableContainer = tableContainer;
      this.add(tableContainer, { flex: 1 });

      // Load clients
      this._loadClients();
    },

    /**
     * Load clients from Excel
     */
    _loadClients() {
      landing_qooxdoo.util.ExcelReader.getListOfClients()
        .then(clients => {
          if (clients.length === 0) {
            const noDataLabel = new qx.ui.basic.Label("No clients found");
            this._tableContainer.add(noDataLabel);
            return;
          }

          // Create table
          const table = new qx.ui.table.Table();
          const tableModel = new qx.ui.table.model.Simple();
          
          // Get column names from first client
          const firstClient = clients[0];
          const columns = Object.keys(firstClient);
          
          tableModel.setColumns(columns, columns);
          
          // Add data rows
          const data = clients.map(client => {
            return columns.map(col => client[col] || "");
          });
          tableModel.setData(data);
          
          table.setTableModel(tableModel);
          table.setColumnWidth(0, 200);
          
          this._tableContainer.add(table, { flex: 1 });
        })
        .catch(error => {
          console.error("Failed to load clients:", error);
          const errorLabel = new qx.ui.basic.Label("Error loading clients: " + error.message);
          this._tableContainer.add(errorLabel);
        });
    }
  }
});
