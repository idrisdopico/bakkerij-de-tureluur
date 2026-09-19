/* @ds-bundle: {"format":4,"namespace":"DopiCodeDesignSystem_6ce5a1","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"202efbf0b6c9","components/core/Button.jsx":"8bf80143b634","components/core/Card.jsx":"d726fa272795","components/core/Divider.jsx":"5ee74d7c9ab3","components/core/Tag.jsx":"b055399c9a0a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DopiCodeDesignSystem_6ce5a1 = window.DopiCodeDesignSystem_6ce5a1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const TONES = {
  neutral: {
    background: 'var(--surface-sunken)',
    color: 'var(--text-secondary)'
  },
  brand: {
    background: 'var(--brand-subtle)',
    color: 'var(--brand-subtle-text)'
  },
  success: {
    background: 'var(--status-success-subtle)',
    color: 'var(--status-success)'
  },
  warning: {
    background: 'var(--status-warning-subtle)',
    color: 'var(--status-warning)'
  },
  danger: {
    background: 'var(--status-danger-subtle)',
    color: 'var(--status-danger)'
  }
};
function Badge({
  children,
  tone = 'neutral',
  dot = false
}) {
  const toneStyle = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...toneStyle,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      lineHeight: 1
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    padding: '6px 14px',
    fontSize: 'var(--text-sm)'
  },
  md: {
    padding: '10px 18px',
    fontSize: 'var(--text-base)'
  },
  lg: {
    padding: '13px 24px',
    fontSize: 'var(--text-lg)'
  }
};
const VARIANTS = {
  primary: {
    background: 'var(--brand-primary)',
    color: 'var(--text-on-brand)',
    border: '1px solid transparent'
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--brand-primary)',
    border: '1px solid var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid transparent'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  onClick,
  type = 'button'
}) {
  const sizeStyle = SIZES[size] || SIZES.md;
  const variantStyle = VARIANTS[variant] || VARIANTS.primary;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    disabled: disabled,
    className: "dc-button",
    style: {
      ...sizeStyle,
      ...variantStyle,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-semibold)',
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'filter 0.15s ease, transform 0.05s ease'
    }
  }, icon, children), /*#__PURE__*/React.createElement("style", null, `
        .dc-button:hover:not(:disabled){filter:brightness(0.93)}
        .dc-button:active:not(:disabled){transform:scale(0.98)}
        .dc-button:focus-visible{outline:none;box-shadow:var(--shadow-focus)}
      `));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
const VARIANTS = {
  flat: {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-default)',
    boxShadow: 'none'
  },
  elevated: {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-default)',
    boxShadow: 'var(--shadow-md)'
  },
  outlined: {
    background: 'transparent',
    border: '1px solid var(--border-strong)',
    boxShadow: 'none'
  }
};
function Card({
  children,
  variant = 'flat',
  padding = 'var(--space-6)'
}) {
  const variantStyle = VARIANTS[variant] || VARIANTS.flat;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...variantStyle,
      borderRadius: 'var(--radius-lg)',
      padding
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function Divider({
  orientation = 'horizontal',
  label
}) {
  if (orientation === 'vertical') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '1px',
        alignSelf: 'stretch',
        background: 'var(--border-default)'
      }
    });
  }
  if (label) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: '1px',
        background: 'var(--border-default)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-wider)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: '1px',
        background: 'var(--border-default)'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '1px',
      background: 'var(--border-default)'
    }
  });
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  active = false,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: 'var(--radius-sm)',
      background: active ? 'var(--brand-subtle)' : 'var(--surface-card)',
      border: `1px solid ${active ? 'var(--purple-200)' : 'var(--border-default)'}`,
      color: active ? 'var(--brand-subtle-text)' : 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--text-sm)'
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'inherit',
      cursor: 'pointer',
      padding: 0,
      fontSize: 'var(--text-sm)',
      lineHeight: 1,
      opacity: 0.6
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Tag = __ds_scope.Tag;

})();
