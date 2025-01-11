import { Gamepad2, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className=" bg-black/30 backdrop-blur-sm text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Gamepad2 className="w-8 h-8 text-purple-400" />
                            <span className="ml-2 text-xl font-bold text-white">GameZone</span>
                        </div>
                        <p className="text-sm">
                            Your ultimate destination for online gaming entertainment. Play responsibly.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-purple-400"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-purple-400"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-purple-400"><Instagram className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#games" className="hover:text-purple-400">Games</a></li>
                            <li><a href="#winners" className="hover:text-purple-400">Winners</a></li>
                            <li><a href="#" className="hover:text-purple-400">How to Play</a></li>
                            <li><a href="#" className="hover:text-purple-400">Results</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-purple-400">FAQ</a></li>
                            <li><a href="#" className="hover:text-purple-400">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-purple-400">Responsible Gaming</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                <a href="mailto:support@gamezone.com" className="hover:text-purple-400">
                                    support@gamezone.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                <a href="tel:+1234567890" className="hover:text-purple-400">
                                    +1 (234) 567-890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} GameZone. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}