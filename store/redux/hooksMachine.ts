import { useSelector } from "react-redux";
import { RootState } from "./store";
import { groupDataByCategory } from "../../utils/utils";


export const useMachine = () => {
  const machines =
    useSelector((state: RootState) => state.persistRed.machines.machines) || [];

  const selectedMachines = (categoryName: string) => {
    return machines.filter((machine) => machine.categoryName === categoryName);
  };

  const groupedData = useSelector((state: RootState) =>
    groupDataByCategory(state.persistRed.machines.machines)
  );

  return {
    machines,
    selectedMachines,
    groupedData,
  };
};
