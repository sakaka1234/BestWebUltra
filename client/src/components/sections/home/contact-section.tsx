export const ContactSection = () => {
  return (
    <section className="w-full flex justify-center items-center bg-[#110F0F] py-16 relative">
      <div className="w-full max-w-4xl rounded-lg shadow-lg flex flex-col items-center py-16 px-4 border-2 border-sky-700 bg-gradient-to-tr  from-sky-900 to-black">
        <h2 className="text-4xl font-semibold mb-2 text-white">Contact</h2>
        <p className="text-sky-200 mb-8 text-center">
          Any questions or requests, let us know!
        </p>
        <form className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-2 rounded-full border border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 text-white bg-sky-800 shadow-sm min-w-[220px] placeholder:text-sky-300"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-black text-sky-300 font-semibold transition-colors"
          >
            SEND
          </button>
        </form>
      </div>
      {/* Go to Top Button */}
    </section>
  );
};
