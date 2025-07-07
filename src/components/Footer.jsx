function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 px-4 py-6 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} <span className="text-teal-400 font-semibold">FXIntel.AI</span>. All rights reserved.
        </div>

        {/* <div className="flex space-x-4 text-sm">
          <a href="/privacy" className="hover:text-teal-400 transition-all">Privacy</a>
          <a href="/terms" className="hover:text-teal-400 transition-all">Terms</a>
          <a href="mailto:support@fxintel.ai" className="hover:text-teal-400 transition-all">Support</a>
        </div> */}
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        Built with 💻 + 🧠 <a href="https://davidolarinde.vercel.app"  target="_blank"
            rel="noopener noreferrer" className="text-teal-400 hover:underline">David Olarinde</a> 🚀
      </div>
    </footer>
  );
}

export default Footer;
