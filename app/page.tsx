"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Activity, ArrowRight, CheckCircle2, Database, Lock, ShieldCheck } from "lucide-react";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const clinicalMessages = [
  "Loading Neural Architecture",
  "Calibrating Diagnostic Model",
  "Validating Prediction Engine",
  "Securing Clinical Environment",
];

const architectureSteps = [
  "Data Ingestion",
  "Clinical NLP Extraction",
  "Disease Classification",
  "Clinical Validation",
];

const capabilities = [
  "Fintech Fraud Detection",
  "Healthcare Analytics",
  "Supply Chain Intelligence",
  "Predictive Maintenance",
];

function SectionHeader({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-xs tracking-[0.24em] text-cyan-600 uppercase font-medium">{label}</p>
      <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 leading-tight tracking-tight">{title}</h2>
      <p className="text-slate-600 text-lg leading-relaxed">{body}</p>
    </div>
  );
}

function FadeInSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.section>
  );
}

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.9 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((target * eased).toFixed(2)));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <p ref={ref} className="text-3xl md:text-4xl font-semibold text-indigo-600 mt-1">
      {value.toFixed(2)}%
    </p>
  );
}

function SecurityBadge({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="rounded-xl border border-slate-200 bg-white px-4 py-5 text-sm text-slate-700 flex items-center gap-3"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-cyan-600">
        <motion.path
          d="M12 3L4.5 6.5V11.8C4.5 16.8 7.7 21.4 12 22.5C16.3 21.4 19.5 16.8 19.5 11.8V6.5L12 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0.5 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay }}
        />
      </svg>
      {text}
    </motion.div>
  );
}

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [statusIndex, setStatusIndex] = useState(0);
  const [scanStep, setScanStep] = useState(0);

  const heroRef = useRef<HTMLElement | null>(null);
  const vizRef = useRef<HTMLDivElement | null>(null);
  const vizInView = useInView(vizRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const parallaxA = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const parallaxB = useTransform(scrollYProgress, [0, 1], [0, -45]);

  useEffect(() => {
    const hideLoader = setTimeout(() => setLoading(false), 2800);
    const statusCycle = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % clinicalMessages.length);
    }, 600);

    return () => {
      clearTimeout(hideLoader);
      clearInterval(statusCycle);
    };
  }, []);

  useEffect(() => {
    if (!vizInView) return;
    const scanner = setInterval(() => {
      setScanStep((prev) => (prev + 1) % 4);
    }, 520);
    const stop = setTimeout(() => clearInterval(scanner), 2800);

    return () => {
      clearInterval(scanner);
      clearTimeout(stop);
    };
  }, [vizInView]);

  const terms = useMemo(() => ["Hemoglobin", "CRP", "Glucose", "LDL"], []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden">
      <motion.div
        animate={loading ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-0 z-50 bg-white flex items-center justify-center"
      >
        <div className="w-[min(580px,90vw)] text-center space-y-6">
          <p className="text-[12px] font-mono tracking-[0.18em] text-slate-700 uppercase">
            Initializing Clinical Intelligence…
          </p>
          <div className="h-[2px] bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: EASE }}
            />
          </div>
          <motion.p
            key={statusIndex}
            className="text-sm text-slate-500"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {clinicalMessages[statusIndex]}
          </motion.p>
        </div>
      </motion.div>

      <section ref={heroRef} className="relative px-6 py-28 md:py-36">
        <motion.div style={{ y: parallaxA }} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="blob blob-cyan top-14 left-[8%]" />
          <div className="blob blob-indigo top-40 right-[9%]" />
          <motion.div style={{ y: parallaxB }} className="blob blob-cyan bottom-12 right-[30%]" />
        </motion.div>
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={loading ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="text-5xl md:text-7xl font-semibold tracking-tight"
          >
            Clinical Intelligence, Redefined.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loading ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="mt-8 text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
          >
            VisionaryIQ develops AI systems that convert medical reports into predictive diagnostic insight —
            empowering faster, data-driven healthcare decisions.
          </motion.p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={loading ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              className="ripple-btn rounded-xl bg-cyan-500 text-white px-7 py-3.5 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-600 hover:shadow-md active:translate-y-0"
            >
              Explore VisionDx
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={loading ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
              className="rounded-xl border border-slate-300 bg-white/90 px-7 py-3.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400 hover:text-slate-900"
            >
              View Technical Brief
              <ArrowRight className="inline-block ml-2 h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </section>

      <FadeInSection className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              label="Flagship Model"
              title="VisionDx – AI-Powered Disease Prediction Engine"
              body="VisionDx is the first proprietary model developed by VisionaryIQ. It applies advanced machine learning and clinical NLP techniques to analyze structured and unstructured patient reports."
            />
            <p className="mt-6 text-slate-600 leading-relaxed">
              The system extracts key medical indicators and processes them through a trained classification
              engine to generate predictive diagnostic outcomes with a validated accuracy of 98.10%. VisionDx is
              designed to support healthcare professionals by enabling early detection and accelerating clinical
              decision-making.
            </p>
          </div>

          <motion.div
            ref={vizRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm"
          >
            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                  <Activity className="h-4 w-4" /> Medical Report
                </div>
                <div className="space-y-2 relative">
                  {terms.map((term, index) => (
                    <motion.p
                      key={term}
                      animate={{ x: scanStep > index ? 30 : 0, opacity: scanStep > index ? 0.4 : 1 }}
                      transition={{ duration: 0.3, ease: EASE, delay: index * 0.2 }}
                      className={`text-sm rounded-md px-2 py-1 ${
                        scanStep === index ? "bg-cyan-500/10 text-cyan-800" : "text-slate-500"
                      }`}
                    >
                      {term} marker detected in panel
                    </motion.p>
                  ))}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: 5, ease: EASE }}
                    className="absolute -right-1 top-1 h-4 w-[2px] bg-cyan-500"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs tracking-[0.18em] text-slate-400 uppercase mb-3">Feature Extraction Panel</p>
                <div className="space-y-2">
                  {terms.map((term, idx) => (
                    <motion.div
                      key={`${term}-chip`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, ease: EASE, delay: 0.25 + idx * 0.2 }}
                      className="inline-block mr-2 mb-1 rounded-full border border-cyan-200 bg-cyan-50 px-2 py-1 text-xs text-cyan-700"
                    >
                      {term}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: EASE }}
              className="mt-4 rounded-2xl border border-cyan-200 bg-white p-4"
            >
              <p className="text-xs tracking-[0.18em] uppercase text-slate-500">VisionDx Classification Engine</p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="rounded-xl bg-[#F8FAFC] border border-cyan-100 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Risk Probability</p>
                  <p className="text-3xl font-semibold text-cyan-600 mt-1">82%</p>
                </div>
                <div className="rounded-xl bg-[#F8FAFC] border border-indigo-100 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Confidence Score</p>
                  <Counter target={98.1} />
                </div>
              </div>
            </motion.div>

            <svg viewBox="0 0 300 70" className="mt-6 w-full">
              <motion.path
                d="M0 60 L50 52 L95 55 L140 40 L180 45 L230 28 L300 20"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            </svg>
          </motion.div>
        </div>
      </FadeInSection>

      <FadeInSection className="px-6 py-20 bg-[#F1F5F9]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Model Architecture"
            title="Clinical pipeline engineered for precision."
            body="From report intake to validated outcomes, every stage is optimized for transparency and reliability in regulated environments."
          />
          <div className="mt-12">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: EASE }}
              className="h-px bg-cyan-400 origin-left"
            />
            <div className="mt-8 grid md:grid-cols-4 gap-5">
              {architectureSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: EASE }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2 text-cyan-600">
                    <Database className="h-4 w-4" />
                    <p className="text-xs text-slate-400">0{index + 1}</p>
                  </div>
                  <p className="font-medium text-slate-800">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Capabilities"
            title="Beyond VisionDx."
            body="Custom AI systems for regulated and data-intensive industries."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {capabilities.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-md"
              >
                <p className="text-slate-800 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="px-6 py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Security & Trust"
            title="Compliance-first AI infrastructure."
            body="Built for clinical governance, auditability, and responsible model deployment."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["HIPAA Ready", "SOC 2 Type II", "ISO 27001", "GDPR"].map((badge, index) => (
              <SecurityBadge key={badge} text={badge} delay={index * 0.08} />
            ))}
          </div>
          <p className="mt-8 text-xl text-slate-800 font-medium">
            Your data is encrypted. Our models are transparent. Clinical trust is non-negotiable.
          </p>
          <div className="mt-8 flex flex-wrap gap-5 text-slate-500">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> End-to-end encryption
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Clinical audit trails
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Transparent model governance
            </div>
          </div>
        </div>
      </FadeInSection>
    </main>
  );
}
