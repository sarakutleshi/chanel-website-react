import './AboutUs.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const timelineItems = [
  { year: "1910", title: "Rue Cambon", desc: "Gabrielle Chanel opens her first millinery boutique at 21 Rue Cambon, Paris — the address that would become synonymous with the House of Chanel." },
  { year: "1921", title: "N°5", desc: "The launch of CHANEL N°5 — the world's first abstract perfume, composed by Ernest Beaux. It becomes the most iconic fragrance in history." },
  { year: "1926", title: "The Little Black Dress", desc: "Vogue publishes the \"Ford\" dress — Chanel's vision of a simple, elegant black dress that would define modern femininity for decades to come." },
  { year: "1954", title: "The Return", desc: "After 15 years, Gabrielle Chanel returns to haute couture at age 71, presenting the jersey suit that would reinvent women's fashion once again." },
  { year: "1983", title: "Karl Lagerfeld", desc: "Karl Lagerfeld takes the helm as Creative Director, ushering in a new era of bold creativity while honoring the codes established by Gabrielle Chanel." },
  { year: "2019", title: "Virginie Viard", desc: "Virginie Viard is appointed Creative Director following Karl Lagerfeld's passing, continuing the House's legacy with a distinctly feminine and modern vision." },
];

const values = [
  { num: "01", title: "Creativity", desc: "Every collection, every formula, every campaign is an act of creative courage — rooted in Gabrielle Chanel's belief that beauty is never an accident." },
  { num: "02", title: "Savoir-Faire", desc: "The extraordinary skills of our artisans — the métiers d'art — are the living heart of the House. We protect and nurture these crafts for generations to come." },
  { num: "03", title: "Independence", desc: "Privately held since its founding, Chanel maintains its freedom to make decisions based on long-term vision, not short-term market pressure." },
  { num: "04", title: "Sustainability", desc: "We are committed to reducing our environmental impact — from sustainable sourcing to carbon reduction targets — because the future demands nothing less." },
  { num: "05", title: "Inclusivity", desc: "Chanel has always been for the woman who knows her own mind. Today, that commitment extends to ensuring our spaces, products and stories are open to all." },
  { num: "06", title: "Timelessness", desc: "Trends come and go. The Chanel ethos — simplicity, elegance, modernity — transcends the moment and speaks directly to any era." },
];

export default function AboutUs() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="about-showcase" aria-label="Hero image">
        <img
          src="https://www.chanel.com/puls-img/c_limit,w_2400/q_auto:good,dpr_auto,f_auto/1745590057501-lapausamainvisueldesktopx2jpg_1660x2880.jpg"
          alt="Chanel — La Pausa"
        />
      </section>

      {/* The History */}
      <div className="section-label"><h2>The History</h2></div>
      <div className="about-split">
        <div className="block-image">
          <img
            src="https://www.chanel.com/puls-img/c_limit,w_1770/q_auto:good,dpr_auto,f_auto/1745590057394-lapausa2ndvisueldesktopmobilex3jpg_1179x1770.jpg"
            alt="Chanel digital heritage"
          />
        </div>
        <div className="block-text">
          <span className="eyebrow-label">Digital Presence</span>
          <h2>CHANEL.COM</h2>
          <p>Our website, chanel.com, serves as a significant point of contact for our Brand to the wider world.</p>
          <p style={{ marginTop: '1.25rem' }}>
            As we continue to grow our digital media presence, our Global Digital Services team works across
            Chanel&apos;s digital sites to accelerate progress by embedding sustainability from the start.
          </p>
          <p style={{ marginTop: '1.25rem' }}>
            We worked closely with partners to reduce the weight of chanel.com webpages by 55%, making them
            30% faster to load — driving a 16% reduction in emissions despite an almost 28% increase in traffic in 2022.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="section-label"><h2>A Century of Style</h2></div>
      <div className="timeline-intro">
        <p>From a small millinery shop in Paris to one of the most iconic Houses in the world — a journey shaped by vision, courage and an unwavering belief in modernity.</p>
      </div>
      <div className="timeline">
        {timelineItems.map((item, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-year">{item.year}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* The Founder */}
      <div className="section-label"><h2>The Founder</h2></div>
      <div className="founder-portrait">
        <img
          src="https://i.pinimg.com/736x/65/52/8e/65528e4333be803cc97833893035cc54.jpg"
          alt="Gabrielle Chanel"
        />
      </div>
      <div className="pull-quote">
        <blockquote>&quot;May my legend prosper and thrive. I wish it a long and happy life!&quot;</blockquote>
        <p>
          Gabrielle Chanel lived her life as she alone intended. The trials of a childhood as an orphan and
          the successes of an accomplished businesswoman gave birth to an extraordinary character: daring,
          free, and ahead of her time.
        </p>
        <p style={{ marginTop: '1.5rem' }}>
          Faithful friendships and passionate love affairs, as well as a thirst for culture, discovery and
          travel helped shape her personality. A wardrobe freed from constraints and superfluity, tweaked
          with masculine accents, created a visionary allure that has become timeless and yet wildly modern.
        </p>
      </div>

      {/* Our Values */}
      <div className="section-label"><h2>Our Values</h2></div>
      <div className="values-grid">
        {values.map((v, i) => (
          <div className="value-card" key={i}>
            <div className="value-number">{v.num}</div>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
