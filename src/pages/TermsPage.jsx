export default function TermsPage() {
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
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: March 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal use only. This is not a transfer of ownership and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display</li>
          <li>Attempt to compile, reverse engineer, or disassemble any software contained on the website</li>
          <li>Deceive or mislead us or other users</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>

        <h2>3. Disclaimer</h2>
        <p>
          The materials on our website are provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>4. Limitations</h2>
        <p>
          In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>

        <h2>5. Accuracy of Materials</h2>
        <p>
          The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on the website at any time without notice.
        </p>

        <h2>6. Links</h2>
        <p>
          We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
        </p>

        <h2>7. Modifications</h2>
        <p>
          We may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of your country, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>

        <h2>9. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us through the contact form on our website or via our social media channels.
        </p>
      </div>
    </main>
  );
}
