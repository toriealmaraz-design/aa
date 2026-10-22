import LegalPage, { LegalSection } from './LegalPage'

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="October 22, 2026">
      <p className="text-slate-400">
        These Terms of Service ("Terms") govern your access to and use of Nexify, a platform that
        lets individuals and businesses in Ghana resell mobile data bundles, airtime, and related
        digital services. By creating an account or using Nexify, you agree to these Terms.
      </p>

      <LegalSection heading="1. Eligibility">
        <p>
          You must be at least 18 years old and capable of entering into a binding contract under
          the laws of Ghana to use Nexify. By registering, you confirm that the information you
          provide is accurate and that you will keep it up to date.
        </p>
      </LegalSection>

      <LegalSection heading="2. Your Account">
        <p>
          You are responsible for safeguarding your login credentials and for all activity under
          your account. Notify us immediately of any unauthorized use. Nexify is not liable for
          losses arising from your failure to protect your account.
        </p>
      </LegalSection>

      <LegalSection heading="3. Reselling & Pricing">
        <p>
          As a vendor, you may set your own markup on the wholesale prices shown in your dashboard.
          You are responsible for the prices you present to your customers and for any applicable
          taxes. Nexify facilitates delivery and settlement but is not a party to the sale between
          you and your customer.
        </p>
      </LegalSection>

      <LegalSection heading="4. Payments & Wallet">
        <p>
          Funds collected from customers are credited to your Nexify wallet after the wholesale cost
          and any platform fees are deducted. Withdrawals are paid to your verified Mobile Money
          number. Nexify may hold or reverse funds associated with fraud, chargebacks, or disputed
          transactions.
        </p>
      </LegalSection>

      <LegalSection id="refunds" heading="5. Refund Policy">
        <p>
          Data and airtime are delivered electronically and are generally non-refundable once
          successfully delivered. If a transaction fails, the customer is automatically refunded to
          the original payment method, typically within minutes.
        </p>
        <p>
          Where a delivery is delayed or incorrect due to a platform or network error, contact
          support with the transaction reference and we will investigate and resolve eligible cases,
          including re-delivery or refund.
        </p>
      </LegalSection>

      <LegalSection heading="6. Prohibited Conduct">
        <p>
          You agree not to use Nexify for fraud, money laundering, resale of stolen credentials, or
          any activity that violates Ghanaian law or the terms of the mobile networks (MTN, Telecel,
          AirtelTigo). We may suspend or terminate accounts that breach these rules.
        </p>
      </LegalSection>

      <LegalSection heading="7. Service Availability">
        <p>
          We work to keep Nexify available 24/7 but do not guarantee uninterrupted service. Network
          downtime, maintenance, or events beyond our control may affect delivery times.
        </p>
      </LegalSection>

      <LegalSection heading="8. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Nexify is not liable for indirect or consequential
          losses. Our total liability for any claim is limited to the fees you paid to Nexify in the
          three months preceding the claim.
        </p>
      </LegalSection>

      <LegalSection heading="9. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Material changes will be communicated in-app
          or by email. Continued use after changes take effect constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection heading="10. Contact">
        <p>
          Questions about these Terms? Reach us at{' '}
          <a href="mailto:support@nexify.app" className="text-blue-500 hover:text-blue-400">support@nexify.app</a>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
