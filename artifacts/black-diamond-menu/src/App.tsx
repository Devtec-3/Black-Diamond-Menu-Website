import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Router as WouterRouter, Switch } from 'wouter';

type MenuItem = {
  name: string;
  price: string;
  note?: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const kitchenSections: MenuSection[] = [
  {
    title: 'BBQ & Grills',
    items: [
      { name: 'BBQ Chicken Cut 2', note: 'served with chips & coleslaw', price: '₦12,000' },
      { name: 'BBQ Chicken Cut 4', note: 'served with chips & coleslaw', price: '₦6,000' },
      { name: 'Big BBQ Fish', note: 'served with chips & coleslaw', price: '₦12,000' },
      { name: 'BBQ Turkey', note: 'served with chips & coleslaw', price: '₦14,000' },
    ],
  },
  {
    title: 'Pepper Soup',
    items: [
      { name: 'Pot Fish', price: '₦10,000' },
      { name: 'Turkey Pepper Soup', price: '₦10,000' },
      { name: 'Goat Meat Pepper Soup', price: '₦8,000' },
      { name: 'Chicken Pepper Soup', price: '₦8,000' },
      { name: 'Assorted Meat Pepper Soup', price: '₦8,000' },
      { name: 'Cow Tail Pepper Soup', price: '₦8,000' },
      { name: 'Cow Leg Pepper Soup', price: '₦8,000' },
    ],
  },
  {
    title: 'Noodles & Pasta',
    items: [
      { name: 'Stir-fried Noodles with Chicken', price: '₦8,000' },
      { name: 'Stir-fried Noodles with Omelette', price: '₦4,000' },
      { name: 'Stir-fried Pasta with Chicken', price: '₦10,000' },
      { name: 'Stir-fried Noodles with Turkey', price: '₦12,000' },
      { name: 'Stir-fried Pasta with Turkey', price: '₦12,000' },
    ],
  },
];

const loungeSections: MenuSection[] = [
  {
    title: 'Cocktails',
    items: [
      { name: 'Whiskey Sour', price: '₦5,000' },
      { name: 'Pina Colada', price: '₦5,500' },
      { name: 'Strawberry Daiquiri', price: '₦5,000' },
      { name: 'Margarita', price: '₦5,000' },
      { name: 'Long Island', price: '₦6,000' },
      { name: 'Classic Mojito', price: '₦5,000' },
      { name: 'Vodka Gimlet', price: '₦4,000' },
      { name: 'Tequila Sunrise', price: '₦5,000' },
      { name: 'Vodka Sunrise', price: '₦4,000' },
      { name: 'Mimosa', price: '₦6,000' },
      { name: 'Hold-Me-Down', price: '₦5,000' },
      { name: 'Calm-Me-Down', price: '₦5,000' },
      { name: 'Pink Lady', price: '₦5,000' },
      { name: 'Blue Shark', price: '₦5,000' },
      { name: 'Sex on the Beach', price: '₦6,000' },
      { name: 'Chocolate Martini', price: '₦5,000' },
      { name: 'Gin Lemonade', price: '₦4,000' },
      { name: 'Classic Blue Lagoon', price: '₦5,000' },
      { name: 'Cosmopolitan', price: '₦5,000' },
      { name: 'Green Screwdriver', price: '₦5,000' },
      { name: 'Santa Frost', price: '₦5,000' },
      { name: 'Rainbow Cocktail', price: '₦5,000' },
    ],
  },
  {
    title: 'Mocktails',
    items: [
      { name: 'Virgin Mojito', price: '₦3,500' },
      { name: 'Chapman', price: '₦3,000' },
      { name: 'Blue Lagoon', price: '₦3,500' },
      { name: 'Mid-Mix', price: '₦4,000' },
      { name: 'Free Tequila Sunrise', price: '₦4,000' },
      { name: 'Hibiscus Lemonade', price: '₦2,500' },
      { name: 'Virgin Strawberry Daiquiri', price: '₦4,000' },
      { name: 'Virgin Colada', price: '₦4,000' },
      { name: 'Devils Day Off', price: '₦3,000' },
    ],
  },
  {
    title: 'Smoothies',
    items: [
      { name: 'Banana Strawberry', price: '₦4,000' },
      { name: 'Tropical Twist', price: '₦4,000' },
      { name: 'Apple Blast', price: '₦3,500' },
      { name: 'Sunrise Smoothie', price: '₦4,000' },
    ],
  },
  {
    title: 'Milkshakes',
    items: [
      { name: 'Oreo Milkshake', price: '₦4,000' },
      { name: 'Caramel Milkshake', price: '₦4,000' },
      { name: 'Strawberry Milkshake', price: '₦4,000' },
      { name: 'Vanilla Milkshake', price: '₦3,500' },
    ],
  },
  {
    title: 'Shots',
    items: [
      { name: 'Bacardi Rum', price: '₦2,000' },
      { name: 'Tequila Shot', price: '₦2,500' },
      { name: 'Gin', price: '₦1,500' },
      { name: 'Vodka', price: '₦1,500' },
    ],
  },
  {
    title: 'Beer',
    items: [
      { name: 'Orijin Big', price: '₦2,000' },
      { name: 'Tiger', price: '₦2,000' },
      { name: 'Big Smirnoff', price: '₦2,500' },
      { name: 'Trophy', price: '₦2,000' },
      { name: 'Heineken', price: '₦2,500' },
      { name: 'Desperados', price: '₦2,500' },
      { name: 'Guinness', price: '₦2,500' },
      { name: 'Legend', price: '₦2,500' },
      { name: 'Budweiser', price: '₦2,500' },
      { name: 'Goldberg', price: '₦2,500' },
      { name: 'Orijin PET', price: '₦3,000' },
      { name: 'Bullet', price: '₦3,000' },
    ],
  },
  {
    title: 'Soft Drinks',
    items: [
      { name: 'Water', price: '₦500' },
      { name: 'Monster', price: '₦2,500' },
      { name: 'Red Bull', price: '₦2,500' },
      { name: 'Power Horse', price: '₦2,500' },
      { name: 'Fayrouz', price: '₦2,000' },
      { name: 'Can Coke', price: '₦1,000' },
      { name: 'Can Fanta', price: '₦1,000' },
      { name: 'Can Malt', price: '₦2,000' },
      { name: 'Active', price: '₦2,500' },
      { name: 'Exotic', price: '₦2,500' },
      { name: 'Hollandia', price: '₦2,500' },
    ],
  },
  {
    title: 'Non-alcoholic wines',
    items: [
      { name: 'Veleta', price: '₦5,000' },
      { name: 'Chamdor', price: '₦8,000' },
      { name: 'St. Lauren', price: '₦5,000' },
    ],
  },
  {
    title: 'Alcoholic drinks',
    items: [
      { name: 'William Lawson', price: '₦25,000' },
      { name: 'Sierra Tequila', price: '₦25,000' },
      { name: 'Olmeca Tequila', price: '₦35,000' },
      { name: 'Jameson Black', price: '₦50,000' },
      { name: 'Belaire', price: '₦70,000' },
      { name: 'Martell VS', price: '₦80,000' },
      { name: 'Martell Blue Swift', price: '₦125,000' },
      { name: 'Martell XO', price: '₦600,000' },
      { name: 'Hennessy VS', price: '₦80,000' },
      { name: 'Hennessy VSOP', price: '₦120,000' },
      { name: 'Casamigos', price: '₦200,000' },
      { name: 'Don Julio Reposado', price: '₦300,000' },
      { name: 'Don Julio 1942', price: '₦500,000' },
      { name: 'Azul', price: '₦500,000' },
    ],
  },
];

function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', description);
    document.head.appendChild(meta);
    const ogTitle = document.querySelector('meta[property="og:title"]') ?? document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', title);
    document.head.appendChild(ogTitle);
  }, [title, description]);
  return null;
}

function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="Black Diamond Lounge home" data-testid="link-home-wordmark">
      <span className="wordmark-mark" aria-hidden="true"><span>BD</span></span>
      <span className="wordmark-copy"><strong>BLACK DIAMOND</strong><small>LOUNGE &amp; KITCHEN</small></span>
    </Link>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <Wordmark />
      <span className="topbar-note">The menu / branch edition</span>
    </header>
  );
}

function Home() {
  return (
    <div className="site-shell">
      <Seo title="Black Diamond Lounge | Menu" description="Choose between the Black Diamond Kitchen and Lounge menus." />
      <Topbar />
      <main className="page-width">
        <section className="home-hero" aria-labelledby="welcome-title">
          <div className="home-hero-grid">
            <div>
              <p className="eyebrow">Welcome to Black Diamond</p>
              <h1 id="welcome-title" className="display home-title">Good food.<br /><em>Good drinks.</em><br />Good vibes.</h1>
              <div className="diamond-rule" aria-hidden="true"><i /><span>experience luxury, live the moment</span><i /></div>
              <p className="home-intro">You are looking at the menu for this Black Diamond branch. Choose a menu below, browse at your own pace, then order and pay in person.</p>
              <div className="chooser" aria-label="Choose a menu">
                <Link href="/kitchen" className="chooser-card" data-testid="link-kitchen-menu">
                  <img src="/images/kitchen-menu.jpg" alt="" aria-hidden="true" />
                  <span className="chooser-arrow" aria-hidden="true">↗</span>
                  <div className="chooser-card-content">
                    <span className="eyebrow">01 / From the grill</span>
                    <h2 className="display">Kitchen</h2>
                    <p>BBQ &amp; grills, pepper soup, noodles &amp; pasta.</p>
                  </div>
                </Link>
                <Link href="/lounge" className="chooser-card" data-testid="link-lounge-menu">
                  <img src="/images/beer-soft-drinks-menu.png" alt="" aria-hidden="true" />
                  <span className="chooser-arrow" aria-hidden="true">↗</span>
                  <div className="chooser-card-content">
                    <span className="eyebrow">02 / After dark</span>
                    <h2 className="display">Lounge</h2>
                    <p>Cocktails, beer, soft drinks, wines and bottles.</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="home-art">
              <img src="/images/venue-photos.jpg" alt="Black Diamond Lounge venue and night-time interior" />
              <div className="home-art-caption">Where luxury<br />meets the night</div>
            </div>
          </div>
        </section>
        <footer className="home-footer"><span>Order &amp; pay in person</span><span>Black Diamond Lounge</span><span>Menu edition / 01</span></footer>
      </main>
    </div>
  );
}

function MenuItemRow({ item, index }: { item: MenuItem; index: number }) {
  return (
    <div className="menu-item" data-testid={`menu-item-${index}-${item.name.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="item-name">{item.name}{item.note && <span className="item-note">{item.note}</span>}</div>
      <div className="item-price" data-testid={`price-${index}`}>{item.price}</div>
    </div>
  );
}

function MenuSectionView({ section, index }: { section: MenuSection; index: number }) {
  return (
    <section className="menu-section" id={section.title.toLowerCase().replaceAll(' ', '-')} aria-labelledby={`section-title-${index}`}>
      <div className="section-kicker">
        <h2 id={`section-title-${index}`} className="display">{section.title}</h2>
        <span>{String(section.items.length).padStart(2, '0')} items</span>
      </div>
      <div className="menu-list">
        {section.items.map((item, itemIndex) => <MenuItemRow key={`${section.title}-${item.name}`} item={item} index={itemIndex} />)}
      </div>
    </section>
  );
}

function MenuPage({ kind }: { kind: 'kitchen' | 'lounge' }) {
  const isKitchen = kind === 'kitchen';
  const sections = isKitchen ? kitchenSections : loungeSections;
  const [query, setQuery] = useState('');
  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return sections;
    return sections.map((section) => ({
      ...section,
      items: section.items.filter((item) => `${section.title} ${item.name} ${item.note ?? ''}`.toLowerCase().includes(normalized)),
    })).filter((section) => section.items.length > 0);
  }, [query, sections]);
  const totalItems = filteredSections.reduce((total, section) => total + section.items.length, 0);

  return (
    <div className="site-shell menu-page">
      <Seo title={`${isKitchen ? 'Kitchen' : 'Lounge'} Menu | Black Diamond`} description={`Browse the Black Diamond ${isKitchen ? 'Kitchen' : 'Lounge'} menu. Order and pay in person.`} />
      <Topbar />
      <main>
        <section className="page-width menu-hero" aria-labelledby="menu-title">
          <div className="menu-hero-layout">
            <div>
              <Link href="/" className="back-link eyebrow" data-testid="link-back-home">← Back to welcome</Link>
              <p className="eyebrow" style={{ marginTop: '2.5rem' }}>{isKitchen ? 'The kitchen / 01' : 'The lounge / 02'}</p>
              <h1 id="menu-title" className="display menu-title">{isKitchen ? <>From the <span>kitchen.</span></> : <>Stay for the <span>night.</span></>}</h1>
              <p className="menu-dek">{isKitchen ? 'A focused menu of smoky grills, pepper soup and wok-finished comfort. Read, choose, and let your server know.' : 'The room opens into cocktails, cold bottles, soft drinks and pours worth lingering over.'}</p>
              <div className="menu-notice"><span className="notice-dot" aria-hidden="true" /> View-only menu · Order and pay in person</div>
            </div>
          </div>
        </section>
        <div className="menu-tools">
          <div className="page-width menu-tools-inner">
            <nav className="category-nav" aria-label={`${isKitchen ? 'Kitchen' : 'Lounge'} menu categories`}>
              {sections.map((section) => <a className="category-link" href={`#${section.title.toLowerCase().replaceAll(' ', '-')}`} key={section.title} data-testid={`link-category-${section.title.toLowerCase().replaceAll(' ', '-')}`}>{section.title}</a>)}
            </nav>
            <div className="search-wrap">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input className="search-input" type="search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search this menu" aria-label="Search this menu" data-testid="input-menu-search" />
              {query && <button className="clear-search" type="button" onClick={() => setQuery('')} aria-label="Clear menu search" data-testid="button-clear-search">×</button>}
            </div>
          </div>
        </div>
        <div className="page-width menu-content">
          <div className="menu-main">
            {filteredSections.length > 0 ? filteredSections.map((section, index) => <MenuSectionView section={section} index={index} key={section.title} />) : (
              <div className="empty-state" role="status"><strong>No dish or drink found</strong>Try another name or clear your search.</div>
            )}
          </div>
          <aside className="menu-aside">
            <img className="menu-aside-image" src={isKitchen ? '/images/kitchen-menu.jpg' : '/images/beer-soft-drinks-menu.png'} alt="" />
            <div className="menu-side-note"><strong>At your table</strong><br />This is a view-only menu. Please place your order with a member of the Black Diamond team and pay in person.</div>
          </aside>
        </div>
        <footer className="page-width menu-footer"><Link href="/" className="back-link" data-testid="link-footer-home">← Choose another menu</Link><span>{totalItems} items listed</span></footer>
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <div className="site-shell">
      <Seo title="Page not found | Black Diamond" description="The Black Diamond menu page could not be found." />
      <Topbar />
      <main className="page-width not-found">
        <div><p className="eyebrow">Wrong turn</p><h1 className="display">That page is<br /><span style={{ color: 'var(--gold-bright)' }}>not on the menu.</span></h1><p>Return to the welcome page and choose a menu.</p><Link href="/" className="back-link eyebrow" data-testid="link-not-found-home">← Back to welcome</Link></div>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/kitchen"><MenuPage kind="kitchen" /></Route>
      <Route path="/lounge"><MenuPage kind="lounge" /></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>;
}

export default App;