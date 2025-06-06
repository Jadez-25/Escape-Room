import '@/css/DoorOpen.css';

const DoorTransition = ({ sound = true }) => (
  <>
    <div className="door-transition"></div>
    {sound && <audio src="/audio/door-open.mp3" autoPlay />}
  </>
);

export default DoorTransition;
