export const returnFeedData = (feedData) => {
  if (Array.isArray(feedData)) return feedData
  return []
}
