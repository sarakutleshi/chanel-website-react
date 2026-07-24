import './Fashion.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const looks1 = [
  { src: "https://assets.vogue.com/photos/62274b72c0d4fbe60f143e7e/master/w_1920,c_limit/00001-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg", label: "Look 1" },
  { src: "https://assets.vogue.com/photos/62274b6d921b9eb00286c725/master/w_1920,c_limit/00002-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg", label: "Look 2" },
  { src: "https://assets.vogue.com/photos/62274b74c0d4fbe60f143e80/master/w_1920,c_limit/00003-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg", label: "Look 3" },
  { src: "https://assets.vogue.com/photos/62274b75921b9eb00286c727/master/w_1920,c_limit/00004-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg", label: "Look 4" },
];

const looks2 = [
  { src: "https://assets.vogue.com/photos/62274b7cf1c0bf717ac69a97/master/w_1920,c_limit/00006-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg", label: "Look 6" },
  { src: "https://assets.vogue.com/photos/62274b83921b9eb00286c729/master/w_1920,c_limit/00009-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg", label: "Look 7" },
  { src: "https://assets.vogue.com/photos/62274b881c9add4585407320/master/w_1920,c_limit/00012-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg", label: "Look 8" },
  { src: "https://assets.vogue.com/photos/62274b982e6b31ae91659611/master/w_1920,c_limit/00018-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg", label: "Look 9" },
];

const shopItems = [
  {
    img: "https://www.chanel.com/images/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_756/FSH-1695807075141-p74332c67158nq401.jpg",
    tag: "New", category: "Ready-to-Wear", name: "Tweed Jacket",
    desc: "Iconic bouclé tweed jacket with gilt chain trim and interlocked CC buttons.",
    price: "$8,200", btn: "Add to Cart",
  },
  {
    img: "https://assets.vogue.com/photos/62274b72c0d4fbe60f143e7e/master/w_1920,c_limit/00001-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
    category: "Outerwear", name: "Long Wool Coat",
    desc: "A structured silhouette in double-faced wool with signature Chanel chain lining.",
    price: "$12,500", btn: "Add to Cart",
  },
  {
    img: "https://assets.vogue.com/photos/62274b75921b9eb00286c727/master/w_1920,c_limit/00004-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
    category: "Ready-to-Wear", name: "Pleated Midi Skirt",
    desc: "Fluid pleated skirt in lightweight crepe — effortlessly elegant in motion.",
    price: "$4,700", btn: "Add to Cart",
  },
  {
    img: "https://assets.vogue.com/photos/62274b7cf1c0bf717ac69a97/master/w_1920,c_limit/00006-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
    tag: "Exclusive", category: "Haute Couture", name: "Embellished Evening Gown",
    desc: "Hand-embroidered silk gown with thousands of individually placed crystals.",
    price: "On request", btn: "Enquire",
  },
  {
    img: "https://assets.vogue.com/photos/62274b83921b9eb00286c729/master/w_1920,c_limit/00009-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
    category: "Ready-to-Wear", name: "Ribbed Knit Dress",
    desc: "A column silhouette in fine merino ribbed knit, minimalist and endlessly wearable.",
    price: "$5,900", btn: "Add to Cart",
  },
  {
    img: "https://assets.vogue.com/photos/62274b881c9add4585407320/master/w_1920,c_limit/00012-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
    category: "Ready-to-Wear", name: "Tweed Suit Set",
    desc: "Matching jacket and trousers in a graphic houndstooth tweed with contrast trim.",
    price: "$9,800", btn: "Add to Cart",
  },
];

const pressQuotes = [
  { quote: '"A masterclass in restraint and luxury."', cite: "— Vogue Paris" },
  { quote: '"Virginie Viard continues to redefine what it means to be a Chanel woman."', cite: "— Business of Fashion" },
  { quote: '"Every look felt like an heirloom waiting to be passed down."', cite: "— Harper\'s Bazaar" },
];

const details = [
  "https://assets.vogue.com/photos/622767220c75bb354d91848a/master/w_1920,c_limit/00001-chanel-fall-2022-ready-to-wear-details-paris-credit-gorunway.jpg",
  "https://assets.vogue.com/photos/622767238dbebe08dcd9c70e/master/w_1920,c_limit/00002-chanel-fall-2022-ready-to-wear-details-paris-credit-gorunway.jpg",
  "https://assets.vogue.com/photos/62276731052738f13421bd06/master/w_1920,c_limit/00003-chanel-fall-2022-ready-to-wear-details-paris-credit-gorunway.jpg",
  "https://assets.vogue.com/photos/6227673f2e6b31ae9165965a/master/w_1920,c_limit/00007-chanel-fall-2022-ready-to-wear-details-paris-credit-gorunway.jpg",
  "https://assets.vogue.com/photos/6227673d2e6b31ae91659658/master/w_1920,c_limit/00006-chanel-fall-2022-ready-to-wear-details-paris-credit-gorunway.jpg",
  "https://assets.vogue.com/photos/6227674b94d1f5a693c13e0e/master/w_1920,c_limit/00010-chanel-fall-2022-ready-to-wear-details-paris-credit-gorunway.jpg",
  "https://assets.vogue.com/photos/62276750cb9c17da3b08e44b/master/w_1920,c_limit/00011-chanel-fall-2022-ready-to-wear-details-paris-credit-gorunway.jpg",
  "https://assets.vogue.com/photos/62274b782e6b31ae9165960f/master/w_1920,c_limit/00005-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
  "https://assets.vogue.com/photos/62274b74c0d4fbe60f143e80/master/w_1920,c_limit/00003-chanel-fall-2022-ready-to-wear-paris-credit-gorunway.jpg",
];

function LookGrid({ items, noPaddingTop = false }) {
  return (
    <div className="look-grid" style={noPaddingTop ? { paddingTop: 0 } : {}}>
      {items.map((item, i) => (
        <div className="look-card" key={i}>
          <img src={item.src} alt={item.label} />
          <div className="look-caption"><span>{item.label}</span></div>
        </div>
      ))}
    </div>
  );
}

export default function Fashion() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="fashion-showcase" aria-label="Fashion hero">
        <div className="fashion-showcase-bg" />
        <div className="fashion-showcase-text">
          <span className="hero-eyebrow">Haute Couture</span>
          <h1>Fall–Winter</h1>
          <h2>2024 / 25</h2>
          <a href="#looks" className="hero-btn">Explore the Collection</a>
        </div>
      </section>

      {/* Looks */}
      <div className="section-label" id="looks"><h2>Looks</h2></div>
      <div className="editorial-intro">
        <p>
          The CHANEL Fall-Winter 2024/25 Haute Couture collection by Virginie Viard comes to life in graphic
          silhouettes nuanced with precious tweeds and sophisticated embellishment.
        </p>
      </div>
      <LookGrid items={looks1} />
      <LookGrid items={looks2} noPaddingTop />

      {/* In Focus */}
      <div className="section-label"><h2>In Focus</h2></div>
      <div className="split-block">
        <div className="block-image">
          <img src="https://www.chanel.com/images/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_604/FSH-1695807075141-p74332c67158nq401.jpg" alt="Chanel in focus" />
        </div>
        <div className="block-text">
          <span className="eyebrow-label">The Venue</span>
          <h2>The Grand Palais Éphémère</h2>
          <p>
            The Grand Palais Éphémère was completely done up in tweed for today&apos;s Chanel show: an earthy
            light brown for the seats, black with shots of pop colors on the walls, and a pale green for
            the runway — designed to represent Scotland&apos;s River Tweed.
          </p>
          <p style={{ marginTop: '1.25rem' }}>
            The region was ground well-trod by Gabrielle Chanel; on her walks in the local countryside
            she gathered flowers and greenery as references for the colors she wanted from the fabric makers there.
          </p>
          <p style={{ marginTop: '1.25rem' }}>
            Tweed, a fabric born of Scottish landscapes, became one of Chanel&apos;s most beloved materials —
            reimagined season after season into something at once rooted in tradition and boldly contemporary.
          </p>
        </div>
      </div>

      {/* Shop the Collection */}
      <div className="section-label"><h2>Shop the Collection</h2></div>
      <div className="shop-grid">
        {shopItems.map((item, i) => (
          <article className="shop-card" key={i}>
            <div className="shop-img-wrap">
              <img src={item.img} alt={item.name} />
              {item.tag && <span className="shop-tag">{item.tag}</span>}
            </div>
            <div className="shop-info">
              <span className="shop-category">{item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <span className="shop-price">{item.price}</span>
              <button onClick={() => alert('Added to CART!')}>{item.btn}</button>
            </div>
          </article>
        ))}
      </div>

      {/* Press Quotes */}
      <div className="press-band">
        <div className="press-inner">
          {pressQuotes.map((q, i) => (
            <>
              {i > 0 && <div className="press-divider" key={`div-${i}`} />}
              <div className="press-item" key={i}>
                <blockquote>{q.quote}</blockquote>
                <cite>{q.cite}</cite>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="section-label"><h2>Details</h2></div>
      <div className="details-grid">
        {details.map((src, i) => (
          <div className="look-card" key={i}>
            <img src={src} alt={`Detail ${i + 1}`} />
            <div className="look-caption"><span>Detail {i + 1}</span></div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
