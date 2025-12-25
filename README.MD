# Photo Frame
## Usage
1. Turn the switch on the battery pack to on
1. Press any of the buttons on the front (A, B, C...)
1. An LED should light up and the frame will try and fetch the latest photo
1. The frame then goes to sleep until it's time to update

## Tips

1. The frame fetches a random photo from the photos that have been uploaded to the cloud. It's more likely to pick the more recently uploaded photos and ones that haven't appeared much but it's a __random choice__ so it might repeat.
1. The frame is landscape. If you send a photo that's not the same shape as the frame it'll select a rectangle from the centre of the photo. So either 
    - select photos that are landscape 
    - select photos that have the subject roughly in the centre
    - crop your photo before sending it
1. The frame uses very low power which means it won't always manage to fetch a new photo. Don't worry if it happens occasionally but if it hasn't updated for a day or 2 contact me.

# Photo Upload
## Installation
### Android
1. Open link https://andrew-mc-kay.github.io/miniature-octo-garbanzo/newcastle/
1. Install the app
    1. Tap the 3 dots in the top right
    1. Tap 'Add to Home Screen'
    1. Tap Install

### iPhone
1. Open 'shortcuts' app
1. Click the plus in the top right to create a new shortcut
1. Name the shortcut
    1. Tap 'New Shortcut' at the top of the screen
    1. Click rename
    1. Call it something memorable like 'Family Photo Upload'
1. Set to use share sheet
    1. Tap 'i' at the bottom of the screen
    1. Toggle on 'Show in Share Sheet' and tap done
    1. It will now say something like: "Receive [Images] and [18 more] from [Share Sheet]"
1. Set to receive images only
    1. Tap the blue word "Images and 18 more"
    1. Tap Clear at the top left
    1. Select only Images
    1. Tap Done
1. Send contents to URL
    1. Search 'Get contents from url'
    1. Paste this into the url field: https://jbvlww2fwewgw5b455oaddxz6m0gkvjg.lambda-url.eu-west-1.on.aws/
    1. Tap the arrow (>) after the url
    1. Under method tap "Get" and change it to POST
    1. Under headers add the following 3:
        - x-family-secret: GET THIS FROM ME
        - x-family-folder: trosa
        - Content-Type: image/jpeg
    1. Change 'Request Body' to 'File'
    1. Change 'File' to 'Shortcut Input'

## Usage
It's roughly the same on Android and iOS:
1. Find the image you want to share, from your photo gallery, whatsapp or wherever else you want to share a photo from
1. Tap the share button
1. Scroll down until you see the share app, it's called something like Newcastle/Trosa/Family Photo Share depending on what you called it
1. The photo should upload automatically and join the queue

That's it!


