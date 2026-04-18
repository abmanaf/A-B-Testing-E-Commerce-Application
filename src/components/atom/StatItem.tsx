interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = ({ value, label }: StatItemProps) => {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-3xl font-bold text-zinc-900 sm:text-4xl">
        {value}
      </span>
      <span className="text-sm text-zinc-400">{label}</span>
    </div>
  );
};

export default StatItem;
