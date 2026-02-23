import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    PenTool, Brain, BarChart3, CalendarDays, MessageCircle, Gift,
    Check, X, ChevronRight, Rocket, Shield, Clock, Sparkles
} from 'lucide-react'
import { submitBetaApplication } from '../lib/betaService'

const TOTAL_SPOTS = 20

const benefits = [
    { icon: PenTool, title: 'Redações corrigidas', desc: 'Envie suas redações e receba correções detalhadas de professores reais.', color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { icon: Brain, title: 'Flashcards inteligentes', desc: 'Crie e estude flashcards com repetição espaçada para fixar o conteúdo.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: BarChart3, title: 'Simulados com análise', desc: 'Faça simulados e veja exatamente onde está errando mais.', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { icon: CalendarDays, title: 'Cronograma de estudos', desc: 'Organize sua rotina com planos baseados no que você está estudando.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: MessageCircle, title: 'Acesso direto ao fundador', desc: 'Canal exclusivo para reportar bugs e sugerir melhorias diretamente.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Gift, title: 'Desconto de fundador', desc: 'Ao final do beta, oferta especial para continuar com desconto permanente.', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
]

const requirements = [
    'Usar a plataforma pelo menos 3 vezes por semana durante os 60 dias.',
    'Responder um formulário rápido a cada 2 semanas com suas impressões (10 minutos).',
    'Participar de uma call de 30 minutos ao final do período com o fundador.',
    'Avisar quando algo não funcionar — bugs, travamentos, confusões na interface.',
]

const idealProfile = [
    'Estuda para concurso, vestibular ou cursinho agora',
    'Tem pelo menos 1h por dia para dedicar',
    'Não tem medo de dar feedback direto e honesto',
    'Quer se organizar melhor nos estudos',
    'Aceita que o produto ainda tem imperfeições',
]

const notForYou = [
    'Espera um produto 100% polido',
    'Não tem tempo para dar feedback',
    'Está apenas curioso sem intenção de usar',
    'Não estuda ativamente no momento',
]

const modules = ['Redações + Correção', 'Flashcards', 'Questões', 'Simulados', 'Revisões', 'Cronograma de Estudos', 'Planos de Editais']

const perfilOptions = [
    { value: 'concurso', label: 'Estudando para concurso público' },
    { value: 'vestibular', label: 'Preparando para vestibular (ENEM, FUVEST, etc.)' },
    { value: 'cursinho', label: 'Estudante de cursinho' },
    { value: 'ensino_medio', label: 'Ensino médio regular' },
    { value: 'outro', label: 'Outro' },
]

const tempoOptions = [
    { value: 'menos_6', label: 'Menos de 6 meses' },
    { value: '6_a_2anos', label: '6 meses a 2 anos' },
    { value: 'mais_2anos', label: 'Mais de 2 anos' },
]

const horasOptions = [
    { value: 'ate5', label: 'Até 5 horas' },
    { value: '5a15', label: '5 a 15 horas' },
    { value: '15a30', label: '15 a 30 horas' },
    { value: 'mais30', label: 'Mais de 30 horas' },
]

export function BetaLanding() {
    const [formData, setFormData] = useState({
        nome: '', email: '', perfil: '', objetivo: '',
        tempo_estudo: '', horas_semana: '', motivacao: '',
    })
    const [submitting, setSubmitting] = useState(false)
    const [result, setResult] = useState(null) // { type: 'success' | 'duplicate' | 'error', message }
    const formRef = useRef(null)

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setResult(null)

        const response = await submitBetaApplication(formData)

        if (response.success) {
            setResult({ type: 'success', message: 'Candidatura recebida! Respondemos em até 48 horas.' })
            setFormData({ nome: '', email: '', perfil: '', objetivo: '', tempo_estudo: '', horas_semana: '', motivacao: '' })
        } else if (response.isDuplicate) {
            setResult({ type: 'duplicate', message: response.error })
        } else {
            setResult({ type: 'error', message: response.error })
        }

        setSubmitting(false)
    }

    const scrollToForm = (e) => {
        e.preventDefault()
        formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-surface-950 text-white">
            {/* Ambient Glow */}
            <div className="fixed top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none z-0" />
            <div className="fixed bottom-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none z-0 opacity-50" />

            {/* Nav */}
            <nav className="relative z-10 border-b border-white/5 bg-surface-950/80 backdrop-blur-md">
                <div className="max-w-3xl mx-auto flex items-center justify-between py-5 px-6">
                    <div className="flex items-center gap-2">
                        <img src="/logo-rendipro.svg" alt="RendiPro Logo" className="h-8 w-8 object-contain" />
                        <span className="text-xl font-bold tracking-tight">RendiPro</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-primary-400">
                        Beta Fechado
                    </span>
                </div>
            </nav>

            <div className="relative z-10 max-w-3xl mx-auto px-6">

                {/* Hero */}
                <section className="py-20 text-center">
                    <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400 mb-8">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-500" />
                            </span>
                            🔬 Programa de Testers — {TOTAL_SPOTS} vagas
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1] mb-6"
                    >
                        Teste a plataforma<br />antes de <span className="text-primary-500 relative">todo mundo</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed"
                    >
                        O RendiPRO está em beta e precisamos de estudantes reais para usar,
                        quebrar e melhorar a plataforma. Acesso 100% gratuito em troca
                        da sua opinião honesta.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <a
                            href="#formulario"
                            onClick={scrollToForm}
                            className="group inline-flex items-center gap-2.5 rounded-full bg-primary-600 px-8 py-4 text-lg font-bold text-white transition-all active:scale-95 hover:bg-primary-500 hover:shadow-2xl hover:shadow-primary-600/25"
                        >
                            Quero ser tester
                            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </a>
                        <div className="flex items-center gap-5 text-xs text-white/30">
                            <span className="flex items-center gap-1.5"><Check size={12} /> Gratuito</span>
                            <span className="flex items-center gap-1.5"><Check size={12} /> Sem cartão</span>
                            <span className="flex items-center gap-1.5"><Check size={12} /> Resposta em 48h</span>
                        </div>
                    </motion.div>
                </section>

                {/* Spots Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16"
                >
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.7rem] uppercase tracking-widest text-white/30 font-medium">Vagas disponíveis</span>
                        <span className="text-2xl font-bold"><span className="text-primary-500">{TOTAL_SPOTS}</span> vagas no total</span>
                    </div>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden w-full sm:max-w-[200px]">
                        <motion.div
                            initial={{ width: '0%' }}
                            whileInView={{ width: '30%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
                        />
                    </div>
                    <div className="flex flex-col gap-1 sm:text-right">
                        <span className="text-[0.7rem] uppercase tracking-widest text-white/30 font-medium">Período de acesso</span>
                        <span className="text-lg font-medium text-white/60">60 dias grátis</span>
                    </div>
                </motion.div>

                {/* What you get */}
                <Section title="O que você recebe" sub="Acesso completo à plataforma, sem pagar nada.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-primary-500/30 transition-colors"
                            >
                                <div className={`w-9 h-9 rounded-xl ${b.bg} flex items-center justify-center mb-3`}>
                                    <b.icon size={18} className={b.color} />
                                </div>
                                <h3 className="font-bold text-white text-sm mb-1">{b.title}</h3>
                                <p className="text-xs text-white/50 leading-relaxed">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Section>

                {/* What we ask */}
                <Section title="O que pedimos em troca" sub="Nada complicado — só precisamos da sua opinião.">
                    <div className="flex flex-col gap-2">
                        {requirements.map((r, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                            >
                                <span className="w-6 h-6 rounded-lg bg-primary-500/10 flex items-center justify-center text-xs font-bold text-primary-400 shrink-0 mt-0.5">
                                    {i + 1}
                                </span>
                                <p className="text-sm text-white/60 leading-relaxed">{r}</p>
                            </motion.div>
                        ))}
                    </div>
                </Section>

                {/* For whom */}
                <Section title="Esse programa é pra você?" sub="Selecionamos os perfis com cuidado para garantir um beta produtivo.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-emerald-500/20 bg-white/[0.03] p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">✓ Perfil ideal</p>
                            <ul className="flex flex-col gap-2">
                                {idealProfile.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0 mt-1.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-red-500/15 bg-white/[0.03] p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">✗ Não é pra você se</p>
                            <ul className="flex flex-col gap-2">
                                {notForYou.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0 mt-1.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* Modules */}
                <Section title="O que está disponível no beta" sub="Módulos funcionais que você vai testar.">
                    <div className="flex flex-wrap gap-2">
                        {modules.map((m, i) => (
                            <span key={i} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/60">
                                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                                {m}
                            </span>
                        ))}
                    </div>
                </Section>

                {/* Form */}
                <section ref={formRef} id="formulario" className="pb-20">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Candidatar-se ao beta</h2>
                            <p className="text-sm text-white/50">Preencha abaixo. Respondemos em até 48 horas.</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {result?.type === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6">
                                        <Check size={36} className="text-emerald-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">Candidatura enviada!</h3>
                                    <p className="text-white/50 max-w-sm mx-auto mb-2">
                                        Recebemos sua candidatura. Vamos analisar o seu perfil e responder por email em até <strong className="text-primary-400">48 horas</strong>.
                                    </p>
                                    <p className="text-xs text-white/30">Verifique também sua caixa de spam.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-5"
                                >
                                    {/* Feedback messages */}
                                    {result && result.type !== 'success' && (
                                        <div className={`rounded-xl px-4 py-3 text-sm font-medium ${result.type === 'duplicate' ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                                            {result.message}
                                        </div>
                                    )}

                                    {/* Name + Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField label="Nome completo" name="nome" type="text" placeholder="Seu nome" required value={formData.nome} onChange={handleChange} />
                                        <InputField label="Email" name="email" type="email" placeholder="seu@email.com" required value={formData.email} onChange={handleChange} />
                                    </div>

                                    {/* Perfil */}
                                    <SelectField label="Qual é o seu perfil de estudante?" name="perfil" required value={formData.perfil} onChange={handleChange} options={perfilOptions} />

                                    {/* Objetivo */}
                                    <InputField label="Qual concurso, vestibular ou prova está mirando?" name="objetivo" type="text" placeholder="Ex: ENEM, PCDF, Receita Federal..." value={formData.objetivo} onChange={handleChange} />

                                    <hr className="border-white/5 my-1" />

                                    {/* Tempo de estudo */}
                                    <RadioGroup label="Há quanto tempo estuda para isso?" name="tempo_estudo" required value={formData.tempo_estudo} onChange={handleChange} options={tempoOptions} />

                                    {/* Horas por semana */}
                                    <SelectField label="Quantas horas por semana você costuma estudar?" name="horas_semana" required value={formData.horas_semana} onChange={handleChange} options={horasOptions} />

                                    <hr className="border-white/5 my-1" />

                                    {/* Motivação */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-white/50">
                                            Por que quer participar do beta? <span className="text-primary-400">*</span>
                                        </label>
                                        <textarea
                                            name="motivacao"
                                            value={formData.motivacao}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            placeholder="Conte em 3-5 linhas o que te motivou a se candidatar e o que espera do RendiPRO..."
                                            className="w-full rounded-xl border border-white/10 bg-surface-950 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-y"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-primary-600 py-4 font-bold text-white transition-all active:scale-[0.98] hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-600/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                    >
                                        {submitting ? 'Enviando...' : 'Enviar candidatura'}
                                        {!submitting && <ChevronRight size={16} />}
                                    </button>

                                    <div className="flex items-center justify-center gap-4 text-[0.7rem] text-white/25 mt-1">
                                        <span className="flex items-center gap-1"><Shield size={10} /> Seus dados não são compartilhados</span>
                                        <span>·</span>
                                        <span className="flex items-center gap-1"><Clock size={10} /> Resposta em até 48h</span>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Founder */}
                <section className="pb-20">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 flex flex-col sm:flex-row gap-6 items-start">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center font-extrabold text-xl text-white shrink-0">
                            B
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg mb-0.5">Bruno</h3>
                            <p className="text-xs text-primary-400 mb-4">Fundador do RendiPRO</p>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Criei o RendiPRO porque vi de perto como é difícil organizar os estudos
                                para concursos e vestibulares sem uma ferramenta feita pra isso.
                                Planilhas e cadernos funcionam até certo ponto — mas não acompanham
                                o ritmo de quem estuda de verdade.
                            </p>
                            <p className="text-sm text-white/50 leading-relaxed mt-3">
                                Quero construir isso junto com quem vai usar. Cada tester vai ter
                                acesso direto a mim. Problemas, sugestões e críticas são bem-vindos.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-8 text-center">
                <p className="text-xs text-white/25">© 2026 RendiPRO · Programa Beta · Todos os dados são protegidos</p>
            </footer>
        </div>
    )
}

/* ── Helper Components ── */

function Section({ title, sub, children }) {
    return (
        <section className="mb-16">
            <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
            <p className="text-sm text-white/40 mb-6">{sub}</p>
            {children}
        </section>
    )
}

function InputField({ label, name, type, placeholder, required, value, onChange }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/50">
                {label} {required && <span className="text-primary-400">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full rounded-xl border border-white/10 bg-surface-950 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
        </div>
    )
}

function SelectField({ label, name, required, value, onChange, options }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/50">
                {label} {required && <span className="text-primary-400">*</span>}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full rounded-xl border border-white/10 bg-surface-950 px-4 py-3 text-sm text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all appearance-none cursor-pointer"
            >
                <option value="" disabled>Selecione...</option>
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
        </div>
    )
}

function RadioGroup({ label, name, required, value, onChange, options }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/50">
                {label} {required && <span className="text-primary-400">*</span>}
            </label>
            <div className="flex flex-col gap-2">
                {options.map(o => (
                    <label
                        key={o.value}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-all ${value === o.value ? 'border-primary-500 bg-primary-500/10 text-white' : 'border-white/10 bg-surface-950 text-white/50 hover:border-white/20'}`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={o.value}
                            checked={value === o.value}
                            onChange={onChange}
                            required={required}
                            className="accent-primary-500 w-4 h-4"
                        />
                        {o.label}
                    </label>
                ))}
            </div>
        </div>
    )
}
