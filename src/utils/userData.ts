import { ParsedUserData, UserDataItem } from "@/types/common";

export const getUserData = (userData: UserDataItem[]): ParsedUserData => ({
  email: userData?.find((item) => item.dato === "correo")?.valor as string || "",
  name: userData?.find((item) => item.dato === "nombre")?.valor as string || "",
  id_perfil: userData?.find((item) => item.dato === "id_perfil")?.valor as string || "",
  id_pais: userData?.find((item) => item.dato === "id_pais")?.valor as string || "",
  pais: userData?.find((item) => item.dato === "pais")?.valor as string || "",
  sessionTime: userData?.find((item) => item.dato === "tiempo_sesion")?.valor || 0,
});

