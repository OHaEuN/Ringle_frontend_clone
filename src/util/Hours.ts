interface scheduleTime {
  hour: number;
  showHour: string;
}

const getAllTimeArray = (): scheduleTime[] => {
  return [...Array(24)].map((v, number) => {
    return {
      hour: number,
      showHour:
        number < 13
          ? `오전 ${number === 0 ? 12 : number}`
          : `오후 ${number % 12}`,
    };
  });
};
export const AllHours = getAllTimeArray();
