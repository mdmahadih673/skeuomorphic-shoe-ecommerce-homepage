import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Shoe {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  tag: string;
  color: string;
  accentColor: string;
  imgUrl: string;
  sizes: number[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroShoes: Shoe[] = [
  {
    id: 1,
    name: 'APEX PHANTOM',
    subtitle: 'Ultra-Light Performance Series',
    price: 289,
    tag: 'NEW DROP',
    color: '#f97316',
    accentColor: '#ff6a00',
    imgUrl: 'https://images.pexels.com/photos/5930091/pexels-photo-5930091.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: 2,
    name: 'VORTEX GT',
    subtitle: 'Street Legend Collection',
    price: 349,
    tag: 'LIMITED',
    color: '#3b82f6',
    accentColor: '#60a5fa',
    imgUrl: 'https://images.pexels.com/photos/4029473/pexels-photo-4029473.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    sizes: [7, 8, 9, 10, 11],
  },
  {
    id: 3,
    name: 'NOVA ELITE',
    subtitle: 'Signature Stealth Edition',
    price: 419,
    tag: 'EXCLUSIVE',
    color: '#a855f7',
    accentColor: '#c084fc',
    imgUrl: 'https://images.pexels.com/photos/17918935/pexels-photo-17918935.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    sizes: [8, 9, 10, 11, 12],
  },
];

const featuredProducts = [
  {
    id: 10,
    name: 'SOLARA X1',
    price: 219,
    tag: 'BESTSELLER',
    imgUrl: 'https://images.pexels.com/photos/10195371/pexels-photo-10195371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.9,
    reviews: 2341,
  },
  {
    id: 11,
    name: 'TITAN RUSH',
    price: 179,
    tag: 'SALE',
    imgUrl: 'https://images.pexels.com/photos/12628400/pexels-photo-12628400.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.7,
    reviews: 1820,
  },
  {
    id: 12,
    name: 'SHADOW RUN',
    price: 259,
    tag: 'HOT',
    imgUrl: 'https://images.pexels.com/photos/18946641/pexels-photo-18946641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.8,
    reviews: 987,
  },
  {
    id: 13,
    name: 'APEX FORCE',
    price: 299,
    tag: 'NEW',
    imgUrl: 'https://images.pexels.com/photos/4029473/pexels-photo-4029473.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.6,
    reviews: 543,
  },
];

// ─── Helper Components ─────────────────────────────────────────────────────────

function Screw() {
  return <div className="screw" />;
}

function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="particle" style={style} />;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? '#f97316' : 'rgba(249,115,22,0.2)'}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      <span style={{ fontSize: '0.7rem', color: '#8892aa', marginLeft: 3 }}>{rating}</span>
    </div>
  );
}

// ─── Dial Component ────────────────────────────────────────────────────────────
function PriceDial({ price, rotation, accent }: { price: number; rotation: number; accent: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div
        className="dial-outer animate-dial-glow"
        style={{
          width: 110,
          height: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `6px 6px 16px rgba(0,0,0,0.8), -3px -3px 8px rgba(255,255,255,0.04), inset 2px 2px 5px rgba(255,255,255,0.04), inset -2px -2px 5px rgba(0,0,0,0.6), 0 0 25px 6px ${accent}55`,
        }}
      >
        <div
          className="dial-inner"
          style={{
            width: 82,
            height: 82,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="dial-notch" style={{ background: `linear-gradient(to bottom, ${accent}, ${accent}99)`, boxShadow: `0 0 8px 3px ${accent}99` }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${-rotation}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.55rem', color: accent, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.9 }}>USD</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f0f4ff', lineHeight: 1, fontFamily: 'Montserrat,sans-serif' }}>
                {price}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ fontSize: '0.65rem', color: '#8892aa', letterSpacing: '0.12em', textTransform: 'uppercase' }}>price control</div>
    </div>
  );
}

// ─── Hero Slider ───────────────────────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animClass, setAnimClass] = useState('slide-in-left');
  const [_direction, setDirection] = useState<'left' | 'right'>('left');
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartPressed, setCartPressed] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<boolean[]>([false, false, false]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialRotation = useRef([0, 120, 240]);

  const go = useCallback((next: number, dir: 'left' | 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setAnimClass(dir === 'right' ? 'slide-out-left' : 'slide-out-right');
    setTimeout(() => {
      setCurrent(next);
      setAnimClass(dir === 'right' ? 'slide-in-right' : 'slide-in-left');
      setSelectedSize(null);
      setTimeout(() => setIsAnimating(false), 600);
    }, 380);
  }, [isAnimating]);

  const next = useCallback(() => {
    dialRotation.current[current] += 90;
    go((current + 1) % heroShoes.length, 'right');
  }, [current, go]);

  const prev = useCallback(() => {
    dialRotation.current[current] -= 90;
    go((current - 1 + heroShoes.length) % heroShoes.length, 'left');
  }, [current, go]);

  useEffect(() => {
    timerRef.current = setTimeout(next, 3000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [next]);

  const shoe = heroShoes[current];

  const handleCart = () => {
    setCartPressed(true);
    setTimeout(() => setCartPressed(false), 300);
  };

  const toggleWishlist = (idx: number) => {
    setWishlist(w => w.map((v, i) => i === idx ? !v : v));
  };

  // particles
  const particles = Array.from({ length: 8 }, (_, i) => ({
    width: `${3 + Math.random() * 4}px`,
    height: `${3 + Math.random() * 4}px`,
    left: `${10 + i * 11}%`,
    bottom: `${10 + (i % 3) * 8}%`,
    animationDuration: `${4 + i * 0.7}s`,
    animationDelay: `${i * 0.5}s`,
    opacity: 0.4 + Math.random() * 0.3,
  }));

  return (
    <div className="hero-panel" style={{
      borderRadius: 28,
      padding: '2rem',
      position: 'relative',
      maxWidth: 880,
      margin: '0 auto',
    }}>
      {/* Screws in corners */}
      <div style={{ position: 'absolute', top: 14, left: 14 }}><Screw /></div>
      <div style={{ position: 'absolute', top: 14, right: 14 }}><Screw /></div>
      <div style={{ position: 'absolute', bottom: 14, left: 14 }}><Screw /></div>
      <div style={{ position: 'absolute', bottom: 14, right: 14 }}><Screw /></div>

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* Spotlight glow behind shoe */}
      <div className="animate-spotlight" style={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${shoe.color}22 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Shimmer sweep */}
      <div className="animate-shimmer" style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 28,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Tag badge */}
      <div style={{
        position: 'absolute',
        top: 22,
        left: '50%',
        transform: 'translateX(-50%)',
        background: `linear-gradient(135deg, ${shoe.color}, ${shoe.accentColor})`,
        color: '#fff',
        fontSize: '0.6rem',
        fontWeight: 800,
        letterSpacing: '0.2em',
        padding: '4px 14px',
        borderRadius: 20,
        boxShadow: `0 0 16px 4px ${shoe.color}66`,
        zIndex: 10,
        fontFamily: 'Montserrat, sans-serif',
      }}>{shoe.tag}</div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Slide container */}
        <div style={{ overflow: 'hidden', position: 'relative', minHeight: 420 }}>
          <div className={animClass} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Shoe image + floating effect */}
            <div className="animate-float" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: 28, marginBottom: 0 }}>
              {/* Glow behind shoe */}
              <div style={{
                position: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 260,
                height: 80,
                borderRadius: '50%',
                background: `radial-gradient(ellipse, ${shoe.color}40 0%, transparent 70%)`,
                filter: 'blur(20px)',
                zIndex: 0,
              }} />
              <img
                src={shoe.imgUrl}
                alt={shoe.name}
                style={{
                  width: 'min(340px, 88%)',
                  height: 230,
                  objectFit: 'cover',
                  borderRadius: 18,
                  position: 'relative',
                  zIndex: 1,
                  filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 20px ${shoe.color}33)`,
                }}
              />
            </div>

            {/* Reflection */}
            <div style={{
              width: '50%',
              height: 20,
              margin: '0 auto -8px',
              background: `linear-gradient(to bottom, ${shoe.color}18, transparent)`,
              filter: 'blur(6px)',
              borderRadius: '50%',
              opacity: 0.7,
            }} />

            {/* Info row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
              marginTop: 24,
              gap: 16,
              flexWrap: 'wrap',
            }}>
              {/* Left: name + sizes */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{
                  fontSize: '0.7rem',
                  color: shoe.color,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                  fontFamily: 'Montserrat, sans-serif',
                }}>{shoe.subtitle}</div>
                <h1 className="emboss" style={{
                  fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  fontFamily: 'Montserrat, sans-serif',
                  background: `linear-gradient(135deg, #f0f4ff 30%, ${shoe.accentColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: 14,
                }}>{shoe.name}</h1>

                {/* Size selector */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: '0.62rem', color: '#8892aa', letterSpacing: '0.12em', marginBottom: 7, textTransform: 'uppercase' }}>Select Size (US)</div>
                  <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                    {shoe.sizes.map(s => (
                      <button
                        key={s}
                        className={`size-btn${selectedSize === s ? ' active' : ''}`}
                        onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                        style={{ width: 36, height: 32, borderRadius: 8 }}
                      >{s}</button>
                    ))}
                  </div>
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(current)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: wishlist[current] ? shoe.color : '#8892aa',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    marginTop: 2,
                    transition: 'all 0.2s ease',
                    textShadow: wishlist[current] ? `0 0 12px ${shoe.color}` : 'none',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlist[current] ? shoe.color : 'none'} stroke={wishlist[current] ? shoe.color : '#8892aa'} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {wishlist[current] ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Center: Dial */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <PriceDial
                  price={shoe.price}
                  rotation={dialRotation.current[current]}
                  accent={shoe.color}
                />
                <button
                  className={`btn-cart${cartPressed ? ' pressed' : ''}`}
                  onClick={handleCart}
                  style={{
                    borderRadius: 14,
                    padding: '11px 28px',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    border: 'none',
                    fontFamily: 'Montserrat, sans-serif',
                    whiteSpace: 'nowrap',
                  }}
                >
                  + Add to Cart
                </button>
              </div>

              {/* Right: specs panel */}
              <div style={{
                minWidth: 130,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}>
                {[
                  { label: 'MATERIAL', value: 'Flyknit Pro' },
                  { label: 'SOLE', value: 'Carbon Foam' },
                  { label: 'WEIGHT', value: '218g' },
                ].map(spec => (
                  <div key={spec.label} className="panel-inset" style={{ borderRadius: 10, padding: '7px 12px' }}>
                    <div style={{ fontSize: '0.55rem', color: '#8892aa', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 2 }}>{spec.label}</div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#d0d8f0' }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 22,
          paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          {/* Arrow left */}
          <button className="btn-arrow" onClick={prev} style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8892aa',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* LED dots */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {heroShoes.map((_, i) => (
              <button
                key={i}
                className={`led-dot${i === current ? ' active' : ''}`}
                onClick={() => go(i, i > current ? 'right' : 'left')}
                style={{ border: 'none', padding: 0 }}
              />
            ))}
          </div>

          {/* Arrow right */}
          <button className="btn-arrow" onClick={next} style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8892aa',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: typeof featuredProducts[0] }) {
  const [btnPressed, setBtnPressed] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setBtnPressed(true);
    setTimeout(() => { setBtnPressed(false); setAdded(true); setTimeout(() => setAdded(false), 1500); }, 220);
  };

  const tagColors: Record<string, string> = {
    BESTSELLER: '#f97316',
    SALE: '#ef4444',
    HOT: '#ec4899',
    NEW: '#22c55e',
  };
  const tagColor = tagColors[product.tag] || '#f97316';

  return (
    <div className="product-card" style={{ borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Screws */}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}><Screw /></div>
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}><Screw /></div>

      {/* Image area */}
      <div className="panel-inset" style={{
        borderRadius: '22px 22px 0 0',
        overflow: 'hidden',
        position: 'relative',
        height: 200,
      }}>
        {/* Tag */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          background: tagColor,
          color: '#fff',
          fontSize: '0.55rem',
          fontWeight: 800,
          letterSpacing: '0.18em',
          padding: '3px 10px',
          borderRadius: 20,
          zIndex: 5,
          boxShadow: `0 0 12px 3px ${tagColor}66`,
          fontFamily: 'Montserrat, sans-serif',
        }}>{product.tag}</div>

        <img
          src={product.imgUrl}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.88) saturate(1.1)',
            transition: 'transform 0.4s ease, filter 0.4s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1) saturate(1.2)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.88) saturate(1.1)';
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to bottom, transparent, rgba(10,14,26,0.8))',
        }} />
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              fontFamily: 'Montserrat, sans-serif',
              color: '#e8eeff',
              letterSpacing: '-0.01em',
            }}>{product.name}</div>
            <StarRating rating={product.rating} />
          </div>
          <div style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            color: '#f97316',
            textShadow: '0 0 16px rgba(249,115,22,0.5)',
            fontFamily: 'Montserrat, sans-serif',
          }}>${product.price}</div>
        </div>

        <div style={{ fontSize: '0.65rem', color: '#8892aa' }}>{product.reviews.toLocaleString()} reviews</div>

        {/* Inset groove line */}
        <div style={{
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
        }} />

        <button
          className={`btn-skeu${btnPressed ? ' pressed' : ''}`}
          onClick={handleAdd}
          style={{
            borderRadius: 12,
            padding: '9px 0',
            fontWeight: 700,
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: added ? '#22c55e' : '#8892aa',
            border: 'none',
            width: '100%',
            fontFamily: 'Montserrat, sans-serif',
            transition: 'color 0.2s ease',
          }}
        >
          {added ? '✓ Added!' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────
function Header() {
  const [cartCount, setCartCount] = useState(3);
  const [_menuOpen, _setMenuOpen] = useState(false);
  const navItems = ['Collection', 'Performance', 'Lifestyle', 'Sale'];

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 clamp(1rem, 4vw, 2.5rem)',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'linear-gradient(145deg, #1e2d4a, #0d1424)',
          boxShadow: '3px 3px 8px rgba(0,0,0,0.7), -1px -1px 4px rgba(255,255,255,0.04), inset 1px 1px 0 rgba(255,255,255,0.07), 0 0 12px 3px rgba(249,115,22,0.2)',
          border: '1px solid rgba(249,115,22,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M2 17 C6 15, 10 9, 16 9 C19 9, 21 11, 22 13 L8 17 Z" fill="#f97316" opacity="0.9" />
            <path d="M2 17 C6 15, 10 9, 16 9" stroke="#ff9d4d" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <span className="emboss" style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: '1.15rem',
          letterSpacing: '0.08em',
          color: '#f0f4ff',
          textShadow: '1px 1px 0 rgba(0,0,0,0.5), -1px -1px 0 rgba(255,255,255,0.04)',
        }}>SOLARA</span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', gap: 'clamp(0.6rem, 2vw, 2rem)', alignItems: 'center' }}>
        {navItems.map(item => (
          <a key={item} href="#" style={{
            color: '#8892aa',
            textDecoration: 'none',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = '#f97316'; (e.target as HTMLElement).style.textShadow = '0 0 12px rgba(249,115,22,0.5)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = '#8892aa'; (e.target as HTMLElement).style.textShadow = 'none'; }}
          >{item}</a>
        ))}
      </nav>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {/* Search */}
        <button className="btn-skeu" style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8892aa',
          flexShrink: 0,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Cart */}
        <button
          className="btn-skeu"
          onClick={() => setCartCount(c => c + 1)}
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8892aa',
            position: 'relative',
            flexShrink: 0,
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="animate-badge-pulse" style={{
              position: 'absolute',
              top: -5,
              right: -5,
              width: 17,
              height: 17,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff7a1a, #f97316)',
              color: '#fff',
              fontSize: '0.55rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid rgba(10,14,26,0.8)',
            }}>{cartCount}</span>
          )}
        </button>

        {/* Profile */}
        <button className="btn-skeu" style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8892aa',
          flexShrink: 0,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </header>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { label: 'Happy Customers', value: '2.4M+', icon: '👟' },
    { label: 'Countries Shipped', value: '87', icon: '🌍' },
    { label: 'Models Available', value: '320+', icon: '✦' },
    { label: 'Avg. Rating', value: '4.9★', icon: '⚡' },
  ];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: 12,
      maxWidth: 880,
      margin: '0 auto',
    }}>
      {stats.map(s => (
        <div key={s.label} className="panel-raised" style={{ borderRadius: 16, padding: '14px 18px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', marginBottom: 4 }}>{s.icon}</div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#f97316',
            fontFamily: 'Montserrat, sans-serif',
            textShadow: '0 0 16px rgba(249,115,22,0.4)',
          }}>{s.value}</div>
          <div style={{ fontSize: '0.62rem', color: '#8892aa', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Section Title ─────────────────────────────────────────────────────────────
function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <div style={{
        display: 'inline-block',
        fontSize: '0.62rem',
        fontWeight: 800,
        letterSpacing: '0.22em',
        color: '#f97316',
        textTransform: 'uppercase',
        marginBottom: 8,
        textShadow: '0 0 14px rgba(249,115,22,0.5)',
        fontFamily: 'Montserrat, sans-serif',
      }}>
        {label}
      </div>
      <h2 className="emboss" style={{
        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
        fontWeight: 900,
        letterSpacing: '-0.02em',
        fontFamily: 'Montserrat, sans-serif',
        background: 'linear-gradient(135deg, #f0f4ff 40%, #8892aa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>{title}</h2>
      <div style={{ width: 48, height: 3, background: 'linear-gradient(90deg, transparent, #f97316, transparent)', margin: '12px auto 0', borderRadius: 2, boxShadow: '0 0 12px rgba(249,115,22,0.6)' }} />
    </div>
  );
}

// ─── Category Selector ─────────────────────────────────────────────────────────
function CategorySelector() {
  const [active, setActive] = useState(0);
  const cats = ['All', 'Running', 'Lifestyle', 'Basketball', 'Trail'];
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
      {cats.map((c, i) => (
        <button
          key={c}
          onClick={() => setActive(i)}
          className={active === i ? 'btn-cart' : 'btn-skeu'}
          style={{
            borderRadius: 12,
            padding: '9px 20px',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: active === i ? '#fff' : '#8892aa',
            border: 'none',
            fontFamily: 'Poppins, sans-serif',
          }}
        >{c}</button>
      ))}
    </div>
  );
}

// ─── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const handleSend = () => {
    if (email.includes('@')) { setSent(true); setEmail(''); setTimeout(() => setSent(false), 3000); }
  };
  return (
    <div className="hero-panel" style={{
      borderRadius: 24,
      padding: '2.5rem clamp(1.5rem, 5vw, 4rem)',
      maxWidth: 880,
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 300,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', top: 14, left: 14 }}><Screw /></div>
      <div style={{ position: 'absolute', top: 14, right: 14 }}><Screw /></div>

      <div style={{ fontSize: '0.65rem', color: '#f97316', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10, textShadow: '0 0 12px rgba(249,115,22,0.5)', fontFamily: 'Montserrat, sans-serif' }}>EXCLUSIVE ACCESS</div>
      <h3 className="emboss" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontWeight: 900, fontFamily: 'Montserrat, sans-serif', marginBottom: 8, color: '#f0f4ff' }}>Get Early Drop Alerts</h3>
      <p style={{ color: '#8892aa', fontSize: '0.82rem', marginBottom: 24, maxWidth: 420, margin: '0 auto 24px' }}>Be the first to know about limited releases, exclusive collabs, and member-only discounts.</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email..."
          className="panel-inset"
          style={{
            borderRadius: 12,
            padding: '11px 20px',
            border: '1px solid rgba(255,255,255,0.06)',
            color: '#f0f4ff',
            fontSize: '0.8rem',
            outline: 'none',
            minWidth: 240,
            fontFamily: 'Poppins, sans-serif',
            background: 'transparent',
          }}
          onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(249,115,22,0.3)'}
          onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.06)'}
        />
        <button className="btn-cart" onClick={handleSend} style={{
          borderRadius: 12,
          padding: '11px 26px',
          fontWeight: 700,
          fontSize: '0.78rem',
          letterSpacing: '0.1em',
          color: '#fff',
          border: 'none',
          fontFamily: 'Montserrat, sans-serif',
          background: sent ? 'linear-gradient(145deg, #22c55e, #16a34a)' : undefined,
        }}>
          {sent ? '✓ Subscribed!' : 'Subscribe →'}
        </button>
      </div>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="glass-panel" style={{
      padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 5vw, 3rem)',
      marginTop: 0,
    }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, marginBottom: 32 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2 17 C6 15, 10 9, 16 9 C19 9, 21 11, 22 13 L8 17 Z" fill="#f97316" />
              </svg>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '1rem', letterSpacing: '0.08em', color: '#f0f4ff' }}>SOLARA</span>
            </div>
            <p style={{ color: '#8892aa', fontSize: '0.72rem', lineHeight: 1.7 }}>Engineering precision meets street culture. Every step, reimagined.</p>
          </div>
          {/* Links */}
          {[
            { title: 'Shop', links: ['New Arrivals', 'Best Sellers', 'Sale', 'Collab'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Sustainability'] },
            { title: 'Support', links: ['Size Guide', 'Shipping', 'Returns', 'Contact'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: '0.65rem', color: '#f97316', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Montserrat, sans-serif' }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map(l => (
                  <a key={l} href="#" style={{
                    color: '#8892aa', textDecoration: 'none', fontSize: '0.75rem',
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = '#f0f4ff'; (e.target as HTMLElement).style.paddingLeft = '4px'; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = '#8892aa'; (e.target as HTMLElement).style.paddingLeft = '0'; }}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)', marginBottom: 20 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: '0.65rem', color: '#8892aa' }}>© 2025 SOLARA. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['TW', 'IG', 'YT', 'TK'].map(icon => (
              <button key={icon} className="btn-skeu" style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8892aa',
                fontSize: '0.55rem',
                fontWeight: 800,
                border: 'none',
                letterSpacing: '0.04em',
              }}>{icon}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0a0e1a 0%, #0d1424 40%, #111827 100%)',
      fontFamily: 'Poppins, Montserrat, sans-serif',
      position: 'relative',
    }}>
      {/* Global background glow */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 800,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(249,115,22,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        bottom: '10%',
        left: '10%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ─ Header ─ */}
        <Header />

        <main style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 5vw, 3.5rem)' }}>

          {/* ─ Hero headline ─ */}
          <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto', width: '100%' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(249,115,22,0.08)',
              border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: 20,
              padding: '5px 14px',
              marginBottom: 16,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', boxShadow: '0 0 8px rgba(249,115,22,0.8)' }} className="animate-pulse-glow" />
              <span style={{ fontSize: '0.65rem', color: '#f97316', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif' }}>FW25 Collection Now Live</span>
            </div>
            <h1 className="emboss" style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              background: 'linear-gradient(135deg, #f0f4ff 20%, #8892aa 60%, #f0f4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 12,
            }}>
              Built for the<br />
              <span style={{
                background: 'linear-gradient(135deg, #f97316, #ff6a00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(249,115,22,0.4))',
              }}>Relentless.</span>
            </h1>
            <p style={{ color: '#8892aa', fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              Precision-engineered footwear for those who refuse to stop. Drop-forged performance. Uncompromising style.
            </p>
          </div>

          {/* ─ Hero Slider ─ */}
          <HeroSlider />

          {/* ─ Stats ─ */}
          <StatsBar />

          {/* ─ Featured Products ─ */}
          <section style={{ maxWidth: 880, margin: '0 auto', width: '100%' }}>
            <SectionTitle label="curated picks" title="Trending Now" />
            <CategorySelector />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 18,
            }}>
              {featuredProducts.map(p => (
                <div key={p.id} style={{ position: 'relative' }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>

          {/* ─ Feature Strips ─ */}
          <section style={{ maxWidth: 880, margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
              {[
                { icon: '⚡', title: 'Lightning Delivery', sub: '2-Day Express Worldwide' },
                { icon: '🔄', title: 'Free Returns', sub: '60-Day No-Hassle Policy' },
                { icon: '🛡️', title: '2-Year Warranty', sub: 'Full Coverage, Zero Stress' },
                { icon: '🔒', title: 'Secure Checkout', sub: '256-bit SSL Encrypted' },
              ].map(f => (
                <div key={f.title} className="panel-raised" style={{
                  borderRadius: 18,
                  padding: '18px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '10px 10px 25px rgba(0,0,0,0.7), -4px -4px 12px rgba(255,255,255,0.03), inset 1px 1px 0px rgba(255,255,255,0.06), inset -1px -1px 0px rgba(0,0,0,0.4), 0 0 25px 5px rgba(249,115,22,0.1)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: 'linear-gradient(145deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))',
                    border: '1px solid rgba(249,115,22,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    boxShadow: '0 0 15px rgba(249,115,22,0.1)',
                  }}>{f.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#d8e0f0', fontFamily: 'Montserrat, sans-serif', marginBottom: 2 }}>{f.title}</div>
                    <div style={{ fontSize: '0.65rem', color: '#8892aa' }}>{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─ Newsletter ─ */}
          <Newsletter />

        </main>

        {/* ─ Footer ─ */}
        <Footer />
      </div>
    </div>
  );
}
