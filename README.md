# Snapshot

Snapshot is a shameless rendition of Twitter and Instagram. Users can sign up, customise their profiles, post pictures with optional short descriptions, and create albums to store their images in. 

This website is built on React and styled with Tailwind. It utilises Firebase to authenticate users and store and secure data. 

None of the assets on Snapshot are mine 
- Images are taken from non-descriptive Google searches
- Icons were taken from the React Icons library and their dependencies 
- The broad layout was influenced by Twitter

# Login and Signup

Users can continue with Google or sign up using an email and password. Only one account can be made per email address.

# Using Snapshot

On a user's first time signing in they'll be asked to set up their account. Most fields are optional but they will be asked to pick a username that's not already being used. After completing this once they'll never be asked to setup their profile again, but they can edit most of their details through their Profile Pages. Users can visit each others profiles and follow each other. 

Users can post Snaps by uploading an image. They'll have the option of adding a short message to the Snap but it isn't required. Users can delete their own posts and hide ones that aren't theirs if they so choose. Users can like other Snaps, including their own, as well as add Snaps to Albums. Albums can be created on the Albums page. 

Snapshot uses realtime updates from Firestore to manage Snap feeds and API calls on page mount to retrieve Album info. It utilises front-end React state to hide loading and make the UX as clean as possible.

The database is secured through Firestore security rules as well as sufficient front-end authentication. 