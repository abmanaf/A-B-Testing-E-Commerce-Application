import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
  imageUrl?: string;
  twitter?: string;
  linkedin?: string;
}

const TeamCard = ({
  name,
  role,
  bio,
  initials,
  color,
  imageUrl,
  twitter,
  linkedin,
}: TeamCardProps) => {
  return (
    <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <Avatar size="lg" className={color}>
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback className="text-black">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600">{bio}</p>

      {(twitter || linkedin) && (
        <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
          {twitter && (
            <a
              href={twitter}
              className="text-gray-400 transition-colors hover:text-blue-400"
              aria-label={`${name}'s Twitter`}
            >
              <FaTwitter className="h-4 w-4" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              className="text-gray-400 transition-colors hover:text-blue-600"
              aria-label={`${name}'s LinkedIn`}
            >
              <FaLinkedin className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamCard;
