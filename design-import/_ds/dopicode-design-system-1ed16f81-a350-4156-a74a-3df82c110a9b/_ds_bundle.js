/* @ds-bundle: {"format":4,"namespace":"DopiCodeDesignSystem_1ed16f","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"ab8f2878fe77","components/core/Button.jsx":"43d1d43fac8c","components/core/Card.jsx":"9714f59d83a7","components/core/IconButton.jsx":"91a69ef9e2e5","components/core/Tag.jsx":"471b63376dc1","components/feedback/Dialog.jsx":"d091a0b9c1b2","components/feedback/Toast.jsx":"eef94783a69a","components/feedback/Tooltip.jsx":"3d4c58ab8a90","components/forms/Checkbox.jsx":"b6fa20fbaedb","components/forms/Input.jsx":"2d5fef36407f","components/forms/Radio.jsx":"61ec8fbb4215","components/forms/Select.jsx":"139f8a59444d","components/forms/Switch.jsx":"af3077a49566","components/navigation/Tabs.jsx":"ddc988c7f192"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DopiCodeDesignSystem_1ed16f = window.DopiCodeDesignSystem_1ed16f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = 'neutral'
}) {
  const tones = {
    neutral: {
      background: 'var(--surface-sunken)',
      color: 'var(--fg-2)'
    },
    wood: {
      background: 'var(--wood-100)',
      color: 'var(--wood-700)'
    },
    sage: {
      background: 'var(--sage-100)',
      color: 'var(--sage-700)'
    },
    success: {
      background: 'var(--color-success-bg)',
      color: 'var(--color-success)'
    },
    warning: {
      background: 'var(--color-warning-bg)',
      color: 'var(--color-warning)'
    },
    error: {
      background: 'var(--color-error-bg)',
      color: 'var(--color-error)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...tones[tone],
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      padding: '3px 9px',
      borderRadius: 'var(--radius-sm)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      display: 'inline-block'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  onClick,
  type = 'button'
}) {
  const sizes = {
    sm: {
      padding: '6px 14px',
      fontSize: 'var(--text-sm)'
    },
    md: {
      padding: '10px 20px',
      fontSize: 'var(--text-base)'
    },
    lg: {
      padding: '13px 28px',
      fontSize: 'var(--text-md)'
    }
  };
  const variants = {
    primary: {
      background: 'var(--accent-primary)',
      color: 'var(--fg-inverse)',
      border: '1px solid transparent'
    },
    secondary: {
      background: 'var(--sage-500)',
      color: 'var(--fg-inverse)',
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--fg-1)',
      border: '1px solid var(--border-default)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--fg-1)',
      border: '1px solid transparent'
    }
  };
  const hover = {
    primary: 'var(--accent-primary-hover)',
    secondary: 'var(--sage-600)',
    outline: 'var(--surface-sunken)',
    ghost: 'var(--surface-sunken)'
  };
  const [hovered, setHovered] = React.useState(false);
  const v = variants[variant];
  const style = {
    ...v,
    ...sizes[size],
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)',
    background: hovered && !disabled ? hover[variant] : v.background,
    letterSpacing: 'var(--tracking-normal)'
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: style,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  padding = 'md',
  bordered = true
}) {
  const paddings = {
    sm: 'var(--space-4)',
    md: 'var(--space-5)',
    lg: 'var(--space-6)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: bordered ? '1px solid var(--border-soft)' : 'none',
      borderRadius: 'var(--radius-md)',
      padding: paddings[padding],
      boxShadow: 'var(--shadow-sm)'
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'ghost',
  onClick
}) {
  const dims = {
    sm: 30,
    md: 38,
    lg: 46
  };
  const variants = {
    ghost: {
      background: 'transparent',
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      border: '1px solid var(--border-default)'
    },
    filled: {
      background: 'var(--surface-sunken)',
      border: '1px solid transparent'
    }
  };
  const [hovered, setHovered] = React.useState(false);
  const d = dims[size];
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      width: d,
      height: d,
      borderRadius: 'var(--radius-sm)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'var(--fg-1)',
      ...variants[variant],
      background: hovered ? 'var(--surface-sunken)' : variants[variant].background,
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'transparent',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-sm)',
      padding: '4px 10px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--fg-2)'
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("span", {
    onClick: onRemove,
    style: {
      cursor: 'pointer',
      color: 'var(--fg-3)'
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(36,28,20,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-6)',
      width: 380,
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-body)'
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--fg-1)',
      marginBottom: 'var(--space-2)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-soft)',
      margin: 'var(--space-3) 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--fg-2)'
    }
  }, children)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  message,
  tone = 'neutral',
  onDismiss
}) {
  const tones = {
    neutral: {
      border: 'var(--border-default)',
      dot: 'var(--fg-2)'
    },
    success: {
      border: 'var(--color-success)',
      dot: 'var(--color-success)'
    },
    error: {
      border: 'var(--color-error)',
      dot: 'var(--color-error)'
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--surface-card)',
      border: `1px solid ${t.border}`,
      borderRadius: 'var(--radius-sm)',
      padding: '12px 16px',
      boxShadow: 'var(--shadow-md)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--fg-1)',
      width: 280
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 'var(--radius-full)',
      background: t.dot,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, message), onDismiss && /*#__PURE__*/React.createElement("span", {
    onClick: onDismiss,
    style: {
      cursor: 'pointer',
      color: 'var(--fg-3)'
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  children,
  label,
  position = 'top'
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '120%',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    bottom: {
      top: '120%',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-block'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      ...pos[position],
      background: 'var(--neutral-900)',
      color: 'var(--fg-inverse)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      padding: '5px 9px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      zIndex: 10
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      cursor: disabled ? 'default' : 'pointer',
      fontFamily: 'var(--font-body)',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-sm)',
      border: `1.5px solid ${checked ? 'var(--wood-400)' : 'var(--border-default)'}`,
      background: checked ? 'var(--wood-400)' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "8",
    viewBox: "0 0 10 8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 4L3.5 6.5L9 1",
    stroke: "#faf7f1",
    strokeWidth: "1.6",
    fill: "none"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--fg-1)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  disabled = false
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--fg-2)',
      fontWeight: 500
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${error ? 'var(--color-error)' : focused ? 'var(--wood-400)' : 'var(--border-default)'}`,
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      fontSize: 'var(--text-base)',
      color: 'var(--fg-1)',
      outline: 'none',
      transition: 'border var(--duration-fast) var(--ease-standard)'
    }
  }), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--color-error)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      cursor: disabled ? 'default' : 'pointer',
      fontFamily: 'var(--font-body)',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(),
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-full)',
      border: `1.5px solid ${checked ? 'var(--wood-400)' : 'var(--border-default)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 'var(--radius-full)',
      background: 'var(--wood-400)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--fg-1)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--fg-2)',
      fontWeight: 500
    }
  }, label), /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    disabled: disabled,
    style: {
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      fontSize: 'var(--text-base)',
      color: 'var(--fg-1)',
      fontFamily: 'var(--font-body)'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  disabled = false,
  label
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 38,
      height: 22,
      borderRadius: 'var(--radius-full)',
      padding: 2,
      background: checked ? 'var(--wood-400)' : 'var(--border-default)',
      transition: 'background var(--duration-normal) var(--ease-standard)',
      display: 'flex',
      justifyContent: checked ? 'flex-end' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-full)',
      background: '#faf7f1',
      transition: 'transform var(--duration-normal) var(--ease-standard)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--fg-1)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      borderBottom: '1px solid var(--border-soft)',
      fontFamily: 'var(--font-body)'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    onClick: () => onChange && onChange(t),
    style: {
      padding: '10px 2px',
      cursor: 'pointer',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: active === t ? 'var(--fg-1)' : 'var(--fg-3)',
      borderBottom: active === t ? '2px solid var(--wood-400)' : '2px solid transparent',
      marginBottom: -1
    }
  }, t)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
