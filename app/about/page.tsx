import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Eye, History, Award, Users, BookOpen } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding text-center">
          <h1 className="text-5xl font-bold mb-6">About ABSSS</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Al Biruni Society of Scientific Studies is a university-based organization 
            dedicated to advancing scientific research and fostering academic excellence.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="card p-8">
              <div className="flex items-center mb-6">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                To promote scientific research, innovation, and collaboration among university students 
                and faculty members. We strive to create an environment that encourages intellectual 
                curiosity and supports the development of cutting-edge research projects.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through our various programs and initiatives, we aim to bridge the gap between 
                theoretical knowledge and practical application, preparing the next generation 
                of scientists and researchers.
              </p>
            </div>

            {/* Vision */}
            <div className="card p-8">
              <div className="flex items-center mb-6">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                To become a leading scientific society that fosters innovation, promotes 
                interdisciplinary research, and contributes significantly to the advancement 
                of scientific knowledge and technological development.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where our members are at the forefront of scientific 
                discoveries, making meaningful contributions to society through their research 
                and innovations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <History className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our History</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded in 2019, ABSSS has grown from a small group of passionate students 
              to a thriving community of researchers and innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2019
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Foundation</h3>
              <p className="text-gray-600">
                ABSSS was established by a group of science students with a vision to 
                promote research and collaboration.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2021
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expansion</h3>
              <p className="text-gray-600">
                The society expanded to include faculty members and launched its first 
                annual scientific conference.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2024
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-600">
                Today, ABSSS has over 50 active members and has published numerous 
                research papers and articles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and shape our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in all our research and academic endeavors.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of teamwork and interdisciplinary collaboration.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We encourage creative thinking and innovative approaches to research.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600">
                We maintain the highest standards of academic and research integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated individuals who guide our society's mission and vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Dr. Sarah Ahmed</h3>
              <p className="text-primary-600 font-medium mb-3">Faculty Advisor</p>
              <p className="text-gray-600 text-sm">
                Leading researcher in quantum computing with over 15 years of experience.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                👨‍🎓
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Ahmed Hassan</h3>
              <p className="text-primary-600 font-medium mb-3">President</p>
              <p className="text-gray-600 text-sm">
                Final year computer science student passionate about AI and machine learning.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                👩‍🎓
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Mariam Ali</h3>
              <p className="text-primary-600 font-medium mb-3">Vice President</p>
              <p className="text-gray-600 text-sm">
                Environmental science major focused on sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 