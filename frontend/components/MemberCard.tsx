import { Mail, Building, User } from 'lucide-react';
import { Member } from '@/lib/api';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const getRoleColor = (role: string) => {
    const colors = {
      faculty: 'bg-blue-100 text-blue-800',
      student: 'bg-green-100 text-green-800',
      alumni: 'bg-purple-100 text-purple-800',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'faculty':
        return '👨‍🏫';
      case 'student':
        return '👨‍🎓';
      case 'alumni':
        return '🎓';
      default:
        return '👤';
    }
  };

  return (
    <div className="card p-6 text-center">
      <div className="mb-4">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-200"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 flex items-center justify-center text-2xl">
            {getRoleIcon(member.role)}
          </div>
        )}
      </div>

      <div className="mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
          <User className="w-3 h-3 mr-1" />
          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {member.name}
      </h3>

      <p className="text-primary-600 font-medium mb-3">
        {member.designation}
      </p>

      {member.department && (
        <div className="flex items-center justify-center text-sm text-gray-500 mb-3">
          <Building className="w-4 h-4 mr-2" />
          {member.department}
        </div>
      )}

      {member.bio && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {member.bio}
        </p>
      )}

      <div className="flex justify-center">
        <a
          href={`mailto:${member.email}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          <Mail className="w-4 h-4 mr-1" />
          Contact
        </a>
      </div>
    </div>
  );
};

export default MemberCard; 