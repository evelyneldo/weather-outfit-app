export default function getOutfit(temp, condition) {
    if (temp > 30) return "Shorts and tank top";
    if (temp > 20) return "T-shirt and jeans";
    if (temp > 10) return "Sweater or hoodie";
    if (temp > 0) return "Jacket and scarf";
    if (temp <= 0) return "Heavy coat, gloves, hat";
    if (condition === "Rain") return "Raincoat or umbrella!";
    if (condition === "Snow") return "Boots and thermal layers!";
    return "Comfortable seasonal wear";
  }