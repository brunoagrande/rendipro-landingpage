import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { trackRegisterCta } from '../lib/tracking'

const trackNavbarCta = () => trackRegisterCta({ buttonText: 'Comece Agora', location: 'navbar' })

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { getCheckoutUrl } = useInfluencer()

    const navLinks = [
        { name: 'Recursos', href: '#features' },
        { name: 'Preços', href: '#pricing' },
        { name: 'FAQ', href: '#faq' },
    ]

    return (
        <header className="w-full border-b border-white/5 bg-surface-950/80 backdrop-blur-md">
            <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <a href="/" className="flex items-center">
                    <img
                        src="/LogoRendiPro-v05-2026-sem-fundo.png"
                        alt="RendiPro"
                        className="h-9 w-auto object-contain"
                    />
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    <a
                        href="https://app.rendipro.com.br"
                        className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white sm:block"
                    >
                        Entrar
                    </a>
                    <a
                        href={getCheckoutUrl("https://app.rendipro.com.br/register")}
                        onClick={trackNavbarCta}
                        className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-surface-950 transition-all active:scale-95 hover:bg-white/90"
                    >
                        Comece Agora
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        className="text-white/70 md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="border-b border-white/5 bg-surface-950 px-4 pt-2 pb-6 md:hidden">
                    <nav>
                        <ul className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="block text-lg font-medium text-white/70"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li className="pt-4 border-t border-white/5">
                                <a
                                    href="https://app.rendipro.com.br"
                                    className="block text-lg font-medium text-white/70"
                                >
                                    Entrar no sistema
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    )
}
