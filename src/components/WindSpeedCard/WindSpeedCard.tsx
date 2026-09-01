interface WindSpeedCardProps {
  windSpeed: string;
}
const WindSpeedCard = ({ windSpeed }: WindSpeedCardProps) => {
  return (
    <div className="bg-white/30 rounded-lg p-2">
      <div className="flex gap-2 items-center text-sm">
        <span>💨</span>
        <span>Wind Speed</span>
      </div>
      <div className="text-2xl font-bold px-1">{windSpeed}</div>
    </div>
  );
};

export default WindSpeedCard;
