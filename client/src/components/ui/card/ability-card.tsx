type AbilityCardProps = {
  tag: string;
  title: string;
  hasImage?: boolean;
  imageHeight?: string;
};

export const AbilityCard: React.FC<AbilityCardProps> = ({
  tag,
  title,
  hasImage,
  imageHeight,
}) => (
  <div className="bg-[#18161a] border border-[#b0aeb8] rounded-xl p-6 flex flex-col shadow-sm min-h-[140px]">
    <span className="inline-block bg-cyan-400 text-xs font-bold text-black rounded px-2 py-1 mb-3 w-fit">
      {tag}
    </span>
    {hasImage && (
      <div className={`w-full ${imageHeight} bg-[#9b8add] rounded-lg mb-3`} />
    )}
    <div className="text-lg font-bold text-white flex items-center gap-2 mb-2 font-montserrat">
      {title}
    </div>
    <div className="text-[#b0aeb8] text-sm flex items-center gap-1 cursor-pointer select-none">
      Read more <span className="text-xs">ⓘ</span>
    </div>
  </div>
);