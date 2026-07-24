export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">CHANEL</div>
          <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', maxWidth: '26ch', lineHeight: 1.7 }}>
            The House of Chanel, founded by Gabrielle Bonheur Chanel.
          </p>
        </div>
        <div className="footer-col">
          <h3>Our Boutiques</h3>
          <ul>
            <li>Chanel Florence, Italy</li>
            <li>Chanel Vienna, Austria</li>
            <li>Chanel Paris, France</li>
            <li>Chanel Prague, Czechia</li>
            <li>Chanel Tirana, Albania</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Contact</h3>
          <p>
            For inquiries, reach us at<br />
            <a href="tel:+123456789">+1 234 567 89</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 CHANEL. All rights reserved.</span>
        <span>Paris · London · New York · Tokyo</span>
      </div>
    </footer>
  );
}
