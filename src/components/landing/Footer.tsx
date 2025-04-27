
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">HomePilot</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Dein intelligentes Dashboard für Zuhause und Leben.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Produkt</h3>
            <ul className="space-y-2">
              <li><Link to="/smart-home" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">Features</Link></li>
              <li><Link to="/finances" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">Preise</Link></li>
              <li><Link to="/documents" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">FAQ</Link></li>
              <li><Link to="/reports" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">Roadmap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Ressourcen</h3>
            <ul className="space-y-2">
              <li><Link to="/documents" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">Dokumentation</Link></li>
              <li><Link to="/reports" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">Blog</Link></li>
              <li><Link to="/tasks" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">Community</Link></li>
              <li><Link to="/settings" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <p className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
              <Mail className="h-4 w-4 mr-2" /> info@homepilot.de
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Musterstraße 123<br />
              12345 Berlin<br />
              Deutschland
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
            © {currentYear} HomePilot • Das KI-gestützte Zuhause- und Lebens-Dashboard
          </p>
          <div className="flex space-x-4">
            <Link to="/settings" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">Datenschutz</Link>
            <Link to="/settings" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">AGB</Link>
            <Link to="/settings" className="text-gray-600 hover:text-homepilot-primary dark:text-gray-300">Impressum</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
