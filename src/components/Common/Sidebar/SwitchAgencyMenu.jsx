import Typography from "../../Common/Typography";

export default function SwitchAgencyMenu() {
  return (
    <div className="absolute w-[160px] top-7 left-[90%] transform -translate-x-3/2 bg-white shadow-lg p-4 rounded-md border border-light-grat">
      <Typography variant="caption">Switch Agency</Typography>
      <ul className="pt-1">
        <li className="flex gap-2 py-4">
          <div className="p-1 bg-black text-white w-6 h-6 flex items-center justify-center rounded">B</div>
          <Typography variant="caption" className="!text-black">Burger King</Typography>
        </li>
        
        <li className="pt-3 flex gap-2 border-t border-light-gray">
          <div className="p-1 bg-purple text-white w-6 h-6 flex items-center justify-center rounded">
            S
          </div>
          <Typography variant="caption" className="!text-black">Super admin</Typography>
        </li>
      </ul>
    </div>
  );
};