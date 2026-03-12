export default function PrivacyPage() {
  return (
    <main className="policy-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .policy-page {
          font-family: 'Inter', -apple-system, sans-serif;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          color: #1f2937;
          min-height: 100vh;
          padding: 80px 24px;
        }

        .policy-container {
          max-width: 820px;
          margin: 0 auto;
          width: 100%;
          background: #ffffff;
          border-radius: 12px;
          padding: 60px 50px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .policy-page h1 {
          font-family: 'Sora', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: #1a2744;
          margin-bottom: 8px;
          line-height: 1.3;
          word-wrap: break-word;
          max-width: 100%;
        }

        .policy-page .last-updated {
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 48px;
          font-weight: 500;
        }

        .policy-page h2 {
          font-family: 'Sora', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #1a2744;
          margin-top: 40px;
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .policy-page p {
          font-size: 15px;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 16px;
        }

        .policy-page ul, .policy-page ol {
          margin-left: 28px;
          margin-bottom: 20px;
          color: #475569;
        }

        .policy-page li {
          margin-bottom: 12px;
          line-height: 1.8;
          font-size: 15px;
        }

        .policy-page strong {
          color: #1a2744;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .policy-page {
            padding: 60px 16px;
          }

          .policy-container {
            padding: 40px 28px;
            border-radius: 8px;
          }

          .policy-page h1 {
            font-size: 32px;
            margin-bottom: 8px;
          }

          .policy-page h2 {
            font-size: 18px;
            margin-top: 32px;
          }

          .policy-page p {
            font-size: 14px;
          }

          .policy-page li {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .policy-page {
            padding: 40px 12px;
          }

          .policy-container {
            padding: 28px 16px;
          }

          .policy-page h1 {
            font-size: 26px;
          }

          .policy-page h2 {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="policy-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: March 2026</p>

        <h2>Introduction</h2>
        <p>
          At Stronger Every Decade ("we", "us", "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
        <ul>
          <li><strong>Personal Data:</strong> Name, email address, phone number, and other information you voluntarily provide when contacting us or filling out forms.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.</li>
          <li><strong>Cookies:</strong> We may use cookies and similar tracking technologies to enhance your experience.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To respond to your inquiries and provide customer support</li>
          <li>To improve our website and services</li>
          <li>To send you updates and promotional materials (with your consent)</li>
          <li>To comply with legal obligations</li>
          <li>To prevent fraudulent activity and enhance security</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any personal information.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our privacy practices, please contact us through the contact form on our website or via our social media channels.
        </p>
      </div>
    </main>
  );
}
