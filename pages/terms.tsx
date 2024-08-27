import { NextPage } from "next";

const TermsOfService: NextPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Terms of Service
      </h1>
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📜 Introduction
          </h2>
          <p className="text-lg text-gray-700">
            Welcome to Delivery22! These terms of service outline the rules and
            regulations for the use of our service.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📑 Terms and Conditions
          </h2>
          <p className="text-lg text-gray-700">
            By accessing or using our service, you agree to comply with these
            terms. If you do not agree, you may not use our service.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🔄 Changes to Terms
          </h2>
          <p className="text-lg text-gray-700">
            We may update these terms from time to time. We will notify you of
            any changes by posting the new terms on this page.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📧 Contact Us
          </h2>
          <p className="text-lg text-gray-700">
            If you have any questions about these terms, please contact us at
            <a
              href="mailto:support@delivery22.com"
              className="text-blue-600 hover:underline ml-1"
            >
              support@delivery22.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
