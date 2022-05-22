export default function returnFeedData (feedData) {
  if (Array.isArray(feedData)) return feedData
  return []
}
