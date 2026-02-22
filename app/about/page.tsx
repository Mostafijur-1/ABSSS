import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Eye, History, Award, Users, BookOpen } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <section className="hero-gradient">
        <div className="container-max section-padding relative z-10 text-center">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            About ABSSS
          </h1>
          <p className="mx-auto max-w-3xl text-base text-primary-100 sm:text-lg">
            Al Biruni Society of Scientific Studies is a university-based organization 
            dedicated to advancing scientific research and fostering academic excellence.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#03045e]">
        <div className="container-max">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-8">
              <div className="mb-6 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0077b6]/25">
                  <Target className="h-6 w-6 text-[#caf0f8]" />
                </div>
                <h2 className="text-2xl font-bold text-[#caf0f8]">Our Mission</h2>
              </div>
              <p className="mb-4 leading-relaxed text-[#90e0ef]">
                To promote scientific research, innovation, and collaboration among university students 
                and faculty members. We strive to create an environment that encourages intellectual 
                curiosity and supports the development of cutting-edge research projects.
              </p>
              <p className="leading-relaxed text-[#90e0ef]">
                Through our various programs and initiatives, we aim to bridge the gap between 
                theoretical knowledge and practical application, preparing the next generation 
                of scientists and researchers.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-8">
              <div className="mb-6 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00b4d8]/25">
                  <Eye className="h-6 w-6 text-[#caf0f8]" />
                </div>
                <h2 className="text-2xl font-bold text-[#caf0f8]">Our Vision</h2>
              </div>
              <p className="mb-4 leading-relaxed text-[#90e0ef]">
                To become a leading scientific society that fosters innovation, promotes 
                interdisciplinary research, and contributes significantly to the advancement 
                of scientific knowledge and technological development.
              </p>
              <p className="leading-relaxed text-[#90e0ef]">
                We envision a future where our members are at the forefront of scientific 
                discoveries, making meaningful contributions to society through their research 
                and innovations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#023e8a]">
        <div className="container-max">
          <div className="mb-16 text-center">
            <div className="mb-6 flex items-center justify-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00b4d8]/25">
                <History className="h-6 w-6 text-[#caf0f8]" />
              </div>
              <h2 className="text-3xl font-bold text-[#caf0f8]">Our History</h2>
            </div>
            <p className="mx-auto max-w-3xl text-xl text-[#90e0ef]">
              Founded in 2019, ABSSS has grown from a small group of passionate students 
              to a thriving community of researchers and innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0077b6] text-2xl font-bold text-[#e0f7ff]">
                2019
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#f9fbff]">Foundation</h3>
              <p className="text-[#caf0f8]">
                ABSSS was established by a group of science students with a vision to 
                promote research and collaboration.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0096c7] text-2xl font-bold text-[#e0f7ff]">
                2021
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#f9fbff]">Expansion</h3>
              <p className="text-[#caf0f8]">
                The society expanded to include faculty members and launched its first 
                annual scientific conference.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00b4d8] text-2xl font-bold text-[#00121f]">
                2024
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#f9fbff]">Growth</h3>
              <p className="text-[#caf0f8]">
                Today, ABSSS has over 50 active members and has published numerous 
                research papers and articles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#03045e]">
        <div className="container-max">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#caf0f8]">Our Values</h2>
            <p className="mx-auto max-w-3xl text-xl text-[#90e0ef]">
              The principles that guide our work and shape our community
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0077b6]/25">
                <Award className="h-8 w-8 text-[#caf0f8]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">Excellence</h3>
              <p className="text-[#90e0ef]">
                We strive for excellence in all our research and academic endeavors.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00b4d8]/25">
                <Users className="h-8 w-8 text-[#caf0f8]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">Collaboration</h3>
              <p className="text-[#90e0ef]">
                We believe in the power of teamwork and interdisciplinary collaboration.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0096c7]/25">
                <BookOpen className="h-8 w-8 text-[#caf0f8]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">Innovation</h3>
              <p className="text-[#90e0ef]">
                We encourage creative thinking and innovative approaches to research.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#48cae4]/25">
                <Target className="h-8 h-8 text-[#caf0f8]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#f9fbff]">Integrity</h3>
              <p className="text-[#90e0ef]">
                We maintain the highest standards of academic and research integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#023e8a]">
        <div className="container-max">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#caf0f8]">Leadership Team</h2>
            <p className="mx-auto max-w-3xl text-xl text-[#90e0ef]">
              Meet the dedicated individuals who guide our society's mission and vision
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#0077b6]/25 text-2xl">
                👨‍🏫
              </div>
              <h3 className="mb-1 text-xl font-semibold text-[#f9fbff]">Dr. Sarah Ahmed</h3>
              <p className="mb-3 font-medium text-[#90e0ef]">Faculty Advisor</p>
              <p className="text-sm text-[#caf0f8]">
                Leading researcher in quantum computing with over 15 years of experience.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#00b4d8]/25 text-2xl">
                👨‍🎓
              </div>
              <h3 className="mb-1 text-xl font-semibold text-[#f9fbff]">Ahmed Hassan</h3>
              <p className="mb-3 font-medium text-[#90e0ef]">President</p>
              <p className="text-sm text-[#caf0f8]">
                Final year computer science student passionate about AI and machine learning.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#48cae4]/25 text-2xl">
                👩‍🎓
              </div>
              <h3 className="mb-1 text-xl font-semibold text-[#f9fbff]">Mariam Ali</h3>
              <p className="mb-3 font-medium text-[#90e0ef]">Vice President</p>
              <p className="text-sm text-[#caf0f8]">
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
