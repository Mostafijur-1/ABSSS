import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MemberCard from '@/components/MemberCard';
import { membersApi } from '@/lib/api';
import { Users, Filter } from 'lucide-react';

export default async function MembersPage() {
  // Fetch all members
  const allMembers = await membersApi.getAll().catch(() => []);
  
  // Separate members by role
  const facultyMembers = allMembers.filter(member => member.role === 'faculty');
  const studentMembers = allMembers.filter(member => member.role === 'student');
  const alumniMembers = allMembers.filter(member => member.role === 'alumni');

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding text-center">
          <h1 className="text-5xl font-bold mb-6">Our Members</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Meet our diverse community of faculty advisors, researchers, students, and alumni 
            who contribute to advancing scientific knowledge and innovation.
          </p>
        </div>
      </section>

      {/* Faculty Members */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex items-center mb-8">
            <Users className="w-8 h-8 text-primary-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Faculty Advisors</h2>
          </div>

          {facultyMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facultyMembers.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Faculty Members</h3>
              <p className="text-gray-600">
                Faculty member profiles will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Student Members */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="flex items-center mb-8">
            <Filter className="w-8 h-8 text-primary-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Student Members</h2>
          </div>

          {studentMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studentMembers.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Student Members</h3>
              <p className="text-gray-600">
                Student member profiles will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Alumni Members */}
      {alumniMembers.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="flex items-center mb-8">
              <Users className="w-8 h-8 text-primary-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Alumni Members</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {alumniMembers.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Membership Stats */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Membership Statistics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our growing community of scientists and researchers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {allMembers.length}
              </div>
              <div className="text-gray-600">Total Members</div>
            </div>

            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {facultyMembers.length}
              </div>
              <div className="text-gray-600">Faculty Advisors</div>
            </div>

            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {studentMembers.length}
              </div>
              <div className="text-gray-600">Student Members</div>
            </div>

            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {alumniMembers.length}
              </div>
              <div className="text-gray-600">Alumni Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Become part of our scientific society and contribute to advancing research and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Students</h3>
              <p className="text-gray-600 text-sm mb-4">
                Join as a student member to participate in research projects, attend events, and network with peers.
              </p>
              <a href="/contact" className="btn-primary text-sm">
                Apply Now
              </a>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Faculty</h3>
              <p className="text-gray-600 text-sm mb-4">
                Become a faculty advisor to mentor students and contribute to our research initiatives.
              </p>
              <a href="/contact" className="btn-primary text-sm">
                Contact Us
              </a>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaborations</h3>
              <p className="text-gray-600 text-sm mb-4">
                Partner with us on research projects, events, or publications.
              </p>
              <a href="/contact" className="btn-primary text-sm">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 