function formatNumber(num: number): string {
    return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
  }
  
  export {formatNumber };
  