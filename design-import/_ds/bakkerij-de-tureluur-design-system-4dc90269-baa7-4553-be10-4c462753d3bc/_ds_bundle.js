/* @ds-bundle: {"format":4,"namespace":"BakkerijDeTureluurDesignSystem_4dc902","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"6155c1df42ae","components/core/Button.jsx":"8e7e8b3d7658","components/core/Card.jsx":"666c50054e0f","components/core/Input.jsx":"9ebaa5d759be","components/core/SectionHeading.jsx":"460b13915e8a","components/navigation/Footer.jsx":"bf9315bf9f17","components/navigation/NavBar.jsx":"8f779d834cf8","ui_kit/website/Home.jsx":"f7c7df3b1dd0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BakkerijDeTureluurDesignSystem_4dc902 = window.BakkerijDeTureluurDesignSystem_4dc902 || {});

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
      background: 'var(--green-100)',
      color: 'var(--brand-primary)'
    },
    accent: {
      background: 'var(--orange-100)',
      color: 'var(--orange-700)'
    },
    inverse: {
      background: 'rgba(255,255,255,0.16)',
      color: 'var(--text-inverse)'
    }
  };
  const style = {
    ...tones[tone],
    display: 'inline-block',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fs-xs)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase',
    padding: '4px 10px',
    borderRadius: 'var(--radius-pill)'
  };
  return React.createElement('span', {
    style
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
  icon = null,
  onClick,
  type = 'button'
}) {
  const sizes = {
    sm: {
      padding: '8px 14px',
      fontSize: 'var(--fs-sm)'
    },
    md: {
      padding: '12px 20px',
      fontSize: 'var(--fs-base)'
    },
    lg: {
      padding: '16px 28px',
      fontSize: 'var(--fs-md)'
    }
  };
  const variants = {
    primary: {
      background: 'var(--brand-primary)',
      color: 'var(--text-inverse)',
      border: 'none'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--brand-primary)',
      border: '1.5px solid var(--brand-primary)'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--text-inverse)',
      border: 'none'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: 'none'
    }
  };
  const style = {
    ...sizes[size],
    ...variants[variant],
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-semibold)',
    borderRadius: 'var(--radius-sm)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background 0.15s ease, transform 0.1s ease',
    lineHeight: 1
  };
  return React.createElement('button', {
    type,
    disabled,
    onClick,
    style,
    onMouseEnter: e => {
      if (disabled) return;
      if (variant === 'primary') e.currentTarget.style.background = 'var(--brand-primary-hover)';
      if (variant === 'accent') e.currentTarget.style.background = 'var(--accent-hover)';
      if (variant === 'secondary') e.currentTarget.style.background = 'var(--surface-sunken)';
      if (variant === 'ghost') e.currentTarget.style.background = 'var(--surface-sunken)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = variants[variant].background;
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = 'scale(0.98)';
      if (variant === 'primary') e.currentTarget.style.background = 'var(--brand-primary-active)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  image,
  name,
  description,
  price,
  badge
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)',
      width: '260px'
    }
  }, image && React.createElement('div', {
    style: {
      height: '160px',
      background: 'var(--green-100)'
    }
  }, image), React.createElement('div', {
    style: {
      padding: '18px'
    }
  }, badge && React.createElement('div', {
    style: {
      marginBottom: '10px'
    }
  }, badge), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-body)'
    }
  }, name), description && React.createElement('div', {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)',
      marginTop: '4px',
      lineHeight: 'var(--lh-normal)'
    }
  }, description), price && React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-base)',
      color: 'var(--accent)',
      marginTop: '12px',
      fontWeight: 'var(--fw-semibold)'
    }
  }, price)));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  as = 'input'
}) {
  const fieldStyle = {
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fs-base)',
    color: 'var(--text-body)',
    background: 'var(--surface-card)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-sm)',
    padding: '11px 14px',
    boxSizing: 'border-box',
    outline: 'none'
  };
  const field = as === 'textarea' ? React.createElement('textarea', {
    name,
    placeholder,
    value,
    onChange,
    required,
    rows: 4,
    style: {
      ...fieldStyle,
      resize: 'vertical'
    },
    onFocus: e => e.currentTarget.style.borderColor = 'var(--focus-ring)',
    onBlur: e => e.currentTarget.style.borderColor = 'var(--border-default)'
  }) : React.createElement('input', {
    type,
    name,
    placeholder,
    value,
    onChange,
    required,
    style: fieldStyle,
    onFocus: e => e.currentTarget.style.borderColor = 'var(--focus-ring)',
    onBlur: e => e.currentTarget.style.borderColor = 'var(--border-default)'
  });
  return React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)'
    }
  }, label && React.createElement('span', {
    style: {
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-body)'
    }
  }, label), field);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left'
}) {
  return React.createElement('div', {
    style: {
      textAlign: align,
      fontFamily: 'var(--font-body)',
      maxWidth: '640px',
      margin: align === 'center' ? '0 auto' : '0'
    }
  }, eyebrow && React.createElement('div', {
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      marginBottom: '10px'
    }
  }, eyebrow), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-2xl)',
      color: 'var(--text-body)',
      lineHeight: 'var(--lh-tight)'
    }
  }, title), subtitle && React.createElement('div', {
    style: {
      fontSize: 'var(--fs-md)',
      color: 'var(--text-muted)',
      marginTop: '10px',
      lineHeight: 'var(--lh-normal)'
    }
  }, subtitle));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function Footer() {
  return React.createElement('footer', {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      padding: '48px 40px',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '24px'
    }
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-lg)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, 'Bakkerij de Tureluur'), React.createElement('div', {
    style: {
      fontSize: 'var(--fs-sm)',
      opacity: 0.8,
      marginTop: '8px'
    }
  }, 'Tureluurdwarsstraat 12, 1349 EK Almere')), React.createElement('div', {
    style: {
      fontSize: 'var(--fs-sm)',
      opacity: 0.8
    }
  }, React.createElement('div', null, 'detureluur@gmail.com'), React.createElement('div', {
    style: {
      marginTop: '6px'
    }
  }, 'Bestellingen graag enkele dagen van tevoren')));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function NavBar({
  active
}) {
  const links = [['Home', 'home'], ['Assortiment', 'assortiment'], ['Over ons', 'over'], ['Contact', 'contact']];
  return React.createElement('nav', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 40px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-default)',
      fontFamily: 'var(--font-body)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, React.createElement('img', {
    src: '../../assets/logo.png',
    style: {
      height: '40px'
    }
  }), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-body)'
    }
  }, 'Bakkerij de Tureluur')), React.createElement('div', {
    style: {
      display: 'flex',
      gap: '32px'
    }
  }, links.map(([label, key]) => React.createElement('a', {
    key,
    href: '#' + key,
    style: {
      fontSize: 'var(--fs-base)',
      fontWeight: 'var(--fw-medium)',
      textDecoration: 'none',
      color: active === key ? 'var(--brand-primary)' : 'var(--text-body)',
      borderBottom: active === key ? '2px solid var(--accent)' : '2px solid transparent',
      paddingBottom: '4px'
    }
  }, label))));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kit/website/Home.jsx
try { (() => {
const {
  Button,
  Badge,
  Card,
  Input,
  SectionHeading
} = window.BakkerijDeTureluurDesignSystem_4dc902;
const {
  NavBar,
  Footer
} = window.BakkerijDeTureluurDesignSystem_4dc902;
function Placeholder({
  label,
  height = '260px'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      background: 'var(--green-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--brand-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      borderRadius: 'var(--radius-md)'
    }
  }, label);
}
const products = [{
  name: 'Lemaire',
  desc: 'Batard van gebuild tarwemeel op een volkoren-roggedesem — er is ook een gevulde variant.',
  price: '€4,20',
  badge: 'Zuurdesem'
}, {
  name: 'Speltbrood',
  desc: 'Volkoren spelt, mild en luchtig.',
  price: '€4,50',
  badge: 'Biologisch'
}, {
  name: 'Tarwe volkorenbrood',
  desc: 'Een stevige batard voor dagelijks gebruik.',
  price: '€3,90',
  badge: 'Biologisch'
}, {
  name: 'Baguette',
  desc: 'Krokante korst, luchtige kruim.',
  price: '€2,80'
}, {
  name: 'Croissant',
  desc: 'Boter, dagvers gebakken.',
  price: '€2,60'
}, {
  name: 'Brioche',
  desc: 'Zacht en licht gezoet.',
  price: '€3,20'
}];
function Home() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    active: "home"
  }), /*#__PURE__*/React.createElement("section", {
    id: "home",
    style: {
      padding: '88px 40px',
      display: 'flex',
      gap: '56px',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      marginBottom: '14px'
    }
  }, "Bakkerij in het Oosterwold"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-4xl)',
      lineHeight: 'var(--lh-tight)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, "Vers gebakken brood, elke ochtend"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-md)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-relaxed)',
      marginTop: '20px',
      maxWidth: '480px'
    }
  }, "Robuuste desembroden van diverse graansoorten en baguettes vormen de basis van ons assortiment. Pure grondstoffen, van biologische of biologisch dynamische oorsprong, zo regionaal mogelijk geproduceerd."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '16px',
      marginTop: '32px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => document.getElementById('contact').scrollIntoView()
  }, "Bestel per e-mail"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => document.getElementById('assortiment').scrollIntoView()
  }, "Bekijk assortiment"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    label: "foto: brood op de plank",
    height: "360px"
  }))), /*#__PURE__*/React.createElement("section", {
    id: "assortiment",
    style: {
      padding: '80px 40px',
      maxWidth: '1200px',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Assortiment",
    title: "Wat we bakken",
    subtitle: "Het assortiment bestaat uit o.a. speltbrood, tarwebrood, croissants en baguettes \u2014 allemaal volledig zelf gemaakt en dagelijks vers."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
      gap: '24px',
      marginTop: '40px'
    }
  }, products.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.name,
    image: /*#__PURE__*/React.createElement(Placeholder, {
      label: 'foto: ' + p.name.toLowerCase(),
      height: "160px"
    }),
    name: p.name,
    description: p.desc,
    price: p.price,
    badge: p.badge && /*#__PURE__*/React.createElement(Badge, null, p.badge)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '32px',
      padding: '20px 24px',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--fs-base)',
      color: 'var(--text-body)'
    }
  }, "In oneven weken maken we op donderdag pizza, 16:30\u201320:00, met groenten en kruiden van eigen erf.")), /*#__PURE__*/React.createElement("section", {
    id: "over",
    style: {
      padding: '80px 40px',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '56px',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    label: "foto: bakkerij van hout en stro",
    height: "320px"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Over ons",
    title: "Een familiebedrijf in Oosterwold"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-md)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-relaxed)',
      marginTop: '20px'
    }
  }, "De bakkerij opende op 11 mei 2019 voor het eerst haar deur. Na bijna een jaar in een tijdelijk pand hebben we het definitieve pand betrokken: een fraai duurzaam, houten gebouw, ge\xEFsoleerd met strobalen. Een zee van ruimte."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-md)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-relaxed)',
      marginTop: '16px'
    }
  }, "Sandra en haar zoon Ezra bakken hier een paar dagen per week brood: het deeg krijgt ruim de tijd om te fermenteren, veelal overnacht, zodat het makkelijk verteerbaar is en alle tijd heeft optimaal smaak en aroma te ontwikkelen. Waar mogelijk gebruiken we producten van eigen erf \u2014 fruit, kruiden, groenten en eieren.")))), /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: '80px 40px',
      maxWidth: '1200px',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '56px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Contact",
    title: "Langskomen of bestellen"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-md)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-relaxed)',
      marginTop: '20px'
    }
  }, "Tureluurdwarsstraat 12, 1349 EK Almere", /*#__PURE__*/React.createElement("br", null), "detureluur@gmail.com", /*#__PURE__*/React.createElement("br", null), "Open zaterdag en zondag, 9:00\u201314:00"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)',
      marginTop: '16px'
    }
  }, "Bestellingen graag enkele dagen van tevoren per e-mail.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Naam",
    placeholder: "Je naam"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "E-mailadres",
    type: "email",
    placeholder: "naam@voorbeeld.nl"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Bestelling",
    as: "textarea",
    placeholder: "Wat wil je bestellen, en voor welke dag?"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Versturen")))), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Home, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kit/website/Home.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

})();
