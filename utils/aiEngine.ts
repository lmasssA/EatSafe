export function calculateGrade(product: any) {
  const nutriments = product?.nutriments || {};

  const sugar = nutriments.sugars_100g || 0;
  const fat = nutriments.fat_100g || 0;

  let score = 0;

  if (sugar > 20) score += 2;
  else if (sugar > 10) score += 1;

  if (fat > 15) score += 2;
  else if (fat > 8) score += 1;

  if (score >= 4) return "D";
  if (score >= 2) return "C";
  if (score >= 1) return "B";

  return "A";
}
export function generateSummary(grade: string) {
  switch (grade) {
    case "A":
      return "This product appears relatively healthy. It contains low sugar and fat levels and may be suitable for regular consumption.";

    case "B":
      return "This product is generally acceptable but should be consumed in moderation as part of a balanced diet.";

    case "C":
      return "This product contains moderate amounts of sugar or fat. Occasional consumption is recommended.";

    case "D":
      return "This product contains high amounts of sugar or fat and should be consumed sparingly.";

    default:
      return "Nutrition information is unavailable.";
  }
}