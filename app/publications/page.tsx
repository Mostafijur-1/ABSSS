import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PublicationCard from '@/components/PublicationCard';
import { publicationsApi } from '@/lib/api';
import { FileText, Search } from 'lucide-react';

export default async function PublicationsPage() {
  // Fetch all publications
  const publications = await publicationsApi.getAll().catch(() => []);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding text-center">
          <h1 className="text-5xl font-bold mb-6">Publications</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Explore our collection of research papers, scientific articles, and publications 
            from our members and collaborators.
          </p>
        </div>
      </section>

      {/* Publications List */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-primary-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">All Publications</h2>
            </div>
            <div className="text-sm text-gray-600">
              {publications.length} publication{publications.length !== 1 ? 's' : ''}
            </div>
          </div>

          {publications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publications.map((publication) => (
                <PublicationCard key={publication._id} publication={publication} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Publications Yet</h3>
              <p className="text-gray-600">
                Our publications will appear here once they are published.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Publication Categories */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Publication Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We publish various types of scientific content to share knowledge and research findings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Papers</h3>
              <p className="text-gray-600 text-sm">
                Original research findings and experimental results from our members
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Articles</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive reviews of current research and literature in various fields
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Studies</h3>
              <p className="text-gray-600 text-sm">
                Detailed analysis of specific research projects and their outcomes
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Blog Posts</h3>
              <p className="text-gray-600 text-sm">
                Informative articles on scientific topics and research insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Guidelines */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Submission Guidelines</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interested in publishing with us? Here's what you need to know
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare Your Manuscript</h3>
              <p className="text-gray-600 text-sm">
                Ensure your research paper follows our formatting guidelines and includes all required sections.
              </p>
            </div>

            <div className="card p-6">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit for Review</h3>
              <p className="text-gray-600 text-sm">
                Submit your manuscript through our review process. We'll provide feedback and suggestions.
              </p>
            </div>

            <div className="card p-6">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Publication</h3>
              <p className="text-gray-600 text-sm">
                Once approved, your work will be published in our journal and shared with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to Publish with Us?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Have research to share? We welcome submissions from students, faculty, and researchers.
          </p>
          <a href="/contact" className="btn-secondary">
            Submit Your Work
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
} 