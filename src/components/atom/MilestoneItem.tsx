interface MilestoneItemProps {
  year: string;
  title: string;
  desc: string;
  isLast?: boolean;
}

const MilestoneItem = ({
  year,
  title,
  desc,
  isLast = false,
}: MilestoneItemProps) => {
  return (
    <div className="relative flex gap-6">
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-0 w-px bg-zinc-100" />
      )}

      <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-amber-200 bg-amber-50">
        <div className="size-2.5 rounded-full bg-amber-500" />
      </div>

      <div className="pb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
          {year}
        </span>
        <p className="mt-1 font-semibold text-zinc-900">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-500">{desc}</p>
      </div>
    </div>
  );
};

export default MilestoneItem;
