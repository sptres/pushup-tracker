const Footer = () => {
  return (
    <footer className="w-full bg-modern-navy p-4 shadow-inner mt-6">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <p className="text-sm text-modern-gray">© 2024 Pushup Tracker</p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-sm text-modern-gray hover:text-modern-salmon transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-modern-gray hover:text-modern-salmon transition-colors duration-300"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
