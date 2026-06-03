
"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MemberCard from '@/components/MemberCard';
import { membersApi } from '@/lib/api';
import { Users, Filter } from 'lucide-react';

export default function MembersPage() {
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await membersApi.getAll();
        setAllMembers(data);
      } catch (error) {
        setAllMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const facultyMembers = allMembers.filter(member => member.role === 'faculty');
  const studentMembers = allMembers.filter(member => member.role === 'student');
  const alumniMembers = allMembers.filter(member => member.role === 'alumni');

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <section className="hero-gradient">
        <div className="container-max section-padding relative z-10 text-center">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Our Members
          </h1>
          <p className="mx-auto max-w-3xl text-base text-primary-100 sm:text-lg">
            Meet our diverse community of faculty advisors, researchers, students, and alumni 
            who contribute to advancing scientific knowledge and innovation.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-950">
        <div className="container-max">
          <div className="mb-8 flex items-center">
            <Users className="mr-3 h-8 w-8 text-sky-400" />
            <h2 className="text-3xl font-semibold text-white">Faculty Advisors</h2>
          </div>
          {loading ? (
            <div className="py-12 text-center text-gray-300">Loading members...</div>
          ) : facultyMembers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {facultyMembers.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-200">
              <Users className="mx-auto mb-4 h-16 w-16 text-gray-500" />
              <h3 className="mb-2 text-xl font-semibold text-white">No Faculty Members</h3>
              <p className="text-gray-300">
                Faculty member profiles will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-slate-950">
        <div className="container-max">
          <div className="mb-8 flex items-center">
            <Filter className="mr-3 h-8 w-8 text-sky-400" />
            <h2 className="text-3xl font-semibold text-white">Student Members</h2>
          </div>
          {loading ? (
            <div className="py-12 text-center text-gray-300">Loading members...</div>
          ) : studentMembers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {studentMembers.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-200">
              <Filter className="mx-auto mb-4 h-16 w-16 text-gray-500" />
              <h3 className="mb-2 text-xl font-semibold text-white">No Student Members</h3>
              <p className="text-gray-300">
                Student member profiles will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {alumniMembers.length > 0 && (
        <section className="section-padding bg-gray-950">
          <div className="container-max">
            <div className="mb-8 flex items-center">
              <Users className="mr-3 h-8 w-8 text-sky-400" />
              <h2 className="text-3xl font-semibold text-white">Alumni Members</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {alumniMembers.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-slate-950">
        <div className="container-max">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-white">Membership Statistics</h2>
            <p className="mx-auto max-w-3xl text-base text-gray-300">
              Our growing community of scientists and researchers
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50">
              <div className="mb-2 text-3xl font-bold text-sky-300">
                {allMembers.length}
              </div>
              <div className="text-gray-300">Total Members</div>
            </div>
            <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50">
              <div className="mb-2 text-3xl font-bold text-sky-300">
                {facultyMembers.length}
              </div>
              <div className="text-gray-300">Faculty Advisors</div>
            </div>
            <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50">
              <div className="mb-2 text-3xl font-bold text-sky-300">
                {studentMembers.length}
              </div>
              <div className="text-gray-300">Student Members</div>
            </div>
            <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50">
              <div className="mb-2 text-3xl font-bold text-sky-300">
                {alumniMembers.length}
              </div>
              <div className="text-gray-300">Alumni Members</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-950">
        <div className="container-max">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-white">Join Our Community</h2>
            <p className="mx-auto max-w-3xl text-base text-gray-300">
              Become part of our scientific society and contribute to advancing research and innovation
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/15 text-2xl">
                <span>🎓</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">For Students</h3>
              <p className="mb-4 text-sm text-gray-300">
                Join as a student member to participate in research projects, attend events, and network with peers.
              </p>
              <a href="/contact" className="btn-primary text-sm">
                Apply Now
              </a>
            </div>
            <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/15 text-2xl">
                <span>👨‍🏫</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">For Faculty</h3>
              <p className="mb-4 text-sm text-gray-300">
                Become a faculty advisor to mentor students and contribute to our research initiatives.
              </p>
              <a href="/contact" className="btn-primary text-sm">
                Contact Us
              </a>
            </div>
            <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/15 text-2xl">
                <span>🤝</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Collaborations</h3>
              <p className="mb-4 text-sm text-gray-300">
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
