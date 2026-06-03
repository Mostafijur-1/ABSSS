import { Mail, Building, User } from 'lucide-react';
import { Member } from '@/lib/api';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const getRoleColor = (role: string) => {
    const colors = {
      faculty: 'border border-sky-400/40 bg-sky-500/15 text-sky-100',
      student: 'border border-emerald-400/40 bg-emerald-500/15 text-emerald-100',
      alumni: 'border border-violet-400/40 bg-violet-500/15 text-violet-100',
    };
    return colors[role as keyof typeof colors] || 'border border-slate-400/40 bg-slate-500/15 text-slate-100';
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
    <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50 transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
      <div className="mb-4">
        {(member.image || member.imageUrl) ? (
          <img
            src={member.image || member.imageUrl}
            alt={member.name}
            className="mx-auto h-24 w-24 rounded-full border-4 border-white/80 object-cover shadow-[0_12px_30px_rgba(15,23,42,0.9)]"
          />
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-800/70 text-2xl">
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

      <h3 className="mb-1 text-base font-semibold text-white">
        {member.name}
      </h3>

      <p className="mb-3 text-sm font-medium text-sky-200">
        {member.designation}
      </p>

      {member.department && (
        <div className="mb-3 flex items-center justify-center text-xs text-slate-300">
          <Building className="w-4 h-4 mr-2" />
          {member.department}
        </div>
      )}

      {member.bio && (
        <p className="mb-4 line-clamp-3 text-sm text-slate-200">
          {member.bio}
        </p>
      )}

      <div className="flex justify-center">
        <a
          href={`mailto:${member.email}`}
          className="inline-flex items-center text-sm font-medium text-sky-200 hover:text-sky-100"
        >
          <Mail className="w-4 h-4 mr-1" />
          Contact
        </a>
      </div>
    </div>
  );
};

export default MemberCard; 
