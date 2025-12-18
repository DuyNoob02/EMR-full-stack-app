export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Full Stack App. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}