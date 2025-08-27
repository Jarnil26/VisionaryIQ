"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import {
  Globe,
  Target,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Lightbulb,
  Zap,
  CheckCircle,
  ArrowRight,
  Trophy,
  Briefcase,
  Code,
  Database,
  Brain,
  GraduationCap,
  Rocket,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VisionaryIQWebsite() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call - replace with your actual endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 opacity-60"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px)`,
          }}
        />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-200 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  VisionaryIQ
                </span>
                <p className="text-sm text-gray-600 -mt-1">
                  Where Vision Meets Intelligence
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#achievements"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                Journey
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#projects"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#founder"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                Founder
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div
          className="max-w-7xl mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 animate-pulse hover:animate-none transition-all duration-300 transform hover:scale-105">
              <Rocket className="w-4 h-4 mr-2" />
              Innovative AI Startup
            </Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VisionaryIQ
              </span>
            </h2>
            <p className="text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold mb-8 animate-fade-in-up animation-delay-200">
              Where Vision Meets Intelligence
            </p>
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              A pioneering solo-founded tech startup specializing in AI-powered
              platforms and interactive dashboards. Combining cutting-edge
              Python backend processing with modern MERN stack technology to
              deliver innovative business intelligence solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 transform group-hover:scale-110 transition-transform duration-300">
                3+
              </div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 transform group-hover:scale-110 transition-transform duration-300">
                1+
              </div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2 transform group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <div className="text-gray-600">Year of Innovation</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 transform group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-600">Dedication</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About VisionaryIQ
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A solo-founded startup with a vision to democratize AI technology
              for businesses worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                My Story
              </h3>
              <p className="text-gray-600 leading-relaxed">
                VisionaryIQ was born from a passion for artificial intelligence
                and a vision to make advanced AI technology accessible to
                businesses of all sizes. As a solo entrepreneur, I recognized
                the gap between complex AI research and practical business
                applications.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Starting with a deep background in computer science and machine
                learning, I embarked on this journey to create intuitive,
                powerful AI solutions that can transform how businesses operate
                and make decisions. Every line of code, every algorithm, and
                every user interface is crafted with precision and purpose.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <CheckCircle className="w-5 h-5 text-green-500 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700">
                    Solo-Founded with Clear Vision
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <CheckCircle className="w-5 h-5 text-green-500 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700">
                    Cutting-Edge Technology Stack
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <CheckCircle className="w-5 h-5 text-green-500 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700">Client-First Approach</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-300">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-gray-900">My Mission</CardTitle>
                  <CardDescription className="text-gray-600">
                    To democratize artificial intelligence by creating
                    intuitive, powerful, and scalable AI solutions that empower
                    businesses to make smarter decisions and achieve
                    unprecedented growth.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/50 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-300">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-gray-900">My Vision</CardTitle>
                  <CardDescription className="text-gray-600">
                    To build VisionaryIQ into a globally recognized AI company
                    that sets new standards for innovation, reliability, and
                    user experience in the artificial intelligence industry.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Journey/Achievements Section */}
      <section
        id="achievements"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Journey & Achievements
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones and achievements in building VisionaryIQ from the
              ground up
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600 transform hover:scale-105 group">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-500 transform group-hover:rotate-12 transition-transform duration-300" />
                  <Badge className="bg-blue-100 text-blue-800">2025</Badge>
                </div>
                <CardTitle className="text-gray-900">
                  Computer Science Degree
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Currently pursuing a Bachelor’s degree in Computer Science, in
                  Semester 5, with a focus on Machine Learning and Artificial
                  Intelligence. Building a strong foundation in algorithms, data
                  structures, and AI methodologies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-600 transform hover:scale-105 group">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <Rocket className="w-8 h-8 text-green-500 transform group-hover:rotate-12 transition-transform duration-300" />
                  <Badge className="bg-green-100 text-green-800">2025</Badge>
                </div>
                <CardTitle className="text-gray-900">
                  VisionaryIQ Founded
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Officially launched VisionaryIQ as a solo startup with the
                  mission to revolutionize business intelligence through
                  accessible AI technology and innovative dashboard solutions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-600 transform hover:scale-105 group">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <Code className="w-8 h-8 text-purple-500 transform group-hover:rotate-12 transition-transform duration-300" />
                  <Badge className="bg-purple-100 text-purple-800">2025</Badge>
                </div>
                <CardTitle className="text-gray-900">
                  First AI Platform
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Successfully developed and deployed the first AI-powered
                  analytics platform using Python and achieving 95%+ accuracy in
                  predictive modeling.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-600 transform hover:scale-105 group">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <Trophy className="w-8 h-8 text-orange-500 transform group-hover:rotate-12 transition-transform duration-300" />
                  <Badge className="bg-orange-100 text-orange-800">2025</Badge>
                </div>
                <CardTitle className="text-gray-900">
                  First Client Success
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Delivered first successful AI implementation for a local
                  business, resulting in 40% improvement in their
                  decision-making process and 25% increase in operational
                  efficiency.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-cyan-600 transform hover:scale-105 group">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen className="w-8 h-8 text-cyan-500 transform group-hover:rotate-12 transition-transform duration-300" />
                  <Badge className="bg-cyan-100 text-cyan-800">2025</Badge>
                </div>
                <CardTitle className="text-gray-900">
                  AI Certifications
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Completed certification in Exploratory Data Analysis for
                  Machine Learning, authorized by IBM and offered through
                  Coursera, to enhance practical skills in data exploration and
                  preprocessing for AI projects.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-pink-600 transform hover:scale-105 group">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-pink-500 transform group-hover:rotate-12 transition-transform duration-300" />
                  <Badge className="bg-pink-100 text-pink-800">2025</Badge>
                </div>
                <CardTitle className="text-gray-900">
                  Growing Portfolio
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Built a diverse portfolio of AI projects including predictive
                  analytics, process automation, and interactive dashboards,
                  serving clients across different industries.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI solutions designed and developed with precision
              and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50 transform hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-3">
                  AI Platform Development
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Custom AI-powered platforms built with Python backend and MERN
                  stack frontend, designed to process complex data and deliver
                  actionable insights in real-time with intuitive user
                  interfaces.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/50 transform hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-3">
                  Predictive Analytics
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Advanced machine learning models that analyze historical data
                  patterns to predict future trends, helping businesses make
                  proactive decisions with confidence and precision.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg bg-gradient-to-br from-white to-green-50/50 transform hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-3">
                  Process Automation
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Intelligent automation solutions that streamline repetitive
                  tasks, reduce human error, and increase operational efficiency
                  through smart workflow optimization and AI-driven decision
                  making.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/50 transform hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-3">
                  Interactive Dashboards
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Beautiful, responsive dashboards that transform raw data into
                  meaningful insights with real-time visualization, custom
                  charts, and user-friendly interfaces for all skill levels.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50/50 transform hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-3">
                  Custom Development
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Bespoke software solutions tailored to your specific business
                  requirements, leveraging cutting-edge technologies and
                  following industry best practices for scalability and
                  performance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg bg-gradient-to-br from-white to-teal-50/50 transform hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-3">
                  AI Consulting
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Strategic consulting services to help businesses identify AI
                  opportunities, develop implementation roadmaps, and maximize
                  return on AI investments with personalized guidance and
                  expertise.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-purple-50/20 to-blue-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">

              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Projects
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A showcase of innovative platforms developed under VisionaryIQ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Project 1: BugSmasher AI */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="relative group overflow-hidden rounded-2xl shadow-lg border-0 bg-white/70 backdrop-blur-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-cyan-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition">
                    🐞 BugSmasher AI
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    Next.js-based AI platform that generates code from natural
                    language and <strong>auto-fixes runtime errors</strong> with
                    an iterative debugging loop.
                  </CardDescription>
                  <a
                    href="https://visionsmasher.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-purple-600 font-medium transition-colors group-hover:underline"
                  >
                    Visit Project →
                  </a>
                </CardHeader>
                <CardContent className="relative z-10 text-gray-600 leading-relaxed space-y-2">
                  <p>✨ AI-powered code generation</p>
                  <p>🛠️ Auto error solving & debugging loop</p>
                  <p>📜 Code version history & sandbox execution</p>
                  <p>🌍 Multi-language support (Python, JS, Java)</p>
                  <p>🔑 User authentication & admin dashboard</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project 2: SafeHer */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="relative group overflow-hidden rounded-2xl shadow-lg border-0 bg-white/70 backdrop-blur-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-purple-100/30 to-indigo-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition">
                    🛡️ SafeHer
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    A women safety platform with{" "}
                    <strong>SOS alerts, safe route navigation</strong>, and
                    role-based dashboards for users and volunteers.
                  </CardDescription>
                  <a
                    href="https://safehernow.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-pink-600 hover:text-purple-600 font-medium transition-colors group-hover:underline"
                  >
                    Visit Project →
                  </a>
                </CardHeader>
                <CardContent className="relative z-10 text-gray-600 leading-relaxed space-y-2">
                  <p>🗺️ Safe route navigation (OSM + danger zones)</p>
                  <p>🚨 SOS button with real-time volunteer alerts</p>
                  <p>📢 Volunteer notification center</p>
                  <p>⚖️ Reporting & blocking system</p>
                  <p>🔐 Secure role-based access (User/Volunteer)</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Meet the Founder
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The visionary behind VisionaryIQ's innovative AI solutions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader className="pb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-xl">
                  <img
                    src="/founder.jpg" 
                    alt="Jarnil Patel"
                    className="w-40 h-40 object-cover rounded-full mx-auto shadow-lg"
                  />
                </div>
                <CardTitle className="text-3xl text-gray-900 mb-2">
                  Jarnil Patel
                </CardTitle>
                <CardDescription className="text-blue-600 font-semibold text-lg mb-6">
                  Founder & CEO, VisionaryIQ
                </CardDescription>
                <CardDescription className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                  A passionate technologist and AI enthusiast with a strong
                  background in computer science and machine learning. Dedicated
                  to democratizing artificial intelligence and making advanced
                  AI technology accessible to businesses of all sizes. With
                  expertise in Python, MERN stack, and cutting-edge AI
                  frameworks, I'm committed to delivering innovative solutions
                  that drive real business value.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Education
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Computer Engineering Degree
                    </p>
                    <p className="text-gray-600 text-sm">
                      AI/ML Specialization
                    </p>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Expertise
                    </h4>
                    <p className="text-gray-600 text-sm">Python, JavaScript</p>
                    <p className="text-gray-600 text-sm">AI/ML, MERN Stack</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Mission
                    </h4>
                    <p className="text-gray-600 text-sm">Democratize AI</p>
                    <p className="text-gray-600 text-sm">Empower Businesses</p>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://www.linkedin.com/in/jarnil-patel-7975ab347/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="transform hover:scale-105 transition-all duration-300"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
      {/* Contact Section */}
      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Let’s{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Reach me easily through these ways
            </p>
          </div>

          <div className="relative w-3/4 mx-auto">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 transform -translate-x-1/2"></div>

            <div className="space-y-12">
              {/* Email - Left */}
              <div className="relative flex items-center w-full">
                <div className="w-1/2 pr-6 flex justify-end">
                  <div className="bg-white/70 backdrop-blur-lg p-4 rounded-lg shadow-md w-64 text-right group hover:shadow-lg transition">
                    <div className="flex justify-end items-center space-x-3">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          Email
                        </h4>
                        <p className="text-gray-600 text-sm">
                          jarnil.visionaryiq@gmail.com
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>

              {/* Phone - Right */}
              <div className="relative flex items-center w-full">
                <div className="w-1/2"></div>
                <div className="w-1/2 pl-6 flex justify-start">
                  <div className="bg-white/70 backdrop-blur-lg p-4 rounded-lg shadow-md w-64 text-left group hover:shadow-lg transition">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          Phone
                        </h4>
                        <p className="text-gray-600 text-sm">+91 9574357983</p>
                        <p className="text-gray-500 text-xs">
                          Mon–Fri, 6AM–12AM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location - Left */}
              <div className="relative flex items-center w-full">
                <div className="w-1/2 pr-6 flex justify-end">
                  <div className="bg-white/70 backdrop-blur-lg p-4 rounded-lg shadow-md w-64 text-right group hover:shadow-lg transition">
                    <div className="flex justify-end items-center space-x-3">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          Location
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Remote-First Startup
                        </p>
                        <p className="text-gray-500 text-xs">
                          Serving Clients Globally
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>

              {/* Response Time - Right */}
              <div className="relative flex items-center w-full">
                <div className="w-1/2"></div>
                <div className="w-1/2 pl-6 flex justify-start">
                  <div className="bg-white/70 backdrop-blur-lg p-4 rounded-lg shadow-md w-64 text-left group hover:shadow-lg transition">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          Response Time
                        </h4>
                        <p className="text-gray-600 text-sm">Within 24 hours</p>
                        <p className="text-gray-500 text-xs">
                          Free consultation available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4 group">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    VisionaryIQ
                  </span>
                  <p className="text-sm text-gray-400 -mt-1">
                    Where Vision Meets Intelligence
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                A solo-founded AI startup dedicated to democratizing artificial
                intelligence and empowering businesses with innovative,
                accessible AI solutions.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/jarnil-patel-7975ab347/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-110">
                    <span className="text-sm font-bold">Li</span>
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/jarnil2610"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-110">
                    <span className="text-sm font-bold">In</span>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors block transform hover:translate-x-2 duration-300"
                >
                  About
                </a>
                <a
                  href="#achievements"
                  className="text-gray-400 hover:text-white transition-colors block transform hover:translate-x-2 duration-300"
                >
                  My Journey
                </a>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition-colors block transform hover:translate-x-2 duration-300"
                >
                  Services
                </a>
                <a
                  href="#projects"
                  className="text-gray-400 hover:text-white transition-colors block transform hover:translate-x-2 duration-300"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors block transform hover:translate-x-2 duration-300"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 VisionaryIQ. All rights reserved. | Built with passion
              for AI innovation
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}
