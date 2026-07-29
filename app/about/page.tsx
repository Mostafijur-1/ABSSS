import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Eye, History, Award, Users, BookOpen, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="h-4 w-4 text-primary-200" />
              <span className="text-sm text-primary-100 font-medium">Our Story</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">About ABSSS</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Al Biruni Society of Scientific Studies is a university-based organization dedicated to advancing scientific research, fostering collaboration, and inspiring the next generation of innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="card p-8 hover:border-primary-200 group">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-14 h-14 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                To promote scientific research, innovation, and collaboration among university students and faculty members.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We strive to create an environment that encourages intellectual curiosity, supports cutting-edge research projects, and bridges the gap between theoretical knowledge and practical application.
              </p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"></div>
            </div>

            {/* Vision */}
            <div className="card p-8 hover:border-primary-200 group">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-14 h-14 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Eye className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                To become a leading scientific society that fosters innovation and interdisciplinary research.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where our members are at the forefront of scientific discoveries, making meaningful contributions to society through groundbreaking research and innovation.
              </p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <History className="w-6 h-6 text-primary-600" />
              <span className="text-sm font-bold text-primary-600">OUR JOURNEY</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our History</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From a small group of passionate students to a thriving community of researchers and innovators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center group hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold group-hover:scale-110 transition-transform">
                2019
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Foundation</h3>
              <p className="text-gray-600 leading-relaxed">
                ABSSS was established by a group of visionary science students with a shared passion for promoting research and fostering scientific collaboration.
              </p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full mx-auto"></div>
            </div>

            <div className="card p-8 text-center group hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold group-hover:scale-110 transition-transform">
                2021
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Expansion</h3>
              <p className="text-gray-600 leading-relaxed">
                Expanded our community to include faculty members and launched our first annual scientific conference, establishing ABSSS as a recognized academic organization.
              </p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full mx-auto"></div>
            </div>

            <div className="card p-8 text-center group hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold group-hover:scale-110 transition-transform">
                2024
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Today, ABSSS has over 50 active members and has published numerous research papers, becoming a hub for scientific excellence.
              </p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and shape our scientific community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-8 text-center group hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We strive for excellence in all our research and academic endeavors.
              </p>
            </div>

            <div className="card p-8 text-center group hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in the power of teamwork and interdisciplinary collaboration.
              </p>
            </div>

            <div className="card p-8 text-center group hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We encourage creative thinking and innovative approaches to research.
              </p>
            </div>

            <div className="card p-8 text-center group hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards of academic and research integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold text-primary-600 mb-3">50+</div>
              <p className="text-gray-700 font-medium text-lg">Active Members</p>
              <p className="text-gray-600 text-sm mt-2">Dedicated researchers and innovators</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-primary-600 mb-3">25+</div>
              <p className="text-gray-700 font-medium text-lg">Publications</p>
              <p className="text-gray-600 text-sm mt-2">Research papers published</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-primary-600 mb-3">30+</div>
              <p className="text-gray-700 font-medium text-lg">Events Hosted</p>
              <p className="text-gray-600 text-sm mt-2">Conferences and workshops</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-primary-600 mb-3">5+</div>
              <p className="text-gray-700 font-medium text-lg">Years Active</p>
              <p className="text-gray-600 text-sm mt-2">Continuous growth</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
