interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const WeCard: React.FC<CardProps> = ({ icon, title, description, className }) => (
  <div className={`bg-zinc-900 border border-zinc-700 rounded-xl p-6 flex flex-col gap-2 ${className || ''}`}>
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-xl font-bold mb-1">{title}</h3>
    <p className="text-zinc-400 text-sm">{description}</p>
  </div>
);
