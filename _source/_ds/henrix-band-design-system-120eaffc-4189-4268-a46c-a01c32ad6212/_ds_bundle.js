/* @ds-bundle: {"format":4,"namespace":"HenrixBandDesignSystem_120eaf","components":[{"name":"AccentRule","sourcePath":"components/brand/AccentRule.jsx"},{"name":"Eyebrow","sourcePath":"components/brand/Eyebrow.jsx"},{"name":"SectionTitle","sourcePath":"components/brand/SectionTitle.jsx"},{"name":"Accent","sourcePath":"components/brand/SectionTitle.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Chip","sourcePath":"components/lists/Chip.jsx"},{"name":"NumberedItem","sourcePath":"components/lists/NumberedItem.jsx"},{"name":"SongColumn","sourcePath":"components/lists/SongColumn.jsx"},{"name":"PhotoSection","sourcePath":"components/media/PhotoSection.jsx"},{"name":"PromoVideo","sourcePath":"components/media/PromoVideo.jsx"},{"name":"InfoTile","sourcePath":"components/offer/InfoTile.jsx"},{"name":"Price","sourcePath":"components/offer/Price.jsx"},{"name":"StatFigure","sourcePath":"components/offer/StatFigure.jsx"},{"name":"TierCard","sourcePath":"components/offer/TierCard.jsx"},{"name":"TierChoice","sourcePath":"components/offer/TierChoice.jsx"},{"name":"TierStrip","sourcePath":"components/offer/TierStrip.jsx"}],"sourceHashes":{"components/brand/AccentRule.jsx":"ab78a54ec1eb","components/brand/Eyebrow.jsx":"39a2bb667166","components/brand/SectionTitle.jsx":"d111f4e294e1","components/brand/Wordmark.jsx":"14fe0393a99f","components/lists/Chip.jsx":"33c57bdd87bc","components/lists/NumberedItem.jsx":"2869985ba7e8","components/lists/SongColumn.jsx":"8d311f3802c9","components/media/PhotoSection.jsx":"20f19e14c4f5","components/media/PromoVideo.jsx":"be3ec78713e1","components/offer/InfoTile.jsx":"882f5a21c486","components/offer/Price.jsx":"971418038df5","components/offer/StatFigure.jsx":"3da196c1dd18","components/offer/TierCard.jsx":"cef7928ccc34","components/offer/TierChoice.jsx":"da5a162ff227","components/offer/TierStrip.jsx":"a0260a3d833d","ui_kits/offer-booklet/Booklet.jsx":"55ad63637df6","ui_kits/offer-booklet/PagesClosing.jsx":"73b3b8cf129d","ui_kits/offer-booklet/PagesIntro.jsx":"279fe92f3bfa","ui_kits/offer-booklet/PagesProgramme.jsx":"10b1033ad09b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HenrixBandDesignSystem_120eaf = window.HenrixBandDesignSystem_120eaf || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/AccentRule.jsx
try { (() => {
function AccentRule({
  variant = 'flourish',
  tone,
  style
}) {
  if (variant === 'hairline') return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-rule)',
      ...style
    }
  });
  if (variant === 'bar') return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--bar-accent)',
      background: tone ? `var(--tier-${tone})` : 'var(--gradient-spectrum)',
      ...style
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 70,
      height: 2,
      background: 'var(--gradient-rule)',
      ...style
    }
  });
}
Object.assign(__ds_scope, { AccentRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/AccentRule.jsx", error: String((e && e.message) || e) }); }

// components/brand/Eyebrow.jsx
try { (() => {
const TONES = {
  accent: 'var(--text-accent)',
  essential: 'var(--tier-essential-text)',
  live: 'var(--tier-live-text)',
  full: 'var(--tier-full-text)',
  muted: 'var(--text-muted)',
  heading: 'var(--text-heading)'
};
function Eyebrow({
  children,
  tone = 'accent',
  weight = 700,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: `${weight} var(--fs-eyebrow)/1.3 var(--font-body)`,
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: TONES[tone] || tone,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/SectionTitle.jsx
try { (() => {
const SIZES = {
  xl: ['var(--fs-h1)', 600, 1],
  lg: ['var(--fs-h2)', 500, 1.12],
  md: ['var(--fs-h3)', 600, 1.12],
  sm: ['var(--fs-h4)', 600, 1.15]
};
function SectionTitle({
  children,
  size = 'xl',
  as = 'h2',
  style
}) {
  const [fs, fw, lh] = SIZES[size] || SIZES.xl;
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    style: {
      margin: 0,
      font: `${fw} ${fs}/${lh} var(--font-display)`,
      letterSpacing: 'var(--ls-display)',
      textTransform: 'uppercase',
      color: 'var(--text-heading)',
      textWrap: 'balance',
      ...style
    }
  }, children);
}
function Accent({
  children,
  tone = 'accent'
}) {
  const c = {
    accent: 'var(--text-accent)',
    live: 'var(--tier-live-text)',
    full: 'var(--tier-full-text)'
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color: c
    }
  }, children);
}
Object.assign(__ds_scope, { SectionTitle, Accent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function Wordmark({
  size = 104,
  stacked = true,
  accentX = true,
  style
}) {
  const x = accentX ? /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--gradient-x)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }
  }, "X") : 'X';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--fw-semibold) ${size}px/0.95 var(--font-display)`,
      letterSpacing: 'var(--ls-wordmark)',
      color: 'var(--text-heading)',
      textTransform: 'uppercase',
      ...style
    }
  }, "HENRI", x, stacked ? /*#__PURE__*/React.createElement("br", null) : ' ', "BAND");
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/lists/Chip.jsx
try { (() => {
function Chip({
  children,
  active = false,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: 'var(--chip-pad)',
      border: `1px solid ${active ? 'var(--hb-cyan-500)' : 'var(--border-chip)'}`,
      color: active ? 'var(--text-heading)' : 'var(--text-body)',
      font: 'var(--fw-regular) var(--fs-small)/1.3 var(--font-body)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color var(--dur-fast)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/Chip.jsx", error: String((e && e.message) || e) }); }

// components/lists/NumberedItem.jsx
try { (() => {
function NumberedItem({
  n,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-rule)',
      padding: '16px 0 18px',
      display: 'grid',
      gridTemplateColumns: '34px minmax(0,1fr)',
      gap: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-medium) 15px/1.3 var(--font-display)',
      color: 'var(--text-accent)'
    }
  }, String(n).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-light) var(--fs-body)/1.6 var(--font-body)',
      color: 'var(--text-heading)'
    }
  }, children));
}
Object.assign(__ds_scope, { NumberedItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/NumberedItem.jsx", error: String((e && e.message) || e) }); }

// components/lists/SongColumn.jsx
try { (() => {
function SongColumn({
  index,
  title,
  tone = 'full',
  songs = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-bold) var(--fs-eyebrow)/1.3 var(--font-body)',
      letterSpacing: 'var(--ls-eyebrow)',
      color: `var(--tier-${tone}-text)`
    }
  }, String(index).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-semibold) var(--fs-h4)/1.2 var(--font-display)',
      textTransform: 'uppercase',
      color: 'var(--text-heading)',
      margin: '4px 0 12px'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--bar-rule-short)',
      background: `var(--tier-${tone})`
    }
  }), songs.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '10px 0 11px',
      borderBottom: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-bold) var(--fs-body)/1.4 var(--font-body)',
      color: 'var(--text-strong)'
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-light) var(--fs-small)/1.4 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, s.artist))));
}
Object.assign(__ds_scope, { SongColumn });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/SongColumn.jsx", error: String((e && e.message) || e) }); }

// components/media/PhotoSection.jsx
try { (() => {
function PhotoSection({
  image,
  scrim = 'bottom',
  dim = 0,
  height = 560,
  position = 'center',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: height,
      background: `url(${image}) ${position}/cover`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: scrim === 'left' ? 'flex-start' : 'flex-end',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: scrim === 'left' ? 'var(--scrim-left)' : 'var(--scrim-bottom)'
    }
  }), dim > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: `rgba(10,10,20,${dim})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: 'var(--space-9) var(--page-margin-x)'
    }
  }, children));
}
Object.assign(__ds_scope, { PhotoSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/PhotoSection.jsx", error: String((e && e.message) || e) }); }

// components/media/PromoVideo.jsx
try { (() => {
function PromoVideo({
  thumbnail,
  eyebrow = 'Promo video',
  title,
  url,
  qr,
  qrLabel = 'Skenē',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      padding: 16,
      display: 'grid',
      gridTemplateColumns: 'minmax(0,240px) minmax(0,1fr) auto',
      gap: 24,
      alignItems: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: url,
    style: {
      position: 'relative',
      display: 'block',
      aspectRatio: '16/9',
      background: `url(${thumbnail}) center/cover`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 52,
      height: 52,
      marginLeft: -26,
      marginTop: -26,
      borderRadius: '50%',
      background: 'var(--action-play)',
      boxShadow: 'var(--shadow-play)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 0,
      height: 0,
      borderLeft: '16px solid #fff',
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      marginLeft: 4
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-bold) var(--fs-eyebrow)/1.3 var(--font-body)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-semibold) var(--fs-h3)/1.15 var(--font-display)',
      textTransform: 'uppercase',
      color: 'var(--text-heading)'
    }
  }, title), url && /*#__PURE__*/React.createElement("a", {
    href: url,
    style: {
      font: 'var(--fw-regular) var(--fs-small) var(--font-body)',
      color: 'var(--link)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, url.replace(/^https?:\/\/(www\.)?/, ''))), qr && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: qr,
    alt: "QR",
    style: {
      width: 92,
      height: 92,
      background: '#fff',
      padding: 4,
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-regular) var(--fs-caption) var(--font-body)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, qrLabel)));
}
Object.assign(__ds_scope, { PromoVideo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/PromoVideo.jsx", error: String((e && e.message) || e) }); }

// components/offer/InfoTile.jsx
try { (() => {
function InfoTile({
  color = 'var(--tier-essential)',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderTop: `var(--bar-accent) solid ${color}`,
      padding: '22px 16px',
      minHeight: 50,
      font: 'var(--fw-bold) var(--fs-body)/1.5 var(--font-body)',
      color: 'var(--text-strong)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { InfoTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/offer/InfoTile.jsx", error: String((e && e.message) || e) }); }

// components/offer/Price.jsx
try { (() => {
function Price({
  amount,
  suffix = '+ PVN',
  size = 30,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--fw-medium) ${size}px/1 var(--font-display)`,
      color: 'var(--text-heading)',
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      ...style
    }
  }, amount, suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.5,
      color: 'var(--text-muted)'
    }
  }, suffix));
}
Object.assign(__ds_scope, { Price });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/offer/Price.jsx", error: String((e && e.message) || e) }); }

// components/offer/StatFigure.jsx
try { (() => {
function StatFigure({
  label,
  value,
  unit,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-bold) var(--fs-eyebrow)/1.3 var(--font-body)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-semibold) var(--fs-stat)/1 var(--font-display)',
      color: 'var(--text-heading)',
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 32,
      color: 'var(--text-muted)'
    }
  }, unit)));
}
Object.assign(__ds_scope, { StatFigure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/offer/StatFigure.jsx", error: String((e && e.message) || e) }); }

// components/offer/TierCard.jsx
try { (() => {
function TierCard({
  tone = 'essential',
  name,
  meta,
  price,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderTop: `var(--bar-accent) solid var(--tier-${tone})`,
      padding: 'var(--card-pad-y) var(--card-pad-x)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,230px) minmax(0,1fr)',
      gap: 'var(--space-8)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-semibold) var(--fs-h3)/1.12 var(--font-display)',
      textTransform: 'uppercase',
      color: 'var(--text-heading)'
    }
  }, name), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-bold) var(--fs-eyebrow)/1.4 var(--font-body)',
      letterSpacing: 'var(--ls-overline)',
      textTransform: 'uppercase',
      color: `var(--tier-${tone}-text)`
    }
  }, meta), price && /*#__PURE__*/React.createElement(__ds_scope.Price, {
    amount: price,
    style: {
      marginTop: 14
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      fontSize: style && style.fontSize,
      lineHeight: style && style.fontSize ? 1.65 : undefined,
      color: 'var(--text-body)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, children));
}
Object.assign(__ds_scope, { TierCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/offer/TierCard.jsx", error: String((e && e.message) || e) }); }

// components/offer/TierChoice.jsx
try { (() => {
function TierChoice({
  tone = 'essential',
  name,
  children,
  selected = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: selected || hover ? 'var(--surface-card-raised)' : 'var(--surface-card)',
      boxShadow: selected ? `inset 3px 0 0 var(--tier-${tone})` : 'none',
      padding: '22px var(--card-pad-x)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,240px) minmax(0,1fr)',
      gap: 'var(--space-6)',
      alignItems: 'center',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background var(--dur-base) var(--ease-stage)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-semibold) 24px/1.15 var(--font-display)',
      textTransform: 'uppercase',
      color: `var(--tier-${tone}-text)`
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, children));
}
Object.assign(__ds_scope, { TierChoice });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/offer/TierChoice.jsx", error: String((e && e.message) || e) }); }

// components/offer/TierStrip.jsx
try { (() => {
function TierStrip({
  tone = 'essential',
  name,
  meta,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `var(--bar-accent) solid var(--tier-${tone})`,
      paddingTop: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-semibold) var(--fs-h4)/1.1 var(--font-display)',
      textTransform: 'uppercase',
      color: 'var(--text-heading)'
    }
  }, name), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-light) var(--fs-small)/1.4 var(--font-body)',
      color: 'var(--text-body)'
    }
  }, meta));
}
Object.assign(__ds_scope, { TierStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/offer/TierStrip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/offer-booklet/Booklet.jsx
try { (() => {
const PAGES = [['Vāks', CoverPage], ['Par mums', AboutPage], ['Sastāvi', LineupsPage], ['Programma', ProgrammePage], ['Repertuārs', RepertoirePage], ['Kas iekļauts', IncludedPage], ['Kontakti', ContactPage]];
function Booklet() {
  const [idx, setIdx] = React.useState(() => +(localStorage.getItem('hb-booklet-page') || 0));
  const [tier, setTier] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    localStorage.setItem('hb-booklet-page', idx);
  }, [idx]);
  React.useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 48) / 1056, (window.innerWidth - 260) / 816));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setIdx(i => Math.min(PAGES.length - 1, i + 1));
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setIdx(i => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  const pick = t => {
    setTier(t);
    setIdx(2);
  };
  const Page = PAGES[idx][1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 200,
      flex: 'none',
      padding: '28px 0 28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 22px/1 var(--font-display)',
      letterSpacing: '.04em',
      color: 'var(--text-heading)',
      marginBottom: 20
    }
  }, "HENRIX BAND"), PAGES.map(([n], i) => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => setIdx(i),
    style: {
      all: 'unset',
      cursor: 'pointer',
      display: 'flex',
      gap: 12,
      padding: '9px 0',
      borderTop: '1px solid var(--border-rule)',
      font: '400 13px var(--font-body)',
      color: i === idx ? 'var(--text-heading)' : 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px var(--font-display)',
      color: i === idx ? 'var(--text-accent)' : 'var(--text-faint)',
      width: 18
    }
  }, String(i + 1).padStart(2, '0')), n)), tier && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      font: '400 11px/1.5 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, "Izv\u0113l\u0113ts: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--tier-' + tier + '-text)',
      fontWeight: 700
    }
  }, {
    essential: 'Essential',
    live: 'Live+',
    full: 'Full Experience'
  }[tier]))), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      padding: '24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 816 * scale,
      height: 1056 * scale
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: 'scale(' + scale + ')',
      transformOrigin: 'top left',
      boxShadow: '0 0 0 1px var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement(Page, {
    selected: tier,
    onSelect: pick
  })))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Booklet, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/offer-booklet/Booklet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/offer-booklet/PagesClosing.jsx
try { (() => {
const {
  pageStyle,
  pad,
  P,
  A
} = window.hbPage;
function IncludedPage({
  selected,
  onSelect
}) {
  const {
    SectionTitle,
    NumberedItem,
    TierChoice
  } = window.HenrixBandDesignSystem_120eaf;
  const items = ['Henrix Band izvēlētajā sastāvā', '3 × 50 minūšu muzikālā programma', 'programmas pielāgošana pasākuma norisei', 'grupas instrumenti un nepieciešamais tehniskais aprīkojums', 'skaņas nodrošinājums atbilstoši saskaņotajam pasākuma formātam', 'grupas transports', 'tehniskā sagatavošanās un soundcheck', 'repertuāra pielāgošana konkrētajai auditorijai'];
  return /*#__PURE__*/React.createElement("div", {
    style: pageStyle,
    "data-screen-label": "06 Kas iek\u013Cauts"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...pad,
      paddingTop: 64
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Kas iek\u013Cauts pied\u0101v\u0101jum\u0101"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: 28,
      marginTop: 28,
      borderBottom: '1px solid var(--border-rule)'
    }
  }, items.map((t, i) => /*#__PURE__*/React.createElement(NumberedItem, {
    key: i,
    n: i + 1
  }, t))), /*#__PURE__*/React.createElement(P, {
    style: {
      font: 'var(--fw-bold) 14px/1.6 var(--font-body)',
      color: 'var(--text-strong)',
      maxWidth: 500,
      marginTop: 30
    }
  }, "No iera\u0161an\u0101s l\u012Bdz p\u0113d\u0113jai dziesmai \u2014 par grupas muzik\u0101lo un tehnisko pusi par\u016Bp\u0113jamies m\u0113s."), /*#__PURE__*/React.createElement(SectionTitle, {
    style: {
      marginTop: 64,
      marginBottom: 28
    }
  }, "Kuru sast\u0101vu izv\u0113l\u0113ties?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(TierChoice, {
    tone: "essential",
    name: "Henrix Essential",
    selected: selected === 'essential',
    onClick: () => onSelect('essential')
  }, "Ja nepiecie\u0161ama dz\u012Bva m\u016Bzika kompakt\u0101kam vai elegant\u0101kam uz\u0146\u0113muma pas\u0101kumam."), /*#__PURE__*/React.createElement(TierChoice, {
    tone: "live",
    name: "Henrix Live+",
    selected: selected === 'live',
    onClick: () => onSelect('live')
  }, "Ja mekl\u0113jat univers\u0101lu risin\u0101jumu ar pilnv\u0113rt\u012Bgu grupas skan\u0113jumu un labu ball\u012Btes ener\u0123iju."), /*#__PURE__*/React.createElement(TierChoice, {
    tone: "full",
    name: /*#__PURE__*/React.createElement(React.Fragment, null, "Henrix Full", /*#__PURE__*/React.createElement("br", null), "Experience"),
    selected: selected === 'full',
    onClick: () => onSelect('full')
  }, "Ja v\u0113laties maksim\u0101lu dz\u012Bvas grupas efektu un Henrix Band k\u0101 vienu no centr\u0101lajiem vakara elementiem."))));
}
function ContactPage() {
  const {
    SectionTitle,
    Accent,
    InfoTile,
    AccentRule,
    Wordmark
  } = window.HenrixBandDesignSystem_120eaf;
  const tiles = [['var(--hb-cyan-500)', 'pasākuma datumu'], ['var(--hb-violet-500)', 'norises vietu'], ['var(--hb-purple-500)', 'aptuveno viesu skaitu'], ['var(--hb-magenta-500)', 'plānoto vakara formātu']];
  return /*#__PURE__*/React.createElement("div", {
    style: pageStyle,
    "data-screen-label": "07 Kontakti"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...pad,
      paddingTop: 72
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    as: "h1",
    style: {
      fontSize: 72,
      lineHeight: 1.1
    }
  }, "Izveidosim form\u0101tu", /*#__PURE__*/React.createElement("br", null), "tie\u0161i ", /*#__PURE__*/React.createElement(Accent, null, "j\u016Bsu pas\u0101kumam")), /*#__PURE__*/React.createElement(P, {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      marginTop: 32
    }
  }, "Lai sagatavotu prec\u012Bzu pied\u0101v\u0101jumu, ats\u016Btiet mums:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 10,
      marginTop: 28
    }
  }, tiles.map(([c, t]) => /*#__PURE__*/React.createElement(InfoTile, {
    key: t,
    color: c,
    style: {
      minHeight: 48
    }
  }, t))), /*#__PURE__*/React.createElement(P, {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      marginTop: 28,
      maxWidth: 540
    }
  }, "P\u0101rbaud\u012Bsim pieejam\u012Bbu, pal\u012Bdz\u0113sim izv\u0113l\u0113ties piem\u0113rot\u0101ko sast\u0101vu un saska\u0146osim muzik\u0101lo programmu ar j\u016Bsu pas\u0101kuma scen\u0101riju."), /*#__PURE__*/React.createElement(AccentRule, {
    variant: "hairline",
    style: {
      marginTop: 92
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 40,
    stacked: false,
    accentX: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-bold) 15px var(--font-body)',
      color: 'var(--text-accent)'
    }
  }, "Dz\u012Bv\u0101 m\u016Bzika. \u012Asta ball\u012Bte.")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'italic var(--fw-regular) var(--fs-caption) var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, "Cenas nor\u0101d\u012Btas bez PVN."))), /*#__PURE__*/React.createElement("img", {
    src: A + 'brand/henrix-band-banner.jpg',
    alt: "Henrix Band",
    style: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: 300,
      objectFit: 'cover',
      objectPosition: 'center top',
      display: 'block'
    }
  }));
}
Object.assign(window, {
  IncludedPage,
  ContactPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/offer-booklet/PagesClosing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/offer-booklet/PagesIntro.jsx
try { (() => {
const HB = window.HenrixBandDesignSystem_120eaf;
const A = '../../assets/';
const pageStyle = {
  width: 'var(--page-width)',
  height: 'var(--page-height)',
  background: 'var(--surface-page)',
  position: 'relative',
  overflow: 'hidden',
  flex: 'none'
};
const pad = {
  padding: '0 var(--page-margin-x)'
};
const P = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    ...style
  }
}, children);
function CoverPage() {
  const {
    Eyebrow,
    Wordmark,
    AccentRule
  } = HB;
  return /*#__PURE__*/React.createElement("div", {
    style: pageStyle,
    "data-screen-label": "01 Cover"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 780,
      background: `url(${A}photos/singer-live.png) 62% 20%/cover`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg,rgba(10,10,20,.25) 0%,rgba(10,10,20,0) 30%,rgba(10,10,20,.35) 70%,rgba(10,10,20,.9) 100%)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 44,
      left: 56,
      right: 56,
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "heading",
    weight: 500
  }, "Pied\u0101v\u0101jums"), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "heading",
    weight: 500
  }, "Korporat\u012Bvie pas\u0101kumi")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 56,
      top: 660,
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 104,
    style: {
      lineHeight: 1.22
    }
  }), /*#__PURE__*/React.createElement(AccentRule, {
    style: {
      width: 96
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--fw-regular) 18px/1.4 var(--font-body)',
      color: 'var(--text-heading)'
    }
  }, "Dz\u012Bv\u0101 m\u016Bzika korporat\u012Bvajiem pas\u0101kumiem")));
}
function AboutPage() {
  const {
    Eyebrow,
    SectionTitle,
    PhotoSection,
    TierStrip
  } = HB;
  return /*#__PURE__*/React.createElement("div", {
    style: pageStyle,
    "data-screen-label": "02 Par mums"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...pad,
      paddingTop: 72,
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Par mums"), /*#__PURE__*/React.createElement(SectionTitle, {
    size: "lg",
    style: {
      fontSize: 40,
      maxWidth: 660,
      marginTop: -6
    }
  }, "Labs uz\u0146\u0113muma pas\u0101kums nav tikai programma \u2014 t\u0101 ir atmosf\u0113ra, cilv\u0113ki un vakars, kuru gribas atcer\u0113ties."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 40,
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(P, null, /*#__PURE__*/React.createElement("strong", null, "Henrix Band"), " pied\u0101v\u0101 dz\u012Bvo m\u016Bziku uz\u0146\u0113mumu ball\u0113m, korporat\u012Bvajiem pas\u0101kumiem, jubilej\u0101m, gada nosl\u0113guma svin\u012Bb\u0101m, klientu vakariem un citiem \u012Bpa\u0161iem notikumiem."), /*#__PURE__*/React.createElement(P, null, "M\u016Bsu m\u0113r\u0137is ir vienk\u0101r\u0161s \u2014 rad\u012Bt \u012Bstu ball\u012Bti. Sp\u0113l\u0113jam paz\u012Bstamas latvie\u0161u un \u0101rzemju dziesmas, kur\u0101m var dzied\u0101t l\u012Bdzi, dejot un kuras labi str\u0101d\u0101 da\u017E\u0101d\u0101m auditorij\u0101m."))), /*#__PURE__*/React.createElement(PhotoSection, {
    image: A + 'photos/band-stage.jpg',
    height: 636,
    position: "center 40%",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(180deg,var(--hb-ink-900) 0%,rgba(10,10,20,0) 22%), url(${A}photos/band-stage.jpg) center 40%/cover`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      margin: '0 0 -8px'
    }
  }, /*#__PURE__*/React.createElement(P, {
    style: {
      font: 'var(--fw-regular) var(--fs-body)/1.75 var(--font-body)',
      color: 'var(--text-heading)',
      maxWidth: 420
    }
  }, "Atkar\u012Bb\u0101 no pas\u0101kuma form\u0101ta, viesu skaita un v\u0113lam\u0101s atmosf\u0113ras pied\u0101v\u0101jam tr\u012Bs Henrix Band sast\u0101vus."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(TierStrip, {
    tone: "essential",
    name: "Essential",
    meta: "3 m\u016Bzi\u0137i \xB7 1 200 \u20AC"
  }), /*#__PURE__*/React.createElement(TierStrip, {
    tone: "live",
    name: "Live+",
    meta: "4 m\u016Bzi\u0137i \xB7 1 550 \u20AC"
  }), /*#__PURE__*/React.createElement(TierStrip, {
    tone: "full",
    name: "Full Experience",
    meta: "5 m\u016Bzi\u0137i \xB7 2 000 \u20AC"
  })))));
}
function LineupsPage({
  selected
}) {
  const {
    SectionTitle,
    Eyebrow,
    TierCard
  } = HB;
  const tight = {
    gridTemplateColumns: 'minmax(0,200px) minmax(0,1fr)',
    gap: 32,
    padding: '22px 24px',
    fontSize: 12
  };
  const ring = t => ({
    ...tight,
    ...(selected === t ? {
      outline: '1px solid var(--tier-' + t + ')',
      outlineOffset: 0
    } : {})
  });
  return /*#__PURE__*/React.createElement("div", {
    style: pageStyle,
    "data-screen-label": "03 Sast\u0101vi"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...pad,
      paddingTop: 64,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Sast\u0101vi"), /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted",
    weight: 400,
    style: {
      marginBottom: 6
    }
  }, "Cenas bez PVN")), /*#__PURE__*/React.createElement(TierCard, {
    tone: "essential",
    name: /*#__PURE__*/React.createElement(React.Fragment, null, "Henrix", /*#__PURE__*/React.createElement("br", null), "Essential"),
    meta: "Kompakts sast\u0101vs \u2022 3 m\u016Bzi\u0137i",
    price: "1 200 \u20AC",
    style: ring('essential')
  }, /*#__PURE__*/React.createElement(P, null, "Kompakts, bet pilnv\u0113rt\u012Bgs dz\u012Bvas m\u016Bzikas risin\u0101jums pas\u0101kumiem, kuros svar\u012Bga laba atmosf\u0113ra, kvalitat\u012Bvs skan\u0113jums un elast\u012Bgs form\u0101ts."), /*#__PURE__*/React.createElement(P, null, "Tr\u012Bs m\u016Bzi\u0137u sast\u0101vs \u013Cauj saglab\u0101t Henrix Band raksturu un ener\u0123iju, vienlaikus neprasot lielu skatuvi vai sare\u017E\u0123\u012Btu tehnisko risin\u0101jumu."), /*#__PURE__*/React.createElement(P, null, /*#__PURE__*/React.createElement("strong", null, "Piem\u0113rots:"), " uz\u0146\u0113mumu vakari\u0146\u0101m, klientu pas\u0101kumiem, pie\u0146em\u0161an\u0101m, jubilej\u0101m un maz\u0101kiem korporat\u012Bvajiem pas\u0101kumiem."), /*#__PURE__*/React.createElement(P, null, /*#__PURE__*/React.createElement("strong", null, "Labs risin\u0101jums, ja v\u0113laties dz\u012Bvu grupu kompakt\u0101k\u0101 form\u0101t\u0101."))), /*#__PURE__*/React.createElement(TierCard, {
    tone: "live",
    name: "Henrix Live+",
    meta: "Optim\u0101lais sast\u0101vs \u2022 4 m\u016Bzi\u0137i",
    price: "1 550 \u20AC",
    style: ring('live')
  }, /*#__PURE__*/React.createElement(P, null, "M\u016Bsu univers\u0101l\u0101kais sast\u0101vs korporat\u012Bvajiem pas\u0101kumiem."), /*#__PURE__*/React.createElement(P, null, "\u010Cetru m\u016Bzi\u0137u sast\u0101vs nodro\u0161ina piln\u012Bg\u0101ku skan\u0113jumu, liel\u0101ku dinamiku un pla\u0161\u0101kas muzik\u0101l\u0101s iesp\u0113jas, vienlaikus saglab\u0101jot elast\u012Bgu tehnisko risin\u0101jumu."), /*#__PURE__*/React.createElement(P, null, "\u0160is form\u0101ts labi darbojas gan vakara s\u0101kum\u0101, gan br\u012Bd\u012B, kad pas\u0101kums p\u0101riet \u012Bst\u0101 ball\u012Bt\u0113 un deju laukum\u0101."), /*#__PURE__*/React.createElement(P, null, /*#__PURE__*/React.createElement("strong", null, "Piem\u0113rots:"), " korporat\u012Bvaj\u0101m ball\u0113m, uz\u0146\u0113mumu jubilej\u0101m, Ziemassv\u0113tku un gada nosl\u0113guma pas\u0101kumiem, komandas svin\u012Bb\u0101m un vid\u0113ja izm\u0113ra pas\u0101kumiem."), /*#__PURE__*/React.createElement(P, null, /*#__PURE__*/React.createElement("strong", null, "Optim\u0101la izv\u0113le starp kompaktu sast\u0101vu un pilnas grupas jaudu."))), /*#__PURE__*/React.createElement(TierCard, {
    tone: "full",
    name: /*#__PURE__*/React.createElement(React.Fragment, null, "Henrix Full", /*#__PURE__*/React.createElement("br", null), "Experience"),
    meta: "Pilnais sast\u0101vs \u2022 5 m\u016Bzi\u0137i",
    price: "2 000 \u20AC",
    style: ring('full')
  }, /*#__PURE__*/React.createElement(P, null, "Pilnv\u0113rt\u012Bga Henrix Band koncertball\u012Btes pieredze."), /*#__PURE__*/React.createElement(P, null, /*#__PURE__*/React.createElement("strong", null, "5 m\u016Bzi\u0137i:"), " vok\u0101ls / akustisk\u0101 \u0123it\u0101ra \u2022 elektrisk\u0101 \u0123it\u0101ra \u2022 bas\u0123it\u0101ra \u2022 tausti\u0146i \u2022 bungas"), /*#__PURE__*/React.createElement(P, null, "Pilnais sast\u0101vs nodro\u0161ina maksim\u0101li dz\u012Bvu, dinamisku un pilnskan\u012Bgu grupas skan\u0113jumu. Tas ir variants pas\u0101kumiem, kuros grupa ir viena no galvenaj\u0101m vakara programmas da\u013C\u0101m un m\u0113r\u0137is ir pilns deju laukums un \u012Bsta koncertball\u012Btes saj\u016Bta."), /*#__PURE__*/React.createElement(P, null, /*#__PURE__*/React.createElement("strong", null, "Piem\u0113rots:"), " liel\u0101k\u0101m uz\u0146\u0113mumu ball\u0113m, gada nosl\u0113guma pas\u0101kumiem, jubilej\u0101m, vasaras pas\u0101kumiem un svin\u012Bb\u0101m ar liel\u0101ku viesu skaitu."), /*#__PURE__*/React.createElement(P, null, /*#__PURE__*/React.createElement("strong", null, "Maksim\u0101la ener\u0123ija un pilnv\u0113rt\u012Bga Henrix Band pieredze.")))));
}
Object.assign(window, {
  CoverPage,
  AboutPage,
  LineupsPage,
  hbPage: {
    pageStyle,
    pad,
    P,
    A
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/offer-booklet/PagesIntro.jsx", error: String((e && e.message) || e) }); }

// ui_kits/offer-booklet/PagesProgramme.jsx
try { (() => {
const {
  pageStyle,
  pad,
  P,
  A
} = window.hbPage;
function ProgrammePage() {
  const {
    SectionTitle,
    Accent,
    StatFigure,
    Chip,
    AccentRule
  } = window.HenrixBandDesignSystem_120eaf;
  const slots = ['vakariņām', 'vadītāja programmu', 'apbalvošanu', 'priekšnesumiem', 'DJ', 'citām pasākuma aktivitātēm'];
  const [on, setOn] = React.useState([]);
  const tog = s => setOn(o => o.includes(s) ? o.filter(x => x !== s) : [...o, s]);
  return /*#__PURE__*/React.createElement("div", {
    style: pageStyle,
    "data-screen-label": "04 Programma"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...pad,
      paddingTop: 64
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Programma"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: 52,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(StatFigure, {
    label: "Standarta muzik\u0101l\u0101 programma",
    value: "3 \xD7 50",
    unit: "min"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(P, {
    style: {
      maxWidth: 300
    }
  }, "Atkar\u012Bb\u0101 no pas\u0101kuma scen\u0101rija programmu iesp\u0113jams sadal\u012Bt ar\u012B ", /*#__PURE__*/React.createElement("strong", null, "4 \u012Bs\u0101kos setos"), ", piel\u0101gojot uzst\u0101\u0161anos vakara norisei."), /*#__PURE__*/React.createElement(P, null, "Setu laikus varam saska\u0146ot ar:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, slots.map(s => /*#__PURE__*/React.createElement(Chip, {
    key: s,
    active: on.includes(s),
    onClick: () => tog(s)
  }, s))))), /*#__PURE__*/React.createElement(AccentRule, {
    variant: "hairline",
    style: {
      marginTop: 24
    }
  }), /*#__PURE__*/React.createElement(SectionTitle, {
    size: "lg",
    style: {
      fontSize: 26,
      padding: '18px 0'
    }
  }, "M\u0113s necen\u0161amies pas\u0101kumu piel\u0101got grupai \u2014 ", /*#__PURE__*/React.createElement(Accent, null, "grupas programmu piel\u0101gojam pas\u0101kumam.")), /*#__PURE__*/React.createElement(AccentRule, {
    variant: "hairline"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 520,
      background: `linear-gradient(90deg,rgba(10,10,20,.9) 0%,rgba(10,10,20,.55) 50%,rgba(10,10,20,.15) 100%), linear-gradient(180deg,var(--hb-ink-950) 0%,rgba(6,6,14,0) 25%), url(${A}photos/singer-live.png) 70% 30%/cover`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...pad,
      paddingTop: 48,
      maxWidth: 380,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      font: 'var(--fw-regular) var(--fs-body)/1.75 var(--font-body)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    style: {
      marginBottom: 8
    }
  }, "Repertu\u0101rs"), /*#__PURE__*/React.createElement(P, null, "Henrix Band repertu\u0101ra pamat\u0101 ir paz\u012Bstamas un p\u0101rbaud\u012Btas dziesmas, kas labi str\u0101d\u0101 ball\u012Bt\u0113s."), /*#__PURE__*/React.createElement(P, null, "Programm\u0101 apvienojam ", /*#__PURE__*/React.createElement("strong", null, "latvie\u0161u un \u0101rzemju m\u016Bziku"), ", s\u0101kot no dziesm\u0101m, kur\u0101m publika dzied l\u012Bdzi, l\u012Bdz ener\u0123iskiem deju gr\u012Bdas hitiem."), /*#__PURE__*/React.createElement(P, null, "Repertu\u0101ru un vakara dinamiku piel\u0101gojam konkr\u0113tajam pas\u0101kumam, viesu profilam un atmosf\u0113rai."), /*#__PURE__*/React.createElement(P, {
    style: {
      color: 'var(--text-heading)'
    }
  }, "M\u016Bsu priorit\u0101te nav vienk\u0101r\u0161i nosp\u0113l\u0113t dziesmu sarakstu \u2014 m\u0113s skat\u0101mies uz publiku un veidojam vakara ener\u0123iju kop\u0101 ar viesiem."))));
}
const SONGS = {
  dance: [['Can’t Stop The Feeling', 'Justin Timberlake'], ['September', 'Earth, Wind & Fire'], ['24K Magic', 'Bruno Mars'], ['Celebration', 'Kool & The Gang'], ['Sex Bomb', 'Tom Jones'], ['Are You Gonna Be My Girl', 'Jet'], ['Sex On Fire', 'Kings of Leon'], ['Let Me Entertain You', 'Robbie Williams']],
  lv: [['Laternas', 'Sudden Lights'], ['Tu tuvojies sev', 'Z-Scars'], ['Ogles', 'Prāta Vētra'], ['Kurtizāņu ugunskurs', 'Dakota'], ['Pa ceļam', 'Dons'], ['Kad Ēģiptē sniegs', 'Tumsa'], ['Vējā', 'Fēlikss Ķiģelis'], ['Zīlīte', 'Remix']],
  world: [['It’s My Life', 'Bon Jovi'], ['Simply The Best', 'Tina Turner'], ['What’s Up', '4 Non Blondes'], ['Wicked Game', 'Chris Isaak'], ['Watermelon Sugar', 'Harry Styles'], ['Yellow', 'Coldplay'], ['Love Me Again', 'John Newman'], ['Lonely Boy', 'The Black Keys']]
};
const toSongs = a => a.map(([title, artist]) => ({
  title,
  artist
}));
function RepertoirePage() {
  const {
    SectionTitle,
    SongColumn,
    PromoVideo
  } = window.HenrixBandDesignSystem_120eaf;
  return /*#__PURE__*/React.createElement("div", {
    style: pageStyle,
    "data-screen-label": "05 Repertu\u0101ra izlase"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...pad,
      paddingTop: 64,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Repertu\u0101ra izlase"), /*#__PURE__*/React.createElement(P, {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      maxWidth: 540
    }
  }, "Da\u013Ca no dziesm\u0101m, ko sp\u0113l\u0113jam. Vakara gait\u0101 t\u0101s main\u0101m atbilsto\u0161i br\u012Bdim \u2014 no mier\u012Bg\u0101k\u0101m melodij\u0101m vakari\u0146u laik\u0101 l\u012Bdz pilnam deju laukumam."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(SongColumn, {
    index: 1,
    title: "Deju laukumam",
    tone: "full",
    songs: toSongs(SONGS.dance)
  }), /*#__PURE__*/React.createElement(SongColumn, {
    index: 2,
    title: "Latvie\u0161u dziesmas",
    tone: "live",
    songs: toSongs(SONGS.lv)
  }), /*#__PURE__*/React.createElement(SongColumn, {
    index: 3,
    title: "Pasaules hiti",
    tone: "essential",
    songs: toSongs(SONGS.world)
  })), /*#__PURE__*/React.createElement(P, {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      marginTop: 12
    }
  }, "Pilns repertu\u0101rs \u2014 vair\u0101k nek\u0101 70 dziesmas latvie\u0161u, ang\u013Cu, sp\u0101\u0146u un portug\u0101\u013Cu valod\u0101 \u2014 pieejams p\u0113c piepras\u012Bjuma.")), /*#__PURE__*/React.createElement(PromoVideo, {
    thumbnail: A + 'photos/band-stage.jpg',
    title: "Noskatieties, k\u0101 tas izskat\u0101s dz\u012Bv\u0113",
    url: "https://www.youtube.com/watch?v=CZxHxjbiefg",
    qr: A + 'brand/qr-promo-video.jpg',
    style: {
      position: 'absolute',
      left: 56,
      right: 56,
      bottom: 48
    }
  }));
}
Object.assign(window, {
  ProgrammePage,
  RepertoirePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/offer-booklet/PagesProgramme.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AccentRule = __ds_scope.AccentRule;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.Accent = __ds_scope.Accent;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.NumberedItem = __ds_scope.NumberedItem;

__ds_ns.SongColumn = __ds_scope.SongColumn;

__ds_ns.PhotoSection = __ds_scope.PhotoSection;

__ds_ns.PromoVideo = __ds_scope.PromoVideo;

__ds_ns.InfoTile = __ds_scope.InfoTile;

__ds_ns.Price = __ds_scope.Price;

__ds_ns.StatFigure = __ds_scope.StatFigure;

__ds_ns.TierCard = __ds_scope.TierCard;

__ds_ns.TierChoice = __ds_scope.TierChoice;

__ds_ns.TierStrip = __ds_scope.TierStrip;

})();
