export default function ContactPage() {
  return (
    <div className="h-min-screen w-full flex flex-col  pt-10 px-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Contact Us</h1>
        <h2 className="text-lg text-gray-600 mt-2">
          We&apos;re here to help, so please find the most relevant way to get
          in touch below.
        </h2>
      </div>

      <div className="flex flex-col space-y-2 sm:space-y-3 items-center text-sm sm:text-base text-gray-700">
        <div className="flex items-center space-x-2 text-base sm:text-lg ">
          <p className="text-lg sm:text-xl">📞</p>
          <p className="font-medium">Phone Number:</p>
          <p>
            <a
              href="tel:+123456789"
              className="text-blue-600 hover:text-blue-800 transition duration-200"
            >
              +1 234 567 890
            </a>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-base sm:text-lg ">
          <p className="text-xl">📧</p>
          <p className="font-medium">Email:</p>
          <p>
            <a
              href="mailto:someone@example.com"
              className="text-blue-600 hover:text-blue-800 transition duration-200"
            >
              goodshub@example.com
            </a>
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-2 pt-2">
          <p className="text-lg">
            Or stop by our office in Dublin anytime during our working hours.
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            🕘 Working Hours: 09:00 - 18:00
          </p>
          <div className="flex flex-col sm:flex-row items-center space-x-2 text-base sm:text-lg">
            <p className=" font-medium">
              <span className="text-xl">📍</span>Address:
            </p>
            <p>123 Fake Street, City, Country</p>
          </div>
        </div>

        <div className="w-72 sm:w-96 h-72 sm:h-96 mt-6 relative rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="absolute h-full w-full left-0 top-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2242.8853452497247!2d-6.281460072414654!3d53.334591394799205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670c22b3760d37%3A0x8417dee95639722e!2sO&#39;Donovan%20Road!5e1!3m2!1sen!2sie!4v1742389597765!5m2!1sen!2sie"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
