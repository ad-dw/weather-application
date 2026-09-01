interface HumidityCardProps {
  humidity: string;
}

const HumidityCard = ({ humidity }: HumidityCardProps) => {
  return (
    <div className="bg-white/30 rounded-lg p-2">
      <div className="flex gap-2 items-center text-sm">
        <span>💧</span>
        <span>Humidity</span>
      </div>
      <div className="text-2xl font-bold px-1">{humidity}</div>
    </div>
  );
};

export default HumidityCard;
