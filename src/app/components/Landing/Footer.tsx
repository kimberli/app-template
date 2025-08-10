const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 text-secondary-700 bg-background-600">
      <div className="flex justify-between items-end mx-auto px-4 md:px-16">
        <div>
          <p className="text-left text-xs">App © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
