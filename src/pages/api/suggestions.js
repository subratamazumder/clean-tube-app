export default async function handler(req, res) {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json([]);
  }
  const SUGGESTION_API = process.env.SUGGESTION_API;
  try {
    const response = await fetch(
      `${SUGGESTION_API}${encodeURIComponent(q)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers here
        }
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    res.status(200).json(data[1] || []); // Extract just the suggestions array
  } catch (error) {
    console.error('Suggestions API error:', error);
    res.status(200).json(getFallbackSuggestions(q)); // Fallback
  }
}

// Local fallback suggestions
function getFallbackSuggestions(query) {
  const common = [
    'llm tutorial',
    'llm explained',
    'llm vs gpt',
    'llm artificial intelligence'
  ];
  return common.filter(item => 
    item.toLowerCase().includes(query.toLowerCase())
  );
}