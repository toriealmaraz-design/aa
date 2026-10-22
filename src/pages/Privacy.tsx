import LegalPage, { LegalSection } from './LegalPage'

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="October 22, 2026">
      <p className="text-slate-400">
        This Privacy Policy explains how Nexify collects, uses, and protects your personal
        information when you use our platform. We are committed to handling your data responsibly
        and in line with applicable Ghanaian data protection law.
      </p>

      <LegalSection heading="1. Information We Collect">
        <p>
          We collect information you provide directly — your name, email, phone number, and Mobile
          Money details — as well as data generated through use, such as transactions, orders, and
          device and usage information.
        </p>
      </LegalSection>

      <LegalSection heading="2. How We Use Your Information">
        <p>
          We use your information to operate your shop, process transactions and withdrawals,
          prevent fraud, provide support, and improve the platform. We may send you service-related
          messages about your account and transactions.
        </p>
      </LegalSection>

      <LegalSection heading="3. Sharing Your Information">
        <p>
          We share data only as needed to deliver the service — for example with mobile networks to
          fulfill orders and with payment providers to process Mobile Money. We do not sell your
          personal information.
        </p>
      </LegalSection>

      <LegalSection heading="4. Data Security">
        <p>
          We use industry-standard safeguards, including encryption in transit and access controls,
          to protect your information. No method of transmission is perfectly secure, but we work
          continuously to protect your data.
        </p>
      </LegalSection>

      <LegalSection heading="5. Data Retention">
        <p>
          We retain your information for as long as your account is active and as required to meet
          legal, accounting, and fraud-prevention obligations. You may request deletion of your
          account subject to these requirements.
        </p>
      </LegalSection>

      <LegalSection heading="6. Your Rights">
        <p>
          You may access, correct, or request deletion of your personal information, and object to
          certain processing. To exercise these rights, contact us using the details below.
        </p>
      </LegalSection>

      <LegalSection heading="7. Cookies">
        <p>
          We use cookies and similar technologies to keep you signed in, remember preferences, and
          understand how the platform is used. You can control cookies through your browser settings.
        </p>
      </LegalSection>

      <LegalSection heading="8. Changes to This Policy">
        <p>
          We may update this policy periodically. We will notify you of material changes in-app or
          by email. Your continued use after changes means you accept the updated policy.
        </p>
      </LegalSection>

      <LegalSection heading="9. Contact">
        <p>
          For privacy questions or requests, email{' '}
          <a href="mailto:privacy@nexify.app" className="text-blue-500 hover:text-blue-400">privacy@nexify.app</a>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
