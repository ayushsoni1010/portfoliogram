function extractJSONContent(jsonString) {
  const startIndex = jsonString.indexOf("{");
  const endIndex = jsonString.lastIndexOf("}");
  const jsonContent = jsonString.substring(startIndex, endIndex + 1);
  return jsonContent;
}

module.exports = { extractJSONContent };
