'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { contactApi } from '@/lib/api';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await contactApi.submit(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <section className="hero-gradient">
        <div className="container-max section-padding relative z-10 text-center">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto max-w-3xl text-base text-primary-100 sm:text-lg">
            Get in touch with us for any questions, collaborations, or to join our scientific society. 
            We'd love to hear from you!
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#03045e]">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#caf0f8]">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 rounded-lg border border-emerald-400/40 bg-emerald-500/15 p-4">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-emerald-300" />
                    <span className="text-sm text-emerald-100">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 rounded-lg border border-rose-400/40 bg-rose-500/10 p-4">
                  <span className="text-sm text-rose-100">Failed to send message. Please try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#e0f7ff]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-600/70 bg-slate-950/70 px-4 py-2 text-sm text-[#e0f7ff] placeholder:text-slate-400 focus:border-[#00b4d8] focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/70"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#e0f7ff]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-600/70 bg-slate-950/70 px-4 py-2 text-sm text-[#e0f7ff] placeholder:text-slate-400 focus:border-[#00b4d8] focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/70"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[#e0f7ff]">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-600/70 bg-slate-950/70 px-4 py-2 text-sm text-[#e0f7ff] placeholder:text-slate-400 focus:border-[#00b4d8] focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/70"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#e0f7ff]">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-lg border border-slate-600/70 bg-slate-950/70 px-4 py-2 text-sm text-[#e0f7ff] placeholder:text-slate-400 focus:border-[#00b4d8] focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/70"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#caf0f8]">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0077b6]/25">
                    <MapPin className="h-6 w-6 text-[#caf0f8]" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">Visit Us</h3>
                    <p className="text-sm text-[#90e0ef]">
                      University Campus<br />
                      Science Building, Room 205<br />
                      City, State 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00b4d8]/25">
                    <Mail className="h-6 w-6 text-[#caf0f8]" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">Email Us</h3>
                    <p className="text-sm text-[#90e0ef]">
                      <a href="mailto:info@absss.edu" className="text-[#ade8f4] hover:text-[#fdfdfd]">
                        info@absss.edu
                      </a>
                    </p>
                    <p className="text-sm text-[#90e0ef]">
                      <a href="mailto:president@absss.edu" className="text-[#ade8f4] hover:text-[#fdfdfd]">
                        president@absss.edu
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#48cae4]/25">
                    <Phone className="h-6 w-6 text-[#caf0f8]" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">Call Us</h3>
                    <p className="text-sm text-[#90e0ef]">
                      <a href="tel:+1234567890" className="text-[#ade8f4] hover:text-[#fdfdfd]">
                        +1 (234) 567-890
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border border-white/10 bg-[#020b2a]/80 p-6">
                <h3 className="mb-4 text-lg font-semibold text-[#caf0f8]">Office Hours</h3>
                <div className="space-y-2 text-sm text-[#90e0ef]">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#023e8a]">
        <div className="container-max">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#caf0f8]">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-3xl text-xl text-[#90e0ef]">
              Find answers to common questions about joining ABSSS and our activities
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6">
              <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">How can I join ABSSS?</h3>
              <p className="text-sm text-[#90e0ef]">
                Students can apply for membership by filling out our application form and attending an orientation session. 
                Faculty members can contact us directly for collaboration opportunities.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6">
              <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">What events do you organize?</h3>
              <p className="text-sm text-[#90e0ef]">
                We host conferences, workshops, seminars, lectures, and science competitions throughout the year. 
                Check our events page for upcoming activities.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6">
              <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">Can I publish my research with you?</h3>
              <p className="text-sm text-[#90e0ef]">
                Yes! We welcome research submissions from students and faculty. Our publications include research papers, 
                review articles, case studies, and blog posts.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6">
              <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">Do you offer research funding?</h3>
              <p className="text-sm text-[#90e0ef]">
                We provide limited funding for student research projects and conference attendance. 
                Contact us for more information about funding opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
