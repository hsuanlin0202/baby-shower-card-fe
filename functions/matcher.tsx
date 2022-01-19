export const getRoleString = (role: number): string => {
  switch (role) {
    case 1:
      return "已認證";
    case 2:
      return "公開";
    case 3:
      return "廠商";
    case 4:
      return "家長";
    case 5:
      return "管理員";
    default:
      return "未知";
  }
};
