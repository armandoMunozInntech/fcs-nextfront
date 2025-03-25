import { useEffect } from "react";

/**
 * Hook para cerrar un menú al hacer clic fuera de su contenedor.
 * @param ref - Referencia al elemento que contiene el menú (puede ser nulo).
 * @param closeMenuCallback - Función para cerrar el menú.
 */
export const useCloseOnClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  closeMenuCallback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeMenuCallback(); // Llamamos la función para cerrar el menú
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closeMenuCallback]);
};
