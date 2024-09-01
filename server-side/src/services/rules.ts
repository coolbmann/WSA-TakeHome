const separateRuleData = (items: any[]) => {
  return items.map((item) => {
    const ruleData = {} as any;
    const borrowingRuleData = {} as any;

    // Define the keys that belong to ruleData
    const ruleDataKeys = [
      "id",
      "competition_id",
      "enabled",
      "applies_for_division_id",
    ];

    // Iterate over each key in the item object
    for (const key in item) {
      if (ruleDataKeys.includes(key)) {
        ruleData[key] = item[key]; // Add to ruleData
      } else {
        borrowingRuleData[key] = item[key]; // Add to borrowingRuleData
      }
    }

    return {
      ruleData,
      borrowingRuleData,
    };
  });
};

export { separateRuleData };
