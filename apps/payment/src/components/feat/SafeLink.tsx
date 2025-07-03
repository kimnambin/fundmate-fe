import { Link, useLocation } from 'react-router-dom';

interface SafeLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const SafeLink = ({ to, children, className }: SafeLinkProps) => {
  try {
    useLocation();
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  } catch {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  }
};
