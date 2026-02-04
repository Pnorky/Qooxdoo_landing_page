/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("landing_qooxdoo.util.Theme", {
  type: "static",

  statics: {
    /**
     * Color constants for pure qooxdoo styling
     */
    COLORS: {
      background: "#ffffff",
      foreground: "#333333",
      card: "#ffffff",
      "card-foreground": "#333333",
      muted: "#f5f5f5",
      "muted-foreground": "#666666",
      border: "#e0e0e0",
      primary: "#004580",
      "primary-foreground": "#ffffff",
      secondary: "#ffa500",
      "secondary-foreground": "#ffffff"
    },

    /**
     * Apply theme background color to a widget
     * @param {qx.ui.core.Widget} widget - The widget to style
     * @param {String} variant - Theme variant: "background", "card", "muted", etc.
     */
    applyBackground(widget, variant = "background") {
      const color = this.COLORS[variant] || this.COLORS.background;
      const applyStyle = () => {
        const contentElement = widget.getContentElement();
        if (contentElement) {
          const element = contentElement.getDomElement();
          if (element) {
            element.style.backgroundColor = color;
          }
        }
      };
      
      if (widget.isVisible()) {
        applyStyle();
      } else {
        widget.addListenerOnce("appear", applyStyle, widget);
      }
    },

    /**
     * Apply theme text color to a widget
     * @param {qx.ui.core.Widget} widget - The widget to style
     * @param {String} variant - Theme variant: "foreground", "muted-foreground", etc.
     */
    applyForeground(widget, variant = "foreground") {
      const color = this.COLORS[variant] || this.COLORS.foreground;
      const applyStyle = () => {
        const contentElement = widget.getContentElement();
        if (contentElement) {
          const element = contentElement.getDomElement();
          if (element) {
            element.style.color = color;
          }
        }
      };
      
      if (widget.isVisible()) {
        applyStyle();
      } else {
        widget.addListenerOnce("appear", applyStyle, widget);
      }
    },

    /**
     * Get color value for a theme property
     * @param {String} propertyName - Name of the theme property
     * @return {String} The color value
     */
    getColor(propertyName) {
      return this.COLORS[propertyName] || this.COLORS.foreground;
    },

    /**
     * Apply theme styles to a container
     * @param {qx.ui.container.Composite} container - Container to style
     * @param {Object} options - Styling options
     */
    styleContainer(container, options = {}) {
      const {
        background = "card",
        foreground = "card-foreground",
        border = false,
        padding = null
      } = options;

      this.applyBackground(container, background);
      this.applyForeground(container, foreground);
      
      if (border) {
        this.applyBorder(container);
      }
      
      if (padding !== null) {
        container.setPadding(padding);
      }
    },

    /**
     * Apply theme styles to DOM element directly
     * @param {Element} element - DOM element to style
     * @param {Object} options - Styling options
     */
    styleDOMElement(element, options = {}) {
      const {
        background = null,
        foreground = null,
        border = false
      } = options;

      if (background) {
        element.style.backgroundColor = this.COLORS[background] || this.COLORS.background;
      }
      
      if (foreground) {
        element.style.color = this.COLORS[foreground] || this.COLORS.foreground;
      }
      
      if (border) {
        element.style.borderColor = this.COLORS.border;
        element.style.borderWidth = "1px";
        element.style.borderStyle = "solid";
      }
    },

    /**
     * Apply theme border color to a widget using decorator
     * @param {qx.ui.core.Widget} widget - The widget to style
     */
    applyBorder(widget) {
      const borderColor = this.COLORS.border;
      try {
        widget.setDecorator(new qx.ui.decoration.Decorator().set({
          width: 1,
          color: borderColor
        }));
      } catch (e) {
        widget.addListenerOnce("appear", () => {
          const domElement = widget.getContentElement();
          if (domElement) {
            const element = domElement.getDomElement();
            if (element) {
              element.style.borderColor = borderColor;
              element.style.borderWidth = "1px";
              element.style.borderStyle = "solid";
            }
          }
        }, this);
      }
    }
  }
});
