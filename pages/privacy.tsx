import { NextPage } from "next";

const PrivacyPolicy: NextPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Privacy Policy
      </h1>
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📜 Introduction
          </h2>
          <p className="text-lg text-gray-700">
            This Privacy Policy describes how we handle your personal
            information.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📊 Information Collection
          </h2>
          <p className="text-lg text-gray-700">
            We collect information that you provide directly to us, such as when
            you create an account or contact us.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🔄 Information Use
          </h2>
          <p className="text-lg text-gray-700">
            We use your information to provide and improve our services, and to
            communicate with you.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🔐 Data Security
          </h2>
          <p className="text-lg text-gray-700">
            We implement security measures to protect your information. However,
            no method of transmission over the internet or electronic storage is
            100% secure.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
