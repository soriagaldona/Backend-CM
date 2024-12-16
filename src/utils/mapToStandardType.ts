const mapToStandardType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      IDE: "IDE",       // Identificación estándar
      IDV: "IDV",       // Identificación visual
      EID: "IDE",       // Alias de IDE
      VID: "IDV",       // Alias de IDV
      GRUPO: "Grupo",   // Normalizar "Grupo"
      GROUP: "Grupo",   // Alias en inglés
      LOTE: "Lote",     // Normalizar "Lote"
      LOT: "Lote",      // Alias en inglés
    };
  
    return typeMap[type.toUpperCase()] || type; // Convertir a mayúsculas y buscar en el mapa
  };
  
  export default mapToStandardType;
  