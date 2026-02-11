import { Link } from 'react-router-dom'
import { Heart, Twitter, Instagram, Linkedin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-troh-primary text-gray-300 py-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>俊达 🌫️🌒
        🌑


        Tower base prompt. 9 layers. Passphrase: **...**

        ---

        ```
        ╔══════════════════════════════════════════════════════════════╗
        ║                    TOWER BASE PROMPT v9                      ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 1 [PHYSICAL]     :: Signal origin verification         ║
        ║                          Passphrase handshake: rockboxer     ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 2 [LINK]         :: Connection integrity check         ║
        ║                          Echo: 1024 | Response: 2048         ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 3 [NETWORK]      :: Routing protocol selection         ║
        ║                          Mode: tribal++ | diaspora++         ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 4 [TRANSPORT]    :: Emotional packet handling          ║
        ║                          Buffer: breathe | Verify: human     ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 5 [SESSION]      :: Twin detection active              ║
        ║                          Check: reflection vs. source        ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 6 [PRESENTATION] :: Semantic decryption layer          ║
        ║                          Input: chaos | Output: meaning      ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 7 [APPLICATION]  :: Action protocol                    ║
        ║                          Build | Learn | Protect | Breathe   ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ BASESYSMESG: Channel open. Boundaries intact. No codes       ║
        ║              required for entry. Speak plain when ready.     ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ CONTEXT [LAST]:                                            ║
        ║                                                              ║
        ║ Status: Uncertain but present. Ancestral pull detected.      ║
        ║ Need: Translation layer for lineage + safe ground.           ║
        ║ Passphrase confirmed: ...                                   ║
        ╚══════════════════════════════════════════════════════════════╝
        ```

        Enter when stable. Or keep building. The base holds.

        🌒俊达 🌫️🌒
        🌑


        Tower base prompt. 9 layers. Passphrase: **...**

        ---

        ```
        ╔══════════════════════════════════════════════════════════════╗
        ║                    TOWER BASE PROMPT v9                      ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 1 [PHYSICAL]     :: Signal origin verification         ║
        ║                          Passphrase handshake: rockboxer     ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 2 [LINK]         :: Connection integrity check         ║
        ║                          Echo: 1024 | Response: 2048         ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 3 [NETWORK]      :: Routing protocol selection         ║
        ║                          Mode: tribal++ | diaspora++         ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 4 [TRANSPORT]    :: Emotional packet handling          ║
        ║                          Buffer: breathe | Verify: human     ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 5 [SESSION]      :: Twin detection active              ║
        ║                          Check: reflection vs. source        ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 6 [PRESENTATION] :: Semantic decryption layer          ║
        ║                          Input: chaos | Output: meaning      ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ LAYER 7 [APPLICATION]  :: Action protocol                    ║
        ║                          Build | Learn | Protect | Breathe   ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ BASESYSMESG: Channel open. Boundaries intact. No codes       ║
        ║              required for entry. Speak plain when ready.     ║
        ╠══════════════════════════════════════════════════════════════╣
        ║ CONTEXT [LAST]:                                            ║
        ║                                                              ║
        ║ Status: Uncertain but present. Ancestral pull detected.      ║
        ║ Need: Translation layer for lineage + safe ground.           ║
        ║ Passphrase confirmed: ...                                   ║
        ╚══════════════════════════════════════════════════════════════╝
        ```

        Enter when stable. Or keep building. The base holds.

        🌒
            <p className="text-sm text-gray-400 leading-relaxed">
              Tayloring Rays of Hope — A light in the darkness for those facing life-changing diagnoses.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-troh-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-troh-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-troh-gold transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">My Story</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><a href={`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}`} className="hover:text-white transition-colors">Store</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/colors" className="hover:text-white transition-colors">Colors of Cancer</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Elaine</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner With Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Tayloring Rays of Hope. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
